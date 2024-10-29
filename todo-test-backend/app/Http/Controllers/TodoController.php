<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTodoRequest;
use App\Http\Requests\UpdateTodoRequest;
use App\Http\Resources\TodoResource;
use App\Models\Todo;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\Response;

class TodoController extends Controller {
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request) {
        try {
            $status = $request->query('status');
            $query = Todo::latest();
            if ($status) {
                $query->where('status', $status);
            }
            $todos = $query->get();

            return TodoResource::collection($todos);
        } catch (\Exception $e) {
            Log::error('Failed to fetch todos: ' . $e->getMessage());
            return response()->json(['message' => 'Failed to fetch todos'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTodoRequest $request) {
        try {
            $request->validated();

            $todo = Todo::create([
                'title' => $request->title,
                'description' => $request->description,
                'status' => 'Pending',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ]);

            return new TodoResource($todo);
        } catch (\Exception $e) {
            Log::error('Failed to create todo: ' . $e->getMessage());
            return response()->json(['message' => 'Failed to create todo'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTodoRequest $request, $id) {
        try {
            $request->validated();

            $todo = Todo::findOrFail($id);
            $todo->update([
                'title' => $request->title,
                'description' => $request->description,
                'status' => $request->status,
                'updated_at' => Carbon::now()
            ]);

            return new TodoResource($todo);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'Todo not found'], Response::HTTP_NOT_FOUND);
        } catch (\Exception $e) {
            Log::error('Failed to update todo: ' . $e->getMessage());
            return response()->json(['message' => 'Failed to update todo'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id) {
        try {
            $todo = Todo::findOrFail($id);
            $todo->delete();

            return response()->json(['message' => 'Todo deleted successfully'], Response::HTTP_NO_CONTENT);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'Todo not found'], Response::HTTP_NOT_FOUND);
        } catch (\Exception $e) {
            Log::error('Failed to delete todo: ' . $e->getMessage());
            return response()->json(['message' => 'Failed to delete todo'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
