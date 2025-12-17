<?php

use Inertia\Inertia;
use Laravel\Fortify\Features;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CrudController;
use App\Http\Controllers\FeedController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\VotingController;
use App\Http\Controllers\SubjectController;
use App\Http\Controllers\GroupChatController;
use App\Http\Controllers\StudentTaskController;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::resource('user-management', UserController::class);
    Route::resource('news-feed', FeedController::class);
    Route::resource('group-chat', GroupChatController::class);
    Route::resource('subject', SubjectController::class);
    Route::resource('task', StudentTaskController::class);
    Route::resource('voting', VotingController::class);
    
    Route::post('group-chat/send-message', [GroupChatController::class, 'sendMessage']);
    Route::post('group-chat/group-request', [GroupChatController::class, 'groupRequest']);
    Route::post('group-chat/join-group', [GroupChatController::class, 'joinGroup']);
    Route::post('group-chat/leave-group', [GroupChatController::class, 'leaveGroup']);
    Route::post('group-chat/accept-user', [GroupChatController::class, 'acceptUser']);
    Route::post('group-chat/reject-user', [GroupChatController::class, 'rejectUser']);

    Route::post('subject/join-subject', [SubjectController::class, 'joinSubject']);

    Route::get("task/student-task/{subject_id}", [StudentTaskController::class, 'studentTasks']);    
    Route::get("task/show-task/{task}/{user}", [StudentTaskController::class, 'showTask']);    
    
    Route::post("task/comment/{task_id}/{user_id}", [StudentTaskController::class, 'comment']);    

    Route::post('voting/create-position', [VotingController::class, 'createPosition']);
    Route::post('voting/create-candidate/{position_id}', [VotingController::class, 'createCandidate']);







    Route::resource('/crud', CrudController::class);
});

require __DIR__.'/settings.php';
