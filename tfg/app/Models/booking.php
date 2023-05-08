<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class booking extends Model
{
    use HasFactory;

    protected $table = "bookings";
    protected $primaryKey = 'id_booking';

    public function vehicle()
    {
        return $this->belongsTo('App\Models\vehicle', "id_vehicle", "id_vehicle");
    }

    public function user()
    {
        return $this->belongsTo('App\Models\User', "id_user", "id_user");
    }
}
