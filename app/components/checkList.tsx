// components/checkList.tsx
"use client"

import { useRouter } from "next/navigation"
import Image from "next/image"
import CheckIcon from "../ui/icon/check.png"

interface CheckItemProps {
  itemId: number
  text: string
  done?: boolean
  onToggle?: () => void
}

export default function CheckList({
  itemId,
  text,
  done = false,
  onToggle,
}: CheckItemProps) {
  const router = useRouter()

  // 상세 페이지 이동 
  const handleItemClick = () => {
    router.push(`/items/${itemId}`)
  }

  // 체크 클릭 시 상세 페이지 이동 막기 (이벤트 버블링 방지)
  const handleToggleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (onToggle) onToggle()
  }

  return (
    <div
        className={`
        flex items-center gap-3 w-full rounded-full px-4 py-3
        border-2 cursor-pointer transition-all
        ${done
          ? "bg-[var(--color-violet-100)] border-[var(--color-violet-600)]"
          : "bg-white border-[var(--color-slate-900)]"}
      `}
        onClick={handleItemClick}
    >
      <div className="flex items-center gap-2">
        {/* 체크버튼 */}
        <div
          onClick={handleToggleClick} 
          className={`shrink-0 w-6 h-6 flex items-center justify-center rounded-full border-2 transition-all ${
            done
              ? "bg-[var(--color-violet-600)] border-[var(--color-violet-600)]"
              : "bg-white border-[var(--color-slate-900)]"
          }`}
        >
          {done && (
            <Image
              src={CheckIcon}
              alt="체크 아이콘"
              width={10}
              height={10}
              className="invert"
            />
          )}
        </div>

        {/* 할 일 텍스트 */}
        <span
          className={`text-[var(--color-slate-900)] text-base ${
            done ? "line-through opacity-70" : ""
          }`}
        >
          {text}
        </span>
      </div>
    </div>
  )
}