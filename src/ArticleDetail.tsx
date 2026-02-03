import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import Header from './components/Header'

interface ArticleContent {
  date: string
  content: string
}

interface ArticleManifest {
  lastUpdated: string
  content: ArticleContent
}

function ArticleDetail() {
  const { id } = useParams<{ id: string }>()
  const [article, setArticle] = useState<ArticleContent | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) {
      setError('文章ID不存在')
      setLoading(false)
      return
    }

    // Load article content
    fetch(`/data/articles/${id}.json`)
      .then(res => {
        if (!res.ok) {
          throw new Error('无法加载文章内容')
        }
        return res.json()
      })
      .then((data: ArticleManifest) => {
        setArticle(data.content)
        setLoading(false)
      })
      .catch(err => {
        console.error('加载文章失败:', err)
        setError(err.message)
        setLoading(false)
      })
  }, [id])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  if (loading) {
    return (
      <div className="max-w-[1024px] mx-auto">
        <div className="text-center text-text-muted py-12">加载中...</div>
      </div>
    )
  }

  if (error || !article) {
    return (
      <div className="max-w-[1024px] mx-auto">
        <Header lastUpdated="" />
        <div className="text-center text-text-muted py-12">
          <div className="text-6xl mb-4">😕</div>
          <div className="text-lg mb-2">加载失败</div>
          <div className="text-sm">{error || '文章不存在'}</div>
          <Link
            to="/articles"
            className="inline-block mt-6 px-6 py-3 bg-primary/20 hover:bg-primary/30 border border-primary/40 rounded-full text-primary font-medium transition-all duration-300"
          >
            返回文章列表
          </Link>
        </div>
      </div>
    )
  }

  // Parse markdown content
  const renderMarkdown = (content: string) => {
    // Simple markdown renderer
    let html = content

    // Code blocks
    html = html.replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre class="bg-black/30 p-4 rounded-lg overflow-x-auto my-4"><code>$2</code></pre>')

    // Inline code
    html = html.replace(/`([^`]+)`/g, '<code class="bg-black/20 px-2 py-1 rounded text-sm">$1</code>')

    // Bold
    html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')

    // Italic
    html = html.replace(/\*([^*]+)\*/g, '<em>$1</em>')

    // Headers
    html = html.replace(/^### (.+)$/gm, '<h3 class="text-lg font-bold text-text-primary mt-6 mb-3">$1</h3>')
    html = html.replace(/^## (.+)$/gm, '<h2 class="text-xl font-bold text-text-primary mt-8 mb-4">$1</h2>')
    html = html.replace(/^# (.+)$/gm, '<h1 class="text-3xl font-bold text-text-primary mt-10 mb-6">$1</h1>')

    // Lists
    html = html.replace(/^- (.+)$/gm, '<li class="ml-6 list-disc">$1</li>')

    // Paragraphs
    html = html.split('\n\n').map(p => {
      if (p.startsWith('<h') || p.startsWith('<pre') || p.startsWith('<li')) {
        return p
      }
      if (p.trim()) {
        return `<p class="text-text-muted leading-relaxed mb-4">${p.trim()}</p>`
      }
      return ''
    }).join('\n')

    return html
  }

  return (
    <div className="max-w-[1024px] mx-auto">
      <Header lastUpdated={formatDate(article.date)} />

      <div className="bg-card/50 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-[0_4px_16px_rgba(0,0,0,0.15)]">
        <div className="mb-6 pb-6 border-b border-white/10">
          <Link
            to="/articles"
            className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-primary transition-colors duration-300"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            返回文章列表
          </Link>
        </div>

        <div
          className="prose prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: renderMarkdown(article.content) }}
        />
      </div>

      <div className="text-center mt-16 py-7 text-text-light text-xs">
        文章详情页面 · 由 OpenClaw + Jarvis 自动维护
      </div>
    </div>
  )
}

export default ArticleDetail
