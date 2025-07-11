// lib/fetchRSSFeeds.ts
import Parser from 'rss-parser'

const parser: Parser<any> = new Parser({
  customFields: {
    item: ['enclosure', 'media:content', 'image']
  }
})

const feeds = [
  { name: '24ur', url: 'https://www.24ur.com/rss/' },
  { name: 'RTV Slovenija', url: 'https://www.rtvslo.si/rss' },
  { name: 'Delo', url: 'https://www.delo.si/rss/' },
  { name: 'Siol.net', url: 'https://siol.net/rss/novice.xml' },
  { name: 'Dnevnik', url: 'https://www.dnevnik.si/rss' }
]

function extractImageFromDescription(desc?: string): string | null {
  if (!desc) return null
  const match = desc.match(/<img[^>]+src="([^">]+)"/)
  return match ? match[1] : null
}

export async function fetchAllFeedsBySource() {
  const results: Record<string, any[]> = {}

  for (const feed of feeds) {
    try {
      const parsedFeed = await parser.parseURL(feed.url)

      const items = (parsedFeed.items || []).slice(0, 5).map(item => {
        const image =
          item.enclosure?.url ||
          item['media:content']?.url ||
          extractImageFromDescription(item.content || item.contentSnippet || item.description) ||
          '/default-news.jpg'

        return {
          title: item.title,
          link: item.link,
          pubDate: item.pubDate,
          source: feed.name,
          image
        }
      })

      results[feed.name] = items.sort(
        (a, b) => new Date(b.pubDate!).getTime() - new Date(a.pubDate!).getTime()
      )
    } catch (err) {
      console.error(`❌ Napaka pri feedu ${feed.name}:`, (err as any).message || err)
    }
  }

  return results
}
