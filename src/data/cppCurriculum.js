// C++ 完整教学方案
import { LearningPath, LearningUnit, KnowledgePoint, Problem, Project, ProblemType, Difficulty } from '../types';

const cppKnowledgePoints = {
  // ========== 单元1：C++ 入门 ==========
  'cpp-kp-1-1': new KnowledgePoint({
    id: 'cpp-kp-1-1',
    title: 'C++ 简介与环境配置',
    content: `## 什么是 C++？
C++ 是一种通用的高级编程语言，由 Bjarne Stroustrup 于 1979 年在贝尔实验室开发。它是 C 语言的扩展，增加了面向对象编程等特性。

## C++ 的应用领域
- **系统软件开发**：操作系统、编译器、数据库
- **游戏开发**：Unreal Engine、游戏引擎核心
- **嵌入式系统**：智能设备、汽车电子
- **高性能计算**：科学计算、金融建模
- **图形界面**：Qt 等框架

## 在手机上编译 C++
推荐使用以下 App：
1. **Cxxdroid** - 最流行的 C++ 编译器，支持完整标准库
2. **C++ Compiler (IDE)** - 简洁易用
3. **Termux** - 安装 g++: \`pkg install clang\`

## 第一个 C++ 程序的结构
每个 C++ 程序都由以下部分组成：
- 头文件包含 (#include)
- 主函数 main()
- 语句和表达式`,
    codeExample: `// 这是注释，编译器会忽略
#include <iostream>  // 包含输入输出库

using namespace std; // 使用标准命名空间（简化代码）

// 主函数：程序从这里开始执行
int main() {
    cout << "Hello, World!" << endl;
    return 0;  // 返回0表示程序正常结束
}`,
    codeOutput: 'Hello, World!',
    tips: [
      'C++ 语句必须以分号 ; 结尾',
      'main() 函数是程序的入口，每个程序有且仅有一个 main()',
      'cout 用于输出，cin 用于输入，它们都在 <iostream> 头文件中',
      '// 是单行注释，/* ... */ 是多行注释'
    ],
    commonMistakes: [
      '忘记写分号：编译错误 "expected ;"',
      '把 cout 写成 count：拼写错误',
      'main 写成 Main：C++ 区分大小写',
      '缺少 return 0：部分编译器会警告'
    ],
    relatedLinks: [
      'https://cplusplus.com/doc/tutorial/',
      'https://www.runoob.com/cplusplus/cpp-tutorial.html'
    ]
  }),

  'cpp-kp-1-2': new KnowledgePoint({
    id: 'cpp-kp-1-2',
    title: '基本输入输出 (cin/cout)',
    content: `## 输出 cout
cout (see-out) 用于向屏幕输出内容：
- \`<<\` 是插入运算符
- \`endl\` 表示换行并刷新缓冲区
- \`\\n\` 只换行，不刷新（效率更高）

## 输入 cin
cin (see-in) 用于从键盘读取输入：
- \`>>\` 是提取运算符
- 自动跳过空格、换行、Tab
- 可以连续读取多个值

## 格式化输出
可以使用 <iomanip> 头文件进行格式化：
- setw(n)：设置宽度
- setprecision(n)：设置精度
- fixed：固定小数位
- left/right：左对齐/右对齐`,
    codeExample: `#include <iostream>
#include <iomanip>
using namespace std;

int main() {
    int age;
    double height;
    char grade;
    string name;
    
    cout << "请输入你的姓名: ";
    cin >> name;  // 读取字符串
    
    cout << "请输入年龄和身高(米): ";
    cin >> age >> height;  // 连续读取
    
    cout << "姓名: " << name << endl;
    cout << "年龄: " << age << "岁" << endl;
    cout << "身高: " << fixed << setprecision(2) << height << "m" << endl;
    
    return 0;
}`,
    codeOutput: `请输入你的姓名: 小明
请输入年龄和身高(米): 18 1.75
姓名: 小明
年龄: 18岁
身高: 1.75m`,
    tips: [
      'cin >> 遇到空格就停止，读取整行用 getline(cin, str)',
      '输出变量不需要指定类型，cout 自动识别',
      'endl 会刷新输出缓冲区，频繁使用会降低性能',
      'string 类型需要包含 <string> 头文件'
    ],
    commonMistakes: [
      '用 cin >> 读取带空格的名字（只读了第一个词）',
      '忘记包含 <iomanip> 就使用 setprecision',
      'cin 后混用 getline，导致读入空行（需要 cin.ignore()）'
    ]
  }),

  // ========== 单元2：变量与数据类型 ==========
  'cpp-kp-2-1': new KnowledgePoint({
    id: 'cpp-kp-2-1',
    title: '变量与基本数据类型',
    content: `## 变量命名规则
1. 由字母、数字、下划线组成
2. 不能以数字开头
3. 不能使用关键字（int, for, while 等）
4. 区分大小写（age 和 Age 是不同的变量）
5. 建议使用有意义的名字（studentAge 而非 a）

## 基本数据类型

### 整数类型
| 类型 | 字节 | 范围 |
|------|------|------|
| short | 2 | -32768 ~ 32767 |
| int | 4 | -21亿 ~ 21亿 |
| long | 4/8 | 取决于系统 |
| long long | 8 | -9e18 ~ 9e18 |

### 浮点类型
| 类型 | 字节 | 精度 |
|------|------|------|
| float | 4 | 6~7位小数 |
| double | 8 | 15~16位小数 |
| long double | 16 | 更高精度 |

### 字符和布尔
- \`char\`: 1字节，存储字符（ASCII码）
- \`bool\`: true/false（实际占1字节）

## const 常量
使用 const 定义不可修改的常量：
\`const double PI = 3.14159;\``,
    codeExample: `#include <iostream>
using namespace std;

int main() {
    // 整数
    int age = 18;
    long long population = 8000000000LL;
    
    // 浮点数
    double pi = 3.1415926535;
    float price = 99.9f;  // f表示float
    
    // 字符和字符串
    char grade = 'A';
    string school = "清华大学";
    
    // 布尔
    bool isStudent = true;
    
    // 常量
    const int MAX_SCORE = 100;
    
    cout << age << "岁的学生在" << school << endl;
    cout << "圆周率 ≈ " << pi << endl;
    cout << "成绩等级: " << grade << endl;
    
    return 0;
}`,
    codeOutput: `18岁的学生在清华大学
圆周率 ≈ 3.14159
成绩等级: A`,
    tips: [
      '大多数情况下用 int 表示整数，double 表示小数',
      '变量建议在声明时初始化，避免垃圾值',
      'const 常量名习惯全大写加下划线',
      'sizeof(类型) 可以查看类型占用的字节数'
    ],
    commonMistakes: [
      '整数溢出：int 超过 2147483647 会出错',
      '浮点数比较：直接用 == 比较 double 可能因精度问题失败',
      'char 用双引号：char c = "A" 错误，应该是 char c = \'A\''
    ]
  }),

  'cpp-kp-2-2': new KnowledgePoint({
    id: 'cpp-kp-2-2',
    title: '运算符与表达式',
    content: `## 算术运算符
- \`+\` 加法 | \`-\` 减法 | \`*\` 乘法
- \`/\` 除法（整数相除取整）
- \`%\` 取余（仅整数）
- \`++\` 自增 | \`--\` 自减

## 关系运算符
- \`==\` 等于 | \`!=\` 不等于
- \`>\` 大于 | \`<\` 小于
- \`>=\` 大于等于 | \`<=\` 小于等于

## 逻辑运算符
- \`&&\` 逻辑与（两边都真才真）
- \`||\` 逻辑或（一边真就真）
- \`!\` 逻辑非（取反）

## 赋值运算符
- \`=\` 赋值
- \`+= -= *= /= %=\` 复合赋值

## 运算符优先级（高到低）
1. 括号 ()
2. ++ -- ! (单目)
3. * / %
4. + -
5. < <= > >=
6. == !=
7. &&
8. ||
9. = += -= 等`,
    codeExample: `#include <iostream>
using namespace std;

int main() {
    int a = 10, b = 3;
    
    // 算术
    cout << "a+b=" << a+b << endl;   // 13
    cout << "a-b=" << a-b << endl;   // 7
    cout << "a*b=" << a*b << endl;   // 30
    cout << "a/b=" << a/b << endl;   // 3 (整数除法!)
    cout << "a%b=" << a%b << endl;   // 1 (余数)
    
    // 自增自减
    int x = 5;
    cout << "x++=" << x++ << endl;   // 5 (后++)
    cout << "x=" << x << endl;       // 6
    cout << "++x=" << ++x << endl;   // 7 (前++)
    
    // 复合赋值
    a += 5;  // 等价于 a = a + 5
    cout << "a=" << a << endl;        // 15
    
    // 逻辑运算
    bool r = (a > b) && (b > 0);
    cout << "逻辑结果: " << r << endl;  // 1 (true)
    
    return 0;
}`,
    codeOutput: `a+b=13
a-b=7
a*b=30
a/b=3
a%b=1
x++=5
x=6
++x=7
a=15
逻辑结果: 1`,
    tips: [
      '整数除法 10/3 = 3，要得到小数请转成 double：10.0/3',
      'a++ 和 ++a 的区别：a++ 先用再加，++a 先加再用',
      '&& 和 || 有短路特性：左边能确定结果时右边不执行',
      '不确定优先级时，直接加括号，代码更清晰'
    ],
    commonMistakes: [
      '把 == 写成 =（赋值变成判断了，还可能不报错！）',
      '5/2 期望 2.5，实际得到 2',
      '连续判断：if (0 < a < 10) 语法对但逻辑错，应该 if (a>0 && a<10)'
    ]
  }),

  // ========== 单元3：流程控制 ==========
  'cpp-kp-3-1': new KnowledgePoint({
    id: 'cpp-kp-3-1',
    title: '条件语句 (if/switch)',
    content: `## if 语句
\`\`\`cpp
if (条件) {
    // 条件为真执行
} else if (条件2) {
    // 条件2为真执行
} else {
    // 都不满足执行
}
\`\`\`

## 三元运算符
\`条件 ? 表达式1 : 表达式2\`
等价于简化的 if-else

## switch 语句
适用于多个固定值的判断：
\`\`\`cpp
switch (表达式) {
    case 值1: 语句1; break;
    case 值2: 语句2; break;
    default: 默认语句;
}
\`\`\`

注意：
- switch 只能判断整型/字符型/枚举
- 每个 case 后面加 break，否则会继续执行下一个 case
- default 是可选的`,
    codeExample: `#include <iostream>
using namespace std;

int main() {
    int score;
    cout << "输入分数: ";
    cin >> score;
    
    // if-else if-else 示例
    char grade;
    if (score >= 90) grade = 'A';
    else if (score >= 80) grade = 'B';
    else if (score >= 70) grade = 'C';
    else if (score >= 60) grade = 'D';
    else grade = 'F';
    
    cout << "等级: " << grade << endl;
    
    // 三元运算符示例
    string result = (score >= 60) ? "及格" : "不及格";
    cout << result << endl;
    
    // switch 示例
    switch (grade) {
        case 'A': cout << "优秀！"; break;
        case 'B': cout << "良好！"; break;
        case 'C': cout << "中等。"; break;
        case 'D': cout << "及格。"; break;
        case 'F': cout << "需要努力！"; break;
        default: cout << "无效等级";
    }
    cout << endl;
    
    return 0;
}`,
    codeOutput: `输入分数: 85
等级: B
及格
良好！`,
    tips: [
      '条件中的花括号 {} 即使只有一行也建议写上，避免修改时出错',
      'if/else 配对：else 总是和最近的未配对的 if 匹配',
      'switch 中 case 穿透有时是有用的特性，但记得写注释说明',
      '区间判断用 if-else，固定值判断用 switch'
    ],
    commonMistakes: [
      'if (a = 5) 用了赋值号，条件永远为真',
      '忘记 break 导致 switch 穿透到下一个 case',
      'if 后面多写了分号 if (a>0); { ... } 导致花括号内容总执行'
    ]
  }),

  'cpp-kp-3-2': new KnowledgePoint({
    id: 'cpp-kp-3-2',
    title: '循环语句 (for/while/do-while)',
    content: `## for 循环（已知循环次数）
\`\`\`cpp
for (初始化; 条件; 更新) {
    循环体;
}
\`\`\`
执行顺序：初始化 → (判断条件→循环体→更新) 重复

## while 循环（未知循环次数）
\`\`\`cpp
while (条件) {
    循环体;  // 先判断，条件真才执行
}
\`\`\`

## do-while 循环
\`\`\`cpp
do {
    循环体;  // 先执行一次，再判断
} while (条件);
\`\`\`

## 循环控制
- \`break\`：立即跳出循环
- \`continue\`：跳过本次循环剩余部分，进入下一次`,
    codeExample: `#include <iostream>
using namespace std;

int main() {
    // for循环：求1~100的和
    int sum = 0;
    for (int i = 1; i <= 100; i++) {
        sum += i;
    }
    cout << "1+2+...+100 = " << sum << endl;
    
    // while循环：输入数字，输入-1结束
    int num, maxNum = -99999;
    cout << "输入一组数字，-1结束: ";
    cin >> num;
    while (num != -1) {
        if (num > maxNum) maxNum = num;
        cin >> num;
    }
    cout << "最大值是: " << maxNum << endl;
    
    // break和continue示例：输出1~10中的奇数
    for (int i = 1; i <= 10; i++) {
        if (i % 2 == 0) continue;  // 偶数跳过
        if (i > 7) break;          // 大于7就结束
        cout << i << " ";
    }
    cout << endl;
    
    // 嵌套循环：打印5行三角形
    for (int i = 1; i <= 5; i++) {
        for (int j = 1; j <= i; j++) {
            cout << "*";
        }
        cout << endl;
    }
    
    return 0;
}`,
    codeOutput: `1+2+...+100 = 5050
输入一组数字，-1结束: 3 7 2 9 5 -1
最大值是: 9
1 3 5 7 
*
**
***
****
*****`,
    tips: [
      'for 的三个部分都可以省略，但分号不能省：for(;;) 是死循环',
      '死循环用 while(true) 或 for(;;)，记得里面有 break',
      '嵌套循环注意外层循环变量和内层循环变量不要重名',
      'continue 只跳过最内层循环的当次迭代'
    ],
    commonMistakes: [
      'for 循环最后多写分号 for(...); { ... } 导致循环体只执行一次',
      '循环条件边界错误：应该 i<=n 写成了 i<n',
      'while 循环中忘记更新变量导致死循环'
    ]
  }),

  // ========== 单元4：函数 ==========
  'cpp-kp-4-1': new KnowledgePoint({
    id: 'cpp-kp-4-1',
    title: '函数定义与调用',
    content: `## 函数的概念
函数是一段可重复使用的代码块，用于完成特定任务。

## 函数定义语法
\`\`\`cpp
返回值类型 函数名(参数列表) {
    函数体;
    return 返回值;
}
\`\`\`

## 函数声明（原型）
如果函数定义在 main 之后，需要先声明：
\`返回值类型 函数名(参数类型列表);\`

## 函数重载
同一作用域中，函数名相同但参数不同（类型/个数/顺序）

## 默认参数
函数参数可以有默认值，调用时可以省略
\`int add(int a, int b = 0, int c = 0)\``,
    codeExample: `#include <iostream>
using namespace std;

// 函数声明（因为定义在main后面）
int add(int a, int b);
void printHello(int n);
int factorial(int n);

// 1. 有返回值的函数
int add(int a, int b) {
    return a + b;
}

// 2. 无返回值的函数 (void)
void printHello(int n) {
    for (int i = 0; i < n; i++) {
        cout << "Hello! ";
    }
    cout << endl;
}

// 3. 递归函数：调用自身
int factorial(int n) {
    if (n <= 1) return 1;          // 递归终止条件
    return n * factorial(n - 1);   // 递归调用
}

// 4. 函数重载
double max(double a, double b) { return a > b ? a : b; }
int max(int a, int b) { return a > b ? a : b; }
int max(int a, int b, int c) { return max(max(a,b), c); }

// 5. 默认参数
int sumRange(int start, int end, int step = 1) {
    int s = 0;
    for (int i = start; i <= end; i += step) s += i;
    return s;
}

int main() {
    cout << "3+5=" << add(3,5) << endl;
    printHello(3);
    cout << "5!=" << factorial(5) << endl;  // 120
    cout << "max(3.1,2.9)=" << max(3.1,2.9) << endl;
    cout << "max(3,7,5)=" << max(3,7,5) << endl;
    cout << "1~10和=" << sumRange(1,10) << endl;
    cout << "1~10奇数和=" << sumRange(1,10,2) << endl;
    return 0;
}`,
    codeOutput: `3+5=8
Hello! Hello! Hello! 
5!=120
max(3.1,2.9)=3.1
max(3,7,5)=7
1~10和=55
1~10奇数和=25`,
    tips: [
      '函数名应该是动词开头，表示动作：getArea, calculateSum',
      '一个函数最好只做一件事（单一职责原则）',
      '递归一定要有终止条件，否则会栈溢出崩溃',
      '默认参数只能从右往左设置默认值'
    ],
    commonMistakes: [
      'void 函数里写 return 值，或非 void 函数忘记 return',
      '函数重载仅返回值不同：编译器无法区分',
      '默认参数声明和定义都写，应该只在声明处写'
    ]
  }),

  // ========== 单元5：数组与字符串 ==========
  'cpp-kp-5-1': new KnowledgePoint({
    id: 'cpp-kp-5-1',
    title: '一维数组与二维数组',
    content: `## 一维数组
\`类型 数组名[大小];\`
- 下标从 0 开始！
- 大小必须是编译期常量

## 数组初始化
\`\`\`cpp
int arr1[5] = {1, 2, 3, 4, 5};  // 指定大小
int arr2[] = {1, 2, 3};         // 自动推断大小
int arr3[5] = {0};              // 全初始化为0
\`\`\`

## 二维数组
\`类型 数组名[行数][列数];\`
理解成：数组的数组

## 数组与函数
数组传参时会退化成指针，丢失大小信息
通常需要同时传数组大小`,
    codeExample: `#include <iostream>
#include <algorithm>  // sort
using namespace std;

// 数组作为参数
void printArray(int arr[], int size) {
    for (int i = 0; i < size; i++) {
        cout << arr[i] << " ";
    }
    cout << endl;
}

int findMax(int arr[], int size) {
    int maxVal = arr[0];
    for (int i = 1; i < size; i++) {
        if (arr[i] > maxVal) maxVal = arr[i];
    }
    return maxVal;
}

int main() {
    // 一维数组
    int scores[5] = {85, 92, 78, 96, 88};
    int n = 5;
    
    cout << "原始数组: ";
    printArray(scores, n);
    
    // 排序（需要 <algorithm>）
    sort(scores, scores + n);
    cout << "排序后: ";
    printArray(scores, n);
    
    cout << "最高分: " << findMax(scores, n) << endl;
    
    // 二维数组：3行4列的成绩表
    int table[3][4] = {
        {80, 85, 90, 78},
        {92, 88, 95, 85},
        {75, 82, 78, 90}
    };
    
    // 求每个学生的总分
    for (int i = 0; i < 3; i++) {
        int total = 0;
        for (int j = 0; j < 4; j++) {
            total += table[i][j];
        }
        cout << "学生" << i+1 << "总分: " << total << endl;
    }
    
    return 0;
}`,
    codeOutput: `原始数组: 85 92 78 96 88 
排序后: 78 85 88 92 96 
最高分: 96
学生1总分: 333
学生2总分: 360
学生3总分: 325`,
    tips: [
      '下标绝对不要越界！arr[5] 只有下标 0~4，访问 arr[5] 会造成未定义行为',
      'C++ 数组名本身就是首元素地址，因此传给 sort 时用 scores, scores+n',
      'sizeof(arr) 是整个数组字节数，sizeof(arr)/sizeof(arr[0]) 可得元素个数',
      '如果需要动态大小的数组，后面会学到 vector'
    ],
    commonMistakes: [
      '下标从1开始用：arr[1]~arr[5]，结果 arr[5] 越界',
      'int n; cin>>n; int arr[n]; 这是 VLA，不是标准 C++（部分编译器支持）',
      '直接对数组用 arr1 = arr2 赋值，数组不能整体赋值'
    ]
  }),

  // ========== 单元6：指针与引用 ==========
  'cpp-kp-6-1': new KnowledgePoint({
    id: 'cpp-kp-6-1',
    title: '指针基础',
    content: `## 指针是什么？
指针是存储内存地址的变量。

## 声明和基本操作
\`\`\`cpp
int x = 42;
int* p = &x;   // p 是指针，&x 取 x 的地址
*p = 100;      // *p 访问 p 指向的值，等价于 x = 100
\`\`\`

## 指针与数组
数组名就是首元素地址：
- arr 等价于 &arr[0]
- *(arr + i) 等价于 arr[i]

## 指针与函数
指针参数可以修改实参的值（传地址）

## nullptr
C++11 引入的空指针常量，代替 NULL`,
    codeExample: `#include <iostream>
using namespace std;

// 用指针实现交换两个变量的值
void swap(int* a, int* b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}

int main() {
    int x = 42;
    int* p = &x;
    
    cout << "x = " << x << endl;
    cout << "&x (x的地址) = " << &x << endl;
    cout << "p (指针的值) = " << p << endl;
    cout << "*p (p指向的值) = " << *p << endl;
    
    *p = 100;  // 通过指针修改x
    cout << "修改后 x = " << x << endl;
    
    // 指针与数组
    int arr[5] = {10, 20, 30, 40, 50};
    int* parr = arr;  // arr 是首元素地址
    for (int i = 0; i < 5; i++) {
        cout << *(parr + i) << " ";  // 指针偏移访问
    }
    cout << endl;
    
    // swap 函数
    int a = 3, b = 5;
    cout << "交换前: a=" << a << ", b=" << b << endl;
    swap(&a, &b);  // 传地址
    cout << "交换后: a=" << a << ", b=" << b << endl;
    
    return 0;
}`,
    codeOutput: `x = 42
&x (x的地址) = 0x...
p (指针的值) = 0x...
*p (p指向的值) = 42
修改后 x = 100
10 20 30 40 50 
交换前: a=3, b=5
交换后: a=5, b=3`,
    tips: [
      '* 有两个含义：声明指针时是类型的一部分，使用时是解引用',
      '初学指针可以画图理解：方框表示变量，箭头表示指针指向',
      '指针使用前必须初始化，野指针非常危险',
      '删除动态内存后置 nullptr，避免野指针'
    ],
    commonMistakes: [
      'int* p1, p2; 以为都是指针，实际只有 p1 是指针，p2 是 int。正确写法 int *p1, *p2;',
      '解引用空指针或未初始化的指针：程序崩溃',
      'swap(int a, int b) 只传递了值，实际并没有交换'
    ]
  }),

  'cpp-kp-6-2': new KnowledgePoint({
    id: 'cpp-kp-6-2',
    title: '引用 (Reference)',
    content: `## 引用是什么？
引用是变量的别名，不是新的变量。

\`\`\`cpp
int x = 10;
int& ref = x;  // ref 是 x 的引用
ref = 20;      // 等价于 x = 20
\`\`\`

## 引用 vs 指针
| 特性 | 引用 | 指针 |
|------|------|------|
| 必须初始化 | 是 | 否 |
| 可改指向 | 否 | 是 |
| 可为空(null) | 否 | 是 |
| 使用语法 | 像普通变量 | 需要解引用 * |

## 引用的主要用途
1. 函数参数：传引用避免拷贝，可修改实参
2. 函数返回值：返回引用避免拷贝`,
    codeExample: `#include <iostream>
#include <string>
using namespace std;

// 引用参数：修改实参 + 避免拷贝
void swap(int& a, int& b) {
    int temp = a;
    a = b;
    b = temp;
}

// const 引用：避免拷贝且保证不修改
void printName(const string& name) {
    cout << "名字: " << name << endl;
    // name = "xxx";  // 编译错误：const引用不能修改
}

int main() {
    int a = 3, b = 5;
    cout << "交换前: a=" << a << ", b=" << b << endl;
    swap(a, b);  // 直接传变量，不需要 &
    cout << "交换后: a=" << a << ", b=" << b << endl;
    
    // 引用作为别名
    string longName = "Supercalifragilisticexpialidocious";
    string& ref = longName;
    cout << ref.length() << endl;  // 和 longName 一样使用
    
    printName(longName);
    
    return 0;
}`,
    codeOutput: `交换前: a=3, b=5
交换后: a=5, b=3
34
名字: Supercalifragilisticexpialidocious`,
    tips: [
      'C++ 中函数参数尽量用引用传递，配合 const 使用',
      '引用本质是"自动解引用的指针"，但更安全',
      '不要返回局部变量的引用！函数结束局部变量销毁了'
    ],
    commonMistakes: [
      'int& r; 引用没初始化：编译错误',
      '返回了局部变量的引用或指针：悬空引用，崩溃'
    ]
  }),

  // ========== 单元7：面向对象编程 ==========
  'cpp-kp-7-1': new KnowledgePoint({
    id: 'cpp-kp-7-1',
    title: '类与对象基础',
    content: `## 面向对象 (OOP) 的四大特性
1. **封装**：数据和方法打包，对外暴露接口
2. **继承**：子类复用父类代码
3. **多态**：同一接口不同实现
4. **抽象**：隐藏实现细节

## 类的定义
\`\`\`cpp
class 类名 {
private:        // 私有：只能类内访问
    成员变量;
public:         // 公有：外部可访问
    成员函数;
protected:      // 保护：类内和子类可访问
};
\`\`\`

## 构造函数
与类同名，创建对象时自动调用，用于初始化
- 默认构造：无参数
- 有参构造：带参数
- 析构函数：~类名()，对象销毁时调用`,
    codeExample: `#include <iostream>
#include <string>
using namespace std;

// 定义一个学生类
class Student {
private:
    // 成员变量（属性）
    string name;
    int age;
    double score;

public:
    // 1. 默认构造函数
    Student() {
        name = "未知";
        age = 0;
        score = 0;
    }
    
    // 2. 有参构造函数（参数列表初始化方式，更高效）
    Student(string n, int a, double s) : name(n), age(a), score(s) {}
    
    // 3. 成员函数（方法）
    void study() {
        cout << name << " 正在学习..." << endl;
        score += 2;  // 学习加分
        if (score > 100) score = 100;
    }
    
    void showInfo() {
        cout << "【学生】姓名:" << name 
             << " 年龄:" << age 
             << " 分数:" << score << endl;
    }
    
    // Getter / Setter
    double getScore() { return score; }
    void setName(string n) { name = n; }
    
    // 4. 析构函数
    ~Student() {
        // 可以在这里释放资源
    }
};

int main() {
    // 创建对象
    Student s1;                         // 调用默认构造
    Student s2("小明", 18, 85.5);       // 调用有参构造
    
    s1.setName("小红");
    s1.showInfo();
    s2.showInfo();
    
    s2.study();
    s2.study();
    cout << s2.getName() << "的分数: " << s2.getScore() << endl;
    
    // 指针方式创建对象（动态分配）
    Student* sp = new Student("小刚", 19, 78);
    sp->showInfo();     // 指针用 -> 访问成员
    delete sp;          // 记得释放！
    
    return 0;
}`,
    codeOutput: `【学生】姓名:小红 年龄:0 分数:0
【学生】姓名:小明 年龄:18 分数:85.5
小明的分数: 89.5
【学生】姓名:小刚 年龄:19 分数:78`,
    tips: [
      'struct 和 class 几乎一样，唯一区别：struct 默认 public，class 默认 private',
      '成员变量命名加前缀 m_ 或后缀 _ 区分，如 m_name, name_',
      'new 出来的对象必须用 delete 释放，否则内存泄漏',
      '类声明放 .h 文件，实现放 .cpp 文件（大项目）'
    ],
    commonMistakes: [
      '构造函数加了返回值类型：void Student() {...} 错误',
      '用 new 创建的对象忘记 delete：内存泄漏',
      '对象 . 访问，对象指针 -> 访问，搞混了会报错'
    ]
  }),

  'cpp-kp-7-2': new KnowledgePoint({
    id: 'cpp-kp-7-2',
    title: '继承与多态',
    content: `## 继承
允许一个类（派生类）继承另一个类（基类）的成员

\`\`\`cpp
class 派生类 : 继承方式 基类 {
    // 新增成员
};
\`\`\`

继承方式：
- **public 继承**：public→public, protected→protected（最常用）
- protected 继承：public→protected, protected→protected
- private 继承：全变成 private

## 多态（虚函数）
同一函数调用，根据对象类型执行不同实现
关键：**基类指针/引用 + virtual 函数**

## 纯虚函数与抽象类
\`virtual void func() = 0;\`
含纯虚函数的类是抽象类，不能实例化`,
    codeExample: `#include <iostream>
#include <string>
using namespace std;

// 基类：形状（抽象类）
class Shape {
protected:
    string color;
public:
    Shape(string c) : color(c) {}
    
    // 纯虚函数：子类必须实现
    virtual double area() const = 0;
    virtual void draw() const = 0;
    
    // 虚函数：可以有默认实现
    virtual void showInfo() const {
        cout << "颜色: " << color << endl;
    }
    
    virtual ~Shape() {}  // 虚析构函数（非常重要！）
};

// 派生类：矩形
class Rectangle : public Shape {
private:
    double w, h;
public:
    Rectangle(string c, double w_, double h_) 
        : Shape(c), w(w_), h(h_) {}
    
    double area() const override { return w * h; }
    
    void draw() const override {
        cout << "画一个" << color << "的矩形 " 
             << w << "x" << h << endl;
    }
};

// 派生类：圆形
class Circle : public Shape {
private:
    double r;
public:
    Circle(string c, double r_) : Shape(c), r(r_) {}
    
    double area() const override { return 3.14159 * r * r; }
    
    void draw() const override {
        cout << "画一个" << color << "的圆形，半径=" << r << endl;
    }
};

int main() {
    // 多态：基类指针指向派生类对象
    Shape* shapes[3];
    shapes[0] = new Rectangle("红色", 4, 5);
    shapes[1] = new Circle("蓝色", 3);
    shapes[2] = new Rectangle("绿色", 6, 2);
    
    // 统一调用：同一个接口，不同实现
    for (int i = 0; i < 3; i++) {
        shapes[i]->draw();
        cout << "面积: " << shapes[i]->area() << endl;
        shapes[i]->showInfo();
        cout << "---" << endl;
        delete shapes[i];  // 虚析构保证正确调用派生类析构
    }
    
    return 0;
}`,
    codeOutput: `画一个红色的矩形 4x5
面积: 20
颜色: 红色
---
画一个蓝色的圆形，半径=3
面积: 28.2743
颜色: 蓝色
---
画一个绿色的矩形 6x2
面积: 12
颜色: 绿色
---`,
    tips: [
      '构造函数调用顺序：基类→派生类；析构函数：派生类→基类',
      '虚函数加 override 关键字（C++11），编译器帮你检查是否正确重写',
      '有虚函数的类一定要写虚析构函数！否则 delete 基类指针时派生类析构不调用',
      '面向对象设计：多用组合，少用继承'
    ],
    commonMistakes: [
      '重写虚函数签名不匹配（参数、const不同）：不是重写，是隐藏',
      '基类析构不是虚函数，造成派生类部分未析构→内存泄漏',
      '构造/析构函数中调用虚函数：不会有多态效果，只调用本类版本'
    ]
  }),

  // ========== 单元8：STL 标准库 ==========
  'cpp-kp-8-1': new KnowledgePoint({
    id: 'cpp-kp-8-1',
    title: 'STL 容器 (vector/map/set/string)',
    content: `## 什么是 STL？
标准模板库 (Standard Template Library) 提供了常用的数据结构和算法。

## 常用容器

### vector 动态数组
- 自动扩容，可像数组一样用 []
- push_back/pop_back 末尾增删 O(1)
- 中间插入删除 O(n)

### string 字符串
- 支持 + 拼接，< > == 比较
- find(), substr(), length() 等方法

### map 映射（字典）
- key-value 对，key 自动排序
- 用 [] 访问，不存在自动插入

### set 集合
- 元素自动排序且不重复
- insert, find, erase 都是 O(log n)

### 使用方法
所有容器都支持迭代器遍历：
\`for (auto it = c.begin(); it != c.end(); ++it)\`
C++11 范围 for 更简单：\`for (auto& x : c)\``,
    codeExample: `#include <iostream>
#include <vector>
#include <map>
#include <set>
#include <string>
#include <algorithm>
using namespace std;

int main() {
    // 1. vector 动态数组
    vector<int> v = {3, 1, 4, 1, 5, 9, 2, 6};
    v.push_back(5);  // 末尾添加
    
    cout << "vector 排序前: ";
    for (int x : v) cout << x << " ";
    cout << endl;
    
    sort(v.begin(), v.end());  // 排序
    cout << "vector 排序后: ";
    for (int x : v) cout << x << " ";
    cout << endl;
    cout << "vector 大小: " << v.size() << endl;
    
    // 2. string 字符串
    string s = "Hello, World!";
    cout << s.substr(7, 5) << endl;   // 从位置7取5个字符
    cout << "长度: " << s.length() << endl;
    if (s.find("World") != string::npos) {
        cout << "找到 World!" << endl;
    }
    
    // 3. map 字典（词频统计）
    map<string, int> freq;
    freq["苹果"] = 3;
    freq["香蕉"]++;       // 不存在会默认初始化为0再++
    freq["苹果"]++;
    
    cout << "--- 水果统计 ---" << endl;
    for (auto& pair : freq) {  // pair.first是key, pair.second是value
        cout << pair.first << ": " << pair.second << endl;
    }
    
    // 4. set 集合（去重+排序）
    set<int> mySet;
    int nums[] = {5, 2, 8, 2, 5, 1, 9, 1, 5};
    for (int n : nums) mySet.insert(n);
    
    cout << "--- set去重排序 ---" << endl;
    for (int x : mySet) cout << x << " ";
    cout << endl;
    cout << "是否包含5: " << (mySet.count(5) ? "是" : "否") << endl;
    
    return 0;
}`,
    codeOutput: `vector 排序前: 3 1 4 1 5 9 2 6 5 
vector 排序后: 1 1 2 3 4 5 5 6 9 
vector 大小: 9
World
长度: 13
找到 World!
--- 水果统计 ---
苹果: 4
香蕉: 1
--- set去重排序 ---
1 2 5 8 9 
是否包含5: 是`,
    tips: [
      '能用 STL 就不要自己写链表、二叉树等数据结构，效率低且易出错',
      'vector 扩容时会重新分配内存，之前的指针/引用会失效',
      'map 用 [] 访问不存在的 key 会插入！判断是否存在请用 count() 或 find()',
      'unordered_map/unordered_set 是哈希实现，查找更快（无序）'
    ],
    commonMistakes: [
      'vector 遍历用 for (auto x : v) 修改 x 不影响原数组，应该用 &',
      'map[key] 判断存在性，结果误插入了一个默认值',
      '迭代器失效：容器增删元素后迭代器可能失效，不要继续使用'
    ]
  }),

  // ========== 单元9：文件操作与异常 ==========
  'cpp-kp-9-1': new KnowledgePoint({
    id: 'cpp-kp-9-1',
    title: '文件I/O操作',
    content: `## 文件流 (fstream)
- \`ifstream\`: 读文件 (input file stream)
- \`ofstream\`: 写文件 (output file stream)
- \`fstream\`: 读写文件

都需要包含 \`<fstream>\` 头文件。

## 打开方式
- \`ios::in\` 读（ifstream 默认）
- \`ios::out\` 写（ofstream 默认，会清空文件）
- \`ios::app\` 追加写
- \`ios::binary\` 二进制模式

## 使用步骤
1. 创建流对象
2. 打开文件并检查是否成功
3. 读写操作
4. 关闭文件（或等对象析构自动关）`,
    codeExample: `#include <iostream>
#include <fstream>
#include <string>
#include <vector>
using namespace std;

struct Student {
    string name;
    int score;
};

int main() {
    // 1. 写入文件
    ofstream fout("students.txt");
    if (!fout) {
        cout << "无法创建文件!" << endl;
        return 1;
    }
    
    vector<Student> students = {
        {"小明", 85}, {"小红", 92}, {"小刚", 78},
        {"小丽", 96}, {"小华", 88}
    };
    
    for (auto& s : students) {
        fout << s.name << " " << s.score << endl;
    }
    fout.close();
    cout << "写入完成！" << endl;
    
    // 2. 读取文件并统计
    ifstream fin("students.txt");
    if (!fin) {
        cout << "无法打开文件!" << endl;
        return 1;
    }
    
    vector<Student> readList;
    Student s;
    while (fin >> s.name >> s.score) {  // 读到EOF自动跳出
        readList.push_back(s);
    }
    fin.close();
    
    int total = 0, maxScore = 0;
    string maxName;
    cout << "--- 读取到的学生数据 ---" << endl;
    for (auto& stu : readList) {
        cout << stu.name << "：" << stu.score << endl;
        total += stu.score;
        if (stu.score > maxScore) {
            maxScore = stu.score;
            maxName = stu.name;
        }
    }
    
    double avg = (double)total / readList.size();
    cout << "--- 统计结果 ---" << endl;
    cout << "总人数: " << readList.size() << endl;
    cout << "平均分: " << avg << endl;
    cout << "最高分: " << maxName << " - " << maxScore << endl;
    
    return 0;
}`,
    codeOutput: `写入完成！
--- 读取到的学生数据 ---
小明：85
小红：92
小刚：78
小丽：96
小华：88
--- 统计结果 ---
总人数: 5
平均分: 87.8
最高分: 小丽 - 96`,
    tips: [
      '读写文件后一定要判断是否成功打开！',
      '写大量数据用 endl 会频繁刷新，可以用 "\\n" 提高速度',
      '读取到 EOF (End Of File) 时 fin.eof() 为 true',
      '二进制文件用 write/read，文本文件用 << / >>'
    ],
    commonMistakes: [
      '路径写错，相对路径是程序当前目录',
      'ofstream 默认打开会清空原文件内容，要追加请用 ios::app',
      'while (!fin.eof()) { ... } 会多读一行，因为 eof 是读失败后才变真'
    ]
  }),
};

