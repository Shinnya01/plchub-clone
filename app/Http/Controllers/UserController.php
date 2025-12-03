<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        switch (auth()->user()->role) {
            case 'superadmin':
                $users = User::where('role', '!=' , 'superadmin')->get();
                break;
            
            case 'admin':
                $users = User::whereNotIn('role', ['superadmin', 'admin'])->get();
                break;
            
            case 'org':
                $users = User::where('role' , 'student')->get();
                break;
            
            default:
                dd('error getting user info');
                break;
        }
        return Inertia::render('User/user-management', compact('users'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('User/create-user');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:6',
            'role' => 'required|string|in:admin,org,student', 
        ]);

        $validated['password'] = Hash::make($validated['password']);

        User::create($validated);

        return back()->with('success', $validated['role'] . ' Created Successfully!');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $user = User::where('id', $id)->first();
        return Inertia::render('User/show-user', compact('user'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $user = User::where('id' , $id)->first();
        return Inertia::render('User/edit-user', compact('user'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $user = User::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email',
            'role' => 'required|string',
        ]);

        $user->update($validated);

        return back()->with('success', 'User updated!');
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $user = User::findOrFail($id);
        $user->delete();
        switch ($user->role) {
            case 'admin':
                $role = 'admin';
                break;

            case 'org':
                $role = 'org';
                break;

            case 'student':
                $role = 'student';
                break;
            
            default:
                $role = 'undefined';
                break;
        }

        return back()->with('success', $role . ' deleted successfully!');
    }
}
