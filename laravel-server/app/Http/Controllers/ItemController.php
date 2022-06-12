<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;


use App\Models\Category;
use App\Models\Item;

class ItemController extends Controller
{

    public function add(Request $request){
        $image = $request->image;
        $image_parts = explode(";base64,", $image);
        $image_type_aux = explode("image/", $image_parts[0]);
        $image_type = $image_type_aux[1];
        $image_base64 = base64_decode($image_parts[1]);
        $uniqid = uniqid();
        $imageName = $uniqid . '.'.$image_type;

        $item = new Item;

        $item->name = $request->name;
        $item->description = $request->description;
        $item->price = $request->price;
        $item->image = '/storage/images/'.$imageName;
        $item->save();
        Storage::disk('images')->put($imageName, $image_base64);

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
        $imageName = '';
        $image_base64 = '';
        $item = Item::find($id);

        $item->name = $request->name;
        $item->description = $request->description;
        $item->price = $request->price;

        if(!str_contains($request->image, $item->image)){
            $image = $request->image;
            $image_parts = explode(";base64,", $image);
            $image_type_aux = explode("image/", $image_parts[0]);
            $image_type = $image_type_aux[1];
            $image_base64 = base64_decode($image_parts[1]);
            $uniqid = uniqid();
            $imageName = $uniqid . '.'.$image_type;

            $item->image = '/storage/images/'.$imageName;
        }
        $item->save();
        Storage::disk('images')->put($imageName, $image_base64);


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
            $items->categories = $items->categories()->get();
        }else{
            $items = Item::all();
            foreach($items as $item){
                $item->categories = $item->categories()->get();
            }
        }

        
        return response()->json([
            "status"=>"success",
            "items"=>$items
        ], 200);
    }

    public function addFavorite($id){
        DB::table('favorites')->insert([
            'item_id'=>$id,
            'user_id'=>Auth::user()->id,
        ]);

        return response()->json([
            "status"=>"success"
        ], 200);
    }

    public function getFavorites(){
        $favorites = DB::table('favorites')->where('user_id','=', Auth::user()->id)->get();

        return response()->json([
            "status"=>"success",
            "favorites"=> $favorites
        ], 200);
    }
}
