<?php

class TasksController extends \BaseController {

    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index()
    {
        //$task = Tasks::where('user_id', Auth::user()->id)->get();
        $user_id = Input::get('user_id');
        $date = Input::get('date');

        $taskLists = Tasklists::whereHas("assignedUsers",function ($q) use($date, $user_id){
            $q->where('user_id','=',$user_id);
            $q->where("end",">",$date);
        })
            ->with("tasks")
            ->get();
        $start = new \DateTime($date);
        $end = new \DateTime($date);
        $end->modify('+1 day');
        $tasklistToday= [];
        $taskIds = [];
        foreach($taskLists as $tasklist){
            $rule        = new \Recurr\Rule($tasklist->rrule, $tasklist->start, $tasklist->end);
            $constraint = new \Recurr\Transformer\Constraint\BetweenConstraint($start,$end,true);

            $transformer = new \Recurr\Transformer\ArrayTransformer();
            $occurrences = $transformer->transform($rule,null,$constraint);
            if($occurrences->get(0)){
                $tasklistToday[] = $tasklist;
                foreach($tasklist->tasks as $task){
                    $taskIds[]=$task->id;
                }
            }
        }
        if(!empty($taskIds)){
            //Foreach task, check if it has been completed or not
            //Query tasklists with all (task_id) and where user_id AND date
            $tasks = DB::table('tasks_created')
                ->whereIn('task_id',$taskIds)
                ->where("user_id",$user_id)
                ->where("date",$date)
                ->get();
            $taskMap = array();
            foreach($tasks as $task){
                $taskMap[$task->id] =$task;
            }

            foreach($tasklistToday as $tasklist){
                foreach($tasklist->tasks as $task){
                    if(isset($taskMap[$task->id])){
                        $task['completed'] = true;
                    }
                }
            }
        }

        return Response::json($tasklistToday, 200);
    }


    /**
     * Store a newly created resource in storage.
     *
     * @return Response
     */
    public function store()
    {
        $input = Input::json();
        $task = new Tasks();
        if($input->get("instructions")){
            $task->instructions = $input->get('instructions');
        }
        if($input->get("name")){
            $task->name = $input->get('name');
        }
        if($input->get("due_by")){
            $task->due_by = $input->get('due_by');
        }
        if($input->get("tasklist_id")){
            $task->tasklist_id = $input->get('tasklist_id');
        }
        if($input->get("alert")){
            $task->alert = $input->get('alert');
        }
        $task->save();

        return Response::json($task->toArray(),
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
        $tasks = Tasks::where('id', $id)
            ->take(1)
            ->get();

        return Response::json($tasks[0],
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
        $tasks = Tasks::find($id);

        $tasks->name = $input->get('name',$tasks->name);
        $tasks->alert = $input->get('alert',$tasks->alert);
        $tasks->instructions = $input->get('instructions',$tasks->instructions);

        $tasks->save();

        return Response::json($tasks->toArray(),200);
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