const cppProblems = {
  // 单元1题目
  'cpp-p-1-1': new Problem({
    id: 'cpp-p-1-1',
    title: 'Hello, C++!',
    type: ProblemType.CODE_COMPLETE,
    difficulty: Difficulty.BEGINNER,
    description: '请补全代码，使程序输出 Hello, C++! （注意大小写和标点）',
    codeTemplate: `#include <iostream>
using namespace std;

int main() {
    ____("Hello, C++!" << ____);
    return 0;
}`,
    answer: 'cout, endl',
    hints: [
      '输出内容需要用 cout 对象',
      '换行需要用 endl',
      '格式是 cout << 内容 << endl;'
    ],
    knowledgePointIds: ['cpp-kp-1-1'],
    explanation: 'C++ 中使用 cout 输出内容到屏幕，endl 输出换行并刷新缓冲区。完整语句：cout << "Hello, C++!" << endl;'
  }),

  'cpp-p-1-2': new Problem({
    id: 'cpp-p-1-2',
    title: '程序入口判断',
    type: ProblemType.MULTIPLE_CHOICE,
    difficulty: Difficulty.BEGINNER,
    description: 'C++ 程序的入口函数是哪个？',
    options: [
      'A. start()',
      'B. main()',
      'C. begin()',
      'D. run()'
    ],
    answer: 'B',
    hints: [
      '回想第一个 Hello World 程序里的函数名',
      '这个函数名也是 "主要的" 意思'
    ],
    knowledgePointIds: ['cpp-kp-1-1'],
    explanation: 'C++ 规定程序从 main() 函数开始执行，每个程序有且仅有一个 main() 函数。'
  }),

  'cpp-p-1-3': new Problem({
    id: 'cpp-p-1-3',
    title: '输出个人简介',
    type: ProblemType.CODE_WRITE,
    difficulty: Difficulty.BEGINNER,
    description: '编写一个完整的 C++ 程序，输出两行内容：\n第一行输出你的姓名\n第二行输出：我正在学习 C++！',
    codeTemplate: '',
    answer: '#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "我的名字" << endl;\n    cout << "我正在学习 C++！" << endl;\n    return 0;\n}',
    hints: [
      '别忘了包含 <iostream> 头文件',
      '要写 main() 函数',
      '每输出一行用 cout << 内容 << endl;'
    ],
    knowledgePointIds: ['cpp-kp-1-1', 'cpp-kp-1-2'],
    explanation: '完整程序需要头文件 #include <iostream>，命名空间 using namespace std;，和包含两条 cout 语句的 main 函数。'
  }),

  'cpp-p-1-4': new Problem({
    id: 'cpp-p-1-4',
    title: '输入输出练习',
    type: ProblemType.CODE_COMPLETE,
    difficulty: Difficulty.BEGINNER,
    description: '补全代码：读入一个整数 a 和一个浮点数 b，然后输出它们的和（格式见输出样例）',
    codeTemplate: `#include <iostream>
#include <iomanip>
using namespace std;

int main() {
    int a;
    double b;
    ____ >> a >> b;  // 输入
    cout << ____ << fixed << setprecision(1) << a + b << endl;
    return 0;
}
/*
输入样例：
3 2.5
输出样例：
sum=5.5
*/`,
    answer: 'cin, "sum="',
    hints: [
      '用 cin 读取输入',
      '输出格式是 sum=xx',
      '字符串要用双引号括起来'
    ],
    knowledgePointIds: ['cpp-kp-1-2'],
    explanation: 'cin >> a >> b 连续读取两个值。cout 的内容按顺序输出，先输出字符串 "sum="，再输出计算结果。'
  }),

  // 单元2题目
  'cpp-p-2-1': new Problem({
    id: 'cpp-p-2-1',
    title: '数据类型选择',
    type: ProblemType.MULTIPLE_CHOICE,
    difficulty: Difficulty.BASIC,
    description: '存储一个人的身高（单位：米，如 1.75），最合适的类型是？',
    options: [
      'A. int',
      'B. char',
      'C. double',
      'D. bool'
    ],
    answer: 'C',
    hints: [
      '身高可能有小数部分',
      'int 只能存整数',
      'double 是双精度浮点型'
    ],
    knowledgePointIds: ['cpp-kp-2-1'],
    explanation: '身高是小数，用 double 最合适。int 存小数会丢失精度，char 存字符，bool 只有真假。'
  }),

  'cpp-p-2-2': new Problem({
    id: 'cpp-p-2-2',
    title: '变量命名判断',
    type: ProblemType.MULTIPLE_CHOICE,
    difficulty: Difficulty.BASIC,
    description: '下列哪个是合法的 C++ 变量名？',
    options: [
      'A. 2name',
      'B. my-name',
      'C. int',
      'D. student_age'
    ],
    answer: 'D',
    hints: [
      '变量名不能以数字开头',
      '不能使用减号 -',
      'int 是关键字不能用作变量名',
      '下划线 _ 是允许的字符'
    ],
    knowledgePointIds: ['cpp-kp-2-1'],
    explanation: 'D 正确。A 数字开头错误，B 不能用减号，C int 是关键字。变量名可以由字母、数字、下划线组成，且不能以数字开头、不能是关键字。'
  }),

  'cpp-p-2-3': new Problem({
    id: 'cpp-p-2-3',
    title: '算术运算结果',
    type: ProblemType.FILL_BLANK,
    difficulty: Difficulty.BASIC,
    description: '写出下列表达式的值：\n17 / 5 = ______\n17 % 5 = ______',
    answer: '3, 2',
    hints: [
      '整数除法 / 是取商的整数部分（截断小数）',
      '% 是取余运算，即除法的余数',
      '5×3=15，17-15=2'
    ],
    knowledgePointIds: ['cpp-kp-2-2'],
    explanation: '整数除法 17/5 = 3（丢弃小数部分）。取余 17%5 = 17 - 5×3 = 2。'
  }),

  'cpp-p-2-4': new Problem({
    id: 'cpp-p-2-4',
    title: 'BMI 计算器',
    type: ProblemType.CODE_WRITE,
    difficulty: Difficulty.BASIC,
    description: '编写程序：输入身高 h（米）和体重 w（千克），计算并输出 BMI 值。\nBMI = w / (h * h)\n输出保留 1 位小数。',
    codeTemplate: '',
    answer: '#include <iostream>\n#include <iomanip>\nusing namespace std;\n\nint main() {\n    double h, w;\n    cin >> h >> w;\n    double bmi = w / (h * h);\n    cout << fixed << setprecision(1) << bmi << endl;\n    return 0;\n}',
    hints: [
      '身高和体重都是小数，用 double 类型',
      '公式：体重除以身高的平方',
      '保留1位小数需要 <iomanip> 的 setprecision(1) + fixed',
      'h*h 就是身高的平方'
    ],
    knowledgePointIds: ['cpp-kp-2-1', 'cpp-kp-2-2'],
    explanation: '正确代码包含：头文件、变量声明（double）、计算公式 BMI=w/(h*h)、格式化输出保留1位小数。'
  }),

  // 单元3题目
  'cpp-p-3-1': new Problem({
    id: 'cpp-p-3-1',
    title: '分数等级判断',
    type: ProblemType.CODE_COMPLETE,
    difficulty: Difficulty.BASIC,
    description: '补全代码：输入分数 score，输出对应等级：\n90分及以上为A，80-89为B，60-79为C，60以下为D',
    codeTemplate: `#include <iostream>
using namespace std;

int main() {
    int score;
    cin >> score;
    char g;
    if (____) g = 'A';
    else if (score >= 80) g = 'B';
    else if (____) g = 'C';
    else g = 'D';
    cout << g << endl;
    return 0;
}`,
    answer: 'score >= 90, score >= 60',
    hints: [
      '第一个条件是90分及以上',
      '执行到第三个分支时，前面的条件已经不成立（即score<80），所以只需要判断>=60',
      '注意 if 条件的判断顺序是从上到下'
    ],
    knowledgePointIds: ['cpp-kp-3-1'],
    explanation: '第一个空是 score >= 90（因为后面的 else if 已经隐含 <90）。第二个空是 score >= 60（前面隐含 <80，所以 60<=score<=79）。'
  }),

  'cpp-p-3-2': new Problem({
    id: 'cpp-p-3-2',
    title: '闰年判断',
    type: ProblemType.CODE_WRITE,
    difficulty: Difficulty.INTERMEDIATE,
    description: '编写程序，输入年份 y，判断是否为闰年。是输出 YES，否则输出 NO。\n\n闰年规则：\n1. 能被4整除但不能被100整除，或\n2. 能被400整除',
    codeTemplate: '',
    answer: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int y;\n    cin >> y;\n    bool isLeap = (y%4==0 && y%100!=0) || (y%400==0);\n    cout << (isLeap ? "YES" : "NO") << endl;\n    return 0;\n}',
    hints: [
      '用 % 判断整除：x % n == 0 表示 x 能被 n 整除',
      '条件1：(y%4==0 && y%100!=0)，条件2：(y%400==0)',
      '两个条件是 "或" 的关系，用 || 连接',
      '可以用三元运算符 (条件? "YES":"NO") 简化输出'
    ],
    knowledgePointIds: ['cpp-kp-2-2', 'cpp-kp-3-1'],
    explanation: '核心条件：(y%4==0 && y%100!=0) || (y%400==0)。例如2020年：能被4整除且不是整百年→是。1900年：能被100整除但不能被400→不是。2000年：能被400→是。'
  }),

  'cpp-p-3-3': new Problem({
    id: 'cpp-p-3-3',
    title: '求和 (for循环)',
    type: ProblemType.CODE_COMPLETE,
    difficulty: Difficulty.BASIC,
    description: '补全代码：计算 1+2+3+...+n 的和并输出。',
    codeTemplate: `int sum = 0;
for (int i = 1; ____; i++) {
    ____;
}
cout << sum << endl;`,
    answer: 'i <= n, sum += i 或 sum = sum + i',
    hints: [
      '循环需要执行 n 次，i 从 1 到 n',
      '循环条件是 i 不超过 n',
      '每次循环把 i 加到 sum 上'
    ],
    knowledgePointIds: ['cpp-kp-3-2'],
    explanation: '循环条件 i <= n 保证 i 从 1 增加到 n。sum += i 把每个 i 累加到 sum，实现累加求和。'
  }),

  'cpp-p-3-4': new Problem({
    id: 'cpp-p-3-4',
    title: '统计正负数',
    type: ProblemType.CODE_WRITE,
    difficulty: Difficulty.INTERMEDIATE,
    description: '输入若干整数，输入 0 时结束。统计并输出正数的个数和负数的个数。\n\n输入样例：3 -1 5 -2 7 0\n输出样例：positive:3 negative:2',
    codeTemplate: '',
    answer: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    int pos = 0, neg = 0;\n    while (cin >> n && n != 0) {\n        if (n > 0) pos++;\n        else if (n < 0) neg++;\n    }\n    cout << "positive:" << pos << " negative:" << neg << endl;\n    return 0;\n}',
    hints: [
      '用 while 循环，输入 0 时停止',
      '循环条件：成功读取 n，且 n 不等于 0',
      '用两个计数器变量分别记录正数和负数',
      'n > 0 是正数，n < 0 是负数，0 不统计也不继续'
    ],
    knowledgePointIds: ['cpp-kp-3-1', 'cpp-kp-3-2'],
    explanation: 'while (cin >> n && n != 0) 既读取又判断。每次循环中，根据 n 的正负增加相应的计数器。格式输出要注意冒号后面没有空格，负数个数和前面空格隔开。'
  }),

  // 单元4题目
  'cpp-p-4-1': new Problem({
    id: 'cpp-p-4-1',
    title: '函数调用顺序',
    type: ProblemType.FILL_BLANK,
    difficulty: Difficulty.BASIC,
    description: '下面程序的输出结果中，数字1~3出现的顺序是______（用逗号分隔，如 1,2,3）\n\n```cpp\nvoid A() { cout << 1; }\nvoid B() { cout << 2; }\nvoid C() { A(); cout << 3; B(); }\nint main() { C(); return 0; }\n```',
    answer: '1,3,2',
    hints: [
      'main 调用了 C()',
      'C 函数先调用 A() 输出 1',
      '然后 cout 输出 3',
      '最后调用 B() 输出 2'
    ],
    knowledgePointIds: ['cpp-kp-4-1'],
    explanation: '调用链：main→C()→先 A() 输出1→cout 输出3→再 B() 输出2。所以顺序是 1,3,2。'
  }),

  'cpp-p-4-2': new Problem({
    id: 'cpp-p-4-2',
    title: '写函数-最大公约数',
    type: ProblemType.CODE_WRITE,
    difficulty: Difficulty.INTERMEDIATE,
    description: '编写函数 int gcd(int a, int b)，返回 a 和 b 的最大公约数。在 main 中读入两个数，调用函数输出结果。\n\n使用辗转相除法：gcd(a,b) = gcd(b, a%b)，当 b=0 时 a 就是答案。',
    codeTemplate: '',
    answer: '#include <iostream>\nusing namespace std;\n\nint gcd(int a, int b) {\n    while (b != 0) {\n        int temp = a % b;\n        a = b;\n        b = temp;\n    }\n    return a;\n}\n\nint main() {\n    int a, b;\n    cin >> a >> b;\n    cout << gcd(a, b) << endl;\n    return 0;\n}',
    hints: [
      '函数返回值类型是 int，函数名 gcd，参数两个 int',
      '辗转相除：只要 b 不为 0，就计算 a%b，然后 a=b, b=余数',
      '也可以用递归写：if (b==0) return a; else return gcd(b, a%b);',
      'main 函数读入两个数，调用 gcd 输出即可'
    ],
    knowledgePointIds: ['cpp-kp-4-1'],
    explanation: '辗转相除法核心：不断用除数和余数替换，直到余数为0。gcd(48, 18) 过程：48%18=12 → 18%12=6 → 12%6=0 → 答案6。'
  }),

  // 单元5题目
  'cpp-p-5-1': new Problem({
    id: 'cpp-p-5-1',
    title: '数组下标',
    type: ProblemType.MULTIPLE_CHOICE,
    difficulty: Difficulty.BASIC,
    description: 'int arr[5] = {10, 20, 30, 40, 50}; 下列哪个访问会出错或越界？',
    options: [
      'A. arr[0] = 100;',
      'B. cout << arr[4];',
      'C. arr[5] = 60;',
      'D. int x = arr[2];'
    ],
    answer: 'C',
    hints: [
      '数组下标从 0 开始',
      'arr[5] 有 5 个元素，下标范围是 0~4',
      'arr[5] 是第 6 个元素，不存在'
    ],
    knowledgePointIds: ['cpp-kp-5-1'],
    explanation: 'arr[5] 有5个元素，下标 0~4。C选项访问 arr[5] 越界，可能导致程序崩溃或数据损坏。'
  }),

  'cpp-p-5-2': new Problem({
    id: 'cpp-p-5-2',
    title: '数组逆序',
    type: ProblemType.CODE_COMPLETE,
    difficulty: Difficulty.INTERMEDIATE,
    description: '补全代码：将数组元素逆序存放（例如 [1,2,3,4,5] 变成 [5,4,3,2,1]）',
    codeTemplate: `// arr 是数组，n 是元素个数
for (int i = 0; i < ____; i++) {
    int temp = arr[i];
    arr[i] = arr[____];
    arr[____] = temp;
}`,
    answer: 'n/2, n-1-i, n-1-i',
    hints: [
      '只需要交换一半的元素（否则交换两次又变回原样）',
      '第 i 个元素和倒数第 i+1 个元素交换',
      '倒数第 i+1 个的下标是 n-1-i',
      '三个位置分别是：循环次数、右边的下标、右边的下标（和temp交换）'
    ],
    knowledgePointIds: ['cpp-kp-5-1'],
    explanation: '第一个空 n/2：只需循环前半部分。第二个空 n-1-i：第i个元素和第n-1-i个元素交换。第三个空相同下标（temp存左边，然后左=右，再右=temp）。'
  }),

  // 单元6题目
  'cpp-p-6-1': new Problem({
    id: 'cpp-p-6-1',
    title: '指针基础',
    type: ProblemType.FILL_BLANK,
    difficulty: Difficulty.INTERMEDIATE,
    description: '执行以下代码后，x 的值是______，y 的值是______\n\n```cpp\nint x = 5, y = 10;\nint* p = &x;\n*p = 20;\np = &y;\n*p = *p + x;\n```',
    answer: '20, 30',
    hints: [
      'p 一开始指向 x，*p=20 就是 x=20',
      '然后 p 改变指向，指向 y',
      '最后 *p = *p + x 就是 y = y + 20',
      'y 原来是 10，加 20 等于 30'
    ],
    knowledgePointIds: ['cpp-kp-6-1'],
    explanation: '第1-2行：p指向x，*p=20 → x=20。第3-4行：p指向y，*p = y+x = 10+20 = 30 → y=30。最终x=20, y=30。'
  }),

  // 单元7题目
  'cpp-p-7-1': new Problem({
    id: 'cpp-p-7-1',
    title: '构造函数调用',
    type: ProblemType.MULTIPLE_CHOICE,
    difficulty: Difficulty.INTERMEDIATE,
    description: 'class A { public: A(){} A(int x){} }; 哪个语句创建对象时会调用有参构造 A(int x)？',
    options: [
      'A. A a;',
      'B. A a();',
      'C. A a(5);',
      'D. A a = A;'
    ],
    answer: 'C',
    hints: [
      'A 选项没有传参数，调用默认构造',
      'B 选项其实是声明了一个函数（最令人困惑的语法！）',
      'C 选项传了一个整数参数',
      'D 写法错误'
    ],
    knowledgePointIds: ['cpp-kp-7-1'],
    explanation: 'C正确。A调用默认构造。B是函数声明陷阱！（函数a返回A类型）。D写法错误。'
  }),

  // 单元8题目
  'cpp-p-8-1': new Problem({
    id: 'cpp-p-8-1',
    title: 'vector 操作',
    type: ProblemType.FILL_BLANK,
    difficulty: Difficulty.INTERMEDIATE,
    description: '执行后 v.size() = ______，v[0] = ______\n\n```cpp\nvector<int> v;\nv.push_back(1);\nv.push_back(2);\nv.push_back(3);\nv.pop_back();\nv[0] = v[0] + v[1];\n```',
    answer: '2, 3',
    hints: [
      'push_back 三次后有3个元素',
      'pop_back 删除最后一个（去掉了3），剩下1和2',
      'v[0] = 1 + v[1]，v[1] 是 2',
      '结果：v[0]=1+2=3，v.size() 还是 2'
    ],
    knowledgePointIds: ['cpp-kp-8-1'],
    explanation: 'push_back 3次 → v=[1,2,3]。pop_back → v=[1,2] (size=2)。v[0] = v[0]+v[1] = 1+2 = 3。结果 size=2, v[0]=3。'
  }),

  // 单元9题目
  'cpp-p-9-1': new Problem({
    id: 'cpp-p-9-1',
    title: '文件操作',
    type: ProblemType.MULTIPLE_CHOICE,
    difficulty: Difficulty.INTERMEDIATE,
    description: '想在文件末尾追加内容（不覆盖原内容），ofstream 打开方式应该用？',
    options: [
      'A. ios::in',
      'B. ios::out（默认）',
      'C. ios::app',
      'D. ios::binary'
    ],
    answer: 'C',
    hints: [
      'ios::in 是读，不是写',
      '默认 ios::out 会清空文件重新写',
      'app 是 append 的缩写',
      'binary 是二进制模式，和追加无关'
    ],
    knowledgePointIds: ['cpp-kp-9-1'],
    explanation: 'C 正确。ios::app 追加模式。ios::out 默认会清空原文件内容。'
  }),
};

