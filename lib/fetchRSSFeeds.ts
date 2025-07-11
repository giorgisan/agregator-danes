// /lib/fetchRSSFeeds.ts
import Parser from 'rss-parser'

const parser = new Parser()

const feeds: Record<string, string> = {
  'Delo': 'https://www.delo.si/rss',
  'RTVSLO': 'https://www.rtvslo.si/rss',
  '24ur': 'https://www.24ur.com/rss',
  'Siol.net': 'https://www.siol.net/rss/novice',
  'Primorske': 'https://www.primorske.si/rss',
  'Večer': 'https://www.vecer.com/rss/vecer',
  'Slovenske novice': 'https://www.slovenskenovice.si/rss',
  'Domovina': 'https://www.domovina.je/feed',
}

function classifyCategory(title: string): string {
  const lower = title.toLowerCase()

  if (lower.match(/vlada|ministr|volitve|parlament|evropsk|državni zbor|stranka|politika|predsednik/i)) return 'politika'
  if (lower.match(/nogomet|košarka|gol|tekma|kolesar|šport|liga|reprezentanca|olimpija|maribor/i)) return 'sport'
  if (lower.match(/ai|tehnologija|računalnik|startup|robot|umetna inteligenca|aplikacija|internet|program|splet/i)) return 'tehnologija'
  return 'drugo'
}

function extractImage(item: any): string | undefined {
  if (item.enclosure?.url) return item.enclosure.url
  if (item['media:content']?.url) return item['media:content'].url
  const desc = item.content || item.description || ''
  const match = desc.match(/<img.*?src="(.*?)"/)
  return match ? match[1] : undefined
}

export default async function fetchRSSFeeds() {
  const allArticles: any[] = []

  await Promise.all(
    Object.entries(feeds).map(async ([source, url]) => {
      try {
        const feed = await parser.parseURL(url)

        if (!feed.items || feed.items.length === 0) {
          console.warn(`⚠️  Vir ${source} ne vsebuje nobene novice.`)
          return
        }

        const parsed = feed.items.slice(0, 5).map(item => ({
          title: item.title || '',
          link: item.link || '',
          pubDate: item.pubDate || '',
          source,
          image: extractImage(item) || '/default-news.jpg',
          category: classifyCategory(item.title || ''),
        }))

        console.log(`✅ ${source}: ${parsed.length} člankov uspešno prebranih.`)
        allArticles.push(...parsed)
      } catch (err) {
        console.error(`❌ Napaka pri branju vira ${source}:`, err)
      }
    })
  )

  console.log(`📊 Skupno člankov pridobljenih: ${allArticles.length}`)
  return allArticles
}
