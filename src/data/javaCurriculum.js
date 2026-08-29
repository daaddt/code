// Java 完整教学方案
import { LearningPath, LearningUnit, KnowledgePoint, Problem, Project, ProblemType, Difficulty } from '../types';

const javaKnowledgePoints = {
  // 单元1
  'java-kp-1-1': new KnowledgePoint({
    id: 'java-kp-1-1',
    title: 'Java 简介与第一个程序',
    content: `## Java 是什么？
Java 是 Sun Microsystems 于1995年推出的面向对象编程语言，现在由 Oracle 维护。

## Java 的三大版本
- **Java SE (Standard Edition)**：标准版，桌面应用和基础
- **Java EE (Enterprise Edition)**：企业版，Web和后端服务
- **Java ME (Micro Edition)**：微型版，嵌入式和老手机

## Java 的核心优势
- **跨平台**：Write Once, Run Anywhere（一次编写，到处运行）
- **JVM**：Java 虚拟机，代码编译成字节码运行在 JVM 上
- **生态丰富**：Spring、Android、大数据框架都是基于 Java
- **强类型、自动垃圾回收**：代码更健壮

## 在手机上编译 Java
1. **Jvdroid** - 最推荐的 Java IDE，支持完整 JDK
2. **AIDE** - 集成开发环境，支持 Android 开发
3. **Termux** - 安装 JDK：\`pkg install openjdk-17\`

## Java 程序结构
- 所有代码必须在 **类 (class)** 里面
- 文件名必须和 public class 名**完全一致**（区分大小写）
- 入口是 \`public static void main(String[] args)\`
- 语句以分号结束`,
    codeExample: `// 文件名必须是 HelloWorld.java
public class HelloWorld {
    
    // main 方法：程序入口
    public static void main(String[] args) {
        // 在控制台输出
        System.out.println("Hello, Java!");
        System.out.print("不换行输出 ");
        System.out.println("第二行");
    }
}`,
    codeOutput: `Hello, Java!
不换行输出 第二行`,
    tips: [
      'System.out.println() 输出后换行，print() 不换行',
      'Java 严格区分大小写，System 不能写成 system',
      'public class 类名必须和文件名完全相同，包括大小写',
      '所有括号 { } 必须成对出现，建议缩进对齐'
    ],
    commonMistakes: [
      '文件名和类名不一致：编译报错 "class HelloWorld is public, should be declared..."',
      'String[] args 写成 String args[]（语法允许但不推荐）',
      'System.out.println 漏掉 ln 或写错 Println（P大写了）',
      '类名用小写或中文：Java 类名单词首字母大写（约定）'
    ],
    relatedLinks: [
      'https://docs.oracle.com/javase/tutorial/',
      'https://www.runoob.com/java/java-tutorial.html'
    ]
  }),

  'java-kp-1-2': new KnowledgePoint({
    id: 'java-kp-1-2',
    title: '输入输出 (Scanner)',
    content: `## 输出 System.out
- \`println(x)\`：输出 x 并换行
- \`print(x)\`：输出 x 不换行
- \`printf(format, args)\`：格式化输出（类似 C 语言）

## 输入 Scanner
Scanner 是最常用的输入类，需要 \`import java.util.Scanner;\`

常用方法：
| 方法 | 作用 |
|------|------|
| nextInt() | 读 int |
| nextLong() | 读 long |
| nextDouble() | 读 double |
| next() | 读一个词（到空格） |
| nextLine() | 读一整行 |

## 格式化输出 printf
- \`%d\` 整数，\`%f\` 浮点数，\`%s\` 字符串，\`%c\` 字符
- \`%.2f\` 保留2位小数，\`%5d\` 至少占5个字符宽`,
    codeExample: `import java.util.Scanner;  // 导入 Scanner

public class InputDemo {
    public static void main(String[] args) {
        // 创建 Scanner 对象（System.in 代表键盘）
        Scanner sc = new Scanner(System.in);
        
        // 读取不同类型
        System.out.print("请输入姓名: ");
        String name = sc.next();
        
        System.out.print("请输入年龄: ");
        int age = sc.nextInt();
        
        System.out.print("请输入身高(米): ");
        double height = sc.nextDouble();
        
        // 输出信息
        System.out.println("==========");
        System.out.println("姓名: " + name);
        System.out.println("年龄: " + age);
        // printf 格式化
        System.out.printf("身高: %.2f 米%n", height);
        System.out.printf("%s 明年 %d 岁%n", name, age + 1);
        
        sc.close();  // 使用完毕关闭（好习惯）
    }
}`,
    codeOutput: `请输入姓名: 小明
请输入年龄: 18
请输入身高(米): 1.75
==========
姓名: 小明
年龄: 18
身高: 1.75 米
小明 明年 19 岁`,
    tips: [
      '用 Scanner 前必须先 import java.util.Scanner',
      'next() 读到空格停止，要读一行用 nextLine()',
      'nextInt() 后直接 nextLine() 会读到空行（需要先 .nextLine() 吃掉换行）',
      'Java 字符串拼接用 + 号，很方便',
      'printf 换行用 %n（跨平台比 \\n 好）'
    ],
    commonMistakes: [
      '忘记导入 Scanner：编译错误 "cannot find symbol Scanner"',
      '输入类型不匹配：nextInt() 输入字母会抛 InputMismatchException',
      'nextInt 后 nextLine 读到空行，处理不当出错'
    ]
  }),

  // 单元2
  'java-kp-2-1': new KnowledgePoint({
    id: 'java-kp-2-1',
    title: '基本数据类型与变量',
    content: `## Java 两大数据类型
1. **基本类型 (Primitive)**：8种，存值本身
2. **引用类型 (Reference)**：对象、数组、String等，存地址

## 8种基本数据类型

### 整数
| 类型 | 字节 | 范围 |
|------|------|------|
| byte | 1 | -128 ~ 127 |
| short | 2 | -32768 ~ 32767 |
| **int** | 4 | -21亿 ~ 21亿 |
| **long** | 8 | -9e18 ~ 9e18 |

### 浮点数
| 类型 | 字节 | 说明 |
|------|------|------|
| float | 4 | 单精度，后面加 F 或 f |
| **double** | 8 | 双精度（默认） |

### 其他
- \`char\`：2字节，Unicode 字符（单引号）
- \`boolean\`：true/false，**不能用 0/1 代替**

## 类型转换
- **自动（隐式）**：小→大（byte→short→int→long→float→double）
- **强制（显式）**：大→小，可能丢失精度：\`int a = (int) 3.14;\``,
    codeExample: `public class DataTypeDemo {
    public static void main(String[] args) {
        // 整数
        byte b = 100;
        short s = 20000;
        int i = 1000000;
        long l = 8000000000L;  // long后面加 L
        
        // 浮点数
        float f = 3.14f;       // float后面加 f
        double d = 2.718281828;
        
        // 字符和布尔
        char c = 'A';
        char chinese = '中';   // Java char是Unicode，支持中文
        boolean bool = true;
        
        // String 是引用类型，不是基本类型
        String str = "Java 学习";
        
        // 类型转换
        double num = 3.99;
        int castInt = (int) num;  // 强制转换，截断小数不是四舍五入！
        
        System.out.println("强制转换 " + num + " → " + castInt);  // 3
        
        // 自动转换
        int small = 100;
        double big = small;  // 自动 int → double
        System.out.println("自动转换: " + big);
        
        // 字符运算（ASCII/Unicode值）
        System.out.println("A + 1 = " + (char)(c + 1));  // B
    }
}`,
    codeOutput: `强制转换 3.99 → 3
自动转换: 100.0
A + 1 = B`,
    tips: [
      '整数默认 int，所以 long 数值末尾加 L；浮点默认 double，float 末尾加 F',
      '(int) 强制转换小数是截断（直接丢掉小数部分），不是四舍五入',
      'Java 的 boolean 只能是 true/false，不能和 int 互相转换（和 C++ 不同！）',
      'char 是无符号的，占2字节，能存中文（Unicode 编码）'
    ],
    commonMistakes: [
      'long big = 8000000000; 不加 L：编译错误（太大的 int）',
      'float x = 3.14; 不加 f：编译错误（double 转 float 需要强制）',
      'if (flag = true) 赋值了不是判断（Java 会报错，因为 if 里必须是 boolean）',
      '中文符号：全角分号、引号，编译错误 "illegal character"'
    ]
  }),

  'java-kp-2-2': new KnowledgePoint({
    id: 'java-kp-2-2',
    title: '运算符',
    content: `## 运算符汇总

### 算术
+  -  *  /  %  ++  --
注意：整数除法取整，取余 % 仅整数

### 关系 (返回 boolean)
==  !=  >  <  >=  <=

### 逻辑 (操作 boolean，返回 boolean)
&& 短路与  |  两边真才真
|| 短路或  |  一边真就真
!  非

### 赋值
=  +=  -=  *=  /=  %=

### 三元运算符
条件 ? 值1 : 值2
条件真取值1，假取值2

## 字符串拼接 +
只要 + 一边有 String，结果就是 String：
\`"a" + 1 + 2 → "a12"\`
\`1 + 2 + "a" → "3a"\``,
    codeExample: `public class OperatorDemo {
    public static void main(String[] args) {
        int a = 17, b = 5;
        
        // 算术
        System.out.println("a + b = " + (a + b));  // 加括号防止拼接
        System.out.println("a - b = " + (a - b));
        System.out.println("a * b = " + a * b);
        System.out.println("a / b = " + a / b);    // 整数除法=3
        System.out.println("a % b = " + a % b);    // 取余=2
        
        // 自增
        int x = 5;
        System.out.println("x++ = " + x++);  // 5 后自增
        System.out.println("x = " + x);      // 6
        System.out.println("++x = " + ++x);  // 7 先自增
        
        // 三元运算符：求最大值
        int n1 = 10, n2 = 25;
        int max = (n1 > n2) ? n1 : n2;
        System.out.println("max(" + n1 + "," + n2 + ") = " + max);
        
        // 短路验证
        int i = 5;
        boolean result = (i < 3) && (++i > 0);  // 左边假，右边不执行
        System.out.println("短路后 i = " + i);   // 还是5！
        
        // 字符串拼接顺序
        System.out.println(1 + 2 + "Hello");    // 3Hello
        System.out.println("Hello" + 1 + 2);    // Hello12
    }
}`,
    codeOutput: `a + b = 22
a - b = 12
a * b = 85
a / b = 3
a % b = 2
x++ = 5
x = 6
++x = 7
max(10,25) = 25
短路后 i = 5
3Hello
Hello12`,
    tips: [
      '拼接和加法区分：(a + b) 加括号，否则先拼字符串再拼 b',
      '&& || 短路特性：能提高效率，但如果右边有副作用（如++i）要注意',
      '三元运算符适合简单赋值，复杂情况还是用 if-else',
      '比较字符串内容相等不能用 ==，要用 equals()（后面讲）'
    ],
    commonMistakes: [
      '17/5 以为是 3.4，实际是 3（整数除法），转浮点再除才对',
      '比较字符串用 ==，比较的是引用地址不是内容！',
      'if 条件里用了一个等号赋值（Java 会报错因为不是 boolean，别忽略提示）'
    ]
  }),

  // 单元3
  'java-kp-3-1': new KnowledgePoint({
    id: 'java-kp-3-1',
    title: '条件语句 if/switch',
    content: `## if-else 语句
\`\`\`java
if (条件1) {
    语句1;    // 条件1为true执行
} else if (条件2) {
    语句2;    // 条件2为true执行
} else {
    语句3;    // 都不满足执行
}
\`\`\`
注意：条件必须是 **boolean 类型**！不能写 if (1) 这种。

## switch 语句
支持的类型：byte, short, int, char, String(JDK7+), enum

\`\`\`java
switch (表达式) {
    case 值1: 语句; break;
    case 值2: 语句; break;
    default: 默认语句;
}
\`\`\`

**case 穿透**：没有 break 会继续执行下一个 case（可合理利用）。`,
    codeExample: `import java.util.Scanner;

public class IfSwitchDemo {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("输入分数: ");
        int score = sc.nextInt();
        
        // 1. if-else if-else 分等级
        char grade;
        if (score >= 90 && score <= 100) {
            grade = 'A';
        } else if (score >= 80) {
            grade = 'B';
        } else if (score >= 60) {
            grade = 'C';
        } else if (score >= 0) {
            grade = 'D';
        } else {
            grade = '?';
            System.out.println("分数不合法");
        }
        System.out.println("等级: " + grade);
        
        // 2. switch 示例：根据等级输出评语
        switch (grade) {
            case 'A':
                System.out.println("优秀！继续保持");
                break;
            case 'B':
                System.out.println("良好，再接再厉");
                break;
            case 'C':
                System.out.println("及格，加油提升");
                break;
            case 'D':
                System.out.println("不及格，需要努力！");
                break;
            default:
                System.out.println("无法评价");
        }
        
        // 3. 利用 case 穿透：周一到周五输出工作日
        System.out.print("输入星期(1-7): ");
        int day = sc.nextInt();
        switch (day) {
            case 1: case 2: case 3: case 4: case 5:
                System.out.println("工作日");
                break;
            case 6: case 7:
                System.out.println("周末");
                break;
            default:
                System.out.println("输入错误");
        }
        sc.close();
    }
}`,
    codeOutput: `输入分数: 85
等级: B
良好，再接再厉
输入星期(1-7): 6
周末`,
    tips: [
      'if 语句的花括号 {} 即使一条语句也建议写上，避免以后添加代码出错',
      'switch 每个分支最后记得 break，除非就是要穿透的效果',
      '从 JDK 7 开始 switch 可以用 String，但注意不能为 null',
      '区间判断用 if-else，离散值用 switch 更清晰'
    ],
    commonMistakes: [
      'if (a = 5) 在 Java 中直接编译错误（int 不能转 boolean），算你运气好',
      'switch 忘记 break：多个 case 连续执行，排查很久',
      'if 后面多余分号 if (x > 0); { ... } 后面的代码块永远执行',
      '判断浮点数相等：if (d == 3.14) 精度误差可能永远不相等'
    ]
  }),

  'java-kp-3-2': new KnowledgePoint({
    id: 'java-kp-3-2',
    title: '循环 for/while/do-while',
    content: `## 三种循环

### 1. for 循环（确定次数）
\`\`\`java
for (初始化; 条件; 更新) {
    循环体;
}
\`\`\`
执行：初始化 → [条件真→循环体→更新→条件...]

### 2. while 循环（不确定次数）
\`\`\`java
while (条件) {  // 先判断，条件真才执行
    循环体;
}
\`\`\`

### 3. do-while
\`\`\`java
do {
    循环体;  // 先执行一次！再判断
} while (条件);
\`\`\`

## 循环控制
- \`break\`：跳出当前循环
- \`continue\`：跳过本次，继续下一次循环

## 增强 for 循环（JDK5+）
遍历数组和集合非常方便：
\`for (元素类型 变量 : 数组或集合) { ... }\``,
    codeExample: `public class LoopDemo {
    public static void main(String[] args) {
        // 1. for循环：1~100求和
        int sum = 0;
        for (int i = 1; i <= 100; i++) {
            sum += i;
        }
        System.out.println("1~100和 = " + sum);
        
        // 2. 增强 for (遍历数组)
        int[] arr = {3, 1, 4, 1, 5, 9, 2, 6};
        int max = arr[0];
        for (int num : arr) {       // 不用写下标！
            if (num > max) max = num;
        }
        System.out.println("最大值 = " + max);
        
        // 3. while：统计输入的数字位数
        int n = 12345;
        int digits = 0;
        int temp = n;
        while (temp > 0) {
            temp = temp / 10;
            digits++;
        }
        System.out.println(n + " 是 " + digits + " 位数");
        
        // 4. break 和 continue：输出1~20的奇数，>15停止
        for (int i = 1; i <= 20; i++) {
            if (i > 15) break;       // 直接跳出循环
            if (i % 2 == 0) continue;// 偶数跳过
            System.out.print(i + " ");
        }
        System.out.println();
        
        // 5. 嵌套循环：九九乘法表
        for (int i = 1; i <= 9; i++) {
            for (int j = 1; j <= i; j++) {
                System.out.print(j + "×" + i + "=" + (i*j) + "\t");
            }
            System.out.println();
        }
    }
}`,
    codeOutput: `1~100和 = 5050
最大值 = 9
12345 是 5 位数
1 3 5 7 9 11 13 15 
1×1=1	
1×2=2	2×2=4	
1×3=3	2×3=6	3×3=9	
... 完整乘法表（略）`,
    tips: [
      '能确定循环次数优先用 for，否则用 while',
      '死循环写 for(;;) 或 while(true)，里面一定要有 break',
      '遍历数组优先用增强 for 循环（无下标，更简洁安全）',
      '嵌套循环控制：外层控制行，内层控制列（乘法表、打印图形）'
    ],
    commonMistakes: [
      'for (int i=0; i<=n; i++); 多余的分号，循环体其实是空语句',
      'while 循环中忘记更新条件变量 → 死循环',
      '数组增强 for 中修改循环变量不影响原数组（因为是值拷贝）',
      'break 只能跳出一层循环，多层循环需要标签或标志变量'
    ]
  }),

  // 单元4
  'java-kp-4-1': new KnowledgePoint({
    id: 'java-kp-4-1',
    title: '方法 (Method)',
    content: `## 方法的定义
方法是类中执行特定功能的代码块，类似 C++ 的函数，但必须在类中。

\`\`\`java
修饰符 返回类型 方法名(参数列表) {
    方法体;
    return 返回值;
}
\`\`\`

## 方法重载 (Overload)
同一类中方法名相同，参数列表不同（类型/个数/顺序不同）
**和返回类型无关！**

## 可变参数 (JDK5+)
\`void printAll(String... args)\`，可以传0个或多个String，本质是数组

## 参数传递
Java **只有值传递**：
- 基本类型：传值的副本
- 引用类型：传引用的副本（可修改对象内容，不能让引用指向新对象）`,
    codeExample: `public class MethodDemo {
    
    // 1. 有返回值的方法
    public static int add(int a, int b) {
        return a + b;
    }
    
    // 2. 无返回值 void
    public static void printBar(char c, int len) {
        for (int i = 0; i < len; i++) System.out.print(c);
        System.out.println();
    }
    
    // 3. 方法重载：同方法名，参数不同
    public static int max(int a, int b) {
        return a > b ? a : b;
    }
    public static double max(double a, double b) {
        return a > b ? a : b;
    }
    public static int max(int a, int b, int c) {
        return max(max(a, b), c);  // 调用另一个重载
    }
    
    // 4. 可变参数
    public static int sum(int... nums) {
        int s = 0;
        for (int n : nums) s += n;
        return s;
    }
    
    // 5. 递归：阶乘
    public static long factorial(int n) {
        if (n <= 1) return 1;             // 递归出口
        return n * factorial(n - 1);      // 递归调用
    }
    
    public static void main(String[] args) {
        // 调用方法
        System.out.println("3+5 = " + add(3, 5));
        printBar('=', 20);
        
        System.out.println("max(3.1, 2.5) = " + max(3.1, 2.5));
        System.out.println("max(3, 7, 5) = " + max(3, 7, 5));
        
        System.out.println("sum(1~5) = " + sum(1,2,3,4,5));
        System.out.println("sum(10) = " + sum(10));
        
        System.out.println("5! = " + factorial(5));
    }
}`,
    codeOutput: `3+5 = 8
====================
max(3.1, 2.5) = 3.1
max(3, 7, 5) = 7
sum(1~5) = 15
sum(10) = 10
5! = 120`,
    tips: [
      'main 方法是 static，所以上面的自定义方法也要加 static 才能直接调用',
      '方法职责单一，一个方法只做一件事（好读、好测、好改）',
      '方法名用动词开头：getXxx, setXxx, calculate, find, print',
      '递归一定要有出口条件，否则栈溢出 StackOverflowError'
    ],
    commonMistakes: [
      '返回类型不同不算重载！编译器报错 "method is already defined"',
      '返回值为 void 也写 return x; → 编译错误',
      '递归缺少终止条件 → StackOverflowError',
      '可变参数必须放在参数列表最后：method(int a, String... s)'
    ]
  }),

  // 单元5
  'java-kp-5-1': new KnowledgePoint({
    id: 'java-kp-5-1',
    title: '数组与字符串',
    content: `## 数组 Array
数组是同类型数据的集合，长度固定。

### 声明和创建
\`\`\`java
// 推荐写法
int[] arr1 = new int[5];          // 初始值为0
int[] arr2 = {1, 2, 3, 4, 5};     // 静态初始化
int[] arr3 = new int[]{1,2,3};    // 动态+初始化
\`\`\`

### 常用属性
- \`arr.length\`：数组长度（是属性不是方法！不带括号）
- 下标从 0 开始，到 length-1 结束
- 访问越界：ArrayIndexOutOfBoundsException

### 二维数组
\`int[][] matrix = new int[3][4];\`（3行4列）
每一行的长度也可以不同（锯齿数组）

## String 字符串
- 字符串是对象，不是基本类型
- 不可变（Immutable）：修改其实是创建新对象
- 字符串池（String Pool）优化相同内容的字符串

### String 常用方法
| 方法 | 说明 |
|------|------|
| .length() | 长度（注意有括号） |
| .charAt(i) | 取第i个字符 |
| .substring(s, e) | 截取（含s不含e） |
| .equals(s) | 比较内容相等 |
| .contains(s) | 是否包含 |
| .indexOf(s) | 查找位置 |
| .split(regex) | 分割成数组 |
| .toUpperCase/LowerCase | 大小写转换 |`,
    codeExample: `import java.util.Arrays;  // 数组工具类

public class ArrayStringDemo {
    public static void main(String[] args) {
        // ===== 数组 =====
        int[] scores = {85, 92, 78, 96, 88};
        System.out.println("长度: " + scores.length);
        
        // 遍历求和
        int total = 0;
        for (int s : scores) total += s;
        System.out.println("总分: " + total);
        System.out.println("均分: " + (double)total / scores.length);
        
        // 用 Arrays 工具类排序
        Arrays.sort(scores);
        System.out.println("排序后: " + Arrays.toString(scores));
        
        // 二维数组：3学生×3课程
        int[][] table = {
            {80, 85, 90},
            {92, 88, 95},
            {75, 82, 78}
        };
        for (int i = 0; i < table.length; i++) {
            int sum = 0;
            for (int s : table[i]) sum += s;
            System.out.printf("学生%d总分: %d%n", i + 1, sum);
        }
        
        // ===== String =====
        String s = "Hello, Java!";
        System.out.println("长度: " + s.length());
        System.out.println("第1个字符: " + s.charAt(0));
        System.out.println("截取[7,11): " + s.substring(7, 11));  // Java
        System.out.println("小写: " + s.toLowerCase());
        System.out.println("包含 Java: " + s.contains("Java"));
        
        // 字符串分割+拼接
        String csv = "苹果,香蕉,橘子,葡萄";
        String[] fruits = csv.split(",");
        for (String f : fruits) {
            System.out.print(f + " ");
        }
        System.out.println();
        
        // 字符串比较
        String a = new String("Hello");
        String b = new String("Hello");
        System.out.println("a == b: " + (a == b));       // false (地址不同)
        System.out.println("a.equals(b): " + a.equals(b)); // true  (内容相同)
    }
}`,
    codeOutput: `长度: 5
总分: 439
均分: 87.8
排序后: [78, 85, 88, 92, 96]
学生1总分: 255
学生2总分: 275
学生3总分: 235
长度: 12
第1个字符: H
截取[7,11): Java
小写: hello, java!
包含 Java: true
苹果 香蕉 橘子 葡萄 
a == b: false
a.equals(b): true`,
    tips: [
      '数组长度 length 是属性无括号；String 长度 length() 是方法有括号。记牢！',
      '比较字符串内容 **一定要用 .equals()**，== 比的是内存地址',
      'Arrays.sort() 排序是升序；要操作数组先 import java.util.Arrays',
      '拼接大量字符串用 StringBuilder（比 + 高效很多）'
    ],
    commonMistakes: [
      'if (str == "abc") 判断内容，大部分情况都是 false（坑了无数新人）',
      'scores[5] 访问越界：长度 5 只有 0~4',
      '数组 arr.toString() 输出的是奇怪的地址（要用 Arrays.toString(arr)）',
      '对字符串用 for 增强：Java 没有 for (char c : str)，要 for (int i=0; i<s.length(); i++)'
    ]
  }),

  // 单元6
  'java-kp-6-1': new KnowledgePoint({
    id: 'java-kp-6-1',
    title: '面向对象：类与对象',
    content: `## 类和对象
- **类 (Class)**：蓝图、模板（如 "人类"）
- **对象 (Object)**：类的实例（如 "张三" 这个人）

## 类的组成
### 成员变量（属性 / Field）
描述对象的数据。

### 成员方法（行为 / Method）
描述对象能做什么。

## 封装 (Encapsulation)
四步走：
1. 成员变量设为 \`private\`（私有，外部不能直接访问）
2. 提供 \`public\` 的 getter/setter 方法
3. 在 setter 中可以加数据校验

## 构造方法 (Constructor)
创建对象时调用的特殊方法：
- 方法名和类名完全相同
- 没有返回类型（连 void 也不能写）
- 可以重载（多个参数不同的构造方法）

## this 关键字
this 代表当前对象自己：
- this.成员变量：访问本对象的属性
- this(参数)：调用本类的其他构造方法（必须写在第一行）

## static 关键字
- static 成员属于**类**，不属于任何对象（全类只有一份）
- 非 static 方法可以访问 static；反之不行
- static 方法不能使用 this`,
    codeExample: `// 定义一个学生类
class Student {
    // 1. 私有属性（封装）
    private String name;
    private int age;
    private double score;
    
    // 静态属性：统计学生总数
    public static int count = 0;
    
    // 2. 无参构造方法
    public Student() {
        this("未命名", 0, 0);  // 调用有参构造（必须第1行）
    }
    
    // 3. 有参构造方法
    public Student(String name, int age, double score) {
        this.name = name;
        this.age = age;
        this.score = score;
        count++;  // 每创建一个学生，总数+1
    }
    
    // 4. Getter/Setter
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    
    public int getAge() { return age; }
    public void setAge(int age) {
        if (age >= 0 && age <= 150) {  // 合理的数据校验
            this.age = age;
        } else {
            System.out.println("年龄不合法");
        }
    }
    
    public double getScore() { return score; }
    public void setScore(double score) { this.score = score; }
    
    // 5. 成员方法
    public void study() {
        System.out.println(name + " 正在努力学习...");
        score += 5;
        if (score > 100) score = 100;
    }
    
    public void show() {
        System.out.printf("学生[姓名:%s, 年龄:%d, 分数:%.1f]%n",
            name, age, score);
    }
}

// 主类
public class OOPDemo {
    public static void main(String[] args) {
        // 创建对象
        Student s1 = new Student();   // 调用无参构造
        s1.setName("小红");
        s1.setAge(18);
        s1.setScore(85);
        
        Student s2 = new Student("小明", 19, 92.5);  // 调用有参构造
        
        s1.study();
        s1.show();
        s2.show();
        
        // 访问静态成员（类名.变量名 推荐）
        System.out.println("学生总数: " + Student.count);  // 2
    }
}`,
    codeOutput: `小红 正在努力学习...
学生[姓名:小红, 年龄:18, 分数:90.0]
学生[姓名:小明, 年龄:19, 分数:92.5]
学生总数: 2`,
    tips: [
      '类名首字母大写（PascalCase），方法和变量首字母小写（camelCase）',
      'IDE（Eclipse/IDEA）可以自动生成 getter/setter，不要手写',
      'static 方法里不能用 this，也不能直接访问非 static 成员',
      '常量用 public static final 修饰（全大写+下划线）'
    ],
    commonMistakes: [
      '构造方法写了返回值：void Student(){} → 变成了普通方法！',
      'getter/setter 写反（get 里赋值 set 里返回）',
      'static 方法调用非 static 方法：编译错误 non-static method cannot be referenced',
      'Student.count 在多个对象中是共享的，修改一个所有都受影响（就是这个特性）'
    ]
  }),

  'java-kp-6-2': new KnowledgePoint({
    id: 'java-kp-6-2',
    title: '继承与多态',
    content: `## 继承 (Inheritance)
子类 (子类/派生类) 继承父类 (基类/超类) 的属性和方法，达到代码复用。

\`\`\`java
class 子类 extends 父类 {
    // 新增自己的成员
}
\`\`\`

特点：
- Java 只支持 **单继承**（一个类只能有一个直接父类）
- 子类不能继承父类的 private 成员
- 构造方法先调用父类构造 \`super(...)\`（默认 super()）
- 所有类都直接或间接继承自 Object 类

## 方法重写 (Override)
子类重新定义父类的方法：方法名、参数、返回类型必须相同
- 访问权限不能更严格（public 不能变 protected）
- 加 \`@Override\` 注解让编译器检查

## 多态 (Polymorphism)
同一引用调用同一方法，根据实际对象类型执行不同实现
条件：1.继承 2.方法重写 3.父类引用指向子类对象

## 抽象类和接口
- **抽象类**：含 abstract 方法的类，不能实例化，子类必须实现抽象方法
- **接口 (Interface)**：全是抽象方法的规范（JDK8 后可有 default 方法），implements 实现，可多实现

## 访问修饰符
| 修饰符 | 同类 | 同包 | 子类 | 其他 |
|--------|------|------|------|------|
| public | ✓ | ✓ | ✓ | ✓ |
| protected | ✓ | ✓ | ✓ | ✗ |
| default(包) | ✓ | ✓ | ✗ | ✗ |
| private | ✓ | ✗ | ✗ | ✗ |`,
    codeExample: `import java.util.ArrayList;

// 抽象类：动物（抽象类不能 new）
abstract class Animal {
    protected String name;
    
    public Animal(String name) { this.name = name; }
    
    // 抽象方法：子类必须实现
    public abstract void makeSound();
    
    // 普通方法
    public void sleep() {
        System.out.println(name + " 在睡觉 zZ");
    }
}

// 接口：能跑
interface Runnable {
    void run();  // 默认 public abstract
}

// 子类：狗继承动物，实现跑步接口
class Dog extends Animal implements Runnable {
    public Dog(String name) { super(name); }  // 调父类构造
    
    @Override
    public void makeSound() {
        System.out.println(name + "：汪汪汪！");
    }
    
    @Override
    public void run() {
        System.out.println(name + " 四条腿飞快地跑");
    }
}

// 子类：鸟
class Bird extends Animal implements Runnable {
    public Bird(String name) { super(name); }
    
    @Override
    public void makeSound() {
        System.out.println(name + "：叽叽喳喳");
    }
    
    @Override
    public void run() {
        System.out.println(name + " 一跳一跳地走");
    }
    
    public void fly() {  // 子类独有方法
        System.out.println(name + " 飞上天空啦！");
    }
}

public class InheritanceDemo {
    public static void main(String[] args) {
        // 多态：父类引用指向子类对象
        Animal[] animals = {
            new Dog("旺财"),
            new Bird("小黄"),
            new Dog("大黑")
        };
        
        // 统一处理：一个接口，多种实现
        for (Animal a : animals) {
            a.makeSound();  // 调用各自重写的方法
            a.sleep();
            // a.fly();       // 报错：Animal 没有 fly 方法
            System.out.println("---");
        }
        
        // instanceof 判断真实类型 + 向下转型
        for (Animal a : animals) {
            if (a instanceof Bird) {
                Bird b = (Bird) a;  // 向下转型（强转）
                b.fly();            // 才能调用子类独有方法
            }
        }
        
        // 接口多态
        Runnable[] runners = {new Dog("旺财"), new Bird("小黄")};
        for (Runnable r : runners) {
            r.run();
        }
    }
}`,
    codeOutput: `旺财：汪汪汪！
旺财 在睡觉 zZ
---
小黄：叽叽喳喳
小黄 在睡觉 zZ
---
大黑：汪汪汪！
大黑 在睡觉 zZ
---
小黄 飞上天空啦！
旺财 四条腿飞快地跑
小黄 一跳一跳地走`,
    tips: [
      '重写方法加 @Override 注解，让编译器帮忙检查拼写错误',
      '设计原则：面向抽象（接口/抽象类）编程，而非面向具体实现',
      '多用组合，少用继承（继承的耦合度高）',
      'instanceof + 强转：只有确定是该类型才强转，否则 ClassCastException'
    ],
    commonMistakes: [
      '方法重写时参数不一样，结果变成了重载（用 @Override 检测）',
      '子类构造没写 super(参数)，默认调 super()，父类没有无参构造→编译错',
      '父类引用 a.fly() 调用子类独有的方法：编译错误（编译看左边）',
      '没有判断 instanceof 就强转 Bird b = (Bird) animal，不是鸟的话运行报错'
    ]
  }),

  // 单元7
  'java-kp-7-1': new KnowledgePoint({
    id: 'java-kp-7-1',
    title: '集合框架 (List/Map/Set)',
    content: `## Java 集合框架概览
相比数组，集合的优势是：**大小可变**、**提供丰富方法**、**多种数据结构**

### 三大核心接口
| 接口 | 特点 | 常用实现 |
|------|------|----------|
| **List** | 有序、可重复 | ArrayList, LinkedList |
| **Set** | 无序、不重复 | HashSet, TreeSet |
| **Map** | Key-Value 键值对 | HashMap, TreeMap |

## ArrayList 动态数组（最常用）
- 优点：get/set 快
- 缺点：中间增删慢

常用方法：add/get/set/remove/size/contains/isEmpty/clear/toArray

## HashMap 哈希字典
- put/get/remove/containsKey/containsValue/size/keySet/values
- 键不重复，重复 put 会覆盖旧值

## 泛型 `<T>`
限定集合中存储的数据类型，避免强转：
\`List<String> list = new ArrayList<>();\`  // list 只能存 String

## 遍历集合
- 增强 for：\`for (元素 e : 集合)\`
- 迭代器 Iterator
- Map 遍历：keySet() 或 entrySet()`,
    codeExample: `import java.util.*;

public class CollectionDemo {
    public static void main(String[] args) {
        // ===== 1. List: ArrayList =====
        List<String> names = new ArrayList<>();
        names.add("小明");
        names.add("小红");
        names.add("小刚");
        names.add(1, "小丽");  // 指定位置插入
        
        System.out.println("List大小: " + names.size());
        System.out.println("第2个: " + names.get(1));
        
        // 遍历 ArrayList
        System.out.println("--- 学生名单 ---");
        for (String n : names) System.out.println(n);
        
        // ===== 2. Set: HashSet (去重+无序) =====
        Set<Integer> set = new HashSet<>();
        int[] nums = {5, 2, 8, 2, 5, 1, 9, 1, 5};
        for (int n : nums) set.add(n);
        System.out.println("--- Set去重 ---");
        System.out.println(set);  // 无重复元素
        System.out.println("是否包含5: " + set.contains(5));
        
        // ===== 3. Map: HashMap 词频统计 =====
        String text = "hello java hello world hello java code";
        String[] words = text.split(" ");
        
        Map<String, Integer> freq = new HashMap<>();
        for (String w : words) {
            // 经典写法：getOrDefault
            freq.put(w, freq.getOrDefault(w, 0) + 1);
        }
        
        System.out.println("--- 词频统计 ---");
        // 遍历 Map: entrySet() (最高效)
        for (Map.Entry<String, Integer> entry : freq.entrySet()) {
            System.out.println(entry.getKey() + " → " + entry.getValue() + "次");
        }
        
        // ===== 4. Collections 工具类 =====
        List<Integer> list = new ArrayList<>(Arrays.asList(3, 1, 4, 1, 5, 9, 2, 6));
        Collections.sort(list);           // 排序
        Collections.reverse(list);        // 反转
        int max = Collections.max(list);  // 最大值
        int min = Collections.min(list);  // 最小值
        System.out.println("排序反转后: " + list);
        System.out.println("最大最小: " + max + "," + min);
    }
}`,
    codeOutput: `List大小: 4
第2个: 小丽
--- 学生名单 ---
小明
小丽
小红
小刚
--- Set去重 ---
[1, 2, 5, 8, 9]
是否包含5: true
--- 词频统计 ---
java → 2次
code → 1次
world → 1次
hello → 3次
排序反转后: [9, 6, 5, 4, 3, 2, 1, 1]
最大最小: 9,1`,
    tips: [
      '声明类型用接口 List/Map/Set，创建用实现类（多态）：List<String> = new ArrayList<>()',
      'JDK7+ 右边泛型可不写：new ArrayList<>()（钻石操作符）',
      'List 转数组用 toArray()，数组转 List 用 Arrays.asList()',
      'HashMap 的 key 不能是基本类型，要用包装类（Integer, Double...）'
    ],
    commonMistakes: [
      'List list = new ArrayList(); 没用泛型，取出来要强转，还会混入不同类型',
      '边遍历 ArrayList 边 remove(元素) → ConcurrentModificationException（用迭代器 remove 或倒序删）',
      'HashSet 存自定义对象要重写 equals() 和 hashCode()，否则不能去重',
      'HashMap 的 key 为自定义类对象也需要重写两个方法'
    ]
  }),

  // 单元8
  'java-kp-8-1': new KnowledgePoint({
    id: 'java-kp-8-1',
    title: '异常处理与文件I/O',
    content: `## 异常 Exception
程序运行时出现的错误，不处理会让程序直接崩溃。

### 异常体系
- Throwable (父类)
  - Error（严重错误，如内存溢出，一般不处理）
  - Exception（程序可处理的异常）
    - RuntimeException（运行时异常，可避免：空指针、数组越界）
    - Checked Exception（编译时必须处理：IO异常、SQL异常）

### 异常处理 try-catch-finally
\`\`\`java
try {
    可能出异常的代码;
} catch (异常类型1 e) {
    处理方式1;
} catch (异常类型2 e) {
    处理方式2;
} finally {
    无论是否异常都会执行（通常关资源）;
}
\`\`\`

### 声明抛出 throws
方法里不处理，抛给调用者：
\`void readFile() throws IOException { ... }\`

### 手动抛出 throw
\`throw new IllegalArgumentException("参数错误");\`

## 文件 I/O
### 文本文件读取
- FileReader + BufferedReader（逐行读 readLine()）
- JDK11+：Files.readString(Path) 一行搞定

### 文本文件写入
- FileWriter + BufferedWriter / PrintWriter

### try-with-resources (推荐)
JDK7+ 自动关闭资源，不用 finally 手动关：
\`try (BufferedReader br = new BufferedReader(...)) { ... }\``,
    codeExample: `import java.io.*;
import java.nio.file.*;
import java.util.*;

public class ExceptionIODemo {
    
    // ==== 异常基础 ====
    public static int safeDivide(int a, int b) {
        try {
            return a / b;              // 可能 ArithmeticException
        } catch (ArithmeticException e) {
            System.out.println("除数不能为0！");
            System.out.println("错误信息: " + e.getMessage());
            return 0;
        } finally {
            System.out.println("--- 除法计算结束 ---");  // 必定执行
        }
    }
    
    // ==== 写文件 ====
    public static void writeStudents() throws IOException {
        // try-with-resources：自动关闭 bw
        try (BufferedWriter bw = new BufferedWriter(
            new FileWriter("students.txt"))) {
            
            bw.write("小明,85"); bw.newLine();
            bw.write("小红,92"); bw.newLine();
            bw.write("小刚,78"); bw.newLine();
            bw.write("小丽,96"); bw.newLine();
        }
        System.out.println("写入学生数据完成！");
    }
    
    // ==== 读文件并统计 ====
    public static void readAndAnalyze() throws IOException {
        List<String> names = new ArrayList<>();
        List<Integer> scores = new ArrayList<>();
        
        try (BufferedReader br = new BufferedReader(
            new FileReader("students.txt"))) {
            
            String line;
            while ((line = br.readLine()) != null) {  // 每行直到null=文件末尾
                String[] parts = line.split(",");
                names.add(parts[0]);
                scores.add(Integer.parseInt(parts[1]));
            }
        }
        
        System.out.println("--- 学生成绩 ---");
        int sum = 0, maxIdx = 0;
        for (int i = 0; i < names.size(); i++) {
            System.out.println(names.get(i) + ": " + scores.get(i));
            sum += scores.get(i);
            if (scores.get(i) > scores.get(maxIdx)) maxIdx = i;
        }
        
        System.out.println("--- 统计 ---");
        System.out.println("平均分: " + (double)sum / names.size());
        System.out.println("最高分: " + names.get(maxIdx) + "(" + scores.get(maxIdx) + ")");
    }
    
    public static void main(String[] args) {
        // 测试异常处理
        System.out.println("5/2 = " + safeDivide(5, 2));
        System.out.println("5/0 = " + safeDivide(5, 0));
        
        // 文件操作（throws IOException 的方法这里也得处理/声明）
        try {
            writeStudents();
            readAndAnalyze();
        } catch (IOException e) {
            System.out.println("文件操作出错: " + e.getMessage());
            e.printStackTrace();
        }
    }
}`,
    codeOutput: `5/2 = 2
--- 除法计算结束 ---
除数不能为0！
错误信息: / by zero
--- 除法计算结束 ---
5/0 = 0
写入学生数据完成！
--- 学生成绩 ---
小明: 85
小红: 92
小刚: 78
小丽: 96
--- 统计 ---
平均分: 87.75
最高分: 小丽(96)`,
    tips: [
      '处理流永远用 try-with-resources，自动关闭，避免内存泄漏',
      'catch 范围从小到大（先子类后父类），不要一上来就 catch (Exception e)',
      '捕获异常后不要空 catch {}！至少打印 e.printStackTrace() 方便排查',
      '读中文文件注意编码，JDK18+ 默认 UTF-8，老版本 Windows 可能是 GBK'
    ],
    commonMistakes: [
      '创建了 BufferedReader 没 close → 资源泄漏',
      'FileWriter 默认是覆盖，要追加需 new FileWriter(name, true)',
      'catch (NullPointerException e) 然后空处理：问题被掩盖',
      '方法 throws Exception 太宽泛，调用者不好处理，应该抛具体类型'
    ]
  }),
};

