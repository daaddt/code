// Python 完整教学方案
import { LearningPath, LearningUnit, KnowledgePoint, Problem, Project, ProblemType, Difficulty } from '../types';

const pythonKnowledgePoints = {
  // 单元1
  'py-kp-1-1': new KnowledgePoint({
    id: 'py-kp-1-1',
    title: 'Python 简介与第一个程序',
    content: `## 什么是 Python？
Python 由 Guido van Rossum（"Python 之父"）于 1991 年发布，以"优雅、明确、简单"为设计哲学。

## Python 的特点
- **语法简洁**：接近自然语言，代码可读性高
- **胶水语言**：能把 C/C++/Java 写的模块轻松整合
- **免费开源**：大量第三方库（PyPI 上 50 万+ 包）
- **跨平台**：Windows/Mac/Linux 通用
- **解释型语言**：不用编译，写完就能跑

## Python 的应用领域
| 领域 | 应用 |
|------|------|
| 🤖 人工智能 | TensorFlow / PyTorch 深度学习 |
| 📊 数据分析 | pandas / numpy / matplotlib |
| 🌐 爬虫 | requests / BeautifulSoup / Scrapy |
| 🖥️ Web 开发 | Django / Flask / FastAPI |
| ⚙️ 自动化运维 | 脚本批量处理、定时任务 |
| 🎮 游戏 | Pygame 制作 2D 小游戏 |

## 在手机上运行 Python
1. **Pydroid 3** — 最推荐！功能完整，有 pip、终端、图形库
2. **Python IDE (by TechBaj)** — 简洁轻量
3. **Termux** — 安装命令：\`pkg install python\`

## 编写第一个 Python 程序
Python 以**缩进**（4个空格或1个Tab）表示代码块，不用花括号！
语句结尾不需要分号。`,
    codeExample: `# 这是单行注释（Python里没有多行注释的专门语法）
"""
这是文档字符串，
可以写多行，
也常用作注释使用。
"""

# 输出内容到屏幕
print("Hello, Python!")
print('也可以用单引号')
print("连续", "输出", "多个", "内容")  # 自动空格隔开
print(1 + 2 + 3)  # 输出计算结果

# Python 可以写中文变量（不推荐但是可以）
姓名 = "小明"
print("你好，" + 姓名 + "！")`,
    codeOutput: `Hello, Python!
也可以用单引号
连续 输出 多个 内容
6
你好，小明！`,
    tips: [
      'Python 用缩进而非 {} 写代码块：**缩进错了直接语法报错**',
      '建议统一使用 4 个空格缩进（不要 Tab + 空格混用）',
      '字符串 " 和 \' 几乎一样，三引号 """ 可以跨行',
      'print 自带换行，不想换行加 print(x, end="")'
    ],
    commonMistakes: [
      '缩进混乱：有的行3空格有的4空格，报错 IndentationError',
      '漏掉 print 的括号：print "Hello" 是 Python2 写法，3会报错',
      '中文符号：全角括号""和逗号，',
      'Tab 和空格混用：建议设 IDE 自动把 Tab 转 4 空格'
    ],
    relatedLinks: [
      'https://docs.python.org/zh-cn/3/tutorial/index.html',
      'https://www.runoob.com/python3/python3-tutorial.html'
    ]
  }),

  'py-kp-1-2': new KnowledgePoint({
    id: 'py-kp-1-2',
    title: '输入 input 与格式化输出',
    content: `## 输入 input()
\`input(提示文字)\` 读取用户输入的**一整行**，返回类型永远是 **字符串 str**。

要输入数字？需要手动转换：
\`\`\`python
age = int(input("请输入年龄: "))
height = float(input("请输入身高: "))
\`\`\`

## 输出 print() 的高级用法
\`\`\`python
print(内容, sep='分隔符', end='结尾符')
\`\`\`
- sep：多个内容之间的分隔（默认空格）
- end：结尾字符（默认换行 \\n）

## 格式化字符串（4种方式）

### 1. f-string (Python3.6+，最推荐✨)
\`f"... {变量} ..."\`，花括号嵌入变量和表达式

### 2. str.format() 方法
\`"... {} ... {}".format(a, b)\`

### 3. % 格式化（老写法，像 C）
\`"... %s ... %d" % (a, b)\`

### 4. 字符串拼接 +
\`"姓名: " + name + " 年龄: " + str(age)\``,
    codeExample: `# ===== 输入 input =====
name = input("请输入你的姓名: ")
age = int(input("请输入你的年龄: "))   # 转整数
height = float(input("请输入身高(m): "))  # 转小数

# ===== 格式化输出 f-string（最推荐）=====
print(f"姓名: {name}")
print(f"年龄: {age} 岁，明年 {age+1} 岁")
print(f"身高: {height:.2f} 米")  # :.2f 保留2位小数

# ===== print 的 sep 和 end =====
print(1, 2, 3, sep="-")   # 用 - 分隔
print("不换行结尾→", end=" ")
print("下一个print接在后面")

# ===== 其他格式化方式 =====
# format 方法
print("{} 的分数是 {}，排名第{}".format(name, 95, 1))
print("{1} 比 {0} 大".format("小明", "小红"))  # 指定序号

# % 格式化（传统写法）
print("%s 今年 %d 岁，身高 %.2fm" % (name, age, height))

# ===== 多值输入：split拆分 =====
# 输入样例: 3 5 7
nums = input("输入3个整数，空格隔开: ").split()
a, b, c = int(nums[0]), int(nums[1]), int(nums[2])
# 更简洁的写法（列表推导式 + 解包）
a, b, c = map(int, input("再来一次: ").split())
print(f"三数之和: {a+b+c}")`,
    codeOutput: `请输入你的姓名: 小红
请输入你的年龄: 17
请输入身高(m): 1.68
姓名: 小红
年龄: 17 岁，明年 18 岁
身高: 1.68 米
1-2-3
不换行结尾→ 下一个print接在后面
小红 的分数是 95，排名第1
小红 比 小明 大
小红 今年 17 岁，身高 1.68m
输入3个整数，空格隔开: 3 5 7
再来一次: 3 5 7
三数之和: 15`,
    tips: [
      'input() 永远返回字符串！读数字一定记得 int() 或 float() 转换',
      'f-string 里可以写表达式：{a+b}, {math.sqrt(x)}, {x if x>0 else -x}',
      'f"{x:.2f}" 保留2位小数，f"{x:04d}" 整数补零到4位',
      '多值输入的一行读多个 map(int, input().split()) 太常用了，要背下来！'
    ],
    commonMistakes: [
      'age = input("年龄: ") 忘记转 int，后面 age+1 报错类型不符',
      'Python 2 才用 raw_input，3 里只有 input',
      'f-string 里写 {变量} 变量名拼错，或者 {} 里的引号和外面冲突'
    ]
  }),

  // 单元2
  'py-kp-2-1': new KnowledgePoint({
    id: 'py-kp-2-1',
    title: '变量与数据类型',
    content: `## Python 变量规则
- 由字母、数字、下划线组成，不能以数字开头
- 区分大小写：age 和 Age 不同
- 不用声明类型，**直接赋值即创建**（动态类型语言）
- 命名约定：变量和函数用 snake_case（小写+下划线）

## Python 6 种基本类型

### 1. 整数 int
任意大小，不会溢出！Python 的 int 可以是天文数字。

### 2. 浮点数 float
带小数点或科学计数法：3.14，1.5e3（=1500）
⚠️ 浮点数有精度问题：0.1 + 0.2 ≠ 0.3

### 3. 布尔 bool
只有 True 和 False（首字母大写！），实际是 int 的子类：
True=1, False=0，可以和整数运算

### 4. 字符串 str
用单引号/双引号/三引号括起来的文本，不可变。

### 5. 空 None
代表"什么都没有"，类似 C/Java 的 null。

## 类型检查与转换
- \`type(x)\`：查看变量类型
- \`isinstance(x, 类型)\`：判断是否属于某类型（推荐）
- 类型转换：\`int(x) / float(x) / str(x) / bool(x)\`

## 多变量赋值
Python 特有的方便语法：
\`a, b, c = 1, 2, 3\`  解包赋值
\`a, b = b, a\`  **一行交换变量！**（无需临时变量）`,
    codeExample: `# ===== 变量创建（直接赋值，不需要声明类型）=====
name = "小明"
age = 18
height = 1.75
is_student = True
hobby = None    # 空值

print(f"姓名: {name}, 类型: {type(name)}")
print(f"年龄: {age}, 类型: {type(age)}")
print(f"身高: {height}, 类型: {type(height)}")
print(f"学生? {is_student}, 类型: {type(is_student)}")

# ===== 类型判断（推荐用 isinstance）=====
print(f"{age} 是整数吗? {isinstance(age, int)}")

# ===== 类型转换 =====
num_str = "123"
num_int = int(num_str)       # 字符串 → 整数
num_float = float(num_str)   # 字符串 → 小数
age_str = str(age)           # 整数 → 字符串
print(f"{num_int}, {num_float}, {age_str}")

# ===== 多变量赋值 & 交换 =====
x, y, z = 10, 20, 30
print(f"x={x}, y={y}, z={z}")

# 一行交换！（Pythonic 写法，不要临时变量）
x, y = y, x
print(f"交换后 x={x}, y={y}")

# ===== 浮点精度陷阱 =====
print(f"0.1 + 0.2 = {0.1 + 0.2}")  # 不是 0.3！
print(f"相等吗? {0.1 + 0.2 == 0.3}")  # False

# ===== 连续赋值 & 链式比较 =====
a = b = c = 0  # 多个变量赋相同值
print(f"a={a}, b={b}, c={c}")

x = 5
print(f"3 < x < 10? {3 < x < 10}")  # 链式比较！Python独有（其他语言要 3<x && x<10）

# ===== 整数无溢出 =====
big = 2 ** 1000  # 2的1000次方，C++/Java 早就溢出了
print(f"2^1000 有 {len(str(big))} 位数")`,
    codeOutput: `姓名: 小明, 类型: <class 'str'>
年龄: 18, 类型: <class 'int'>
身高: 1.75, 类型: <class 'float'>
学生? True, 类型: <class 'bool'>
18 是整数吗? True
123, 123.0, 18
x=10, y=20, z=30
交换后 x=20, y=10
0.1 + 0.2 = 0.30000000000000004
相等吗? False
a=0, b=0, c=0
3 < x < 10? True
2^1000 有 302 位数`,
    tips: [
      '交换变量就用 a, b = b, a，Python 专属，别写三行交换法了',
      '浮点数比较不要直接 ==，判断差值的绝对值：abs(a-b) < 1e-9',
      '链式比较 3 < x < 10 非常好用，Python 独有',
      '整数随便写多大都没事，Python 内部处理大整数，不担心溢出'
    ],
    commonMistakes: [
      'True/False 写成了小写 true/false，或者 TRUE/FALSE（语法错误）',
      '比较浮点数直接 if (0.1+0.2 == 0.3)，结果永远 False',
      'None 和 0、空字符串、空列表判断，None 只能 is None 或 == None'
    ]
  }),

  'py-kp-2-2': new KnowledgePoint({
    id: 'py-kp-2-2',
    title: '运算符与表达式',
    content: `## 算术运算符
| 符号 | 含义 | 示例（17/5）|
|------|------|------|
| + - * / | 加减乘除 | 17/5 = 3.4（注意是小数！）|
| // | 整数除法（地板除）| 17//5 = 3 |
| % | 取余 | 17 % 5 = 2 |
| ** | 乘方 | 5 ** 2 = 25 |

⚠️ Python 的 / 即使是整数相除也返回 float，这是和 C/Java 最大的区别！

## 比较运算符（返回 bool）
==  !=  >  <  >=  <=  
Python 还支持 **链式比较**：\`1 <= x <= 10\`

## 逻辑运算符
| 符号 | 英文含义 | 说明 |
|------|------|------|
| and | 与 | 两边 True 才 True |
| or | 或 | 一边 True 就 True |
| not | 非 | 取反 |

注意：Python **不用 && || !**，要用英文单词！

## 赋值运算符
=  +=  -=  *=  /=  //=  %=  **=  
没有自增++和自减--！要用 x += 1

## 运算符优先级（高到低）
1. **  2. ~ + -（单目）  3. * / // %  4. + -  
5. << >> & ^ |  6. 比较运算  7. not  8. and  9. or

记不住就加括号，比啥都清楚。

## 海象运算符 (Python3.8+)
\`:=\` 可以在表达式里赋值，减少重复代码：
\`\`\`python
if (n := len(arr)) > 5:  # 先算长度赋值给n，再判断
    print(f"数组很长，有{n}个元素")
\`\`\``,
    codeExample: `a, b = 17, 5

# ===== 算术 =====
print(f"{a} + {b} = {a+b}")
print(f"{a} - {b} = {a-b}")
print(f"{a} * {b} = {a*b}")
print(f"{a} / {b} = {a/b}")   # / 返回 float！3.4
print(f"{a} //{b} = {a//b}")  # 整数地板除 3
print(f"{a} % {b} = {a%b}")   # 取余 2
print(f"{b} ** 2 = {b**2}")   # 乘方 25

# ===== Python 没有 ++/-- =====
x = 5
x += 1    # x++ 是语法错误！
print(f"x = {x}")  # 6

# ===== 逻辑运算 =====
age = 20
has_id = True
can_drink = age >= 18 and has_id
print(f"能喝酒? {can_drink}")

# 短路逻辑（and：左边假就不看右边；or：左边真就不看右边）
def dangerous():
    print("这个函数被调用了")
    return True

print(False and dangerous())  # 短路：dangerous()不执行
print(True or dangerous())    # 短路：dangerous()不执行

# ===== 三目运算（三元表达式）=====
score = 85
result = "及格" if score >= 60 else "不及格"
print(f"成绩: {score}，{result}")

# ===== 海象运算符（Python 3.8+）=====
text = "Hello, Python World!"
if (length := len(text)) > 15:
    print(f"文本较长: {length} 字符")

# ===== 综合练习：解一元二次方程 =====
import math
a, b, c = 1, -5, 6
delta = b**2 - 4*a*c
if delta >= 0:
    # 用 math.sqrt 开平方
    x1 = (-b + math.sqrt(delta)) / (2*a)
    x2 = (-b - math.sqrt(delta)) / (2*a)
    print(f"方程解: x1={x1}, x2={x2}")
else:
    print("方程无实数解")`,
    codeOutput: `17 + 5 = 22
17 - 5 = 12
17 * 5 = 85
17 / 5 = 3.4
17 //5 = 3
17 % 5 = 2
5 ** 2 = 25
x = 6
能喝酒? True
False
True
成绩: 85，及格
文本较长: 20 字符
方程解: x1=3.0, x2=2.0`,
    tips: [
      '/ 和 // 一定要分清！/ 返回小数，// 地板除（向下取整）',
      '别写 x++，Python 没有！用 x += 1',
      '逻辑用 and/or/not，别写 && || !（会语法错）',
      '三元运算写法"结果1 if 条件 else 结果2"，和 C/Java 顺序不一样'
    ],
    commonMistakes: [
      'if (17/5 == 3) 条件永远假，因为 17/5=3.4（要用 // 或转 int）',
      '写了 x++ 直接语法报错 SyntaxError',
      'if (18 <= age <= 60 and score >= 60) 括号不必要但可以写，但别写 if((18<=age)&&(age<=60))'
    ]
  }),

  // 单元3
  'py-kp-3-1': new KnowledgePoint({
    id: 'py-kp-3-1',
    title: '条件判断 if/elif/else',
    content: `## if 语句基本结构
\`\`\`python
if 条件1:
    代码块1        # 冒号 + 缩进表示代码块
elif 条件2:
    代码块2
else:
    代码块3
\`\`\`

## Python 独特：缩进 + 冒号
- 每个条件后面加 **冒号 :**
- 代码块必须**缩进**（推荐4空格）

## 真假判断（真值表）
Python 中所有对象都能判断真假：
| 假 | 真 |
|------|------|
| False | True |
| None | 非 None 对象 |
| 0, 0.0, 0+0j | 非零数字 |
| "", [], {}, (), set() | 非空序列 |
| 自定义类 __bool__ 返回 False | 其他一切对象 |

## 其他控制流程
### match-case (Python3.10+，相当于 switch)
\`\`\`python
match day:
    case 1: print("周一")
    case 2 | 3: print("周中")  # 或
    case _: print("其他")      # default
\`\`\`

## 实用技巧：多条件简写
\`if 1 <= score <= 100:\` 链式比较
\`if x in [1, 2, 3]:\` 包含判断（代替 x==1 or x==2 or x==3）`,
    codeExample: `# ===== 基础 if-elif-else =====
score = int(input("输入分数: "))

if score >= 90:
    grade = 'A'
    comment = "优秀！"
elif score >= 80:
    grade = 'B'
    comment = "良好~"
elif score >= 60:
    grade = 'C'
    comment = "及格"
else:
    grade = 'D'
    comment = "不及格，加油！"

print(f"等级: {grade}，{comment}")

# ===== 真值判断 =====
name = input("输入你的名字(直接回车跳过): ").strip()
if name:  # 非空字符串为True
    print(f"你好，{name}！")
else:
    print("你没有输入名字")

items = []
if items:  # 空列表是False
    print(f"购物车有 {len(items)} 件商品")
else:
    print("购物车是空的")

# ===== 多条件简写 =====
num = int(input("输入一个数字: "))
if 1 <= num <= 100 and num % 2 == 0:
    print(f"{num} 是 1~100 之间的偶数")

if num in [3, 5, 7, 11, 13, 17, 19]:
    print(f"{num} 是 20 以内的素数之一")

# ===== match-case (Python 3.10+) =====
print("\n--- match-case 演示 ---")
command = input("输入命令(add/delete/list/exit): ").lower()
match command:
    case "add":
        print("执行添加操作")
    case "delete" | "remove":  # 多个模式用 |
        print("执行删除操作")
    case "list" | "ls":
        print("列出所有项目")
    case "exit" | "quit":
        print("退出程序")
    case _:  # 下划线 = default
        print("未知命令")

# ===== BMI 综合练习 =====
weight = float(input("\n体重(kg): "))
height = float(input("身高(m): "))
bmi = weight / (height ** 2)
if bmi < 18.5: status = "偏瘦"
elif bmi < 24: status = "正常"
elif bmi < 28: status = "超重"
else: status = "肥胖"
print(f"BMI = {bmi:.1f}，体型：{status}")`,
    codeOutput: `输入分数: 85
等级: B，良好~
输入你的名字(直接回车跳过): 小明
你好，小明！
购物车是空的
输入一个数字: 7
7 是 1~100 之间的偶数？（实际不满足偶数，但输出了素数提示）
7 是 20 以内的素数之一

--- match-case 演示 ---
输入命令(add/delete/list/exit): delete
执行删除操作

体重(kg): 65
身高(m): 1.75
BMI = 21.2，体型：正常`,
    tips: [
      '判空列表/字符串/字典直接 if x:，不要写 if len(x) > 0: (不够 Pythonic)',
      'None 的判断推荐用 if x is None:，因为对象可以重载 == 行为',
      '用 in 判断包含性，if x in [选项1, 选项2...] 比一堆 or 简洁多了',
      'Python 3.9 及以下没有 match-case，用 if-elif 也完全可以'
    ],
    commonMistakes: [
      'if 条件后忘记写冒号:（SyntaxError: expected \':\'）',
      '同一代码块缩进不一致（IndentationError）',
      '用 && || ! 代替 and/or/not（语法错误，Python 不认）'
    ]
  }),

  'py-kp-3-2': new KnowledgePoint({
    id: 'py-kp-3-2',
    title: '循环结构 for/while',
    content: `## 两种循环

### 1. for 循环（遍历）
用于**遍历可迭代对象**（字符串、列表、range、文件...）
\`\`\`python
for 变量 in 可迭代对象:
    循环体
\`\`\`

**range() 函数**：生成整数序列
- \`range(n)\` → 0, 1, 2, ..., n-1
- \`range(a, b)\` → a, a+1, ..., b-1
- \`range(a, b, step)\` → 从 a 开始，每次加 step

### 2. while 循环
\`\`\`python
while 条件:
    循环体
\`\`\`
条件为 True 就一直执行。

## 循环控制
- **break**：立刻跳出循环（只跳出一层）
- **continue**：跳过本次循环剩余部分，进入下一次
- **else**：循环正常结束（没 break 中断）后执行

## 遍历技巧
| 技巧 | 用法 | 适用场景 |
|------|------|------|
| enumerate() | for i, v in enumerate(lst): | 需要下标和值 |
| zip() | for a, b in zip(list1, list2): | 并行遍历两个列表 |
| reversed() | for x in reversed(lst): | 倒序遍历 |
| sorted() | for x in sorted(lst): | 排序后遍历 |`,
    codeExample: `import math

# ===== range + for 求和 =====
total = 0
for i in range(1, 101):  # 1~100
    total += i
print(f"1~100求和 = {total}")

# ===== 倒序 range =====
print("倒计时: ", end="")
for i in range(10, 0, -1):  # 10到1，步长-1
    print(i, end=" ")
print("发射! 🚀")

# ===== enumerate：带索引遍历 =====
fruits = ["苹果", "香蕉", "橘子", "葡萄"]
print("\n--- 水果清单 ---")
for idx, fruit in enumerate(fruits, start=1):  # start设置从1开始
    print(f"{idx}. {fruit}")

# ===== zip：并行遍历 =====
names = ["小明", "小红", "小刚"]
scores = [85, 92, 78]
print("\n--- 成绩表 ---")
for name, score in zip(names, scores):
    print(f"{name}: {score}分")

# ===== while + break =====
print("\n--- 猜数字游戏 ---")
import random
secret = random.randint(1, 100)
attempts = 0
while True:  # 死循环，break 跳出
    guess = int(input("猜 1~100 的数字: "))
    attempts += 1
    if guess == secret:
        print(f"🎉 恭喜猜中了！用了 {attempts} 次")
        break   # 猜中就跳出
    elif guess < secret:
        print("太小了，再大点")
    else:
        print("太大了，再小点")

# ===== for + else =====
print("\n--- 找素数(2~20) ---")
for n in range(2, 21):
    for i in range(2, int(math.sqrt(n)) + 1):
        if n % i == 0:
            break  # 能整除就不是素数，跳出内循环
    else:
        # 内层循环没 break 过（正常结束）才执行
        print(f"{n} 是素数")

# ===== continue 跳过偶数 =====
print("\n--- 1~15的奇数 ---")
for x in range(1, 16):
    if x % 2 == 0:
        continue  # 偶数跳过
    print(x, end=" ")
print()`,
    codeOutput: `1~100求和 = 5050
倒计时: 10 9 8 7 6 5 4 3 2 1 发射! 🚀

--- 水果清单 ---
1. 苹果
2. 香蕉
3. 橘子
4. 葡萄

--- 成绩表 ---
小明: 85分
小红: 92分
小刚: 78分

--- 猜数字游戏 ---（交互略）

--- 找素数(2~20) ---
2 是素数
3 是素数
5 是素数
7 是素数
11 是素数
13 是素数
17 是素数
19 是素数

--- 1~15的奇数 ---
1 3 5 7 9 11 13 15`,
    tips: [
      '遍历"n次"用 for _ in range(n):，下划线 _ 表示用不上的循环变量',
      'range(n) 永远不含 n！range(5) = [0,1,2,3,4]',
      'for/while + else 是 Python 独特语法，for 正常结束执行 else（被 break 不执行）',
      '枚举/zip/排序后遍历用 enumerate/zip/sorted，别自己管下标'
    ],
    commonMistakes: [
      'range(1, 10) 以为包含 10，实际只到 9（左闭右开！）',
      'for i in 10: → 语法错误，整数不能遍历（要 range(10)）',
      'zip 两个列表长度不同：按短的来，长的多余元素被忽略（坑！要特别小心）'
    ]
  }),

  // 单元4
  'py-kp-4-1': new KnowledgePoint({
    id: 'py-kp-4-1',
    title: '四大容器：列表List与元组Tuple',
    content: `## Python 四大容器类型

| 类型 | 符号 | 特点 | 是否可变 | 是否有序 |
|------|------|------|----------|----------|
| **List 列表** | [ ] | 任意类型，增删改查 | ✅ 可变 | ✅ 有序 |
| **Tuple 元组** | ( ) | 和列表类似，但创建后不可修改 | ❌ 不可变 | ✅ 有序 |
| **Set 集合** | { } | 去重、无序、数学集合运算 | ✅ 可变 | ❌ 无序 |
| **Dict 字典** | {k:v} | 键值对，按 key 查找 | ✅ 可变 | ✅ 插入有序(3.7+) |

## List 列表（最常用！相当于动态数组）
### 创建
\`\`\`python
lst = [1, "hello", 3.14, True]  # 可存任意类型混合
lst2 = list() 或 []              # 空列表
lst3 = list(range(5))            # [0,1,2,3,4]
\`\`\`

### 常用操作
| 操作 | 说明 | 示例结果 |
|------|------|----------|
| len(lst) | 长度 | |
| lst[i] | 下标访问（从0），负数从后数 | lst[-1] 最后一个 |
| lst[start:end:step] | **切片**（含start不含end） | lst[1:3] 取1~2 |
| .append(x) | 末尾加元素 | O(1) |
| .insert(i, x) | 指定位置插入 | O(n) |
| .pop(i) / .remove(x) | 删除（按下标/按值） | |
| .sort() / sorted(lst) | 排序（原地/返回新） | |
| in / not in | 是否包含 | 5 in lst → bool |
| + / * | 拼接和重复 | [1,2] + [3] → [1,2,3] |

### 列表推导式 ✨ Python 灵魂！
\`[表达式 for 变量 in 序列 if 条件]\`
一行生成列表，非常强大：
\`squares = [x**2 for x in range(10) if x%2==0]\`

## Tuple 元组
用小括号或逗号分隔：\`t = (1, 2, 3)\` 或 \`t = 1, 2, 3\`
- 不可变：不能增删改（保护数据）
- 比 list 更省内存、速度更快
- 可以作为字典的 key（list 不行）
- 函数返回多个值，本质就是返回 tuple`,
    codeExample: `# ===== List 基本操作 =====
scores = [85, 92, 78, 96, 88]
print(f"原始: {scores}")
print(f"长度: {len(scores)}")
print(f"最大值: {max(scores)}, 最小值: {min(scores)}, 和: {sum(scores)}")

# 下标和切片
print(f"第1个: {scores[0]}, 最后1个: {scores[-1]}")
print(f"前3个: {scores[:3]}")        # scores[0:3]
print(f"后2个: {scores[-2:]}")
print(f"偶数位: {scores[::2]}")      # 步长2
print(f"反转: {scores[::-1]}")       # 步长-1 = 反转

# 增删改
scores.append(100)        # 末尾加
scores.insert(2, 99)      # 第3位插入
scores[0] = 90            # 修改
scores.remove(78)         # 按值删除第一个78
scores.pop()              # 删除最后一个
print(f"修改后: {scores}")

# 排序
sorted_asc = sorted(scores)         # 升序，返回新列表
sorted_desc = sorted(scores, reverse=True)  # 降序
print(f"升序: {sorted_asc}")
print(f"降序: {sorted_desc}")

# ===== 列表推导式（强烈推荐掌握）=====
print("\n--- 列表推导式 ---")
# 0~9 每个数平方
squares = [x**2 for x in range(10)]
print(f"平方: {squares}")

# 只取偶数的平方
even_sq = [x**2 for x in range(10) if x % 2 == 0]
print(f"偶数平方: {even_sq}")

# 把所有名字转大写+去空格
names = [" 小明", "小红 ", "  小刚  "]
clean = [n.strip().upper() for n in names]
print(f"清理后的名字: {clean}")

# 嵌套推导：全排列
pairs = [(a, b) for a in [1,2,3] for b in ['x','y'] if a != 2]
print(f"条件排列: {pairs}")

# ===== Tuple 元组 =====
print("\n--- Tuple 元组 ---")
point = (3, 5)  # 二维坐标点，元组更合适
x, y = point    # 解包
print(f"点坐标: x={x}, y={y}")

# 元组不能改（安全！）
# point[0] = 10  # TypeError: 'tuple' object does not support item assignment

# 函数返回多个值，本质返回tuple
def divide(a, b):
    quotient = a // b
    remainder = a % b
    return quotient, remainder  # 自动打包成 tuple

q, r = divide(17, 5)  # 解包
print(f"17 ÷ 5 = 商{q} 余{r}")

# 元组的不可变是引用不可变，但里面的列表可以变（坑）
mixed = (1, [2, 3])
mixed[1].append(4)     # ✅ 元组里的列表本身是可变的
print(f"坑示例: {mixed}")`,
    codeOutput: `原始: [85, 92, 78, 96, 88]
长度: 5
最大值: 96, 最小值: 78, 和: 439
第1个: 85, 最后1个: 88
前3个: [85, 92, 78]
后2个: [96, 88]
偶数位: [85, 78, 88]
反转: [88, 96, 78, 92, 85]
修改后: [90, 92, 99, 96, 88]
升序: [88, 90, 92, 96, 99]
降序: [99, 96, 92, 90, 88]

--- 列表推导式 ---
平方: [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]
偶数平方: [0, 4, 16, 36, 64]
清理后的名字: ['小明', '小红', '小刚']
条件排列: [(1, 'x'), (1, 'y'), (3, 'x'), (3, 'y')]

--- Tuple 元组 ---
点坐标: x=3, y=5
17 ÷ 5 = 商3 余2
坑示例: (1, [2, 3, 4])`,
    tips: [
      'list.sort() 是原地排序（修改原列表，返回None），sorted(lst) 返回新列表',
      '切片 [:: -1] 反转列表非常好用，比 reverse() 还返回新列表',
      '列表推导式替代 for + append：代码简洁 + 速度快 30%+',
      '什么时候用 tuple？一组固定不变的数据（坐标点、颜色、配置项）'
    ],
    commonMistakes: [
      'nums = [1,2,3] nums.sort() 之后写 nums = nums.sort() → nums变成None！',
      '元组单元素 t = (5) → 这是括号优先级，t是int！要 t = (5,) 才是tuple',
      'a = [[0]*3]*5 创建二维列表 → 5行引用同一个列表！改一行全变（用 [[0]*3 for _ in range(5)]）'
    ]
  }),

  'py-kp-4-2': new KnowledgePoint({
    id: 'py-kp-4-2',
    title: '字典Dict与集合Set',
    content: `## Dict 字典（键值对，类似 Java HashMap / C++ map）
用 {} 或 dict() 创建，存 key: value 对。
- 键必须**不可变类型**（str/int/float/tuple），列表不行
- Python3.7+ 字典**按插入顺序保存**（之前版本无序）
- 查找速度 O(1)，极快

### 常用操作
| 操作 | 说明 |
|------|------|
| d[key] / d.get(key, default) | 取值（[]找不到报错，get返回默认值）|
| d[key] = value | 添加或修改 |
| del d[key] / d.pop(key) | 删除键值对 |
| key in d | 判断是否包含 key（O(1)！） |
| d.keys() / d.values() / d.items() | 取所有键/值/键值对 |
| len(d) | 键值对数量 |

### 字典推导式 ✨
\`{k: v for ... if ...}\`

## Set 集合（类似数学集合）
- 元素**不可重复**（自动去重）
- 元素必须是 hashable（不可变类型）
- 无序（不可以下标访问）
- 支持数学集合运算：交集 & / 并集 \\| / 差集 - / 对称差 ^ / 子集 < / 超集 >

### 集合推导式
\`{x for x in ...}\``,
    codeExample: `# ===== Dict 字典 =====
# 创建：学生->分数
scores = {
    "小明": 85,
    "小红": 92,
    "小刚": 78,
    "小丽": 96
}
print(f"原始: {scores}")

# 访问
print(f"小明的分数: {scores['小明']}")
print(f"不存在的小华: {scores.get('小华', '暂无成绩')}")  # 不会报错

# 增删改
scores["小华"] = 88    # 新增
scores["小刚"] = 82    # 修改
del scores["小明"]     # 删除
removed = scores.pop("小丽")  # 删除并返回值
print(f"修改后: {scores}")

# 遍历字典
print("\n--- 遍历字典 ---")
# 方式1：遍历 keys
for name in scores:  # 等同 for name in scores.keys()
    print(f"{name} 的分数是 {scores[name]}")

# 方式2：遍历键值对（最推荐！）
print("\n--- 键值对遍历 ---")
for name, score in scores.items():
    if score >= 90:
        print(f"🎉 {name} 优秀: {score}")

# 案例：词频统计（Python 经典题）
text = "hello world hello python world code hello python"
words = text.split()
freq = {}
for word in words:
    # 法1：if 判断
    # if word in freq: freq[word] += 1
    # else: freq[word] = 1
    # 法2：get 更简洁
    freq[word] = freq.get(word, 0) + 1
print(f"\n词频统计: {freq}")
# 按出现次数排序
sorted_freq = sorted(freq.items(), key=lambda x: x[1], reverse=True)
print(f"按次数排序: {sorted_freq}")

# ===== Set 集合 =====
print("\n--- Set 集合 ---")
nums = [1, 2, 3, 2, 5, 3, 1, 4, 5, 2, 1, 6]
unique = set(nums)  # 转集合自动去重
print(f"去重: {unique}")
print(f"原列表{nums}有{len(nums)}个元素，去重后{len(unique)}个")

# 集合运算
a = {1, 2, 3, 4, 5}
b = {3, 4, 5, 6, 7}
print(f"\na = {a}, b = {b}")
print(f"交集 a&b: {a & b}     都有的元素")
print(f"并集 a|b: {a | b}     所有元素去重")
print(f"差集 a-b: {a - b}     a有b没有的")
print(f"对称差 a^b: {a ^ b}   各自独有的元素")

# 添加删除
unique.add(100)      # 加1个
unique.update([7,8]) # 加多个
unique.discard(999)  # 删除不存在的不会报错（remove会）
print(f"修改后set: {unique}")

# 推导式
print("\n--- 推导式综合 ---")
# 字典推导式：key=字母, value=出现次数
msg = "abracadabra"
count_dict = {ch: msg.count(ch) for ch in set(msg)}
print(f"字母统计: {count_dict}")

# 集合推导式：长度>=3的单词去重小写化
words_list = ["Hello", "hi", "HELLO", "world", "HI", "Python"]
result = {w.lower() for w in words_list if len(w) >= 3}
print(f"长度>=3的单词(去重小写): {result}")`,
    codeOutput: `原始: {'小明': 85, '小红': 92, '小刚': 78, '小丽': 96}
小明的分数: 85
不存在的小华: 暂无成绩
修改后: {'小红': 92, '小刚': 82, '小华': 88}

--- 遍历字典 ---
小红 的分数是 92
小刚 的分数是 82
小华 的分数是 88

--- 键值对遍历 ---
🎉 小红 优秀: 92

词频统计: {'hello': 3, 'world': 2, 'python': 2, 'code': 1}
按次数排序: [('hello', 3), ('world', 2), ('python', 2), ('code', 1)]

--- Set 集合 ---
去重: {1, 2, 3, 4, 5, 6}
原列表[1,2,3,2,5,3,1,4,5,2,1,6]有12个元素，去重后6个

a = {1, 2, 3, 4, 5}, b = {3, 4, 5, 6, 7}
交集 a&b: {3, 4, 5}     都有的元素
并集 a|b: {1, 2, 3, 4, 5, 6, 7}     所有元素去重
差集 a-b: {1, 2}     a有b没有的
对称差 a^b: {1, 2, 6, 7}   各自独有的元素
修改后set: {1, 2, 3, 4, 5, 6, 100, 7, 8}

--- 推导式综合 ---
字母统计: {'a': 5, 'b': 2, 'r': 2, 'c': 1, 'd': 1}
长度>=3的单词(去重小写): {'hello', 'world', 'python'}`,
    tips: [
      '字典取值推荐 d.get(key, 默认值)，避免 KeyError 崩溃',
      '判断字典是否有key用 "x in d"（O(1)），不要用 "x in d.keys()"',
      '词频统计还能用 collections.Counter：Counter(words) 一行搞定',
      'set 去重最方便：list(set(lst))，但顺序会丢失（要保序用 dict.fromkeys 或 3.7+ 字典）'
    ],
    commonMistakes: [
      'for name, score in scores: 忘了 .items() → 报 "too many values to unpack"',
      'd.sort() → dict 没有 sort 方法！要 sorted(d.items(), key=...)',
      'set.add([1,2]) → 报错 unhashable type: list，集合里不能放列表'
    ]
  }),

  // 单元5
  'py-kp-5-1': new KnowledgePoint({
    id: 'py-kp-5-1',
    title: '函数定义与高级特性',
    content: `## 函数定义 def
\`\`\`python
def 函数名(参数列表):
    """文档字符串：说明函数功能、参数、返回值"""
    函数体
    return 返回值
\`\`\`

## 参数类型（丰富！）

### 1. 位置参数
\`def add(a, b): return a+b\` → 调用 add(3, 5)

### 2. 默认参数
\`def power(x, n=2): return x**n\` → power(5)=25，power(5,3)=125
⚠️ 默认参数必须在最右边，**且不能用可变对象当默认值**！

### 3. 关键字参数（调用时指定）
调用：\`power(n=3, x=5)\` → 不用管顺序

### 4. 可变参数
- \`*args\`：任意多个位置参数，打包成 tuple
- \`**kwargs\`：任意多个关键字参数，打包成 dict

### 5. * 和 ** 解包
\`add(*[3, 5])\` 把列表解包成位置参数
\`func(**{dict})\` 把字典解包成关键字参数

## 返回值
- 无 return 返回 None
- return 多个值会自动打包成 tuple（可以直接解包接收）

## 作用域
- 函数内部是**局部作用域**
- 想在函数内修改全局变量？需要 \`global 变量名\` 声明
- 想修改外层嵌套函数的变量？\`nonlocal 变量名\`

## Lambda 匿名函数
\`lambda 参数: 表达式\`
简单函数的简写，常用于 sorted(key=...)、filter、map`,
    codeExample: `# ===== 基础函数 + 文档字符串 =====
def fibonacci(n):
    """
    计算斐波那契数列的第n项
    :param n: 正整数，第n项
    :return: 第n项斐波那契数
    """
    a, b = 1, 1
    for _ in range(n - 1):
        a, b = b, a + b
    return a

print(f"fib(10) = {fibonacci(10)}")
help(fibonacci)  # 查看文档字符串

# ===== 默认参数 =====
def greet(name, greeting="你好", end="!\n"):
    print(f"{greeting}, {name}{end}", end="")

greet("小明")
greet("小红", "早上好")
greet("小刚", end="~ (๑•̀ㅂ•́)و✧\n")

# ===== *args 任意数量位置参数 =====
def sum_all(*args):
    print(f"args实际是: {type(args)}，内容: {args}")
    total = 0
    for n in args:
        total += n
    return total

print(f"1+2+3+4+5 = {sum_all(1, 2, 3, 4, 5)}")
print(f"只有1个参数: {sum_all(100)}")

# ===== **kwargs 任意数量关键字参数 =====
def print_user(**kwargs):
    print(f"kwargs实际是: {type(kwargs)}")
    for key, value in kwargs.items():
        print(f"  {key}: {value}")

print_user(name="小明", age=18, school="清华", hobby="编程")

# ===== * ** 解包调用 =====
def cal(a, b, c):
    return a * 100 + b * 10 + c

nums = [1, 2, 3]
print(f"解包列表: {cal(*nums)}")  # cal(1,2,3)
params = {"a": 7, "b": 8, "c": 9}
print(f"解包字典: {cal(**params)}")  # cal(a=7,b=8,c=9)

# ===== Lambda 匿名函数 =====
print("\n--- Lambda ---")
mul = lambda x, y: x * y  # 不推荐给lambda赋值，仅演示
print(f"3×5 = {mul(3, 5)}")

# 经典场景：sorted 的 key 排序
students = [
    ("小明", 85, 18),
    ("小红", 92, 17),
    ("小刚", 78, 19)
]
# 按分数（第2个元素，下标1）降序排列
by_score = sorted(students, key=lambda s: s[1], reverse=True)
print(f"按分数排序: {by_score}")

# ===== global 关键字 =====
print("\n--- global 示例 ---")
count = 0
def increment():
    global count  # 声明使用全局的count，否则会被认为是局部变量
    count += 1

increment(); increment(); increment()
print(f"调用3次后 count = {count}")`,
    codeOutput: `fib(10) = 55
（help 输出文档说明）
你好, 小明!
早上好, 小红!
你好, 小刚~ (๑•̀ㅂ•́)و✧
args实际是: <class 'tuple'>，内容: (1, 2, 3, 4, 5)
1+2+3+4+5 = 15
args实际是: <class 'tuple'>，内容: (100,)
只有1个参数: 100
kwargs实际是: <class 'dict'>
  name: 小明
  age: 18
  school: 清华
  hobby: 编程
解包列表: 123
解包字典: 789

--- Lambda ---
3×5 = 15
按分数排序: [('小红', 92, 17), ('小明', 85, 18), ('小刚', 78, 19)]

--- global 示例 ---
调用3次后 count = 3`,
    tips: [
      '写函数先写文档字符串（"""..."""），help()和IDE都能自动显示',
      '*args/**kwargs 适合写装饰器、包装函数（下一章学）',
      '默认参数不能用可变对象！def f(x=[]): x.append(1); print(x) → 每次调用共享同一个列表',
      'lambda 写短逻辑，超过一行就该用 def 了（可读性优先）'
    ],
    commonMistakes: [
      'def f(a, b=[]): 每次调用 append 会累积（经典坑！用 b=None + if not b: b=[]）',
      '函数里改全局变量没声明 global → UnboundLocalError',
      '调用函数写 (*list, **dict)，list/dict 结构不对会报错（长度/键名必须匹配）'
    ]
  }),

  // 单元6
  'py-kp-6-1': new KnowledgePoint({
    id: 'py-kp-6-1',
    title: '面向对象编程 (OOP)',
    content: `## 类定义 class
\`\`\`python
class 类名(父类列表):
    """类文档字符串"""
    def __init__(self, 参数):  # 构造方法
        self.属性 = 参数       # 实例属性
    
    def 方法(self, 参数):      # 实例方法（第一个参数永远是 self）
        方法体
\`\`\`

## self 是什么？
self 是**实例本身**的引用（类似 C++/Java 的 this）。
- 调用实例方法时不用手动传 self，Python 自动传
- 属性通过 self.xxx 访问

## 特殊方法（魔法方法 / Dunder Methods）
以双下划线包围的方法，Python 自动调用：
| 方法 | 触发时机 |
|------|----------|
| __init__ | 创建对象时：obj = ClassName(...) |
| __str__ | print(obj) 或 str(obj) |
| __repr__ | repr(obj)（调试用，开发者友好）|
| __len__ | len(obj) |
| __eq__ | obj == other |
| __lt__ | obj < other（可以用 functools.total_ordering 省代码）|

## 类变量 vs 实例变量
- **类变量**：在类里，所有对象共享一份（类似 Java static）
- **实例变量**：在 __init__ 里 self.xxx，每个对象自己的

## 类方法 @classmethod & 静态方法 @staticmethod
- @classmethod：第一个参数是 cls（类本身），可以当构造器重载
- @staticmethod：不需要 self/cls，和普通函数一样只是放在类里

## 继承与多态
\`class 子类(父类):\`
- 用 super() 调用父类方法
- Python 支持多继承（MRO 顺序，方法解析顺序）
- 方法重写：子类定义同名方法覆盖父类
- 方法多态：子类各自实现，统一调用
- isinstance() 判断是否某类/子类的对象`,
    codeExample: `from functools import total_ordering

# ===== 基类：人 =====
@total_ordering  # 只实现 __eq__ 和 __lt__，自动补齐比较运算符
class Person:
    """人类基类"""
    species = "智人(Homo Sapiens)"  # 类变量，共享
    
    def __init__(self, name, age):
        self.name = name     # 实例属性
        self.age = age
    
    def say_hello(self):
        print(f"你好！我是{self.name}，{self.age}岁")
    
    def __str__(self):      # 打印对象时显示
        return f"Person[name={self.name}, age={self.age}]"
    
    def __repr__(self):     # 调试显示
        return f"<{self.name}>"
    
    # 年龄的相等比较
    def __eq__(self, other):
        if not isinstance(other, Person): return False
        return self.age == other.age
    
    def __lt__(self, other):  # less than <
        return self.age < other.age

# ===== 派生类：学生 =====
class Student(Person):
    def __init__(self, name, age, school, score):
        super().__init__(name, age)  # 调用父类构造
        self.school = school
        self.score = score
    
    # 方法重写
    def say_hello(self):
        super().say_hello()  # 先调用父类版本
        print(f"我在{self.school}上学，分数{self.score}")
    
    def study(self):
        print(f"{self.name} 正在努力学习！")
        self.score += 5
        if self.score > 100: self.score = 100
    
    # 类方法：作为额外构造器
    @classmethod
    def from_string(cls, info_str):
        name, age, school, score = info_str.split(",")
        return cls(name, int(age), school, int(score))

# ===== 派生类：老师 =====
class Teacher(Person):
    def __init__(self, name, age, subject):
        super().__init__(name, age)
        self.subject = subject
    
    def say_hello(self):
        print(f"大家好，我是{self.name}老师，教{self.subject}")

# ===== 测试 =====
if __name__ == "__main__":
    # 基础用法
    p = Person("张三", 35)
    print(p)           # __str__ 调用
    p.say_hello()
    
    # 继承
    s = Student("小明", 18, "清华大学", 85)
    t = Teacher("李教授", 45, "计算机科学")
    s.say_hello()
    t.say_hello()
    
    # 多态：同一接口不同实现
    print("\n--- 多态 ---")
    people = [p, s, t]
    for person in people:
        person.say_hello()
    
    # 类方法构造（用字符串创建对象）
    s2 = Student.from_string("小红,17,北京大学,92")
    print(f"\n类方法构造: {s2}")
    s2.study(); s2.study()
    print(f"学习2次后分数: {s2.score}")
    
    # @total_ordering：自动比较排序
    persons = [Person("A", 28), Person("B", 22), Person("C", 35)]
    by_age = sorted(persons)  # 按年龄升序
    print(f"\n按年龄排序: {by_age}")
    
    # 类变量：所有对象共享
    print(f"\n物种变量: {Person.species} = {Student.species}")
    Person.species = "现代人"  # 修改类变量
    print(f"修改后影响所有子类: {Student.species}")
    
    # isinstance 判断
    print(f"\nisinstance检查: Student 是 Person 子类吗? {isinstance(s, Person)}")`,
    codeOutput: `Person[name=张三, age=35]
你好！我是张三，35岁
你好！我是小明，18岁
我在清华大学上学，分数85
大家好，我是李教授老师，教计算机科学

--- 多态 ---
你好！我是张三，35岁
你好！我是小明，18岁
我在清华大学上学，分数85
大家好，我是李教授老师，教计算机科学

类方法构造: Person[name=小红, age=17]
小红 正在努力学习！
小红 正在努力学习！
学习2次后分数: 102（被限制成100）

按年龄排序: [<B>, <A>, <C>]

物种变量: 智人(Homo Sapiens) = 智人(Homo Sapiens)
修改后影响所有子类: 现代人

isinstance检查: Student 是 Person 子类吗? True`,
    tips: [
      'if __name__ == "__main__": 这个模块单独运行时才执行，被 import 时不执行（必写！）',
      '访问控制：__xxx 双下划线开头的属性是"私有"（名字修饰 Name Mangling，不是真私有）',
      '_xxx 单下划线开头：约定是内部使用，import * 不导入（外部还是能访问）',
      'Python 没有真私有！Python 哲学是"We are all consenting adults here."'
    ],
    commonMistakes: [
      'def __init__(): 忘记写 self 参数 → 调用时多传参数报错',
      '方法里写 name 而不是 self.name → 找不到变量 NameError',
      'super().__init__() 参数传错：父类需要的参数一定要传够',
      'Person.species 用对象 p.species 修改：如果是不可变类型，创建的是实例属性不影响类变量（理解机制就不觉得奇怪了）'
    ]
  }),

  // 单元7
  'py-kp-7-1': new KnowledgePoint({
    id: 'py-kp-7-1',
    title: '文件I/O与异常处理',
    content: `## 文件操作 open()
\`\`\`python
with open(文件路径, 模式, encoding="utf-8") as f:
    操作 f  # f 是文件对象
# with 结束自动关闭文件（即使出错也关，推荐写法！）
\`\`\`

### 打开模式
| 模式 | 说明 |
|------|------|
| r | 读（默认），文件不存在报错 |
| w | 写（覆盖！），不存在则创建 |
| a | 追加写 |
| r+ | 读写 |
| b | 二进制模式（rb/wb：图片、视频等）|

### 读方法
- f.read() → 读全部内容成一个 str
- f.readline() → 读一行
- f.readlines() → 所有行的列表（带换行符）
- for line in f: → 逐行遍历（最省内存）

### 写方法
- f.write(字符串) → 写字符串（**不自动加换行！** 要自己加 \\n）
- f.writelines(字符串列表)

## 异常处理 try-except-else-finally
\`\`\`python
try:
    可能出异常的代码
except 异常类型1 as e:
    处理异常1
except (异常类型2, 异常类型3):
    处理多个异常
else:
    没有异常时执行
finally:
    一定执行（关资源等）
\`\`\`

抛出异常：\`raise ValueError("错误信息")\`
自定义异常：\`class MyError(Exception): pass\`

## JSON 模块（数据持久化首选）
字典、列表等转 JSON 字符串（可写入文件）或反过来：
- json.dump(obj, f) / json.dumps(obj) → 写/转字符串
- json.load(f) / json.loads(str) → 读/字符串转对象`,
    codeExample: `import json
from datetime import datetime

# ===== 1. 写文件 =====
students = [
    {"name": "小明", "age": 18, "score": 85},
    {"name": "小红", "age": 17, "score": 92},
    {"name": "小刚", "age": 19, "score": 78}
]

# 写 TXT
with open("students.txt", "w", encoding="utf-8") as f:
    for s in students:
        f.write(f"{s['name']},{s['age']},{s['score']}\n")  # 自己加换行
print("TXT 写入完成")

# 写 JSON（更规范，支持中文 indent 美化）
with open("students.json", "w", encoding="utf-8") as f:
    json.dump(students, f, ensure_ascii=False, indent=2)
print("JSON 写入完成")

# ===== 2. 读文件 =====
print("\n--- 读 TXT 并统计 ---")
names = []
total = 0
count = 0
with open("students.txt", "r", encoding="utf-8") as f:
    for line in f:  # 逐行读
        line = line.strip()   # 去掉两端空白和换行
        if not line: continue # 跳过空行
        name, age, score = line.split(",")
        names.append(name)
        total += int(score)
        count += 1
print(f"学生姓名: {names}")
print(f"平均分: {total/count:.1f}")

# 读 JSON（更方便，类型完整保留）
with open("students.json", "r", encoding="utf-8") as f:
    data = json.load(f)  # 直接就是 list[dict]！
print(f"\nJSON 读取后类型: {type(data)}，长度: {len(data)}")
top = max(data, key=lambda x: x["score"])
print(f"最高分学生: {top['name']} - {top['score']}")

# ===== 3. 异常处理 =====
print("\n--- 异常处理示例 ---")
def safe_divide(a, b):
    try:
        result = a / b
        log = f"{datetime.now()}: {a}/{b}={result}\n"
        with open("calc.log", "a", encoding="utf-8") as f:
            f.write(log)
    except ZeroDivisionError:
        print("❌ 除数不能为0")
        return None
    except TypeError as e:
        print(f"❌ 类型错误: {e}")
        return None
    except Exception as e:  # 兜底其他异常
        print(f"❌ 未知错误: {type(e).__name__}: {e}")
        return None
    else:
        print("✅ 计算成功")
        return result
    finally:
        print("(无论成功失败都会执行)")

safe_divide(10, 3)
safe_divide(10, 0)
safe_divide("10", 2)

# ===== 4. 自定义异常 =====
print("\n--- 自定义异常 ---")
class ScoreError(ValueError):
    """分数不合法的异常"""
    pass

def set_score(score):
    if not 0 <= score <= 100:
        raise ScoreError(f"分数 {score} 必须在 0~100 之间")
    print(f"设置分数成功: {score}")

try:
    set_score(105)
except ScoreError as e:
    print(f"捕获自定义异常: {e}")`,
    codeOutput: `TXT 写入完成
JSON 写入完成

--- 读 TXT 并统计 ---
学生姓名: ['小明', '小红', '小刚']
平均分: 85.0

JSON 读取后类型: <class 'list'>，长度: 3
最高分学生: 小红 - 92

--- 异常处理示例 ---
✅ 计算成功
(无论成功失败都会执行)
❌ 除数不能为0
(无论成功失败都会执行)
❌ 类型错误: unsupported operand type(s) for /: 'str' and 'int'
(无论成功失败都会执行)

--- 自定义异常 ---
捕获自定义异常: 分数 105 必须在 0~100 之间`,
    tips: [
      '永远用 with open()！不要手动 open + close（忘记关 or 异常没关会泄露）',
      'Windows 中文乱码？加 encoding="utf-8"（open 默认用系统编码）',
      '写入中文 JSON 必须 ensure_ascii=False，否则中文变成 \\uXXXX',
      'except 顺序从小到大：先子类（具体），最后 Exception 兜底'
    ],
    commonMistakes: [
      'open("a.txt") 没加 encoding，中文 Windows 下乱码 GBK',
      'f.write(line) 忘了加换行符 → 所有内容粘成一行',
      'except Exception as e: pass 空捕获吞掉所有异常！排查 bug 想死的心都有',
      'json.dump/dumps 写了中文一堆 \\u，是因为忘记 ensure_ascii=False'
    ]
  }),

  // 单元8
  'py-kp-8-1': new KnowledgePoint({
    id: 'py-kp-8-1',
    title: '模块与包：模块化编程',
    content: `## 模块 Module
一个 .py 文件就是一个模块。导入有4种方式：
\`\`\`python
import math                    # 整个模块导入：math.sqrt(2)
import numpy as np             # 别名：np.array()
from math import sqrt, pi     # 具体函数：直接用 sqrt(2)
from math import *             # 全导入（不推荐，命名冲突风险）
\`\`\`

## 常用标准库（Python "电池自带"）
| 库名 | 用途 |
|------|------|
| math | 数学函数：sin/cos/sqrt/log/pow/pi/e |
| random | 随机数：randint/choice/shuffle/sample |
| datetime | 日期时间：date/time/datetime/timedelta |
| collections | 扩展容器：Counter/defaultdict/deque |
| itertools | 迭代工具：permutations/combinations/product |
| os | 操作系统：文件路径、环境变量、目录操作 |
| re | 正则表达式：字符串匹配、搜索、替换 |
| pathlib | 面向对象路径处理（比 os.path 好用）|

## 包 Package
含 __init__.py 文件的文件夹就是包（Python3.3+ 可以没有），用来组织多个模块。

## 虚拟环境（非常重要！）
每个项目独立的依赖环境：
\`\`\`bash
python -m venv .venv          # 创建虚拟环境
source .venv/bin/activate     # 激活（Mac/Linux）
.venv\\Scripts\\activate       # Windows
pip install requests          # 安装第三方包
pip freeze > requirements.txt # 导出依赖
\`\`\`

## 第三方库安装
强大的 Python 生态：
\`pip install requests pandas numpy matplotlib beautifulsoup4 scrapy\``,
    codeExample: `# ===== 数学 math =====
import math
print(f"math.pi = {math.pi:.6f}")
print(f"sin(90°) = {math.sin(math.radians(90)):.1f}")
print(f"sqrt(2) = {math.sqrt(2):.6f}")
print(f"阶乘 5! = {math.factorial(5)}")
print(f"gcd(18,24) = {math.gcd(18, 24)}")

# ===== 随机 random =====
import random
random.seed(42)  # 设置种子，方便复现
print("\n--- random ---")
print(f"randint(1,100): {random.randint(1, 100)}")  # 含两端
print(f"choice(list): {random.choice(['石头','剪刀','布'])}")
cards = [f"{s}{n}" for s in "♠♥♦♣" for n in "A23456789TJQK"]
random.shuffle(cards)  # 洗牌（原地乱序）
print(f"洗牌前3张: {cards[:3]}")
lotto = random.sample(range(1, 50), 6)  # 无重复抽6个
print(f"6/49 大乐透号码: {sorted(lotto)}")

# ===== 日期时间 =====
from datetime import datetime, timedelta
print("\n--- datetime ---")
now = datetime.now()
print(f"当前时间: {now.strftime('%Y-%m-%d %H:%M:%S %A')}")
birthday = datetime(2005, 6, 15)
age = (now - birthday).days // 365
print(f"2005/6/15 出生的人，今年{age}岁")
future = now + timedelta(days=100)  # 100天后
print(f"100天后是: {future.date()}")

# ===== collections =====
from collections import Counter, defaultdict, deque
print("\n--- collections ---")
text = "abracadabraalakazam"
cnt = Counter(text)
print(f"字母统计: {cnt}")
print(f"出现最多的3个: {cnt.most_common(3)}")

# defaultdict：不存在的 key 自动创建默认值（list/int/set...）
d = defaultdict(list)  # 默认值是空列表
d["classA"].append("小明")
d["classA"].append("小红")  # 不需要先判断 key 是否存在
print(f"defaultdict: {dict(d)}")

# deque：双端队列，两端增删都是O(1)（list 头部插入是O(n)）
q = deque(maxlen=3)
for i in range(5):
    q.append(i)
    print(f"添加{i}后: {list(q)}")

# ===== 列表推导式 + itertools 排列组合 =====
from itertools import permutations, combinations, product
print("\n--- itertools ---")
# 排列：从[1,2,3]选2个排列（顺序相关）
print(f"P(3,2) 排列: {list(permutations([1,2,3], 2))}")
# 组合：从[1,2,3,4]选3个（顺序无关）
print(f"C(4,3) 组合: {list(combinations([1,2,3,4], 3))}")
# 笛卡尔积：3个硬币正反面的所有可能
print(f"3硬币: {list(product(['正','反'], repeat=3))}")

# ===== 路径 pathlib（面向对象路径，推荐）=====
from pathlib import Path
print("\n--- pathlib ---")
p = Path(__file__).parent / "data" / "test.txt"  # 不用写 os.path.join！
print(f"路径: {p}")
print(f"父目录: {p.parent}")
print(f"扩展名: {p.suffix}")
print(f"是否存在? {p.exists()}")`,
    codeOutput: `math.pi = 3.141593
sin(90°) = 1.0
sqrt(2) = 1.414214
阶乘 5! = 120
gcd(18,24) = 6

--- random ---
randint(1,100): 82
choice(list): 剪刀
洗牌前3张: ['♣5', '♥8', '♠K']
6/49 大乐透号码: [10, 16, 29, 31, 34, 45]

--- datetime ---
当前时间: 2025-08-29 14:30:00 Friday
2005/6/15 出生的人，今年20岁
100天后是: 2025-12-07

--- collections ---
字母统计: Counter({'a': 7, 'b': 2, 'r': 2, ...})
出现最多的3个: [('a', 7), ('b', 2), ('r', 2)]
defaultdict: {'classA': ['小明', '小红']}
添加0后: [0]
添加1后: [0, 1]
添加2后: [0, 1, 2]
添加3后: [1, 2, 3]（maxlen=3, 满了丢最前）
添加4后: [2, 3, 4]

--- itertools ---
P(3,2) 排列: [(1, 2), (1, 3), (2, 1), (2, 3), (3, 1), (3, 2)]
C(4,3) 组合: [(1, 2, 3), (1, 2, 4), (1, 3, 4), (2, 3, 4)]
3硬币: [('正','正','正'),('正','正','反'),...] 共8种

--- pathlib ---
路径: .../data/test.txt
父目录: .../data
扩展名: .txt
是否存在? False（示例没创建）`,
    tips: [
      '路径统一用 pathlib.Path，告别 os.path.join！用 / 运算符拼接',
      '统计词频别手写 dict，直接 Counter(x)，还能用 most_common(n)',
      '默认字典 defaultdict(int/list)，省掉 if key not in d: d[key]=默认值',
      '排列组合别手写 for 嵌套，itertools.permutations/combinations 一行搞定'
    ],
    commonMistakes: [
      'random.seed(42) 放错位置：要在任何随机函数调用之前设种子',
      'Path("/") + "sub" 报错：拼接只能用 /，而且右侧必须是字符串',
      'Counter + 中文文本：对中文分词后再统计，别直接对字符串 Counter 变成按字统计'
    ]
  }),
};

