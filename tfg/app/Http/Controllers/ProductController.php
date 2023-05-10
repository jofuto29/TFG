<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response; //para devoolver cosas mas concretas
use Illuminate\Support\Facades\Validator;
use App\Models\product;

class ProductController extends Controller
{
    /**
     * Funcion de prueba para porbar la ruta del controlador
     */
    public function prueba(request $request)
    {
        echo "FUNCION DE PRUEBA CONTROLADOR DE PRODUCT, PETICION:<pre>$request </pre>";
    }


    /**
     * Funcion para utlizar el middleware antes del qualquier metodo de este controlador excepto index y show
     */
    public function __construct()
    {
        $this->middleware('\App\Http\Middleware\ApiAuthMiddleware::class', ['except' => ['index', 'show']]);
    }


    /**
     * Funcion para listar todos los productos registrador
     * 
     * RUTA: http://tfg.com.devel/product [GET]
     */
    public function index()
    {
        //con load añadimos un parametro mas al json de la consulta, en este caso el objeto categoria asociado
        $product = product::all()->load('categories');

        if (!empty($product)) {
            $response = array(
                'status' => 'success',
                'code'   => 200,
                'message' => 'Se ha accedido a todo los productos registrados correctamente.',
                'categorias' => $product
            );
        } else {
            $response = array(
                'status' => 'error',
                'code'   => 404,
                'message' => 'No se ha podido acceder a los productos registrados.',
            );
        }

        return response()->json($response, $response['code']);
    }


    /**
     * Funcion para mostrar el producto con el $id que se le pase
     * 
     * RUTA: http://tfg.com.devel/product/$id [GET]
     */
    public function show($id)
    {
        //podriamos hacer tambien el load aqui para mostrar mas cosas asociadas
        $product = product::find($id);

        if (!empty($product)) {
            $response = array(
                'status' => 'success',
                'code'   => 200,
                'message' => "El producto con $id ha sido consultado correctamente.",
                'categorias' => $product
            );
        } else {
            $response = array(
                'status' => 'error',
                'code'   => 404,
                'message' => "No se ha encontrado ningun producto asociado al identificador $id.",
            );
        }

        return response()->json($response, $response['code']);
    }


    /*
    Funcion que registra un nuevo producto en la base de datos
    
    RUTA: http://tfg.com.devel/product [POST]
    DATOS QUE NECESITAMOS RECIBIR:
    {
        "id_supplier":"1",
        "id_category":"6",
        "productName":"liquido de frenos",
        "description":"liquido para engrasar",
        "price":"150.0",
        "stock":"10",
        "admisionDate":"2023-05-10 17:51:09",
        "expiryDate":"2023-05-18 17:51:09",
        "location":"pasillo 12, estanteria 1, hueco 3",
        "img":"liquidofrenos.png"
    }
    */
    public function store(Request $request)
    {
        $json = $request->input('json', null);

        $atributos = json_decode($json, true);

        if (!empty($atributos)) {
            $atributos = array_map('trim', $atributos);

            //validar datos
            $validate = validator::make($atributos, [
                'id_supplier'   => 'required|exists:suppliers,id_supplier', //exists:table,column
                'id_category'   => 'required|exists:categories,id_category',
                'productName'   => 'required|regex:/^[a-zA-Z0-9\sáéíóúÁÉÍÓÚüÜñÑ,.:;-]+$/|unique:products',
                'description'   => 'required|regex:/^[a-zA-Z0-9\sáéíóúÁÉÍÓÚüÜñÑ,.:;-]+$/',
                'price'         => 'required|numeric',
                'stock'         => 'required|integer|min:0',
                'admisionDate'  => 'required|date',
                'expiryDate'    => 'required|date|after:admisionDate',
                'location'      => 'required|string',
                'img'           => 'required'
            ]);

            if (!empty($atributos)) {
                if ($validate->fails()) {
                    $response = array(
                        'status' => 'error',
                        'code'   => 404,
                        'message' => 'Los datos pasados no cumplen lo requisitos de validación.',
                        'error' => $validate->errors()
                    );
                } else {
                    //crear producto
                    $product = new product();
                    $product->id_supplier = $atributos['id_supplier'];
                    $product->id_category = $atributos['id_category'];
                    $product->productName = $atributos['productName'];
                    $product->description = $atributos['description'];
                    $product->price = $atributos['price'];
                    $product->stock = $atributos['stock'];
                    $product->admisionDate = $atributos['admisionDate'];
                    $product->expiryDate = $atributos['expiryDate'];
                    $product->location = $atributos['location'];
                    $product->img = $atributos['img'];

                    //guardar en la BD
                    $product->save();
                    $response = array(
                        'status' => 'success',
                        'code'   => 200,
                        'message' => 'El producto se ha resgistrado correctamente.',
                        'user'  => $product
                    );
                }
            } else {
                $response = array(
                    'status' => 'error',
                    'code'   => 404,
                    'message' => 'No se han enviado suficientes datos.',
                );
            }
        } else {
            $response = array(
                'status' => 'error',
                'code'   => 404,
                'message' => 'Faltan datos para completar el registro de un nuevo producto.',
                'atributosPasados' => $atributos
            );
        }

        return response()->json($response, $response['code']);
    }

