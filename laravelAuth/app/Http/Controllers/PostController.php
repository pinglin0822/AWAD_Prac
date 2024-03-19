<?php
namespace App\Http\Controllers;
use Illuminate\Support\Facades\Gate;
use Illuminate\Http\Request;
use App\Models\Post;
use App\Models\User;
class PostController extends Controller
 
{    
    public function index()
    {
        return Post::all();
    }
   
    public function store(Request $request)
    {      
        return Post::create($request->all());        
    }
    public function update(Request $request, $id)
    {
        $post=Post::findOrFail($id);
        $post->update($request->all());
        return $post;
    }
 
    public function destroy($id)
    {
        $post=Post::findOrFail($id);
        $post->delete();
        return 204;
    }
}