// components/gnb/Gnb.tsx
import Image from "next/image"
import Link from "next/link"
import DoitLogo from "../ui/images/logo/logo.png"

export default function Gnb() {
  return (
    <header className="w-full flex items-center justify-center py-4 bg-[var(--color-slate-100)] shadow-sm">
      <Link href="/" passHref aria-label="홈으로 이동">
        <Image src={DoitLogo} alt="doit 로고" width={120} height={40} />
      </Link>
    </header>
  )
}