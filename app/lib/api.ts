import { Update } from "next/dist/build/swc/types"

// app/lib/itemApi.ts
const BASE_URL = process.env.NEXT_PUBLIC_API_URL 
const TENANT_ID = process.env.NEXT_PUBLIC_TENANT_ID

// 할 일 추가 (POST)
export async function createItem(name: string) {
  const res = await fetch(`${BASE_URL}/${TENANT_ID}/items`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
  })
  if (!res.ok) throw new Error("할 일 추가 실패")
  return await res.json()
}

// 할 일 조회 (GET)
export async function getItems() {
  const res = await fetch(`${BASE_URL}/${TENANT_ID}/items`)
  if (!res.ok) throw new Error("목록 불러오기 실패")
  return await res.json()
}

// 상세 조회 (GET /{itemId})
export async function getItem(itemId: number) {
  const res = await fetch(`${BASE_URL}/${TENANT_ID}/items/${itemId}`)
  if (!res.ok) throw new Error("상세 불러오기 실패")
  return await res.json()
}

// 수정 (PATCH)
interface UpdateData {
  name?: string
  memo?: string
  isCompleted?: boolean
  imageUrl?: string
}

export async function updateItem(itemId: number, data: UpdateData) {
  const res = await fetch(`${BASE_URL}/${TENANT_ID}/items/${itemId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error("수정 실패")
  return await res.json()
}

// 삭제 (DELETE)
export async function deleteItem(itemId: number) {
  const res = await fetch(`${BASE_URL}/${TENANT_ID}/items/${itemId}`, {
    method: "DELETE",
  })
  if (!res.ok) throw new Error("삭제 실패")
}