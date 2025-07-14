<?php

use Illuminate\Support\Facades\Route;
use App\Models\Suffix;
use Inertia\Inertia;
use App\Http\Controllers\VCardController;
use App\Http\Controllers\UrlShortenerController;

Route::post('/vcard', [VCardController::class, 'store'])->name('vcard.store');

// Landing page (hub)
Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

// VCard Generator
Route::get('/vcard-generator', function () {
    $suffixes = Suffix::all(['id', 'sfx_name']);
    return Inertia::render('vcardgenerator', [
        'suffixes' => $suffixes,
    ]);
})->name('vcard-generator');

// URL Shortener
Route::get('/url-shortener', function () {
    return Inertia::render('urlshorten');
})->name('url-shortener');

// URL Shortener API routes
Route::post('/api/shorten', [UrlShortenerController::class, 'shorten'])->name('url.shorten');
Route::get('/s/{code}', [UrlShortenerController::class, 'redirect'])->name('url.redirect');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';