<?php

namespace App\Helpers;

use Illuminate\Http\Request;


class getIdentity
{

    /**
     * Funcion para obtener la identidad del que realiza la accion emdiante el token
     */
    public function getIdentity(Request $request)
    {
        //conseguir usuario administrador
        $token = $request->header('Authorization'); //recibimos token
        $jwtAuth = new \App\Helpers\JwtAuth();
        $user = $jwtAuth->checkToken($token, true);

        return $user;
    }
}