const cppUnits = [
  // 单元1
  new LearningUnit({
    id: 'cpp-u-1',
    title: '第1章：C++ 入门',
    description: '认识 C++，学会输出信息和读取输入，编写第一个程序',
    difficulty: Difficulty.BEGINNER,
    order: 1,
    knowledgePoints: [cppKnowledgePoints['cpp-kp-1-1'], cppKnowledgePoints['cpp-kp-1-2']],
    problems: [cppProblems['cpp-p-1-1'], cppProblems['cpp-p-1-2'], cppProblems['cpp-p-1-3'], cppProblems['cpp-p-1-4']]
  }),

  // 单元2
  new LearningUnit({
    id: 'cpp-u-2',
    title: '第2章：变量、数据类型与运算符',
    description: '学会声明变量和各种运算，掌握表达式的写法',
    difficulty: Difficulty.BASIC,
    order: 2,
    knowledgePoints: [cppKnowledgePoints['cpp-kp-2-1'], cppKnowledgePoints['cpp-kp-2-2']],
    problems: [cppProblems['cpp-p-2-1'], cppProblems['cpp-p-2-2'], cppProblems['cpp-p-2-3'], cppProblems['cpp-p-2-4']]
  }),

  // 单元3
  new LearningUnit({
    id: 'cpp-u-3',
    title: '第3章：流程控制',
    description: '掌握 if/switch 条件判断和 for/while 循环，让程序做判断和重复',
    difficulty: Difficulty.BASIC,
    order: 3,
    knowledgePoints: [cppKnowledgePoints['cpp-kp-3-1'], cppKnowledgePoints['cpp-kp-3-2']],
    problems: [cppProblems['cpp-p-3-1'], cppProblems['cpp-p-3-2'], cppProblems['cpp-p-3-3'], cppProblems['cpp-p-3-4']]
  }),

  // 单元4
  new LearningUnit({
    id: 'cpp-u-4',
    title: '第4章：函数与模块化编程',
    description: '学会定义函数，将代码分解成可复用的模块',
    difficulty: Difficulty.BASIC,
    order: 4,
    knowledgePoints: [cppKnowledgePoints['cpp-kp-4-1']],
    problems: [cppProblems['cpp-p-4-1'], cppProblems['cpp-p-4-2']]
  }),

  // 单元5
  new LearningUnit({
    id: 'cpp-u-5',
    title: '第5章：数组与字符串',
    description: '使用数组存储批量数据，处理二维表格和字符串',
    difficulty: Difficulty.BASIC,
    order: 5,
    knowledgePoints: [cppKnowledgePoints['cpp-kp-5-1']],
    problems: [cppProblems['cpp-p-5-1'], cppProblems['cpp-p-5-2']]
  }),

  // 单元6
  new LearningUnit({
    id: 'cpp-u-6',
    title: '第6章：指针与引用',
    description: '理解内存地址，掌握指针和引用的用法（C++ 核心难点）',
    difficulty: Difficulty.INTERMEDIATE,
    order: 6,
    knowledgePoints: [cppKnowledgePoints['cpp-kp-6-1'], cppKnowledgePoints['cpp-kp-6-2']],
    problems: [cppProblems['cpp-p-6-1']]
  }),

  // 单元7
  new LearningUnit({
    id: 'cpp-u-7',
    title: '第7章：面向对象编程',
    description: '学习类与对象、继承、多态，掌握面向对象设计思想',
    difficulty: Difficulty.INTERMEDIATE,
    order: 7,
    knowledgePoints: [cppKnowledgePoints['cpp-kp-7-1'], cppKnowledgePoints['cpp-kp-7-2']],
    problems: [cppProblems['cpp-p-7-1']]
  }),

  // 单元8
  new LearningUnit({
    id: 'cpp-u-8',
    title: '第8章：STL 标准库',
    description: '熟练使用 vector, map, set, string 等容器和标准算法',
    difficulty: Difficulty.INTERMEDIATE,
    order: 8,
    knowledgePoints: [cppKnowledgePoints['cpp-kp-8-1']],
    problems: [cppProblems['cpp-p-8-1']]
  }),

  // 单元9
  new LearningUnit({
    id: 'cpp-u-9',
    title: '第9章：文件操作与异常处理',
    description: '学会读写文件、保存数据，处理程序运行中的错误',
    difficulty: Difficulty.ADVANCED,
    order: 9,
    knowledgePoints: [cppKnowledgePoints['cpp-kp-9-1']],
    problems: [cppProblems['cpp-p-9-1']]
  })
];

