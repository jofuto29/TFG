<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class reparationProducts extends Model
{
    use HasFactory;

    protected $table = "reparationProducts";
    protected $primaryKey = 'id_reparationProducts';

    public function products()
    {
        return $this->belongsTo('App\Models\product', "id_product", "id_product");
    }

    public function reparations()
    {
        return $this->belongsTo('App\Models\reparation', "id_reparation", "id_reparation");
    }
}
