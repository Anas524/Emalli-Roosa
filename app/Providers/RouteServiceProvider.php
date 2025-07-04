<?php

namespace App\Providers;

use Illuminate\Support\Facades\URL;
use Illuminate\Foundation\Support\Providers\RouteServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Route;
use App\Http\Middleware\AdminOnly;

class RouteServiceProvider extends ServiceProvider
{
    public const HOME = '/?reset_password=1';

    public function boot()
    {
        parent::boot();

        // ✅ Manually register 'admin' middleware (in case Laravel skips routes/middleware.php)
        Route::middleware('admin', AdminOnly::class);

        // Optional: Force HTTPS in production
        // if ($this->app->environment('production')) {
        //     URL::forceScheme('https');
        // }
    }
}
