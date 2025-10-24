// components/empty/EmptyList.tsx
import Image from "next/image"
import EmptyTodo from "../ui/images/emptyImg/empty1.png"
import EmptyDone from "../ui/images/emptyImg/empty2.png"

interface EmptyListProps {
    showTodoEmpty?: boolean
    showDoneEmpty?: boolean
}

export default function EmptyList ({ showTodoEmpty, showDoneEmpty }: EmptyListProps) {
  return (
    <div className="flex justify-center gap-20 mt-10">
      {/* TO DO 쪽 */}
      {showTodoEmpty && (
      <div className="flex flex-col items-center gap-2">
        <Image src={EmptyTodo} alt="할 일 없음" width={120} height={120} />
        <p className="text-[var(--color-slate-400)] text-sm">
          할 일이 없어요. <br />
          TODO를 새롭게 추가해주세요!
        </p>
      </div>
      )}

      {/* DONE 쪽 */}
      {showDoneEmpty && (
      <div className="flex flex-col items-center gap-2">
        <Image src={EmptyDone} alt="완료된 일 없음" width={120} height={120} />
        <p className="text-[var(--color-slate-400)] text-sm">
          아직 다 한 일이 없어요. <br />
          해야 할 일을 체크해보세요!
        </p>
      </div>
      )}
    </div>
  )
}