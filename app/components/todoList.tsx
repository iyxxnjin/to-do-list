"use client"

import { useState, useEffect } from "react"
import { createItem, getItems, updateItem } from "@/lib/api"
import CheckList from "./checkList"
import SearchBar from "./searchBar"
import EmptyList from "./emptyList"
import Image from "next/image"
import TagTodo from "@/ui/images/tag/tag-todo.png"
import TagDone from "@/ui/images/tag/tag-done.png"

interface TodoItem {
  id: number
  name: string
  isCompleted: boolean
}

export default function TodoList() {
  const [todos, setTodos] = useState<TodoItem[]>([])
  const [input, setInput] = useState("")

  useEffect(() => {
    const fetchData = async () => {
      try {
        const items = await getItems()
        setTodos(items)
      } catch (e) {
        console.error("Error fetching todos:", e)
      }
    }
    fetchData()
  }, [])

  const addTodo = async () => {
    if (!input.trim()) return

    try {
      const newItem = await createItem(input)
      setTodos((prev) => [...prev, newItem])
      setInput("")
    } catch (error) {
      console.error(error)
    }
  }

  const toggleTodo = async (id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    )
    const targetTodo = todos.find((t) => t.id === id)
    if (!targetTodo) return
    try {
      await updateItem(id, { isCompleted: !targetTodo.isCompleted })
    } catch (err) {
      console.error("상태 업데이트 실패:", err)
    }
  }

  const todoList = todos.filter((t) => !t.isCompleted)
  const doneList = todos.filter((t) => t.isCompleted)

  return (
    <div className="flex flex-col items-center gap-8 w-full px-4 sm:px-6 lg:px-8">
      <SearchBar
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onAdd={addTodo}
      />

      {/* TODO / DONE 영역 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl">
        {/* TO DO */}
        <div className="w-full">
          <div className="mb-4 flex justify-start">
            <Image src={TagTodo} alt="TO DO 태그" width={100} height={30} className="object-contain" />
          </div>

          {todoList.length === 0 ? (
            <EmptyList showTodoEmpty />
          ) : (
            <div className="flex flex-col gap-4 w-full">
              {todoList.map((todo) => (
                <CheckList
                  key={todo.id}
                  itemId={todo.id}
                  text={todo.name}
                  done={todo.isCompleted}
                  onToggle={() => toggleTodo(todo.id)}
                />
              ))}
            </div>
          )}
        </div>

        {/* DONE */}
        <div className="w-full">
          <div className="mb-4 flex justify-start">
            <Image src={TagDone} alt="DONE 태그" width={100} height={30} className="object-contain" />
          </div>

          {doneList.length === 0 ? (
            <EmptyList showDoneEmpty />
          ) : (
            <div className="flex flex-col gap-4 w-full">
              {doneList.map((todo) => (
                <CheckList
                  key={todo.id}
                  itemId={todo.id}
                  text={todo.name}
                  done={todo.isCompleted}
                  onToggle={() => toggleTodo(todo.id)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}