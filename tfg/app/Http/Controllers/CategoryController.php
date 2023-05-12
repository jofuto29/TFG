<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\User;
use App\Models\category;

class CategoryController extends Controller
{
    /**
     * Funcion de prueba para porbar la ruta del controlador
     */
    public function prueba(request $request)
    {
        echo "FUNCION DE PRUEBA CONTROLADOR DE CATEGORY, PETICION:<pre>$request </pre>";
    }

    /**
     * Funcion para utlizar el middleware antes del qualquier metodo de este controlador excepto index y show
     */
    public function __construct() //cargamos el middleware aqui en vez de en rutas dado que no queremos que todos los metodos tengan el middleware aplicado
    {
        $this->middleware('\App\Http\Middleware\ApiAuthMiddleware::class', ['except' => ['index', 'show']]);
    }

    /**
     * Funcion para listar todos los productos registrador
     * 
     * RUTA: http://tfg.com.devel/category [GET]
     */
    public function index()
    {
        $crud = new \App\Helpers\CRUD();
        return $crud->index(category::all(), "categorias");
    }


    /**
     * Funcion para mostrar el producto con el $id que se le pase
     * 
     * RUTA: http://tfg.com.devel/category/1 [GET]
     */
    public function show($id)
    {
        $crud = new \App\Helpers\CRUD();
        return $crud->show(category::find($id), "categoria", $id);
    }


    /**
     * Funcion para eliminar el producto con el $id que se le pase
     * 
     * RUTA: http://tfg.com.devel/category/$id [DELETE]
     */
    public function destroy($id, Request $request)
    {
        $inden = new \App\Helpers\getIdentity(); //obtenemos el usuario mediante el rpovider que hemos creado
        $user = $inden->getIdentity($request);

        if ($user->rol == "admin") { //administrador

            $crud = new \App\Helpers\CRUD();
            return $crud->destroy(category::find($id), "categoria", $id);
        } else {
            $response = array(
                'status' => 'error',
                'code'   => 404,
                'message' => 'Debes ser administrador del sistema.'
            );
        }
        return response()->json($response, $response['code']);
    }


    /*
    Funcion que registra una nueva categoria en la base de datos
    RUTA: http://tfg.com.devel/category [POST]
    DATOS QUE NECESITAMOS RECIBIR:
    {
    "categoryName":"Liquidos",
    "description":"liquidos incorpora aceites, liquido de frenos, liquido de ruedas etc"
    }
    */
    public function store(Request $request) //ruta creada automaticamente:: http://tfg.com.devel/category , pero en este caso con metodo post, podemos repetir ruta con diferentes metodos, de hecho es lo que se hace automaticamente
    {
        $json = $request->input('json', null);
        $atributos = json_decode($json, true);

        $crud = new \App\Helpers\CRUD();
        return $crud->store($atributos, "categories", new category()); //la segunda variable se utiliza para la regla de validacion
    }


    /*
    Funcion que registra un nuevo producto en la base de datos
    RUTA: http://tfg.com.devel/category/5 [PUT]
    DATOS QUE NECESITAMOS RECIBIR:
    {
    "categoryName":"Liquidos",
    "description":"liquidos incorpora aceites, liquido de frenos, liquido de ruedas etc"
    }
    */
    public function update($id, Request $request)
    {
        $json = $request->input('json', null);
        $atributos = json_decode($json, true);

        $crud = new \App\Helpers\CRUD();
        return $crud->update($atributos, "categories", category::find($id), $id, "id_category");
    }

    /*RUTAS DE CATEGORIA
    
    >php artisan route:list
        GET|HEAD        category ......................................................................... category.index › CategoryController@index
        POST            category ......................................................................... category.store › CategoryController@store
        GET|HEAD        category/create ................................................................ category.create › CategoryController@create
        GET|HEAD        category/prueba .................................................................................. categoryController@prueba
        GET|HEAD        category/{category} ................................................................ category.show › CategoryController@show
        PUT|PATCH       category/{category} ............................................................ category.update › CategoryController@update
        DELETE          category/{category} .......................................................... category.destroy › CategoryController@destroy
        GET|HEAD        category/{category}/edit ........................................................... category.edit › CategoryController@edit
    
    */
}
