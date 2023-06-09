<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class reparation extends Model
{
    use HasFactory;

    protected $table = "reparations";
    protected $primaryKey = 'id_reparation';

    public function reparationServices()
    {
        return $this->hasMany('App\Models\reparationServices', 'id_reparation', 'id_reparation');
    }

    public function reparationProducts()
    {
        return $this->hasMany('App\Models\reparationProducts', 'id_reparation', 'id_reparation');
    }

    public function employee()
    {
        return $this->hasMany('App\Models\employee', 'id_employee', 'id_employee');
    }

    public function vehicle()
    {
        return $this->belongsTo('App\Models\vehicle', "id_vehicle", "id_vehicle");
    }

    public function invoice()
    {
        return $this->belongsTo('App\Models\invoice', "id_reparation", "id_reparation");
    }
}
