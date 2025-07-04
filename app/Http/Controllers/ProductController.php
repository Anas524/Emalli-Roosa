<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function search(Request $request)
    {
        $query = $request->input('q');

        $products = Product::with('perfumeDetail')
            ->where('name', 'like', "%{$query}%")
            ->orWhere('description', 'like', "%{$query}%")
            ->orWhere('category', 'like', "%{$query}%")
            ->get();

        // Add slug for frontend matching
        $results = $products->map(function ($product) {
            return [
                'id' => $product->id,
                'name' => $product->name,
                'slug' => $product->slug,
                'image' => $product->image,
                'price' => $product->price,
                'description' => $product->description,
                'category' => $product->category,
                'details' => $product->perfumeDetail
            ];
        });

        return response()->json($results);
    }

    public function showEmalliPage()
    {
        $products = Product::with('perfumeDetail')->get();
        return view('emalli', compact('products'));
    }
}
