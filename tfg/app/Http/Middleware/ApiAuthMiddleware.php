<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ApiAuthMiddleware
{
    /**
     * Un middleware e sun metodo que se ejecuta antes de la ejecucion de un controlador, por lo tanto este middleware lo utilizaremos para validar el token y ahorranor lienas
     * de codigo en los demas controladores
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {

        $token = $request->header('Authorization'); //recibimos token
        $jwtAuth = new \App\Helpers\JwtAuth();
        $checkToken = $jwtAuth->checkToken($token);

        if ($checkToken) {
            return $next($request);
        } else {
            $response = array(
                'status' => 'error',
                'code'   => 404,
                'message' => 'token incorrecto'
            );
            return response()->json($response, $response['code']);
        }
    }
}

/*
Para poder utilizar este middleware debemos dar permiso en el kernel:, añadimo la ruta, recomendable en routeMiddleware queda mas limpio
*/
