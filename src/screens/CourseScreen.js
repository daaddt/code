// 学习路径主页：章节列表
import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme, langColor } from '../theme';
import { LanguageInfo, DifficultyLabels, DifficultyColors } from '../types';
import { Card, ProgressBar, DifficultyBadge, StepBubble, Divider } from '../components/UI';
import { getUnits, getProjects } from '../data';
import { useProgress } from '../context/ProgressContext';

export default function CourseScreen({ navigation, route }) {
  const { language } = route.params;
  const langInfo = LanguageInfo[language];
  const color = langColor(language);
  const units = getUnits(language);
  const projects = getProjects(language);
  const {
    isUnitUnlocked,
    isUnitCompleted,
    isProblemCorrect,
    getLanguageProgress,
  } = useProgress();

  const overallProgress = getLanguageProgress(language);

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: color }]} edges={['top']}>
      {/* 顶部 Banner */}
      <View style={[styles.banner, { backgroundColor: color }]}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backBtn}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <View style={styles.langHeader}>
          <Text style={styles.langBigIcon}>{langInfo.icon}</Text>
          <View style={{ flex: 1, marginLeft: theme.spacing.lg }}>
            <Text style={styles.langHeaderName}>{langInfo.name} 学习路径</Text>
            <Text style={styles.langProgressText}>整体完成度 {overallProgress}%</Text>
            <ProgressBar
              percent={overallProgress}
              color={theme.colors.white}
              height={6}
              style={{ marginTop: 8, backgroundColor: 'rgba(255,255,255,0.25)' }}
            />
          </View>
        </View>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={{ paddingBottom: theme.spacing.xxl }}>
        <View style={{ paddingHorizontal: theme.spacing.lg, marginTop: theme.spacing.xl }}>
          <Text style={styles.sectionTitle}>📚 学习单元</Text>
          <Text style={styles.sectionSubtitle}>
            完成上一单元所有题目，自动解锁下一单元
          </Text>
        </View>

        {/* 章节时间线 */}
        {units.map((unit, idx) => {
          const unlocked = isUnitUnlocked(language, unit.id);
          const done = isUnitCompleted(language, unit.id);
          const totalProb = unit.problems.length;
          const solvedProb = unit.problems.filter(p => isProblemCorrect(p.id)).length;
          const unitProgress = totalProb ? Math.round((solvedProb / totalProb) * 100) : 0;

          let status = 'locked';
          if (done) status = 'done';
          else if (unlocked) status = solvedProb > 0 ? 'current' : 'available';

          return (
            <View key={unit.id} style={styles.unitWrapper}>
              {/* 步骤圆和连接线 */}
              <View style={styles.timelineCol}>
                <StepBubble step={unit.order} status={status} />
                {idx < units.length - 1 && (
                  <View style={[
                    styles.timelineLine,
                    { backgroundColor: done ? theme.colors.success : theme.colors.border },
                  ]} />
                )}
              </View>

              {/* 单元卡片 */}
              <Card
                style={[
                  styles.unitCard,
                  !unlocked && styles.unitLocked,
                  theme.shadow.sm,
                ]}
                onPress={() => {
                  if (unlocked) navigation.navigate('Unit', { language, unitId: unit.id });
                }}>
                <View style={styles.unitHeader}>
                  <View style={{ flex: 1 }}>
                    <Text style={[
                      styles.unitTitle,
                      !unlocked && { color: theme.colors.textMuted },
                    ]}>{unit.title}</Text>
                    <Text style={[
                      styles.unitDesc,
                      !unlocked && { color: theme.colors.textMuted },
                    ]} numberOfLines={2}>{unit.description}</Text>
                  </View>
                  {!unlocked && <Text style={{ fontSize: 22 }}>🔒</Text>}
                  {done && <Text style={{ fontSize: 22 }}>✅</Text>}
                </View>

                <View style={styles.unitMeta}>
                  <DifficultyBadge difficulty={unit.difficulty} />
                  <Text style={[styles.unitKp]}>
                    📖 {unit.knowledgePoints.length} 知识点
                  </Text>
                  <Text style={[styles.unitKp]}>
                    🎯 {solvedProb}/{totalProb} 题
                  </Text>
                </View>

                {(unlocked && !done) && (
                  <View style={{ marginTop: theme.spacing.md }}>
                    <ProgressBar percent={unitProgress} color={color} height={6} />
                    <Text style={styles.unitProgressText}>完成 {unitProgress}%</Text>
                  </View>
                )}
              </Card>
            </View>
          );
        })}

        {/* 项目实战区 */}
        <Divider style={{ marginHorizontal: theme.spacing.lg }} />
        <View style={{ paddingHorizontal: theme.spacing.lg }}>
          <Text style={styles.sectionTitle}>🚀 项目实战</Text>
          <Text style={styles.sectionSubtitle}>
            掌握全部基础后，动手做这几个完整项目，真正具备独立开发能力
          </Text>
        </View>

        {projects.map((proj) => (
          <Card
            key={proj.id}
            style={[styles.projectCard, theme.shadow.sm]}
            onPress={() => navigation.navigate('ProjectDetail', { language, projectId: proj.id })}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={[styles.projectIcon, { backgroundColor: color + '22' }]}>
                <Text style={{ fontSize: 28 }}>🎯</Text>
              </View>
              <View style={{ flex: 1, marginLeft: theme.spacing.md }}>
                <Text style={styles.projectTitle}>{proj.title.replace(/项目\d+：/, '')}</Text>
                <Text style={styles.projectDesc} numberOfLines={2}>{proj.description}</Text>
              </View>
            </View>
            <View style={styles.projectMeta}>
              <DifficultyBadge difficulty={proj.difficulty} />
              <BadgeMini label={proj.requirements.length + ' 功能需求'} />
              <BadgeMini label={proj.testCases.length + ' 测试用例'} />
            </View>
          </Card>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const BadgeMini = ({ label }) => (
  <Text style={{
    fontSize: theme.fontSize.xs,
    color: theme.colors.textLight,
    backgroundColor: theme.colors.input,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: theme.radius.pill,
  }}>{label}</Text>
);

const styles = StyleSheet.create({
  safe: { flex: 1 },
  scroll: {
    flex: 1,
    backgroundColor: theme.colors.bg,
    borderTopLeftRadius: theme.radius.xl,
    borderTopRightRadius: theme.radius.xl,
    marginTop: -theme.radius.lg,
  },
  banner: {
    padding: theme.spacing.lg,
    paddingTop: 0,
  },
  backBtn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  backIcon: {
    fontSize: 24,
    color: theme.colors.white,
    fontWeight: '700',
  },
  langHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.spacing.md,
  },
  langBigIcon: {
    fontSize: 56,
  },
  langHeaderName: {
    fontSize: theme.fontSize.xl,
    fontWeight: '700',
    color: theme.colors.white,
  },
  langProgressText: {
    fontSize: theme.fontSize.sm,
    color: 'rgba(255,255,255,0.85)',
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: theme.fontSize.lg,
    fontWeight: '700',
    color: theme.colors.text,
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textLight,
    marginBottom: theme.spacing.md,
  },
  unitWrapper: {
    flexDirection: 'row',
    paddingHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.md,
  },
  timelineCol: {
    alignItems: 'center',
    width: 36 + theme.spacing.lg,
    paddingTop: 4,
  },
  timelineLine: {
    width: 2,
    flex: 1,
    minHeight: 40,
    marginTop: theme.spacing.sm,
  },
  unitCard: {
    flex: 1,
  },
  unitLocked: {
    backgroundColor: theme.colors.bg,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  unitHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  unitTitle: {
    fontSize: theme.fontSize.md,
    fontWeight: '700',
    color: theme.colors.text,
    marginBottom: 4,
  },
  unitDesc: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textLight,
    lineHeight: 20,
  },
  unitMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: theme.spacing.md,
    flexWrap: 'wrap',
  },
  unitKp: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.textLight,
    marginLeft: 8,
  },
  unitProgressText: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.textLight,
    marginTop: 6,
  },
  projectCard: {
    marginHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.md,
  },
  projectIcon: {
    width: 52,
    height: 52,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  projectTitle: {
    fontSize: theme.fontSize.md,
    fontWeight: '700',
    color: theme.colors.text,
  },
  projectDesc: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textLight,
    marginTop: 4,
    lineHeight: 20,
  },
  projectMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: theme.spacing.md,
    flexWrap: 'wrap',
  },
});
