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
        Schema::create('full_names', function (Blueprint $table) {
            $table->id('vcard_id');
            $table->string('vcard_fname');
            $table->string('vcard_mname')->nullable();
            $table->string('vcard_lname');
            $table->unsignedBigInteger('vcard_suffix')->default(0);
            $table->foreign('vcard_suffix')->references('id')->on('suffixes');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('full_names');
    }
};
