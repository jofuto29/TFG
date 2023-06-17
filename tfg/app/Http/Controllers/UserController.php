<?php

namespace App\Http\Controllers;

require 'C:\wamp64\www\ServidorPruebasTFG\tfg\vendor\phpmailer\phpmailer\src\PHPMailer.php';

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\User;
use Exception;
use GuzzleHttp\Psr7\Message;
use PHPMailer\PHPMailer\PHPMailer;



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
        $this->middleware('\App\Http\Middleware\ApiAuthMiddleware::class', ['except' => ['register', 'login', 'sendMail']]);
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
        //recoger datos de usuario
        $json = $request->input('json', null); //en caso de json no llegar, default nul

        //$atributos = json_decode($json);//convertimo el json en obj
        $atributos = json_decode($json, true); //convertimos el json en array
        $atributos = array_map('trim', $atributos); //limpiamos campos de espacios

        //validar datos
        $validate = validator::make($atributos, [
            'user'          => 'required|regex:/^[a-zA-Z0-9\sáéíóúÁÉÍÓÚüÜñÑ,.:;-]+$/|unique:users',
            'userName'      => 'required|regex:/^[a-zA-Z0-9\sáéíóúÁÉÍÓÚüÜñÑ,.:;-]+$/',
            'lastName'      => 'required|regex:/^[a-zA-Z0-9\sáéíóúÁÉÍÓÚüÜñÑ,.:;-]+$/',
            'email'         => 'required|email',
            'rol'           => '',
            'phoneNumber'   => 'required|numeric',
            'pass'          => 'required',
            'dni'           => 'required|regex:/^[0-9]{8}[A-Za-z]$/|unique:users', //comporbar si el usuario existe, este campo no se puede repetir
        ]);

        if (!empty($atributos)) {
            if ($validate->fails()) {

                $response = array(
                    'status' => 'error',
                    'code'   => 404,
                    'message' => 'El usuario no se ha creado correctamente',
                    'error' => $validate->errors()
                );
            } else {
                //cigrar contraseña
                //$psw = password_hash($atributos['pass'], PASSWORD_BCRYPT, ['cost' => 4]); --> no genera el mismo hash
                $psw = hash('sha256', $atributos['pass']);

                //crear usuario
                $user = new User();
                $user->user = $atributos['user'];
                $user->userName = $atributos['userName'];
                $user->lastName = $atributos['lastName'];
                $user->email = $atributos['email'];
                $user->rol = 'client'; //admin y employee
                $user->phoneNumber = $atributos['phoneNumber'];
                $user->pass = $psw;
                $user->dni = $atributos['dni'];

                //guardar en la BD
                $user->save();
                $response = array(
                    'status' => 'success',
                    'code'   => 200,
                    'message' => 'El usuario se ha creado correctamente',
                    'user'  => $user
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

        return response()->json($response, $response['code']);
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

                if ($userToken->rol != "admin") {
                    $validate = validator::make($atributos, [
                        'user'          => 'required|regex:/^[a-zA-Z0-9\sáéíóúÁÉÍÓÚüÜñÑ,.:;-]+$/|unique:users,user,' . $userToken->sub . ',id_user', //unique:table,column,except,idColumn
                        'userName'      => 'required|regex:/^[a-zA-Z0-9\sáéíóúÁÉÍÓÚüÜñÑ,.:;-]+$/',
                        'lastName'      => 'required|regex:/^[a-zA-Z0-9\sáéíóúÁÉÍÓÚüÜñÑ,.:;-]+$/',
                        'email'         => 'required|email',
                        'phoneNumber'   => 'required|numeric',
                        'dni'           => 'required|regex:/^[0-9]{8}[A-Za-z]$/|unique:users,dni,' . $userToken->sub . ',id_user'
                    ]);
                } else {
                    $validate = validator::make($atributos, [
                        'user'          => 'required|regex:/^[a-zA-Z0-9\sáéíóúÁÉÍÓÚüÜñÑ,.:;-]+$/',
                        'userName'      => 'required|regex:/^[a-zA-Z0-9\sáéíóúÁÉÍÓÚüÜñÑ,.:;-]+$/',
                        'lastName'      => 'required|regex:/^[a-zA-Z0-9\sáéíóúÁÉÍÓÚüÜñÑ,.:;-]+$/',
                        'email'         => 'required|email',
                        'phoneNumber'   => 'required|numeric',
                        'dni'           => 'required|regex:/^[0-9]{8}[A-Za-z]$/'
                    ]);
                }

                if ($validate->fails()) {
                    $response = array(
                        'status' => 'error',
                        'code'   => 404,
                        'message' => 'los datos introducidos no son validosss',
                        'error' => $validate->errors()
                    );
                } else {
                    //datos correstos, actualizamos en la base de datos quitando por si acaso parametros que pusiesen ir en la peticion:
                    unset($atributos['pass']);
                    unset($atributos['created_at']);
                    unset($atributos['updated_at']);
                    unset($atributos['remember_token']);
                    unset($atributos['getToken']);


                    if ($userToken->rol != "admin") {
                        unset($atributos['id_user']);
                        unset($atributos['rol']);
                        $user_update = User::where('id_user', $userToken->sub)->update($atributos);
                    } else {
                        $user_update = User::where('id_user', $atributos['id_user'])->update($atributos);
                    }

                    $response = array(
                        'status' => 'success',
                        'code'   => 200,
                        'message' => 'usuario actualizado',
                        'userToken' => User::find($userToken->sub)
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
        "user":"admin1",
        "pass":"admin"
    }
    token: eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEsInVzZXIiOiJhZG1pbiIsIm5hbWUiOiJhZG1pbiIsInJvbCI6ImFkbWluIiwiaWF0IjoxNjgzOTE4MTcxLCJleHAiOjE2ODQ1MjI5NzF9.WkDFsoXeTP95KzED2yGxKYwBglVB1QRsCHIR_gNoKHA
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
            'user'          => 'required|regex:/^[a-zA-Z0-9\sáéíóúÁÉÍÓÚüÜñÑ,.:;-]+$/',
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

    public function changeRol()
    {
        //debse ser el administrador el unico que pueda realizar esta funcion
    }

    /*
        POST: http://tfg.com.devel/user/sendMail
        {"name":"jose",
        "message":"desempleado",
        "email":"ypo@yo"}
    */
    public function sendMail(Request $request)
    {
        $json = $request->input('json', null);
        $atributos = json_decode($json, true); //array
        $nombre = $atributos['name'];
        $email = $atributos['email'];
        $message = $atributos['message'];

        $mail = new PHPMailer();

        try {

            // Configurar el servidor SMTP
            $mail->isSMTP();
            $mail->Host = 'smtp.gmail.com';  // Cambia esto con la configuración de tu servidor SMTP
            $mail->SMTPAuth = true;
            $mail->Username = 'clientessoporterodalrodal@gmail.com';  // Tu dirección de correo electrónico
            $mail->Password = '9517532684a';  // Tu contraseña de correo electrónico
            $mail->SMTPSecure = 'tls';
            $mail->Port = 587;

            // Configurar el remitente y el destinatario
            $mail->setFrom($email, $nombre);
            $mail->addAddress('jofuto29@gmail.com');  // Dirección de correo electrónico del destinatario

            // Configurar el contenido del correo electrónico
            $mail->Subject = 'Mensaje de contacto';
            $mail->Body = $message;

            // Enviar el correo electrónico
            $mail->send();

            return response()->json(['message' => 'Correo electrónico enviado correctamente', 'nombre' => $nombre, 'mesajeFrom' => $message], 200);
        } catch (Exception $e) {
            return response()->json(['message' => 'Correo electrónico no se pudo enviar correctamente', 'error e' => $e], 500);
        }
    }

    public function findByCamp($camp)
    {
        $crud = new \App\Helpers\CRUD();
        return $crud->findByCamp(user::where('rol', $camp)->get(), "user", $camp);
    }
}
