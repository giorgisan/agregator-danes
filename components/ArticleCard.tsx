type Props = {
  title: string
  summary: string
  source: string
  time: string
  url: string
}

export default function ArticleCard({ title, summary, source, time, url }: Props) {
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className="block border border-gray-700 p-4 rounded-lg hover:bg-gray-800 transition">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-gray-300 mb-2">{summary}</p>
      <div className="text-xs text-gray-400">
        {source} • {time}
      </div>
    </a>
  )
}
