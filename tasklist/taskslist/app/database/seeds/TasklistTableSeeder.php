<?php
/**
 * Created by JetBrains PhpStorm.
 * User: beebe
 * Date: 9/9/14
 * Time: 9:36 PM
 * To change this template use File | Settings | File Templates.
 */
class TasklistTableSeeder extends Seeder {

    public function run()
    {
        DB::table('tasklists')->delete();

        Tasklists::create(array(
            'user_id' => 5,
            'rrule' => 'FREQ=WEEKLY;INTERVAL=1;BYDAY=SA,SU;DTSTART=20141014T060000Z;UNTIL=20141129T070000Z',
            'name' => 'Weekend Closing',
        ));


        Tasklists::create(array(
            'user_id' => 5,
            'rrule' => 'FREQ=WEEKLY;INTERVAL=1;BYDAY=MO,TU,WE,TH,FR;DTSTART=20141014T060000Z;UNTIL=20141230T070000Z',
            'name' => 'Weekday Closing',
        ));
    }

}