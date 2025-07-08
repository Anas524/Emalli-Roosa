<?php

namespace App\Http\Controllers;

use App\Models\Wishlist;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class WishlistController extends Controller
{
    public function index()
    {
        $wishlist = Wishlist::where('user_id', Auth::id())->with('product')->get();
        return view('wishlist', compact('wishlist'));
    }

    public function store(Request $request)
    {
        $exists = Wishlist::where('user_id', Auth::id())
            ->where('product_id', $request->product_id)
            ->exists();

        if (!$exists) {
            Wishlist::create([
                'user_id' => Auth::id(),
                'product_id' => $request->product_id
            ]);
        }

        return response()->json(['success' => true]);
    }

    public function destroy($id)
    {
        Wishlist::where('user_id', Auth::id())
            ->where('product_id', $id)
            ->delete();

        return redirect()->back();
    }
}
