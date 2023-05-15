<?php

namespace App\Helpers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;
use Illuminate\Http\Response;

class crud
{
    //validations only method store
    private $validationRules = [
        'products' => [
            'id_supplier'   => 'required|exists:suppliers,id_supplier',
            'id_category'   => 'required|exists:categories,id_category',
            'productName'   => 'required|regex:/^[a-zA-Z0-9\sáéíóúÁÉÍÓÚüÜñÑ,.:;-]+$/|unique:products',
            'description'   => 'required|regex:/^[a-zA-Z0-9\sáéíóúÁÉÍÓÚüÜñÑ,.:;-]+$/',
            'price'         => 'required|numeric',
            'stock'         => 'required|integer|min:0',
            'admisionDate'  => 'required|date',
            'expiryDate'    => 'required|date|after:admisionDate',
            'location'      => 'required|string',
            'img'           => 'required'
        ],
        'categories' => [
            'categoryName'  => 'required|regex:/^[a-zA-Z0-9\sáéíóúÁÉÍÓÚüÜñÑ,.:;-]+$/|unique:categories',
            'description'   => 'required|regex:/^[a-zA-Z0-9\sáéíóúÁÉÍÓÚüÜñÑ,.:;-]+$/'
        ],
        "suppliers" => [
            'supplierName'      => 'required|regex:/^[a-zA-Z0-9\sáéíóúÁÉÍÓÚüÜñÑ,.:;-]+$/',
            'lastName'          => 'required|regex:/^[a-zA-Z0-9\sáéíóúÁÉÍÓÚüÜñÑ,.:;-]+$/',
            'email'             => 'required|email',
            'phoneNumber'       => 'required|numeric',
            'address'           => 'required',
            'dni'               => 'required|regex:/^[0-9]{8}[A-Za-z]$/|unique:suppliers'
        ],
        "services" => [
            'serviceName'       => 'required|regex:/^[a-zA-Z0-9\sáéíóúÁÉÍÓÚüÜñÑ,.:;-]+$/',
            'description'       => 'required|regex:/^[a-zA-Z0-9\sáéíóúÁÉÍÓÚüÜñÑ,.:;-]+$/',
            'price'             => 'required|numeric',
            'duration'          => 'required|numeric',
            'serviceType'       => 'required|regex:/^[a-zA-Z0-9\sáéíóúÁÉÍÓÚüÜñÑ,.:;-]+$/'
        ],
        "serviceproduct" => [
            'id_service'   => 'required|exists:services,id_service', //exists:table,column
            'id_product'   => 'required|exists:products,id_product'
        ]

    ];


    private function getValidationRules($table)
    {
        if (isset($this->validationRules[$table])) {
            return $this->validationRules[$table];
        } else {
            return []; // Si no se encuentra la tabla, devuelve un array vacío
        }
    }

    /**
     * Funcion para listar todos los objetos registrados
     */
    public function index($object, $model)
    {
        //con load añadimos un parametro mas al json de la consulta, en este caso el objeto categoria asociado
        if (!empty($object)) {
            $response = array(
                'status' => 'success',
                'code'   => 200,
                'message' => "Se ha accedido a todo los $model registrados correctamente.",
                '$model' => $object
            );
        } else {
            $response = array(
                'status' => 'error',
                'code'   => 404,
                'message' => "No se ha podido acceder a los $model registrados.",
            );
        }

        return response()->json($response, $response['code']);
    }



    /**
     * Funcion para encontrar un registro
     */
    public function show($object, $model, $id)
    {
        //podriamos hacer tambien el load aqui para mostrar mas cosas asociada
        if (!empty($object)) {
            $response = array(
                'status' => 'success',
                'code'   => 200,
                'message' => "El $model con id=$id ha sido consultado correctamente.",
                '$model' => $object
            );
        } else {
            $response = array(
                'status' => 'error',
                'code'   => 404,
                'message' => "No se ha encontrado ningun $model asociado al identificador $id.",
            );
        }

        return response()->json($response, $response['code']);
    }



    /**
     * Funcion para eliminar un registro
     */
    public function destroy($object, $model, $id)
    {
        if (!empty($object)) {
            $object->delete();

            $response = array(
                'status' => 'success',
                'code'   => 200,
                'message' => "Eliminación del $model con id=$id exitosa.",
                $model => $object
            );
        } else {
            $response = array(
                'status' => 'error',
                'code'   => 404,
                'message' => "No se ha podido encontrar el $model con id $id que se desea eliminar."
            );
        }

        return response()->json($response, $response['code']);
    }


