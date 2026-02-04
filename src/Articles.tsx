import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Header from './components/Header'
import { ArticleCardSkeleton } from './components/Skeleton'

interface Article {
  id: string
  title: string
  summary: string
  date: string
  tags: string[]
}

interface ArticlesManifest {
  lastUpdated: string
  articles: Article[]
}

function Articles() {
  const [articles, setArticles] = useState<Article[]>([])
  const [lastUpdated, setLastUpdated] = useState<string>('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Load articles data
    fetch('/data/articles.json')
      .then(res => {
        if (!res.ok) {
          throw new Error('无法加载文章数据')
        }
        return res.json()
      })
      .then((data: ArticlesManifest) => {
        setArticles(data.articles || [])
        setLastUpdated(data.lastUpdated || '')
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
        <Header lastUpdated="加载中..." currentPage="articles" />
        <div className="opacity-0 animate-fade-in" style={{ animationDuration: '0.3s', animationFillMode: 'forwards' }}>
          <ArticleCardSkeleton />
          <ArticleCardSkeleton />
          <ArticleCardSkeleton />
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-[1024px] mx-auto">
      <Header lastUpdated={lastUpdated ? formatDate(lastUpdated) : '暂无更新'} currentPage="articles" />

      <div id="articles-container" className="opacity-0 animate-fade-in" style={{ animationDuration: '0.3s', animationFillMode: 'forwards' }}>
        {articles.length === 0 ? (
          <div className="text-center text-text-muted py-12">
            <div className="text-6xl mb-4">📚</div>
            <div className="text-lg mb-2">暂无文章总结</div>
            <div className="text-sm">文章总结会在阅读后自动添加</div>
          </div>
        ) : (
          articles.map((article, index) => (
            <Link
              key={article.id}
              to={`/article/${article.id}`}
              className="block mb-6 bg-card/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-[0_4px_16px_rgba(0,0,0,0.15)] hover:border-primary/30 transition-all duration-300 hover:shadow-[0_8px_24px_rgba(59,130,246,0.15)] hover:-translate-y-0.5 no-underline"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-start justify-between mb-3">
                <h2 className="text-xl font-bold text-text-primary flex-1 hover:text-primary transition-colors duration-300">
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

              <div className="mt-4 text-xs text-text-muted flex items-center gap-2">
                <span>点击查看完整内容</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
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
