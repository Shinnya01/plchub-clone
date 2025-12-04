<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

class Post extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'description',
        'image',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    protected $casts = [
    'created_at' => 'datetime',
    'updated_at' => 'datetime',
];

    public function getCreatedAtAttribute($value)
    {
        return \Carbon\Carbon::parse($value)
            ->timezone('Asia/Manila')
            ->format('Y-m-d g:i A');
    }

    public function getUpdatedAtAttribute($value)
    {
        return \Carbon\Carbon::parse($value)
            ->timezone('Asia/Manila')
            ->format('Y-m-d g:i A');
    }

}
