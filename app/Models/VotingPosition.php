<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class VotingPosition extends Model
{
    protected $fillable = [
        "name",
        "voting_room_id",

    ];

    public function candidates(){
        return $this->hasMany(VotingCandidates::class);
    }
}
