<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ReparationController extends Controller
{
    public function prueba(request $request)
    {
        echo "FUNCION DE PRUEBA CONTROLADOR DE REPARATION, PETICION:<pre>$request </pre>";
    }
}
