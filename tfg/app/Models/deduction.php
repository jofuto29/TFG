<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class deduction extends Model
{
    use HasFactory;

    protected $table = "deductions";
    protected $primaryKey = 'id_deduction';

    public function invoiceDeductions()
    {
        return $this->hasMany('App\Models\invoiceDeduction', 'id_invoiceDeduction', 'id_invoiceDeduction');
    }
}
