<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Product;
use App\Models\Wishlist;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\log;

class CartController extends Controller
{
    public function store(Request $request)
    {
        // If you have authentication:
        $userId = Auth::id();

        // Validation
        $validated = $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'nullable|integer|min:1',
        ]);

        $quantity = $validated['quantity'] ?? 1;

        $cartItem = Cart::where('user_id', $userId)
            ->where('product_id', $validated['product_id'])
            ->first();

        if ($cartItem) {
            // Already in cart: don't increment, just leave as is (or you can uncomment to increment)
            //$cartItem->quantity += $quantity;
            //$cartItem->save();
        } else {
            // New: create with quantity 1
            Cart::create([
                'user_id' => $userId,
                'product_id' => $validated['product_id'],
                'quantity' => $quantity,
            ]);
        }    

        // Return updated cart count
        $count = Cart::where('user_id', $userId)->count();

        return response()->json([
            'success' => true,
            'cartCount' => $count
        ]);
    }

    public function update(Request $request)
    {
        $cartItem = Cart::where('user_id', Auth::id())
            ->where('product_id', $request->product_id)
            ->firstOrFail();

        $cartItem->quantity = $request->quantity;
        $cartItem->save();

        $rowSubtotal = $cartItem->product->price * $cartItem->quantity;
        $cartSubtotal = Cart::where('user_id', Auth::id())->get()->sum(fn($item) => $item->product->price * $item->quantity);
        $cartTotal = $cartSubtotal + 5; // Flat shipping

        return response()->json([
            'rowSubtotal' => $rowSubtotal,
            'cartSubtotal' => $cartSubtotal,
            'cartTotal' => $cartTotal
        ]);
    }

    public function destroy(Product $product)
    {
        $cartItem = Cart::where('user_id', Auth::id())
            ->where('product_id', $product->id)
            ->first();

        if ($cartItem) {
            $cartItem->delete();
        }

        $newCount = Cart::where('user_id', Auth::id())->sum('quantity');

        return response()->json(['success' => true, 'count' => $newCount]);
    }

    public function fetchCart()
    {
        Log::info('fetchCart() called');

        $userId = Auth::id();

        $cartItems = \App\Models\Cart::where('user_id', Auth::id())->with('product')->get();
        $subtotal = $cartItems->sum(function ($item) {
            return $item->product->price * $item->quantity;
        });
        $shipping = 5;

        // Also fetch wishlistIds if your partial needs them
        $wishlistIds = [];
        if ($userId) {
            $wishlistIds = \App\Models\Wishlist::where('user_id', $userId)->pluck('product_id')->toArray();
        }

        Log::info('fetchCart() before view render', ['cartCount' => count($cartItems)]);

        return view('partials.cart_items', compact('cartItems', 'subtotal', 'shipping', 'wishlistIds'))->render();
    }
}
