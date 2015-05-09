<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTasksCreatedTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
        Schema::create('tasks_created', function(Blueprint $table)
        {
            $table->integer('id',true);
            $table->integer('tasksrecurrence_id');
            $table->foreign('tasksrecurrence_id')->references('id')->on("tasklists_users")->onDelete('cascade');
            $table->datetime("time_due");
            $table->datetime("time_completed");
        });
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('tasks_created');
	}

}
