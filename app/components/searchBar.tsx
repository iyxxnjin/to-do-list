// components/SearchBar.tsx
import Button from "../ui/buttons/button"

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
  onAdd
}: SearchBarProps) {
    // 엔터 키 처리 함수
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && onAdd && !e.nativeEvent.isComposing) {
            e.preventDefault()
            onAdd()
        }
    }
  return (
    <div className="flex items-center gap-3 w-full max-w-xl">
      <input
        type="text" placeholder={placeholder} value={value} onChange={onChange} 
        onKeyDown={handleKeyDown} // 엔터 키 처리
        className="flex-1 rounded-full border-2 border-[var(--color-slate-900)] px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-violet-600)]"
      />

      <Button variant="primary" icon="plus" size="large" onClick={onAdd}>
        추가하기
      </Button>
    </div>
  )
}