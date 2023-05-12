<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\service;

class ServiceController extends Controller
{
    public function prueba(request $request)
    {
        echo "FUNCION DE PRUEBA CONTROLADOR DE SERVICECONTROLLER, PETICION:<pre>$request </pre>";
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
     * RUTA: http://tfg.com.devel/supplier [GET]
     */
    public function index()
    {
        $crud = new \App\Helpers\CRUD();
        return $crud->index(service::all(), "proeevedores");
    }

    /**
     * Funcion para mostrar el proeevedor con el $id que se le pase
     * 
     * RUTA: http://tfg.com.devel/supplier/$id [GET]
     */
    public function show($id)
    {
        $crud = new \App\Helpers\CRUD();
        return $crud->show(service::find($id), "proeevedor", $id);
    }

    /**
     * Funcion para eliminar un proeevedor con el $id que se le pase
     * 
     * RUTA: http://tfg.com.devel/supplier/$id [DELETE]
     */
    public function destroy($id, Request $request)
    {
        $inden = new \App\Helpers\getIdentity(); //obtenemos el usuario mediante el rpovider que hemos creado
        $user = $inden->getIdentity($request);

        if ($user->rol == "admin") { //administrador

            $crud = new \App\Helpers\CRUD();
            return $crud->destroy(service::find($id), "proeevedor", $id);
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
    RUTA: http://tfg.com.devel/supplier [POST]
    DATOS QUE NECESITAMOS RECIBIR:
    {
        "supplierName":"Heraldo",
        "lastName":"de la muerte",
        "email":"heraldo@delamuerte.com",
        "phoneNumber":"105265245",
        "address":"Avenida de la luz general 24 56 12",
        "dni":"78569845A"
    }
    */
    public function store(Request $request)
    {
        $json = $request->input('json', null);
        $atributos = json_decode($json, true);

        $crud = new \App\Helpers\CRUD();
        return $crud->store($atributos, "suppliers", new service()); //la segunda variable se utiliza para la regla de validacion
    }

    /*
    Funcion que actualiza un nuevo proeevedor en la base de datos
    RUTA: http://tfg.com.devel/supplier/5 [PUT]
    DATOS QUE NECESITAMOS RECIBIR:
    {
        "supplierName":"Heraldo",
        "lastName":"de la muerte",
        "email":"heraldo@delamuerte.com",
        "phoneNumber":"10526524521",
        "address":"Avenida de la luz general 24 56 12",
        "dni":"78569845A"
    }
    */
    public function update($id, Request $request)
    {
        $json = $request->input('json', null);
        $atributos = json_decode($json, true);

        $crud = new \App\Helpers\CRUD();
        return $crud->update($atributos, "suppliers", service::find($id), $id, "id_supplier");
    }
}
