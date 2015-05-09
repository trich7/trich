<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTasklistsUsersTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('tasklists_users', function(Blueprint $table)
		{
            $table->integer('id',true);
            $table->integer('tasklist_id');
            $table->foreign('tasklist_id')->references('id')->on("tasklists")->onDelete('cascade');
            $table->integer('user_id');
            $table->foreign('user_id')->references('id')->on("users")->onDelete('cascade');
            $table->date("start");
            $table->date("end");
            $table->timestamps();
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('tasklists_users');
	}

}
