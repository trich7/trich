<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class ChangeTaskCompleteTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
        //$table->foreign('tasksrecurrence_id')->references('id')->on("tasklists_users")->onDelete('cascade');
        Schema::table('tasks_created', function($table)
        {
            $table->dropForeign('tasks_created_tasksrecurrence_id_foreign');
            $table->dropColumn('tasksrecurrence_id');

            $table->date("date");

            $table->integer('task_id');
            $table->foreign('task_id')->references('id')->on("tasks")->onDelete('cascade');


            $table->integer('user_id');
            $table->foreign('user_id')->references('id')->on("users")->onDelete('cascade');


        });

	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		//
	}

}
