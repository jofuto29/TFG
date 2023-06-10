<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\reparationServices;

class reparationServicesController extends Controller
{
    public function prueba(request $request)
    {
        echo "FUNCION DE PRUEBA CONTROLADOR DE SERVICE-REPARATION, PETICION:<pre>$request </pre>";
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
        return $crud->index(reparationServices::all(), "reparaciones asociados a servicios");
    }

    /**
     * Funcion para mostrar el proeevedor con el $id que se le pase
     * 
     * RUTA: http://tfg.com.devel/supplier/$id [GET]
     */
    public function show($id)
    {
        $crud = new \App\Helpers\CRUD();
        return $crud->show(reparationServices::find($id), "reparacion y servicio asociadas a id", $id);
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
            return $crud->destroy(reparationServices::find($id), "reparacion servicios asociados", $id);
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
        return $crud->store($atributos, "reparationServices", new reparationServices()); //la segunda variable se utiliza para la regla de validacion
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
        return $crud->update($atributos, "reparationServices", reparationServices::find($id), $id, "id_reparationServices");
    }

    public function findByCamp($camp)
    {
        $crud = new \App\Helpers\CRUD();
        return $crud->findByCamp(reparationServices::where('id_reparation', $camp)->get(), "reparationServices", $camp);
    }

    public function findByCampReparation($camp)
    {
        $crud = new \App\Helpers\CRUD();
        return $crud->findByCamp(reparationServices::where('id_reparation', $camp)->get(), "reparationProducts reparation", $camp);
    }

    public function findByCampService($camp)
    {
        $crud = new \App\Helpers\CRUD();
        return $crud->findByCamp(reparationServices::where('id_service', $camp)->get(), "reparationService Service", $camp);
    }
}
