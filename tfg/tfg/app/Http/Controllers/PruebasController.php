<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
//use App\Models; //el controlador necesita acceso a los modelos que hemos creado

use App\Models\category;
use App\Models\product;

class PruebasController extends Controller
{
    //
    public function index()
    {
        $animales = ['perro', 'gato', 'mclolo'];
        $titulo = "animales";

        //estaremos enlazando este controlador con el archivo vistaControlador en la carpeta pruebas de view
        return view('pruebas.vistaControlador', $animales, array(
            'animales' => $animales, //pasamos a la vista la variable animales
            'titulo' => $titulo
        ));
    }


    public function testORM() //como esto es una prueba no pasaremos informacion a ninguna vista
    {
        $products = product::all(); //esto basicamente es una consulta a la base de datos con un select *
        //var_dump($products);
        foreach ($products as $product) { //recorremos toda la informacion de la consulta y sacamos un atributo unicamente, el nombre
            echo "<h1>" . $product->productName . "</h1>";

            //queremos sacar la categoria asociada:
            echo "<p> cuya categoria es: " . $product->categories->categoryName . "</p>"; //usamos el metodo que definimos en el modelo producto
            echo "<p> cuyo proveedor es: " . $product->suppliers->supplierName . "</p>";
            echo "<p class='holeloscaracoles;'>$product->id_product</p>";
        }

        $categories = category::all();
        foreach ($categories as $category) {
            echo "<h1> categoria: $category->categoryName </h1>";

            foreach ($category->products as $product) { //recorremos toda la informacion de la consulta y sacamos un atributo unicamente, el nombre
                echo "<h1>" . $product->productName . "</h1>";
                //queremos sacar la categoria asociada:
                echo "<p> cuya categoria es: " . $product->categories->categoryName . "</p>"; //usamos el metodo que definimos en el modelo producto
                echo "<p> cuyo proveedor es: " . $product->suppliers->supplierName . "</p>";
                echo "<p class='holeloscaracoles;'>$product->id_product</p>";
            }
        }

        die(); //muere la funcion sin usar ninguna vista
    }


    /*Hay que tener claro, existen los controladores, los modelos y las vistas:
        Los controladores son los que manejan la informacion que consiguen de los modelos y se lo pasan a las vistas para que estas las muestre al usuario final.


        Luego ademas estan las rutas, que basicamente son las direcciones donde las vistas o funciones que hacen esas vistas mostraran la informacion que hagamos --> ir a routes

    */
}
