<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class serviceProduct extends Model
{
    use HasFactory;

    protected $table = "serviceproduct";

    public function products()
    {
        return $this->belongsTo('App\Models\product', "id_product", "id_product");
    }

    public function services()
    {
        return $this->belongsTo('App\Models\service', "id_service", "id_service");
    }
}
