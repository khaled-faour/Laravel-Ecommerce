<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ItemController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CategoryController;
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



Route::controller(AuthController::class)->group(function () {
    Route::post('login', 'login');
    Route::post('register', 'register');
    Route::post('logout', 'logout');
    Route::post('refresh', 'refresh');

});


Route::prefix('store')->group(function(){
    Route::middleware('role.user')->group(function(){
        Route::controller(ItemController::class)->group(function(){
            Route::get('item/favorites', 'getFavorites')->name("item.getfavorites");
            Route::get('item/{id?}', 'get')->name("item.get");
            Route::post('item/{id}', 'addFavorite')->name("item.addfavorite");
        });    
        Route::controller(CategoryController::class)->group(function(){
            Route::get('category/{id?}', 'get')->name("item.get");
        });    
    });
});


Route::prefix("admin")->group(function(){
    Route::middleware('role.admin')->group(function(){
        Route::controller(ItemController::class)->group(function(){
            Route::post('item', 'add')->name("item.add");
            Route::put('item/{id}', 'update')->name("item.update");
            Route::delete('item/{id}', 'delete')->name("item.delete");
        });
    
        Route::controller(UserController::class)->group(function(){
            // Route::post('user', 'add')->name("item.add");
            Route::put('user/{id}', 'update')->name("user.update");
            Route::delete('user/{id}', 'delete')->name("user.delete");
            Route::get('user/{id?}', 'get')->name("user.get");
        });


        Route::controller(CategoryController::class)->group(function(){
            Route::post('category/', 'add')->name("category.add");
            Route::put('category/{id}', 'update')->name("category.update");
            Route::delete('category/{id}', 'delete')->name("category.delete");
        }); 
    });
});
