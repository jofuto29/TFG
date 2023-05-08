<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class invoice extends Model
{
    use HasFactory;

    protected $table = "invoices";
    protected $primaryKey = 'id_invoice';

    public function pays()
    {
        return $this->hasMany('App\Models\pay', 'id_invoice', 'id_invoice');
    }

    public function reparation()
    {
        return $this->belongsTo('App\Models\reparation', "id_reparation", "id_reparation");
    }
}
