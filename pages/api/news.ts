import type { NextApiRequest, NextApiResponse } from 'next'
import { fetchAllFeedsBySource } from '@/lib/fetchRSSFeeds'

let cachedNewsBySource: Record<string, any[]> = {}
let lastFetchTime: number = 0
const CACHE_DURATION_MS = 45 * 60 * 1000 // 45 minut

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const now = Date.now()

  if (Object.keys(cachedNewsBySource).length > 0 && now - lastFetchTime < CACHE_DURATION_MS) {
    return res.status(200).json(cachedNewsBySource)
  }

  try {
    const news = await fetchAllFeedsBySource()
    cachedNewsBySource = news
    lastFetchTime = now
    res.status(200).json(news)
  } catch (error) {
    console.error('Napaka pri pridobivanju novic:', error)
    res.status(500).json({ error: 'Napaka pri pridobivanju novic.' })
  }
}
