<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the Closure to execute when that URI is requested.
|
*/

Route::post('oauth/access_token', function()
{
    return AuthorizationServer::performAccessTokenFlow();
});
Route::get('/', function()
{

});

Route::filter('login', function()
{
    $login = Auth::loginUsingId(ResourceServer::getOwnerId());
});


Route::group(array('before' => 'oauth|login'),function(){
    Route::resource('tasklists', 'TasklistsController');
    Route::resource('tasklists.assignation', 'TasklistsAssignationController');
    Route::resource('tasks', 'TasksController');
    Route::resource('users', 'UsersController');
    Route::resource('tasks', 'TasksController');
});