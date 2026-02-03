import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import Header from './components/Header'

interface ArticleContent {
  date: string
  content: string
  url?: string
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
      .then((data: ArticleContent) => {
        setArticle(data)
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

  // Simple markdown to HTML converter
  const renderMarkdown = (content: string) => {
    let html = content

    // Headers
    html = html.replace(/^#### (.+)$/gm, '<h4 class="text-lg font-bold text-text-primary mt-4 mb-2">$1</h4>')
    html = html.replace(/^### (.+)$/gm, '<h3 class="text-xl font-bold text-text-primary mt-6 mb-3">$1</h3>')
    html = html.replace(/^## (.+)$/gm, '<h2 class="text-2xl font-bold text-text-primary mt-8 mb-4">$1</h2>')
    html = html.replace(/^# (.+)$/gm, '<h1 class="text-3xl font-bold text-text-primary mt-10 mb-6">$1</h1>')

    // Bold and italic
    html = html.replace(/\*\*([^*]+)\*\*/g, '<strong class="font-bold">$1</strong>')
    html = html.replace(/\*([^*]+)\*/g, '<em class="italic">$1</em>')

    // Inline code
    html = html.replace(/`([^`]+)`/g, '<code class="bg-black/20 px-2 py-1 rounded text-sm font-mono">$1</code>')

    // Code blocks
    html = html.replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre class="bg-black/30 p-4 rounded-lg overflow-x-auto my-4 text-sm"><code>$2</code></pre>')

    // Tables
    html = html.replace(/\|(.+)\|/g, (match) => {
      const rows = match.trim().split('\n')
      if (rows.length < 2) return match

      let tableHtml = '<div class="overflow-x-auto my-4"><table class="min-w-full border-collapse">'
      rows.forEach((row, index) => {
        const cells = row.split('|').filter(c => c.trim())
        tableHtml += '<tr>'
        cells.forEach(cell => {
          const tag = index === 0 ? 'th' : 'td'
          tableHtml += `<${tag} class="border border-white/10 px-4 py-2 text-sm">${cell.trim()}</${tag}>`
        })
        tableHtml += '</tr>'
      })
      tableHtml += '</table></div>'
      return tableHtml
    })

    // Lists
    html = html.replace(/^- (.+)$/gm, '<li class="ml-6 list-disc text-text-muted mb-2">$1</li>')

    // Wrap lists
    html = html.replace(/(<li[^>]*>.*<\/li>\n?)+/g, '<ul class="my-4">$&</ul>')

    // Paragraphs
    html = html.split('\n\n').map(p => {
      p = p.trim()
      if (!p) return ''
      if (p.startsWith('<h') || p.startsWith('<pre') || p.startsWith('<ul') || p.startsWith('<div')) {
        return p
      }
      return `<p class="text-text-muted leading-relaxed mb-4">${p}</p>`
    }).join('\n')

    return html
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
          <div className="text-sm mb-6">{error || '文章不存在'}</div>
          <Link
            to="/articles"
            className="inline-block px-6 py-3 bg-primary/20 hover:bg-primary/30 border border-primary/40 rounded-full text-primary font-medium transition-all duration-300"
          >
            返回文章列表
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-[1024px] mx-auto">
      <Header lastUpdated={formatDate(article.date)} />

      <div className="bg-card/50 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-[0_4px_16px_rgba(0,0,0,0.15)]">
        <div className="mb-6 pb-6 border-b border-white/10 flex items-center justify-between">
          <Link
            to="/articles"
            className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-primary transition-colors duration-300"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            返回文章列表
          </Link>

          {article.url && (
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary/20 hover:bg-primary/30 border border-primary/40 rounded-full text-primary no-underline text-sm font-medium transition-all duration-300 shadow-[0_4px_16px_rgba(59,130,246,0.2)] hover:shadow-[0_8px_24px_rgba(59,130,246,0.3)] hover:-translate-y-0.5"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6H10" />
              </svg>
              原文链接
            </a>
          )}
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
