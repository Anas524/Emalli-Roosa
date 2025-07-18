<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Carbon\Carbon;

class PostSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('posts')->insert([
            [
                'title' => 'Welcome to Our Blog!',
                'slug' => Str::slug('Welcome to Our Blog!'),
                'content' => '<p>This is our very first post. Stay tuned for more updates and news.</p>',
                'image' => 'uploads/posts/post1.jpg',
                'published_at' => Carbon::now(),
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'title' => 'Summer Collection Launch',
                'slug' => Str::slug('Summer Collection Launch'),
                'content' => '<p>Discover our latest summer collection with vibrant colors and new styles.</p>',
                'image' => 'uploads/posts/post2.jpg',
                'published_at' => Carbon::now()->subDays(2),
                'created_at' => Carbon::now()->subDays(2),
                'updated_at' => Carbon::now()->subDays(2),
            ],
            [
                'title' => 'Behind the Scenes of Our Photoshoot',
                'slug' => Str::slug('Behind the Scenes of Our Photoshoot'),
                'content' => '<p>Take a look behind the scenes of our latest photoshoot with exclusive insights.</p>',
                'image' => 'uploads/posts/post3.jpg',
                'published_at' => Carbon::now()->subDays(5),
                'created_at' => Carbon::now()->subDays(5),
                'updated_at' => Carbon::now()->subDays(5),
            ],
        ]);
    }
}
