// Map section titles to icons
const iconMap: Record<string, string> = {
  '工作情况': '✅',
  '详细记录': '📝',
  '备注': '📌'
}

// Parse markdown content into HTML
export function markdownToHtml(markdown: string): string {
  let html = markdown

  // Process tables - extract table rows and convert to HTML
  const tablePattern = /\|(.+)\|\n\|[-|\s]+\|\n((?:\|.+\|\n?)+)/g
  html = html.replace(tablePattern, (match, headers, rows) => {
    const headerCells = headers.split('|').filter(h => h.trim()).map(h => `<th>${h.trim()}</th>`).join('')
    const bodyRows = rows.trim().split('\n').map(row => {
      const cells = row.split('|').filter(c => c.trim()).map(c => `<td>${c.trim()}</td>`).join('')
      return `<tr>${cells}</tr>`
    }).join('')

    return `<table><thead><tr>${headerCells}</tr></thead><tbody>${bodyRows}</tbody></table>`
  })

  // Process headers (###)
  html = html.replace(/^### (.+)$/gm, '<h3>$1</h3>')

  // Process lists (- )
  html = html.replace(/^- (.+)$/gm, '<li>$1</li>')
  html = html.replace(/(<li>.*<\/li>\n?)+/g, '<ul>$&</ul>')

  // Process paragraphs (lines that aren't already wrapped)
  const lines = html.split('\n')
  const processedLines = lines.map(line => {
    const trimmed = line.trim()
    if (trimmed && !trimmed.match(/^[<{]/)) {
      return `<p>${trimmed}</p>`
    }
    return line
  })
  html = processedLines.join('\n')

  return html
}

// Parse log content into sections
export interface LogSection {
  title: string
  icon: string
  content: string
}

export function parseLogContent(content: string): LogSection[] {
  // Split by ## headings
  const sections = content.split(/^## /gm).filter(s => s.trim())

  return sections.map(section => {
    const lines = section.trim().split('\n')
    const title = lines[0]
    const sectionContent = lines.slice(1).join('\n')
    const icon = iconMap[title] || '📋'
    const htmlContent = markdownToHtml(sectionContent)

    return {
      title,
      icon,
      content: htmlContent
    }
  })
}
