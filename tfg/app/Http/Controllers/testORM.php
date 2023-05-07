<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

/*Este controlador basicamente va a coger los modelos y hacer pruebas de que funcione correctamente, teneis informacion
inicial en el controlador pruebasController.php*/

use App\Models\supplier;
use App\Models\category;
use App\Models\product;
use App\Models\reparation;
use App\Models\serviceProduct;
use App\Models\service;
use App\Models\serviceReparation;
use App\Models\User;
use App\Models\vehicle;

class testORM extends Controller
{


    public function testORM()
    {
?>
        <html lang='es'>

        <head>
            <meta charset='UTF-8'>
            <meta http-equiv='X-UA-Compatible' content='IE=edge'>
            <meta name='viewport' content='width=device-width, initial-scale=1.0'>
            <title>TEST ORM MODELS</title>
        </head>

        <body style="margin: 5%; background-color: burlywood; ">
            <h1 style=" text-align: center;">Pruebas modelos con base de datos</h1>

    <?php

        echo "<div style='margin: 5% 0;'><h2> Modelo Producto </h2>";
        $products = product::all();
        foreach ($products as $product) {
            echo "<h4>" . $product->productName . "</h4>";
            echo "<p> Categoria: " . $product->categories->categoryName . "</p>";
            echo "<p> Proveedor: " . $product->suppliers->supplierName . "</p>";
        }
        echo "</div>";


        echo "<div style='margin: 5% 0;'><h2> Modelo Categoria </h2>";
        $categories = category::all();
        foreach ($categories as $category) {
            echo "<h4> categoria: $category->categoryName </h4>";
            foreach ($category->products as $product) {
                echo "<h5> En esta categoria tenemos el producto" . $product->productName . "</h5>";
                echo "<p> cuya categoria como deciamos es: " . $product->categories->categoryName . "</p>";
                echo "<p> cuyo proveedor es: " . $product->suppliers->supplierName . "</p>";
            }
        }
        echo "</div>";


        echo "<div style='margin: 5% 0;'><h2> Modelo Supplier </h2>";
        $suppliers = supplier::all();
        foreach ($suppliers as $supplier) {
            echo "<h4> Nombre: $supplier->supplierName </h4>";
            foreach ($supplier->products as $product) {
                echo "<h5> Producto que proporciona:" . $product->productName . "</h5>";
                echo "<p> cuya categoria es: " . $product->categories->categoryName . "</p>";
                foreach ($product->serviceproduct as $sp) {
                    echo "<p> cuyo id serviceProduct es: " . $sp->id_serviceProduct . ", relacion con producto: " . $sp->id_product . " y servicio " . $sp->id_service . "</p>";
                }
            }
        }
        echo "</div>";


        echo "<div style='margin: 5% 0;'><h2> ServiceProduct </h2>";
        $serviceProduct = serviceProduct::all();
        foreach ($serviceProduct as $sp) {
            echo "<h4> id: $sp->id_serviceProduct </h4>";
            echo "<p> producto asociado: " . $sp->products->productName . "</p>"; //aqui solo vamos a tener un porducto asociado por la relacion, es decir no recorremos un arraay solo hay un registro con ese id
            echo "<p> servicio asociado: " . $sp->services->serviceName . "</p>";
        }
        echo "</div>";


        echo "<div style='margin: 5% 0;'><h2> Service </h2>";
        $services = service::all();
        foreach ($services as $service) {
            echo "<h4> nombre del servicio: $service->serviceName </h4>";
            foreach ($service->serviceproduct as $sp) {
                echo "<p> id de los serviceproducts relacionados: " . $sp->id_serviceProduct . "</p>";
            }

            foreach ($service->servicereparation as $sr) {
                echo "<p> id de los serviceproducts relacionados: " . $sr->id_serviceReparation . "</p>";
            }
        }
        echo "</div>";


        echo "<div style='margin: 5% 0;'><h2> ServiceReparation </h2>";
        $serviceReparation = serviceReparation::all();
        foreach ($serviceReparation as $sr) {
            echo "<h4> id: $sr->id_serviceReparation </h4>";
            echo "<p> reparacion asociada: " . $sr->reparations->id_reparation . "</p>";
            echo "<p> servicio asociado: " . $sp->services->serviceName . "</p>";
        }
        echo "</div>";


        echo "<div style='margin: 5% 0;'><h2> Reparation </h2>";
        $reparations = reparation::all();
        foreach ($reparations as $reparation) {
            echo "<h4> id: $reparation->id_reparation </h4>";
            echo "<p>  del vehiculo con id: " . $reparation->vehicle->id_vehicle . "</p>";
            echo "<p>  con invocie con id: " .  $reparation->invoice->id_invoice . "</p>";

            foreach ($reparation->employeeReparation as $er) {
                echo "<p> id de los employeeRelacionados relacionados: " . $er->id_employeeReparation . "</p>";
            }

            foreach ($reparation->serviceReparation as $sr) {
                echo "<p> id de los ServiciosRelacionados relacionados: " . $sr->id_serviceReparation . "</p>";
            }
        }
        echo "</div>";


        echo "<div style='margin: 5% 0;'><h2> vehicle </h2>";
        $vehicles = vehicle::all();
        foreach ($vehicles as $vehicle) {
            echo "<h4> id vehiculo: $vehicle->id_vehicle </h4>";
            echo "<p>  nombre del propietario: " . $vehicle->user->userName . "</p>";
            echo "<p>  color(solo si es anunciado) : " .  $vehicle->usedVehicle->color . "</p>";

            foreach ($vehicle->reparations as $reparation) {
                echo "<p> reparaciones del vehiculo: " . $reparation->id_reparation . "</p>";
            }

            foreach ($vehicle->bookings as $booking) {
                echo "<p> id de las reservas relalizadas: " . $booking->id_booking . "</p>";
            }
        }
        echo "</div>";


        echo "<div style='margin: 5% 0;'><h2> User </h2>";
        $users = User::all();
        foreach ($users as $user) {
            echo "<h4> id user: $user->id_user, cuyo nombre es: $user->userName </h4>";
            if (!empty($user->employee->id_employee)) {
                echo "<p>  si es empleado tiene id: " . $user->employee->id_employee . "</p>";
            }

            foreach ($user->vehicles as $vehicle) {
                echo "<p> vehiculo asociado con id: " . $vehicle->id_vehicle . "</p>";
            }

            foreach ($user->bookings as $booking) {
                echo "<p> id de las reservas relalizadas: " . $booking->id_booking . "</p>";
            }

            foreach ($user->paymentMethods as $pm) {
                echo "<p> numeros de tarjeta : " . $pm->cardNumber . "</p>";
            }
        }
        echo "</div>";


        echo "</body>";
        die();
    }
}
