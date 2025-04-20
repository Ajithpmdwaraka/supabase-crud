import { useState } from "react"
import "./App.css"
import supabase from "./supabase"

function App() {
  const [todoList, setTodoList] = useState([])
  const [newTodo, setNewTodo] = useState("")

  const addToDo = async () => {
    const newTodoData = {
      name: newTodo,
      isCompleted: false,
    }
    const { data, error } = await supabase
      .from("TodoList")
      .insert([newTodoData])
      .single()
    
    if (error) {
      console.log("Error adding todo", error);
    } else {
      setTodoList((prev) => [...prev, data]);
      setNewTodo("");
    }
  };

  return (
    <>
      <div>
        <h1>ToDo App</h1>
      </div>
      <div>
        <input
          type="text"
          placeholder="New ToDo"
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button onClick={addToDo}>Add Todo Items </button>
      </div>
      <ul></ul>
    </>
  )
}

export default App
