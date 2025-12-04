<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\GroupChat;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class GroupChatController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $myGroups = GroupChat::where('owner_id', Auth::id())
                            ->get();
        $publicGroups = GroupChat::where('privacy', 'public')
                            ->whereNot('owner_id', Auth::id())
                            ->get();
                            
        return Inertia::render('Chat/group-chat', compact('myGroups', 'publicGroups'));
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
            
            'name'=> 'required|string',
            'privacy'=> 'required|in:public,private',
        ]);

        GroupChat::create([
            'owner_id' => Auth::id(),
            'name'=> $request->name,
            'privacy' => $request->privacy,
        ]);
        
        return back()->with('success','Group successfully created!');
    }

    /**
     * Display the specified resource.
     */
    public function show(GroupChat $groupChat)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(GroupChat $groupChat)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, GroupChat $groupChat)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(GroupChat $groupChat)
    {
        //
    }
}
