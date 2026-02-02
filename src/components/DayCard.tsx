import { useState } from 'react'
import { parseLogContent, type LogSection } from '../utils/markdown'

interface DayCardProps {
  date: string
  content: string
  isDefaultExpanded?: boolean
}

export default function DayCard({ date, content, isDefaultExpanded = false }: DayCardProps) {
  const [isExpanded, setIsExpanded] = useState(isDefaultExpanded)

  const sections = parseLogContent(content)

  return (
    <div className={`day-card ${isExpanded ? 'expanded' : ''} bg-card rounded-[20px] my-5 backdrop-blur-2xl border border-white/5 shadow-[0_8px_32px_rgba(0,0,0,0.3)] overflow-hidden transition-all duration-300`}>
      <div
        className="flex items-center justify-between gap-4 px-8 py-6 bg-primary/10 border-b border-white/5 cursor-pointer select-none transition-colors duration-200 hover:bg-primary/15"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-3">
          <span>📅</span>
          <span className="text-xl font-semibold text-primary">{date}</span>
        </div>
        <span className="expand-icon text-text-muted text-2xl">▼</span>
      </div>

      <div className={`day-card-content ${isExpanded ? 'max-h-[5000px]' : 'max-h-0'} overflow-hidden`}>
        {sections.map((section, index) => (
          <div
            key={index}
            className={`px-8 py-8 ${index < sections.length - 1 ? 'border-b border-white/5' : ''}`}
          >
            <div className="flex items-center gap-2.5 mb-5 pb-3 border-b border-white/10">
              <span className="text-xl">{section.icon}</span>
              <span className="text-lg font-semibold text-text-primary">{section.title}</span>
            </div>
            <div
              className="day-card-content text-text-secondary"
              dangerouslySetInnerHTML={{ __html: section.content }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
