export function ArticleCardSkeleton() {
  return (
    <div className="mb-6 bg-card/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-[0_4px_16px_rgba(0,0,0,0.15)]">
      {/* 标题骨架 */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="h-6 bg-white/10 rounded-lg w-3/4 mb-2 skeleton-shimmer"></div>
          <div className="h-6 bg-white/10 rounded-lg w-1/2 skeleton-shimmer"></div>
        </div>
        <div className="h-4 bg-white/10 rounded-lg w-24 skeleton-shimmer"></div>
      </div>

      {/* 标签骨架 */}
      <div className="flex gap-2 mb-4">
        <div className="h-6 bg-white/10 rounded-full w-20 skeleton-shimmer"></div>
        <div className="h-6 bg-white/10 rounded-full w-16 skeleton-shimmer"></div>
      </div>

      {/* 摘要骨架 */}
      <div className="space-y-2">
        <div className="h-4 bg-white/10 rounded-lg w-full skeleton-shimmer"></div>
        <div className="h-4 bg-white/10 rounded-lg w-5/6 skeleton-shimmer"></div>
        <div className="h-4 bg-white/10 rounded-lg w-4/6 skeleton-shimmer"></div>
      </div>
    </div>
  )
}

export function ArticleDetailSkeleton() {
  return (
    <div className="bg-card/50 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-[0_4px_16px_rgba(0,0,0,0.15)]">
      {/* 头部按钮骨架 */}
      <div className="mb-6 pb-6 border-b border-white/10 flex items-center justify-between">
        <div className="h-8 bg-white/10 rounded-lg w-32 skeleton-shimmer"></div>
        <div className="h-10 bg-white/10 rounded-lg w-28 skeleton-shimmer"></div>
      </div>

      {/* 内容骨架 */}
      <div className="space-y-4">
        <div className="h-8 bg-white/10 rounded-lg w-3/4 skeleton-shimmer"></div>
        <div className="h-5 bg-white/10 rounded-lg w-full skeleton-shimmer"></div>
        <div className="h-5 bg-white/10 rounded-lg w-full skeleton-shimmer"></div>
        <div className="h-5 bg-white/10 rounded-lg w-5/6 skeleton-shimmer"></div>

        <div className="h-7 bg-white/10 rounded-lg w-1/2 mt-6 skeleton-shimmer"></div>
        <div className="h-5 bg-white/10 rounded-lg w-full skeleton-shimmer"></div>
        <div className="h-5 bg-white/10 rounded-lg w-full skeleton-shimmer"></div>
        <div className="h-5 bg-white/10 rounded-lg w-5/6 skeleton-shimmer"></div>

        {/* 引用块骨架 */}
        <div className="bg-black/20 rounded-lg p-4 my-4">
          <div className="h-5 bg-white/10 rounded-lg w-full skeleton-shimmer mb-2"></div>
          <div className="h-5 bg-white/10 rounded-lg w-5/6 skeleton-shimmer"></div>
        </div>

        {/* 列表骨架 */}
        <div className="ml-6 space-y-2">
          <div className="h-4 bg-white/10 rounded-lg w-5/6 skeleton-shimmer"></div>
          <div className="h-4 bg-white/10 rounded-lg w-4/6 skeleton-shimmer"></div>
          <div className="h-4 bg-white/10 rounded-lg w-3/6 skeleton-shimmer"></div>
        </div>
      </div>
    </div>
  )
}

export function DayCardSkeleton() {
  return (
    <div className="mb-5 bg-card/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-[0_4px_16px_rgba(0,0,0,0.15)] transition-all duration-300">
      {/* 日期标题骨架 */}
      <div className="flex items-center justify-between mb-4 cursor-pointer">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/10 rounded-lg skeleton-shimmer"></div>
          <div className="h-6 bg-white/10 rounded-lg w-32 skeleton-shimmer"></div>
        </div>
        <div className="h-6 bg-white/10 rounded-lg w-6 skeleton-shimmer"></div>
      </div>

      {/* 表格骨架 */}
      <div className="overflow-x-auto">
        <div className="border border-white/10 rounded-lg p-4">
          <div className="h-5 bg-white/10 rounded-lg w-1/4 skeleton-shimmer mb-3"></div>
          <div className="space-y-2">
            <div className="h-4 bg-white/10 rounded-lg w-full skeleton-shimmer"></div>
            <div className="h-4 bg-white/10 rounded-lg w-full skeleton-shimmer"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
