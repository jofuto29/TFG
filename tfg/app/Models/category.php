<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class category extends Model
{
    use HasFactory;

    //los modelos de Eloquest (el ORM), es el mapeo relacional de objetos, una capa de extraccion que nos proporciona una serie de clases y metodos para trabajar
    //con las tablas de la BD de una manera mas sencilla

    protected $table = "categories"; //tabla que relaciona el modelo
    protected $primaryKey = 'id_category';


    //relacion 1 a muchos con productos [una categoria puede tener muchos productos]
    public function products()
    { //esta funcion devolvera todos los porductos asociados al objeto categoria que lo llame
        return $this->hasMany('App\Models\product', "id_category", "id_category");
    }
}
