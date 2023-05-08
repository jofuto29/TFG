<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class paysheet extends Model
{
    use HasFactory;

    protected $table = "paysheets";
    protected $primaryKey = 'id_paysheet';

    public function employee()
    {
        return $this->belongsTo('App\Models\employee', "id_employee", "id_employee");
    }
}
