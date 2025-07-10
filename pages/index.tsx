import Head from 'next/head'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ArticleCard from '@/components/ArticleCard'
import { useEffect, useState } from 'react'

type NewsItem = {
  title: string
  link: string
  pubDate: string
  source: string
}

export default function Home() {
  const [news, setNews] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch('/api/news')
        const data = await res.json()
        setNews(data)
      } catch (err) {
        console.error('Napaka pri nalaganju novic:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchNews()
  }, [])

  return (
    <>
      <Head>
        <title>Agregator Danes</title>
      </Head>
      <Header />
      <main className="p-6 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">📰 Glavne novice</h2>

        {loading && <p className="text-gray-400">Nalagam novice ...</p>}

        {!loading && news.length === 0 && (
          <p className="text-red-500">Novic ni bilo mogoče naložiti.</p>
        )}

        {!loading &&
          news.map((item, idx) => (
            <ArticleCard
              key={idx}
              title={item.title}
              summary=""
              source={item.source}
              time={new Date(item.pubDate).toLocaleString('sl-SI')}
              url={item.link}
            />
          ))}
      </main>
      <Footer />
    </>
  )
}
