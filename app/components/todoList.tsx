"use client"

import { useState, useEffect } from "react"
import { createItem, getItems, updateItem } from "@/lib/api"
import CheckList from "./checkList"
import SearchBar from "./searchBar"
import EmptyList from "./emptyList"

interface TodoItem {
  id: number
  name: string
  isCompleted: boolean
}

export default function TodoList() {
  const [todos, setTodos] = useState<TodoItem[]>([])
  const [input, setInput] = useState("")

  // 페이지 진입 시 목록 조회
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

  // 할 일 추가
  const addTodo = async () => {
    if (!input.trim()) return

    try {
      const newItem = await createItem(input)
      setTodos((prev) => [
        ...prev,
        {
          id: newItem.id,
          name: newItem.name,
          isCompleted: newItem.isCompleted,
        },
      ])
      setInput("")
    } catch (error) {
      console.error(error)
    }
  }

  // 할 일 토글
  const toggleTodo = async (id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id
          ? { ...todo, isCompleted: !todo.isCompleted }
          : todo
      )
    )

    // 서버에도 반영
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
    <div className="flex flex-col items-center gap-8">
      <SearchBar
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onAdd={addTodo}
      />

      <div className="grid grid-cols-2 gap-6 w-full max-w-4xl">
        {/* TO DO */}
        <div>
          <div className="mb-2">
            <span className="px-4 py-1 rounded-full bg-[var(--color-lime-300)] font-bold text-[var(--color-slate-900)]">
              TO DO
            </span>
          </div>

          {todoList.length === 0 ? (
            <EmptyList showTodoEmpty /> // To Do 비었을 때만 표시
          ) : (
            <div className="flex flex-col gap-3">
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

        {/* DONE 구역 */}
        <div>
          <div className="mb-2">
            <span className="px-4 py-1 rounded-full bg-[var(--color-amber-800)] text-white font-bold">
              DONE
            </span>
          </div>

          {doneList.length === 0 ? (
            <EmptyList showDoneEmpty /> // Done 비었을 때만 표시
          ) : (
            <div className="flex flex-col gap-3">
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