<?php

use App\Http\Middleware\ApiAuthMiddleware;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/


/**------------------- RUTAS DE PRUEBA ---------------------- */
Route::get('/', function () {
    return view('welcome');
});

/*
    parametro obligatorio de pasar por tura: /pruebas/{nombre} si queremos que no sea obligatorio nombre?, y en el caso de que la funcion no queramos que
    tenga un parametro obligatorio $nombre = null
    URL: http://tfg.com.devel/pruebas/josete
    */
Route::get('/pruebas/{nombre?}', function ($nombre = null) {
    $texto = '<h2>RUTA PRUEBAS CREADA</h2>';
    $texto .= 'nombre : ' . $nombre;
    return $texto;
});

/*
    Le pasamos a una vista parametros para que utiliza en su plantilla
    */

Route::get('/pruebasVista/{nombre?}', function ($nombre = null) {
    $texto = '<h2>RUTA PRUEBAS CREADA</h2>';
    $texto .= 'nombre : ' . $nombre;
    return view('pruebasVista', array(
        'texto' => $texto
    ));
});

/*ruta que cargara desde un controlador, en este caso el controlado de ejemplo pruebasController    --> http://tfg.com.devel/pruebasController */
Route::get('/pruebasController', 'App\Http\Controllers\PruebasController@index');

//ruta que carga otro metodo del mismo controlador pero esta vez esta funcion hace una consulta a la base de datos
Route::get('/pruebasControllerConsulta', 'App\Http\Controllers\PruebasController@testORM');

//ruta para test total ORM
Route::get('/testORM', 'App\Http\Controllers\testORM@testORM');




/** ------------------- RUTAS DEL PROYECTO API ----------------------  */

/*
    metodos http comunes

    GET: conseguir datos o recursos
    POST: guardar dato o recursos o hacer logica desde formularios(seguridad)
    PUT: actualizar recursos o datos
    DELETE: eliminar datos o recursos
*/


// (0) rutas controlador funcion prueba
Route::get('/user/prueba', 'App\Http\Controllers\UserController@prueba');
Route::get('/vehicle/prueba', 'App\Http\Controllers\VehicleController@prueba');
Route::get('/usedVehicle/prueba', 'App\Http\Controllers\UsedVehicleController@prueba');
Route::get('/supplier/prueba', 'App\Http\Controllers\SupplierController@prueba');
Route::get('/service/prueba', 'App\Http\Controllers\ServiceController@prueba');
Route::get('/reparation/prueba', 'App\Http\Controllers\ReparationController@prueba');
Route::get('/reparationProducts/prueba', 'App\Http\Controllers\reparationProductsController@prueba');
Route::get('/reparationServices/prueba', 'App\Http\Controllers\reparationServicesController@prueba');
Route::get('/product/prueba', 'App\Http\Controllers\productController@prueba');
Route::get('/category/prueba', 'App\Http\Controllers\categoryController@prueba');


// (1) Rutas controlador de usuarios
Route::post('/user/register', 'App\Http\Controllers\UserController@register'); //estas ruta no se pueden acceder directamente con url, es decir necesitamos formulario 
Route::post('/user/login', 'App\Http\Controllers\UserController@login');
Route::post('/user/sendMail', 'App\Http\Controllers\UserController@sendMail');
Route::put('/user/update', 'App\Http\Controllers\UserController@update'); //put se utiliza para actualizar datos
Route::get('/user/detailsUser/{id}', 'App\Http\Controllers\UserController@detailsUser');
Route::delete('/user/deleteUser/{id}', 'App\Http\Controllers\UserController@deleteUser');
Route::get('/user/listUsers', 'App\Http\Controllers\UserController@listUsers');
Route::get('/user/findByCamp/{camp}', 'App\Http\Controllers\UserController@findByCamp');

// (2) Rutas del controlador de employee
Route::resource('/employee', 'App\Http\Controllers\employeeController');
Route::get('/employee/findByCamp/{camp}', 'App\Http\Controllers\employeeController@findByCamp');

// (3) Rutas del controlador de Paysheet
Route::resource('/paysheet', 'App\Http\Controllers\paysheetController');

