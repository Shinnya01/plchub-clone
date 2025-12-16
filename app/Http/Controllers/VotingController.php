<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\VotingRoom;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class VotingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $publicRooms = VotingRoom::where('privacy', 'public')->with(['user'])->get();

        return Inertia::render("Voting/voting-rooms", compact('publicRooms'));
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
            "name"=> "required|min:4",
            "privacy" => "required|in:public,private",
            'start_date' => 'required|date|after_or_equal:today',
            'end_date'   => 'required|date|after_or_equal:start_date',
        ]);

        VotingRoom::create([
            "name"=> $request->name,
            "privacy"=> $request->privacy,
            'start_date' => $request->start_date,
            'end_date'   => $request->end_date,
            "user_id"=> Auth::id(),
        ]);

        return back()->with("success","Room created successfully!");
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $votingRoom =  VotingRoom::findOrFail($id);
        return Inertia::render("Voting/show-voting-room", compact("votingRoom"));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
