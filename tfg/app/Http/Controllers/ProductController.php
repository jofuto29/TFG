<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function prueba(request $request)
    {
        echo "FUNCION DE PRUEBA CONTROLADOR DE PRODUCT, PETICION:<pre>$request </pre>";
    }
}
