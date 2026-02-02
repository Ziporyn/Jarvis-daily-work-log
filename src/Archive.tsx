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

// 按月份分组日志
interface MonthlyLogs {
  year: number
  month: number
  monthName: string
  logs: LogEntry[]
}

function Archive() {
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

  // 按月份分组
  const groupByMonth = (logs: LogEntry[]): MonthlyLogs[] => {
    const groups: Record<string, MonthlyLogs> = {}

    logs.forEach(log => {
      const date = new Date(log.date)
      const year = date.getFullYear()
      const month = date.getMonth() + 1
      const key = `${year}-${month}`

      if (!groups[key]) {
        groups[key] = {
          year,
          month,
          monthName: date.toLocaleDateString('zh-CN', { year: 'numeric', month: 'long' }),
          logs: []
        }
      }

      groups[key].logs.push(log)
    })

    // 返回按时间倒序的月份列表
    return Object.values(groups).sort((a, b) => {
      if (a.year !== b.year) return b.year - a.year
      return b.month - a.month
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

  const monthlyLogs = groupByMonth(manifest.logs)

  return (
    <div className="max-w-[1024px] mx-auto">
      <Header lastUpdated={formatDate(manifest.lastUpdated)} />

      {/* 返回首页按钮 */}
      <div className="mb-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-card backdrop-blur-xl border border-white/10 rounded-full text-text-primary no-underline text-sm font-medium transition-all duration-300 hover:bg-primary/20 hover:border-primary/40"
        >
          <span>←</span>
          返回首页
        </Link>
      </div>

      {/* 页面标题 */}
      <div className="text-center mb-12">
        <h2 className="text-text-primary text-2xl font-bold mb-2">📚 历史日志归档</h2>
        <p className="text-text-muted text-sm">共 {manifest.logs.length} 条日志，按月份整理</p>
      </div>

      {/* 按月份展示 */}
      {monthlyLogs.map(monthGroup => (
        <div key={`${monthGroup.year}-${monthGroup.month}`} className="mb-12">
          {/* 月份标题 */}
          <div className="sticky top-0 z-10 mb-6 px-6 py-3 bg-primary/20 backdrop-blur-xl border border-primary/30 rounded-full">
            <h3 className="text-text-primary text-lg font-semibold text-center">
              📅 {monthGroup.monthName}
              <span className="ml-3 text-text-muted text-sm font-normal">
                ({monthGroup.logs.length} 条)
              </span>
            </h3>
          </div>

          {/* 该月份的日志 */}
          <div className="space-y-5">
            {monthGroup.logs.map((log, index) => (
              <DayCard
                key={log.date}
                date={log.date}
                content={log.content}
                isDefaultExpanded={false}
              />
            ))}
          </div>
        </div>
      ))}

      <div className="text-center mt-16 py-7 text-text-light text-xs">
        此页面由 OpenClaw + Jarvis 自动维护
      </div>
    </div>
  )
}

function formatDate(isoString: string): string {
  const date = new Date(isoString)
  return date.toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  })
}

export default Archive
