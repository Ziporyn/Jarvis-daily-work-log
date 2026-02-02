import { useEffect, useState } from 'react'
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

function App() {
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

  return (
    <div className="max-w-[1024px] mx-auto">
      <Header lastUpdated={formatDate(manifest.lastUpdated)} />

      <div id="logs-container">
        {manifest.logs.map((log, index) => (
          <DayCard
            key={log.date}
            date={log.date}
            content={log.content}
            isDefaultExpanded={index === 0}
          />
        ))}
      </div>

      <div className="text-center mt-16 py-7 text-text-light text-xs">
        此页面由 OpenClaw + Jarvis 自动维护
      </div>
    </div>
  )
}

export default App
