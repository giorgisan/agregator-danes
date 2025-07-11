// pages/api/news.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import { fetchAllFeedsBySource } from '@/lib/fetchRSSFeeds'

let cachedNews: any[] = []
let lastFetchTime: number = 0

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const now = Date.now()

  // Obnovi novice vsakih 10 minut
  if (!cachedNews.length || now - lastFetchTime > 10 * 60 * 1000) {
    try {
      const news = await fetchAllFeedsBySource()
      cachedNews = news
      lastFetchTime = now
    } catch (err) {
      console.error('Napaka pri pridobivanju novic:', err)
      return res.status(500).json({ error: 'Napaka pri pridobivanju novic' })
    }
  }

  res.status(200).json(cachedNews)
}
