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
        Schema::create('socials', function (Blueprint $table) {
            $table->id('soc_id');
            $table->unsignedBigInteger('vcard_id');
            $table->string('soc_linkedin')->nullable();
            $table->string('soc_twitter')->nullable();
            $table->string('soc_facebook')->nullable();
            $table->string('soc_instagram')->nullable();
            $table->string('soc_youtube')->nullable();
            $table->string('soc_customlink')->nullable();
            $table->foreign('vcard_id')->references('vcard_id')->on('full_names')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('socials');
    }
};
