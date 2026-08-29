// 核心：做题页（支持4种题型 + 递进提示 + 答案解析）
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme, langColor } from '../theme';
import { ProblemType, DifficultyLabels, DifficultyColors } from '../types';
import { Card, CodeBlock, DifficultyBadge, Button, Divider, Badge } from '../components/UI';
import { findProblemById, findKnowledgePointById, findUnitById } from '../data';
import { useProgress } from '../context/ProgressContext';

/** 统一的题目头部：返回 + 上/下题 + 进度 */
const Header = ({ navigation, color, problemTitle, idx, total, prevDisabled, nextDisabled, goPrev, goNext }) => (
  <View style={[styles.header, { backgroundColor: color }]}>
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconBtn}>
        <Text style={styles.whiteIcon}>←</Text>
      </TouchableOpacity>
      <View style={{ flex: 1 }}>
        <Text style={styles.headerSub}>题目 {idx} / {total}</Text>
        <Text style={styles.headerTitle} numberOfLines={1}>{problemTitle}</Text>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity onPress={goPrev} style={[styles.iconBtn, prevDisabled && { opacity: 0.3 }]} disabled={prevDisabled}>
          <Text style={styles.whiteIcon}>‹</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={goNext} style={[styles.iconBtn, nextDisabled && { opacity: 0.3 }]} disabled={nextDisabled}>
          <Text style={styles.whiteIcon}>›</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
);

/** 选择题组件 */
const ChoiceQuestion = ({ problem, selected, setSelected }) => (
  <View>
    {problem.options.map((opt) => {
      const letter = opt.charAt(0);
      const isSelected = selected === letter;
      return (
        <TouchableOpacity
          key={letter}
          style={[styles.optionCard, isSelected && styles.optionCardSelected]}
          onPress={() => setSelected(letter)}>
          <View style={[styles.optionCircle, isSelected && styles.optionCircleSelected]}>
            <Text style={[styles.optionLetter, isSelected && { color: theme.colors.white }]}>{letter}</Text>
          </View>
          <Text style={[styles.optionText, isSelected && { color: theme.colors.primary, fontWeight: '600' }]}>
            {opt.slice(2).trim()}
          </Text>
        </TouchableOpacity>
      );
    })}
  </View>
);

/** 填空题（单空或多空逗号分隔）*/
const FillBlanksQuestion = ({ problem, answers, setAnswers }) => {
  const blanks = problem.answer.split(/[,，]/).length;  // 几空
  const arr = Array.isArray(answers) ? answers : Array(blanks).fill('');
  const onChange = (text, i) => {
    const next = [...arr];
    next[i] = text;
    setAnswers(next);
  };
  return (
    <View>
      <Text style={styles.fillHint}>共 {blanks} 个空，用英文或中文逗号分隔答案。答案按顺序填写：</Text>
      {Array(blanks).fill(0).map((_, i) => (
        <View key={i} style={styles.fillRow}>
          <Text style={styles.fillLabel}>第{i + 1}空：</Text>
          <TextInput
            style={styles.input}
            value={arr[i] || ''}
            onChangeText={t => onChange(t, i)}
            placeholder={`请输入第${i + 1}空的答案`}
            placeholderTextColor={theme.colors.textMuted}
            autoCapitalize="none"
          />
        </View>
      ))}
    </View>
  );
};

/** 代码补全 / 代码编写 统一用输入框 */
const CodeQuestion = ({ problem, code, setCode }) => {
  // 用 ___ 下划线分隔的文本
  const blanks = problem.codeTemplate ? problem.codeTemplate.split(/____+/g) : [];
  const blanksCount = Math.max(blanks.length - 1, 0);
  const arr = Array.isArray(code) ? code : Array(blanksCount || 1).fill(problem.codeTemplate ? '' : code || '');
  const onChange = (t, i) => {
    const next = [...arr];
    next[i] = t;
    setCode(next);
  };

  // 代码补全：显示代码模板 + 多处填空
  if (problem.type === ProblemType.CODE_COMPLETE && blanksCount > 0) {
    return (
      <View>
        <View style={styles.codeTemplateWrap}>
          {blanks.map((segment, i) => (
            <React.Fragment key={i}>
              <Text style={styles.codeTemplateText}>{segment}</Text>
              {i < blanks.length - 1 && (
                <View style={[styles.blankInline, arr[i] && styles.blankInlineFilled]}>
                  <TextInput
                    style={styles.blankInputInline}
                    value={arr[i]}
                    onChangeText={t => onChange(t, i)}
                    placeholder={`第${i+1}空`}
                    placeholderTextColor={theme.colors.textMuted}
                    autoCapitalize="none"
                    autoCorrect={false}
                    multiline={false}
                  />
                </View>
              )}
            </React.Fragment>
          ))}
        </View>
        {problem.codeTemplate.includes('输入样例') || problem.codeTemplate.includes('输出样例') ? null : null}
      </View>
    );
  }

  // 代码编写：多行代码输入框
  return (
    <View>
      <TextInput
        style={[styles.input, styles.codeEditor]}
        value={arr[0]}
        onChangeText={t => onChange(t, 0)}
        placeholder="// 在这里编写完整代码..."
        placeholderTextColor={theme.colors.textMuted}
        multiline
        numberOfLines={20}
        textAlignVertical="top"
        autoCapitalize="none"
        autoCorrect={false}
        spellCheck={false}
      />
    </View>
  );
};

