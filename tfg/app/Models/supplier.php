<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class supplier extends Model
{
    use HasFactory;

    protected $table = "suppliers";

    //relacion 1 a muchos con productos [un proeevedor puede proporcionar muchos productos]
    public function products()
    { //esta funcion devolvera todos los porductos asociados al objeto supplier que lo llame
        return $this->hasMany('App\Models\product', 'id_supplier', 'id_supplier');
    }
}
