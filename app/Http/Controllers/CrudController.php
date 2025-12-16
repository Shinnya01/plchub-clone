<?php

namespace App\Http\Controllers;

use App\Models\crud;
use Inertia\Inertia;
use Illuminate\Http\Request;

class CrudController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $cruds = crud::all();
        return Inertia::render('fullcrud', compact('cruds'));
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
        $validated = $request->validate([
            'name' => 'required|min:4',
            'description' => 'nullable|min:4',
        ]);

        $crud = crud::create($validated);

        return back()->with('success', 'created sakses');
    }

    /**
     * Display the specified resource.
     */
    public function show(crud $crud)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(crud $crud)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, crud $crud)
    {
        $crud->name = $request->name;
        $crud->description = $request->description;

        $crud->save();

        return back()->with('success','updated');

        
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(crud $crud)
    {
        $crud->delete();

        return back()->with('success','deleted');
    }
}
