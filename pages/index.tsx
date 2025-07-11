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
      <main className="p-6 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">🗞️ Glavne novice po virih</h1>

        {loading && <p className="text-gray-400">Nalagam novice ...</p>}

        {!loading && Object.keys(newsBySource).length === 0 && (
          <p className="text-red-500">Ni uspelo naložiti novic.</p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.entries(newsBySource).map(([source, articles]) => (
            <section key={source}>
              <h2 className="text-xl font-semibold mb-4">{source}</h2>
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
            </section>
          ))}
        </div>
      </main>
      <Footer />
    </>
  )
}
