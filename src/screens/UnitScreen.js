// 单元详情页：知识点 + 题目列表
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme, langColor } from '../theme';
import { Card, DifficultyBadge, Button, SectionTitle, Divider, EmptyState } from '../components/UI';
import { findUnitById } from '../data';
import { useProgress } from '../context/ProgressContext';
import { ProblemType } from '../types';

const PROBLEM_TYPE_LABEL = {
  multiple_choice: '选择题',
  fill_blank: '填空题',
  code_complete: '代码补全',
  code_write: '代码编写',
};

const PROBLEM_TYPE_ICON = {
  multiple_choice: '🔘',
  fill_blank: '✏️',
  code_complete: '🧩',
  code_write: '💻',
};

export default function UnitScreen({ navigation, route }) {
  const { language, unitId } = route.params;
  const unit = findUnitById(language, unitId);
  const color = langColor(language);
  const { isProblemCorrect, recordProblem, tryUnlockNextUnit, markUnitCompleted } = useProgress();

  if (!unit) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.bg }}>
        <EmptyState icon="❌" title="单元不存在" />
      </SafeAreaView>
    );
  }

  const allCorrect = unit.problems.every(p => isProblemCorrect(p.id));
  const solvedCount = unit.problems.filter(p => isProblemCorrect(p.id)).length;

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: color }]} edges={['top']}>
      <View style={[styles.topBar, { backgroundColor: color }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <Text style={styles.topTitle}>{unit.title}</Text>
          <Text style={styles.topProgress}>
            {solvedCount} / {unit.problems.length} 题完成
            {allCorrect && '  🎉 全部完成！'}
          </Text>
        </View>
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={{ paddingBottom: 120 }}>
        <View style={styles.headerCard}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: theme.spacing.sm }}>
            <DifficultyBadge difficulty={unit.difficulty} />
            <Text style={[styles.chapterNum, { color }]}>第 {unit.order} 单元</Text>
          </View>
          <Text style={styles.descText}>{unit.description}</Text>
          <View style={[styles.hintBox, { borderLeftColor: color }]}>
            <Text style={styles.hintText}>
              💡 学习建议：先尝试做题，如果题目做不出来，点对应的"知识点讲解"学习，再回来解题。
              学完所有内容后完成全部题目，自动解锁下一单元！
            </Text>
          </View>
        </View>

        {/* 知识点部分 */}
        <SectionTitle title="📖 知识点讲解" subtitle={`共 ${unit.knowledgePoints.length} 个知识点`} style={{ marginTop: 4 }} />
        <View style={{ paddingHorizontal: theme.spacing.lg }}>
          {unit.knowledgePoints.map((kp, idx) => (
            <Card
              key={kp.id}
              style={styles.kpCard}
              onPress={() => navigation.navigate('Knowledge', { language, kpId: kp.id, unitTitle: unit.title })}>
              <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                <View style={[styles.kpIndex, { backgroundColor: color + '22' }]}>
                  <Text style={[styles.kpIndexText, { color }]}>{idx + 1}</Text>
                </View>
                <View style={{ flex: 1, marginLeft: theme.spacing.md }}>
                  <Text style={styles.kpTitle}>{kp.title}</Text>
                  <Text style={styles.kpDesc} numberOfLines={2}>
                    {kp.content.replace(/[#*`\n]/g, ' ').slice(0, 80)}...
                  </Text>
                </View>
                <Text style={{ color: color, fontSize: 24, marginTop: 4 }}>›</Text>
              </View>
            </Card>
          ))}
        </View>

        {/* 题目部分 */}
        <Divider style={{ marginHorizontal: theme.spacing.lg, marginTop: theme.spacing.md }} />
        <SectionTitle title="🎯 单元练习题" subtitle={`${solvedCount} 题已掌握`} />
        <View style={{ paddingHorizontal: theme.spacing.lg }}>
          {unit.problems.map((p, idx) => {
            const done = isProblemCorrect(p.id);
            return (
              <Card
                key={p.id}
                style={[styles.problemCard, done && { borderLeftWidth: 3, borderLeftColor: theme.colors.success }]}
                onPress={() => navigation.navigate('Problem', { language, problemId: p.id, unitId })}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View style={[styles.problemNum, { backgroundColor: done ? theme.colors.success : color }]}>
                    <Text style={styles.problemNumText}>{done ? '✓' : idx + 1}</Text>
                  </View>
                  <View style={{ flex: 1, marginLeft: theme.spacing.md }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
                      <Text style={styles.problemTypeIcon}>{PROBLEM_TYPE_ICON[p.type]}</Text>
                      <Text style={styles.problemTypeText}>{PROBLEM_TYPE_LABEL[p.type]}</Text>
                      <DifficultyBadge difficulty={p.difficulty} />
                    </View>
                    <Text style={styles.problemTitle} numberOfLines={2}>{p.title}</Text>
                  </View>
                  <Text style={{ color: color, fontSize: 24 }}>›</Text>
                </View>
              </Card>
            );
          })}
        </View>
      </ScrollView>

      {/* 底部按钮 */}
      <View style={styles.footer}>
        {allCorrect ? (
          <Button
            title="🎉 全部完成，返回路径"
            size="lg"
            onPress={() => {
              markUnitCompleted(language, unitId);
              tryUnlockNextUnit(language, unitId);
              navigation.goBack();
            }}
          />
        ) : (
          <Button
            title={`开始下一题 (${solvedCount}/${unit.problems.length})`}
            size="lg"
            onPress={() => {
              const nextUnsolved = unit.problems.find(p => !isProblemCorrect(p.id));
              if (nextUnsolved) {
                navigation.navigate('Problem', { language, problemId: nextUnsolved.id, unitId });
              }
            }}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  topBar: {
    padding: theme.spacing.lg,
    paddingTop: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backBtn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    marginRight: theme.spacing.sm,
  },
  backIcon: {
    fontSize: 24,
    color: theme.colors.white,
    fontWeight: '700',
  },
  topTitle: {
    fontSize: theme.fontSize.lg,
    fontWeight: '700',
    color: theme.colors.white,
  },
  topProgress: {
    fontSize: theme.fontSize.sm,
    color: 'rgba(255,255,255,0.85)',
    marginTop: 2,
  },
  scroll: {
    flex: 1,
    backgroundColor: theme.colors.bg,
    borderTopLeftRadius: theme.radius.xl,
    borderTopRightRadius: theme.radius.xl,
    marginTop: -theme.radius.lg,
  },
  headerCard: {
    margin: theme.spacing.lg,
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.white,
    borderRadius: theme.radius.lg,
    ...theme.shadow.sm,
  },
  chapterNum: {
    fontSize: theme.fontSize.sm,
    fontWeight: '600',
    marginLeft: theme.spacing.sm,
  },
  descText: {
    fontSize: theme.fontSize.md,
    color: theme.colors.text,
    lineHeight: 24,
    marginBottom: theme.spacing.md,
  },
  hintBox: {
    backgroundColor: theme.colors.input,
    padding: theme.spacing.md,
    borderRadius: theme.radius.md,
    borderLeftWidth: 4,
  },
  hintText: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.text,
    lineHeight: 22,
  },
  kpCard: {
    marginBottom: theme.spacing.sm,
    padding: theme.spacing.md,
  },
  kpIndex: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  kpIndexText: {
    fontSize: theme.fontSize.md,
    fontWeight: '700',
  },
  kpTitle: {
    fontSize: theme.fontSize.md,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: 4,
  },
  kpDesc: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textLight,
    lineHeight: 20,
  },
  problemCard: {
    marginBottom: theme.spacing.sm,
    padding: theme.spacing.md,
  },
  problemNum: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  problemNumText: {
    color: theme.colors.white,
    fontWeight: '700',
    fontSize: theme.fontSize.md,
  },
  problemTypeIcon: {
    marginRight: 4,
  },
  problemTypeText: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.textLight,
    marginRight: 8,
  },
  problemTitle: {
    fontSize: theme.fontSize.md,
    fontWeight: '600',
    color: theme.colors.text,
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
