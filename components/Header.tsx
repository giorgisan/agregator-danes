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
    <header className="flex flex-col sm:flex-row sm:items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-[#0f172a] transition">
      <div>
        <h1 className="text-xl font-bold text-gray-800 dark:text-white transition">
          <Link href="/">📰 Agregator Danes</Link>
        </h1>
        <div className="mt-2 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 px-4 py-2 rounded-md text-sm shadow-sm">
          Dnevni pokrovitelj: <a href="https://primer-pokrovitelja.si" target="_blank" rel="noopener noreferrer" className="underline hover:text-yellow-600 dark:hover:text-yellow-300">Podjetje XYZ</a>
        </div>
      </div>

      <button
        onClick={() => setDarkMode(!darkMode)}
        className="text-xl p-2 text-gray-600 dark:text-gray-300 hover:scale-110 transition mt-4 sm:mt-0"
        title="Preklop svetlo/temno"
      >
        {darkMode ? '🌙' : '☀️'}
      </button>
    </header>
  )
}
