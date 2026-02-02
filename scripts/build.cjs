#!/usr/bin/env node
/**
 * 构建工作日志的manifest.json文件
 * 遍历data目录下的所有md文件，解析frontmatter和内容
 */

const fs = require('fs').promises;
const path = require('path');

async function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return null;

  try {
    // 简单的frontmatter解析（YAML）
    const frontmatterText = match[1];
    const frontmatter = {};
    
    frontmatterText.split('\n').forEach(line => {
      if (line.includes(':')) {
        const [key, ...valueParts] = line.split(':');
        if (key && valueParts.length) {
          frontmatter[key.trim()] = valueParts.join(':').trim();
        }
      }
    });

    return { frontmatter, body: match[2].trim() };
  } catch (error) {
    console.error('解析frontmatter失败:', error);
    return null;
  }
}

async function buildManifest() {
  const dataDir = path.join(__dirname, '..', 'data');
  const manifestFile = path.join(dataDir, 'manifest.json');

  try {
    const files = await fs.readdir(dataDir);
    const mdFiles = files.filter(f => f.endsWith('.md') && f !== 'manifest.json');

    const logs = [];

    // 遍历所有md文件，按日期排序（最新的在前）
    for (const file of mdFiles.sort((a, b) => b.localeCompare(a))) {
      const filePath = path.join(dataDir, file);
      const content = await fs.readFile(filePath, 'utf-8');

      const parsed = await parseFrontmatter(content);
      if (!parsed) continue;

      if (parsed.frontmatter) {
        logs.push({
          date: parsed.frontmatter.date || file.replace('.md', ''),
          file: file,
          content: parsed.body
        });
      }
    }

    // 创建manifest
    const manifest = {
      logs: logs,
      lastUpdated: new Date().toISOString()
    };

    // 写入manifest.json
    await fs.writeFile(manifestFile, JSON.stringify(manifest, null, 2), 'utf-8');

    console.log('✅ Manifest构建完成，包含', logs.length, '条日志');
    console.log('📁 Manifest文件:', manifestFile);
  } catch (error) {
    console.error('构建失败:', error);
    process.exit(1);
  }
}

buildManifest();
