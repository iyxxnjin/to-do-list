import Button from "../ui/buttons/button"
import Image from "next/image"
import GreyPlus from "../ui/icon/plus/greyPlus.png"

interface SearchBarProps {
  placeholder?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onAdd?: () => void
}

export default function SearchBar({
  placeholder = "할 일을 입력해주세요!",
  value,
  onChange,
  onAdd,
}: SearchBarProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && onAdd && !e.nativeEvent.isComposing) {
      e.preventDefault()
      onAdd()
    }
  }

  return (
    <div
      className="
        flex flex-col sm:flex-row items-center justify-center gap-3
        w-full max-w-6xl px-4
      "
    >
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        className="
          flex-1 w-full sm:w-auto rounded-full border-2 border-[var(--color-slate-900)]
          px-5 py-3 text-[var(--color-slate-900)]
          focus:outline-none focus:ring-2 focus:ring-[var(--color-violet-600)]
          transition-all
        "
      />


      {/* PC/Tablet 버튼 */}
      <div className="hidden sm:block">
        <Button variant="primary" icon="plus" size="large" onClick={onAdd}>
          추가하기
        </Button>
      </div>

      {/* 모바일 전용 아이콘 버튼 */}
      <div className="block sm:hidden">
        <button
          onClick={onAdd}
          className="
            flex items-center justify-center
            w-10 h-10 rounded-full
            bg-[var(--color-violet-600)] text-white shadow-md
            hover:scale-105 active:scale-95 transition-transform
          "
        >
           <Image
            src={GreyPlus}
            alt="추가하기 아이콘"
            width={20}
            height={20}
            className="invert"
          />
        </button>
      </div>
    </div>
  )
}