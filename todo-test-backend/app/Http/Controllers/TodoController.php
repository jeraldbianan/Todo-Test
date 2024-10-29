<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTodoRequest;
use App\Http\Requests\UpdateTodoRequest;
use App\Http\Resources\TodoResource;
use App\Models\Todo;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;

use function PHPSTORM_META\map;

class TodoController extends Controller {
    /**
     * Display a listing of the resource.
     */
    public function index() {
        return TodoResource::collection(Todo::latest()->get());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTodoRequest $request) {
        $request->validated();

        $todo = Todo::create([
            'title' => $request['title'],
            'description' => $request['description'],
            'status' => 'Pending',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);

        return new TodoResource($todo);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTodoRequest $request, Todo $todo) {
        $request->validated();
        $todo->update([
            'title' => $request->title,
            'description' => $request->description,
            'status' => $request->status,
            'updated_at' => Carbon::now()
        ]);

        return new TodoResource($todo);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Todo $todo) {
        $todo->delete();
    }
}
