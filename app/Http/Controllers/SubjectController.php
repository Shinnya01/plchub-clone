<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Subject;
use Illuminate\Http\Request;
use App\Models\StudentSubject;
use Illuminate\Support\Facades\Auth;

class SubjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $subjects = Subject::where('teacher_id', Auth::id())
                            ->with(['teacher'])
                            ->withCount('students')
                            ->get();
        return Inertia::render('Subject/subject', compact('subjects'));
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
            'name' => 'required|string',
        ]);

        $subject = Subject::create([
            'name'=> $request->name,
            'teacher_id' => Auth::id(),
        ]);

        return back()->with('success','Subject created successfully!');
    }

    public function joinSubject(Request $request){

            $request->validate([
            'subject_code' => 'required|exists:subjects,subject_code',
            ], [
                'subject_code.exists' => 'Subject not found, please try again!',
            ]);


            $subject = Subject::where('subject_code',$request->subject_code)->first();
            
            StudentSubject::create([
                'user_id'=> Auth::id(),
                'subject_id' => $subject->id,
            ]);

            return back()->with('success','Join Successfully!');
    }

    /**
     * Display the specified resource.
     */
    public function show(Subject $subject)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Subject $subject)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Subject $subject)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Subject $subject)
    {
        //
    }
}
