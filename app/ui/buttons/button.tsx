// ui/buttons/Button.tsx
import Image from "next/image"
import { ButtonVariant, ButtonSize } from "./types"
import { variantClass, sizeClass } from "./styles"

// 아이콘 이미지 import (PNG 사용 시)
import PlusIcon from "../icon/plus/greyPlus.png"
import CheckIcon from "../icon/check.png"
import CloseIcon from "../icon/close.png"

interface ButtonProps {
  children?: React.ReactNode
  variant?: ButtonVariant
  size?: ButtonSize
  icon?: "plus" | "check" | "close"
  onClick?: () => void
}

export default function Button({
  children,
  variant = "default",
  size = "large",
  icon,
  onClick,
}: ButtonProps) {
  // 공통 버튼 스타일
  const baseClass =
    "flex items-center justify-center gap-2 rounded-full font-bold shadow-[2px_3px_0_rgba(15,23,42,1)] transition-all duration-200 active:translate-y-[2px] active:shadow-none"

  // 아이콘 이미지 매핑
  const IconImg =
    icon === "plus"
      ? PlusIcon : icon === "check"
      ? CheckIcon : icon === "close"
      ? CloseIcon
      : null

  return (
    <button
      onClick={onClick}
      className={`${baseClass} ${variantClass[variant]} ${sizeClass[size]}`}
    >
      {/* 아이콘 렌더링 */}
      {IconImg && (
        <Image src={IconImg} alt={`${icon} icon`} width={16} height={16}
          className={variant === "default" ? "invert-0" : "invert"}
          // 밝은 배경(회색)일 땐 원래 색, 어두운 배경(보라/빨강/라임)일 땐 invert 처리
        />
      )}

      {/* 버튼 텍스트 */}
      {children && <span>{children}</span>}
    </button>
  )
}