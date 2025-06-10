<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('suffixes', function (Blueprint $table) {
            $table->id();
            $table->string('sfx_name');
        });

        // Insert default suffix values
        DB::table('suffixes')->insert([
            ['sfx_name' => 'None'],
            ['sfx_name' => 'Jr.'],
            ['sfx_name' => 'Sr.'],
            ['sfx_name' => 'III'],
            ['sfx_name' => 'IV'],
            ['sfx_name' => 'V'],
            ['sfx_name' => 'VI'],
            ['sfx_name' => 'VII'],
            ['sfx_name' => 'VIII'],
            ['sfx_name' => 'IX'],
            ['sfx_name' => 'X'],
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('suffixes');
    }
};
