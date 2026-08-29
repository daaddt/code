// 项目详情页：显示项目需求、架构、测试用例、参考思路
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme, langColor } from '../theme';
import { Card, DifficultyBadge, Divider, CodeBlock, Button, EmptyState } from '../components/UI';
import { findProjectById } from '../data';

const CheckList = ({ items }) => (
  <View>
    {items.map((item, i) => (
      <View key={i} style={styles.checkItem}>
        <View style={styles.checkBox}>
          <Text style={{ color: theme.colors.primary }}>☐</Text>
        </View>
        <Text style={styles.checkText}>{item}</Text>
      </View>
    ))}
  </View>
);

const NumberList = ({ items }) => (
  <View>
    {items.map((item, i) => (
      <View key={i} style={styles.numberItem}>
        <View style={styles.numberBubble}>
          <Text style={styles.numberText}>{i + 1}</Text>
        </View>
        <Text style={styles.numberText2}>{item}</Text>
      </View>
    ))}
  </View>
);

const Section = ({ title, icon, children, style }) => (
  <View style={[{ paddingHorizontal: theme.spacing.lg, marginTop: theme.spacing.lg }, style]}>
    <Text style={styles.sectionTitle}>
      {icon} {title}
    </Text>
    <View style={{ marginTop: theme.spacing.sm }}>{children}</View>
  </View>
);