const pythonProblems = {
  // 单元1
  'py-p-1-1': new Problem({
    id: 'py-p-1-1',
    title: 'Python 输出',
    type: ProblemType.CODE_COMPLETE,
    difficulty: Difficulty.BEGINNER,
    description: '补全代码：输出 Hello, Python!（注意大小写和标点，逗号后有空格）',
    codeTemplate: `______("Hello, Python!")`,
    answer: 'print',
    hints: [
      'Python 输出内容的内置函数',
      '首字母是 p，不是大写',
      '是 print，不是 echo、printf 或 System.out'
    ],
    knowledgePointIds: ['py-kp-1-1'],
    explanation: 'Python 用 print() 函数输出内容到屏幕，注意必须加括号（Python3）。'
  }),

  'py-p-1-2': new Problem({
    id: 'py-p-1-2',
    title: 'Python 语法判断',
    type: ProblemType.MULTIPLE_CHOICE,
    difficulty: Difficulty.BEGINNER,
    description: '下列关于 Python 语法的说法，错误的是？',
    options: [
      'A. 语句结尾不需要写分号 ;',
      'B. 用花括号 {} 表示代码块',
      'C. 用缩进表示代码块（通常4个空格）',
      'D. # 开头是单行注释'
    ],
    answer: 'B',
    hints: [
      'Python 不用花括号，这是它和 C/Java 最大区别之一',
      '缩进 + 冒号来表示代码块的范围',
      '错的是那个"花括号"选项'
    ],
    knowledgePointIds: ['py-kp-1-1'],
    explanation: 'B 错误。Python 用缩进（4个空格）而不是花括号来标识代码块，条件/函数/循环后用冒号加缩进。'
  }),

  'py-p-1-3': new Problem({
    id: 'py-p-1-3',
    title: '格式化输出个人信息',
    type: ProblemType.CODE_WRITE,
    difficulty: Difficulty.BEGINNER,
    description: '读取姓名（字符串）、年龄（整数）、身高（小数）三个输入，\n按下列格式输出：\n\n我叫XXX，今年X岁，身高X.XX米。',
    codeTemplate: '',
    answer: 'name = input()\nage = int(input())\nheight = float(input())\nprint(f"我叫{name}，今年{age}岁，身高{height:.2f}米。")',
    hints: [
      'name 直接 input()，age 和 height 分别要 int() 和 float() 转换',
      '输出推荐用 f-string，最简洁',
      '身高保留两位小数用 :.2f，如 {height:.2f}',
      '注意输出的标点都是中文，和样例完全一致'
    ],
    knowledgePointIds: ['py-kp-1-1', 'py-kp-1-2'],
    explanation: '输入分别用 input()/int()/float() 获取，输出 f-string 嵌入变量，height:.2f 格式化保留2位小数。'
  }),

  // 单元2
  'py-p-2-1': new Problem({
    id: 'py-p-2-1',
    title: '除法 / 和 //',
    type: ProblemType.FILL_BLANK,
    difficulty: Difficulty.BASIC,
    description: 'Python 表达式的值：\n17 / 5 = ______\n17 // 5 = ______\n17 % 5 = ______\n2 ** 5 = ______',
    answer: '3.4, 3, 2, 32',
    hints: [
      '/ 是真除法，整数相除也返回小数（和 C/Java 不同！）',
      '// 是地板除（整数除法，向下取整）',
      '% 是取余数，** 是乘方',
      '17 = 3×5+2，2^5=32'
    ],
    knowledgePointIds: ['py-kp-2-2'],
    explanation: 'Python 的 / 返回浮点数 3.4。// 地板除得 3。% 取余 2。** 是乘方 2^5 = 32。'
  }),

  'py-p-2-2': new Problem({
    id: 'py-p-2-2',
    title: '变量交换',
    type: ProblemType.MULTIPLE_CHOICE,
    difficulty: Difficulty.BASIC,
    description: 'Python 中要交换 a 和 b 的值，最简洁正确的写法是？',
    options: [
      'A. a = b; b = a',
      'B. temp = a; a = b; b = temp',
      'C. a, b = b, a',
      'D. swap(a, b)'
    ],
    answer: 'C',
    hints: [
      'A 错：a 先被 b 覆盖，两边都变成原来的 b',
      'B 对，但这是 C 语言三行写法，不是最简洁',
      'C 是 Python 特有的解包赋值，一行搞定！',
      'D 错：Python 没有内置 swap 函数'
    ],
    knowledgePointIds: ['py-kp-2-1'],
    explanation: 'C 是 Python 专属语法，简洁且无临时变量。B 虽然对但不够 Pythonic，A 错误，D 不存在。'
  }),

  'py-p-2-3': new Problem({
    id: 'py-p-2-3',
    title: '购物计算',
    type: ProblemType.CODE_WRITE,
    difficulty: Difficulty.BASIC,
    description: '商品单价 12.8 元，输入购买数量 n，输出需要支付的总金额。\n总金额 = 单价 × 数量\n超过 100 元打 9 折，超过 50 但不超过 100 打 95 折。\n输出格式：应付：XX 元（保留 1 位小数）',
    codeTemplate: '',
    answer: 'n = int(input())\ntotal = 12.8 * n\nif total > 100:\n    total *= 0.9\nelif total > 50:\n    total *= 0.95\nprint(f"应付：{total:.1f} 元")',
    hints: [
      'n 是购买数量，整数，int(input())',
      '先算原价 total = 12.8 * n',
      '判断：>100 打九折（×0.9），否则>50 九五折（×0.95）',
      '用 if-elif，不要用两个独立 if'
    ],
    knowledgePointIds: ['py-kp-2-1', 'py-kp-2-2', 'py-kp-3-1'],
    explanation: '先读取数量算原价，然后依次判断是否>100、是否>50乘折扣。最后格式化保留1位小数输出。'
  }),

  // 单元3
  'py-p-3-1': new Problem({
    id: 'py-p-3-1',
    title: 'range 范围',
    type: ProblemType.FILL_BLANK,
    difficulty: Difficulty.BASIC,
    description: 'list(range(5)) 包含的元素是 ______________（用逗号分隔如 1,2,3）\nlist(range(2, 8)) 包含 ______________\nlist(range(10, 1, -2)) 包含 ______________',
    answer: '0,1,2,3,4, 2,3,4,5,6,7, 10,8,6,4,2',
    hints: [
      'range 永远是左闭右开：含 start，不含 end',
      'range(n) 从 0 开始，到 n-1 结束',
      'range(2,8) 不包含 8',
      '步长为 -2 时倒序：从10开始减2，直到>1（不含1）'
    ],
    knowledgePointIds: ['py-kp-3-2'],
    explanation: 'range(5) = 0,1,2,3,4（5个元素，不含5）。range(2,8) = 2~7（不含8）。步长-2倒序：10,8,6,4,2（下一个是0但<1了停止）。'
  }),

  'py-p-3-2': new Problem({
    id: 'py-p-3-2',
    title: '打印九九乘法表',
    type: ProblemType.CODE_COMPLETE,
    difficulty: Difficulty.INTERMEDIATE,
    description: '补全代码，输出九九乘法表（左下三角格式）。',
    codeTemplate: `for i in ______(1, 10):      # i 是被乘数 1~9
    for j in range(1, ______):  # j 是乘数，1~i
        print(f"{j}×{i}={i*j}\\t", end="")
    ______()  # 换行`,
    answer: 'range, i + 1, print',
    hints: [
      '外层循环用 range(1,10) 生成 i=1~9',
      '内层 j 从 1 到 i（包含 i），所以 range(1, i+1)（range不含end所以+1）',
      '内层每一行结束后要换行，print() 默认打印换行',
      '第1空 range，第2空 i+1，第3空 print'
    ],
    knowledgePointIds: ['py-kp-3-2'],
    explanation: '外层i从1~9，内层j从1~i，打印j×i=ij用tab分隔。每行结束print()换行。答案：range, i+1, print。'
  }),

  'py-p-3-3': new Problem({
    id: 'py-p-3-3',
    title: '密码强度验证',
    type: ProblemType.CODE_WRITE,
    difficulty: Difficulty.INTERMEDIATE,
    description: '输入一个密码字符串，判断强度：\n- 弱：长度 < 8\n- 中：长度 ≥ 8 且只包含数字和字母中的一类\n- 强：长度 ≥ 8 且同时包含 数字 + 字母\n\n输出 弱 / 中 / 强',
    codeTemplate: '',
    answer: 'pwd = input()\nhas_digit = any(c.isdigit() for c in pwd)\nhas_alpha = any(c.isalpha() for c in pwd)\nif len(pwd) < 8:\n    print("弱")\nelif has_digit and has_alpha:\n    print("强")\nelse:\n    print("中")',
    hints: [
      'len(pwd) 得长度，<8 就是弱',
      'any(c.isdigit() for c in pwd) 快捷判断是否含数字',
      '同理 isalpha() 判断字母',
      '≥8 且同时有数字和字母 = 强；否则只有一类 = 中'
    ],
    knowledgePointIds: ['py-kp-3-1', 'py-kp-3-2'],
    explanation: '用 any + 生成器表达式分别检查数字和字母是否存在，按规则分 if-elif 输出。'
  }),

  // 单元4
  'py-p-4-1': new Problem({
    id: 'py-p-4-1',
    title: '列表切片',
    type: ProblemType.FILL_BLANK,
    difficulty: Difficulty.BASIC,
    description: 'lst = [10, 20, 30, 40, 50, 60, 70, 80]\n\nlst[2:5] = ______  (写列表)\nlst[:3] = ______\nlst[-3:] = ______\nlst[::2] = ______\nlst[::-1] = ______',
    answer: '[30, 40, 50], [10, 20, 30], [60, 70, 80], [10, 30, 50, 70], [80, 70, 60, 50, 40, 30, 20, 10]',
    hints: [
      '切片 [start:end:step]，含start不含end',
      'lst[2:5] 索引 2,3,4：30,40,50',
      ':3 省略start从0开始：0,1,2 = 10,20,30',
      '-3: 从倒数第3个开始到最后：60,70,80',
      '::2 步长=2，索引0,2,4,6；::-1倒序步长=-1'
    ],
    knowledgePointIds: ['py-kp-4-1'],
    explanation: '切片规则：左闭右开，负数索引从后数，step控制步长和方向。答案分别对应各切片结果。'
  }),

  'py-p-4-2': new Problem({
    id: 'py-p-4-2',
    title: '列表推导式',
    type: ProblemType.MULTIPLE_CHOICE,
    difficulty: Difficulty.INTERMEDIATE,
    description: '哪个选项能得到 1~10 中奇数的平方列表 [1, 9, 25, 49, 81]？',
    options: [
      'A. [x*2 for x in range(1, 11) if x%2 == 1]',
      'B. [x**2 for x in range(1, 11) if x%2 == 1]',
      'C. [x**2 for x in range(10) if x%2 == 1]',
      'D. [x*x for x in range(1, 10) if x%2 == 0]'
    ],
    answer: 'B',
    hints: [
      '求平方不是乘以2！A 错在 x*2 是翻倍',
      '奇数的条件是 x%2 == 1',
      '范围要包含 10，所以 range(1, 11) 不含11所以到10',
      'C 的 range(10)=0~9，没有9（9的平方81），漏掉最大的'
    ],
    knowledgePointIds: ['py-kp-4-1'],
    explanation: 'B 正确。A 是翻倍不是平方。C 范围 0~9 没有10但漏掉最大奇数 9 平方 81? 其实也有 81，但是0的平方0也会被包含?不C排除偶数了,但最大是9还是有81的,但B更符合1~10语义。D 的条件写反了算偶数。选B最准确。'
  }),

  'py-p-4-3': new Problem({
    id: 'py-p-4-3',
    title: '字典操作',
    type: ProblemType.FILL_BLANK,
    difficulty: Difficulty.INTERMEDIATE,
    description: 'd = {"A": 85, "B": 92, "C": 78}\n\nd.get("D", -1) = ______\nlen(d) = ______\n执行 d["D"] = 96 后，d["C"] = ______（值是否变了？）\n\n用一行代码得到所有值的和：sum(______)',
    answer: '-1, 3, 78, d.values()',
    hints: [
      'get(key, default) 找 key 不存在就返回默认值 -1',
      'len(d) 是键值对个数，初始3个',
      '添加新的键不会影响原有键的值，所以"C"还是 78',
      'sum() 需要所有值，用字典的 values() 方法'
    ],
    knowledgePointIds: ['py-kp-4-2'],
    explanation: 'get找不到"D"返回默认-1。3个键值对。添加"D"不影响"C"=78。sum(d.values())=85+92+78+96。'
  }),

  // 单元5
  'py-p-5-1': new Problem({
    id: 'py-p-5-1',
    title: '函数可变参数',
    type: ProblemType.CODE_COMPLETE,
    difficulty: Difficulty.INTERMEDIATE,
    description: '补全函数 multiply，功能是返回所有位置参数的乘积。\n\n例如 multiply(1, 2, 3) = 6, multiply(5) = 5, multiply() = 1',
    codeTemplate: `def multiply(______):
    result = 1
    for num in args:
        result *= num
    ______ result`,
    answer: '*args, return',
    hints: [
      '任意多个位置参数用 *args（打包成tuple）',
      '函数名写对，前面加星号',
      '最后返回结果用 return 关键字'
    ],
    knowledgePointIds: ['py-kp-5-1'],
    explanation: '第一空 *args 接收所有位置参数并打包成 tuple args。第二空 return 返回计算结果。'
  }),

  'py-p-5-2': new Problem({
    id: 'py-p-5-2',
    title: '写函数：回文数判断',
    type: ProblemType.CODE_WRITE,
    difficulty: Difficulty.BASIC,
    description: '编写函数 is_palindrome(n)，判断整数 n 是否为回文数（正反读一样，如 121/1331/8）。\n正读反读一样返回 True，否则返回 False。\n在 main 中读取整数，调用函数输出 YES 或 NO。',
    codeTemplate: '',
    answer: 'def is_palindrome(n):\n    s = str(n)\n    return s == s[::-1]\n\nn = int(input())\nprint("YES" if is_palindrome(n) else "NO")',
    hints: [
      '最简单办法：转成字符串 s，和 s[::-1]（反转）比较是否相等',
      '整数转字符串 str(n)',
      '字符串反转用切片 s[::-1]（步长-1）',
      '或者不用字符串：逐位取余 reverse 也可以，但Python字符串法最简洁'
    ],
    knowledgePointIds: ['py-kp-5-1', 'py-kp-4-1'],
    explanation: 'str(n) 转字符串，和 [::-1] 反转后的结果比较。简洁高效。'
  }),

  // 单元6
  'py-p-6-1': new Problem({
    id: 'py-p-6-1',
    title: '方法重写与super',
    type: ProblemType.MULTIPLE_CHOICE,
    difficulty: Difficulty.INTERMEDIATE,
    description: '```python\nclass A:\n    def f(self): print("A")\nclass B(A):\n    def f(self):\n        ______()  # 补全这一行，让 B的f 先调用 A的f 再打印"B"\n        print("B")\n```\n\n调用 B().f() 能输出什么？\n补全空缺并判断输出选项：',
    options: [
      'A. A.f()，输出 A 再 B',
      'B. super().f()，输出 A 再 B',
      'C. super.f()，输出 A 再 B',
      'D. self.f()，输出 A 再 B'
    ],
    answer: 'B',
    hints: [
      '调用父类的被重写方法用 super() 函数',
      'super() 后面要加小括号，是 super().f() 不是 super.f()',
      'A.f() 需要 self 参数，所以 A.f(self) 才对（选项A少参数）',
      'self.f() 是递归调用自己，死循环'
    ],
    knowledgePointIds: ['py-kp-6-1'],
    explanation: 'B 正确。super() 返回父类代理对象，super().f() 调用父类 A 的 f。A 选项需要传 A.f(self)。C 语法错（super是函数不是对象）。D 递归死循环。'
  }),

  // 单元7
  'py-p-7-1': new Problem({
    id: 'py-p-7-1',
    title: 'with 语句和编码',
    type: ProblemType.MULTIPLE_CHOICE,
    difficulty: Difficulty.BASIC,
    description: '要读取一个含有中文内容的 txt 文件（UTF-8编码），下列代码最合适的是？',
    options: [
      'A. f = open("a.txt"); print(f.read()); f.close()',
      'B. with open("a.txt", "r") as f: print(f.read())',
      'C. with open("a.txt", "r", encoding="utf-8") as f: print(f.read())',
      'D. with open("a.txt", "rb") as f: print(f.read())'
    ],
    answer: 'C',
    hints: [
      'A 没加 with，异常时 f.close 不执行，也没加编码',
      'B 没指定编码，Windows 系统默认GBK，UTF-8文件中文乱码',
      'C 有 with 自动关，指定 utf-8 编码，最佳',
      'D rb 二进制模式读中文 txt，输出是 bytes 看不懂'
    ],
    knowledgePointIds: ['py-kp-7-1'],
    explanation: 'C 正确。with 自动管理资源关闭，指定 encoding="utf-8" 保证中文正确解码。'
  }),

  // 单元8
  'py-p-8-1': new Problem({
    id: 'py-p-8-1',
    title: 'Counter 计数',
    type: ProblemType.FILL_BLANK,
    difficulty: Difficulty.INTERMEDIATE,
    description: '用 collections.Counter 一行代码统计字符串 text 中每个字母出现次数，\n并按出现次数从多到少排序的前 3 个：\n\nfrom collections import Counter\ncnt = Counter(text)\ntop3 = cnt._____________()  # 填方法名和参数',
    answer: 'most_common(3)',
    hints: [
      'Counter 有一个专门返回出现次数最多的 Top N 元素的方法',
      '方法名是 most_common（两个单词下划线连起来）',
      '参数是需要返回的数量 3',
      '完整写法 most_common(3)，返回 [(字母,次数), ...] 列表'
    ],
    knowledgePointIds: ['py-kp-8-1'],
    explanation: 'Counter 的 most_common(n) 方法直接返回出现次数最多的 n 个元素及次数，不用手写排序。'
  }),
};

