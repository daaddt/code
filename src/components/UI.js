// 通用 UI 小组件
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Platform } from 'react-native';
import { theme, langColor } from '../theme';
import { DifficultyLabels, DifficultyColors } from '../types';

// ========== 卡片 ==========
export const Card = ({ style, children, onPress }) => {
  const Component = onPress ? TouchableOpacity : View;
  return (
    <Component
      style={[styles.card, theme.shadow.sm, style]}
      onPress={onPress}
      activeOpacity={0.7}>
      {children}
    </Component>
  );
};

// ========== 按钮 ==========
export const Button = ({
  title,
  onPress,
  variant = 'primary',   // primary | secondary | outline | danger | ghost
  size = 'md',            // sm | md | lg
  style,
  textStyle,
  disabled,
  icon,
}) => {
  const sizeStyles = {
    sm: { paddingVertical: 8, paddingHorizontal: 16, fontSize: theme.fontSize.sm },
    md: { paddingVertical: 12, paddingHorizontal: 20, fontSize: theme.fontSize.md },
    lg: { paddingVertical: 16, paddingHorizontal: 28, fontSize: theme.fontSize.lg },
  }[size];

  const variantStyles = {
    primary: { bg: theme.colors.primary, text: theme.colors.white, border: 'transparent' },
    secondary: { bg: theme.colors.success, text: theme.colors.white, border: 'transparent' },
    outline: { bg: 'transparent', text: theme.colors.primary, border: theme.colors.primary },
    danger: { bg: theme.colors.danger, text: theme.colors.white, border: 'transparent' },
    ghost: { bg: 'transparent', text: theme.colors.text, border: 'transparent' },
  }[variant];

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.button,
        {
          backgroundColor: disabled ? theme.colors.border : variantStyles.bg,
          borderColor: variantStyles.border,
          paddingVertical: sizeStyles.paddingVertical,
          paddingHorizontal: sizeStyles.paddingHorizontal,
        },
        style,
      ]}
      activeOpacity={0.7}>
      {icon}
      <Text style={[
        styles.buttonText,
        { color: disabled ? theme.colors.textMuted : variantStyles.text, fontSize: sizeStyles.fontSize },
        icon ? { marginLeft: 8 } : {},
        textStyle,
      ]}>{title}</Text>
    </TouchableOpacity>
  );
};

// ========== 徽章 ==========
export const Badge = ({ label, color, style, textStyle }) => (
  <View style={[styles.badge, { backgroundColor: (color || theme.colors.primary) + '22' }, style]}>
    <Text style={[styles.badgeText, { color: color || theme.colors.primary }, textStyle]}>{label}</Text>
  </View>
);

// 难度徽章
export const DifficultyBadge = ({ difficulty }) => (
  <Badge
    label={DifficultyLabels[difficulty] || difficulty}
    color={DifficultyColors[difficulty] || theme.colors.textLight}
  />
);

// 语言徽章
export const LanguageBadge = ({ language }) => {
  const names = { cpp: 'C++', java: 'Java', python: 'Python' };
  return <Badge label={names[language] || language} color={langColor(language)} />;
};

// ========== 进度条 ==========
export const ProgressBar = ({ percent, color = theme.colors.primary, height = 8, style }) => (
  <View
    style={[
      { height, backgroundColor: theme.colors.border, borderRadius: theme.radius.pill, overflow: 'hidden' },
      style,
    ]}>
    <View
      style={{
        height: '100%',
        width: `${Math.min(100, Math.max(0, percent))}%`,
        backgroundColor: color,
        borderRadius: theme.radius.pill,
      }}
    />
  </View>
);

// ========== 章节/步骤 步骤指示器 ==========
export const StepBubble = ({ step, status, onPress }) => {
  // status: done | current | locked | available
  const statusStyle = {
    done: { bg: theme.colors.success, text: theme.colors.white, border: theme.colors.success },
    current: { bg: theme.colors.primary, text: theme.colors.white, border: theme.colors.primary },
    available: { bg: theme.colors.white, text: theme.colors.primary, border: theme.colors.primary },
    locked: { bg: theme.colors.input, text: theme.colors.textMuted, border: theme.colors.border },
  }[status] || {};

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.stepBubble, { backgroundColor: statusStyle.bg, borderColor: statusStyle.border }]}
      disabled={status === 'locked'}>
      <Text style={[styles.stepText, { color: statusStyle.text }]}>
        {status === 'done' ? '✓' : step}
      </Text>
    </TouchableOpacity>
  );
};

// ========== 分隔线 ==========
export const Divider = ({ style }) => (
  <View style={[styles.divider, style]} />
);

// ========== 标题/说明文字组合 ==========
export const SectionTitle = ({ title, subtitle, right, style }) => (
  <View style={[styles.sectionHeader, style]}>
    <View style={{ flex: 1 }}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {subtitle ? <Text style={styles.sectionSubtitle}>{subtitle}</Text> : null}
    </View>
    {right}
  </View>
);

// ========== 空状态 ==========
export const EmptyState = ({ icon = '📭', title = '还没有内容', description, action }) => (
  <View style={styles.empty}>
    <Text style={{ fontSize: 64, marginBottom: theme.spacing.md }}>{icon}</Text>
    <Text style={styles.emptyTitle}>{title}</Text>
    {description ? <Text style={styles.emptyDesc}>{description}</Text> : null}
    {action}
  </View>
);

// ========== 代码块 ==========
export const CodeBlock = ({ code, language }) => (
  <View style={styles.codeBlock}>
    <View style={styles.codeHeader}>
      <Text style={styles.codeLang}>{language || 'code'}</Text>
    </View>
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
      <Text style={styles.codeText}>{code}</Text>
    </ScrollView>
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.lg,
  },
  button: {
    borderRadius: theme.radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderWidth: 1,
  },
  buttonText: {
    fontWeight: '600',
  },
  badge: {
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 2,
    borderRadius: theme.radius.pill,
    alignSelf: 'flex-start',
  },
  badgeText: {
    fontSize: theme.fontSize.xs,
    fontWeight: '600',
  },
  stepBubble: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
  },
  stepText: {
    fontSize: theme.fontSize.md,
    fontWeight: '700',
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.border,
    marginVertical: theme.spacing.md,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    marginTop: theme.spacing.lg,
  },
  sectionTitle: {
    fontSize: theme.fontSize.lg,
    fontWeight: '700',
    color: theme.colors.text,
  },
  sectionSubtitle: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textLight,
    marginTop: 2,
  },
  empty: {
    padding: theme.spacing.xxl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyTitle: {
    fontSize: theme.fontSize.lg,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
  },
  emptyDesc: {
    fontSize: theme.fontSize.md,
    color: theme.colors.textLight,
    textAlign: 'center',
    lineHeight: 22,
  },
  codeBlock: {
    backgroundColor: '#0f172a',
    borderRadius: theme.radius.md,
    overflow: 'hidden',
    marginVertical: theme.spacing.sm,
  },
  codeHeader: {
    backgroundColor: '#1e293b',
    paddingVertical: 6,
    paddingHorizontal: theme.spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
  },
  codeLang: {
    fontSize: theme.fontSize.xs,
    color: '#94a3b8',
    textTransform: 'uppercase',
    fontWeight: '600',
  },
  codeText: {
    color: '#e2e8f0',
    padding: theme.spacing.md,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    fontSize: theme.fontSize.sm,
    lineHeight: 22,
  },
});
