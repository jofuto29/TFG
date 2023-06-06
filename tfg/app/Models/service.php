<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class service extends Model
{
    use HasFactory;

    protected $table = "services";
    protected $primaryKey = 'id_service';

    public function reparationServices()
    {
        return $this->hasMany('App\Models\reparationServices', 'id_service', 'id_service');
    }
}
