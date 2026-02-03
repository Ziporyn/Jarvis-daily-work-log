import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'
import fm from 'front-matter'

interface LogEntry {
  date: string
  content: string
}

// https://vite.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        articles: path.resolve(__dirname, 'articles.html')
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
      name: 'copy-articles-data',
      writeBundle() {
        const publicDataDir = path.resolve(__dirname, 'public/data')
        const articlesSrc = path.join(publicDataDir, 'articles.json')

        // Copy articles.json if it exists
        if (fs.existsSync(articlesSrc)) {
          const distDataDir = path.resolve(__dirname, 'dist/data')
          if (!fs.existsSync(distDataDir)) {
            fs.mkdirSync(distDataDir, { recursive: true })
          }
          fs.copyFileSync(articlesSrc, path.join(distDataDir, 'articles.json'))
          console.log('✓ Copied articles.json to dist/data')
        }
      }
    }
  ]
})
