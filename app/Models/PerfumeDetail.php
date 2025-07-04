<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PerfumeDetail extends Model
{
    protected $fillable = [
        'product_id',
        'ideal_for',
        'fragrance_notes',
        'bottle_size',
        'concentration',
    ];

    // Each PerfumeDetail belongs to a Product
    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
