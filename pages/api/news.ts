import type { NextApiRequest, NextApiResponse } from 'next';
import { fetchAllFeeds } from '@/lib/fetchRSSFeeds';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const news = await fetchAllFeeds();
  res.status(200).json(news);
}