const cppProjects = [
  new Project({
    id: 'cpp-project-1',
    title: '项目1：学生成绩管理系统',
    description: '开发一个控制台学生成绩管理系统，支持添加学生、查询成绩、统计分析、保存/读取文件。这是你第一个综合项目！',
    difficulty: Difficulty.INTERMEDIATE,
    prerequisites: '第1~5章 + 第9章',
    requirements: [
      '支持添加学生：姓名、学号、3门课成绩',
      '显示所有学生列表（表格形式）',
      '按姓名或学号查询学生',
      '修改和删除学生信息',
      '统计功能：班级平均分、每门课平均分、最高分学生',
      '学生数据保存到文件，下次启动自动加载',
      '友好的菜单交互（1.添加 2.查询 3.修改...）'
    ],
    techStack: [
      'struct Student 结构体存储数据',
      'vector<Student> 管理学生列表',
      'fstream 读写文件（可用 .txt 或 .csv 格式）',
      'do-while + switch 实现菜单',
      'string 的查找处理查询功能'
    ],
    architectureHint: `
建议结构：
├── struct Student { id, name, scores[3] }
├── vector<Student> students
├── void loadData()    // 启动时从文件读取
├── void saveData()    // 保存到文件
├── void addStudent()  // 添加
├── void showAll()     // 显示全部
├── void searchStudent()
├── void modifyStudent()
├── void deleteStudent()
├── void showStatistics()
└── int main() { 菜单循环 }`,
    testCases: [
      '添加3个学生后，列表正确显示3条记录',
      '按学号查询能找到对应学生',
      '修改成绩后统计的平均分随之改变',
      '关闭程序再打开，之前的数据仍然存在',
      '删除不存在的学号有友好提示'
    ],
    referenceSolution: `
1. 定义 Student 结构体，id+name+数组存3科成绩
2. 主函数用 do-while 显示菜单，switch 处理选项
3. 添加：cin 读入数据 push_back 到 vector
4. 查询：遍历 vector，比较 id/name（== 或 .find()）
5. 修改/删除：找到对应下标，进行操作或 erase
6. 统计：遍历累加，用变量记录最大值
7. 文件：写操作 << 每一行，读操作 getline 或 >> 逐字段读取`
  }),

  new Project({
    id: 'cpp-project-2',
    title: '项目2：贪吃蛇小游戏',
    description: '用控制台实现经典贪吃蛇游戏。使用方向键控制蛇移动，吃食物增长身体，撞墙或撞自己游戏结束。',
    difficulty: Difficulty.ADVANCED,
    prerequisites: '第1~8章，以及面向对象编程',
    requirements: [
      '20x20 的游戏区域，边界显示',
      '蛇用 * 表示，食物用 @ 表示',
      '方向键（WASD 或 ↑↓←→）控制方向',
      '吃食物后身体+1，分数+10',
      '撞墙或撞自己：游戏结束，显示最终分数',
      '实时刷新画面（清屏+重绘）',
      '可暂停/继续，显示最高分'
    ],
    techStack: [
      'OOP：class Snake、class Food、class Game',
      '双向队列 deque 存蛇身坐标',
      '键盘输入：kbhit() + getch()（Windows）或 termios（Linux）',
      '清屏：system("cls") 或 system("clear")',
      '随机数：rand() % n 生成食物位置',
      'Sleep() 或 usleep() 控制游戏速度'
    ],
    architectureHint: `
核心类设计：
struct Point { int x, y; bool operator==(const Point&); };
class Snake {
    deque<Point> body;
    int dir; // 0上 1下 2左 3右
public: move(), grow(), checkCollision(), head()
};
class Food { Point pos; void generate(Snake&); };
class Game {
    Snake snake; Food food; int score; bool gameOver;
public: init(), draw(), input(), logic(), run()
};`,
    testCases: [
      '蛇撞墙 → Game Over',
      '蛇头碰到自己身体 → Game Over',
      '吃到食物 → 分数+10，蛇身增长，食物重新生成不与蛇重叠',
      '不能直接反向移动（向右时按左应该忽略）',
      '显示分数并随吃食物增加'
    ],
    referenceSolution: `
核心逻辑：
1. 初始化：蛇在中心，长度3，向右移动
2. 每次循环：处理输入→移动蛇→判断吃食物（头与食物坐标相同）
3. 不吃食物：去尾+加头；吃食物：只加头，重新生成食物
4. 撞墙：头坐标在边界外；撞自己：deque中从头后开始查找是否有相同坐标
5. 绘制：先cout多次换行或system("cls")清屏，然后逐行打印，根据坐标判断是墙/蛇/食物/空`
  }),

  new Project({
    id: 'cpp-project-3',
    title: '项目3：JSON 解析器',
    description: '实现一个简化版 JSON 解析器，支持对象、数组、字符串、数字、布尔和 null。这是一个非常有挑战的编译原理入门项目！',
    difficulty: Difficulty.ADVANCED,
    prerequisites: '第1~8章全部掌握，STL 容器熟练使用',
    requirements: [
      '支持 JSON 类型：object, array, string, number, true, false, null',
      '从字符串解析：JsonValue parse(string)',
      '支持嵌套对象和数组',
      '支持转义字符：\\", \\\\, \\n, \\t 等',
      '错误处理：解析失败抛出异常或返回错误信息',
      '支持序列化：JsonValue 转成字符串输出',
      '提供便捷访问 API：value["key"], value[0]'
    ],
    techStack: [
      'Variant/多态：class JsonValue + 派生类存各类型',
      '递归下降解析：递归下降是手写解析器的经典方法',
      'map/vector 存 object 和 array',
      '异常 try/catch 处理解析错误'
    ],
    architectureHint: `
类型设计：
enum JsonType { JSON_NULL, BOOL, NUMBER, STRING, ARRAY, OBJECT };
class JsonValue {
    JsonType type;
    // 可用 union 或派生类（推荐用多态更清晰）
public: is_object(), is_array(), operator[], toString(), etc.
};
解析器：
class Parser {
    string src; int pos;
    char peek(); char next(); void skipWs();
    JsonValue parseValue();       // 总入口
    JsonValue parseObject();      // {...}
    JsonValue parseArray();       // [...]
    JsonValue parseString();      // "..."
    JsonValue parseNumber();      // 数字
    JsonValue parseLiteral();     // true/false/null
};`,
    testCases: [
      '解析 {} → 返回空对象',
      '解析 {"a":1, "b":[1,2,3]} → 正确嵌套结构',
      '解析 "hello\\\\nworld" → 处理换行转义',
      '错误输入 {a:1} （key没引号）→ 抛出异常',
      'value["a"][1] 能访问嵌套的值'
    ],
    referenceSolution: `
递归下降解析步骤：
1. parseValue：根据当前字符判断类型
   - '{' → parseObject
   - '[' → parseArray
   - '"' → parseString
   - '-',数字 → parseNumber
   - t/f/n → parseLiteral (true/false/null)
2. parseObject：跳过 '{'，循环 parseString→parseValue，逗号分隔，直到 '}'
3. parseArray：类似，但 value 之间逗号分隔
4. parseString：读到下一个未转义的双引号，处理 \\ 转义
5. parseNumber：用 stod 转换（或自己写）
6. 记得每层都要跳过空白字符（空格、换行、Tab）`
  })
];

export const cppLearningPath = new LearningPath({
  language: 'cpp',
  units: cppUnits,
  projects: cppProjects
});
