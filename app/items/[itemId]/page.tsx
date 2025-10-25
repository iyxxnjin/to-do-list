// app/items/[itemId]/page.tsx
"use client"

import { useParams, useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import Image from "next/image"
import { updateItem } from "@/lib/api"

import UploadIcon from "@/ui/images/imgUpload.png"
import CheckIcon from "@/ui/icon/check.png"
import Button from "@/ui/buttons/button"


interface Todo {
  id: number
  name: string
  done: boolean
  memo?: string
  imageUrl?: string
  isCompleted: boolean
}

export default function ItemDetailPage() {
  const router = useRouter()
  const params = useParams()
  const itemId = Array.isArray(params.itemId) ? params.itemId[0] : params.itemId

  const [image, setImage] = useState<string>("")
  const [todo, setTodo] = useState<Todo | null>(null)
  const [loading, setLoading] = useState(true)
  

  const BASE_URL = process.env.NEXT_PUBLIC_API_URL
  const TENANT_ID = process.env.NEXT_PUBLIC_TENANT_ID
    
  // 상세 항목 GET 요청
  useEffect(() => {
    async function fetchTodo() {
      try {
        const res = await fetch(`${BASE_URL}/${TENANT_ID}/items/${itemId}`)
        if (!res.ok) throw new Error("데이터를 불러오지 못했습니다.")
        const data = await res.json()
        setTodo(data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    if (itemId) fetchTodo()
  }, [itemId, BASE_URL, TENANT_ID])

    // 체크버튼 클릭 시 상태 변경
    const handleToggleComplete = async () => {
    if (!todo) return;
    try {
        await updateItem(todo.id, { isCompleted: !todo.isCompleted });
        setTodo((prev) => (prev ? { ...prev, isCompleted: !prev.isCompleted } : prev))
    } catch (error) {
        console.error("상태 변경 실패:", error);
    }
    };

  // 수정 완료 처리
  const handleSave = async () => {
    if (!todo) return
    // PATCH 요청
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
      alert("수정 완료!")
      router.push("/")
    } catch (err) {
      console.error(err)
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

  /* 이미지 업로드 */
const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0]
  if (!file) return

  // 1. 파일 크기 체크
  if (file.size > 5 * 1024 * 1024) {
    alert("❌ 파일 크기는 5MB 이하여야 합니다.")
    return
  }

  // 2. 영어 파일명만 허용
  if (!/^[a-zA-Z0-9_.-]+$/.test(file.name)) {
    alert("❌ 파일 이름은 영어, 숫자, 특수문자만 사용할 수 있습니다.")
    return
  }

  // 3. FormData 생성
  const formData = new FormData()
  formData.append("image", file)

  try {
    const res = await fetch(`${BASE_URL}/${TENANT_ID}/images/upload`,
      {
        method: "POST",
        body: formData,
      })

    if (!res.ok) throw new Error("이미지 업로드 실패")
    const data = await res.json()
    console.log("업로드 성공:", data)

    setImage(data.url)

    // 4. 업로드 성공 시 이미지 URL 저장
    setTodo((prev) => (prev ? { ...prev, imageUrl: data.url } : prev))
  } catch (err) {
    console.error(err)
    alert("이미지 업로드 중 오류가 발생했습니다.")
  }
}
  // 로딩 중 처리
  if(loading) return <div className="text-center mt-20">로딩 중...</div>

  return (
     <div className="flex flex-col items-center gap-6 mt-8">
    {/* 할 일 이름 수정 input */}
    <div className="relative w-full max-w-2xl flex items-center">
        <button
        onClick={handleToggleComplete}
        className={`absolute left-4 w-6 h-6 flex items-center justify-center rounded-full border-2 ${
            todo?.isCompleted
            ? "bg-[var(--color-violet-600)] border-[var(--color-violet-600)]"
            : "bg-white border-[var(--color-slate-900)]"
        }`}
        >
        {todo?.isCompleted && (
            <Image src={CheckIcon} alt="체크" width={12} height={12} className="invert" />
        )}
        </button>

        {/* 왼쪽 버튼 여백 확보 */}
        <input
        type="text"
        value={todo?.name}
        onChange={(e) => setTodo((prev) => (prev ? {...prev, name: e.target.value } : prev)) }
        className={`w-full rounded-full border-2 border-[var(--color-slate-900)] px-12 py-2 text-center ${
            todo?.isCompleted ? "bg-[var(--color-violet-100)] line-through" : "bg-white"
        }`}
        />
    </div>
      <div className="flex gap-6 w-full maax-w-4x1">
        {/* 왼쪽 - 이미지 업로드 */}
       <div className="w-1/2 flex flex-col items-center justify-center border-2 border-dashed border-[var(--color-slate-300)] rounded-xl bg-[var(--color-slate-100)] h-72 relative">
        {image ? (
            <Image
            src={image}
            alt="업로드된 이미지"
            fill
            className="object-cover rounded-xl"
            />
        ) : (
     <>
      {/* 이미지 클릭 시 파일 업로드 */}
      <label
        htmlFor="imageUpload"
        className="flex flex-col items-center justify-center cursor-pointer"
      >
        <Image
          src={UploadIcon}
          alt="이미지 추가"
          width={80}
          height={80}
          className="opacity-70 hover:opacity-100 transition-opacity"
        />
        <span className="mt-2 text-sm text-[var(--color-slate-500)]">
          이미지 추가하기
        </span>

        {/* ✅ 실제 파일 input (숨김) */}
        <input
          id="imageUpload"
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />
      </label>
    </>
  )}
</div>

     {/* 오른쪽 - 메모 입력 */}
    <div
        className="w-1/2 relative border-2 border-[var(--color-slate-300)] rounded-xl p-4"
        style={{
            backgroundImage: "url('/img/memo.png')", // 배경 이미지 경로
            backgroundSize: "cover",
            backgroundPosition: "center",
        }}
    >
    <p className="font-bold text-[var(--color-amber-800)] mb-2">Memo</p>

    {/* 투명 textarea를 이미지 위에 올림 */}
    <textarea
        placeholder="메모를 입력하세요"
        value={todo?.memo || ""}
        onChange={(e) =>
            setTodo((prev) => (prev ? { ...prev, name: e.target.value } : prev))
        }
        className="absolute top-10 left-4 w-[90%] h-[80%] bg-transparent text-[var(--color-slate-900)] outline-none resize-none"
    />
    </div>
    </div>

      <div className="flex gap-3">
        <Button variant="default" icon="check" onClick={handleSave}>
          수정 완료
        </Button>
        <Button variant="danger" icon="close" onClick={handleDelete}>
          삭제하기
        </Button>
      </div>
    </div>  
  )
}