// (4) Rutas del controlador de paymentMethods
Route::resource('/paymentMethod', 'App\Http\Controllers\paymentMethodController');
Route::get('/paymentMethod/findByCamp/{camp}', 'App\Http\Controllers\paymentMethodController@findByCamp');

// (5) Rutas del controlador de vehicles
Route::resource('/vehicle', 'App\Http\Controllers\vehicleController');
Route::get('/vehicle/findByCamp/{camp}', 'App\Http\Controllers\vehicleController@findByCamp');

// (6) Rutas controlador de vehiculo usados
Route::resource('/usedVehicle', 'App\Http\Controllers\usedVehicleController');
Route::post('/usedVehicle/uploadImage', 'App\Http\Controllers\usedVehicleController@uploadImage'); //->middleware(\App\Http\Middleware\ApiAuthMiddleware::class);
Route::get('/usedVehicle/getImage/{filename}', 'App\Http\Controllers\usedVehicleController@getImage'); //->middleware(\App\Http\Middleware\ApiAuthMiddleware::class); //filename sera una paremtro obligatorio en esta ruta

// (7) Rutas del controlador de bookings
Route::resource('/booking', 'App\Http\Controllers\bookingController');

// (8) Rutas del controlador de categorias
/*en este caso vamos a definir las rutas de una manera diferente, como vemos hemos ido creando las rutas una a una, ahora haremos que se creen automaticamente*/
Route::resource('/category', 'App\Http\Controllers\CategoryController');

// (9) Rutas del controlador de Productos
Route::resource('/product', 'App\Http\Controllers\ProductController');
Route::post('/product/storeImage', 'App\Http\Controllers\productController@storeImage');
Route::get('/product/getImage/{filename}', 'App\Http\Controllers\productController@getImage');
Route::get('/product/getProductsByCategory/{id}', 'App\Http\Controllers\productController@getProductsByCategory');
Route::get('/product/getProductsBySupplier/{id}', 'App\Http\Controllers\productController@getProductsBySupplier');

// (10) Rutas del controlador de Suppliers
Route::resource('/supplier', 'App\Http\Controllers\SupplierController');

// (11) Rutas del controlador de Service
Route::resource('/service', 'App\Http\Controllers\ServiceController');

// (12) Rutas del controlador de ReparationProduct
Route::resource('/reparationProducts', 'App\Http\Controllers\reparationProductsController');
Route::get('/reparationProducts/findByCamp/{camp}', 'App\Http\Controllers\reparationProductsController@findByCamp');
Route::get('/reparationProducts/findByCampProduct/{camp}', 'App\Http\Controllers\reparationProductsController@findByCampProduct');

// (13) Rutas del controlador de reparation
Route::resource('/reparation', 'App\Http\Controllers\reparationController');
Route::get('/reparation/findByCamp/{camp}', 'App\Http\Controllers\reparationController@findByCamp');

// (14) Rutas del controlador de reparationService
Route::resource('/reparationServices', 'App\Http\Controllers\reparationServicesController');
Route::get('/reparationServices/findByCamp/{camp}', 'App\Http\Controllers\reparationServicesController@findByCamp');
Route::get('/reparationServices/findByCampService/{camp}', 'App\Http\Controllers\reparationServicesController@findByCampService');

// (15) Rutas del controlador de invoiceDeduciton
Route::resource('/invoiceDeductions', 'App\Http\Controllers\invoiceDeductionsController');
Route::get('/invoiceDeductions/findByCampInvoice/{camp}', 'App\Http\Controllers\invoiceDeductionsController@findByCampInvoice');
Route::get('/invoiceDeductions/findByCampDeduction/{camp}', 'App\Http\Controllers\invoiceDeductionsController@findByCampDeduction');

// (16) Rutas del controlador de decutions
Route::resource('/deduction', 'App\Http\Controllers\deductionController');

// (17) Rutas del controlador de invoices
Route::resource('/invoice', 'App\Http\Controllers\invoiceController');
Route::get('/invoice/findByCamp/{camp}', 'App\Http\Controllers\invoiceController@findByCamp');

// (18) Rutas del controlador de pagos
Route::resource('/pay', 'App\Http\Controllers\payController');
Route::get('/pay/findByCamp/{camp}', 'App\Http\Controllers\payController@findByCamp');
