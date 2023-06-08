<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;
use Illuminate\Http\Response;
use App\Models\usedVehicle;


class UsedVehicleController extends Controller
{
    /**
     * Funcion de prueba para porbar la ruta del controlador
     */
    public function prueba(request $request)
    {
        echo "FUNCION DE PRUEBA CONTROLADOR DE used VEHICLES, PETICION:<pre>$request </pre>";
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
        return $crud->index(UsedVehicle::all(), "vehiculos usados");
    }

    /**
     * Funcion para mostrar el proeevedor con el $id que se le pase
     * 
     * RUTA: http://tfg.com.devel/supplier/$id [GET]
     */
    public function show($id)
    {
        $crud = new \App\Helpers\CRUD();
        return $crud->show(UsedVehicle::find($id), "vehiculos usados con id", $id);
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
            return $crud->destroy(usedVehicle::find($id), "vehiculo Usado", $id);
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
        return $crud->store($atributos, "usedVehicles", new Usedvehicle()); //la segunda variable se utiliza para la regla de validacion
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
        return $crud->update($atributos, "usedVehicles", usedVehicle::find($id), $id, "id_usedVehicle");
    }


    /**
     * Funcion para subir una imagen a la BD
     * 
     * RUTA: http://tfg.com.devel/usedVehicle/uploadImage [POST]
     */
    public function uploadImage(Request $request)
    {

        //Recoger datos de la peticion
        $image = $request->file('file0'); //nombre del archivo en este caso la imagen file0

        //validmaos que el arhicvo es una imagen
        $validate = validator::make($request->all(), [
            'file0' => 'required|image|mimes:jpg,jpeg,png,gif'
        ]);


        //guardar imagen
        if (!$image || $validate->fails()) {
            $response = array(
                'status' => 'error',
                'code'   => 404,
                'message' => 'la imagen no se ha podido guardar correctamente',
                'error' => $validate->errors()
            );
        } else {
            $image_name = time() . $image->getClientOriginalName(); //sacamos el nombre de la imagen y le agregamos el tiempo de unix irrepetible para no sobrescribir nada en BD
            Storage::disk('usedVehicles')->put($image_name, File::get($image)); //cada disco es una carpeta dentro del diorectorio storage


            $response = array(
                'status' => 'success',
                'code'   => 200,
                'message' => 'imagen guardarda correctamente',
                'image' => $image_name
            );
        }
        return response()->json($response, $response['code']);
    }


    /**
     * Funcion para obtener una imagen de la base de datos
     * 
     * RUTA: http://tfg.com.devel/usedVehicle/getImage/168356305911. Formulario a traves de postman.png [GET]
     */
    public function getImage($filename)
    {
        $isset = Storage::disk('usedVehicles')->exists($filename);
        if ($isset) {
            $file = Storage::disk('usedVehicles')->get($filename);
            return new Response($file, 200);
        } else {
            $response = array(
                'status' => 'error',
                'code'   => 404,
                'message' => 'la imagen no se ha podido encontrar',
            );
            return response()->json($response, $response['code']);
        }
    }
}
