<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;

use App\Models\User;
use App\Models\vehicle;
use App\Models\usedVehicle;


class UsedVehicleController extends Controller
{
    public function prueba(request $request)
    {
        echo "FUNCION DE PRUEBA CONTROLADOR DE used VEHICLES, PETICION:<pre>$request </pre>";
    }


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


    public function getImage($filename)
    {
    }
}
