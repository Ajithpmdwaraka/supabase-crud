import { useState } from "react"
import "./App.css"
import supabase from "./supabase"
import { useEffect } from "react"

function App() {
  const [todoList, setTodoList] = useState([])
  const [newTodo, setNewTodo] = useState("")

  useEffect(() => {
    fetchTodos()
  }, [])

  const fetchTodos = async () => {
    const { data, error } = await supabase.from("TodoList").select("*")
    if (error) {
      console.log("Error fetching data", error)
    } else {
      setTodoList(data)
    }
  }

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
      console.log("Error adding todo", error)
    } else {
      setTodoList((prev) => [...prev, data])
      setNewTodo("")
    }
  }

  return (
    <>
      <div>
        <h1>ToDo App</h1>
      </div>
      <div>
        <input
          type="text"
          placeholder="New ToDo"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button onClick={addToDo}>Add Todo Items </button>
      </div>
      <ul>
        {todoList.map((todo) => (
          <li>
            <p>{todo.name}</p>
            <button> {todo.isCompleted ? "Undo" : "Complete Task"}</button>
          </li>
        ))}
      </ul>
    </>
  )
}

export default App
