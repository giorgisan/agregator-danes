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
      className="block border border-gray-700 rounded-md p-3 hover:bg-gray-800 transition bg-gray-900"
    >
      <img
        src={image || "/default-news.jpg"}
        alt={title}
        className="w-full h-28 object-cover rounded mb-2"
      />
      <h3 className="text-base font-semibold mb-1 leading-snug">{title}</h3>
      <p className="text-xs text-gray-400 mb-1">{summary}</p>
      <div className="text-xs text-gray-500">
        {source} • {time}
      </div>
    </a>
  )
}
