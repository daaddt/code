// 知识点详情页：展示知识讲解、代码示例、提示、常见错误
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme, langColor } from '../theme';
import { CodeBlock, Card, Divider, Button } from '../components/UI';
import { findKnowledgePointById } from '../data';

/** 简易 Markdown 渲染（支持 #标题、**加粗**、代码块```、表格|等最常用）*/
const MarkdownText = ({ text, baseColor = theme.colors.text }) => {
  const lines = text.split('\n');
  const blocks = [];
  let inCode = false;
  let codeLines = [];
  let codeLang = '';

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // 代码块起止
    if (line.startsWith('```')) {
      if (!inCode) {
        inCode = true;
        codeLang = line.slice(3).trim();
        codeLines = [];
      } else {
        blocks.push({
          type: 'code',
          lang: codeLang,
          text: codeLines.join('\n'),
        });
        inCode = false;
      }
      continue;
    }
    if (inCode) {
      codeLines.push(line);
      continue;
    }

    // 表格行
    if (line.trim().startsWith('|') && line.includes('|')) {
      // 合并相邻表格行
      let tableLines = [line];
      let j = i + 1;
      while (j < lines.length && lines[j].trim().startsWith('|')) {
        tableLines.push(lines[j]);
        j++;
      }
      // 跳过分隔线行（|---|---|）
      const rows = tableLines.filter(r => !r.trim().match(/^[|\s\-:]+$/));
      blocks.push({ type: 'table', rows });
      i = j - 1;
      continue;
    }

    // 标题
    const hLevel = (line.match(/^#+/) || [''])[0].length;
    if (hLevel > 0) {
      blocks.push({ type: `h${Math.min(hLevel, 3)}`, text: line.replace(/^#+\s*/, '') });
      continue;
    }

    // 普通段落
    blocks.push({ type: 'p', text: line });
  }

  // 渲染块
  return (
    <View>
      {blocks.map((b, idx) => {
        if (b.type === 'code') {
          return <CodeBlock key={idx} code={b.text} language={b.lang} />;
        }
        if (b.type === 'table') {
          return (
            <View key={idx} style={{ marginVertical: theme.spacing.sm }}>
              {b.rows.map((row, rIdx) => (
                <View key={rIdx} style={[
                  styles.tableRow,
                  rIdx === 0 && styles.tableHeader,
                ]}>
                  {row.replace(/^\|/, '').replace(/\|$/, '').split('|').map((cell, cIdx) => (
                    <Text key={cIdx} style={[
                      styles.tableCell,
                      rIdx === 0 ? styles.tableHeaderCell : {},
                    ]} numberOfLines={0}>{cell.trim()}</Text>
                  ))}
                </View>
              ))}
            </View>
          );
        }
        if (b.type === 'h1') {
          return <Text key={idx} style={[styles.h1, { color: baseColor }]}>{b.text}</Text>;
        }
        if (b.type === 'h2') {
          return <Text key={idx} style={[styles.h2, { color: baseColor }]}>{b.text}</Text>;
        }
        if (b.type === 'h3') {
          return <Text key={idx} style={[styles.h3, { color: baseColor }]}>{b.text}</Text>;
        }
        // 段落
        // 简单内联解析：**文字**→加粗，`code`→code样式
        if (!b.text.trim()) {
          return <View key={idx} style={{ height: 8 }} />;
        }
        return <InlineText key={idx} text={b.text} />;
      })}
    </View>
  );
};

/** 解析简单的内联格式：**加粗** `code` */
const InlineText = ({ text }) => {
  const parts = [];
  const regex = /(\*\*[^*]+\*\*|`[^`]+`)/g;
  let last = 0;
  let m;
  while ((m = regex.exec(text)) !== null) {
    if (m.index > last) parts.push({ t: 'text', s: text.slice(last, m.index) });
    const raw = m[0];
    if (raw.startsWith('**')) {
      parts.push({ t: 'bold', s: raw.slice(2, -2) });
    } else if (raw.startsWith('`')) {
      parts.push({ t: 'code', s: raw.slice(1, -1) });
    }
    last = regex.lastIndex;
  }
  if (last < text.length) parts.push({ t: 'text', s: text.slice(last) });
  if (!parts.length) return <Text style={styles.p}>{text}</Text>;

  return (
    <Text style={styles.p}>
      {parts.map((p, i) => {
        if (p.t === 'bold') return <Text key={i} style={styles.bold}>{p.s}</Text>;
        if (p.t === 'code') return <Text key={i} style={styles.inlineCode}>{p.s}</Text>;
        return <Text key={i}>{p.s}</Text>;
      })}
    </Text>
  );
};

export default function KnowledgeScreen({ navigation, route }) {
  const { language, kpId, unitTitle } = route.params;
  const kp = findKnowledgePointById(language, kpId);
  const color = langColor(language);
  const [showCode, setShowCode] = useState(true);
  const [tab, setTab] = useState('learn'); // learn | tips | mistakes

  if (!kp) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Text style={{ padding: 32 }}>知识点不存在</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: color }]} edges={['top']}>
      <View style={[styles.topBar, { backgroundColor: color }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <Text style={styles.topSubtitle}>{unitTitle}</Text>
          <Text style={styles.topTitle} numberOfLines={1}>{kp.title}</Text>
        </View>
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={{ paddingBottom: 60 }}>
        <View style={{ padding: theme.spacing.lg }}>
          {/* Tab 切换 */}
          <View style={styles.tabBar}>
            {[
              { k: 'learn', label: '📚 讲解' },
              { k: 'tips', label: `💡 重点(${kp.tips.length})` },
              { k: 'mistakes', label: `⚠️ 易错(${kp.commonMistakes.length})` },
            ].map(t => (
              <TouchableOpacity
                key={t.k}
                onPress={() => setTab(t.k)}
                style={[styles.tabBtn, tab === t.k && { backgroundColor: color }]}>
                <Text style={[
                  styles.tabText,
                  tab === t.k && { color: theme.colors.white },
                ]}>{t.label}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {tab === 'learn' && (
            <View>
              <MarkdownText text={kp.content} baseColor={color} />
              <Divider style={{ marginVertical: theme.spacing.lg }} />
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={[styles.subSection, { borderLeftColor: color }]}>💻 代码示例</Text>
                <Button
                  title={showCode ? '收起' : '展开'}
                  variant="ghost"
                  size="sm"
                  onPress={() => setShowCode(s => !s)}
                />
              </View>
              {showCode && kp.codeExample ? (
                <>
                  <CodeBlock code={kp.codeExample} language={language} />
                  {kp.codeOutput ? (
                    <Card style={styles.outputCard}>
                      <Text style={styles.outputTitle}>📤 输出样例</Text>
                      <Text style={styles.outputText}>{kp.codeOutput}</Text>
                    </Card>
                  ) : null}
                </>
              ) : null}
            </View>
          )}

          {tab === 'tips' && (
            <View>
              {kp.tips.length === 0 ? (
                <Text style={{ color: theme.colors.textLight, marginTop: 20, textAlign: 'center' }}>
                  暂无重点提示
                </Text>
              ) : (
                kp.tips.map((tip, i) => (
                  <View key={i} style={[styles.tipItem, { borderLeftColor: color }]}>
                    <Text style={styles.tipIdx}>Tip {i + 1}</Text>
                    <InlineText text={tip} />
                  </View>
                ))
              )}
            </View>
          )}

          {tab === 'mistakes' && (
            <View>
              {kp.commonMistakes.length === 0 ? (
                <Text style={{ color: theme.colors.textLight, marginTop: 20, textAlign: 'center' }}>
                  暂无易错点
                </Text>
              ) : (
                kp.commonMistakes.map((m, i) => (
                  <View key={i} style={styles.mistakeItem}>
                    <Text style={styles.mistakeIcon}>❌</Text>
                    <View style={{ flex: 1, marginLeft: theme.spacing.md }}>
                      <Text style={styles.mistakeTitle}>常见错误 {i + 1}</Text>
                      <InlineText text={m} />
                    </View>
                  </View>
                ))
              )}
            </View>
          )}

          {kp.relatedLinks && kp.relatedLinks.length > 0 && (
            <>
              <Divider style={{ marginVertical: theme.spacing.lg }} />
              <Text style={[styles.subSection, { borderLeftColor: theme.colors.textLight }]}>
                🔗 延伸学习资源
              </Text>
              {kp.relatedLinks.map((link, i) => (
                <Text key={i} style={styles.linkText}>• {link}</Text>
              ))}
            </>
          )}
        </View>
      </ScrollView>
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
  topSubtitle: {
    fontSize: theme.fontSize.xs,
    color: 'rgba(255,255,255,0.8)',
  },
  topTitle: {
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
  tabBar: {
    flexDirection: 'row',
    backgroundColor: theme.colors.input,
    borderRadius: theme.radius.md,
    padding: 4,
    marginBottom: theme.spacing.lg,
  },
  tabBtn: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: theme.radius.sm,
    alignItems: 'center',
  },
  tabText: {
    fontSize: theme.fontSize.sm,
    fontWeight: '600',
    color: theme.colors.textLight,
  },
  h1: {
    fontSize: theme.fontSize['2xl'],
    fontWeight: '800',
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.sm,
  },
  h2: {
    fontSize: theme.fontSize.xl,
    fontWeight: '700',
    marginTop: theme.spacing.lg,
    marginBottom: theme.spacing.sm,
  },
  h3: {
    fontSize: theme.fontSize.lg,
    fontWeight: '700',
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.sm,
    color: theme.colors.text,
  },
  p: {
    fontSize: theme.fontSize.md,
    lineHeight: 26,
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
  },
  bold: {
    fontWeight: '700',
    color: theme.colors.text,
  },
  inlineCode: {
    backgroundColor: theme.colors.input,
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 4,
    fontSize: theme.fontSize.sm,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    color: theme.colors.primaryDark,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: theme.colors.border,
    paddingVertical: 8,
    paddingHorizontal: 8,
  },
  tableHeader: {
    backgroundColor: theme.colors.input,
    borderTopLeftRadius: theme.radius.sm,
    borderTopRightRadius: theme.radius.sm,
  },
  tableCell: {
    flex: 1,
    fontSize: theme.fontSize.sm,
    color: theme.colors.text,
  },
  tableHeaderCell: {
    fontWeight: '700',
    color: theme.colors.primaryDark,
  },
  subSection: {
    fontSize: theme.fontSize.lg,
    fontWeight: '700',
    color: theme.colors.text,
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.md,
    paddingLeft: theme.spacing.sm,
    borderLeftWidth: 4,
  },
  outputCard: {
    marginTop: theme.spacing.sm,
    padding: theme.spacing.md,
    backgroundColor: theme.colors.success + '11',
    borderWidth: 1,
    borderColor: theme.colors.success + '44',
  },
  outputTitle: {
    fontSize: theme.fontSize.sm,
    fontWeight: '700',
    color: theme.colors.success,
    marginBottom: 6,
  },
  outputText: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.text,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    lineHeight: 22,
  },
  tipItem: {
    backgroundColor: theme.colors.primary + '11',
    borderLeftWidth: 4,
    padding: theme.spacing.md,
    borderRadius: theme.radius.sm,
    marginBottom: theme.spacing.sm,
  },
  tipIdx: {
    fontWeight: '700',
    color: theme.colors.primary,
    fontSize: theme.fontSize.xs,
    marginBottom: 4,
  },
  mistakeItem: {
    flexDirection: 'row',
    backgroundColor: theme.colors.danger + '11',
    padding: theme.spacing.md,
    borderRadius: theme.radius.md,
    marginBottom: theme.spacing.sm,
  },
  mistakeIcon: {
    fontSize: 22,
  },
  mistakeTitle: {
    fontWeight: '700',
    color: theme.colors.danger,
    fontSize: theme.fontSize.sm,
    marginBottom: 4,
  },
  linkText: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.primaryDark,
    paddingVertical: 4,
    paddingLeft: theme.spacing.md,
  },
});