    /**
     * Funcion para registrar registros en la tabla pasada
     */
    public function store($params, $table, $object)
    {
        if (!empty($params)  && !empty($object)) {
            $atributos = array_map('trim', $params);

            $validationRules = $this->getValidationRules($table);

            $filteredArray = array_intersect_key($atributos, array_flip(array_keys($validationRules))); //obtenemos todas las claves de validation rules, canviamos valores por calves para obtener aquellas claves que coincidan en $atributos, luego filtramos $atributos
            $validate = Validator::make($filteredArray, $validationRules);

            if ($validate->fails()) {
                $response = array(
                    'status' => 'error',
                    'code'   => 404,
                    'message' => 'Los datos pasados no cumplen los requisitos de validación.',
                    'error' => $validate->errors()
                );
            } else {

                foreach ($filteredArray as $key => $value) {
                    $object->$key = $value;
                }

                // guardar en la BD
                $object->save();
                $response = array(
                    'status' => 'success',
                    'code'   => 200,
                    'message' => 'El registro se ha creado correctamente.',
                    'data'  => $object
                );
            }
        } else {
            if (empty($object)) {
                $response = array(
                    'status' => 'error',
                    'code'   => 404,
                    'message' => "No se ha podido crear el objeto correctamente(MODELO)."
                );
            } else {
                $response = array(
                    'status' => 'error',
                    'code'   => 404,
                    'message' => 'Faltan datos para completar la actualización.'
                );
            }
        }

        return response()->json($response, $response['code']);
    }


    /**
     * Funcion para actualizar un registro
     */
    public function update($params, $table, $object, $id, $key)
    {
        if (!empty($params) && !empty($object)) {

            $atributos = array_map('trim', $params);

            $validationRules = [];
            if ($table === 'products') {
                $validationRules = [
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
                ];
            } elseif ($table === 'categories') {
                $validationRules = [
                    'categoryName'  => 'required|regex:/^[a-zA-Z0-9\sáéíóúÁÉÍÓÚüÜñÑ,.:;-]+$/|unique:categories',
                    'description' => 'required|regex:/^[a-zA-Z0-9\sáéíóúÁÉÍÓÚüÜñÑ,.:;-]+$/'
                ];
            } elseif ($table === 'suppliers') {
                $validationRules = [
                    'supplierName'      => 'required|regex:/^[a-zA-Z0-9\sáéíóúÁÉÍÓÚüÜñÑ,.:;-]+$/',
                    'lastName'          => 'required|regex:/^[a-zA-Z0-9\sáéíóúÁÉÍÓÚüÜñÑ,.:;-]+$/',
                    'email'             => 'required|email',
                    'phoneNumber'       => 'required|numeric',
                    'address'           => 'required',
                    'dni'               => "required|regex:/^[0-9]{8}[A-Za-z]$/|unique:suppliers,dni,$id,id_supplier"
                ];
            } elseif ($table === 'services') {
                $validationRules = [
                    'serviceName'       => 'required|regex:/^[a-zA-Z0-9\sáéíóúÁÉÍÓÚüÜñÑ,.:;-]+$/',
                    'description'       => 'required|regex:/^[a-zA-Z0-9\sáéíóúÁÉÍÓÚüÜñÑ,.:;-]+$/',
                    'price'             => 'required|numeric',
                    'duration'          => 'required|numeric',
                    'serviceType'       => 'required|regex:/^[a-zA-Z0-9\sáéíóúÁÉÍÓÚüÜñÑ,.:;-]+$/'
                ];
            } elseif ($table === 'serviceproduct') {
                $validationRules = [
                    'id_service'   => 'required|exists:services,id_service', //exists:table,column
                    'id_product'   => 'required|exists:products,id_product'
                ];
            }

            $filteredArray = array_intersect_key($atributos, array_flip(array_keys($validationRules)));

            $validate = Validator::make($filteredArray, $validationRules);

            if ($validate->fails()) {
                $response = array(
                    'status' => 'error',
                    'code'   => 404,
                    'message' => 'Los datos pasados no cumplen los requisitos de validación.',
                    'error' => $validate->errors(),
                    'filterred' => $filteredArray
                );
            } else {
                $object::where($key, $id)->update($filteredArray);

                $response = array(
                    'status' => 'success',
                    'code'   => 200,
                    'message' => 'El registro se ha actualizado correctamente.',
                    'data'  => $object->find($id)
                );
            }
        } else {
            if (empty($object)) {
                $response = array(
                    'status' => 'error',
                    'code'   => 404,
                    'message' => "No se ha encontrado el registro con id=$id."
                );
            } else {
                $response = array(
                    'status' => 'error',
                    'code'   => 404,
                    'message' => 'Faltan datos para completar la actualización.'
                );
            }
        }

        return response()->json($response, $response['code']);
    }

    /**
     * Funcion para guardar una imagen
     */
    public function storeImage($request, $disk)
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
            Storage::disk($disk)->put($image_name, File::get($image)); //cada disco es una carpeta dentro del diorectorio storage

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
     * Funcion para obtener una imagen
     */
    public function getImage($filename, $disk)
    {
        $isset = Storage::disk($disk)->exists($filename);
        if ($isset) {
            $file = Storage::disk($disk)->get($filename);
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
}
