<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\serviceProduct;

class ServiceProductController extends Controller
{
    public function prueba(request $request)
    {
        echo "FUNCION DE PRUEBA CONTROLADOR DE SERVICE-PRODUCT, PETICION:<pre>$request </pre>";
    }

    /**
     * Funcion para utlizar el middleware antes del qualquier metodo de este controlador excepto index y show
     */
    public function __construct()
    {
        $this->middleware('\App\Http\Middleware\ApiAuthMiddleware::class', ['except' => ['index', 'show']]);
    }

    /**
     * Funcion para listar todos los proeevedores registrador
     * 
     * RUTA: http://tfg.com.devel/serviceProduct [GET]
     */
    public function index()
    {
        $crud = new \App\Helpers\CRUD();
        return $crud->index(serviceProduct::all(), "relacion Servicios-Productos");
    }

    /**
     * Funcion para mostrar el proeevedor con el $id que se le pase
     * 
     * RUTA: http://tfg.com.devel/serviceProduct/$id [GET]
     */
    public function show($id)
    {
        $crud = new \App\Helpers\CRUD();
        return $crud->show(serviceProduct::find($id), "relacion servicio-Producto", $id);
    }

    /**
     * Funcion para eliminar un proeevedor con el $id que se le pase
     * 
     * RUTA: http://tfg.com.devel/serviceProduct/$id [DELETE]
     */
    public function destroy($id, Request $request)
    {
        $inden = new \App\Helpers\getIdentity();
        $user = $inden->getIdentity($request);

        if ($user->rol == "admin") { //administrador
            $crud = new \App\Helpers\CRUD();
            return $crud->destroy(serviceProduct::find($id), "relacion servicio producto", $id);
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
    Funcion que registra un nuevo proevedor en la base de datos
    RUTA: http://tfg.com.devel/serviceProduct [POST]
    DATOS QUE NECESITAMOS RECIBIR:
    {
        "id_service":2,
        "id_product":1
    }
    */
    public function store(Request $request)
    {
        $json = $request->input('json', null);
        $atributos = json_decode($json, true);

        $crud = new \App\Helpers\CRUD();
        return $crud->store($atributos, "serviceproduct", new serviceProduct());
    }

    /*
    Funcion que actualiza un nuevo proeevedor en la base de datos
    RUTA: http://tfg.com.devel/serviceProduct/2 [PUT]
    DATOS QUE NECESITAMOS RECIBIR:
    {
        "id_service":2,
        "id_product":1
    }
    */
    public function update($id, Request $request)
    {
        $json = $request->input('json', null);
        $atributos = json_decode($json, true);

        $crud = new \App\Helpers\CRUD();
        return $crud->update($atributos, "serviceproduct", serviceproduct::find($id), $id, "id_serviceProduct");
    }
}
