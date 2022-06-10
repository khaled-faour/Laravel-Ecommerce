<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class UserController extends Controller
{
   


    public function update(Request $request, $id){
        if(!$id){
            return response()->json([
                "status"=>"failed"
            ], 500);
        }

        $user = User::find($id);

        $user->first_name = $request->first_name;
        $user->last_name = $request->last_name;
        $user->phone_number = $request->phone_number;
        $user->email = $request->email;
        $user->dob = $request->dob;
        $user->save();


        return response()->json([
            "status"=>"success",
            "user"=>$user
        ], 200);
    }

    public function delete($id){
        if(!$id){
            return response()->json([
                "status"=>"failed"
            ], 500);
        }

        $user = User::find($id);
        $user->delete();

        return response()->json([
            "status"=>"success",
            "user"=>$user
        ], 200);

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
