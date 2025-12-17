<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class VotingRoom extends Model
{
    protected $fillable = [
        "user_id",
        "name",
        "privacy",
        "start_date",
        "end_date",
    ];

    public function user(){
        return $this->belongsTo(User::class);
    }

    protected $cast = [
        'start_date' => 'datetime',
        'end_date' => 'datetime',
    ];

    public function positions(){
        return $this->hasMany(VotingPosition::class);
    }
    
    
}
