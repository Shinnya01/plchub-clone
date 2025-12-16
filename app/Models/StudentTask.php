<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StudentTask extends Model
{
    protected $fillable = [
        "name","description","subject_id","due_date","","","",
    ];

    public function subject(){
        return $this->belongsTo(Subject::class);
    }

    public function comment(){
        return $this->hasMany(TaskComment::class);
    }
}
