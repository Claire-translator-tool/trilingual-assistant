# 外贸三语助手 (Trilingual Foreign Trade Assistant)

这是一个专为外贸从业人员设计的翻译、笔记与学习工具。支持中文、英文、俄语三语互译，并提供单词、句子的个人管理功能。

## 核心功能

- **三语翻译**：支持中、英、俄语快速翻译。
- **逐字解析**：翻译后自动拆解单词，显示释义与音标。
- **个人单词本/句子本**：每个用户可以保存自己感兴趣的词汇和句子。
- **朗读功能**：支持原文与译文的语音合成（TTS）。
- **多端适配**：完美适配手机端、平板与 PC。
- **用户系统**：支持注册与登录，实现个人数据的独立存储。

## 技术栈

- **前端框架**：Next.js 14 (App Router)
- **样式**：Tailwind CSS (深色主题)
- **图标**：Lucide React
- **数据库/ORM**：Prisma + SQLite (可轻松切换为 PostgreSQL)
- **认证**：NextAuth.js (已预留接口)

## 如何运行

1. **安装依赖**：
   ```bash
   npm install
   ```

2. **初始化数据库**：
   ```bash
   npx prisma db push
   ```

3. **启动开发服务器**：
   ```bash
   npm run dev
   ```

4. **访问**：
   打开浏览器访问 [http://localhost:3000](http://localhost:3000)

## 项目结构

- `src/app/page.tsx`: 翻译核心页面
- `src/app/words/page.tsx`: 个人单词本
- `src/app/sentences/page.tsx`: 个人句子本
- `src/app/login/page.tsx`: 登录与注册页面
- `prisma/schema.prisma`: 数据库模型定义
