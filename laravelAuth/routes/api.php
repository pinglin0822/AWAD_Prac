<?php
 
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PostController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
 
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
 
Route::get('/posts', [PostController::class, 'index']);//http://localhost:8000/api/posts
Route::post('/post', [PostController::class, 'store']); //http://localhost:8000/api/post
Route::put('/post/{id}', [PostController::class, 'update']);//http://localhost:8000/api/post
Route::delete('/post/{id}', [PostController::class, 'destroy']);//http://localhost:8000/api/post