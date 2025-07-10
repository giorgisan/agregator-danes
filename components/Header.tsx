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
    <header className="flex items-center justify-between px-6 py-4 border-b border-gray-700 dark:bg-gray-900">
      <h1 className="text-xl font-bold">
        <Link href="/">📰 Agregator Danes</Link>
      </h1>
      <nav className="space-x-4 text-sm hidden sm:block">
        <Link href="#politika">Politika</Link>
        <Link href="#sport">Šport</Link>
        <Link href="#tehnologija">Tehnologija</Link>
      </nav>
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="text-xl p-2"
        title="Preklop svetlo/temno"
      >
        {darkMode ? '🌙' : '☀️'}
      </button>
    </header>
  )
}
