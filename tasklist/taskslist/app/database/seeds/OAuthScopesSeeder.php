<?php
class OAuthScopesSeeder extends Seeder
{
    public function run()
    {
        DB::table('oauth_scopes')->insert(array(
            'id' => "basic",
            'scope' => "basic",
            'name' => "basic",
            'description' => "Scope for all endpoints",
        ));
    }
}