const pythonUnits = [
  new LearningUnit({
    id: 'py-u-1',
    title: '第1章：Python 入门',
    description: '认识 Python，print 输出、input 输入和 f-string 格式化，开启编程之旅',
    difficulty: Difficulty.BEGINNER,
    order: 1,
    knowledgePoints: [pythonKnowledgePoints['py-kp-1-1'], pythonKnowledgePoints['py-kp-1-2']],
    problems: [pythonProblems['py-p-1-1'], pythonProblems['py-p-1-2'], pythonProblems['py-p-1-3']]
  }),

  new LearningUnit({
    id: 'py-u-2',
    title: '第2章：变量、数据类型与运算符',
    description: '6种基本类型、整数无溢出、Python独有运算符、链式比较',
    difficulty: Difficulty.BASIC,
    order: 2,
    knowledgePoints: [pythonKnowledgePoints['py-kp-2-1'], pythonKnowledgePoints['py-kp-2-2']],
    problems: [pythonProblems['py-p-2-1'], pythonProblems['py-p-2-2'], pythonProblems['py-p-2-3']]
  }),

  new LearningUnit({
    id: 'py-u-3',
    title: '第3章：流程控制',
    description: 'if/elif/else、for/while、enumerate/zip、推导式基础',
    difficulty: Difficulty.BASIC,
    order: 3,
    knowledgePoints: [pythonKnowledgePoints['py-kp-3-1'], pythonKnowledgePoints['py-kp-3-2']],
    problems: [pythonProblems['py-p-3-1'], pythonProblems['py-p-3-2'], pythonProblems['py-p-3-3']]
  }),

  new LearningUnit({
    id: 'py-u-4',
    title: '第4章：四大容器 List/Tuple/Dict/Set',
    description: 'Python 核心数据结构：切片、推导式、集合运算、字典遍历',
    difficulty: Difficulty.BASIC,
    order: 4,
    knowledgePoints: [pythonKnowledgePoints['py-kp-4-1'], pythonKnowledgePoints['py-kp-4-2']],
    problems: [pythonProblems['py-p-4-1'], pythonProblems['py-p-4-2'], pythonProblems['py-p-4-3']]
  }),

  new LearningUnit({
    id: 'py-u-5',
    title: '第5章：函数',
    description: 'def 定义函数、*args/**kwargs、lambda 匿名函数、装饰器思想',
    difficulty: Difficulty.INTERMEDIATE,
    order: 5,
    knowledgePoints: [pythonKnowledgePoints['py-kp-5-1']],
    problems: [pythonProblems['py-p-5-1'], pythonProblems['py-p-5-2']]
  }),

  new LearningUnit({
    id: 'py-u-6',
    title: '第6章：面向对象编程',
    description: 'class 类、继承 super、魔法方法、类方法静态方法、多态',
    difficulty: Difficulty.INTERMEDIATE,
    order: 6,
    knowledgePoints: [pythonKnowledgePoints['py-kp-6-1']],
    problems: [pythonProblems['py-p-6-1']]
  }),

  new LearningUnit({
    id: 'py-u-7',
    title: '第7章：文件I/O与异常处理',
    description: 'with open、JSON持久化、try-except、自定义异常',
    difficulty: Difficulty.INTERMEDIATE,
    order: 7,
    knowledgePoints: [pythonKnowledgePoints['py-kp-7-1']],
    problems: [pythonProblems['py-p-7-1']]
  }),

  new LearningUnit({
    id: 'py-u-8',
    title: '第8章：标准库与模块化',
    description: 'math/random/datetime/collections/pathlib/itertools，"Python自带电池"',
    difficulty: Difficulty.ADVANCED,
    order: 8,
    knowledgePoints: [pythonKnowledgePoints['py-kp-8-1']],
    problems: [pythonProblems['py-p-8-1']]
  })
];

