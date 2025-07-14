<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Validator;

class UrlShortenerController extends Controller
{
    public function shorten(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'url' => 'required|url|max:2048'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 422);
        }

        $originalUrl = $request->input('url');
        $shortCode = $this->generateShortCode();
        
        // Store in cache (you can also use database)
        $urlData = [
            'id' => time(),
            'original_url' => $originalUrl,
            'short_code' => $shortCode,
            'short_url' => url("/s/{$shortCode}"),
            'clicks' => 0,
            'created_at' => now()->toISOString(),
        ];

        Cache::put("url:{$shortCode}", $urlData, now()->addYear());
        
        return response()->json($urlData);
    }

    public function redirect($code)
    {
        $urlData = Cache::get("url:{$code}");
        
        if (!$urlData) {
            abort(404, 'Short URL not found');
        }

        // Increment click count
        $urlData['clicks']++;
        Cache::put("url:{$code}", $urlData, now()->addYear());

        return redirect($urlData['original_url']);
    }

    public function index()
    {
        // Get all URLs from cache (basic implementation)
        $urls = [];
        // In a real app, you'd store these in a database
        return response()->json($urls);
    }

    private function generateShortCode($length = 6)
    {
        do {
            $code = Str::random($length);
        } while (Cache::has("url:{$code}"));

        return $code;
    }
}