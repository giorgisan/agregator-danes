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
      className="block border border-gray-700 rounded-lg p-4 hover:bg-gray-800 transition"
    >
      <img
        src={image || "/default-news.jpg"}
        alt={title}
        className="w-full h-48 object-cover rounded-md mb-4"
      />
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-gray-400 mb-2">{summary}</p>
      <div className="text-xs text-gray-500">
        {source} • {time}
      </div>
    </a>
  )
}
