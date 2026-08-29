// 用户进度管理 Context
import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserProgress, Languages } from '../types';
import { getUnits, findUnitById, getPrerequisiteUnitId } from '../data';

const STORAGE_KEY = '@codemaster_user_progress_v1';

const ProgressContext = createContext(null);

export const ProgressProvider = ({ children }) => {
  const [progress, setProgress] = useState(() => new UserProgress());
  const [ready, setReady] = useState(false);

  // 启动时加载
  useEffect(() => {
    loadProgress();
  }, []);

  // 持久化保存
  useEffect(() => {
    if (ready) saveProgress();
  }, [progress]);

  const loadProgress = async () => {
    try {
      const raw = await AsyncStorage.getItem(STORAGE_KEY);
      if (raw) {
        const data = JSON.parse(raw);
        // 合并默认值（防止版本升级字段缺失）
        setProgress({ ...new UserProgress(), ...data });
      }
    } catch (e) {
      console.warn('加载进度失败', e);
    } finally {
      setReady(true);
    }
  };

  const saveProgress = async () => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (e) {
      console.warn('保存进度失败', e);
    }
  };

  // ======== 业务方法 ========

  /** 检查单元是否已解锁 */
  const isUnitUnlocked = (language, unitId) => {
    const units = getUnits(language);
    const completed = progress.completedUnits[language] || [];
    const unit = findUnitById(language, unitId);
    if (!unit) return false;
    // 第一个单元默认解锁
    if (unit.order === 1) return true;
    const preId = getPrerequisiteUnitId(language, unitId);
    return preId ? completed.includes(preId) : false;
  };

  /** 检查单元是否已完成 */
  const isUnitCompleted = (language, unitId) => {
    return (progress.completedUnits[language] || []).includes(unitId);
  };

  /** 题目是否做对过 */
  const isProblemCorrect = (problemId) => {
    return progress.completedProblems[problemId]?.correct === true;
  };

  /** 获取题目做过的次数 */
  const getProblemAttempts = (problemId) => {
    return progress.completedProblems[problemId]?.attempts || 0;
  };

  /** 记录答题结果 */
  const recordProblem = (problemId, correct) => {
    setProgress(prev => {
      const prevRec = prev.completedProblems[problemId] || { attempts: 0, correct: false };
      const updatedRec = {
        ...prevRec,
        attempts: prevRec.attempts + 1,
        correct: correct || prevRec.correct,  // 只要对过一次就记为correct
      };
      const wrongProblems = prev.wrongProblems.filter(id => id !== problemId);
      if (!correct) wrongProblems.push(problemId);
      
      return {
        ...prev,
        completedProblems: { ...prev.completedProblems, [problemId]: updatedRec },
        wrongProblems: [...new Set(wrongProblems)],
      };
    });
  };

  /** 尝试解锁下一个单元：判断当前单元所有题目是否都做对 */
  const tryUnlockNextUnit = (language, unitId) => {
    const unit = findUnitById(language, unitId);
    if (!unit) return;
    const allCorrect = unit.problems.every(p => isProblemCorrect(p.id));
    if (allCorrect) {
      markUnitCompleted(language, unitId);
    }
  };

  /** 手动标记单元完成 */
  const markUnitCompleted = (language, unitId) => {
    setProgress(prev => {
      const done = new Set(prev.completedUnits[language] || []);
      done.add(unitId);
      return {
        ...prev,
        completedUnits: { ...prev.completedUnits, [language]: [...done] },
      };
    });
  };

  /** 记录提示使用 */
  const recordHintUsage = (problemId) => {
    setProgress(prev => ({
      ...prev,
      hintUsage: {
        ...prev.hintUsage,
        [problemId]: (prev.hintUsage[problemId] || 0) + 1,
      },
    }));
  };

  /** 获取语言整体完成度 % */
  const getLanguageProgress = (language) => {
    const units = getUnits(language);
    if (!units.length) return 0;
    const completed = progress.completedUnits[language] || [];
    const totalProblems = units.reduce((sum, u) => sum + u.problems.length, 0);
    const correctProblems = units.reduce(
      (sum, u) => sum + u.problems.filter(p => isProblemCorrect(p.id)).length,
      0
    );
    // 单元进度(30%) + 题目进度(70%)
    const unitRate = completed.length / units.length;
    const probRate = totalProblems ? correctProblems / totalProblems : 0;
    return Math.round((unitRate * 0.3 + probRate * 0.7) * 100);
  };

  /** 从错题本移除 */
  const removeFromWrongBook = (problemId) => {
    setProgress(prev => ({
      ...prev,
      wrongProblems: prev.wrongProblems.filter(id => id !== problemId),
    }));
  };

  /** 重置所有进度 */
  const resetProgress = async () => {
    setProgress(new UserProgress());
    await AsyncStorage.removeItem(STORAGE_KEY);
  };

  /** 增加学习时长（分钟） */
  const addStudyTime = (minutes = 1) => {
    setProgress(prev => ({
      ...prev,
      totalStudyTime: prev.totalStudyTime + minutes,
    }));
  };

  const value = {
    progress,
    ready,
    isUnitUnlocked,
    isUnitCompleted,
    isProblemCorrect,
    getProblemAttempts,
    recordProblem,
    tryUnlockNextUnit,
    markUnitCompleted,
    recordHintUsage,
    getLanguageProgress,
    removeFromWrongBook,
    resetProgress,
    addStudyTime,
  };

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error('useProgress must be used inside ProgressProvider');
  return ctx;
};
