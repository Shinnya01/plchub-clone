<?php

namespace App\Models;

use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Model;

class GroupChat extends Model
{
    protected $fillable = [
        "owner_id",
        "name",
        "group_code",
        "privacy",
    ];

    public function user(){
        return $this->belongsTo(User::class, "owner_id");
    }

    protected static function booted()
    {
        static::creating(function ($groupChat) {
            do {
                $code = strtoupper(Str::random(10));
            } while (self::where('code', $code)->exists());

            $groupChat->group_code = $code;
        });
    }
}