export default function ProjectDetailScreen({ navigation, route }) {
  const { language, projectId } = route.params;
  const project = findProjectById(language, projectId);
  const color = langColor(language);
  const [tab, setTab] = useState('req'); // req | tech | arch | test | ref

  if (!project) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <EmptyState icon="❌" title="项目不存在" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: color }]} edges={['top']}>
      <View style={[styles.header, { backgroundColor: color }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconBtn}>
          <Text style={styles.whiteIcon}>←</Text>
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <Text style={styles.headerSub}>🎯 项目实战</Text>
          <Text style={styles.headerTitle} numberOfLines={2}>{project.title.replace(/项目\d+：/, '')}</Text>
        </View>
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={{ paddingBottom: 40 }}>
        {/* 项目概览 */}
        <View style={{ padding: theme.spacing.lg }}>
          <Card style={styles.overviewCard}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: theme.spacing.md }}>
              <DifficultyBadge difficulty={project.difficulty} />
              <View style={{ backgroundColor: color + '22', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 999, marginLeft: 8 }}>
                <Text style={{ color, fontSize: theme.fontSize.xs, fontWeight: '600' }}>
                  {project.requirements.length} 个功能点
                </Text>
              </View>
              <View style={{ backgroundColor: theme.colors.warning + '22', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 999, marginLeft: 8 }}>
                <Text style={{ color: theme.colors.warning, fontSize: theme.fontSize.xs, fontWeight: '600' }}>
                  {project.testCases.length} 个测试用例
                </Text>
              </View>
            </View>
            <Text style={styles.descText}>{project.description}</Text>
            <View style={[styles.preBox, { borderLeftColor: theme.colors.warning }]}>
              <Text style={styles.preLabel}>📚 前置知识</Text>
              <Text style={styles.preText}>{project.prerequisites}</Text>
            </View>
          </Card>
        </View>

        {/* Tab 导航 */}
        <View style={styles.tabBar}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: theme.spacing.lg }}>
            {[
              { k: 'req', icon: '🎯', label: '功能需求' },
              { k: 'tech', icon: '🛠️', label: '技术要点' },
              { k: 'arch', icon: '🏗️', label: '架构设计' },
              { k: 'test', icon: '✅', label: '测试用例' },
              { k: 'ref', icon: '💡', label: '实现思路' },
            ].map(t => (
              <TouchableOpacity
                key={t.k}
                onPress={() => setTab(t.k)}
                style={[styles.tabBtn, tab === t.k && { backgroundColor: color }]}>
                <Text style={[styles.tabText, tab === t.k && { color: '#fff' }]}>
                  {t.icon} {t.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* 内容 */}
        {tab === 'req' && (
          <Section title="功能需求清单" icon="🎯">
            <Card>
              <CheckList items={project.requirements} />
            </Card>
          </Section>
        )}

        {tab === 'tech' && (
          <Section title="技术栈与学习要点" icon="🛠️">
            <Card>
              <NumberList items={project.techStack} />
            </Card>
          </Section>
        )}

        {tab === 'arch' && (
          <Section title="推荐架构设计" icon="🏗️">
            <Card>
              <Text style={styles.archIntro}>
                先看下面的类/模块划分，再开始编码。好的结构是成功的一半！
              </Text>
              <CodeBlock language={language} code={project.architectureHint} />
            </Card>
          </Section>
        )}

        {tab === 'test' && (
          <Section title="测试用例（验收标准）" icon="✅">
            <Card>
              <NumberList items={project.testCases} />
            </Card>
            <View style={[styles.tipBox, { borderLeftColor: theme.colors.success }]}>
              <Text style={styles.tipText}>
                💡 每写完一个功能，就对照测试用例手动测试一遍。
                所有测试用例通过 = 项目完成！
              </Text>
            </View>
          </Section>
        )}

        {tab === 'ref' && (
          <Section title="参考实现思路（看提示，不要直接抄）" icon="💡">
            <Card style={{ backgroundColor: theme.colors.purple + '11', borderWidth: 1, borderColor: theme.colors.purple + '33' }}>
              <Text style={styles.refText}>{project.referenceSolution}</Text>
            </Card>
            <View style={{ marginTop: theme.spacing.lg }}>
              <Button
                title="🎉 我做完了！想挑战下一个项目"
                variant="primary"
                size="lg"
                onPress={() => navigation.goBack()}
              />
            </View>
          </Section>
        )}

        <Divider style={{ margin: theme.spacing.lg }} />
        <View style={{ paddingHorizontal: theme.spacing.lg }}>
          <Text style={styles.motivateTitle}>🚀 写代码前的三个提醒</Text>
          <View style={styles.remindItem}>
            <Text style={styles.remindIcon}>①</Text>
            <Text style={styles.remindText}>
              用你手机上的编译器（{({cpp:'Cxxdroid',java:'Jvdroid',python:'Pydroid 3'})[language] || '推荐IDE'}）
              新建一个项目，一步步把代码写出来。
            </Text>
          </View>
          <View style={styles.remindItem}>
            <Text style={styles.remindIcon}>②</Text>
            <Text style={styles.remindText}>
              遇到Bug不要急着看参考答案，先自己查错5分钟。
              阅读报错信息是程序员最重要的能力。
            </Text>
          </View>
          <View style={styles.remindItem}>
            <Text style={styles.remindIcon}>③</Text>
            <Text style={styles.remindText}>
              做完项目后，保存你的代码。再过一周，拿出来独立重写一次，
              才能真正内化成你的能力！
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  header: {
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
  },
  scroll: {
    flex: 1,
    backgroundColor: theme.colors.bg,
    borderTopLeftRadius: theme.radius.xl,
    borderTopRightRadius: theme.radius.xl,
    marginTop: -theme.radius.lg,
  },
  overviewCard: {
    padding: theme.spacing.lg,
    ...theme.shadow.sm,
  },
  descText: {
    fontSize: theme.fontSize.md,
    color: theme.colors.text,
    lineHeight: 26,
    marginBottom: theme.spacing.md,
  },
  preBox: {
    backgroundColor: theme.colors.warning + '11',
    padding: theme.spacing.md,
    borderRadius: theme.radius.md,
    borderLeftWidth: 4,
  },
  preLabel: {
    fontWeight: '700',
    color: theme.colors.warning,
    fontSize: theme.fontSize.sm,
    marginBottom: 4,
  },
  preText: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.text,
    lineHeight: 22,
  },
  tabBar: {
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  tabBtn: {
    paddingVertical: 10,
    paddingHorizontal: theme.spacing.md,
    borderRadius: theme.radius.sm,
    marginRight: theme.spacing.sm,
    marginVertical: theme.spacing.sm,
  },
  tabText: {
    fontSize: theme.fontSize.sm,
    fontWeight: '600',
    color: theme.colors.textLight,
    whiteSpace: 'nowrap',
  },
  sectionTitle: {
    fontSize: theme.fontSize.lg,
    fontWeight: '700',
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
  },
  checkItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: theme.colors.border,
  },
  checkBox: {
    width: 22,
    height: 22,
    marginRight: theme.spacing.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkText: {
    flex: 1,
    fontSize: theme.fontSize.md,
    color: theme.colors.text,
    lineHeight: 24,
  },
  numberItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 10,
  },
  numberBubble: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: theme.colors.primary + '22',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.md,
  },
  numberText: {
    fontWeight: '700',
    color: theme.colors.primary,
    fontSize: theme.fontSize.sm,
  },
  numberText2: {
    flex: 1,
    fontSize: theme.fontSize.md,
    color: theme.colors.text,
    lineHeight: 24,
  },
  archIntro: {
    fontSize: theme.fontSize.md,
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
  },
  tipBox: {
    backgroundColor: theme.colors.success + '11',
    padding: theme.spacing.md,
    borderRadius: theme.radius.md,
    borderLeftWidth: 4,
    marginTop: theme.spacing.md,
  },
  tipText: {
    fontSize: theme.fontSize.sm,
    lineHeight: 22,
    color: theme.colors.text,
  },
  refText: {
    fontSize: theme.fontSize.md,
    lineHeight: 26,
    color: theme.colors.text,
  },
  motivateTitle: {
    fontSize: theme.fontSize.lg,
    fontWeight: '700',
    color: theme.colors.primary,
    marginBottom: theme.spacing.md,
  },
  remindItem: {
    flexDirection: 'row',
    paddingVertical: theme.spacing.sm,
  },
  remindIcon: {
    fontSize: theme.fontSize.lg,
    color: theme.colors.primary,
    marginRight: theme.spacing.md,
    fontWeight: '700',
  },
  remindText: {
    flex: 1,
    fontSize: theme.fontSize.md,
    lineHeight: 26,
    color: theme.colors.text,
  },
});
