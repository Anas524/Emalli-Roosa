<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;

class BlogController extends Controller
{
    public function index()
    {
        $posts = Post::latest()->get();
        return response()->json($posts);
    }

    public function show($id) 
    {
        $post = Post::findOrFail($id);

        return response()->json([
            'title' => $post->title,
            'cover_image' => asset($post->image),
            'content' => $post->content,
        ]);
    }
}
