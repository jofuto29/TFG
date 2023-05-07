<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ServiceProductController extends Controller
{
    public function prueba(request $request)
    {
        echo "FUNCION DE PRUEBA CONTROLADOR DE SERVICE-PRODUCT, PETICION:<pre>$request </pre>";
    }
}
