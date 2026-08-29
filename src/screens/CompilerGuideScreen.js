// 编译器推荐与集成指南
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '../theme';
import { Card, LanguageBadge, Divider, Button } from '../components/UI';
import { LanguageInfo } from '../types';

const compilerData = {
  cpp: [
    {
      name: 'Cxxdroid - C++ compiler IDE',
      rating: '⭐ 4.7/5',
      size: '约 150MB',
      features: [
        '✅ 完整的 Clang/GCC 编译器，支持 C++17/20',
        '✅ 支持 STL 标准库，开箱即用',
        '✅ 语法高亮、自动补全、错误提示',
        '✅ 支持调试（Debugger）和断点',
        '✅ 可以打开多文件项目，不是只能写单文件',
        '✅ 内置终端，可以用命令行参数',
      ],
      recommendation: '⭐⭐⭐⭐⭐ 最推荐',
      install: 'Google Play / 国内应用市场搜索 Cxxdroid',
    },
    {
      name: 'C++ Compiler (IDE)',
      rating: '⭐ 4.4/5',
      size: '约 80MB',
      features: [
        '✅ 体积小，启动快',
        '✅ 支持 GCC 标准编译',
        '✅ 适合只写单文件的入门练习',
        '❌ 对大文件项目支持弱一些',
      ],
      recommendation: '⭐⭐⭐⭐ 入门推荐',
      install: '应用市场搜索 "C++ Compiler IDE"',
    },
    {
      name: 'Termux (通用终端)',
      rating: '⭐ 4.6/5',
      size: '约 200MB+',
      features: [
        '✅ 完整的 Linux 终端环境',
        '✅ pkg install clang 就能装 C/C++ 编译器',
        '✅ 用 g++ 命令手动编译，和电脑上操作一致',
        '✅ 可以同时学 Python / Java / Git 全部工具',
        '❌ 需要一定 Linux 命令基础，新手稍难',
      ],
      recommendation: '⭐⭐⭐⭐ 进阶用户强烈推荐',
      install: '官网 F-Droid 下载（注意：Google Play版本过时）',
    },
  ],
  java: [
    {
      name: 'Jvdroid - Java IDE for Android',
      rating: '⭐ 4.6/5',
      size: '约 300MB',
      features: [
        '✅ 内嵌完整 OpenJDK 11，真·Java 环境',
        '✅ 支持 Java 8~17 新特性（Stream, Lambda, var, record）',
        '✅ 语法高亮 + 智能补全 + 实时错误',
        '✅ 支持 Maven 项目和 JUnit 单元测试',
        '✅ 完美支持面向对象，多文件、包、import',
        '✅ 可以运行 Swing 小窗口程序',
      ],
      recommendation: '⭐⭐⭐⭐⭐ 最推荐',
      install: 'Google Play / 应用市场搜索 Jvdroid',
    },
    {
      name: 'AIDE - Android IDE',
      rating: '⭐ 4.3/5',
      size: '约 400MB',
      features: [
        '✅ 既能写 Java 控制台，也能写 Android 应用',
        '✅ 支持 XML 布局文件预览（开发App用）',
        '✅ 完整的 Gradle 构建系统',
        '❌ 学习Java语法不如 Jvdroid 轻量',
      ],
      recommendation: '⭐⭐⭐⭐ 想同时学 Android 开发的选它',
      install: 'Google Play 搜索 AIDE',
    },
    {
      name: 'Termux + OpenJDK',
      rating: '⭐ 4.5/5',
      size: '约 300MB+',
      features: [
        '✅ pkg install openjdk-17 就能装 JDK17',
        '✅ javac + java 命令行，和电脑一模一样',
        '✅ 还能顺便装 Python, Node.js, Git',
        '❌ 纯终端无编辑器，需要配合 vim/nano',
      ],
      recommendation: '⭐⭐⭐⭐ 进阶/计算机专业学生推荐',
      install: 'F-Droid 下载 Termux 后手动安装',
    },
  ],
  python: [
    {
      name: 'Pydroid 3 - IDE for Python 3',
      rating: '⭐ 4.8/5',
      size: '约 400MB',
      features: [
        '✅ 完整的 Python 3.11 环境，几乎所有标准库都支持',
        '✅ pip 一键安装第三方库：numpy, pandas, matplotlib, requests, bs4',
        '✅ 支持 matplotlib 画图、pygame 小游戏',
        '✅ 支持 Jupyter Notebook 风格交互',
        '✅ 调试器、断点、单步执行',
        '✅ 支持 Tkinter GUI 程序（真能弹窗！）',
      ],
      recommendation: '⭐⭐⭐⭐⭐ 最推荐，Python 新手神器',
      install: 'Google Play / 应用市场搜索 Pydroid 3（有免费版）',
    },
    {
      name: 'Python IDE (by TechBaj Developers)',
      rating: '⭐ 4.4/5',
      size: '约 90MB',
      features: [
        '✅ 体积小，启动飞快',
        '✅ 适合单文件快速测试',
        '✅ Python 3.10 语法，能跑大部分代码',
        '❌ pip 支持不如 Pydroid 3 全',
      ],
      recommendation: '⭐⭐⭐⭐ 日常练习用',
      install: '应用市场搜索 "Python IDE"',
    },
    {
      name: 'Termux + Python',
      rating: '⭐ 4.6/5',
      size: '约 350MB+',
      features: [
        '✅ pkg install python 即可安装 Python 3.12',
        '✅ 完整 pip，能装任何包',
        '✅ 可以跑 Django / Flask 服务器（真能在手机开网站！）',
        '✅ 装个 Jupyter Notebook 手机也能数据分析',
        '❌ 需要基础命令行知识',
      ],
      recommendation: '⭐⭐⭐⭐ 做项目/爬虫/数据分析推荐',
      install: 'F-Droid Termux → pkg install python',
    },
  ],
};

