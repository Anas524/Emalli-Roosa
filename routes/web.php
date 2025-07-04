<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Password;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Auth\Events\PasswordReset;
use App\Http\Controllers\AdminController;
use App\Models\Newsletter;
use App\Models\Contact;
use App\Http\Controllers\ProductController;

Route::get('/', [ProductController::class, 'showEmalliPage'])->name('home');

Route::post('/forgot-password', function (Request $request) {
    $request->validate(['email' => 'required|email']);

    $status = Password::sendResetLink($request->only('email'));

    return response()->json([
        'success' => $status === Password::RESET_LINK_SENT,
        'message' => __($status),
    ]);
})->name('password.email');


Route::get('/test-mail', function () {
    Mail::raw('This is a test email from Emalli Roosa', function ($message) {
        $message->to('your@email.com')
                ->subject('Test Mail from Laravel');
    });

    return 'Test mail attempted — check log!';
});

Route::post('/register', [AuthController::class, 'register'])->name('register');
Route::post('/login', [AuthController::class, 'login'])->name('login');
Route::post('/logout', [AuthController::class, 'logout'])->name('logout');

Route::get('/reset-password/{token}', function ($token, Request $request) {
    return view('emalli', [
        'resetToken' => $token,
        'email' => $request->email,
    ]);
})->middleware('guest')->name('password.reset');

Route::post('/reset-password', function (Request $request) {
    $request->validate([
        'token' => 'required',
        'email' => 'required|email',
        'password' => 'required|min:8|confirmed',
    ]);

    $status = Password::reset(
        $request->only('email', 'password', 'password_confirmation', 'token'),
        function ($user, $password) {
            $user->forceFill([
                'password' => Hash::make($password),
                'remember_token' => Str::random(60),
            ])->save();
        }
    );

    return $status == Password::PASSWORD_RESET
        ? redirect('/')->with('status', __($status)) // Optional: show success on login
        : back()->withErrors(['email' => [__($status)]]);
})->middleware('guest')->name('password.update');

Route::get('/admin', function () {
    return 'Admin redirect works!';
})->middleware(['auth']); // ← REMOVE 'admin' just for test

Route::middleware(['auth', 'admin'])->group(function () {
    Route::get('/admin/newsletters', [AdminController::class, 'viewNewsletters'])->name('admin.newsletters');
    Route::get('/admin/contacts', [AdminController::class, 'viewContacts'])->name('admin.contacts');
});

Route::post('/newsletter-submit', function (Request $request) {
    $request->validate([
        'email' => 'required|email|unique:newsletters,email',
    ]);

    Newsletter::create([
        'email' => $request->email,
    ]);

    return redirect()->back()->with('newsletter_success', 'You have subscribed successfully!');
})->name('newsletter.submit');

Route::post('/contact-submit', function (Request $request) {
    $request->validate([
        'name' => 'required',
        'email' => 'required|email',
        'message' => 'required',
    ]);

    Contact::create([
        'name' => $request->name,
        'email' => $request->email,
        'message' => $request->message,
    ]);

    return redirect()->back()->with('contact_success', 'Your message has been sent!');
})->name('contact.submit');

Route::get('/search-products', [ProductController::class, 'search']);