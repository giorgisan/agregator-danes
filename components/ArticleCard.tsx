// /components/ArticleCard.tsx
type Props = {
  title: string
  summary: string
  source: string
  time: string
  url: string
  image?: string
}

export default function ArticleCard({ title, summary, source, time, url, image }: Props) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-lg transition overflow-hidden border border-gray-200 dark:border-gray-700"
    >
      <img
        src={image || "/default-news.jpg"}
        alt={title}
        className="w-full h-40 object-cover"
      />
      <div className="p-4">
        <h3 className="text-base font-semibold text-gray-800 dark:text-white leading-snug mb-1">{title}</h3>
        <p className="text-xs text-gray-400 mb-1">{summary}</p>
        <div className="text-xs text-gray-500 dark:text-gray-400">
          {source} • {time}
        </div>
      </div>
    </a>
  )
}
