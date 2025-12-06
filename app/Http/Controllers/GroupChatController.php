<?php

namespace App\Http\Controllers;

use App\Models\GroupRequest;
use Inertia\Inertia;
use App\Models\GroupChat;
use App\Models\ChatMessage;
use App\Models\GroupMember;
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
        $myGroups = GroupChat::whereHas('members', function ($q) {
                                    $q->where('user_id', Auth::id());
                                    })->get();


        $publicGroups = GroupChat::where('privacy', 'public')
                        ->where('owner_id', '!=', Auth::id())
                        ->whereDoesntHave('members', function ($q) {
                            $q->where('user_id', Auth::id());
                        })
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
            
            'name'=> 'required|string|min:1',
            'privacy'=> 'required|in:public,private',
        ]);

        $group = GroupChat::create([
            'owner_id' => Auth::id(),
            'name'=> $request->name,
            'privacy' => $request->privacy,
        ]);

        GroupMember::create([
            'user_id'=> Auth::id(),
            'group_chat_id'=> $group->id,
            'role' => 'admin',
        ]);
        
        return back()->with('success','Group successfully created!');
    }

    public function sendMessage(Request $request){
        
        ChatMessage::create([
            'user_id'=> Auth::id(),
            'message' => $request->message,
            'group_chat_id' => $request->group_chat_id,
        ]);

        return back();
    }

    public function groupRequest(Request $request){
        $request->validate([
            'group_code' => 'required|string|exists:group_chats,group_code',
        ]);
        
        $group = GroupChat::where('group_code', $request->group_code)->firstOrFail();

        if($group->owner_id === Auth::id()){
            return back()->withErrors(['group_code' => "You can't request to your own group"]);
        }
        
        GroupRequest::create([
            'user_id' => Auth::id(),
            'group_chat_id' => $group->id,
        ]);

        return back()->with('success','Group request successfully!');
        
    }

    public function joinGroup(Request $request){

        GroupMember::create([
            'user_id'=> Auth::id(),
            'group_chat_id'=> $request->group_chat_id,
        ]);

        return back()->with('success', 'joined successfully!');
    }

    public function leaveGroup(Request $request)
    {
        $request->validate([
            'group_chat_id' => 'required|exists:group_chats,id'
        ]);

        GroupMember::where('user_id', Auth::id())
                ->where('group_chat_id', $request->group_chat_id)
                ->delete();

        return redirect()->route('group-chat.index')->with('success', 'You have left the group.');
    }

    public function acceptUser(Request $request){

        $request->validate([
            'group_chat_id' => 'required|exists:group_chats,id',
            'request_id'    => 'required|exists:users,id', 
        ]);
        
        GroupMember::create([
            'user_id'=> $request->request_id,
            'group_chat_id'=> $request->group_chat_id,
        ]);

        GroupRequest::where('user_id', $request->request_id)
                    ->where('group_chat_id', $request->group_chat_id)
                    ->delete();

        return back()->with('success','Accepted successfully!');
    }

    public function rejectUser(Request $request){
        $request->validate([
            'group_chat_id' => 'required|exists:group_chats,id',
            'request_id'    => 'required|exists:users,id', 
        ]);

        GroupRequest::where('user_id', $request->request_id)
                    ->where('group_chat_id', $request->group_chat_id)
                    ->delete();

        return back()->with('success','Rejected successfully!');
    }

    /**
     * Display the specified resource.
     */
    public function show(GroupChat $groupChat)
    {
        $isMember = $groupChat->members()
                    ->where('user_id', Auth::id())
                    ->exists();

        if (!$isMember) {
            return back()->with('error', 'You are not a member of the group.');
        }

        $groupChat->load(['members.user', 'messages.user','requests.user']);
        return Inertia::render('Chat/chat-box', compact('groupChat'));
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
        $request->validate([
            'name'=> 'required|min:1',
            'privacy' => 'nullable|in:public,private',
        ]);

        $groupChat->name = $request->name;
        $groupChat->privacy = $request->privacy;
        
        $groupChat->save();

        return back()->with('success','Group updated successfully!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(GroupChat $groupChat)
    {
        //
    }
}
