import Parser from 'rss-parser';

const parser = new Parser();

const feeds = [
  { name: '24ur', url: 'https://www.24ur.com/rss/' },
  { name: 'RTV Slovenija', url: 'https://www.rtvslo.si/rss' },
  { name: 'Delo', url: 'https://www.delo.si/rss/' },
];

export async function fetchAllFeeds() {
  const allItems = [];

  for (const feed of feeds) {
    try {
      const parsedFeed = await parser.parseURL(feed.url);
      const items = parsedFeed.items?.slice(0, 5).map(item => ({
        title: item.title,
        link: item.link,
        pubDate: item.pubDate,
        source: feed.name,
      }));
      allItems.push(...(items || []));
    } catch (err) {
      console.error(`Napaka pri feedu ${feed.name}:`, err);
    }
  }

  return allItems.sort((a, b) => new Date(b.pubDate!).getTime() - new Date(a.pubDate!).getTime());
}
