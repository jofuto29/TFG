<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\User;
use App\Models\category;

class CategoryController extends Controller
{
    public function __construct() //cargamos el middleware aqui en vez de en rutas dado que no queremos que todos los metodos tengan el middleware aplicado
    {
        $this->middleware('\App\Http\Middleware\ApiAuthMiddleware::class', ['except' => ['index', 'show']]);
    }


    public function prueba(request $request)
    {
        echo "FUNCION DE PRUEBA CONTROLADOR DE CATEGORY, PETICION:<pre>$request </pre>";
    }

    public function index() //ruta creada automaticamente:: http://tfg.com.devel/category -->route:list tenemos todas las rutas que nos crea automaticamente
    {
        $categories = Category::all();

        if (!empty($categories)) {
            $response = array(
                'status' => 'success',
                'code'   => 200,
                'message' => 'se han consultado todas las categorias correctamente',
                'categorias' => $categories
            );
        } else {
            $response = array(
                'status' => 'error',
                'code'   => 404,
                'message' => 'algo ha ido mal',
            );
        }

        return response()->json($response, $response['code']);
    }


    public function show($id) //nos muestra una categoria unicamente, ruta::http://tfg.com.devel/category/1 donde uno es el id de la categoria
    {
        $category = Category::find($id);

        if (is_object($category)) {
            $response = array(
                'status' => 'success',
                'code'   => 200,
                'message' => 'la categoria consultada se encuentra en la base de datos',
                'categorias' => $category
            );
        } else {
            $response = array(
                'status' => 'error',
                'code'   => 404,
                'message' => 'algo ha ido mal',
            );
        }

        return response()->json($response, $response['code']);
    }

    public function store(Request $request) //ruta creada automaticamente:: http://tfg.com.devel/category , pero en este caso con metodo post, podemos repetir ruta con diferentes metodos, de hecho es lo que se hace automaticamente
    {
        //recoger datos de categoria
        $json = $request->input('json', null); //en caso de json no llegar, default null

        $atributos = json_decode($json, true); //convertimos el json en array

        if (!empty($atributos)) {
            $atributos = array_map('trim', $atributos); //limpiamos campos de espacios

            //validar datos
            $validate = validator::make($atributos, [
                'categoryName'  => 'required|alpha|unique:categories',
                'description' => 'required|regex:/^[a-zA-Z0-9\sáéíóúÁÉÍÓÚüÜñÑ,.:;-]+$/' //permite acentos, comas puntos etc
            ]);

            if (!empty($atributos)) {
                if ($validate->fails()) {
                    $response = array(
                        'status' => 'error',
                        'code'   => 404,
                        'message' => 'La categoria no se ha creado correctamente',
                        'error' => $validate->errors()
                    );
                } else {
                    //crear categoria
                    $category = new category();
                    $category->categoryName = $atributos['categoryName'];
                    $category->description = $atributos['description'];

                    //guardar en la BD
                    $category->save();
                    $response = array(
                        'status' => 'success',
                        'code'   => 200,
                        'message' => 'La categoria se ha creado correctamente',
                        'user'  => $category
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
        } else {
            $response = array(
                'status' => 'error',
                'code'   => 404,
                'message' => 'se debe pasar datos para registrar una categoria, salu2',
            );
        }
        /*{"categoryName":"Liquidos",
            "description":"liquidos incorpora aceites, liquido de frenos, liquido de ruedas etc"}*/

        return response()->json($response, $response['code']); //ruta creada automaticamente:: http://tfg.com.devel/category/3 pero en este caso metodo put
    }

    public function update($id, Request $request)
    {
        //recoger datos de categoria
        $json = $request->input('json', null); //en caso de json no llegar, default null

        $atributos = json_decode($json, true); //convertimos el json en array

        if (!empty($atributos) && !is_null($id)) {
            $atributos = array_map('trim', $atributos); //limpiamos campos de espacios

            //validar datos
            $validate = validator::make($atributos, [
                'categoryName'  => 'required|alpha|unique:categories,categoryName,' . $id . ',id_category',                   //unique:table,column,except,idColumn
                'description' => 'required|regex:/^[a-zA-Z0-9\sáéíóúÁÉÍÓÚüÜñÑ,.:;-]+$/' //permite acentos, comas puntos etc
            ]);

            if (!empty($atributos)) {
                if ($validate->fails()) {
                    $response = array(
                        'status' => 'error',
                        'code'   => 404,
                        'message' => 'La categoria no se ha podido actualizar',
                        'error' => $validate->errors()
                    );
                } else {
                    //quitar datos que no se pueden actualizr por si llegaran
                    unset($atributos['id_category']);
                    unset($atributos['create_at']);

                    //crear categoria
                    $category = category::where('id_category', $id)->update($atributos);

                    //guardar en la BD
                    $response = array(
                        'status' => 'success',
                        'code'   => 200,
                        'message' => 'La categoria se ha actualizado correctamente',
                        'category: '  => $category
                    );
                }
            } else {
                $response = array(
                    'status' => 'error',
                    'code'   => 404,
                    'message' => 'no se ha enviado ninguna categoria',
                    'error' => $validate->errors()
                );
            }
        } else {
            $response = array(
                'status' => 'error',
                'code'   => 404,
                'message' => 'no se han enviado datos para aztualizar ninguna categoria',
            );
        }

        return response()->json($response, $response['code']);
    }
    /*{"categoryName":"Liquidos",
            "description":"liquidos incorpora aceites, liquido de frenos, liquido de ruedas etc"}*/



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
