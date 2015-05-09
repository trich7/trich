<?php

class TasklistsController extends \BaseController {

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index()
	{
        $tasklists = Tasklists::where('user_id', Auth::user()->id)->with("tasks")->get();

        return Response::json($tasklists->toArray(), 200);
	}


	/**
	 * Store a newly created resource in storage.
	 *
	 * @return Response
	 */
	public function store()
	{
        $input = Input::json();
		$taskList = new Tasklists();
        $taskList->user_id =Auth::user()->id;

        if($input->get("rrule")){
            $taskList->rrule = $input->get('rrule');
        }
        if($input->get("name")){
            $taskList->name = $input->get('name');
        }
        $taskList->save();

        return Response::json($taskList->toArray(),
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
        // Make sure current user owns the requested resource
        $tasklist = Tasklists::where('user_id', Auth::user()->id)
            ->with("tasks")
            ->with("assignedUsers")
            ->where('id', $id)
            ->take(1)
            ->get();
        return Response::json($tasklist[0],
            200
        );
	}


	/**
	 * Update the specified resource in storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function update($id)
	{
        $input = Input::json();
        $tasklist = Tasklists::where('user_id', Auth::user()->id)->find($id);

        $tasklist->rrule = $input->get('rrule',$tasklist->rrule);
        $tasklist->name = $input->get('name',$tasklist->name);

        $tasklist->save();

        return Response::json($tasklist->toArray(),200);
	}


	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function destroy($id)
	{
		//
	}


}
