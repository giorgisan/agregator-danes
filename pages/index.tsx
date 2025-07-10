import Head from 'next/head'
import { useEffect, useState } from 'react'

export default function Home() {
  const [darkMode, setDarkMode] = useState(true)

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  return (
    <div className="bg-white dark:bg-gray-900 text-black dark:text-white min-h-screen">
      <Head>
        <title>Agregator Danes</title>
      </Head>
      <header className="flex justify-between items-center p-4 border-b border-gray-700">
        <h1 className="text-xl font-bold">📰 Agregator Danes</h1>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="bg-gray-200 dark:bg-gray-800 p-2 rounded"
        >
          {darkMode ? '🌙' : '☀️'}
        </button>
      </header>
      <main className="p-4">
        <h2 className="text-2xl mb-4">Dobrodošel!</h2>
        <p>Začetek slovenskega agregatorja novic z AI povzetki.</p>
      </main>
    </div>
  )
}
