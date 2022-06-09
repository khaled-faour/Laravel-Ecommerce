<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;
use App\Models\Item;

class ItemController extends Controller
{
    //

    public function __construct(){
        $this->middleware('auth:api');
    }
    public function add(Request $request){
        $item = new Item;

        $item->name = $request->name;
        $item->description = $request->description;
        $item->price = $request->price;
        $item->image = $request->image;
        $item->save();

        $categories = Category::find($request->categories);
        $item->categories()->attach($categories);

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

        $item = Item::find($id);

        $item->name = $request->name;
        $item->description = $request->description;
        $item->price = $request->price;
        $item->image = $request->image;
        $item->save();


        return response()->json([
            "status"=>"success",
            "item"=>$item
        ], 200);
    }

    public function delete($id){
        if(!$id){
            return response()->json([
                "status"=>"failed"
            ], 500);
        }

        $item = Item::find($id);
        $item->delete();

        return response()->json([
            "status"=>"success",
            "item"=>$item
        ], 200);

    }

    public function get($id = null){
        
        if($id){
            $items = Item::find($id);
        }else{
            $items = Item::all();
        }

        return response()->json([
            "status"=>"success",
            "items"=>$items
        ], 200);
    }
}
