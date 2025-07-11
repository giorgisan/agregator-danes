// /lib/fetchRSSFeeds.ts
import Parser from 'rss-parser'

const parser = new Parser()

const feeds: Record<string, string> = {
  'Delo': 'https://www.delo.si/rss',
  'RTVSLO': 'https://www.rtvslo.si/rss',
  '24ur': 'https://www.24ur.com/rss',
  'Siol.net': 'https://www.siol.net/rss',
  'Večer': 'https://www.vecer.com/rss',
  'Slovenske novice': 'https://www.slovenskenovice.si/rss',
  'Domovina': 'https://www.domovina.je/feed',
}

function extractImage(item: any): string | undefined {
  if (item.enclosure?.url) return item.enclosure.url
  if (item['media:content']?.url) return item['media:content'].url
  const desc = item.content || item.description || ''
  const match = desc.match(/<img.*?src="(.*?)"/)
  return match ? match[1] : undefined
}

export default async function fetchRSSFeeds() {
  const results: Record<string, any[]> = {}

  await Promise.all(
    Object.entries(feeds).map(async ([source, url]) => {
      try {
        const feed = await parser.parseURL(url)

        if (!feed.items || feed.items.length === 0) {
          console.warn(`⚠️  Vir ${source} ne vsebuje nobene novice.`)
          results[source] = []
          return
        }

        const parsed = feed.items.slice(0, 5).map(item => ({
          title: item.title || '',
          link: item.link || '',
          pubDate: item.pubDate || '',
          source,
          image: extractImage(item) || '/default-news.jpg',
        }))

        console.log(`✅ ${source}: ${parsed.length} člankov uspešno prebranih.`)
        results[source] = parsed
      } catch (err) {
        console.error(`❌ Napaka pri branju vira ${source}:`, err)
        results[source] = []
      }
    })
  )

  console.log(`📊 Skupno virov: ${Object.keys(results).length}`)
  return results
}
