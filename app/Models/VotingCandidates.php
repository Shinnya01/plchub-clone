<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class VotingCandidates extends Model
{
    protected $fillable = [
        "name",
        "voting_position_id",
        "description",
        "image",

    ];

    public function position(){
        return $this->belongsTo(VotingPosition::class);
    }
}