    /*
    Funcion que registra un nuevo producto en la base de datos
    
    RUTA: http://tfg.com.devel/product/5 [PUT]
    DATOS QUE NECESITAMOS RECIBIR:
    {
        "id_supplier":"1",
        "id_category":"6",
        "productName":"liquido de frenos",
        "description":"liquido para engrasar",
        "price":"150.0",
        "stock":"10",
        "admisionDate":"2023-05-10 17:51:09",
        "expiryDate":"2023-05-18 17:51:09",
        "location":"pasillo 12, estanteria 1, hueco 3",
        "img":"liquidofrenos.png"
    }
    */
    public function update($id, Request $request)
    {
        $json = $request->input('json', null);

        $atributos = json_decode($json, true);

        if (!empty($atributos)) {
            $atributos = array_map('trim', $atributos);

            //validar datos                 
            $validate = validator::make($atributos, [
                'id_supplier'   => 'required|exists:suppliers,id_supplier', //exists:table,column
                'id_category'   => 'required|exists:categories,id_category',
                'productName'   => "required|regex:/^[a-zA-Z0-9\sáéíóúÁÉÍÓÚüÜñÑ,.:;-]+$/|unique:products,productName,$id,id_product", //unique:table,column,except,idColumn
                'description'   => 'required|regex:/^[a-zA-Z0-9\sáéíóúÁÉÍÓÚüÜñÑ,.:;-]+$/',
                'price'         => 'required|numeric',
                'stock'         => 'required|integer|min:0',
                'admisionDate'  => 'required|date',
                'expiryDate'    => 'required|date|after:admisionDate',
                'location'      => 'required|string',
                'img'           => 'required'
            ]);

            //eliminar datos que no queremos actualizar
            unset($atributos['id']);
            unset($atributos['created_at']);

            if ($validate->fails()) {
                $response = array(
                    'status' => 'error',
                    'code'   => 404,
                    'message' => 'Los datos pasados no cumplen lo requisitos de validación.',
                    'error' => $validate->errors()
                );
            } else {
                $product = Product::where('id_product', $id)->updateOrCreate($atributos); //con la funcion updateOrCreatedd() $product no tendra un boleano sino el objeto actualizado

                /*Para meter una consulta y reducir el codigo podemos crearnos una variable con todos los campos de la tabla
                $where = [
                    'id' => $id,
                    'user_id' => $user->sub
                ]
                $product = Product::updateOrCreate($where, $atributos);
                
                Pâra que todo funcione correctamente deberemo definir en el modelo en este caso de productos una variable protegida tipo:
                proteted $fillable = [
                    'name', 'surname', 'description',  'email', 'password'   //oviamente con los atirvutos de la tabla de productos
                ];


                */

                $response = array(
                    'status' => 'success',
                    'code'   => 200,
                    'message' => 'El producto se ha actualizado correctamente.',
                    'productUpdate'  => Product::find($id) //lo mismo o $product que ahora guardaria el objeto actualizado
                );
            }
        } else {
            $response = array(
                'status' => 'error',
                'code'   => 404,
                'message' => 'Faltan datos para completarla actualizacion del producto.',
                'atributosPasados' => $atributos
            );
        }

        return response()->json($response, $response['code']);
    }


    /**
     * Funcion para eliminar el producto con el $id que se le pase
     * 
     * RUTA: http://tfg.com.devel/product/$id [DELETE]
     */
    public function destroy($id, Request $request)
    {

        /*
        si quisieramos que el usuario que lo crea sea el unico que lo puede borrar--> $post = Post::where('id', $id)->where('user_id', $user->sub)->first()
        Le estamos diciendo que saque el post que coincida con el id que se pasa y que ademas el user id sea el del toke, por ultimo que saque el post si existe con el first
        */
        $inden = new \App\Helpers\getIdentity(); //obtenemos el usuario mediante el rpovider que hemos creado
        $user = $inden->getIdentity($request);

        if ($user->rol == "admin") { //administrador
            $product = product::find($id);
            if (!empty($product)) {
                $product->delete();

                $response = array(
                    'status' => 'success',
                    'code'   => 200,
                    'message' => 'Eliminación del producto exitosa.',
                    'producto' => $product
                );
            } else {
                $response = array(
                    'status' => 'error',
                    'code'   => 404,
                    'message' => 'No se ha podido encontrar el producto que se desea eliminar.'
                );
            }

            return response()->json($response, $response['code']);
        } else {
            $response = array(
                'status' => 'error',
                'code'   => 404,
                'message' => 'Debes ser administrador del sistema.'
            );
        }
    }
}
