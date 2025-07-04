<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Product;
use App\Models\PerfumeDetail;
use Illuminate\Support\Str;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Example Product 1
        $product1 = Product::create([
            'name' => 'Fleur Exquise',
            'slug' => Str::slug('Fleur Exquise'),
            'category' => 'perfume',
            'image' => 'images/img1.png',
            'price' => 120,
            'description' => 'An exquisite blend of rare florals and musk, capturing the elegance of a blooming garden in every drop.
                                       FLEUR EXQUISE opens with soft floral whispers that gradually bloom into a rich, graceful heart
                                       of white petals and subtle sweetness.
                                       The dry-down reveals a smooth, musky base that wraps the wearer in timeless sophistication. A
                                       perfect choice for elegant daywear, romantic evenings, or any moment that calls for refined
                                       beauty.'
        ]);

        PerfumeDetail::create([
            'product_id' => $product1->id,
            'ideal_for' => 'Women',
            'fragrance_notes' => 'White Florals, Soft Musk, Hints of Jasmine',
            'bottle_size' => '50ml',
            'concentration' => 'Eau de Parfum',
        ]);

        // Example Product 2
        $product2 = Product::create([
            'name' => 'Parfum de Jardin',
            'slug' => Str::slug('Parfum de Jardin'),
            'category' => 'perfume',
            'image' => 'images/img2.png',
            'price' => 140,
            'description' => 'A lush blend of ripe blackberry and sensual musk, entwined with delicate floral notes. An enchanting fragrance that captures the allure of a twilight garden.
                                       This lush blend features ripe blackberry, sensual musk, and delicate floral accords that unfold with elegance
                                       and depth. Perfect for evening wear or special moments, Parfum de Jardin evokes mystery and
                                       sophistication in every spritz.'
        ]);

        PerfumeDetail::create([
            'product_id' => $product2->id,
            'ideal_for' => 'Unisex',
            'fragrance_notes' => 'Blackberry, Musk, Florals',
            'bottle_size' => '100ml',
            'concentration' => 'Eau de Parfum',
        ]);

        // Example Product 3
        $product3 = Product::create([
            'name' => 'Lustre',
            'slug' => Str::slug('Lustre'),
            'category' => 'perfume',
            'image' => 'images/img3.png',
            'price' => 100,
            'description' => 'A radiant blend of crisp pear, warm cedar, and velvety musk. A fragrance that exudes effortless sophistication and luminous charm.
                                       This fragrance unfolds with a sparkling fruity top
                                       note that softens into a warm heart of woods and finishes with a sensual musk
                                       that lingers gracefully. Designed for those who appreciate understated luxury and
                                       luminous charm, it’s perfect for both daywear and sophisticated evening moments.'
        ]);

        PerfumeDetail::create([
            'product_id' => $product3->id,
            'ideal_for' => 'Women',
            'fragrance_notes' => 'Pear, Cedar, Musk',
            'bottle_size' => '100ml',
            'concentration' => 'Eau de Parfum',
        ]);
    }
}
