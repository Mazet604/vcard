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
        Schema::create('work_addresses', function (Blueprint $table) {
            $table->id('wa_id');
            $table->string('wa_street');
            $table->string('wa_city');
            $table->string('wa_state');
            $table->string('wa_postal_code');
            $table->string('wa_country');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('work_addresses');
    }
};
