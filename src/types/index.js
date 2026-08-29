// 核心数据类型定义

/**
 * 难度等级
 */
export const Difficulty = {
  BEGINNER: 'beginner',      // 入门
  BASIC: 'basic',            // 基础
  INTERMEDIATE: 'intermediate', // 进阶
  ADVANCED: 'advanced',      // 高级
  PROJECT: 'project'         // 项目实战
};

export const DifficultyLabels = {
  beginner: '入门',
  basic: '基础',
  intermediate: '进阶',
  advanced: '高级',
  project: '项目实战'
};

export const DifficultyColors = {
  beginner: '#10b981',
  basic: '#3b82f6',
  intermediate: '#f59e0b',
  advanced: '#ef4444',
  project: '#8b5cf6'
};

/**
 * 编程语言枚举
 */
export const Languages = {
  CPP: 'cpp',
  JAVA: 'java',
  PYTHON: 'python'
};

export const LanguageInfo = {
  cpp: {
    name: 'C++',
    icon: '⚡',
    color: '#00599C',
    gradient: ['#00599C', '#004482'],
    description: '系统级编程语言，性能强大，广泛用于游戏、操作系统、嵌入式开发',
    compiler: '推荐编译器：Cxxdroid / C++ Compiler / Termux (g++)'
  },
  java: {
    name: 'Java',
    icon: '☕',
    color: '#ED8B00',
    gradient: ['#ED8B00', '#D77700'],
    description: '企业级开发首选，跨平台，广泛用于Android、后端服务开发',
    compiler: '推荐编译器：Jvdroid / AIDE / Termux (javac)'
  },
  python: {
    name: 'Python',
    icon: '🐍',
    color: '#3776AB',
    gradient: ['#3776AB', '#2B5C85'],
    description: '人工智能首选语言，语法简洁，广泛用于数据科学、Web、自动化',
    compiler: '推荐编译器：Pydroid 3 / Python IDE / Termux (python3)'
  }
};

/**
 * 知识点
 */
export class KnowledgePoint {
  constructor({
    id,
    title,
    content,        // Markdown 格式的讲解内容
    codeExample,    // 示例代码
    codeOutput,     // 示例代码输出
    tips = [],      // 重点提示
    commonMistakes = [], // 常见错误
    relatedLinks = []    // 相关外链资源
  }) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.codeExample = codeExample;
    this.codeOutput = codeOutput;
    this.tips = tips;
    this.commonMistakes = commonMistakes;
    this.relatedLinks = relatedLinks;
  }
}

/**
 * 题目类型
 */
export const ProblemType = {
  MULTIPLE_CHOICE: 'multiple_choice', // 选择题
  FILL_BLANK: 'fill_blank',           // 填空题
  CODE_COMPLETE: 'code_complete',     // 代码补全
  CODE_WRITE: 'code_write'            // 代码编写
};

/**
 * 题目
 */
export class Problem {
  constructor({
    id,
    title,
    type,
    difficulty,
    description,
    codeTemplate = '',  // 代码模板（用于代码类题目）
    options = [],       // 选项（选择题）
    answer,             // 正确答案
    hints = [],         // 提示列表，按递进顺序给出
    knowledgePointIds,  // 关联的知识点ID
    explanation         // 答案解析
  }) {
    this.id = id;
    this.title = title;
    this.type = type;
    this.difficulty = difficulty;
    this.description = description;
    this.codeTemplate = codeTemplate;
    this.options = options;
    this.answer = answer;
    this.hints = hints;
    this.knowledgePointIds = knowledgePointIds;
    this.explanation = explanation;
  }
}

/**
 * 学习单元（章节）
 */
export class LearningUnit {
  constructor({
    id,
    title,
    description,
    difficulty,
    order,            // 在路径中的顺序
    knowledgePoints,  // 知识点列表
    problems,         // 题目列表
    unlocked = false,
    completed = false
  }) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.difficulty = difficulty;
    this.order = order;
    this.knowledgePoints = knowledgePoints;
    this.problems = problems;
    this.unlocked = unlocked;
    this.completed = completed;
  }
}

/**
 * 学习路径（完整教学方案）
 */
export class LearningPath {
  constructor({
    language,
    units,          // LearningUnit 列表，按顺序排列
    projects        // 项目实战列表
  }) {
    this.language = language;
    this.units = units;
    this.projects = projects;
  }

  getTotalProblems() {
    return this.units.reduce((sum, unit) => sum + unit.problems.length, 0);
  }

  getTotalKnowledgePoints() {
    return this.units.reduce((sum, unit) => sum + unit.knowledgePoints.length, 0);
  }
}

/**
 * 项目实战
 */
export class Project {
  constructor({
    id,
    title,
    description,
    difficulty,
    prerequisites,    // 前置知识描述
    requirements,     // 功能需求列表
    techStack,        // 技术要点
    architectureHint, // 架构提示
    testCases,        // 测试用例
    referenceSolution // 参考答案大纲
  }) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.difficulty = difficulty;
    this.prerequisites = prerequisites;
    this.requirements = requirements;
    this.techStack = techStack;
    this.architectureHint = architectureHint;
    this.testCases = testCases;
    this.referenceSolution = referenceSolution;
  }
}

/**
 * 用户学习进度
 */
export class UserProgress {
  constructor() {
    this.completedUnits = {};     // { language: [unitId] }
    this.completedProblems = {};  // { problemId: { attempts, correct, timeSpent } }
    this.wrongProblems = [];      // 错题列表
    this.currentUnit = {};        // { language: unitId }
    this.hintUsage = {};          // { problemId: hintsUsedCount }
    this.totalStudyTime = 0;      // 总学习时长（分钟）
    this.streak = 0;              // 连续学习天数
    this.lastStudyDate = null;    // 上次学习日期
  }
}
