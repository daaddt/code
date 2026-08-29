// 错题本页面
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '../theme';
import { Card, EmptyState, Button, DifficultyBadge, Badge } from '../components/UI';
import { useProgress } from '../context/ProgressContext';
import { Languages, LanguageInfo, ProblemType, DifficultyLabels } from '../types';
import { findProblemById, findUnitById } from '../data';

const PROB_TYPE_LABEL = {
  multiple_choice: '选择题', fill_blank: '填空题',
  code_complete: '代码补全', code_write: '代码编写',
};

const findProblemCrossLang = (problemId) => {
  for (const lang of [Languages.CPP, Languages.JAVA, Languages.PYTHON]) {
    const p = findProblemById(lang, problemId);
    if (p) return { language: lang, problem: p };
  }
  return null;
};

const findUnitForProblem = (lang, problemId) => {
  // 简化：跨单元查找不现实，这里只展示语言
  return LanguageInfo[lang].name;
};

export default function WrongBookScreen({ navigation }) {
  const { progress, removeFromWrongBook, isProblemCorrect } = useProgress();
  const items = progress.wrongProblems;

  const problems = items.map(id => {
    const found = findProblemCrossLang(id);
    return found ? { ...found, id, solved: isProblemCorrect(id) } : null;
  }).filter(Boolean);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      {/* 顶部 */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconBtn}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>📘 错题本</Text>
          <Text style={styles.subTitle}>
            共 {problems.length} 道错题，消灭它们才能真正掌握
          </Text>
        </View>
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={{ paddingBottom: 40 }}>
        {problems.length === 0 ? (
          <EmptyState
            icon="🎉"
            title="太棒了！没有错题"
            description="继续保持，每次做题后检查一下这里，确保不会的题都学会了"
          />
        ) : (
          <>
            <View style={{ padding: theme.spacing.lg }}>
              {/* 统计 */}
              <View style={styles.statsBar}>
                <Card style={[styles.statCard, { marginRight: theme.spacing.sm }]}>
                  <Text style={styles.statNum}>{problems.filter(p => !p.solved).length}</Text>
                  <Text style={styles.statLabel}>待掌握</Text>
                </Card>
                <Card style={styles.statCard}>
                  <Text style={styles.statNum}>{problems.filter(p => p.solved).length}</Text>
                  <Text style={styles.statLabel}>已重做做对</Text>
                </Card>
              </View>

              <Text style={styles.sectionHint}>
                💡 建议：每天回顾 5~10 道错题，点击进入重做。
                做对后会自动标记为已掌握，可以从错题本移除。
              </Text>
            </View>

            {problems.map(({ id, language, problem, solved }) => (
              <Card
                key={id}
                style={[
                  styles.itemCard,
                  solved && styles.itemCardSolved,
                ]}
                onPress={() => {
                  // 找对应的unitId（简化处理：不传unitId，题目页按单题模式）
                  navigation.navigate('Problem', { language, problemId: problem.id });
                }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View style={[
                    styles.langIcon,
                    { backgroundColor: LanguageInfo[language].color },
                  ]}>
                    <Text style={{ fontSize: 18 }}>{LanguageInfo[language].icon}</Text>
                  </View>
                  <View style={{ flex: 1, marginLeft: theme.spacing.md }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4, flexWrap: 'wrap' }}>
                      <Badge label={LanguageInfo[language].name} color={LanguageInfo[language].color} />
                      <DifficultyBadge difficulty={problem.difficulty} />
                      <Badge label={PROB_TYPE_LABEL[problem.type]} color={theme.colors.textLight} />
                      {solved && <Badge label="已掌握 ✓" color={theme.colors.success} />}
                    </View>
                    <Text style={styles.itemTitle} numberOfLines={2}>{problem.title}</Text>
                    <Text style={styles.itemDesc} numberOfLines={1}>
                      {problem.description.replace(/\s+/g, ' ').slice(0, 60)}...
                    </Text>
                  </View>
                  {solved ? (
                    <TouchableOpacity
                      onPress={(e) => {
                        e.stopPropagation();
                        removeFromWrongBook(id);
                      }}
                      style={styles.removeBtn}>
                      <Text style={styles.removeText}>清除</Text>
                    </TouchableOpacity>
                  ) : (
                    <Text style={{ color: theme.colors.danger, fontSize: 24 }}>›</Text>
                  )}
                </View>
              </Card>
            ))}

            <View style={{ padding: theme.spacing.lg }}>
              <Button
                title="返回首页"
                variant="outline"
                size="lg"
                onPress={() => navigation.navigate('Home')}
              />
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: theme.colors.danger },
  header: {
    backgroundColor: theme.colors.danger,
    padding: theme.spacing.lg,
    paddingTop: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBtn: {
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
  title: {
    fontSize: theme.fontSize.lg,
    fontWeight: '700',
    color: theme.colors.white,
  },
  subTitle: {
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
  statsBar: {
    flexDirection: 'row',
    marginBottom: theme.spacing.md,
  },
  statCard: {
    flex: 1,
    padding: theme.spacing.md,
    alignItems: 'center',
  },
  statNum: {
    fontSize: theme.fontSize['2xl'],
    fontWeight: '800',
    color: theme.colors.danger,
  },
  statLabel: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.textLight,
    marginTop: 4,
  },
  sectionHint: {
    backgroundColor: theme.colors.warning + '11',
    borderLeftWidth: 4,
    borderLeftColor: theme.colors.warning,
    padding: theme.spacing.md,
    borderRadius: theme.radius.sm,
    color: theme.colors.text,
    fontSize: theme.fontSize.sm,
    lineHeight: 22,
  },
  itemCard: {
    marginHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.sm,
    padding: theme.spacing.md,
  },
  itemCardSolved: {
    backgroundColor: theme.colors.success + '08',
    opacity: 0.85,
  },
  langIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemTitle: {
    fontSize: theme.fontSize.md,
    fontWeight: '600',
    color: theme.colors.text,
  },
  itemDesc: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textLight,
    marginTop: 4,
  },
  removeBtn: {
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 6,
    borderRadius: theme.radius.sm,
    backgroundColor: theme.colors.border,
  },
  removeText: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.textLight,
    fontWeight: '600',
  },
});
