<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;
use App\Models\Item;

class ItemController extends Controller
{
    //
    public function add(Request $request){
        $item = new Item;

        $item->name = $request->name;
        $item->description = $request->description;
        $item->price = $request->price;
        $item->save();

        $categories = Category::find($request->categories);
        $item->categories()->attach($categories);
    }
}
