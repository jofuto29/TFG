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
                $response = array(
                    'status' => 'success',
                    'code'   => 200,
                    'message' => 'El usuario se ha creado correctamente'
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

        //cigrar contraseña
        $psw = password_hash($atributos['pass'], PASSWORD_BCRYPT, ['cost' => 4]);

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


        /*formato json: {"user":"usuarioRegistrado","userName":"registradoPsot","lastName":"metodoRegister","email":"register@registrado.com.devel","rol":"user",
            "phoneNumber":"000000000","pass":"prueba","dni":"00000000D"}*/

        return response()->json($response, $response['code']);
    }

    public function login(request $request)
    {
        return "accion de registro de usuario";
    }
}
