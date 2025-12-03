<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::firstOrCreate(
            ['email' => 'superadmin@gmail.com'],
            [
                'name' => 'Superadmin',
                'password' => Hash::make('password'),
                'role' => 'superadmin',
            ]
        );
        User::firstOrCreate(
            ['email' => 'admin@gmail.com'],
            [
                'name' => 'admin',
                'password' => Hash::make('password'),
                'role' => 'admin',
            ]
        );
        User::firstOrCreate(
            ['email' => 'org@gmail.com'],
            [
                'name' => 'org',
                'password' => Hash::make('password'),
                'role' => 'org',
            ]
        );
        User::firstOrCreate(
            ['email' => 'student@gmail.com'],
            [
                'name' => 'student',
                'password' => Hash::make('password'),
                'role' => 'student',
            ]
        );
    }
}
