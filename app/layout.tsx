// app/layout.tsx
import "./styles/globals.css"
import Gnb from "./components/gnb"

export const metadata = {
  title: "To-do List",
  description: "Assignment To-do List App",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className="bg-[var(--color-slate-100)]">
        {/* Gnb 상단에 고정 */}
        <header className="fixed top-0 left-0 w-full z-50">
          <Gnb />
        </header>
        <main className="pt-[80px] flex flex-col items-center">
          {children}
        </main>
      </body>
    </html>
  )
}