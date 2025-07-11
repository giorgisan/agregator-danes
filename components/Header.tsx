// /components/Header.tsx
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Header() {
  const [darkMode, setDarkMode] = useState(true)

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-[#0f172a] transition">
      <h1 className="text-xl font-bold text-gray-800 dark:text-white transition">
        <Link href="/">📰 Agregator Danes</Link>
      </h1>
      <nav className="space-x-4 text-sm hidden sm:block">
        <Link href="#politika" className="text-gray-600 dark:text-gray-300 hover:underline">Politika</Link>
        <Link href="#sport" className="text-gray-600 dark:text-gray-300 hover:underline">Šport</Link>
        <Link href="#tehnologija" className="text-gray-600 dark:text-gray-300 hover:underline">Tehnologija</Link>
      </nav>
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="text-xl p-2 text-gray-600 dark:text-gray-300 hover:scale-110 transition"
        title="Preklop svetlo/temno"
      >
        {darkMode ? '🌙' : '☀️'}
      </button>
    </header>
  )
}
