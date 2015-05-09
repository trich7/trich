<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateTaskslistTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('tasklists', function(Blueprint $table)
		{
			$table->integer('id',true);
            $table->integer('user_id');
            $table->foreign('user_id')->references('id')->on('users');
			$table->string('rrule');
            $table->string('name');
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
		Schema::drop('tasklists');
	}

}