const javaProblems = {
  // 单元1
  'java-p-1-1': new Problem({
    id: 'java-p-1-1',
    title: 'Hello Java',
    type: ProblemType.CODE_COMPLETE,
    difficulty: Difficulty.BEGINNER,
    description: '补全代码，输出 "Hello, Java!"',
    codeTemplate: `public class HelloJava {
    public static void ____(String[] args) {
        System.____.println("Hello, Java!");
    }
}`,
    answer: 'main, out',
    hints: [
      '第一个空是程序入口的方法名',
      '第二个空：System后面的输出对象',
      '入口方法签名是 public static void main'
    ],
    knowledgePointIds: ['java-kp-1-1'],
    explanation: 'main 方法是入口方法。System.out 是标准输出流对象。两个空分别是 main 和 out。'
  }),

  'java-p-1-2': new Problem({
    id: 'java-p-1-2',
    title: 'Java 入口方法',
    type: ProblemType.MULTIPLE_CHOICE,
    difficulty: Difficulty.BEGINNER,
    description: '下列哪个是 Java 程序的正确入口方法签名？',
    options: [
      'A. public void main(String args)',
      'B. public static void Main(String[] args)',
      'C. public static void main(String[] args)',
      'D. static void main(string[] args)'
    ],
    answer: 'C',
    hints: [
      '入口方法必须是 public static void',
      '方法名必须是小写 main（区分大小写）',
      '参数是 String 数组，首字母大写 String',
      'A 参数不是数组；B Main 大写了；D string 小写了'
    ],
    knowledgePointIds: ['java-kp-1-1'],
    explanation: 'C 是标准签名。A 参数不对，B 方法名大写，D string 小写（Java 区分大小写，String 是类名必须大写）。'
  }),

  'java-p-1-3': new Problem({
    id: 'java-p-1-3',
    title: '输入输出计算A+B',
    type: ProblemType.CODE_WRITE,
    difficulty: Difficulty.BEGINNER,
    description: '编写完整程序：读入两个整数，输出它们的和。\n\n输入样例：3 5\n输出样例：8',
    codeTemplate: '',
    answer: 'import java.util.Scanner;\n\npublic class SumAB {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int a = sc.nextInt();\n        int b = sc.nextInt();\n        System.out.println(a + b);\n        sc.close();\n    }\n}',
    hints: [
      '必须 import java.util.Scanner',
      '创建 Scanner：Scanner sc = new Scanner(System.in);',
      'nextInt() 读整数，两个整数可以连续读',
      '用 System.out.println(a + b) 输出结果'
    ],
    knowledgePointIds: ['java-kp-1-1', 'java-kp-1-2'],
    explanation: '标准 A+B 题：导入Scanner → 创建对象 → 两个 nextInt() → 相加 println 输出。'
  }),

  // 单元2
  'java-p-2-1': new Problem({
    id: 'java-p-2-1',
    title: '数据类型范围',
    type: ProblemType.MULTIPLE_CHOICE,
    difficulty: Difficulty.BASIC,
    description: '存储一个人的出生年份（如 2005），最节省空间又够用的类型是？',
    options: [
      'A. byte',
      'B. short',
      'C. int',
      'D. long'
    ],
    answer: 'B',
    hints: [
      'byte 范围 -128~127，不够',
      'short 范围 -32768~32767，年份足够',
      'int 和 long 虽然也行，但题目要求"最节省"',
      'short 占2字节，int 占4字节'
    ],
    knowledgePointIds: ['java-kp-2-1'],
    explanation: 'short 范围 -32768~32767，可以存公元 1~32767 年的年份，2字节最节省。byte不够，int/long浪费。'
  }),

  'java-p-2-2': new Problem({
    id: 'java-p-2-2',
    title: '表达式结果',
    type: ProblemType.FILL_BLANK,
    difficulty: Difficulty.BASIC,
    description: '表达式的值：\n(1) 7 / 2 = ______\n(2) 7 % 2 = ______\n(3) (double)7 / 2 = ______',
    answer: '3, 1, 3.5',
    hints: [
      'int / int 结果还是 int，小数截断',
      '% 是取余（除法余数）',
      '先把 7 转成 double，再除以 2，就会浮点除法',
      '3 余数 1 → 7/2=3 余1，所以分别是 3, 1, 3.5'
    ],
    knowledgePointIds: ['java-kp-2-1', 'java-kp-2-2'],
    explanation: '整数除法 7/2=3；取余 7%2=1；强制转换后 (double)7/2 = 7.0/2 = 3.5。'
  }),

  'java-p-2-3': new Problem({
    id: 'java-p-2-3',
    title: '温度转换',
    type: ProblemType.CODE_WRITE,
    difficulty: Difficulty.BASIC,
    description: '输入摄氏温度 C，输出对应的华氏温度 F。\n公式：F = C * 9 / 5 + 32\n输出保留 2 位小数。',
    codeTemplate: '',
    answer: 'import java.util.Scanner;\n\npublic class TempConvert {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        double c = sc.nextDouble();\n        double f = c * 9 / 5 + 32;\n        System.out.printf("%.2f%n", f);\n    }\n}',
    hints: [
      '温度是小数，用 double',
      '直接按公式计算 F = C * 9 / 5 + 32',
      'C 是 double，9/5 运算中自动转 double，不用手动转',
      '保留2位小数用 printf("%.2f", f)'
    ],
    knowledgePointIds: ['java-kp-1-2', 'java-kp-2-1', 'java-kp-2-2'],
    explanation: '读取 double，按公式计算，printf 格式化 %.2f 保留两位小数。注意公式顺序：先乘9再除5才对。'
  }),

  // 单元3
  'java-p-3-1': new Problem({
    id: 'java-p-3-1',
    title: '三元运算符',
    type: ProblemType.FILL_BLANK,
    difficulty: Difficulty.BASIC,
    description: '用一个表达式求 a 和 b 的绝对值较大者：\n\nint result = ______ ;\n\n填入表达式（假设a和b已声明，Math.abs(x) 返回x绝对值）',
    answer: 'Math.abs(a) > Math.abs(b) ? a : b',
    hints: [
      '用三元运算符：条件 ? a : b',
      '比较 Math.abs(a) 和 Math.abs(b) 哪个大',
      '如果 abs(a) > abs(b)，返回 a，否则返回 b'
    ],
    knowledgePointIds: ['java-kp-2-2', 'java-kp-3-1'],
    explanation: '用三元运算符，条件是 Math.abs(a) > Math.abs(b)，真返回 a，假返回 b。'
  }),

  'java-p-3-2': new Problem({
    id: 'java-p-3-2',
    title: '百钱买百鸡',
    type: ProblemType.CODE_WRITE,
    difficulty: Difficulty.INTERMEDIATE,
    description: '公鸡5元1只，母鸡3元1只，小鸡1元3只。用100元买100只鸡，有多少种买法？\n\n（经典枚举题，每种至少买0只，输出每种方案及总方案数）',
    codeTemplate: '',
    answer: 'public class Chickens {\n    public static void main(String[] args) {\n        int count = 0;\n        for (int x = 0; x <= 20; x++) {\n            for (int y = 0; y <= 33; y++) {\n                int z = 100 - x - y;\n                if (z >= 0 && z % 3 == 0 && 5*x + 3*y + z/3 == 100) {\n                    System.out.printf("公鸡:%d, 母鸡:%d, 小鸡:%d%n", x, y, z);\n                    count++;\n                }\n            }\n        }\n        System.out.println("共 " + count + " 种买法");\n    }\n}',
    hints: [
      '三重循环太暴力：双重循环枚举公鸡(x)母鸡(y)，小鸡z=100-x-y',
      '公鸡最多20只，母鸡最多33只',
      '条件：z 必须 >=0 且能被3整除（小鸡1元3只），总价=100',
      '5x + 3y + z/3 == 100（z是3的倍数，所以z/3才是整数元）'
    ],
    knowledgePointIds: ['java-kp-3-1', 'java-kp-3-2'],
    explanation: '穷举 x∈[0,20] y∈[0,33]，z=100-x-y，检查 z>=0, z%3==0（小鸡必须是3的倍数才能算整钱），总价=100。结果有4种方案。'
  }),

  'java-p-3-3': new Problem({
    id: 'java-p-3-3',
    title: '斐波那契数列',
    type: ProblemType.CODE_COMPLETE,
    difficulty: Difficulty.BASIC,
    description: '补全代码，输出斐波那契数列前n项（n≥1）。\n数列：1, 1, 2, 3, 5, 8, 13, 21...（后一项=前两项之和）',
    codeTemplate: `// n从输入读取
int a = 1, b = 1;
System.out.print(a + " ");
for (int i = 2; i <= n; i++) {
    System.out.print(____);
    int next = a + b;
    a = ____;
    b = ____;
}`,
    answer: 'b + \" \", b, next',
    hints: [
      '第一个输出 a=1，循环从i=2开始输出 b（第2项也是1）',
      '每次循环先输出 b',
      '然后计算下一个数 next = a+b，接着更新 a 和 b：',
      'a 变成旧的 b，b 变成新的 next'
    ],
    knowledgePointIds: ['java-kp-3-2'],
    explanation: '第1次循环输出 b=1（第2项），next=2，a=1→b，b=1→next=2。下次输出 b=2... 以此类推。答案：b+" "、b、next。'
  }),

  // 单元4
  'java-p-4-1': new Problem({
    id: 'java-p-4-1',
    title: '方法重载',
    type: ProblemType.MULTIPLE_CHOICE,
    difficulty: Difficulty.INTERMEDIATE,
    description: '下列哪一组不是方法重载（会有编译错误）？\n\nclass Test {}\n\n选项：',
    options: [
      'A. void m(int x) {} 和 void m(double x) {}',
      'B. int m(int x) {} 和 double m(int x) {}',
      'C. void m(int x, int y) {} 和 void m(int x) {}',
      'D. void m(String s) {} 和 void m(int x) {}'
    ],
    answer: 'B',
    hints: [
      '方法重载判断：方法名相同，参数列表必须不同',
      '参数列表不同：类型不同 OR 个数不同 OR 顺序不同',
      '返回类型不同不算重载！',
      'B 选项参数完全相同，只是返回值不一样 → 重复定义'
    ],
    knowledgePointIds: ['java-kp-4-1'],
    explanation: 'B 正确答案。参数列表都为 (int x) 相同，仅返回类型不同不构成重载，编译器报错重复方法。'
  }),

  'java-p-4-2': new Problem({
    id: 'java-p-4-2',
    title: '写方法：判断素数',
    type: ProblemType.CODE_WRITE,
    difficulty: Difficulty.INTERMEDIATE,
    description: '编写方法 boolean isPrime(int n)，判断 n 是否为素数（质数）。在 main 中输入一个整数，调用 isPrime 输出 YES 或 NO。\n\n素数：大于1，且只能被1和自己整除的整数。',
    codeTemplate: '',
    answer: 'import java.util.Scanner;\n\npublic class PrimeCheck {\n    public static boolean isPrime(int n) {\n        if (n < 2) return false;\n        for (int i = 2; i * i <= n; i++) {\n            if (n % i == 0) return false;\n        }\n        return true;\n    }\n    \n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        System.out.println(isPrime(n) ? "YES" : "NO");\n    }\n}',
    hints: [
      'n < 2 肯定不是素数（返回 false）',
      '从 2 开始判断能否整除 n，到 sqrt(n) 就够了（不用到 n-1）',
      '循环条件写 i * i <= n 避免开方',
      '只要发现一个 i 能整除 n，立刻 return false。循环完都没返回，说明是素数 return true'
    ],
    knowledgePointIds: ['java-kp-4-1', 'java-kp-3-2'],
    explanation: 'isPrime 方法：先判断 n<2。循环 i 从 2 到 sqrt(n)，若 n%i==0 则非素数。循环完成则是素数。main 用三元运算符输出。'
  }),

  // 单元5
  'java-p-5-1': new Problem({
    id: 'java-p-5-1',
    title: 'String常用方法',
    type: ProblemType.FILL_BLANK,
    difficulty: Difficulty.BASIC,
    description: 'String s = "Hello, World!";\n\ns.length() = ______\ns.substring(7, 12) = ______\ns.indexOf("o") = ______\ns.toUpperCase().charAt(1) = ______',
    answer: '13, World, 4, E',
    hints: [
      '数一下 Hello, World! 的字符数：H e l l o ,  W o r l d ! = 13个',
      'substring(7,12)：从第7位（W）取到12之前（不含12），即索引7~11',
      'indexOf("o")：第一个 o 出现的位置。H(0)e(1)l(2)l(3)o(4)... → 4',
      'toUpperCase() 是 "HELLO, WORLD!"，charAt(1) 是第二个字符'
    ],
    knowledgePointIds: ['java-kp-5-1'],
    explanation: '长度=13。substring(7,12)索引7~11字符=World。第一个o索引4。toUpperCase后charAt(1)是大写E。'
  }),

  'java-p-5-2': new Problem({
    id: 'java-p-5-2',
    title: '数组反转',
    type: ProblemType.CODE_COMPLETE,
    difficulty: Difficulty.INTERMEDIATE,
    description: '补全代码：将数组 arr 原地反转（前后对称交换）。',
    codeTemplate: `int n = arr.length;
for (int i = 0; i < ____; i++) {
    int temp = arr[i];
    arr[i] = arr[____];
    arr[____] = temp;
}`,
    answer: 'n / 2, n - 1 - i, n - 1 - i',
    hints: [
      '只用交换前一半和后一半，否则交换两次还原',
      '循环条件 i < n/2 就停止',
      'i 位置 和 (n-1-i) 位置交换：如第0个和最后一个，第1个和倒数第二...',
      '2、3空都是 n-1-i'
    ],
    knowledgePointIds: ['java-kp-5-1'],
    explanation: 'n/2 次交换就够。i 对应 n-1-i。经典两头交换算法，和C++相同。'
  }),

  'java-p-5-3': new Problem({
    id: 'java-p-5-3',
    title: '字符串比较',
    type: ProblemType.MULTIPLE_CHOICE,
    difficulty: Difficulty.BASIC,
    description: 'String s1 = new String("abc");\nString s2 = new String("abc");\n\n下列说法正确的是？',
    options: [
      'A. s1 == s2 为 true，s1.equals(s2) 为 true',
      'B. s1 == s2 为 false，s1.equals(s2) 为 true',
      'C. s1 == s2 为 true，s1.equals(s2) 为 false',
      'D. s1 == s2 为 false，s1.equals(s2) 为 false'
    ],
    answer: 'B',
    hints: [
      '== 比较的是引用地址（是否同一个对象）',
      'new String() 每次都创建新对象，所以 s1 s2 地址不同',
      '.equals() 比较的是字符串内容是否相等',
      '内容都是 "abc"，所以相等'
    ],
    knowledgePointIds: ['java-kp-5-1'],
    explanation: 'B 正确。== 比地址：两个 new 出来的对象地址不同→false。equals 比内容：都是 "abc"→true。'
  }),

  // 单元6
  'java-p-6-1': new Problem({
    id: 'java-p-6-1',
    title: 'static 成员',
    type: ProblemType.FILL_BLANK,
    difficulty: Difficulty.INTERMEDIATE,
    description: '下面代码的输出是两行数字，依次是______和______\n\n```java\nclass Test {\n    static int x = 0;\n    int y = 0;\n    public Test() { x++; y++; }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Test t1 = new Test();\n        Test t2 = new Test();\n        Test t3 = new Test();\n        System.out.println(t3.x);\n        System.out.println(t3.y);\n    }\n}\n```',
    answer: '3, 1',
    hints: [
      'x 是 static，全类共享，三个对象的 x 都是同一个变量',
      '构造方法被调用3次，所以 x++ 执行了3次，x=3',
      'y 是非 static，每个对象有自己的一份',
      't3 是第三个对象，自己的 y++ 了一次，y=1'
    ],
    knowledgePointIds: ['java-kp-6-1'],
    explanation: 'x 是 static 共享变量：每次构造 +1，3次后 x=3。y 是实例变量：每个对象自己的，t3 的 y 只在自己构造时 +1 次=1。输出 3 和 1。'
  }),

  'java-p-6-2': new Problem({
    id: 'java-p-6-2',
    title: '多态调用顺序',
    type: ProblemType.MULTIPLE_CHOICE,
    difficulty: Difficulty.INTERMEDIATE,
    description: 'class A { void f() { System.out.print("A"); } }\nclass B extends A { void f() { System.out.print("B"); } }\n\nA obj = new B();\nobj.f();\n\n输出结果？',
    options: [
      'A. A',
      'B. B',
      'C. 先A后B',
      'D. 编译错误'
    ],
    answer: 'B',
    hints: [
      '多态：编译看左边（A），运行看右边（B对象）',
      '实际运行的是真正创建的对象的方法',
      'new B() 创建的是 B 对象',
      '所以调用的是 B 类重写过的 f()'
    ],
    knowledgePointIds: ['java-kp-6-2'],
    explanation: '多态口诀：编译看左，运行看右。obj 引用的实际对象是 B，运行时调用 B 的 f()，输出 B。'
  }),

  // 单元7
  'java-p-7-1': new Problem({
    id: 'java-p-7-1',
    title: 'List删除元素',
    type: ProblemType.MULTIPLE_CHOICE,
    difficulty: Difficulty.INTERMEDIATE,
    description: '下列删除 ArrayList 中所有偶数的方法，哪个会出现 ConcurrentModificationException 并发修改异常？',
    options: [
      'A. 用 Iterator 迭代 + it.remove()',
      'B. 普通 for 循环从后往前删',
      'C. 增强 for 循环中 list.remove(Integer.valueOf(x))',
      'D. JDK8+ 用 list.removeIf(x -> x%2==0)'
    ],
    answer: 'C',
    hints: [
      'Iterator.remove() 是安全的，专门设计的',
      '倒序删不会影响未遍历的元素下标，可行',
      '增强 for 本质是 Iterator 遍历，但你调用 list.remove(外部) 会触发 fail-fast',
      'removeIf 是 Java8 添加的方法，安全可靠'
    ],
    knowledgePointIds: ['java-kp-7-1'],
    explanation: 'C 会抛并发修改异常。增强 for 遍历时集合结构被改变（list.remove），触发 fail-fast 机制。A、B、D 都是正确删除方法。'
  }),

  // 单元8
  'java-p-8-1': new Problem({
    id: 'java-p-8-1',
    title: '异常处理顺序',
    type: ProblemType.MULTIPLE_CHOICE,
    difficulty: Difficulty.INTERMEDIATE,
    description: 'try块可能抛 ExceptionA（Exception子类）和ExceptionB（Exception子类）。\n下列 catch 顺序正确的是？',
    options: [
      'A. 先 catch(Exception) 再 catch(ExceptionA)',
      'B. 先 catch(ExceptionA) 再 catch(Exception) 再 catch(ExceptionB)',
      'C. 先 catch(ExceptionA) 再 catch(ExceptionB) 最后 catch(Exception)',
      'D. 只 catch(RuntimeException) 就够了'
    ],
    answer: 'C',
    hints: [
      'catch 必须从具体到宽泛（子类在前，父类在后）',
      '如果先 catch(Exception)，后面的子类 catch 永远执行不到',
      'ExceptionA 和 ExceptionB 是兄弟，谁前谁后都行，最后 Exception 兜底',
      'A异常和B异常不一定是 RuntimeException，D太片面'
    ],
    knowledgePointIds: ['java-kp-8-1'],
    explanation: 'C 正确。先具体子类 ExceptionA, ExceptionB，最后父类 Exception 兜底。A顺序错会报 unreachable catch。D 会让 Checked Exception 漏网。'
  }),
};

