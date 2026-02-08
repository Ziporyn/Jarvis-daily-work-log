---
date: 2026-02-03
updatedAt: 2026-02-03T20:56:25+08:00
url: https://github.com/Leey21/awesome-ai-research-writing
---

# Awesome AI Research Writing - AI研究写作资源集合

这是一个专注于提升AI研究写作效率的开源资源集合项目，旨在解决学术圈中prompt工程和agent skills使用门槛的不平等问题。

## 项目背景

在学术圈，prompt工程正在成为一种"隐性资源"——顶尖研究组有完善的模板库，而大多数人还在从零摸索。更进一步，agent skills作为新兴技术能更强大地助力论文写作，但由于存在一定使用门槛，大部分人还不知道如何上手。这个项目不想看到这种不平等继续。

## 项目特点

### 🔬 实战打磨
来自一线科研人员的真实使用场景，调研了MSRA、Seed、SH AI Lab等顶尖研究机构的研究员，以及北大、中科大、上交的硕博同学。

### 🚀 开箱即用
复制即用，无需重复造轮子。

### 🤝 持续更新
不断收集新技巧和最佳实践。

## 核心内容

### Part I: 写作Prompt集合（15个模板）

所有Prompt都经过精心设计，可直接复制到大模型对话中使用。

#### 翻译类
- **中转英**: 将中文草稿翻译并润色为英文学术论文片段，要求逻辑严谨、用词准确、表达凝练连贯
- **英转中**: 将英文LaTeX代码片段翻译为流畅、易读的中文文本
- **中转中**: 将中文草稿重写为逻辑严密、用词考究的学术论文正文（Word适配）

#### 文本优化类
- **缩写**: 通过句法优化压缩文本长度，减少5-15个单词
- **扩写**: 通过深挖内容深度和增强逻辑连接，使文本更加饱满充分
- **表达润色（英文）**: 提升顶级会议论文的语言质量，零错误原则
- **表达润色（中文）**: 修复语病与逻辑漏洞，保持作者原有行文风格

#### 质量检查类
- **逻辑检查**: 进行红线审查，确保没有致命错误
- **去AI味**: 将机械化文本重写为自然学术表达

#### 图表生成类
- **论文架构图**: 生成专业、干净、现代的学术架构图
- **生成图的标题**: 撰写精准规范的论文插图标题
- **生成表的标题**: 撰写精准规范的论文表格标题
- **实验分析**: 从实验数据中挖掘关键特征和结论

#### 审查类
- **论文整体以Reviewer视角审视**: 模拟真实顶会审稿意见，给出严厉但建设性的报告

#### 其他
- **模型选择**: 从arena.ai获取Creative Writing能力排名前10的模型

### Part II: 论文写作相关的Agent Skills（5个）

适用对象：经常使用Cursor、Claude Code等AI coding工具的用户

#### 20-ml-paper-writing
面向NeurIPS / ICML / ICLR / ACL / AAAI / COLM的完整论文写作，包括：
- 从repo起稿
- LaTeX模板
- 引用验证
- 审稿人视角
- 会议checklist
- 格式迁移
- booktabs表格规范
- 图规范（矢量图、caption、色盲友好）

#### humanizer
识别并去除AI写作痕迹，使文本更自然。基于Wikipedia「Signs of AI writing」：
- 过度强调意义
- 促销腔
- 空洞-ing分析
- 模糊归因
- 破折号滥用
- 三点式堆砌
- AI高频词
- 否定式平行

同时注入「人味」：有观点、节奏变化、承认不确定性、适当用「我」。

#### docx
对.docx进行创建、编辑、分析，支持：
- 用pandoc转Markdown读正文
- 用Document库/OOXML编辑已有文档
- Redlining流程做带修订痕迹的审稿式修改

#### doc-coauthoring
分阶段文档协作流程：
1. 收集上下文与澄清问题
2. 按节头脑风暴→起草→精修
3. 读者测试查盲点

适用于论文单节或整篇的结构化迭代。

#### canvas-design
先产出design philosophy (.md)，再在画布上实现为单页.png/.pdf，适合论文中的概念图、示意图、框架图。

## 使用场景与示例

| 使用场景 | 推荐Skill | 示例Prompt | 产出 |
|---------|-----------|------------|------|
| 从零写一篇论文 | 20-ml-paper-writing | 「用这个repo帮我写一篇投NeurIPS的论文」 | 完整初稿 |
| 用会议模板开新稿 | 20-ml-paper-writing | 「帮我用ICLR 2026模板新建一篇论文」 | 模板目录 |
| 加引用/写Related Work | 20-ml-paper-writing | 「帮我找并引用2023年后RLHF的几篇代表作」 | BibTeX |
| 换会议/改投别家 | 20-ml-paper-writing | 「这篇稿子要从NeurIPS改成ICML」 | 新会议格式 |
| 投稿前清单核对 | 20-ml-paper-writing | 「帮我对一下NeurIPS的paper checklist」 | 检查报告 |
| 写/改LaTeX表格 | 20-ml-paper-writing | 「帮我把下面结果做成论文里的表格」 | LaTeX代码 |
| 图与caption规范 | 20-ml-paper-writing | 「帮我写Figure 1的caption」 | caption文案 |
| 结构化流程写某一节 | doc-coauthoring | 「用doc coauthoring流程，我们先写Introduction」 | 三阶段流程 |
| 论文概念图/示意图 | canvas-design | 「帮我画一个我们方法的整体框架图」 | .pdf/.png |
| 改图的风格或细节 | canvas-design | 「背景改成浅灰」 | 新版图 |
| 去AI味/润色后终稿检查 | humanizer | 「这段读起来像AI写的，帮我humanize」 | 自然文本 |
| 用Word模板写投稿稿 | docx | 「这是某期刊的Word模板，帮我把我的标题、摘要和正文填进去」 | .docx稿 |
| 对Word稿做修订建议 | docx | 「按redlining流程，帮我在文档里标出需要改的几处」 | 修订痕迹 |

## 技术栈

- GitHub开源
- OpenSkills生态
- Cursor Agent Skills
- npx openskills管理

## 模型选择建议

从公开网站arena.ai获取了Creative Writing能力排名前10的模型：
- **科研场景**（日常idea交互与论文写作）：主力模型为Gemini-3-pro/flash
- **代码编写场景**：更多使用Claude-4.5系列模型，以及Cursor内置的Composer模型
- **GPT系列**：GPT 5.1与GPT 5.2的表现较为一般，目前使用频率已大幅下降

## 项目链接

- GitHub: https://github.com/Leey21/awesome-ai-research-writing
- License: 开源

## 总结

这个项目为科研人员提供了一套完整的AI辅助论文写作解决方案，从Prompt模板到Agent Skills，涵盖了写作的全流程。核心价值在于将顶尖研究机构的实战经验开源出来，让更多人能够高效地进行学术写作，把精力留给真正的科研而不是prompt调试。
