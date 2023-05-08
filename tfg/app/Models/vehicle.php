<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class vehicle extends Model
{
    use HasFactory;

    protected $table = "vehicles";
    protected $primaryKey = 'id_vehicle';

    public function reparations()
    {
        return $this->hasMany('App\Models\reparation', 'id_vehicle', 'id_vehicle');
    }

    public function bookings()
    {
        return $this->hasMany('App\Models\booking', 'id_vehicle', 'id_vehicle');
    }

    public function user()
    {
        return $this->belongsTo('App\Models\User', "id_user", "id_user");
    }

    public function usedVehicle()
    {
        return $this->belongsTo('App\Models\usedVehicle', "id_vehicle", "id_vehicle");
    }
}
