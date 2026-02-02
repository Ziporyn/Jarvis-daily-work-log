import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Header from './components/Header'
import DayCard from './components/DayCard'

interface LogEntry {
  date: string
  content: string
}

interface Manifest {
  lastUpdated: string
  logs: LogEntry[]
}

const RECENT_COUNT = 10

function Home() {
  const [manifest, setManifest] = useState<Manifest | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch('/data/manifest.json')
      .then(res => {
        if (!res.ok) {
          throw new Error('无法加载日志数据')
        }
        return res.json()
      })
      .then((data: Manifest) => {
        setManifest(data)
        setLoading(false)
      })
      .catch(err => {
        console.error('加载日志失败:', err)
        setError(err.message)
        setLoading(false)
      })
  }, [])

  const formatDate = (isoString: string) => {
    const date = new Date(isoString)
    return date.toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (loading) {
    return (
      <div className="max-w-[1024px] mx-auto">
        <div className="text-center text-text-muted py-12">加载中...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-[1024px] mx-auto">
        <div className="text-center text-text-muted py-12">加载失败: {error}</div>
      </div>
    )
  }

  if (!manifest || manifest.logs.length === 0) {
    return (
      <div className="max-w-[1024px] mx-auto">
        <div className="text-center text-text-muted py-12">暂无工作日志</div>
      </div>
    )
  }

  const recentLogs = manifest.logs.slice(0, RECENT_COUNT)
  const hasMore = manifest.logs.length > RECENT_COUNT

  return (
    <div className="max-w-[1024px] mx-auto">
      <Header lastUpdated={formatDate(manifest.lastUpdated)} />

      <div id="logs-container">
        {recentLogs.map((log, index) => (
          <DayCard
            key={log.date}
            date={log.date}
            content={log.content}
            isDefaultExpanded={index === 0}
          />
        ))}
      </div>

      {hasMore && (
        <div className="text-center mt-8 mb-12">
          <Link
            to="/archive"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary/20 hover:bg-primary/30 border border-primary/40 rounded-full text-primary font-medium transition-all duration-300 hover:shadow-[0_8px_24px_rgba(59,130,246,0.3)] hover:-translate-y-0.5"
          >
            <span>📚</span>
            查看全部历史日志 ({manifest.logs.length} 条)
          </Link>
        </div>
      )}

      <div className="text-center mt-16 py-7 text-text-light text-xs">
        此页面由 OpenClaw + Jarvis 自动维护
      </div>
    </div>
  )
}

export default Home
