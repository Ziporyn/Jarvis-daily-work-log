import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'
import fm from 'front-matter'

interface LogEntry {
  date: string
  content: string
}

interface ArticleEntry {
  id: string
  title: string
  summary: string
  date: string
  tags: string[]
}

// https://vite.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        articles: path.resolve(__dirname, 'articles.html'),
        article: path.resolve(__dirname, 'article.html')
      }
    }
  },
  plugins: [
    react(),
    {
      name: 'generate-manifest',
      writeBundle() {
        const logDataDir = path.resolve(__dirname, 'log_data')
        const publicDataDir = path.resolve(__dirname, 'public/data')

        // Ensure public/data directory exists
        if (!fs.existsSync(publicDataDir)) {
          fs.mkdirSync(publicDataDir, { recursive: true })
        }

        // Read all markdown files from log_data (recursively)
        let logs: LogEntry[] = []

        function findMarkdownFiles(dir: string): string[] {
          const files: string[] = []
          if (!fs.existsSync(dir)) return files

          const entries = fs.readdirSync(dir, { withFileTypes: true })

          for (const entry of entries) {
            const fullPath = path.join(dir, entry.name)
            if (entry.isDirectory()) {
              files.push(...findMarkdownFiles(fullPath))
            } else if (entry.isFile() && entry.name.endsWith('.md')) {
              files.push(fullPath)
            }
          }

          return files
        }

        const mdFiles = findMarkdownFiles(logDataDir)

        for (const filePath of mdFiles) {
          const content = fs.readFileSync(filePath, 'utf-8')
          const { attributes, body } = fm<Record<string, unknown>>(content)

          // Handle date - could be Date object or string
          let dateStr = path.basename(filePath, '.md')
          if (attributes.date) {
            if (attributes.date instanceof Date) {
              const y = attributes.date.getFullYear()
              const m = String(attributes.date.getMonth() + 1).padStart(2, '0')
              const d = String(attributes.date.getDate()).padStart(2, '0')
              dateStr = `${y}-${m}-${d}`
            } else {
              dateStr = String(attributes.date)
            }
          }

          logs.push({
            date: dateStr,
            content: body.trim()
          })
        }

        // Sort by date descending
        logs.sort((a, b) => String(b.date).localeCompare(String(a.date)))

        // Generate manifest
        const manifest = {
          lastUpdated: new Date().toISOString(),
          logs
        }

        // Write to public/data/manifest.json
        fs.writeFileSync(
          path.join(publicDataDir, 'manifest.json'),
          JSON.stringify(manifest, null, 2)
        )

        console.log('✓ Generated manifest.json with', logs.length, 'log entries')
      }
    },
    {
      name: 'generate-articles-manifest',
      writeBundle() {
        const articlesDataDir = path.resolve(__dirname, 'articles_data')
        const publicDataDir = path.resolve(__dirname, 'public/data')
        const distDataDir = path.resolve(__dirname, 'dist/data')

        // Ensure directories exist
        if (!fs.existsSync(publicDataDir)) {
          fs.mkdirSync(publicDataDir, { recursive: true })
        }
        if (!fs.existsSync(distDataDir)) {
          fs.mkdirSync(distDataDir, { recursive: true })
        }

        // Create articles subdirectory for individual article files
        const distArticlesDir = path.join(distDataDir, 'articles')
        if (!fs.existsSync(distArticlesDir)) {
          fs.mkdirSync(distArticlesDir, { recursive: true })
        }

        // Read all markdown files from articles_data
        let articles: ArticleEntry[] = []

        function findMarkdownFiles(dir: string): string[] {
          const files: string[] = []
          if (!fs.existsSync(dir)) return files

          const entries = fs.readdirSync(dir, { withFileTypes: true })

          for (const entry of entries) {
            const fullPath = path.join(dir, entry.name)
            if (entry.isDirectory()) {
              files.push(...findMarkdownFiles(fullPath))
            } else if (entry.isFile() && entry.name.endsWith('.md')) {
              files.push(fullPath)
            }
          }

          return files
        }

        if (fs.existsSync(articlesDataDir)) {
          const mdFiles = findMarkdownFiles(articlesDataDir)

          for (const filePath of mdFiles) {
            const content = fs.readFileSync(filePath, 'utf-8')
            const { attributes, body } = fm<Record<string, unknown>>(content)

            // Extract ID from filename
            const id = path.basename(filePath, '.md')

            // Handle date
            let dateStr = '2026-01-01'
            if (attributes.date) {
              if (attributes.date instanceof Date) {
                const y = attributes.date.getFullYear()
                const m = String(attributes.date.getMonth() + 1).padStart(2, '0')
                const d = String(attributes.date.getDate()).padStart(2, '0')
                dateStr = `${y}-${m}-${d}`
              } else {
                dateStr = String(attributes.date)
              }
            }

            // Extract title (first heading)
            const titleMatch = body.match(/^#\s+(.+)$/m)
            const title = titleMatch ? titleMatch[1].trim() : id

            // Generate summary (first paragraph)
            const summaryMatch = body.match(/^([^#\n][^]{50,300})$/m)
            const summary = summaryMatch ? summaryMatch[1].trim() : body.substring(0, 200).trim()

            // Extract tags (can be customized in frontmatter)
            const tags = (attributes.tags as string[] | undefined) || []

            articles.push({
              id,
              title,
              summary,
              date: dateStr,
              tags
            })

            // Generate individual article JSON file
            const articleContent = {
              date: dateStr,
              content: body.trim()
            }
            fs.writeFileSync(
              path.join(distArticlesDir, `${id}.json`),
              JSON.stringify(articleContent, null, 2)
            )
          }

          // Sort by date descending
          articles.sort((a, b) => String(b.date).localeCompare(String(a.date)))

          // Generate articles manifest
          const articlesManifest = {
            lastUpdated: new Date().toISOString(),
            articles
          }

          // Write to public/data/articles.json
          fs.writeFileSync(
            path.join(publicDataDir, 'articles.json'),
            JSON.stringify(articlesManifest, null, 2)
          )

          console.log('✓ Generated articles.json with', articles.length, 'articles')
          console.log('✓ Generated', articles.length, 'individual article files')
        }
      }
    }
  ]
})
