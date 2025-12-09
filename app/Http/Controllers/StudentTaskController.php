<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Subject;
use App\Models\StudentTask;
use Illuminate\Http\Request;

class StudentTaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Subject/Tasks/tasks');
    }

    public function studentTasks($subject_id){
        $subject = Subject::with('teacher')->findOrFail($subject_id);
        $tasks = StudentTask::where('subject_id', $subject_id)->get();

        return Inertia::render('Subject/Tasks/tasks',compact('tasks','subject'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name'=> 'required|min:5|max:255',
            'desciption'=> 'nullable|max:500',
            'due_date'=> 'nullable',
            'subject_id'=> 'exists:subjects,id',
        ]);

        StudentTask::create([
            'name' => $request->name,
            'subject_id' => $request->subject_id,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(StudentTask $studentTask)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(StudentTask $studentTask)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, StudentTask $studentTask)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(StudentTask $studentTask)
    {
        //
    }
}
