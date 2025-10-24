// styles.ts
import { ButtonVariant, ButtonSize } from "./types";


/* 버튼 타입 */
export const variantClass: Record<ButtonVariant, string> = {
    // 회색
  default: "bg-[var(--color-slate-100)] text-[var(--color-slate-900)] border-[var(--color-slate-900)] hover:bg-[var(--color-slate-200)]",
  // 보라
  primary: "bg-[var(--color-violet-600)] text-white hover:bg-[var(--color-violet-100)] hover:text-[var(--color-violet-600)]",
    // 빨강
  danger: "bg-[var(--color-rose-500)] text-white hover:bg-[var(--color-rose-500)]/90",
    // 라임
  success: "bg-[var(--color-lime-300)] text-[var(--color-slate-900)] hover:bg-[var(--color-lime-300)]/80",
}


export const sizeClass: Record<ButtonSize, string> = {
  small: "px-3 py-1 text-sm",
  large: "px-5 py-3 text-lg",
}