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
}

type NewsBySource = Record<string, Article[]>

export default function Home() {
  const [newsBySource, setNewsBySource] = useState<NewsBySource>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch('/api/news')
        const data = await res.json()
        setNewsBySource(data)
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

  return (
    <>
      <Head>
        <title>Agregator Danes</title>
      </Head>
      <Header />
      <main className="px-4 py-6 max-w-full overflow-x-auto">
        <h1 className="text-3xl font-bold mb-6">🗞️ Zadnje novice v slovenskih medijih</h1>

        {loading && <p className="text-gray-400">Nalagam novice ...</p>}

        {!loading && Object.keys(newsBySource).length === 0 && (
          <p className="text-red-500">Ni uspelo naložiti novic.</p>
        )}

        <div className="flex gap-6 overflow-x-auto">
          {Object.entries(newsBySource).map(([source, articles]) => (
            <section key={source} className="min-w-[280px] max-w-[320px] flex-shrink-0">
              <h2 className="text-lg font-semibold mb-3">{source}</h2>
              <div className="flex flex-col gap-4">
                {articles.map((item, index) => (
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
          ))}
        </div>
      </main>
      <Footer />
    </>
  )
}
