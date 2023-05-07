<?php

echo "hola";
echo "<script>console.log('hola')</script>";
echo "asi imprimimos por consola en el navegador";

/**
 * INFORMACION SOBRE EL PROYECTO
 * repositorio github --> https://github.com/jofuto29/www
 * 
 * 
 * composer.json --> tenemos informacion sobre el proyecto, version php que se utiliza, de laravel, podemos añadir mas librerias etc
 * 
 * APP/Http/controllers --> tendremos los controladores de las clases que el proyecto va a tener
 * 
 * /routes --> la rutas que el proyecto va a tener; En este caso la ruta / es : http://localhost/ServidorPruebasTFG/tfg/public/
 * Esa ruta en concreto tiene return view('welcome'); es decir cuando se acceda a esa ruta se mostrara el view welcome
 * 
 * /resources/views --> aqui estaran las vistas, lo que mostraremos al cliente
 * 
 * La ruta que estamso utilizando es muy larga, para esto existen los host virtuales y acceder al servidor de prueba con un dominio como veremos ahora:
 * 
 * 1. vamos al archivo: C:\wamp64\bin\apache\apache2.4.54.2\conf\extra\httpd-vhosts
 * 2. añadir ruta host virtuañ
 *        <VirtualHost *:80>
 *            DocumentRoot "${INSTALL_DIR}/www/ServidorPruebasTFG/tfg/public"
 *           ServerName tfg.com.devel
 *          ServerAlias www.tfg.com.devel
 *          <Directory "${INSTALL_DIR}/www/ServidorPruebasTFG/tfg/public">
 *           Options Indexes FollowSymLinks
 *                AllowOverride All
 *               Order Deny,Allow
 *               Allow from all
 *           </Directory>
 * 
 * 3. cambiar la ruta de host en C:\Windows\System32\drivers\etc\host y lke indicamos que cuando se haga una peticion a la ruta del servidor de pruebas no rediriga a loclahost
 * 
 * la ruta sera la siguiente: http://tfg.com.devel/
 * 
 * 
 * HEmos creado diferentes rutas en web.php, alguna reciben parametros por metodo get. 
 * Tambien hemos hecho que los datos se pasen a un vista y esta imprima la plantilla, en este caso solo un texto.
 * 
 * 
 * CRONTROLADROES
 * 
 * dentro de la carpeta del poryecto:
 * C:\wamp64\www\ServidorPruebasTFG\tfg >> php artisan make:controller PruebasController
 * En ese momento tendremos creado en la carpeta controllers dentro de http el controlador 
 * 
 * 
 * 
 * 
 * 
 * BASE DE DATOS DEL PROYECTO
 * lo primero que haremos sera crear la base ded datos, para ello una vez diseñada creamos dentro de nuestroporyecto un archivo con nobre database.sql
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 */
