<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\User;

class UserController extends Controller
{
    public function prueba(request $request) //funcion de prueba, request recibe toda la informacion de la peticion realizada( variables post, get etc)
    {
        echo "FUNCION DE PRUEBA CONTROLADOR DE USUARIOS, PETICION:<pre>$request </pre>";
    }


    public function register(request $request)
    {
        //recoger datos de usuario
        $json = $request->input('json', null); //en caso de json no llegar, default nul

        //$atributos = json_decode($json);//convertimo el json en obj
        $atributos = json_decode($json, true); //convertimos el json en array
        $atributos = array_map('trim', $atributos); //limpiamos campos de espacios

        //validar datos
        $validate = validator::make($atributos, [
            'user'          => 'required|alpha|unique:users',
            'userName'      => 'required|alpha',
            'lastName'      => 'required|alpha',
            'email'         => 'required|email',
            'rol'           => 'required|alpha',
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
                $user->rol = 'user';
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


        /*formato json: {"user":"usuarioRegistrado","userName":"registradoPsot","lastName":"metodoRegister","email":"register@registrado.com.devel","rol":"user",
            "phoneNumber":"000000000","pass":"prueba","dni":"00000000D"}*/

        return response()->json($response, $response['code']);
    }

    /*
    para el login y usar el token utilizaremos la libreria jwt, cuando se logee un usuario se generara un token, en cada una de las peticiones que haga el suaurio
    se verificara si el token es correcto o no
    
    */
    public function login(request $request)
    {
        //$jwtAuth = new \JwtAuth(); --> no funciona alias

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

        return response()->json($response); //siempre devolver en json

        /*{"user":"usuarioPrueba","pass":"123456"}*/
    }

    public function update(Request $request)
    {
        $token = $request->header('Authorization'); //recibimos token
        $jwtAuth = new \App\Helpers\JwtAuth();
        $checkToken = $jwtAuth->checkToken($token);

        if ($checkToken) {
            echo "<h1>Login correcto</h1>";
        } else {
            echo "<h1>login incorrecto</h1>";
        }

        die();
    }
}
