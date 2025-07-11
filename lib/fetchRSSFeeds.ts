// /lib/fetchRSSFeeds.ts
import Parser from 'rss-parser'

const parser = new Parser()

const feeds: Record<string, string> = {
  'Delo': 'https://www.delo.si/rss',
  'RTVSLO': 'https://www.rtvslo.si/rss',
  '24ur': 'https://www.24ur.com/rss',
  'Siol.net': 'https://siol.net/rss/novice',
  'Primorske': 'https://www.primorske.si/rss',
  'Večer': 'https://www.vecer.com/rss/vecer',
  'Slovenske novice': 'https://www.slovenskenovice.si/rss',
  'Domovina': 'https://www.domovina.je/feed',
}

export default async function fetchRSSFeeds() {
  const results: Record<string, any[]> = {}

  await Promise.all(
    Object.entries(feeds).map(async ([source, url]) => {
      try {
        const feed = await parser.parseURL(url)

        results[source] = feed.items.slice(0, 5).map(item => ({
          title: item.title || '',
          link: item.link || '',
          pubDate: item.pubDate || '',
          source,
          image: extractImage(item) || '/default-news.jpg',
        }))
      } catch (err) {
        console.error(`Napaka pri branju vira ${source}:`, err)
      }
    })
  )

  return results
}

function extractImage(item: any): string | undefined {
  if (item.enclosure?.url) return item.enclosure.url
  if (item['media:content']?.url) return item['media:content'].url
  const desc = item.content || item.description || ''
  const match = desc.match(/<img.*?src="(.*?)"/)
  return match ? match[1] : undefined
}
