<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ServiceReparationController extends Controller
{
    public function prueba(request $request)
    {
        echo "FUNCION DE PRUEBA CONTROLADOR DE SERVICE-REPARATION, PETICION:<pre>$request </pre>";
    }
}
