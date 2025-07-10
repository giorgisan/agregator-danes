import Parser from 'rss-parser'
import { Configuration, OpenAIApi } from 'openai'

const parser: Parser<any> = new Parser({
  customFields: {
    item: ['enclosure', 'media:content', 'image']
  }
})

// Viri novic
const feeds = [
  { name: '24ur', url: 'https://www.24ur.com/rss/' },
  { name: 'RTV Slovenija', url: 'https://www.rtvslo.si/rss' },
  { name: 'Delo', url: 'https://www.delo.si/rss/' }
]

// OpenAI konfiguracija
const openai = new OpenAIApi(
  new Configuration({
    apiKey: process.env.OPENAI_API_KEY
  })
)

// Iz opisa novice (description/content) poskušamo izvleči <img src="...">
function extractImageFromDescription(desc?: string): string | null {
  if (!desc) return null
  const match = desc.match(/<img[^>]+src="([^">]+)"/)
  return match ? match[1] : null
}

// Izberi najodmevnejši naslov za dani vir (na podlagi 5–7 naslovov)
async function selectMostProminentArticle(items: any[], source: string) {
  const titles = items.map((item, i) => `${i + 1}. ${item.title}`).join('\n')

  const prompt = `Spodaj je seznam naslovov novic s portala ${source}. Izberi tisto novico, ki je najbolj odmevna, pomembna ali zanimiva za širšo javnost. Vrni samo točen naslov, brez številke.\n\n${titles}`

  const response = await openai.createChatCompletion({
    model: 'gpt-4o',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.3
  })

  const chosenTitle = response.data.choices[0].message?.content?.trim()
  const selected = items.find(item => item.title === chosenTitle)

  return selected || items[0] // fallback, če AI ne najde nič
}

export async function fetchAllFeeds() {
  const allItems = []

  for (const feed of feeds) {
    try {
      const parsedFeed = await parser.parseURL(feed.url)

      const items = parsedFeed.items?.slice(0, 7).map(item => {
        const image =
          item.enclosure?.url ||
          item['media:content']?.url ||
          extractImageFromDescription(item.content || item.contentSnippet || item.description) ||
          `/default-news.jpg`

        return {
          title: item.title,
          link: item.link,
          pubDate: item.pubDate,
          source: feed.name,
          image
        }
      }) || []

      // AI izbira najodmevnejše novice iz seznama
      const topArticle = await selectMostProminentArticle(items, feed.name)

      if (topArticle) allItems.push(topArticle)
    } catch (err) {
      console.error(`Napaka pri feedu ${feed.name}:`, err)
    }
  }

  // po datumu padajoče
  return allItems.sort((a, b) => new Date(b.pubDate!).getTime() - new Date(a.pubDate!).getTime())
}