const workflowSteps = [
  { icon: '①', title: '打开 CodeMaster 学习知识点/看题目', desc: '先看懂题目要求，理清楚思路' },
  { icon: '②', title: '切换到编译器 App（如 Pydroid）', desc: '新建一个文件 / 项目，复制或照着写代码' },
  { icon: '③', title: '运行调试代码', desc: '看报错信息，一行一行改 Bug（最有价值的一步！）' },
  { icon: '④', title: '回到 CodeMaster 提交答案', desc: '跑通后，把写好的代码/填空答案填回这里，看解析对照' },
  { icon: '⑤', title: '保存代码，定期复习', desc: '好的代码保存到编译器的收藏/文件夹，一周后重写一次' },
];

export default function CompilerGuideScreen({ navigation }) {
  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: theme.colors.purple }]} edges={['top']}>
      <View style={[styles.header, { backgroundColor: theme.colors.purple }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconBtn}>
          <Text style={styles.whiteIcon}>←</Text>
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>🛠️ 编译器与开发工具</Text>
          <Text style={styles.subTitle}>
            CodeMaster 专注教学，代码运行请搭配这些专业编译器 App
          </Text>
        </View>
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={{ paddingBottom: 40 }}>
        {/* 使用流程 */}
        <View style={{ padding: theme.spacing.lg }}>
          <Card style={styles.workflowCard}>
            <Text style={styles.workflowTitle}>🔄 推荐的学习工作流</Text>
            <Text style={styles.workflowDesc}>
              CodeMaster 不会直接运行代码（避免编译器复杂、体积巨大）。
              我们精心设计了双 App 协同工作模式：
            </Text>
            {workflowSteps.map(s => (
              <View key={s.icon} style={styles.stepRow}>
                <Text style={styles.stepIcon}>{s.icon}</Text>
                <View style={{ flex: 1, marginLeft: theme.spacing.md }}>
                  <Text style={styles.stepTitle}>{s.title}</Text>
                  <Text style={styles.stepDesc}>{s.desc}</Text>
                </View>
              </View>
            ))}
          </Card>
        </View>

        {/* 各语言推荐编译器 */}
        {['python', 'java', 'cpp'].map(lang => (
          <View key={lang}>
            <View style={{ paddingHorizontal: theme.spacing.lg, flexDirection: 'row', alignItems: 'center' }}>
              <LanguageBadge language={lang} />
              <Text style={styles.langSectionTitle}>
                {LanguageInfo[lang].name} 编译器推荐
              </Text>
            </View>
            <View style={{ padding: theme.spacing.lg }}>
              {compilerData[lang].map((c, idx) => (
                <Card key={c.name} style={[styles.compilerCard, idx > 0 && { marginTop: theme.spacing.sm }]}>
                  <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                    <View style={[styles.rankBadge, idx === 0 && styles.rankBadgeTop]}>
                      <Text style={styles.rankText}>{idx + 1}</Text>
                    </View>
                    <View style={{ flex: 1, marginLeft: theme.spacing.md }}>
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text style={styles.compilerName}>{c.name}</Text>
                      </View>
                      <Text style={styles.compilerRating}>{c.rating}  ·  {c.size}</Text>
                      <View style={{ marginTop: theme.spacing.sm }}>
                        {c.features.map((f, i) => (
                          <Text key={i} style={styles.featureLine}>{f}</Text>
                        ))}
                      </View>
                      <View style={styles.footerRow}>
                        <Text style={[
                          styles.recommendText,
                          idx === 0 && { color: theme.colors.success, fontWeight: '700' },
                        ]}>
                          {c.recommendation}
                        </Text>
                      </View>
                      <Text style={styles.installText}>📥 {c.install}</Text>
                    </View>
                  </View>
                </Card>
              ))}
            </View>
            <Divider style={{ marginHorizontal: theme.spacing.lg }} />
          </View>
        ))}

        {/* 快速入门提示 */}
        <View style={{ padding: theme.spacing.lg }}>
          <Card style={styles.tipCard}>
            <Text style={styles.tipTitle}>💡 编译器通用的小技巧</Text>
            {[
              '代码文件分文件夹保存：Cpp / Java / Python 三个文件夹，不要全堆一起',
              '文件名用英文！中文文件名在部分编译器中会报错',
              '写完代码 Ctrl+S 习惯性保存，不然白写',
              '报错看不懂？长按错误信息复制 → 粘贴到搜索引擎，99% 能找到答案',
              '遇到玄学 Bug，复制代码到电脑上试一下（或换个编译器），先排除编译器问题',
            ].map((t, i) => (
              <View key={i} style={styles.tipRow}>
                <Text style={styles.tipDot}>•</Text>
                <Text style={styles.tipRowText}>{t}</Text>
              </View>
            ))}
          </Card>
        </View>

        <View style={{ paddingHorizontal: theme.spacing.lg }}>
          <Button
            title="返回首页 → 开始学习"
            size="lg"
            onPress={() => navigation.navigate('Home')}
          />
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
  workflowCard: {
    ...theme.shadow.sm,
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.primary + '0A',
    borderWidth: 1,
    borderColor: theme.colors.primary + '33',
  },
  workflowTitle: {
    fontSize: theme.fontSize.lg,
    fontWeight: '700',
    color: theme.colors.primary,
    marginBottom: theme.spacing.sm,
  },
  workflowDesc: {
    fontSize: theme.fontSize.md,
    color: theme.colors.text,
    lineHeight: 24,
    marginBottom: theme.spacing.md,
  },
  stepRow: {
    flexDirection: 'row',
    paddingVertical: theme.spacing.sm,
  },
  stepIcon: {
    fontSize: 22,
    fontWeight: '800',
    color: theme.colors.primary,
  },
  stepTitle: {
    fontSize: theme.fontSize.md,
    fontWeight: '700',
    color: theme.colors.text,
    marginBottom: 2,
  },
  stepDesc: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textLight,
    lineHeight: 20,
  },
  langSectionTitle: {
    fontSize: theme.fontSize.lg,
    fontWeight: '700',
    color: theme.colors.text,
    marginLeft: theme.spacing.sm,
  },
  compilerCard: {
    padding: theme.spacing.md,
  },
  rankBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: theme.colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rankBadgeTop: {
    backgroundColor: theme.colors.warning,
  },
  rankText: {
    fontWeight: '700',
    color: theme.colors.text,
  },
  compilerName: {
    fontSize: theme.fontSize.md,
    fontWeight: '700',
    color: theme.colors.text,
    flex: 1,
  },
  compilerRating: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.textLight,
    marginTop: 4,
  },
  featureLine: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.text,
    lineHeight: 20,
  },
  footerRow: {
    marginTop: theme.spacing.sm,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: theme.colors.border,
    paddingTop: theme.spacing.sm,
  },
  recommendText: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.text,
    fontWeight: '600',
  },
  installText: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.primaryDark,
    marginTop: theme.spacing.sm,
    backgroundColor: theme.colors.primary + '11',
    padding: theme.spacing.sm,
    borderRadius: theme.radius.sm,
  },
  tipCard: {
    backgroundColor: theme.colors.warning + '11',
    borderWidth: 1,
    borderColor: theme.colors.warning + '44',
    padding: theme.spacing.lg,
    ...theme.shadow.sm,
  },
  tipTitle: {
    fontSize: theme.fontSize.lg,
    fontWeight: '700',
    color: theme.colors.warning,
    marginBottom: theme.spacing.md,
  },
  tipRow: {
    flexDirection: 'row',
    paddingVertical: 6,
  },
  tipDot: {
    fontSize: theme.fontSize.lg,
    color: theme.colors.warning,
    marginRight: theme.spacing.sm,
    marginTop: -2,
  },
  tipRowText: {
    flex: 1,
    fontSize: theme.fontSize.md,
    color: theme.colors.text,
    lineHeight: 24,
  },
});
