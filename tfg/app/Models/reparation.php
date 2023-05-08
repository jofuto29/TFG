<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class reparation extends Model
{
    use HasFactory;

    protected $table = "reparations";
    protected $primaryKey = 'id_reparation';

    public function servicereparation()
    {
        return $this->hasMany('App\Models\serviceReparation', 'id_reparation', 'id_reparation');
    }

    public function employeeReparation()
    {
        return $this->hasMany('App\Models\employeeReparation', 'id_reparation', 'id_reparation');
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
