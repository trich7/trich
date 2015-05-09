<?php

use Illuminate\Auth\UserTrait;
use Illuminate\Auth\UserInterface;
use Illuminate\Auth\Reminders\RemindableTrait;
use Illuminate\Auth\Reminders\RemindableInterface;

class Tasks extends Eloquent {

    protected $table = "tasks";
    public function tasklist()
    {
        return $this->belongsTo("Tasklists",'tasklist_id');
    }
}