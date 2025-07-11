// pages/api/news.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import { fetchAllFeedsBySource } from '@/lib/fetchRSSFeeds'

let cachedNews: Record<string, any[]> = {}
let lastFetchTime: number = 0

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const now = Date.now()
  const cacheDuration = 10 * 60 * 1000 // 10 minut

  if (now - lastFetchTime < cacheDuration && Object.keys(cachedNews).length > 0) {
    return res.status(200).json(cachedNews)
  }

  try {
    const news = await fetchAllFeedsBySource()
    cachedNews = news
    lastFetchTime = now
    res.status(200).json(news)
  } catch (err) {
    console.error('Napaka pri pridobivanju novic:', err)
    res.status(500).json({ error: 'Napaka pri pridobivanju novic' })
  }
}
