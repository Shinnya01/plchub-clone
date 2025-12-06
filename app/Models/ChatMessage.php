<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ChatMessage extends Model
{
    protected $fillable = [
        "user_id",
        "group_chat_id",
        "message",
    ];

    public function user(){
        return $this->belongsTo(User::class);
    }

    public function GroupChat(){
        return $this->belongsTo(GroupChat::class);
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
