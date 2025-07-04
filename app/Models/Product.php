<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'name',
        'slug',
        'category',
        'image',
        'price',
        'description',
    ];

    // A Product has one PerfumeDetail
    public function perfumeDetail()
    {
        return $this->hasOne(PerfumeDetail::class);
    }
}
