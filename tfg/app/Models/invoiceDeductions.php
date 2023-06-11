<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class invoiceDeductions extends Model
{
    use HasFactory;

    protected $table = "invoicedeductions";
    protected $primaryKey = 'id_invoiceDeductions';

    public function deduction()
    {
        return $this->belongsTo('App\Models\deduction', "id_deduction", "id_deduction");
    }

    public function invoice()
    {
        return $this->belongsTo('App\Models\invoice', "id_invoice", "id_invoice");
    }
}