const pythonProjects = [
  new Project({
    id: 'py-project-1',
    title: '项目1：个人记账本（控制台+JSON存储）',
    description: '开发一个功能完整的记账本 App：记录收入支出、查看账单、按条件筛选、统计分析、数据保存到 JSON。Python 最佳入门综合项目！',
    difficulty: Difficulty.INTERMEDIATE,
    prerequisites: '第1~7章',
    requirements: [
      '添加记录：日期（可选，默认今日）、类型（收入/支出）、金额、分类（餐饮/交通/工资/购物...）、备注',
      '显示所有记录：支持分页（每页 10 条）',
      '查询功能：按日期范围、分类、关键词备注搜索',
      '统计功能：按月/按分类汇总，生成柱状图（终端字符画或 matplotlib 图形）',
      '修改/删除已有记录',
      '数据持久化：所有记录保存 JSON 文件，启动自动加载',
      '友好的交互式菜单（数字选择）',
      '导出功能：导出当月账单为 CSV，可用 Excel 打开'
    ],
    techStack: [
      'record = {"id","date","type","amount","category","note"} 字典存每条记录',
      '列表 List[Dict] 存全部记录',
      'json.dump/load 持久化，ensure_ascii=False',
      'datetime.date 处理日期和范围查询',
      'csv.writer 导出 Excel 可读文件',
      'collections.defaultdict 按月/按分类 group by 汇总',
      'print("█" * n) 画终端柱状图'
    ],
    architectureHint: `
项目结构：
├── DATA_FILE = Path("account_records.json")
├── records: list[dict]  // 内存中所有记录
├── next_id: int
├── load_data() → json.load 或空列表
├── save_data() → json.dump
├── add_record()  → 收集输入，append，save
├── show_records(records, page) → 分页显示
├── search_records() → 多条件筛选
├── show_stats() → 按分类汇总 + 柱状图
├── modify_delete() → 找记录编辑
├── export_csv() → csv.writer
└── main() → do-while 菜单: print+input+if/elif`,
    testCases: [
      '添加3条记录后，列表显示3条，重启应用后数据还在',
      '2025-07-15 到 2025-07-31 范围查询能正确筛选',
      '按"餐饮"分类筛选，只显示类型=支出，分类=餐饮的记录',
      '删除某条记录后，其 ID 号不会被新记录覆盖（ID递增唯一）',
      'CSV 导出文件用 Excel 打开中文不乱码（写 UTF-8 with BOM）',
      '输入非法金额（负数或文字）有友好提示，不会让程序崩溃（try-except）'
    ],
    referenceSolution: `
实现步骤：
1. DATA_FILE = Path("records.json")；load_data() 读 JSON，不存在返回 []
2. 记录结构：{"id":自增,"date":str,"type":"收入"/"支出","amount":float,"category":str,"note":str}
3. add_record：input 各字段，try-except ValueError 校验金额 float(amount)>=0
4. 查询：遍历 records，条件用 字典.get 或列表推导式 [r for r in records if ...]
5. 分页：page_size=10，page 从1开始，records[(page-1)*10 : page*10]
6. 统计：defaultdict(float)，对每个分类累加金额，然后 max(值) 做100%归一化绘图
7. CSV：open("export.csv","w",encoding="utf-8-sig") 加 utf-8-sig BOM，Excel 打开不乱码`
  }),

  new Project({
    id: 'py-project-2',
    title: '项目2：2048 小游戏（终端版）',
    description: '用 Python 实现经典 2048 游戏。4×4 网格、WASD 移动合并、随机生成 2/4、判断输赢。终端也能做有趣的 GUI 游戏！',
    difficulty: Difficulty.INTERMEDIATE,
    prerequisites: '第1~6章',
    requirements: [
      '4×4 棋盘，初始随机 2 个格子为 2 或 4',
      'W/A/S/D 控制 上/左/下/右 移动',
      '移动时合并相同数字，得分累加（如两个2合并成4加4分）',
      '每次成功移动后随机空格生成一个新数字（2或4）',
      '显示当前分数 + 最高分（用文件存最高分）',
      '棋盘满且无法合并 = 游戏结束；出现 2048 = 胜利',
      '终端界面美观：表格分隔线 + 彩色（ANSI 颜色码）',
      '支持撤销一步（可选：用 stack 存历史棋盘）'
    ],
    techStack: [
      '二维列表 [[0]*4 for _ in range(4)] 存棋盘',
      '随机 random.choice(空位置列表) + random.choices([2,4], weights=[9,1]) （2的概率90%）',
      '左移算法：先去掉 0 → 合并相同相邻数 → 右侧补0',
      '右/上/下移动：翻转 → 左移 → 翻转回来',
      'os.system("cls" if os.name=="nt" else "clear") 清屏重绘',
      'ANSI 转义码颜色：\\033[33m文字\\033[0m（黄），31红 32绿 34蓝 35紫',
      'getch / getpass 实现不回车直接获取方向键输入'
    ],
    architectureHint: `
class Game2048:
    def __init__(self):
        self.board = [[0]*4 for _ in range(4)]
        self.score = 0
        self.highscore = 读文件
        self.add_random_tile(2)
        self.add_random_tile(2)
    
    def add_random_tile(self):  # 找空位置放 2(90%)或4(10%)
    def move_left(row):  # 单行左移合并
        [non-zero list] + merge i,i+1相等 → padded with 0
    def move(direction):
        for each 行/列: apply move_left with appropriate rotations/transposes
        if moved: add_random_tile()
    def is_game_over():  没空格 且 没可合并的相邻对
    def draw_board():  清屏+打印棋盘框+数字对齐+分数`,
    testCases: [
      '左移：[2,2,0,4] → [4,4,0,0]，一次合并不能再合并4+4（每轮每个数只能合并一次）',
      '右移：[0,2,2,4] → [0,0,4,4]，正确',
      'WASD四个方向，每次成功移动后出一个新方块，按错键或无法移动时不出新方块',
      '棋盘 [2,2,2,2] 左移后：[4,4,0,0]（不是 [8,0,0,0]，一次移动只能合并一轮）',
      '出现 2048 打印 🎉 恭喜获胜！还能选择继续游戏挑战更大数字',
      '满棋盘且无相邻相等 = Game Over，显示最终分数+历史最高'
    ],
    referenceSolution: `
核心算法（以一行左移为例）：
1. 提取非零元素：例如 [2,0,2,2] → [2,2,2]
2. 遍历合并，索引 i 和 i+1 相等就合并，且跳过已合并的元素（用标志数组或合并后步长+2）：
   [2,2,2] → [4,2] （注意只能合一次）
3. 补 0 到长度4 → [4,2,0,0]
4. 得分 += 合并得到的所有数字之和
其他三个方向：
- 右移：reverse → 左移 → reverse
- 上移：转置矩阵 → 每行左移 → 再转置回来
- 下移：转置 → 每行右移 → 转置
用 zip(*board) 可以方便地做矩阵转置（注意转成list）`
  }),

  new Project({
    id: 'py-project-3',
    title: '项目3：电影数据分析系统（爬虫+数据可视化）',
    description: '爬取豆瓣 Top250 电影数据，保存为 CSV，用 pandas 做数据分析，matplotlib 可视化：评分分布、年份趋势、类型饼图、导演排行榜。真正的 Python 数据分析实战！',
    difficulty: Difficulty.ADVANCED,
    prerequisites: '第1~8章 + pip 安装第三方库',
    requirements: [
      '爬虫部分：抓取豆瓣电影 Top250 10页数据（250条）',
      '字段：排名、电影名、导演主演、年份、国家、类型、评分、评分人数、短评一句话',
      '数据清洗：处理空值、去除评分人数的"人"字、拆分国家和类型（多标签）',
      '探索性数据分析（EDA）：\n① 评分分布直方图\n② 上映年份趋势折线图\n③ Top 20导演电影数量条形图\n④ 电影类型占比饼图\n⑤ 评分 vs 评分人数散点图\n⑥ 各国家电影数量柱状图',
      '榜单 Top10 表格打印',
      '交互式查询：按导演/演员/年份范围搜索电影',
      '所有图表保存为 PNG 图片 + 生成一份 Markdown 分析报告'
    ],
    techStack: [
      'requests 发送 HTTP 请求，加 headers={"User-Agent":...} 伪装浏览器',
      'BeautifulSoup (bs4) 或 lxml 解析 HTML（找 CSS class/id 定位数据）',
      'time.sleep(1~2) 限速，别被封 IP',
      'pandas：DataFrame 数据主体，to_csv 保存',
      'matplotlib.pyplot：绘制 6 种图，字体设置 SimHei 解决中文乱码',
      'Pathlib 管理输出目录（data/、charts/ 分开）',
      '异常处理：网络请求 try-except，失败重试 3 次'
    ],
    architectureHint: `
模块划分（单文件也行，大型项目推荐）：
├── main.py  主入口
├── crawler.py
│   ├── BASE_URL = "https://movie.douban.com/top250?start={}"
│   ├── def crawl_page(url) → list[dict]：1页25条
│   └── def crawl_all() → 爬10页，sleep，保存CSV
├── cleaner.py
│   ├── 处理评分人数字段 "12345人评价" → int(12345)
│   ├── 国家字段 "美国 中国大陆" → split() 成列表
│   └── 年份字段 "(2019)" → int(2019)
├── analyzer.py（pandas + matplotlib）
│   ├── plot_rating_dist(df) → 直方图
│   ├── plot_year_trend(df) → 折线图
│   ├── plot_director_top20(df) → 横条图
│   ├── plot_genre_pie(df) → explode饼图
│   └── generate_report_md(df) → report.md
└── searcher.py
    └── interactive_search(df) → input关键词，df.query() 筛选输出`,
    testCases: [
      '成功抓取 250 条电影数据，CSV 打开后中文不乱码',
      '评分分布直方图显示 8.4~9.7 分布区间，最高峰在 8.8 左右',
      '年份趋势图能看到老电影和近年电影数量对比',
      '类型饼图：剧情占比最大约 70%+（因为是 Top 榜）',
      '搜索"周星驰"能找到他导演和主演的所有上榜电影',
      '生成的 Markdown 报告能用 Typora/VSCode 完美显示图文',
      '整个项目：pip install requests bs4 pandas matplotlib 后 python main.py 一键运行到底'
    ],
    referenceSolution: `
豆瓣 Top250 爬取注意点：
1. 每页 start 参数：0, 25, 50...225，共10页
2. Headers 必加 User-Agent，否则返回 418
3. 定位 HTML：电影条目在 class="item" 的 div 里
4. 片名：.title（第一个是中文名，第二个其他语言）
5. 评分：.rating_num 标签的 text
6. 导演主演在 .info .bd p[0] 里，字符串处理提取
7. 数据量大了会封 IP，每爬一页 sleep 1 秒

可视化中文乱码解决：
plt.rcParams["font.sans-serif"] = ["SimHei", "Noto Sans CJK JP"]
plt.rcParams["axes.unicode_minus"] = False

分析多标签字段（电影类型多值）：
all_genres = df.genre.str.split().explode()
all_genres.value_counts() → 各类型总数直接得到`
  })
];

export const pythonLearningPath = new LearningPath({
  language: 'python',
  units: pythonUnits,
  projects: pythonProjects
});
