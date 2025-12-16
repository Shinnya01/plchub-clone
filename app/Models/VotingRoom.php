<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class VotingRoom extends Model
{
    protected $fillable = [
        "user_id",
        "name",
        "privacy",
    ];

    public function user(){
        return $this->belongsTo(User::class);
    }
    
}
