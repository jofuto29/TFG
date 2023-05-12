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
        $crud = new \App\Helpers\CRUD();
        return $crud->index(product::all(), "productos");
    }

    /**
     * Funcion para mostrar el producto con el $id que se le pase
     * 
     * RUTA: http://tfg.com.devel/product/$id [GET]
     */
    public function show($id)
    {
        //podriamos hacer tambien el load aqui para mostrar mas cosas asociadas
        $crud = new \App\Helpers\CRUD();
        return $crud->show(product::find($id), "producto", $id);
    }

    /**
     * Funcion para eliminar el producto con el $id que se le pase
     * 
     * RUTA: http://tfg.com.devel/product/$id [DELETE]
     */
    public function destroy($id, Request $request)
    {
        $inden = new \App\Helpers\getIdentity(); //obtenemos el usuario mediante el rpovider que hemos creado
        $user = $inden->getIdentity($request);

        if ($user->rol == "admin") { //administrador

            $crud = new \App\Helpers\CRUD();
            return $crud->destroy(product::find($id), "producto", $id);
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

        $crud = new \App\Helpers\CRUD();
        return $crud->store($atributos, "products", new product()); //la segunda variable se utiliza para la regla de validacion
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

        $crud = new \App\Helpers\CRUD();
        return $crud->update($atributos, "products", Product::find($id), $id, "id_product");
    }
}
