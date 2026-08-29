// 应用导航配置
import React from 'react';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ProgressProvider } from './src/context/ProgressContext';

import HomeScreen from './src/screens/HomeScreen';
import CourseScreen from './src/screens/CourseScreen';
import UnitScreen from './src/screens/UnitScreen';
import KnowledgeScreen from './src/screens/KnowledgeScreen';
import ProblemScreen from './src/screens/ProblemScreen';
import ProjectDetailScreen from './src/screens/ProjectDetailScreen';
import WrongBookScreen from './src/screens/WrongBookScreen';
import CompilerGuideScreen from './src/screens/CompilerGuideScreen';
import { theme } from './src/theme';
import { StatusBar } from 'expo-status-bar';

const Stack = createNativeStackNavigator();

// 统一全屏无头部（每个页面自定义顶部栏）
const screenOpts = {
  headerShown: false,
  contentStyle: { backgroundColor: theme.colors.bg },
  animation: 'slide_from_right',
};

const AppNavigator = () => (
  <Stack.Navigator screenOptions={screenOpts}>
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="Course" component={CourseScreen} />
    <Stack.Screen name="Unit" component={UnitScreen} />
    <Stack.Screen name="Knowledge" component={KnowledgeScreen} />
    <Stack.Screen name="Problem" component={ProblemScreen} />
    <Stack.Screen name="ProjectDetail" component={ProjectDetailScreen} />
    <Stack.Screen name="WrongBook" component={WrongBookScreen} />
    <Stack.Screen name="CompilerGuide" component={CompilerGuideScreen} />
  </Stack.Navigator>
);

export default function App() {
  return (
    <ProgressProvider>
      <StatusBar style="light" />
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </ProgressProvider>
  );
}
