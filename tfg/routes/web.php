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


//rutas controlador funcion prueba
Route::get('/user/prueba', 'App\Http\Controllers\UserController@prueba');
Route::get('/vehicle/prueba', 'App\Http\Controllers\VehicleController@prueba');
Route::get('/usedVehicle/prueba', 'App\Http\Controllers\UsedVehicleController@prueba');
Route::get('/supplier/prueba', 'App\Http\Controllers\SupplierController@prueba');
Route::get('/service/prueba', 'App\Http\Controllers\ServiceController@prueba');
Route::get('/reparation/prueba', 'App\Http\Controllers\ReparationController@prueba');
Route::get('/serviceProduct/prueba', 'App\Http\Controllers\ServiceProductController@prueba');
Route::get('/serviceReparation/prueba', 'App\Http\Controllers\ServiceReparationController@prueba');
Route::get('/product/prueba', 'App\Http\Controllers\productController@prueba');
Route::get('/category/prueba', 'App\Http\Controllers\categoryController@prueba');


//Rutas controlador de usuarios
Route::post('/user/register', 'App\Http\Controllers\UserController@register'); //estas ruta no se pueden acceder directamente con url, es decir necesitamos formulario 
Route::post('/user/login', 'App\Http\Controllers\UserController@login');
Route::put('/user/update', 'App\Http\Controllers\UserController@update'); //put se utiliza para actualizar datos
Route::get('/user/detailsUser/{id}', 'App\Http\Controllers\UserController@detailsUser');


//Rutas controlador de vehiculo usados
Route::post('/usedVehicle/uploadImage', 'App\Http\Controllers\usedVehicleController@uploadImage')->middleware(\App\Http\Middleware\ApiAuthMiddleware::class);
Route::get('/usedVehicle/getImage/{filename}', 'App\Http\Controllers\usedVehicleController@getImage')->middleware(\App\Http\Middleware\ApiAuthMiddleware::class); //filename sera una paremtro obligatorio en esta ruta


//Rutas del controlador de categorias
/*en este caso vamos a definir las rutas de una manera diferente, como vemos hemos ido creando las rutas una a una, ahora haremos que se creen automaticamente*/
Route::resource('/category', 'App\Http\Controllers\CategoryController');

// Rutas del controlador de Productos
Route::resource('/product', 'App\Http\Controllers\ProductController');
