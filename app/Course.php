<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
  protected $fillable = [
      'title', 'code', 'description', 'points', 'level'
  ];

    public function enrolments()
    {
        return $this->hasMany('App\Enrolment');
    }
}
