<?php

use Illuminate\Auth\UserTrait;
use Illuminate\Auth\UserInterface;
use Illuminate\Auth\Reminders\RemindableTrait;
use Illuminate\Auth\Reminders\RemindableInterface;

class Tasklists extends Eloquent {

	protected $table = "tasklists";
    protected $guarded = [];
    public function tasks()
    {
        return $this->hasMany("Tasks","tasklist_id");
    }
    public function user()
    {
        return $this->belongsTo("Users");
    }
    public function assignedUsers(){
        return $this->belongsToMany('Users',"tasklists_users",'tasklist_id',"user_id");
    }
}