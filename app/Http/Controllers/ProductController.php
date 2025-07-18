<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Product;
use App\Models\Wishlist;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

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
        $posts = \App\Models\Post::latest()->get();

        // Get category counts using DB Facade
        $categoryCounts = DB::table('products')
            ->select('category', DB::raw('count(*) as total'))
            ->groupBy('category')
            ->pluck('total', 'category');

        if (Auth::check()) {
            $wishlist = Wishlist::where('user_id', Auth::id())->with('product')->get();
            $wishlistIds = $wishlist->pluck('product_id')->toArray();

            $cartItems = Cart::where('user_id', Auth::id())->with('product')->get();
            $subtotal = $cartItems->sum(function ($item) {
                return $item->product->price * $item->quantity;
            });
            $shipping = 5.00;
        } else {
            $wishlist = collect();
            $wishlistIds = [];
            $cartItems = collect();
            $subtotal = 0;
            $shipping = 0;
        }

        return view('emalli', compact(
            'products', 
            'wishlist', 
            'wishlistIds', 
            'categoryCounts',
            'cartItems',
            'subtotal',
            'shipping',
            'posts'
        ));
    }
}
