<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class UserController extends Controller
{
    //
    public function __construct(){
        $this->middleware('auth:api');
    }

    public function get($id = null){
        if($id){
            $users = User::find($id);
        }else{
            $users = User::all();
        }

        return response()->json([
            "status"=>"success",
            "users"=>$users
        ], 200);
    }
}
