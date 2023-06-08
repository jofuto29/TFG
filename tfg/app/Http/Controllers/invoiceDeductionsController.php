<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\invoiceDeductions;

class invoiceDeductionsController extends Controller
{
    /**
     * Funcion para utlizar el middleware antes del qualquier metodo de este controlador excepto index y show
     */
    public function __construct()
    {
        $this->middleware('\App\Http\Middleware\ApiAuthMiddleware::class', ['except' => ['index', 'show']]);
    }

    /**
     * Funcion para listar todas las relaciones registrador
     * 
     * RUTA: http://tfg.com.devel/reparationProducts [GET]
     */
    public function index()
    {
        $crud = new \App\Helpers\CRUD();
        return $crud->index(invoiceDeductions::all(), "reduccion precio facturas");
    }

    /**
     * Funcion para mostrar la reparacion con el $id que se le pase
     * 
     * RUTA: http://tfg.com.devel/reparation/$id [GET]
     */
    public function show($id)
    {
        $crud = new \App\Helpers\CRUD();
        return $crud->show(invoiceDeductions::find($id), "reduccion precio facturas con id:", $id);
    }

    /**
     * Funcion para eliminar una reparacion con el $id que se le pase
     * 
     * RUTA: http://tfg.com.devel/reparationProducts/$id [DELETE]
     */
    public function destroy($id, Request $request)
    {
        $inden = new \App\Helpers\getIdentity();
        $user = $inden->getIdentity($request);

        if ($user->rol == "admin") { //administrador
            $crud = new \App\Helpers\CRUD();
            return $crud->destroy(invoiceDeductions::find($id), "decuctionInovice", $id);
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
    RUTA: http://tfg.com.devel/reparationProducts [POST]
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
        return $crud->store($atributos, "invoiceDeductions", new invoiceDeductions());
    }

    /*
    Funcion que actualiza un nuevo proeevedor en la base de datos
    RUTA: http://tfg.com.devel/reparationProducts/2 [PUT]
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
        return $crud->update($atributos, "invoiceDeductions", invoiceDeductions::find($id), $id, "id_invoiceDeduction");
    }
}
