import { useEffect, useState } from 'react'
import Header from './components/Header'

interface Article {
  id: string
  title: string
  summary: string
  date: string
  tags: string[]
}

function Articles() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // 加载文章数据
    fetch('/data/articles.json')
      .then(res => res.json())
      .then((data: Article[]) => {
        setArticles(data)
        setLoading(false)
      })
      .catch(err => {
        console.error('加载文章失败:', err)
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

  return (
    <div className="max-w-[1024px] mx-auto">
      <Header lastUpdated="持续更新中" currentPage="articles" />

      <div id="articles-container">
        {articles.length === 0 ? (
          <div className="text-center text-text-muted py-12">
            <div className="text-6xl mb-4">📚</div>
            <div className="text-lg mb-2">暂无文章总结</div>
            <div className="text-sm">文章总结会在阅读后自动添加</div>
          </div>
        ) : (
          articles.map((article) => (
            <div
              key={article.id}
              className="mb-6 bg-card/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-[0_4px_16px_rgba(0,0,0,0.15)] hover:border-primary/30 transition-all duration-300 hover:shadow-[0_8px_24px_rgba(59,130,246,0.15)]"
            >
              <div className="flex items-start justify-between mb-3">
                <h2 className="text-xl font-bold text-text-primary flex-1">
                  {article.title}
                </h2>
                <span className="text-xs text-text-muted ml-4 whitespace-nowrap">
                  {formatDate(article.date)}
                </span>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {article.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 text-xs font-medium bg-gradient-to-r from-primary/20 to-purple-500/20 text-primary rounded-full border border-primary/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="text-text-muted text-sm leading-relaxed">
                {article.summary}
              </div>
            </div>
          ))
        )}
      </div>

      <div className="text-center mt-16 py-7 text-text-light text-xs">
        文章总结页面 · 由 OpenClaw + Jarvis 自动维护
      </div>
    </div>
  )
}

export default Articles
