<?php

namespace App\Helpers;

use Firebase\JWT\JWT;
use Illuminate\Support\Facades\DB;
use App\Models\User;


class JwtAuth
{
    public $key;

    public function __construct()
    {
        $this->key = '948461516a584168241a21sda68461211265ws1a21d618wd51sx';
    }

    public function signup($usuario, $pass, $getToken = false)
    {
        //buscar si existe el usuario con sus credenciales
        $user = User::where([
            'user' => "admin",
            'pass' => "admin"
        ])->first(); //consulta que comprueba si estos dos parametros existen

        //validar
        $signup = false;
        if (is_object($user)) {
            $signup = true;
        }

        //generar token con los datos del usuario identificado
        if ($signup) {
            $token = array( //generamos el token si el usuario existe, es decir si tenemos un objeto en $user
                'sub'   => $user->id_user,
                'user'  => $user->user,
                'name'  => $user->userName,
                'rol'   => $user->rol,
                'iat'   => time(), //fecha en la que se crea el token
                'exp'   => time() + (7 * 24 * 60 * 60) //tiempo que dura el token = 7dias
            );

            $jwt = JWT::encode($token, $this->key, 'HS256'); //generamos el jwt con el token, la clave y el algoritmo de cifrado
            $decode = JWT::decode($jwt, $this->key, array('HS256'));

            //devolver los datos decodificados o el token
            if ($getToken) { //devolvemos el token decodificado
                $data = $decode;
            } else { //delvolvemos el token codificado
                $data = $jwt;
            }
        } else {
            $data = array( //en caso de no ser logeado generamos un mensaje de erro
                'status' => 'error',
                'message' => 'login incorrecto',
                'user' => $user
            );
        }

        return $data;
    }

    //comporbacion de tokens
    public function checkToken($jwt, $getIdentity = false)
    {

        $auth = false;

        try {
            $jwt = str_replace('"', '', $jwt); //remplazamos la comillas en caso de que el token nos llegue entrecomillado
            $decode = JWT::decode($jwt, $this->key, array("HS256"));
        } catch (\UnexpectedValueException $e) {
            $auth = false;
        } catch (\DomainException $e) {
            $auth = false;
        }

        if (!empty($decode) && is_object($decode) && isset($decode->sub)) { //si ha llegado el token y lo hemos podido desencriptar, tenemos dientificador
            $auth = true;
        }

        if ($getIdentity) {
            return $decode;
        } else {
            return $auth;
        }
    }
}
