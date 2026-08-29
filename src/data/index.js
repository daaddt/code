// 统一导出所有语言的学习路径
import { cppLearningPath } from './cppCurriculum';
import { javaLearningPath } from './javaCurriculum';
import { pythonLearningPath } from './pythonCurriculum';
import { Languages } from '../types';

export const learningPaths = {
  [Languages.CPP]: cppLearningPath,
  [Languages.JAVA]: javaLearningPath,
  [Languages.PYTHON]: pythonLearningPath,
};

/**
 * 获取指定语言的完整学习路径
 */
export const getLearningPath = (language) => learningPaths[language];

/**
 * 获取指定语言的所有单元
 */
export const getUnits = (language) => learningPaths[language]?.units || [];

/**
 * 获取指定语言的所有项目
 */
export const getProjects = (language) => learningPaths[language]?.projects || [];

/**
 * 根据ID查找学习单元（跨语言通用）
 */
export const findUnitById = (language, unitId) => {
  return getUnits(language).find(u => u.id === unitId);
};

/**
 * 根据ID查找题目
 */
export const findProblemById = (language, problemId) => {
  for (const unit of getUnits(language)) {
    const p = unit.problems.find(p => p.id === problemId);
    if (p) return p;
  }
  return null;
};

/**
 * 根据ID查找知识点
 */
export const findKnowledgePointById = (language, kpId) => {
  for (const unit of getUnits(language)) {
    const kp = unit.knowledgePoints.find(k => k.id === kpId);
    if (kp) return kp;
  }
  return null;
};

/**
 * 根据ID查找项目
 */
export const findProjectById = (language, projectId) => {
  return getProjects(language).find(p => p.id === projectId);
};

/**
 * 获取某个单元的前置单元ID（上一个单元）
 */
export const getPrerequisiteUnitId = (language, unitId) => {
  const units = getUnits(language);
  const idx = units.findIndex(u => u.id === unitId);
  return idx > 0 ? units[idx - 1].id : null;
};
