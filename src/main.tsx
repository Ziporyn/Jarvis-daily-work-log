import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './style.css'
import Home from './Home'
import Archive from './Archive'
import Articles from './Articles'
import ArticleDetail from './ArticleDetail'
import { DayCardSkeleton } from './components/Skeleton'

// 页面加载动画组件
function PageLoader() {
  return (
    <div className="max-w-[1024px] mx-auto pt-12">
      <div className="opacity-0 animate-fade-in" style={{ animationDuration: '0.3s', animationFillMode: 'forwards' }}>
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-purple-500 rounded-lg animate-pulse"></div>
          <div className="h-6 bg-white/10 rounded-lg w-32 animate-pulse"></div>
        </div>
        <DayCardSkeleton />
        <DayCardSkeleton />
      </div>
    </div>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/archive" element={<Archive />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/article/:id" element={<ArticleDetail />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  </StrictMode>,
)
