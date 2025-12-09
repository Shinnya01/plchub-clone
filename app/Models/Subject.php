<?php

namespace App\Models;

use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Model;

class Subject extends Model
{
    protected $fillable = [
        "name",
        "teacher_id",
        "subject_code",
    ];

    protected static function booted()
    {
        static::creating(function ($subject) {
            do {
                $code = strtoupper(Str::random(10));
            } while (self::where('subject_code', $code)->exists());

            $subject->subject_code = $code;
        });
    }

    public function teacher(){
        return $this->belongsTo(User::class, 'teacher_id');
    }
}
