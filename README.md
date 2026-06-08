# Flutter Mastery Check

一款用于 **Flutter 开发知识自我检测** 的交互式 Web 工具，支持选择题、代码找错、实战任务、开放问答四种题型，可自定义扩展知识模块。

## 技术栈

| 技术 | 版本 |
|------|------|
| [React](https://react.dev/) | ^19.2 |
| [Vite](https://vite.dev/) | ^8.0 |
| [ESLint](https://eslint.org/) | ^10.3 |
| [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react) | ^6.0 |

- 语言: **JavaScript (JSX)**
- 样式方案: **CSS-in-JS**（内联样式）
- 构建工具: **Vite**（开发服务器 + 极速 HMR）
- 代码检查: **ESLint**（含 `react-hooks` + `react-refresh` 插件）

## 快速开始

```bash
# 安装依赖
npm install

# 启动开发服务器（默认 http://localhost:5173）
npm run dev

# 构建生产包
npm run build

# 预览构建产物
npm run preview

# 运行代码检查
npm run lint
```

## 功能说明

### 题型分类

| 题型 | 说明 | 交互方式 |
|------|------|----------|
| **选择题** | 单选，选择后提交并查看解析 | 点击选项 → 提交 → 显示正误与解析 |
| **代码找错** | 阅读代码片段，选出错误所在 | 查看代码 → 选择答案 → 提交并查看分析 |
| **实战任务** | 动手实践，按验收标准自检 | 阅读任务描述 → 逐项勾选验收标准 → 确认完成 |
| **开放问答** | 自由作答，参考标准答案对照 | 编写答案 → 查看参考答案对照 → 标记完成 |

### 进度追踪

- 所有完成记录自动保存至浏览器 **localStorage**
- 侧边栏显示每个模块/主题的完成进度
- 总览面板展示总体进度、各模块完成率及题型分布

### 自定义模块

可自由创建自己的知识检测模块：

1. 点击左侧 **「+ 添加知识模块」** 创建新模块
2. 在模块下 **添加主题**（知识点分类）
3. 在主题下 **添加题目**（支持全部四种题型）
4. 自定义内容支持 **导入 / 导出**（JSON 格式），方便备份与分享

### 数据管理

- **重置进度**：清空所有完成记录，重新开始检测
- **导入 / 导出**：将自定义模块导出为 JSON 文件，或从文件导入，便于迁移和备份

## 项目结构

```
flutter-mastery-check/
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── assets/           # 图片资源
│   ├── data/
│   │   └── assessmentData.js  # 内置检测题库（Dart / Flutter 各模块）
│   ├── App.jsx           # 主应用组件（全部 UI 逻辑）
│   ├── main.jsx          # 入口文件
│   └── index.css         # 全局样式
├── index.html
├── vite.config.js
├── eslint.config.js
└── package.json
```

## 开发说明

- 项目使用 **ES Modules** (`"type": "module"`)
- 试题数据集中在 `src/data/assessmentData.js`，如需增删改内置题目，直接编辑该文件
- 所有 UI 使用内联样式，无外部 CSS 框架依赖
- 数据持久化使用 `localStorage`，键名：`flutter_mastery_progress`（进度）、`flutter_mastery_custom`（自定义模块）
