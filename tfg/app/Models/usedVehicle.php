<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class usedVehicle extends Model
{
    use HasFactory;

    protected $table = "usedvehicles";
    protected $primaryKey = 'id_vehicle_used';

    public function vehicle()
    {
        return $this->belongsTo('App\Models\vehicle', "id_vehicle", "id_vehicle");
    }
}
