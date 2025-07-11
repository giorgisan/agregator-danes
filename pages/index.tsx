// /pages/index.tsx
import Head from 'next/head'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ArticleCard from '@/components/ArticleCard'
import { useEffect, useState } from 'react'

type Article = {
  title: string
  link: string
  pubDate: string
  source: string
  image?: string
  category: string
}

export default function Home() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch('/api/news')
        const data = await res.json()
        setArticles(data)
      } catch (err) {
        console.error('Napaka pri nalaganju novic:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchNews()
  }, [])

  const formatTime = (iso: string) =>
    new Date(iso).toLocaleString('sl-SI', {
      hour: '2-digit',
      minute: '2-digit',
      day: '2-digit',
      month: '2-digit'
    })

  const renderSection = (title: string, category: string) => {
    const filtered = articles.filter(a => a.category === category)
    if (filtered.length === 0) return null

    return (
      <section id={category} className="mb-12">
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((item, index) => (
            <ArticleCard
              key={index}
              title={item.title}
              summary=""
              source={item.source}
              time={formatTime(item.pubDate)}
              url={item.link}
              image={item.image}
            />
          ))}
        </div>
      </section>
    )
  }

  return (
    <>
      <Head>
        <title>Agregator Danes</title>
      </Head>
      <Header />
      <main className="px-4 py-8 max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-10 text-center">🗞️ Zadnje novice v slovenskih medijih</h1>

        {loading && <p className="text-center text-gray-400">Nalagam novice ...</p>}

        {!loading && articles.length === 0 && (
          <p className="text-center text-red-500">Ni uspelo naložiti novic.</p>
        )}

        {renderSection('🗳️ Politika', 'politika')}
        {renderSection('🏅 Šport', 'sport')}
        {renderSection('💡 Tehnologija', 'tehnologija')}
        {renderSection('📰 Ostalo', 'drugo')}
      </main>
      <Footer />
    </>
  )
}
