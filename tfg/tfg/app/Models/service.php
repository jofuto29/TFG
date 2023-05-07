<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class service extends Model
{
    use HasFactory;

    protected $table = "services";

    public function serviceproduct()
    {
        return $this->hasMany('App\Models\serviceProduct', 'id_service', 'id_service');
    }

    public function servicereparation()
    {
        return $this->hasMany('App\Models\serviceReparation', 'id_service', 'id_service');
    }
}
