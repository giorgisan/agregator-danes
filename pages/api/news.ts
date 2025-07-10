import type { NextApiRequest, NextApiResponse } from 'next'
import { fetchAllFeeds } from '@/lib/fetchRSSFeeds'

let cachedNews: any[] = []
let lastFetchTime: number = 0
const CACHE_DURATION_MS = 45 * 60 * 1000 // 45 minut

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const now = Date.now()

  if (cachedNews.length > 0 && now - lastFetchTime < CACHE_DURATION_MS) {
    return res.status(200).json(cachedNews)
  }

  try {
    const news = await fetchAllFeeds()
    cachedNews = news
    lastFetchTime = now
    res.status(200).json(news)
  } catch (error) {
    res.status(500).json({ error: 'Napaka pri pridobivanju novic.' })
  }
}
