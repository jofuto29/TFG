<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class deduction extends Model
{
    use HasFactory;

    protected $table = "deductions";
    protected $primaryKey = 'id_deduction';

    public function invoice()
    {
        return $this->belongsTo('App\Models\invoice', "id_invoice", "id_invoice");
    }
}
