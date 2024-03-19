
<?php
 
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Auth\LoginController;

use App\Http\Controllers\Auth\RegisterController;

use App\Http\Controllers\PostController;

use Illuminate\Support\Facades\Gate;
 
Route::get('/posts/create', [PostController::class, 'create']);

Route::get('/posts/edit', [PostController::class, 'edit']);

Route::get('/posts/delete', [PostController::class, 'delete']);
 
Route::get('/posts/index', [PostController::class, 'index']);

Route::delete('/posts/{post}', [PostController::class, 'destroy']);

Route::view('/posts/create', 'post.create');

Route::post('/posts', [PostController::class, 'create']);
 
Route::get('/posts/show', [PostController::class, 'show']);

/* V2

Route::get('/posts/create', [PostController::class, 'create'])->middleware('can:isAuthor')->name('post.create');

Route::get('/posts/edit', [PostController::class, 'edit'])->middleware('can:isAuthor')->name('post.edit');

Route::get('/posts/delete', [PostController::class, 'delete'])->middleware('can:isAdmin')->name('post.delete');

*/
 
Route::view('/', 'welcome');

Auth::routes();

Route::get('/login/admin', [LoginController::class, 'showAdminLoginForm']);

Route::get('/login/author', [LoginController::class,'showAuthorLoginForm']);

Route::get('/register/admin', [RegisterController::class,'showAdminRegisterForm']);

Route::get('/register/author', [RegisterController::class,'showAuthorRegisterForm']);

Route::post('/login/admin', [LoginController::class,'adminLogin']);

Route::post('/login/author', [LoginController::class,'authorLogin']);

Route::post('/register/admin', [RegisterController::class,'createAdmin']);

Route::post('/register/author', [RegisterController::class,'createAuthor']);

Route::group(['middleware' => 'auth:author'], function () {

Route::view('/author', 'author');

});

Route::group(['middleware' => 'auth:admin'], function () {

Route::view('/admin', 'admin');

});

Route::get('logout', [LoginController::class,'logout']);

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');