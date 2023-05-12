<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\User;

class UserController extends Controller
{

    /**
     * Funcion de prueba para porbar la ruta del controlador
     */
    public function prueba(request $request)
    {
        echo "FUNCION DE PRUEBA CONTROLADOR DE USUARIOS, PETICION:<pre>$request </pre>";
    }

    /**
     * Funcion para utlizar el middleware antes del qualquier metodo de este controlador excepto index y show
     */
    public function __construct() //cargamos el middleware aqui en vez de en rutas dado que no queremos que todos los metodos tengan el middleware aplicado
    {
        $this->middleware('\App\Http\Middleware\ApiAuthMiddleware::class', ['except' => ['register', 'login']]);
    }

    /*
    Funcion que registra un nuevo producto en la base de datos
    RUTA: http://tfg.com.devel/user/register [POST]
    DATOS QUE NECESITAMOS RECIBIR:
    {
        "user":"usuarioRegistrado",
        "userName":"registradoPsot",
        "lastName":"metodoRegister",
        "email":"register@registrado.com.devel",
        "rol":"user",
        "phoneNumber":"000000000",
        "pass":"prueba",
        "dni":"00000000D"
    }
    */
    public function register(request $request)
    {
        $json = $request->input('json', null);
        $atributos = json_decode($json, true);

        $crud = new \App\Helpers\CRUD();
        return $crud->store($atributos, "users", new user());
    }


    /**
     * Funcion para listar todos los productos registrador
     * 
     * RUTA: http://tfg.com.devel/user/listUsers [GET]
     */
    public function listUsers()
    {
        $crud = new \App\Helpers\CRUD();
        return $crud->index(User::all(), "usuarios");
    }


    /*
    Funcion para obtener detalles de un usuario
    RUTA: http://tfg.com.devel/user/detailsUser/1 [GET]
    DATOS QUE NECESITAMOS RECIBIR:
    */
    public function detailsUser($id)
    {
        $crud = new \App\Helpers\CRUD();
        return $crud->show(User::find($id), "usuario", $id);
    }


    /*
    Funcion para obtener detalles de un usuario
    RUTA: http://tfg.com.devel/user/deleteUser/10 [DELETE]
    DATOS QUE NECESITAMOS RECIBIR:
    */
    public function deleteUser($id)
    {
        $crud = new \App\Helpers\CRUD();
        return $crud->destroy(User::find($id), "usuario", $id);
    }


    /*
    Funcion para el update de usuario
    RUTA: http://tfg.com.devel/user/update [PUT]
    DATOS QUE NECESITAMOS RECIBIR:
    {
        "user":"jose",
        "userName":"jose",
        "lastName":"fuertes",
        "email":"jose@fuertes.com.devel",
        "rol":"user",
        "phoneNumber":"096000000",
        "pass":"123456",
        "dni":"00056200D"
    }
    */
    public function update(Request $request)
    {
        $token = $request->header('Authorization'); //recibimos token
        $jwtAuth = new \App\Helpers\JwtAuth();
        $checkToken = $jwtAuth->checkToken($token);

        if ($checkToken) {
            //recibir datos por post
            $json = $request->input('json', null);

            $atributos = json_decode($json, true); //datos de post pormato array
            if (!empty($atributos)) {
                $atributos = array_map('trim', $atributos);
                $userToken = $jwtAuth->checkToken($token, true);

                //VALIDAMOS LOS DATOS ENVIADOS
                $validate = validator::make($atributos, [
                    'user'          => 'required|alpha|unique:users,userName,' . $userToken->sub . ',id_user', //unique:table,column,except,idColumn
                    'userName'      => 'required|alpha',
                    'lastName'      => 'required|alpha',
                    'email'         => 'required|email',
                    'phoneNumber'   => 'required|numeric',
                    'dni'           => 'required|regex:/^[0-9]{8}[A-Za-z]$/|unique:users,dni,' . $userToken->sub . ',id_user'
                ]);

                if ($validate->fails()) {
                    $response = array(
                        'status' => 'error',
                        'code'   => 404,
                        'message' => 'los datos introducidos no son validos',
                        'error' => $validate->errors()
                    );
                } else {
                    //datos correstos, actualizamos en la base de datos quitando por si acaso parametros que pusiesen ir en la peticion:
                    unset($atributos['id_user']);
                    unset($atributos['rol']);
                    unset($atributos['created_at']);
                    unset($atributos['remember_token']);

                    $user_update = User::where('id_user', $userToken->sub)->update($atributos);

                    $response = array(
                        'status' => 'succes',
                        'code'   => 200,
                        'message' => 'usuario actualizado',
                        'userToken' => $user_update
                    );
                }
            } else {
                $response = array(
                    'status' => 'error',
                    'code'   => 404,
                    'message' => 'se deve enviar nuevos datos para poder actualizar'
                );
            }
        } else {
            $response = array(
                'status' => 'error',
                'code'   => 404,
                'message' => 'token incorrecto'
            );
        }
        return response()->json($response);
    }

    /*
    Funcion para el logeo de usuario
    RUTA: http://tfg.com.devel/user/login [POST]
    DATOS QUE NECESITAMOS RECIBIR:
    {
        "user":"admin",
        "pass":"aA@9517532684aA@"
    }
    token: eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEsInVzZXIiOiJhZG1pbiIsIm5hbWUiOiJhZG1pbiIsInJvbCI6ImFkbWluIiwiaWF0IjoxNjgzNzQyMjA5LCJleHAiOjE2ODQzNDcwMDl9.KDaS7YrYBIbuyGkCjYq2yvPJuICZFTaNnF_0k-cJz7A
    para el login y usar el token utilizaremos la libreria jwt, cuando se logee un usuario se generara un token, en cada una de las peticiones que haga el suaurio
    se verificara si el token es correcto o no
    */
    public function login(request $request)
    {
        //recibir datos por post
        $json = $request->input('json', null);

        $atributos = json_decode($json, true); //array
        $atributos = array_map('trim', $atributos);

        //validar datos

        $validate = validator::make($atributos, [
            'user'          => 'required|alpha',
            'pass'          => 'required'
        ]);

        if (!empty($atributos)) {
            if ($validate->fails()) {
                $response = array(
                    'status' => 'error',
                    'code'   => 404,
                    'message' => 'El usuario no es correcto',
                    'error' => $validate->errors()
                );
            } else {
                //datos validos
                $jwtAuth = new \App\Helpers\JwtAuth();

                //codificamos la contraseña pasada
                $psw = hash('sha256', $atributos['pass']);

                //generamos token
                if (!empty($atributos['getToken'])) {
                    $token = $jwtAuth->signup($atributos['user'], $psw, true);
                } else {
                    $token = $jwtAuth->signup($atributos['user'], $psw);
                }

                $response = array(
                    'status' => 'success',
                    'code'   => 200,
                    'message' => 'El usuario se a logeado correctamente',
                    'token' => $token
                );
            }
        } else {
            $response = array(
                'status' => 'error',
                'code'   => 404,
                'message' => 'datos enviados no son correctos',
                'error' => $validate->errors()
            );
        }

        return response()->json($response);
    }
}