const javaUnits = [
  new LearningUnit({
    id: 'java-u-1',
    title: '第1章：Java 入门',
    description: '认识 Java，理解 JVM，学会输入输出，编写第一个完整程序',
    difficulty: Difficulty.BEGINNER,
    order: 1,
    knowledgePoints: [javaKnowledgePoints['java-kp-1-1'], javaKnowledgePoints['java-kp-1-2']],
    problems: [javaProblems['java-p-1-1'], javaProblems['java-p-1-2'], javaProblems['java-p-1-3']]
  }),

  new LearningUnit({
    id: 'java-u-2',
    title: '第2章：数据类型与运算符',
    description: '掌握8种基本类型和各种运算，写简单的计算类程序',
    difficulty: Difficulty.BASIC,
    order: 2,
    knowledgePoints: [javaKnowledgePoints['java-kp-2-1'], javaKnowledgePoints['java-kp-2-2']],
    problems: [javaProblems['java-p-2-1'], javaProblems['java-p-2-2'], javaProblems['java-p-2-3']]
  }),

  new LearningUnit({
    id: 'java-u-3',
    title: '第3章：流程控制',
    description: 'if/switch 分支判断，for/while 循环解决实际问题',
    difficulty: Difficulty.BASIC,
    order: 3,
    knowledgePoints: [javaKnowledgePoints['java-kp-3-1'], javaKnowledgePoints['java-kp-3-2']],
    problems: [javaProblems['java-p-3-1'], javaProblems['java-p-3-2'], javaProblems['java-p-3-3']]
  }),

  new LearningUnit({
    id: 'java-u-4',
    title: '第4章：方法（Method）',
    description: '把代码封装成可复用的方法，掌握方法重载与递归',
    difficulty: Difficulty.BASIC,
    order: 4,
    knowledgePoints: [javaKnowledgePoints['java-kp-4-1']],
    problems: [javaProblems['java-p-4-1'], javaProblems['java-p-4-2']]
  }),

  new LearningUnit({
    id: 'java-u-5',
    title: '第5章：数组与字符串',
    description: '数组批量存储数据，String 类的常用方法和正确姿势',
    difficulty: Difficulty.BASIC,
    order: 5,
    knowledgePoints: [javaKnowledgePoints['java-kp-5-1']],
    problems: [javaProblems['java-p-5-1'], javaProblems['java-p-5-2'], javaProblems['java-p-5-3']]
  }),

  new LearningUnit({
    id: 'java-u-6',
    title: '第6章：面向对象核心',
    description: '类与对象、封装、继承、多态，Java 面向对象彻底搞懂',
    difficulty: Difficulty.INTERMEDIATE,
    order: 6,
    knowledgePoints: [javaKnowledgePoints['java-kp-6-1'], javaKnowledgePoints['java-kp-6-2']],
    problems: [javaProblems['java-p-6-1'], javaProblems['java-p-6-2']]
  }),

  new LearningUnit({
    id: 'java-u-7',
    title: '第7章：集合框架',
    description: 'List/Map/Set 三大集合，动态数据管理的利器',
    difficulty: Difficulty.INTERMEDIATE,
    order: 7,
    knowledgePoints: [javaKnowledgePoints['java-kp-7-1']],
    problems: [javaProblems['java-p-7-1']]
  }),

  new LearningUnit({
    id: 'java-u-8',
    title: '第8章：异常处理与文件I/O',
    description: 'try-catch 优雅处理错误，读写本地文件，让程序更健壮',
    difficulty: Difficulty.ADVANCED,
    order: 8,
    knowledgePoints: [javaKnowledgePoints['java-kp-8-1']],
    problems: [javaProblems['java-p-8-1']]
  })
];

