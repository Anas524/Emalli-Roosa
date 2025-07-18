<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CheckoutController extends Controller
{
    public function index()
    {
        $cartItems = Cart::where('user_id', Auth::id())->with('product')->get();
        $subtotal = $cartItems->sum(fn($item) => $item->product->price * $item->quantity);
        $shipping = 5.00;

        return view('checkout', compact('cartItems', 'subtotal', 'shipping'));
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email',
            'phone' => 'required',
            'address' => 'required',
            'payment_method' => 'required',
        ]);

        // $order = Order::create([
        //     'user_id' => Auth::id(),
        //     'name' => $validated['name'],
        //     'email' => $validated['email'],
        //     'phone' => $validated['phone'],
        //     'address' => $validated['address'],
        //     'payment_method' => $validated['payment_method'],
        //     'subtotal' => $request->subtotal,
        //     'shipping' => 5.00,
        //     'total' => $request->subtotal + 5.00,
        // ]);

        // $cartItems = Cart::where('user_id', Auth::id())->get();
        // foreach ($cartItems as $item) {
        //     $order->items()->create([
        //         'product_id' => $item->product_id,
        //         'quantity' => $item->quantity,
        //         'price' => $item->product->price,
        //     ]);
        // }

        Cart::where('user_id', Auth::id())->delete();

        return redirect()->route('checkout.confirmation');
    }

    public function submit(Request $request)
    {
        // Handle order saving here
        // Validate inputs, create Order, etc.

        return redirect()->back()->with('success', 'Your order has been placed successfully!');
    }
}
