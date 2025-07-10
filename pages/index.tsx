import Head from 'next/head'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ArticleCard from '@/components/ArticleCard'

const dummyArticles = [
  {
    title: "Nova zakonodaja v DZ: Kaj prinaša sprememba?",
    summary: "AI povzetek: V državnem zboru so sprejeli nov zakon...",
    source: "RTV Slovenija",
    time: "danes ob 10:12",
    url: "https://rtvslo.si"
  },
  {
    title: "Nogomet: Slovenija premagala Srbijo",
    summary: "AI povzetek: Slovenija je z 2:1 premagala reprezentanco Srbije...",
    source: "24ur",
    time: "danes ob 8:45",
    url: "https://24ur.com"
  },
  {
    title: "Nova tehnologija AI navdušuje svet",
    summary: "AI povzetek: Tehnološki svet pretresa nova platforma umetne inteligence...",
    source: "Siol.net",
    time: "včeraj ob 22:10",
    url: "https://siol.net"
  }
]

export default function Home() {
  return (
    <>
      <Head>
        <title>Agregator Danes</title>
      </Head>
      <Header />
      <main className="p-6 max-w-4xl mx-auto">
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">📰 Glavna novica</h2>
          <ArticleCard {...dummyArticles[0]} />
        </section>

        <section id="politika" className="mb-8">
          <h2 className="text-xl font-semibold mb-4">🗳️ Politika</h2>
          <ArticleCard {...dummyArticles[0]} />
        </section>

        <section id="sport" className="mb-8">
          <h2 className="text-xl font-semibold mb-4">⚽ Šport</h2>
          <ArticleCard {...dummyArticles[1]} />
        </section>

        <section id="tehnologija" className="mb-8">
          <h2 className="text-xl font-semibold mb-4">🧠 Tehnologija</h2>
          <ArticleCard {...dummyArticles[2]} />
        </section>
      </main>
      <Footer />
    </>
  )
}
