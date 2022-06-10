<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;
use App\Models\Item;

class CategoryController extends Controller
{
    public function add(Request $request){
        $category = new Category;

        $category->category = $request->category;
        $category->save();

        return response()->json([
            "status"=>"success"
        ], 200);
    }


    public function update(Request $request, $id){
        if(!$id){
            return response()->json([
                "status"=>"failed"
            ], 500);
        }

        $category = Category::find($id);

        $category->category = $request->category;
        $category->save();


        return response()->json([
            "status"=>"success",
            "category"=>$category
        ], 200);
    }

    public function delete($id){
        if(!$id){
            return response()->json([
                "status"=>"failed"
            ], 500);
        }

        $category = Category::find($id);
        $category->delete();

        return response()->json([
            "status"=>"success",
            "category"=>$category
        ], 200);

    }

    public function get($id = null){
        
        if($id){
            $categories = Category::find($id);
        }else{
            $categories = category::all();
        }

        
        return response()->json([
            "status"=>"success",
            "categories"=>$categories
        ], 200);
    }
}
