# CodeMaster 代码大师 📱

> 一款系统整合代码学习资源的手机应用。

## ✨ 应用特色

- **三门主流语言**：C++、Java、Python，每门都有独立的系统化教学体系
- **题目驱动学习**：先做题遇到困难再学知识点，学以致用效果更好
- **由浅入深阶梯式路径**：入门 → 基础 → 进阶 → 高级 → 项目实战，每一步都扎实
- **提示递进系统**：不会直接给答案，一步一步引导你思考
- **错题本**：做错的题目自动收录，反复练习薄弱环节
- **知识点深度讲解**：表格、代码示例、易错点、重点提示、资源链接
- **9个大型实战项目**：每门语言3个项目，从需求分析→架构→编码→测试全流程
- **进度持久化**：所有学习进度、错题、完成情况自动保存到本地

## 🗂️ 项目结构

```
/workspace
├── App.js                       # 应用入口 + 导航
├── app.json                     # Expo 应用配置
├── package.json                 # 依赖管理
├── babel.config.js              # Babel 配置
└── src/
    ├── theme.js                 # 全局主题：颜色、间距、字号、阴影
    ├── types/index.js           # 核心数据模型和类
    ├── context/
    │   └── ProgressContext.js   # 用户学习进度（持久化存储）
    ├── data/
    │   ├── index.js             # 统一索引/查询接口
    │   ├── cppCurriculum.js     # C++ 完整课程：9单元+3项目
    │   ├── javaCurriculum.js    # Java 完整课程：8单元+3项目
    │   └── pythonCurriculum.js  # Python 完整课程：8单元+3项目
    ├── components/
    │   └── UI.js                # 通用组件：Card,Button,Badge,ProgressBar...
    └── screens/                 # 所有页面
        ├── HomeScreen.js              # 首页：语言选择+统计
        ├── CourseScreen.js            # 学习路径：章节时间线
        ├── UnitScreen.js              # 单元页：知识点+题目列表
        ├── KnowledgeScreen.js         # 知识点详情页（支持 Markdown）
        ├── ProblemScreen.js           # 做题页：4种题型+提示+解析
        ├── ProjectDetailScreen.js     # 项目实战详情
        ├── WrongBookScreen.js         # 错题本
        └── CompilerGuideScreen.js     # 编译器推荐与使用指南
```

## 📖 教学内容总览

每门语言包含约 **8~9 个学习单元**，每个单元包含 2~8 个知识点和 1~4 道精心设计的题目。

### C++ 教学体系（9 单元 + 3 项目）
1. **入门**：Hello World、输入输出
2. **变量、数据类型与运算符**：int/double/bool、算术/关系/逻辑运算
3. **流程控制**：if/switch、for/while/do-while
4. **函数**：定义、重载、递归、默认参数
5. **数组与字符串**：一维/二维数组、排序查找
6. **指针与引用**：C++ 核心难点详解
7. **面向对象**：类、构造析构、继承、多态
8. **STL 标准库**：vector/map/set/string
9. **文件操作与异常**：fstream 读写、异常处理

**项目实战**：
- 项目1：学生成绩管理系统（控制台）
- 项目2：贪吃蛇小游戏（控制台）
- 项目3：简易 JSON 解析器（硬核）

### Java 教学体系（8 单元 + 3 项目）
1. **入门**：JVM 简介、main 方法、输入 Scanner
2. **数据类型与运算符**：8种基本类型、类型转换
3. **流程控制**：if-else / switch / for / while
4. **方法**：方法重载、可变参数、递归
5. **数组与字符串**：数组操作、String 常用方法
6. **面向对象**：封装继承多态、static/final、抽象类接口
7. **集合框架**：ArrayList/HashMap/HashSet
8. **异常处理与文件I/O**：try-catch、文件读写、JSON

**项目实战**：
- 项目1：图书馆管理系统（控制台 + 持久化）
- 项目2：Swing 记事本 GUI 程序
- 项目3：迷你 Tomcat — 简易 Web 服务器

### Python 教学体系（8 单元 + 3 项目）
1. **入门**：print/input、f-string 格式化
2. **变量、数据类型与运算符**：整数无溢出、链式比较、// 地板除
3. **流程控制**：if/elif/else、for + range、enumerate/zip
4. **四大容器**：List 切片与推导式、Tuple、Dict、Set
5. **函数**：def/*args/**kwargs、lambda、作用域
6. **面向对象**：class 定义、继承 super、魔法方法、装饰器原理
7. **文件I/O与异常**：with open、JSON 持久化、try-except
8. **标准库与模块化**：math/random/datetime/collections/pathlib/itertools

**项目实战**：
- 项目1：个人记账本（JSON+CSV双格式）
- 项目2：2048 小游戏（终端版）
- 项目3：电影数据分析（Requests + BeautifulSoup + Pandas）

## 🚀 快速启动

### 方式一：手机 Expo Go（最简单）
```bash
# 1. 安装依赖
npm install

# 2. 启动 Expo
npx expo start

# 3. 手机安装 "Expo Go" App → 扫屏幕上的二维码即可启动
```

### 方式二：手机上的编译器推荐
- **Python**：Pydroid 3（最推荐）、Python IDE、Termux
- **Java**：Jvdroid、AIDE、Termux (openjdk-17)
- **C++**：Cxxdroid、C++ Compiler IDE、Termux (clang)

## 🎯 配套编译器使用流程
```
CodeMaster 看题/学知识点 → 编译器写代码并运行 → 回到 CodeMaster 提交答案
```
应用内 **编译器推荐** 页面有每种语言的详细安装说明和评分。

## 💡 学习方法论（内置）
1. **先做题再学知识点**：遇到困难再看知识点讲解
2. **不要用提示**：至少思考 5 分钟再点提示按钮
3. **错题反复做**：错题本消灭完，才能算真正掌握
4. **项目自己写**：千万不要抄参考答案，先独立编码再对照
5. **一周后重写**：做完项目保存起来，一周后再独立写一遍，才能真正掌握
