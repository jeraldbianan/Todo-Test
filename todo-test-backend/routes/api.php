<?php

use App\Http\Controllers\TodoController;
use Illuminate\Support\Facades\Route;

Route::resource('todos', TodoController::class)->only(['index', 'store', 'update', 'destroy']);
