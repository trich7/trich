<?php

class TasklistsAssignationController extends \BaseController {

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index()
	{
		//
	}


	/**
	 * Store a newly created resource in storage.
	 *
	 * @return Response
	 */
	public function store($tasklist_id)
	{
        $input = Input::json();
        $user_id = $input->get("user_id");
        //TODO: Check that $user_id belongs to same organization
        $taskList = Tasklists::find($tasklist_id);
        $user = $taskList->assignedUsers()->attach($user_id,array(
            "start"=>$input->get("start"),
            "end"=>$input->get("end"),
            "created_at"=>new DateTime,
            "updated_at"=>new DateTime,
        ));


        $users = Users::where('id', $user_id)
            ->take(1)
            ->get();

        return Response::json($users->toArray()[0],
            200
        );
    }


	/**
	 * Display the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function show($id)
	{
		//
	}


	/**
	 * Update the specified resource in storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function update($id)
	{
		//
	}


	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function destroy($tasklist_id)
	{
        $input = Input::json();
        $user_id = $input->get("id");
        //TODO: Check that $user_id belongs to same organization
        $taskList = Tasklists::find($tasklist_id);
        $user = $taskList->assignedUsers()->detach($user_id);


        $users = $taskList->assignedusers;

        return Response::json($users->toArray(),
            200
        );
	}


}
