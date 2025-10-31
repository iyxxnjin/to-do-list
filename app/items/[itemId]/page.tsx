"use client"

import { useParams, useRouter } from "next/navigation"
import { useItemDetail } from "./hooks/useItemDetail"
import ItemEditor from "./itemEdit"

export default function ItemDetailPage() {
  const router = useRouter()
  const params = useParams()
  const itemId = Array.isArray(params.itemId) ? params.itemId[0] : params.itemId

  const BASE_URL = process.env.NEXT_PUBLIC_API_URL || ""
  const TENANT_ID = process.env.NEXT_PUBLIC_TENANT_ID || ""

  const { todo, setTodo, loading, handleToggleComplete, handleDelete, handleSave, handleImageUpload } =
    useItemDetail(BASE_URL, TENANT_ID, itemId)

  if (loading) return <div className="text-center mt-20">로딩 중...</div>

  return (
    <ItemEditor
      todo={todo}
      setTodo={setTodo}
      onToggle={handleToggleComplete}
      onSave={async () => {
        const success = await handleSave()
        if (success) {
          alert("수정 완료!")
          router.push("/")
        }
      }}
      onDelete={async () => {
        await handleDelete()
        alert("삭제 완료!")
        router.push("/")
      }}
      onUpload={handleImageUpload}
    />
  )
}