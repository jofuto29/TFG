<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class employeeReparation extends Model
{
    use HasFactory;

    protected $table = "employeereparation";
    protected $primaryKey = 'id_employeeReparation';

    public function employee()
    {
        return $this->belongsTo('App\Models\employee', "id_employee", "id_employee");
    }

    public function reparation()
    {
        return $this->belongsTo('App\Models\reparation', "id_reparation", "id_reparation");
    }
}
