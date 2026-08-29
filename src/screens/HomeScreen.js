// 首页：语言选择 + 学习概览
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '../theme';
import { LanguageInfo } from '../types';
import { Card, ProgressBar, SectionTitle, Badge } from '../components/UI';
import { useProgress } from '../context/ProgressContext';

const languages = [
  { key: 'cpp', ...LanguageInfo.cpp },
  { key: 'java', ...LanguageInfo.java },
  { key: 'python', ...LanguageInfo.python },
];

export default function HomeScreen({ navigation }) {
  const { progress, getLanguageProgress, ready } = useProgress();

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView contentContainerStyle={{ paddingBottom: theme.spacing.xxl }}>
        {/* 顶部欢迎区 */}
        <View style={styles.hero}>
          <Text style={styles.heroTitle}>CodeMaster 代码大师</Text>
          <Text style={styles.heroSubtitle}>
            一题一知识点，循序渐进学习 C++ / Java / Python
          </Text>
          <View style={styles.heroStats}>
            <View style={styles.stat}>
              <Text style={styles.statNum}>{progress.totalStudyTime}</Text>
              <Text style={styles.statLabel}>分钟学习</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statNum}>{Object.keys(progress.completedProblems).length}</Text>
              <Text style={styles.statLabel}>道题完成</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statNum}>{progress.streak}</Text>
              <Text style={styles.statLabel}>连续天数</Text>
            </View>
          </View>
        </View>

        <SectionTitle
          title="选择学习语言"
          subtitle="每种语言有独立的教学体系，从入门到项目实战"
        />

        {/* 语言卡片 */}
        <View style={{ paddingHorizontal: theme.spacing.lg }}>
          {languages.map(lang => {
            const p = getLanguageProgress(lang.key);
            return (
              <TouchableOpacity
                key={lang.key}
                style={[styles.langCard, theme.shadow.md]}
                onPress={() => navigation.navigate('Course', { language: lang.key })}
                activeOpacity={0.8}>
                <View style={[styles.langIcon, { backgroundColor: lang.color }]}>
                  <Text style={styles.langIconText}>{lang.icon}</Text>
                </View>
                <View style={styles.langInfo}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={styles.langName}>{lang.name}</Text>
                    {p > 0 && <Badge label={`${p}%`} color={lang.color} style={{ marginLeft: 8 }} />}
                  </View>
                  <Text style={styles.langDesc} numberOfLines={2}>{lang.description}</Text>
                  {p > 0 ? (
                    <ProgressBar percent={p} color={lang.color} style={{ marginTop: 10 }} />
                  ) : (
                    <Text style={styles.langCompiler}>{lang.compiler}</Text>
                  )}
                </View>
                <Text style={[styles.langArrow, { color: lang.color }]}>›</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* 错题本入口 */}
        <SectionTitle
          title="学习工具"
          subtitle="错题本巩固薄弱知识"
        />
        <View style={{ paddingHorizontal: theme.spacing.lg, flexDirection: 'row' }}>
          <Card
            style={[styles.toolCard, { flex: 1, marginRight: theme.spacing.sm }]}
            onPress={() => navigation.navigate('WrongBook')}>
            <Text style={{ fontSize: 32, marginBottom: 6 }}>📘</Text>
            <Text style={styles.toolTitle}>错题本</Text>
            <Text style={styles.toolDesc}>{progress.wrongProblems.length} 道待巩固</Text>
          </Card>
          <Card
            style={[styles.toolCard, { flex: 1, marginLeft: theme.spacing.sm }]}
            onPress={() => navigation.navigate('CompilerGuide')}>
            <Text style={{ fontSize: 32, marginBottom: 6 }}>🛠️</Text>
            <Text style={styles.toolTitle}>编译器推荐</Text>
            <Text style={styles.toolDesc}>搭配App使用写代码</Text>
          </Card>
        </View>

        {/* 学习方法说明 */}
        <SectionTitle title="科学的学习方法" subtitle="我们的教学特色" />
        <View style={{ paddingHorizontal: theme.spacing.lg }}>
          <Card style={{ marginBottom: theme.spacing.md }}>
            <View style={styles.methodRow}>
              <Text style={styles.methodIcon}>🎯</Text>
              <View style={{ flex: 1, marginLeft: theme.spacing.md }}>
                <Text style={styles.methodTitle}>题目驱动学习</Text>
                <Text style={styles.methodDesc}>
                  先做题 → 遇到困难再去学知识点 → 学完解决题目，形成闭环
                </Text>
              </View>
            </View>
          </Card>
          <Card style={{ marginBottom: theme.spacing.md }}>
            <View style={styles.methodRow}>
              <Text style={styles.methodIcon}>📐</Text>
              <View style={{ flex: 1, marginLeft: theme.spacing.md }}>
                <Text style={styles.methodTitle}>分级渐进体系</Text>
                <Text style={styles.methodDesc}>
                  入门→基础→进阶→高级→项目实战，每个单元环环相扣
                </Text>
              </View>
            </View>
          </Card>
          <Card style={{ marginBottom: theme.spacing.md }}>
            <View style={styles.methodRow}>
              <Text style={styles.methodIcon}>💡</Text>
              <View style={{ flex: 1, marginLeft: theme.spacing.md }}>
                <Text style={styles.methodTitle}>提示递进系统</Text>
                <Text style={styles.methodDesc}>
                  卡住时看提示，一步一步引导你找到答案，而不是直接给答案
                </Text>
              </View>
            </View>
          </Card>
          <Card>
            <View style={styles.methodRow}>
              <Text style={styles.methodIcon}>🚀</Text>
              <View style={{ flex: 1, marginLeft: theme.spacing.md }}>
                <Text style={styles.methodTitle}>项目实战结业</Text>
                <Text style={styles.methodDesc}>
                  每门语言3个大型项目：从需求→架构→编码→测试，真正学会独立做项目
                </Text>
              </View>
            </View>
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: theme.colors.bg,
  },
  hero: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.xl,
    backgroundColor: theme.colors.primary,
  },
  heroTitle: {
    fontSize: theme.fontSize['2xl'],
    fontWeight: '800',
    color: theme.colors.white,
    marginBottom: theme.spacing.xs,
  },
  heroSubtitle: {
    fontSize: theme.fontSize.md,
    color: 'rgba(255,255,255,0.85)',
    lineHeight: 22,
    marginBottom: theme.spacing.lg,
  },
  heroStats: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: theme.radius.md,
    padding: theme.spacing.md,
  },
  stat: {
    flex: 1,
    alignItems: 'center',
  },
  statNum: {
    fontSize: theme.fontSize.xl,
    fontWeight: '800',
    color: theme.colors.white,
  },
  statLabel: {
    fontSize: theme.fontSize.xs,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 2,
  },
  langCard: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
  },
  langIcon: {
    width: 56,
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  langIconText: {
    fontSize: 28,
  },
  langInfo: {
    flex: 1,
    marginLeft: theme.spacing.lg,
  },
  langName: {
    fontSize: theme.fontSize.xl,
    fontWeight: '700',
    color: theme.colors.text,
  },
  langDesc: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textLight,
    lineHeight: 20,
    marginTop: 2,
  },
  langCompiler: {
    marginTop: 8,
    fontSize: theme.fontSize.xs,
    color: theme.colors.textMuted,
    fontStyle: 'italic',
  },
  langArrow: {
    fontSize: 32,
    fontWeight: '700',
    marginLeft: theme.spacing.sm,
  },
  toolCard: {
    alignItems: 'center',
    paddingVertical: theme.spacing.lg,
  },
  toolTitle: {
    fontWeight: '700',
    color: theme.colors.text,
    fontSize: theme.fontSize.md,
    marginBottom: 2,
  },
  toolDesc: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.textLight,
  },
  methodRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  methodIcon: {
    fontSize: 32,
    marginTop: 2,
  },
  methodTitle: {
    fontSize: theme.fontSize.md,
    fontWeight: '700',
    color: theme.colors.text,
    marginBottom: 4,
  },
  methodDesc: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textLight,
    lineHeight: 20,
  },
});
