"use client"

import Image from "next/image"
import Button from "@/ui/buttons/button"
import UploadIcon from "@/ui/images/imgUpload.png"
import CheckIcon from "@/ui/icon/check.png"

import {Todo, ItemEditorProps} from "@/types/todo"

export default function ItemEditor({ todo, setTodo, onToggle, onSave, onDelete, onUpload }: ItemEditorProps) {
  if (!todo) return null

  return (
    <div className="flex flex-col items-center gap-6 mt-8">
      {/* 제목 + 체크 */}
      <div className="relative w-full max-w-2xl flex items-center">
        <button
          onClick={onToggle}
          className={`absolute left-4 w-6 h-6 flex items-center justify-center rounded-full border-2 ${
            todo.isCompleted
              ? "bg-[var(--color-violet-600)] border-[var(--color-violet-600)]"
              : "bg-white border-[var(--color-slate-900)]"
          }`}
        >
          {todo.isCompleted && <Image src={CheckIcon} alt="체크" width={12} height={12} className="invert" />}
        </button>

        <input
          type="text"
          value={todo.name}
          onChange={(e) => setTodo({ ...todo, name: e.target.value })}
          className={`w-full rounded-full border-2 border-[var(--color-slate-900)] px-12 py-2 text-center ${
            todo.isCompleted ? "bg-[var(--color-violet-100)] line-through" : "bg-white"
          }`}
        />
      </div>

      <div className="flex gap-6 w-full max-w-4xl">
        {/* 이미지 */}
        <div className="w-1/2 flex flex-col items-center justify-center border-2 border-dashed border-[var(--color-slate-300)] rounded-xl bg-[var(--color-slate-100)] h-72 relative">
          {todo.imageUrl ? (
            <Image src={todo.imageUrl} alt="이미지" fill sizes="(max-width:768px) 100vw, 50vw" className="object-cover rounded-xl" />
          ) : (
            <label htmlFor="imgUpload" className="flex flex-col items-center justify-center cursor-pointer">
              <Image src={UploadIcon} alt="이미지 추가" width={80} height={80} />
              <input id="imgUpload" type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && onUpload(e.target.files[0])} />
            </label>
          )}
        </div>

        {/* 메모 */}
        <div
          className="w-1/2 relative border-2 border-[var(--color-slate-300)] rounded-xl p-4"
          style={{
            backgroundImage: "url('/memo.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <p className="font-bold text-[var(--color-amber-800)] mb-2">Memo</p>
          <textarea
            value={todo.memo || ""}
            onChange={(e) => setTodo({ ...todo, memo: e.target.value })}
            placeholder="메모를 입력하세요"
            className="absolute top-10 left-4 w-[90%] h-[80%] bg-transparent text-[var(--color-slate-900)] outline-none resize-none"
          />
        </div>
      </div>

      <div className="flex gap-3">
        <Button variant="default" icon="check" onClick={onSave}>수정 완료</Button>
        <Button variant="danger" icon="close" onClick={onDelete}>삭제하기</Button>
      </div>
    </div>
  )
}