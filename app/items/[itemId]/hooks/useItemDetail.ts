"use client"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { updateItem } from "@/lib/api"

interface Todo {
  id: number
  name: string
  done: boolean
  memo?: string
  imageUrl?: string
  isCompleted: boolean
}



export function useItemDetail(BASE_URL: string, TENANT_ID: string, itemId?: string) {
  const router = useRouter()

  const [todo, setTodo] = useState<Todo | null>(null)
  const [image, setImage] = useState<string>("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!itemId) return
    const fetchTodo = async () => {
      try {
        const res = await fetch(`${BASE_URL}/${TENANT_ID}/items/${itemId}`)
        if (!res.ok) throw new Error("데이터 로드 실패")
        const data = await res.json()
        setTodo(data)
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    fetchTodo()
  }, [itemId, BASE_URL, TENANT_ID])

    // 체크 상태 토글
  const handleToggleComplete = async () => {
    if (!todo) return
    try {
      await updateItem(todo.id, { isCompleted: !todo.isCompleted })
      setTodo((prev: Todo | null) => {
        if (!prev) return prev
        return { ...prev, isCompleted: !prev.isCompleted }
      })
    } catch (e) {
      console.error(e)
    }
  }
  // TODO 수정 저장
  const handleSave = async () => {
    if (!todo) return
    try {
      const res = await fetch(`${BASE_URL}/${TENANT_ID}/items/${itemId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: todo.name,
          memo: todo.memo,
          isCompleted: todo.isCompleted,
          imageUrl: todo.imageUrl,
        }),
      })
      if (!res.ok) throw new Error("수정 실패")
      return true
    } catch (e) {
      console.error(e)
      return false
    }
  }

 // DELETE 처리
  const handleDelete = async () => {
    if (!confirm("정말 삭제하시겠어요?")) return
    try {
      const res = await fetch(`${BASE_URL}/${TENANT_ID}/items/${itemId}`, {
        method: "DELETE",
      })
      if (!res.ok) throw new Error("삭제 실패")
      alert("삭제 완료!")
      router.push("/")
    } catch (err) {
      console.error(err)
    }
  }

 // 이미지 업로드
  const handleImageUpload = async (file: File) => {
    if (file.size > 5 * 1024 * 1024) {
      alert("❌ 파일 크기는 5MB 이하여야 합니다.")
      return
    }

    if (!/^[a-zA-Z0-9_.-]+$/.test(file.name)) {
      alert("❌ 파일 이름은 영어, 숫자, 특수문자만 사용할 수 있습니다.")
      return
    }

    const formData = new FormData()
    formData.append("image", file)

    try {
      const res = await fetch(`${BASE_URL}/${TENANT_ID}/images/upload`, {
        method: "POST",
        body: formData,
      })
      if (!res.ok) throw new Error("이미지 업로드 실패")

      const data = await res.json()
      setImage(data.url)
      setTodo((prev: Todo | null) => (prev ? { ...prev, imageUrl: data.url } : prev))

      // 서버에도 즉시 반영
      await fetch(`${BASE_URL}/${TENANT_ID}/items/${itemId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageUrl: data.url }),
      })

      console.log("업로드 및 서버 반영 성공:", data.url)
    } catch (err) {
      console.error(err)
      alert("이미지 업로드 중 오류가 발생했습니다.")
    }
  }

  return { todo, setTodo, loading, handleToggleComplete, handleSave, handleDelete, handleImageUpload }
}