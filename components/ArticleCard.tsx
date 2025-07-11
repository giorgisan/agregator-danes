// /components/ArticleCard.tsx
type Props = {
  title: string
  summary: string
  source: string
  time: string
  url: string
  image?: string
}

function getLogoSrc(source: string): string {
  const name = source.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')
  return `/logos/${name}.png`
}

export default function ArticleCard({ title, summary, source, time, url, image }: Props) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition overflow-hidden border border-gray-200 dark:border-gray-700"
    >
      <img
        src={image || "/default-news.jpg"}
        alt={title}
        className="w-full h-24 object-cover"
      />
      <div className="p-2">
        <h3 className="text-sm font-medium text-gray-800 dark:text-white leading-tight mb-1">{title}</h3>
        <p className="text-xs text-gray-400 mb-1">{summary}</p>
        <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
          <img
            src={getLogoSrc(source)}
            alt={source}
            className="w-4 h-4 object-contain rounded-sm"
            onError={(e) => ((e.target as HTMLImageElement).style.display = 'none')}
          />
          {source} • {time}
        </div>
      </div>
    </a>
  )
}
