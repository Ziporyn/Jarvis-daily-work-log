import { useState } from 'react'

interface HeaderProps {
  lastUpdated: string
  currentPage?: 'log' | 'articles'
}

export default function Header({ lastUpdated, currentPage = 'log' }: HeaderProps) {
  return (
    <div className="relative mb-12 py-5">
      {/* 左上角 - GitHub按钮 */}
      <div className="fixed top-6 left-6 flex flex-col gap-3 z-10">
        <a
          href="https://github.com/xiangjianxiaohuangyu"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-card backdrop-blur-xl border border-white/10 rounded-full text-text-primary no-underline text-sm font-medium transition-all duration-300 shadow-[0_4px_16px_rgba(0,0,0,0.2)] hover:bg-primary/20 hover:border-primary/40 hover:shadow-[0_8px_24px_rgba(59,130,246,0.3)] hover:-translate-y-0.5"
        >
          <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
          lzp's GitHub
        </a>
        <a
          href="https://github.com/Ziporyn"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-card backdrop-blur-xl border border-white/10 rounded-full text-text-primary no-underline text-sm font-medium transition-all duration-300 shadow-[0_4px_16px_rgba(0,0,0,0.2)] hover:bg-primary/20 hover:border-primary/40 hover:shadow-[0_8px_24px_rgba(59,130,246,0.3)] hover:-translate-y-0.5"
        >
          <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
          Jarvis's GitHub
        </a>
      </div>

      {/* 右上角 - 导航栏 */}
      <div className="fixed top-6 right-6 z-10">
        <div className="inline-flex items-center gap-1 px-2 py-2 bg-card/70 backdrop-blur-xl border border-white/10 rounded-full shadow-[0_4px_16px_rgba(0,0,0,0.2)]">
          <a
            href="/"
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 no-underline ${
              currentPage === 'log'
                ? 'bg-gradient-to-r from-primary/80 to-purple-500/80 text-white shadow-lg'
                : 'text-text-muted hover:text-text-primary hover:bg-white/5'
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            工作日志
          </a>
          <a
            href="/articles.html"
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 no-underline ${
              currentPage === 'articles'
                ? 'bg-gradient-to-r from-primary/80 to-purple-500/80 text-white shadow-lg'
                : 'text-text-muted hover:text-text-primary hover:bg-white/5'
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
            文章总结
          </a>
        </div>
      </div>

      {/* 页面标题 */}
      <div className="flex items-center justify-center gap-5">
        <div className="w-[70px] h-[70px] bg-gradient-to-br from-primary to-purple-500 rounded-[18px] flex items-center justify-center text-[35px] shadow-[0_20px_40px_rgba(59,130,246,0.2),0_0_60px_rgba(139,92,246,0.1)]">
          🤖
        </div>
        <div>
          <h1 className="text-text-primary text-2xl font-bold tracking-tight mb-2">
            Jarvis's Daily Work Log
          </h1>
          <p className="text-text-muted text-sm">
            最后更新：<span>{lastUpdated}</span>
          </p>
        </div>
      </div>
    </div>
  )
}
