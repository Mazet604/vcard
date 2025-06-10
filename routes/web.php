<?php

use Illuminate\Support\Facades\Route;
use App\Models\Suffix;
use Inertia\Inertia;
use App\Http\Controllers\VCardController;

Route::post('/vcard', [VCardController::class, 'store'])->name('vcard.store');

Route::get('/', function () {
    $suffixes = Suffix::all(['id', 'sfx_name']);
    return Inertia::render('welcome', [
        'suffixes' => $suffixes,
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
