<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class product extends Model
{
    use HasFactory;

    protected $table = "products";

    //relacion de muchos a 1 [muchos productos son proporcionados por un supplier]
    public function suppliers()
    {
        //ruta modelo consultar -- calve foranea porducto    -- id de la tabla suppliers
        return $this->belongsTo('App\Models\supplier', "id_supplier", "id_supplier");
    }

    //relacion de muchos a 1 [muchos productos pueden pertenecer a una categoria]
    public function categories()
    {
        return $this->belongsTo("App\Models\category", "id_category", "id_category");
    }

    //relacion de uno a muchos con la calse ServiceProduct[un producto puede pertenecer a muchos servicios]
    public function serviceproduct()
    {
        return $this->hasMany('App\Models\serviceProduct', 'id_product', 'id_product');
    }
}






/*Ahora para poder usar estos modelos que hemos creado necesitaremos un controlador o controladores, 
encargado de manejar toda la informacion que los modelos nos porporcionen*/
