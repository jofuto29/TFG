<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class employee extends Model
{
    use HasFactory;

    protected $table = "employees";

    public function paysheets()
    {
        return $this->hasMany('App\Models\paysheet', 'id_employee', 'id_employee');
    }

    public function user()
    {
        return $this->belongsTo('App\Models\User', "id_user", "id_user");
    }

    public function employeeReparations()
    {
        return $this->hasMany('App\Models\employeeReparation', 'id_employee', 'id_employee');
    }
}