const javaProjects = [
  new Project({
    id: 'java-project-1',
    title: '项目1：图书馆管理系统（控制台版）',
    description: '用 Java 写一个完整的图书馆管理系统，支持图书的增删改查、借还书、用户管理和文件持久化。面向对象实战最佳入门项目！',
    difficulty: Difficulty.INTERMEDIATE,
    prerequisites: '第1~6章 + 第8章',
    requirements: [
      '图书管理：添加、删除、修改、查询（按书名/作者/编号）、显示全部',
      '用户管理：注册、登录（区分管理员/普通用户）',
      '借书/还书：借书时扣库存、记录借阅信息；还书时加库存、更新还书日期',
      '个人借阅记录：查看借了哪些书，是否逾期',
      '图书库存预警：库存为0显示已借完',
      '数据持久化：图书/用户/借阅记录保存在文件（txt或csv），启动时自动加载',
      '角色权限：只有管理员可以增删改图书，普通用户只能借阅'
    ],
    techStack: [
      'OOP：class Book / User / BorrowRecord / LibraryManager',
      'ArrayList<Book> 存书单，HashMap 快速检索',
      '封装：private 字段 + getter/setter',
      '继承：Admin 和 RegularUser 继承自 User',
      '文件 I/O：BufferedReader/BufferedWriter，用 try-with-resources',
      '设计模式：单例模式（LibraryManager.getInstance()）'
    ],
    architectureHint: `
类设计：
├── Book: id, title, author, isbn, totalStock, availableStock
├── abstract User: id, username, password, role (+ 抽象方法)
│   ├── AdminUser (功能多)
│   └── RegularUser (只能借阅)
├── BorrowRecord: id, userId, bookId, borrowDate, dueDate, returned
├── DataStorage<T>: save() / load() 通用持久化
├── LibraryManager: 单例，持有所有数据和业务逻辑
└── LibrarySystem (主类): 菜单交互`,
    testCases: [
      '管理员添加3本书，普通用户登录后能看到3本书',
      '用户借书后该书库存减少1，借阅记录生成',
      '同一本书借出库存上限后，再借提示库存不足',
      '用户还书后库存+1，记录标记已还',
      '重启程序后，之前添加的书和用户信息仍存在',
      '普通用户访问"删除图书"功能提示无权限'
    ],
    referenceSolution: `
核心步骤：
1. 先设计 Book、User 等实体类（属性+构造+get/set+toString）
2. 写 DataStorage 工具类，利用 List 和 Map 把每行数据保存/读取
3. LibraryManager 单例类持有三个 Map：booksMap、usersMap、recordsMap
4. 登录验证：输入用户名密码，usersMap 中查找比对
5. 借书流程：找书→库存检查→扣库存→创建BorrowRecord→保存
6. 还书流程：查借阅记录→还未还→加库存→标记归还
7. 主类 Main 用 do-while + switch 实现登录后菜单`
  }),

  new Project({
    id: 'java-project-2',
    title: '项目2：简易记事本（图形界面）',
    description: '用 Java Swing 做一个带图形界面的记事本程序。学习 GUI 编程、事件处理、菜单、工具栏、文件打开保存。',
    difficulty: Difficulty.INTERMEDIATE,
    prerequisites: '第1~8章，有面向对象基础',
    requirements: [
      '窗口：带标题、菜单栏、工具栏、中间大文本区、底部状态栏',
      '菜单栏：文件(新建/打开/保存/另存为/退出)、编辑(撤销/剪切/复制/粘贴/全选)、格式(自动换行/字体)、帮助',
      '工具栏：快捷图标按钮（新建、打开、保存、剪切、复制、粘贴）',
      '支持打开和保存 .txt 文件（用 JFileChooser）',
      '关闭时若内容已修改未保存，弹出确认对话框',
      '状态栏显示当前行列号、是否已修改',
      '快捷键：Ctrl+N/S/O 等'
    ],
    techStack: [
      'Swing：JFrame / JTextArea / JMenuBar / JToolBar / JScrollPane / JLabel',
      '布局：BorderLayout（默认），文本区放中间',
      '事件处理：ActionListener 处理菜单和按钮点击',
      'JFileChooser 文件对话框',
      'JOptionPane 弹出确认/消息框',
      'KeyStroke + 快捷键绑定'
    ],
    architectureHint: `
public class SimpleNotePad extends JFrame {
    private JTextArea textArea;         // 主编辑区
    private JFileChooser fileChooser;   // 文件选择器
    private File currentFile;           // 当前打开的文件
    private boolean modified;           // 是否已修改未保存
    private JLabel statusBar;           // 状态栏
    
    // 构造方法里初始化所有组件
    private void initMenu();     // 初始化菜单
    private void initToolbar();  // 初始化工具栏
    private void newFile();      // 新建
    private void openFile();     // 打开 (BufferedReader读取)
    private void saveFile();     // 保存 (BufferedWriter写入)
    private boolean checkSaveBeforeExit();
}`,
    testCases: [
      '点击新建→文字区清空，文件名显示"未命名"',
      '打开已存在的txt→正确显示文本内容',
      '编辑后修改标题加 * 号标记',
      'Ctrl+S 保存未弹出保存对框（已有文件）',
      '保存时文件不存在会弹出保存位置选择框',
      '直接关闭程序时：已修改→提示保存，没修改→直接退出'
    ],
    referenceSolution: `
实现思路：
1. 创建 JFrame，设置标题/大小/关闭默认操作为 DO_NOTHING_ON_CLOSE
2. textArea 加 DocumentListener，内容变化时 modified = true
3. 菜单：JMenuBar → JMenu → JMenuItem，每个 item 加 ActionListener
4. 打开：JFileChooser.showOpenDialog → BufferedReader 逐行读入 textArea.setText()
5. 保存：FileWriter 写入 textArea.getText()，成功后 modified=false
6. 关闭：addWindowListener → windowClosing 调 checkSaveBeforeExit()
7. 字体：JFontChooser（或自定义对话框，列出 GraphicsEnvironment 所有可用字体）`
  }),

  new Project({
    id: 'java-project-3',
    title: '项目3：迷你 Tomcat — 简易 Web 服务器',
    description: '用 Java 手写一个简易的 HTTP 服务器，支持浏览器访问返回静态网页。深入理解 HTTP 协议和 Socket 编程，硬核项目！',
    difficulty: Difficulty.ADVANCED,
    prerequisites: '全部章节 + 网络基础知识',
    requirements: [
      '监听 8080 端口，接受浏览器连接',
      '解析 HTTP 请求行：GET /index.html HTTP/1.1',
      '读取本地文件返回响应：200 OK + Content-Type + 文件内容',
      '文件不存在返回 404 Not Found',
      '支持多线程：同一时间处理多个请求（用 ExecutorService 线程池）',
      '支持目录浏览（显示文件列表的 HTML）',
      '简单的日志输出：每次请求的 IP、时间、路径、状态码',
      '可选：支持简单的 servlet 处理（例如 /hello?name=xxx 动态返回内容）'
    ],
    techStack: [
      'java.net.ServerSocket / Socket：网络编程基础',
      'InputStream / OutputStream：读取 HTTP 请求、写响应',
      'ExecutorService / Thread 池：并发处理',
      'Files / Path：读取静态文件',
      'File.listFiles()：目录浏览列表',
      '字符串处理：解析请求行、解析 URL 参数'
    ],
    architectureHint: `
核心类设计：
├── MiniTomcat (主启动类)
│   ├── ServerSocket serverSocket (accept 循环接收连接)
│   ├── ExecutorService threadPool (newFixedThreadPool)
│   └── WEB_ROOT = "./webapp" (静态文件根目录)
├── HttpHandler implements Runnable (每个连接的处理)
│   ├── Socket clientSocket
│   ├── run() → parseRequest() → process() → sendResponse()
│   ├── HttpRequest (封装请求行、方法、URI、参数)
│   └── HttpResponse (封装状态码、Header、响应体)
├── MimeTypeMap ("html"→"text/html", "jpg"→"image/jpeg"...)
└── DynamicServlet 接口 (可选，处理动态请求)
    └── HelloServlet 实现类`,
    testCases: [
      '浏览器访问 http://localhost:8080/index.html → 正确显示网页内容',
      '访问不存在的 /xxx.html → 返回 404 错误页面',
      '在 webapp 下放一张 cat.jpg → 浏览器能直接显示图片',
      '用浏览器和 curl 并发请求，不会卡住',
      '目录浏览：访问 / 时显示 webapp 下所有文件的链接',
      '控制台日志：[2025-08-29 10:00:00] 127.0.0.1 GET /index.html 200'
    ],
    referenceSolution: `
核心流程：
1. MiniTomcat main(): 创建 ServerSocket(8080) 死循环 accept()，每个 Socket 丢给线程池
2. HttpHandler.run():
   a. 从 inputStream 读第一行，解析 GET /index.html HTTP/1.1（注意编码 ISO-8859-1）
   b. 如果 / 指向 index.html，找文件 webapp+/uri
   c. 文件存在：读字节，发 HTTP 响应头 "HTTP/1.1 200 OK\\r\\nContent-Type: xxx\\r\\nContent-Length: ...\\r\\n\\r\\n" + 字节
   d. 文件不存在：返回 "HTTP/1.1 404 Not Found" + 404 页面
3. 目录浏览：如果请求是目录，扫描文件数组，拼接 HTML 超链接
4. MIME 类型：根据文件后缀 HashMap 返回，否则 application/octet-stream
5. 日志：用 SimpleDateFormat 格式化时间，Socket.getInetAddress() 取客户端IP`
  })
];

export const javaLearningPath = new LearningPath({
  language: 'java',
  units: javaUnits,
  projects: javaProjects
});
