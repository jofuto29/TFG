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
        'products' => [ //1
            'id_supplier'   => 'required|exists:suppliers,id_supplier',
            'id_category'   => 'required|exists:categories,id_category',
            'productName'   => 'required|regex:/^[a-zA-Z0-9\sáéíóúÁÉÍÓÚüÜñÑ,.:;-]+$/|unique:products',
            'description'   => 'required|regex:/^[a-zA-Z0-9\sáéíóúÁÉÍÓÚüÜñÑ,.:;-]+$/',
            'price'         => 'required|numeric',
            'stock'         => 'required|integer|min:0',
            'marca'         => 'regex:/^[a-zA-Z0-9\sáéíóúÁÉÍÓÚüÜñÑ,.:;-]+$/',
            'admisionDate'  => 'required|date',
            'expiryDate'    => 'required|date|after:admisionDate',
            'location'      => 'required|string',
            'img'           => 'string'
        ],
        'categories' => [ //2
            'categoryName'  => 'required|regex:/^[a-zA-Z0-9\sáéíóúÁÉÍÓÚüÜñÑ,.:;-]+$/|unique:categories',
            'description'   => 'required|regex:/^[a-zA-Z0-9\sáéíóúÁÉÍÓÚüÜñÑ,.:;-]+$/'
        ],
        "suppliers" => [ //3
            'supplierName'      => 'required|regex:/^[a-zA-Z0-9\sáéíóúÁÉÍÓÚüÜñÑ,.:;-]+$/',
            'lastName'          => 'required|regex:/^[a-zA-Z0-9\sáéíóúÁÉÍÓÚüÜñÑ,.:;-]+$/',
            'email'             => 'required|email',
            'phoneNumber'       => 'required|numeric',
            'address'           => 'required',
            'dni'               => 'required|regex:/^[0-9]{8}[A-Za-z]$/|unique:suppliers'
        ],
        "services" => [ //4
            'serviceName'       => 'required|regex:/^[a-zA-Z0-9\sáéíóúÁÉÍÓÚüÜñÑ,.:;-]+$/',
            'description'       => 'required|regex:/^[a-zA-Z0-9\sáéíóúÁÉÍÓÚüÜñÑ,.:;-]+$/',
            'price'             => 'required|numeric',
            'duration'          => 'required|numeric',
            'serviceType'       => 'required|regex:/^[a-zA-Z0-9\sáéíóúÁÉÍÓÚüÜñÑ,.:;-]+$/'
        ],
        "reparationProducts" => [ //5
            'id_reparation'   => 'required|exists:reparations,id_reparation', //exists:table,column
            'id_product'      => 'required|exists:products,id_product',
            'quantity'        => 'required|numeric|integer'
        ],
        "reparations" => [ //6
            'id_vehicle'        => 'required|exists:vehicles,id_vehicle',
            'id_employee'        => 'required|exists:employees,id_employee',
            'startDate'         => 'required|date',
            'endDate'           => 'date|after:startDate',
            'problemDescription' => 'required|regex:/^[a-zA-Z0-9\sáéíóúÁÉÍÓÚüÜñÑ,.:;-]+$/',
            'solutionDescription' => 'required|regex:/^[a-zA-Z0-9\sáéíóúÁÉÍÓÚüÜñÑ,.:;-]+$/',
            'state'             => 'required|regex:/^[a-zA-Z0-9\sáéíóúÁÉÍÓÚüÜñÑ,.:;-]+$/'
        ],
        "vehicles" => [ //7
            'id_user'           => 'required|exists:users,id_user',
            'trademark'         => 'required|regex:/^[a-zA-Z0-9\sáéíóúÁÉÍÓÚüÜñÑ,.:;-]+$/',
            'model'             => 'required|regex:/^[a-zA-Z0-9\sáéíóúÁÉÍÓÚüÜñÑ,.:;-]+$/',
            'registration'      => 'required|regex:/^[0-9]{4} [A-Z]{3}$/|unique:vehicles',
            'mileage'           => 'required|numeric'
        ],
        "usedVehicles" => [ //8
            'id_vehicle'        => 'required|exists:vehicles,id_vehicle|unique:usedVehicles',
            'color'             => 'required|regex:/^[a-zA-Z0-9\sáéíóúÁÉÍÓÚüÜñÑ,.:;-]+$/',
            'img'               => 'required|string',
            'opinion'           => 'required|regex:/^[a-zA-Z0-9\sáéíóúÁÉÍÓÚüÜñÑ,.:;-]+$/',
            'price'             => 'required|numeric',
            'year'             =>  'required|numeric',
            'mileage'           => 'required|numeric',
            'numero_plazas'     => 'required|integer',
            'fecha_matriculacion' => 'required|date',
            'proxima_revision'  => 'required|date',
            'traccion'          => 'required|string',
            'distribucion'      => 'required|string',
            'largo'             => 'required|numeric',
            'alto'              => 'required|numeric',
            'ancho'             => 'required|numeric',
            'peso'              => 'required|numeric',
            'deposito'          => 'required|numeric',
            'maletero'          => 'required|numeric',
            'datos_adicionales' => 'nullable|string',
            'tipo_combustible'  => 'required|string',
            'consumo'           => 'required|numeric',
            'emisiones'         => 'required|numeric',
            'aceleracion'       => 'required|numeric',
            'velocidad'         => 'required|numeric'
        ],
        "paysheets" => [ //9
            'id_employee'       => 'required|exists:employees,id_employee',
            'salaryBase'        => 'required|numeric',
            'contractedHours'   => 'required|integer',
            'salaryExtra'       => 'required|numeric',
            'extraHours'        => 'required|integer',
            'salaryTotal'       => 'required|numeric',
            'deductions'        => 'required|numeric',
            'salaryNet'         => 'required|numeric',
            'payDate'           => 'required|date',
            'state'             => 'required|string'
        ],
        "paymentMethods" => [ //10
            'id_user'           => 'required|exists:users,id_user',
            'cardNumber'      => 'required|string|digits_between:12,19',
            'cardName'        => 'required|string',
            'cardSecurity'    => 'required|string|digits_between:3,4',
            'cardExpiryDate'  => 'required|date_format:m/y'
        ],
        "pays" => [ //11
            'id_card'         => 'required|exists:paymentMethods,id_card', //exists:table,column
            'id_invoice'      => 'required|exists:invoices,id_invoice'
        ],
        "invoiceDeductions" => [ //12
            'id_invoice'        => 'required|exists:invoices,id_invoice',
            'id_deduction'      => 'required|exists:deductions,id_deduction'
        ],
        "invoices" => [ //13
            'id_reparation' => 'required|exists:reparations,id_reparation',
            'invoiceDate'   => 'required|date',
            'totalPrice'    => 'required|numeric',
            'state'         => 'required|string',
        ],
        "employees" => [ //14
            'id_user'        => 'required|exists:users,id_user',
            'nss'            => 'required|numeric',
            'tipo_empleado'  => 'required|string',
        ],
        "deductions" => [ //15
            'deductionName'  => 'required|string',
            'description'    => 'nullable|string',
            'percentage'     => 'required|numeric|min:0|max:100',
            'isdeduction'    => 'required|boolean',
        ],
        "bookings" => [ //16
            'id_user'        => 'required|exists:users,id_user',
            'id_vehicle'     => 'required|exists:vehicles,id_vehicle',
            'date_booking'   => 'required|date',
        ],
        "reparationServices" => [ //17
            'id_reparation'   => 'required|exists:reparations,id_reparation', //exists:table,column
            'id_service'      => 'required|exists:services,id_service'
        ],
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

    /*funcion para encontrar los registros que coincidan por el campo pasado*/
    public function findByCamp($object, $model, $id)
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
     * 
     * todo required dado que el formulario se rellanara con los datos del objeto a actualizar, y el suaurio solo debera cambiar aquellosq ue quiere actualizar
     */
    public function update($params, $table, $object, $id, $key)
    {
        if (!empty($params) && !empty($object)) {

            $atributos = array_map('trim', $params);

            $validationRules = [];
            if ($table === 'products') { //1
                $validationRules = [
                    'id_supplier'   => 'required|exists:suppliers,id_supplier', //exists:table,column
                    'id_category'   => 'required|exists:categories,id_category',
                    'productName'   => "required|regex:/^[a-zA-Z0-9\sáéíóúÁÉÍÓÚüÜñÑ,.:;-]+$/|unique:products,productName,$id,id_product", //unique:table,column,except,idColumn
                    'description'   => 'required|regex:/^[a-zA-Z0-9\sáéíóúÁÉÍÓÚüÜñÑ,.:;-]+$/',
                    'price'         => 'required|numeric',
                    'stock'         => 'required|integer|min:0',
                    'marca'         => 'required|regex:/^[a-zA-Z0-9\sáéíóúÁÉÍÓÚüÜñÑ,.:;-]+$/',
                    'admisionDate'  => 'required|date',
                    'expiryDate'    => 'required|date|after:admisionDate',
                    'location'      => 'required|string',
                    'img'           => 'required|string'
                ];
            } elseif ($table === 'categories') { //2
                $validationRules = [
                    'categoryName'  => 'required|regex:/^[a-zA-Z0-9\sáéíóúÁÉÍÓÚüÜñÑ,.:;-]+$/|unique:categories',
                    'description' => 'required|regex:/^[a-zA-Z0-9\sáéíóúÁÉÍÓÚüÜñÑ,.:;-]+$/'
                ];
            } elseif ($table === 'suppliers') { //3
                $validationRules = [
                    'supplierName'      => 'required|regex:/^[a-zA-Z0-9\sáéíóúÁÉÍÓÚüÜñÑ,.:;-]+$/',
                    'lastName'          => 'required|regex:/^[a-zA-Z0-9\sáéíóúÁÉÍÓÚüÜñÑ,.:;-]+$/',
                    'email'             => 'required|email',
                    'phoneNumber'       => 'required|numeric',
                    'address'           => 'required',
                    'dni'               => "required|regex:/^[0-9]{8}[A-Za-z]$/|unique:suppliers,dni,$id,id_supplier"
                ];
            } elseif ($table === 'services') { //4
                $validationRules = [
                    'serviceName'       => 'required|regex:/^[a-zA-Z0-9\sáéíóúÁÉÍÓÚüÜñÑ,.:;-]+$/',
                    'description'       => 'required|regex:/^[a-zA-Z0-9\sáéíóúÁÉÍÓÚüÜñÑ,.:;-]+$/',
                    'price'             => 'required|numeric',
                    'duration'          => 'required|numeric',
                    'serviceType'       => 'required|regex:/^[a-zA-Z0-9\sáéíóúÁÉÍÓÚüÜñÑ,.:;-]+$/'
                ];
            } elseif ($table === 'reparationProducts') { //5
                $validationRules = [
                    'id_reparation'   => 'required|exists:reparations,id_reparation', //exists:table,column
                    'id_product'      => 'required|exists:products,id_product',
                    'quantity'        => 'required|numeric|integer'
                ];
            } elseif ($table === 'reparations') { //6
                $validationRules = [
                    'id_employee'        => 'required|exists:employees,id_employee',
                    'id_vehicle'        => 'required|exists:vehicles,id_vehicle',
                    'startDate'         => 'required|date',
                    'endDate'           => 'date|after:startDate',
                    'problemDescription' => 'required|regex:/^[a-zA-Z0-9\sáéíóúÁÉÍÓÚüÜñÑ,.:;-]+$/',
                    'solutionDescription' => 'required|regex:/^[a-zA-Z0-9\sáéíóúÁÉÍÓÚüÜñÑ,.:;-]+$/',
                    'state'             => 'required|regex:/^[a-zA-Z0-9\sáéíóúÁÉÍÓÚüÜñÑ,.:;-]+$/'
                ];
            } elseif ($table === 'vehicles') { //7
                $validationRules = [
                    'id_user'           => 'required|exists:users,id_user',
                    'trademark'         => 'required|regex:/^[a-zA-Z0-9\sáéíóúÁÉÍÓÚüÜñÑ,.:;-]+$/',
                    'model'             => 'required|regex:/^[a-zA-Z0-9\sáéíóúÁÉÍÓÚüÜñÑ,.:;-]+$/',
                    'registration'      => "required|regex:/^[0-9]{4} [A-Z]{3}$/|unique:vehicles,registration,$id,id_vehicle",
                    'mileage'           => 'required|numeric'
                ];
            } elseif ($table === 'usedVehicles') { //8
                $validationRules = [
                    'id_vehicle'        => 'required|exists:vehicles,id_vehicle',
                    'color'             => 'required|regex:/^[a-zA-Z0-9\sáéíóúÁÉÍÓÚüÜñÑ,.:;-]+$/',
                    'img'               => 'required|string',
                    'opinion'           => 'required|regex:/^[a-zA-Z0-9\sáéíóúÁÉÍÓÚüÜñÑ,.:;-]+$/',
                    'price'             => 'required|numeric',
                    'year'              => 'required|numeric',
                    'mileage'           => 'required|numeric',
                    'numero_plazas'     => 'required|integer',
                    'fecha_matriculacion' => 'required|date',
                    'proxima_revision'  => 'required|date',
                    'traccion'          => 'required|string',
                    'distribucion'      => 'required|string',
                    'largo'             => 'required|numeric',
                    'alto'              => 'required|numeric',
                    'ancho'             => 'required|numeric',
                    'peso'              => 'required|numeric',
                    'deposito'          => 'required|numeric',
                    'maletero'          => 'required|numeric',
                    'datos_adicionales' => 'nullable|string',
                    'tipo_combustible'  => 'required|string',
                    'consumo'           => 'required|numeric',
                    'emisiones'         => 'required|numeric',
                    'aceleracion'       => 'required|numeric',
                    'velocidad'         => 'required|numeric'
                ];
            } elseif ($table === 'reparationServices') { //9
                $validationRules = [
                    'id_reparation'   => 'required|exists:reparations,id_reparation', //exists:table,column
                    'id_service'      => 'required|exists:services,id_service'
                ];
            } elseif ($table === 'paysheets') { //10
                $validationRules = [
                    'id_employee'       => 'required|exists:employees,id_employee',
                    'salaryBase'        => 'required|numeric',
                    'contractedHours'   => 'required|integer',
                    'salaryExtra'       => 'required|numeric',
                    'extraHours'        => 'required|integer',
                    'salaryTotal'       => 'required|numeric',
                    'deductions'        => 'required|numeric',
                    'salaryNet'         => 'required|numeric',
                    'payDate'           => 'required|date',
                    'state'             => 'required|string'
                ];
            } elseif ($table === 'paymentMethods') { //11
                $validationRules = [
                    'id_user'         => 'required|exists:users,id_user',
                    'cardNumber'      => 'required|string|digits_between:12,19',
                    'cardName'        => 'required|string',
                    'cardSecurity'    => 'required|string|digits_between:3,4',
                    'cardExpiryDate'  => 'required|date_format:m/y'
                ];
            } elseif ($table === 'pays') { //12
                $validationRules = [
                    'id_card'         => 'required|exists:paymentMethods,id_card', //exists:table,column
                    'id_invoice'      => 'required|exists:invoices,id_invoice'
                ];
            } elseif ($table === 'invoiceDeductions') { //13
                $validationRules = [
                    'id_invoice'        => 'required|exists:invoices,id_invoice',
                    'id_deduction'      => 'required|exists:deductions,id_deduction'
                ];
            } elseif ($table === 'invoices') { //14
                $validationRules = [
                    'id_reparation' => 'required|exists:reparations,id_reparation',
                    'invoiceDate'   => 'required|date',
                    'totalPrice'    => 'required|numeric',
                    'state'         => 'required|string',
                ];
            } elseif ($table === 'deductions') { //15
                $validationRules = [
                    'deductionName'  => 'required|string',
                    'description'    => 'nullable|string',
                    'percentage'     => 'required|numeric|min:0|max:100',
                    'isdeduction'    => 'required|boolean',
                ];
            } elseif ($table === 'bookings') { //16
                $validationRules = [
                    'id_user'        => 'required|exists:users,id_user',
                    'id_vehicle'     => 'required|exists:vehicles,id_vehicle',
                    'date_booking'   => 'required|date',
                ];
            } elseif ($table === 'paysheets') { //17
                $validationRules = [
                    'id_employee'       => 'required|exists:employees,id_employee',
                    'salaryBase'        => 'required|numeric',
                    'contractedHours'   => 'required|integer',
                    'salaryExtra'       => 'required|numeric',
                    'extraHours'        => 'required|integer',
                    'salaryTotal'       => 'required|numeric',
                    'deductions'        => 'required|numeric',
                    'salaryNet'         => 'required|numeric',
                    'payDate'           => 'required|date',
                    'state'             => 'required|string'
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
