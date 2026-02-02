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

async function findMdFiles(dir, files = []) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await findMdFiles(fullPath, files);
    } else if (entry.isFile() && entry.name.endsWith('.md') && entry.name !== 'manifest.json') {
      files.push(fullPath);
    }
  }
  return files;
}

async function buildManifest() {
  const dataDir = path.join(__dirname, '..', 'log_data');
  const manifestFile = path.join(dataDir, 'manifest.json');

  try {
    // 递归查找所有md文件
    const mdFiles = await findMdFiles(dataDir);

    const logs = [];

    // 遍历所有md文件，按日期排序（最新的在前）
    for (const filePath of mdFiles.sort((a, b) => b.localeCompare(a))) {
      const content = await fs.readFile(filePath, 'utf-8');

      const parsed = await parseFrontmatter(content);
      if (!parsed) continue;

      if (parsed.frontmatter) {
        const relativePath = path.relative(dataDir, filePath);
        logs.push({
          date: parsed.frontmatter.date || path.basename(filePath, '.md'),
          file: relativePath,
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
