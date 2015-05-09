<?php
class OAuthClientsSeeder extends Seeder
{
    public function run()
    {
        DB::table('oauth_clients')->insert(array(
            'id' => "testclient",
            'secret' => "testpass"
        ));
    }
}