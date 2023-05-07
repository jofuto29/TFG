<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class paymentMethod extends Model
{
    use HasFactory;

    protected $table = "paymentmethods";

    public function pays()
    {
        return $this->hasMany('App\Models\pay', 'id_card', 'id_card');
    }

    public function user()
    {
        return $this->belongsTo('App\Models\User', "id_user", "id_user");
    }
}
