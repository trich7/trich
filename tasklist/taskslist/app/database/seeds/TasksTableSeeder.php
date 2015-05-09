<?php
/**
 * Created by JetBrains PhpStorm.
 * User: beebe
 * Date: 9/9/14
 * Time: 9:36 PM
 * To change this template use File | Settings | File Templates.
 */
class TasksTableSeeder extends Seeder {

    public function run()
    {
        DB::table('tasks')->delete();

        Tasks::create(array(
            'name' => "Take out trash",
            'alert' => 1,
            'due_by' => '00:20:14',
            'tasklist_id'=>1
        ));
        Tasks::create(array(
            'name' => "Scrub Floor",
            'alert' => 0,
            'due_by' => '00:00:14',
            'tasklist_id'=>1
        ));
        Tasks::create(array(
            'name' => "Unlock Doors",
            'alert' => 0,
            'due_by' => '00:00:14',
            'tasklist_id'=>1
        ));
        Tasks::create(array(
            'name' => "Take meat out of freezer",
            'alert' => 0,
            'due_by' => '00:00:14',
            'tasklist_id'=>1
        ));


        Tasks::create(array(
            'name' => "Take meat out of freezer",
            'alert' => 0,
            'due_by' => '00:00:14',
            'tasklist_id'=>2
        ));
        Tasks::create(array(
            'name' => "Clean grill",
            'alert' => 0,
            'due_by' => '00:00:14',
            'tasklist_id'=>2
        ));
        Tasks::create(array(
            'name' => "Check soft drinks",
            'alert' => 0,
            'due_by' => '00:00:14',
            'tasklist_id'=>2
        ));

        DB::table('tasklists_users')->insert(
            array('tasklist_id' => 1, 'user_id' => 1, 'start' => "2014-10-12", 'end' => "2015-10-25")
        );
        DB::table('tasklists_users')->insert(
            array('tasklist_id' => 1, 'user_id' => 2, 'start' => "2014-10-12", 'end' => "2015-10-25")
        );
        DB::table('tasklists_users')->insert(
            array('tasklist_id' => 1, 'user_id' => 3, 'start' => "2014-10-12", 'end' => "2015-10-25")
        );
        DB::table('tasklists_users')->insert(
            array('tasklist_id' => 2, 'user_id' => 3, 'start' => "2014-10-12", 'end' => "2015-10-25")
        );
    }

}