<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class getIdentityProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        require_once app_path() . '/Helpers/getIdentity.php';
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
