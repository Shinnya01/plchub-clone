<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class GroupRequest extends Model
{
    protected $fillable = [
        "user_id",
        "group_chat_id",
    ];

    public function user(){
        return $this->belongsTo(User::class);
    }

    public function groupChat(){
        return $this->belongsTo(GroupChat::class);
    }
}
