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

    public function members()
    {
        return $this->hasMany(GroupMember::class);
    }

    public function requests() {
        return $this->hasMany(GroupRequest::class);
    }

    public function messages()
    {
       return $this->hasMany(ChatMessage::class);
    }


    protected static function booted()
    {
        static::creating(function ($groupChat) {
            do {
                $code = strtoupper(Str::random(10));
            } while (self::where('group_code', $code)->exists());

            $groupChat->group_code = $code;
        });
    }
    
}
