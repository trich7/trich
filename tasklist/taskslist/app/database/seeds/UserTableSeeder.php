<?php
/**
 * Created by JetBrains PhpStorm.
 * User: beebe
 * Date: 9/9/14
 * Time: 9:36 PM
 * To change this template use File | Settings | File Templates.
 */
class UserTableSeeder extends Seeder {

    public function run()
    {
        DB::table('users')->delete();


        Users::create(array(
            'username' => 'provomanager',
            'password' => Hash::make('provomanager'),
            'email' => 'ProvoStore@dp.com',
        ));

        Users::create(array(
            'username' => 'provostore',
            'password' => Hash::make('provostore'),
            'email' => 'ProvoStore2@dp.com',
        ));

        Users::create(array(
            'username' => 'oremstore',
            'password' => Hash::make('oremstore'),
            'email' => 'OremStore@dp.com',
        ));

        Users::create(array(
            'username' => 'oremstoremanager',
            'password' => Hash::make('oremstoremanager'),
            'email' => 'SpringeVilleStore@dp.com',
        ));
        Users::create(array(
            'username' => 'admin',
            'password' => Hash::make('admin'),
            'email' => 'admin',
        ));

    }

}