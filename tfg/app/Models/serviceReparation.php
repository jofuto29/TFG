<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class serviceReparation extends Model
{
    use HasFactory;

    protected $table = "servicereparation";
    protected $primaryKey = 'id_serviceReparation';

    public function reparations()
    {
        return $this->belongsTo('App\Models\reparation', "id_reparation", "id_reparation");
    }

    public function services()
    {
        return $this->belongsTo('App\Models\service', "id_service", "id_service");
    }
}