export default function ProblemScreen({ navigation, route }) {
  const { language, problemId, unitId } = route.params;
  const color = langColor(language);
  const unit = unitId ? findUnitById(language, unitId) : null;
  const problems = unit?.problems || [findProblemById(language, problemId)].filter(Boolean);
  const currentIdx = problems.findIndex(p => p.id === problemId);
  const problem = problems[currentIdx];
  const {
    recordProblem,
    isProblemCorrect,
    recordHintUsage,
    addStudyTime,
    tryUnlockNextUnit,
  } = useProgress();

  // 用户作答状态
  const [choice, setChoice] = useState(null);
  const [fills, setFills] = useState([]);
  const [codes, setCodes] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [hintRevealed, setHintRevealed] = useState(0);

  useEffect(() => {
    // 每次切题重置状态
    setChoice(null);
    setFills([]);
    setCodes(problem?.type === ProblemType.CODE_WRITE ? [problem.codeTemplate || ''] : []);
    setSubmitted(isProblemCorrect(problemId));
    setIsCorrect(isProblemCorrect(problemId));
    setHintRevealed(0);
    addStudyTime(0); // 占位：启动计时器
  }, [problemId]);

  // 1分钟学习时间
  useEffect(() => {
    const t = setTimeout(() => addStudyTime(1), 60000);
    return () => clearTimeout(t);
  }, [problemId]);

  if (!problem) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.bg }}>
        <Text style={{ padding: 32 }}>题目不存在</Text>
      </SafeAreaView>
    );
  }

  /** 标准化答案为小写字符串列表 */
  const normalize = (str) => String(str).toLowerCase().trim().replace(/\s+/g, '');
  const splitAnswers = (s) => String(s).split(/[,，]/).map(x => normalize(x)).filter(Boolean);

  /** 检查是否正确 */
  const check = () => {
    let userAnswers = [];
    if (problem.type === ProblemType.MULTIPLE_CHOICE) userAnswers = [choice];
    if (problem.type === ProblemType.FILL_BLANK) userAnswers = fills;
    if (problem.type === ProblemType.CODE_COMPLETE) userAnswers = codes;
    if (problem.type === ProblemType.CODE_WRITE) {
      // 代码题：根据若干关键词匹配（简化版，实际应编译运行）
      const c0 = normalize(codes[0] || '');
      const rightAnsw = normalize(problem.answer);
      // 关键结构都匹配就判对
      const keywords = rightAnsw.match(/[a-zA-Z_]+|[{}();:,#]|#include|import|\.[a-z]+/g) || [];
      const unique = [...new Set(keywords.filter(k => k.length > 1))].slice(0, 10);
      const matched = unique.filter(k => c0.includes(k)).length;
      const ok = matched >= Math.max(unique.length - 2, 1);
      return ok;
    }
    const correct = splitAnswers(problem.answer);
    if (correct.length !== userAnswers.length) return false;
    return correct.every((expected, i) => {
      const got = normalize(userAnswers[i] || '');
      return got === expected;
    });
  };

  const submit = () => {
    // 基础验证
    if (problem.type === ProblemType.MULTIPLE_CHOICE && !choice) {
      Alert.alert('请选择一个选项');
      return;
    }
    if (problem.type === ProblemType.FILL_BLANK) {
      const blanks = splitAnswers(problem.answer).length;
      if (fills.length < blanks || fills.some(f => !(f || '').trim())) {
        Alert.alert('请填写所有空');
        return;
      }
    }
    if (problem.type === ProblemType.CODE_COMPLETE) {
      const blanks = problem.codeTemplate.split(/____+/g).length - 1;
      if (codes.length < blanks || codes.some(c => !(c || '').trim())) {
        Alert.alert('请补全所有空');
        return;
      }
    }
    if (problem.type === ProblemType.CODE_WRITE && !(codes[0] || '').trim()) {
      Alert.alert('请编写代码');
      return;
    }
    const ok = check();
    setIsCorrect(ok);
    setSubmitted(true);
    recordProblem(problem.id, ok);
    if (ok && unitId) {
      setTimeout(() => tryUnlockNextUnit(language, unitId), 100);
    }
  };

  const nextProblem = () => {
    if (currentIdx < problems.length - 1) {
      navigation.replace('Problem', { language, problemId: problems[currentIdx + 1].id, unitId });
    } else {
      navigation.goBack();
    }
  };
  const prevProblem = () => {
    if (currentIdx > 0) {
      navigation.replace('Problem', { language, problemId: problems[currentIdx - 1].id, unitId });
    }
  };

  const revealHint = () => {
    if (hintRevealed < problem.hints.length) {
      setHintRevealed(hintRevealed + 1);
      recordHintUsage(problem.id);
    }
  };

  // 关联知识点
  const relatedKps = problem.knowledgePointIds
    .map(id => findKnowledgePointById(language, id))
    .filter(Boolean);

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: color }]} edges={['top']}>
      <Header
        navigation={navigation}
        color={color}
        problemTitle={problem.title}
        idx={currentIdx + 1}
        total={problems.length}
        prevDisabled={currentIdx === 0}
        nextDisabled={currentIdx === problems.length - 1}
        goPrev={prevProblem}
        goNext={nextProblem}
      />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView style={styles.scroll} contentContainerStyle={{ paddingBottom: 140 }}>
          {/* 问题主体 */}
          <View style={{ padding: theme.spacing.lg }}>
            {/* 标签 */}
            <View style={styles.tagRow}>
              <DifficultyBadge difficulty={problem.difficulty} />
              <Badge
                label={{
                  multiple_choice: '选择题',
                  fill_blank: '填空题',
                  code_complete: '代码补全',
                  code_write: '代码编写',
                }[problem.type]}
                color={color}
              />
              {isProblemCorrect(problem.id) && (
                <Badge label="已掌握 ✓" color={theme.colors.success} />
              )}
            </View>

            {/* 题目描述 */}
            <Card style={styles.questionCard}>
              <Text style={styles.questionTitle}>📝 题目描述</Text>
              <Text style={styles.questionText}>{problem.description}</Text>
            </Card>

            {/* 答题区域 */}
            <View style={{ marginTop: theme.spacing.lg }}>
              {problem.type === ProblemType.MULTIPLE_CHOICE && (
                <ChoiceQuestion problem={problem} selected={choice} setSelected={setChoice} />
              )}
              {problem.type === ProblemType.FILL_BLANK && (
                <FillBlanksQuestion problem={problem} answers={fills} setAnswers={setFills} />
              )}
              {(problem.type === ProblemType.CODE_COMPLETE || problem.type === ProblemType.CODE_WRITE) && (
                <CodeQuestion problem={problem} code={codes} setCode={setCodes} />
              )}
            </View>

            {/* 提示系统 */}
            {!submitted && (
              <View style={{ marginTop: theme.spacing.lg }}>
                {problem.hints.length > 0 && (
                  <>
                    <TouchableOpacity style={styles.hintBtn} onPress={revealHint}>
                      <Text style={[styles.hintBtnText, { color }]}>
                        💡 查看提示 ({hintRevealed}/{problem.hints.length})
                      </Text>
                    </TouchableOpacity>
                    {Array(hintRevealed).fill(0).map((_, i) => (
                      <View key={i} style={[styles.hintItem, { borderLeftColor: color }]}>
                        <Text style={styles.hintIdx}>提示 {i + 1}</Text>
                        <Text style={styles.hintText}>{problem.hints[i]}</Text>
                      </View>
                    ))}
                  </>
                )}
              </View>
            )}

            {/* 结果 + 解析 */}
            {submitted && (
              <View style={{ marginTop: theme.spacing.lg }}>
                <Card style={[
                  styles.resultCard,
                  { borderLeftColor: isCorrect ? theme.colors.success : theme.colors.danger, },
                ]}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ fontSize: 32, marginRight: theme.spacing.sm }}>
                      {isCorrect ? '🎉' : '😢'}
                    </Text>
                    <View style={{ flex: 1 }}>
                      <Text style={[styles.resultTitle, { color: isCorrect ? theme.colors.success : theme.colors.danger }]}>
                        {isCorrect ? '回答正确！太棒了' : '回答错误，再接再厉'}
                      </Text>
                      <Text style={styles.resultSub}>
                        {isCorrect
                          ? '这道题的知识点你已经掌握'
                          : '查看下方解析，学习正确思路后可以再来一次'}
                      </Text>
                    </View>
                  </View>
                </Card>

                {/* 参考答案 */}
                <View style={{ marginTop: theme.spacing.lg }}>
                  <Text style={[styles.subTitle, { borderLeftColor: theme.colors.primary }]}>
                    ✅ 参考答案
                  </Text>
                  {problem.type === ProblemType.CODE_WRITE ? (
                    <CodeBlock code={problem.answer} language={language} />
                  ) : (
                    <Card style={styles.answerCard}>
                      <Text style={styles.answerText}>
                        {problem.answer}
                      </Text>
                    </Card>
                  )}
                </View>

                {/* 答案解析 */}
                {problem.explanation ? (
                  <View style={{ marginTop: theme.spacing.lg }}>
                    <Text style={[styles.subTitle, { borderLeftColor: theme.colors.purple }]}>
                      📖 答案解析
                    </Text>
                    <Card style={styles.explainCard}>
                      <Text style={styles.explainText}>{problem.explanation}</Text>
                    </Card>
                  </View>
                ) : null}

                {/* 关联知识点跳转 */}
                {relatedKps.length > 0 && (
                  <View style={{ marginTop: theme.spacing.lg }}>
                    <Text style={[styles.subTitle, { borderLeftColor: color }]}>
                      🎯 没看懂？去学对应的知识点
                    </Text>
                    {relatedKps.map(kp => (
                      <Card
                        key={kp.id}
                        style={styles.kpJumpCard}
                        onPress={() => navigation.navigate('Knowledge', {
                          language, kpId: kp.id, unitTitle: unit?.title || '知识点',
                        })}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                          <View style={[styles.kpJumpDot, { backgroundColor: color }]}>
                            <Text style={{ color: theme.colors.white, fontWeight: '700' }}>📖</Text>
                          </View>
                          <View style={{ flex: 1, marginLeft: theme.spacing.md }}>
                            <Text style={styles.kpJumpTitle}>{kp.title}</Text>
                            <Text style={styles.kpJumpDesc} numberOfLines={1}>
                              {kp.content.replace(/[#*`\n]/g, ' ').slice(0, 50)}...
                            </Text>
                          </View>
                          <Text style={{ color, fontSize: 24 }}>›</Text>
                        </View>
                      </Card>
                    ))}
                  </View>
                )}
              </View>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* 底部提交/下一题按钮 */}
      <View style={styles.footer}>
        {!submitted ? (
          <Button
            title="提交答案"
            size="lg"
            onPress={submit}
          />
        ) : (
          <View style={{ flexDirection: 'row' }}>
            {!isCorrect && (
              <View style={{ flex: 1, marginRight: theme.spacing.sm }}>
                <Button
                  title="再试一次"
                  variant="outline"
                  size="lg"
                  onPress={() => {
                    setSubmitted(false);
                    setIsCorrect(false);
                    setChoice(null);
                    setFills([]);
                    setCodes(problem.type === ProblemType.CODE_WRITE ? [problem.codeTemplate || ''] : []);
                  }}
                />
              </View>
            )}
            <View style={{ flex: 1, marginLeft: !isCorrect ? theme.spacing.sm : 0 }}>
              <Button
                title={currentIdx < problems.length - 1 ? '下一题 →' : (isCorrect ? '完成 ✓' : '返回')}
                size="lg"
                variant={isCorrect ? 'primary' : 'secondary'}
                onPress={nextProblem}
              />
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  header: {
    padding: theme.spacing.lg,
    paddingTop: 0,
  },
  iconBtn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  whiteIcon: {
    fontSize: 24,
    color: theme.colors.white,
    fontWeight: '700',
  },
  headerSub: {
    fontSize: theme.fontSize.xs,
    color: 'rgba(255,255,255,0.8)',
  },
  headerTitle: {
    fontSize: theme.fontSize.lg,
    fontWeight: '700',
    color: theme.colors.white,
    marginTop: 2,
    maxWidth: '95%',
  },
  scroll: {
    flex: 1,
    backgroundColor: theme.colors.bg,
    borderTopLeftRadius: theme.radius.xl,
    borderTopRightRadius: theme.radius.xl,
    marginTop: -theme.radius.lg,
  },
  tagRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginBottom: theme.spacing.md,
  },
  questionCard: {
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.white,
    borderRadius: theme.radius.lg,
    ...theme.shadow.sm,
  },
  questionTitle: {
    fontSize: theme.fontSize.md,
    fontWeight: '700',
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
  },
  questionText: {
    fontSize: theme.fontSize.md,
    lineHeight: 26,
    color: theme.colors.text,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.md,
    backgroundColor: theme.colors.white,
    borderRadius: theme.radius.md,
    borderWidth: 1.5,
    borderColor: theme.colors.border,
    marginBottom: theme.spacing.sm,
  },
  optionCardSelected: {
    borderColor: theme.colors.primary,
    backgroundColor: theme.colors.primary + '0A',
  },
  optionCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: theme.colors.border,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.md,
  },
  optionCircleSelected: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  optionLetter: {
    fontWeight: '700',
    color: theme.colors.textLight,
    fontSize: theme.fontSize.sm,
  },
  optionText: {
    fontSize: theme.fontSize.md,
    color: theme.colors.text,
    flex: 1,
  },
  fillHint: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textLight,
    marginBottom: theme.spacing.sm,
  },
  fillRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  fillLabel: {
    width: 60,
    fontSize: theme.fontSize.sm,
    color: theme.colors.textLight,
  },
  input: {
    flex: 1,
    backgroundColor: theme.colors.white,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.md,
    padding: theme.spacing.md,
    fontSize: theme.fontSize.md,
    color: theme.colors.text,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
  },
  codeTemplateWrap: {
    backgroundColor: '#0f172a',
    borderRadius: theme.radius.md,
    padding: theme.spacing.md,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  codeTemplateText: {
    color: '#e2e8f0',
    fontSize: theme.fontSize.sm,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    lineHeight: 28,
  },
  blankInline: {
    minWidth: 80,
    minHeight: 28,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: theme.colors.primaryLight,
    backgroundColor: '#1e293b',
    borderRadius: 6,
    paddingHorizontal: 8,
    marginHorizontal: 2,
    marginVertical: 2,
  },
  blankInlineFilled: {
    borderStyle: 'solid',
    backgroundColor: theme.colors.primary + '33',
    borderColor: theme.colors.primary,
  },
  blankInputInline: {
    color: theme.colors.white,
    fontSize: theme.fontSize.sm,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    minHeight: 26,
    padding: 0,
  },
  codeEditor: {
    minHeight: 320,
    lineHeight: 24,
    padding: theme.spacing.md,
  },
  hintBtn: {
    padding: theme.spacing.md,
    backgroundColor: theme.colors.primary + '11',
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.primary + '33',
    borderStyle: 'dashed',
    alignItems: 'center',
  },
  hintBtnText: {
    fontWeight: '600',
    fontSize: theme.fontSize.md,
  },
  hintItem: {
    backgroundColor: theme.colors.warning + '11',
    borderLeftWidth: 4,
    padding: theme.spacing.md,
    borderRadius: theme.radius.sm,
    marginTop: theme.spacing.sm,
  },
  hintIdx: {
    fontWeight: '700',
    color: theme.colors.warning,
    fontSize: theme.fontSize.xs,
    marginBottom: 4,
  },
  hintText: {
    fontSize: theme.fontSize.md,
    color: theme.colors.text,
    lineHeight: 24,
  },
  resultCard: {
    borderLeftWidth: 4,
    padding: theme.spacing.lg,
  },
  resultTitle: {
    fontSize: theme.fontSize.lg,
    fontWeight: '700',
  },
  resultSub: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textLight,
    marginTop: 4,
  },
  subTitle: {
    fontSize: theme.fontSize.md,
    fontWeight: '700',
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
    paddingLeft: theme.spacing.sm,
    borderLeftWidth: 4,
  },
  answerCard: {
    padding: theme.spacing.md,
    backgroundColor: theme.colors.success + '11',
    borderWidth: 1,
    borderColor: theme.colors.success + '33',
  },
  answerText: {
    fontSize: theme.fontSize.md,
    color: theme.colors.text,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    lineHeight: 26,
  },
  explainCard: {
    padding: theme.spacing.md,
    backgroundColor: theme.colors.purple + '11',
    borderWidth: 1,
    borderColor: theme.colors.purple + '33',
  },
  explainText: {
    fontSize: theme.fontSize.md,
    color: theme.colors.text,
    lineHeight: 26,
  },
  kpJumpCard: {
    padding: theme.spacing.md,
    marginBottom: theme.spacing.sm,
  },
  kpJumpDot: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  kpJumpTitle: {
    fontSize: theme.fontSize.md,
    fontWeight: '600',
    color: theme.colors.text,
  },
  kpJumpDesc: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.textLight,
    marginTop: 4,
  },
  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.white,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: theme.colors.border,
  },
});
