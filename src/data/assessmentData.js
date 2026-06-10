export const BUILTIN_DATA = [
  // ─────────────────────────────────────────────
  // Module 1: 入门基础
  // ─────────────────────────────────────────────
  {
    id: "p1",
    title: "入门基础",
    level: 1,
    color: "#4ade80",
    builtin: true,
    topics: [
      {
        id: "dart",
        title: "Dart 语言基础",
        items: [
          {
            id: "p1-dart-q1",
            type: "quiz",
            question: "Dart 的空安全（Null Safety）中，`String?` 和 `String` 的核心区别是什么？",
            options: [
              "String? 表示该变量可以持有 null 值，String 表示该变量不允许为 null",
              "String? 是 String 的子类，两者没有本质区别",
              "String? 只能赋值一次，String 可以多次赋值",
              "String? 仅用于函数参数，String 用于所有其他场景"
            ],
            answer: 0,
            explain:
              "在 Dart 空安全体系下，类型默认是不可空的。`String` 表示一个永远不为 null 的字符串；而 `String?` 是可空类型，允许变量持有 null。使用前必须做 null 检查或使用 `!`、`??` 等操作符进行安全访问。"
          },
          {
            id: "p1-dart-q2",
            type: "quiz",
            question: "Dart 的事件循环（Event Loop）模型中，以下说法正确的是？",
            options: [
              "Dart 是多线程模型，每个 Isolate 共享同一个事件循环",
              "Dart 是单线程的，所有异步操作都在同一个事件循环中调度执行",
              "Dart 的事件循环只处理 I/O 事件，不处理定时器",
              "Dart 中 await 会阻塞主线程，导致事件循环停止"
            ],
            answer: 1,
            explain:
              "Dart 采用单线程 + 事件循环的模型。每个 Dart Isolate 拥有自己独立的线程和事件循环。异步操作（Future、Timer、I/O 等）不会阻塞线程，而是将回调注册到事件循环中，由事件循环按顺序调度执行。await 只是语法糖，底层仍然是事件循环调度。"
          },
          {
            id: "p1-dart-q3",
            type: "quiz",
            question: "关于 Dart 中的 mixin，以下说法正确的是？",
            options: [
              "mixin 可以有构造函数，可以被实例化",
              "mixin 使用 extends 关键字来应用到一个类",
              "mixin 使用 with 关键字应用，且可以有多个 mixin 线性组合到同一个类",
              "mixin 只能定义方法，不能定义属性和 getter"
            ],
            answer: 2,
            explain:
              "mixin 通过 `with` 关键字应用，一个类可以混入多个 mixin，例如 `class A extends B with M1, M2`。mixin 不能有构造函数、不能被实例化，但可以定义方法、属性、getter 和 setter。mixin 的线性化顺序是从右到左，后混入的优先级更高。"
          },
          {
            id: "p1-dart-c1",
            type: "code",
            question: "以下代码使用了 AnimationController，但在运行时崩溃，报错 \"TickerProvider not found\"。请找出原因：",
            code: `class MyWidget extends StatefulWidget {
  const MyWidget({super.key});
  @override
  State<MyWidget> createState() => _MyWidgetState();
}

class _MyWidgetState extends State<MyWidget> {
  late AnimationController _controller;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      duration: const Duration(seconds: 1),
      vsync: this,
    );
  }

  @override
  Widget build(BuildContext context) {
    return const SizedBox();
  }
}`,
            options: [
              "AnimationController 的 duration 参数不能为 1 秒",
              "_MyWidgetState 没有混入 SingleTickerProviderStateMixin，导致 this 不能作为 vsync",
              "initState 中不能调用 super.initState()",
              "Widget build 方法不能返回 SizedBox"
            ],
            answer: 1,
            explain:
              "AnimationController 的 vsync 参数需要一个 TickerProvider。State 类本身不是 TickerProvider，必须混入 `SingleTickerProviderStateMixin`（单个 AnimationController）或 `TickerProviderStateMixin`（多个 AnimationController）。修复方法：`class _MyWidgetState extends State<MyWidget> with SingleTickerProviderStateMixin`。"
          },
          {
            id: "p1-dart-t1",
            type: "task",
            question: "使用 Dart 3 的 sealed class 编写一个命令行程序",
            desc: "编写一个 Dart CLI 程序，使用 sealed class 定义一个「形状」类型体系：包含 Circle（含 radius）、Rectangle（含 width, height）、Triangle（含 base, height）三种形状。每个形状都能计算面积（area）和周长（perimeter）。在 main 函数中创建各种形状并打印结果，展示 sealed class 的模式匹配（switch expression）。",
            criteria: [
              "正确使用 sealed class 定义 Shape 及其子类",
              "每个子类正确实现 area 和 perimeter 的计算",
              "使用 switch expression 对 sealed class 进行穷举模式匹配",
              "程序能正确编译运行，输出正确的计算结果"
            ]
          },
          {
            id: "p1-dart-o1",
            type: "open",
            question: "请详细对比 Dart 中 mixin、extension 和 abstract class 三者的设计意图、适用场景和主要区别。在什么情况下你会选择使用其中一个而不是另外两个？",
            ref: "mixin 的设计意图是代码复用（横向组合能力），通过 with 关键字将功能混入类，适用于给多个不相关的类添加相同能力（如 SingleTickerProviderStateMixin）。mixin 可以有状态（属性），线性化后优先级明确。\n\nextension 的设计意图是给已有类型添加方法（不能添加实例属性或覆盖已有方法），无需修改原始类也无需继承，适用于给第三方库或内置类型扩展工具方法。extension 是静态的，没有多态性。\n\nabstract class 的设计意图是定义接口契约或基类模板，通过继承（extends）或实现（implements）来使用。适用于定义「是什么」的层次关系，如 Widget 是所有组件的基类。\n\n选择依据：如果是「是什么」的关系用 abstract class；如果是「有什么能力」的关系用 mixin；如果只是给已有类型加工具方法用 extension。"
          }
        ]
      },
      {
        id: "declarative",
        title: "声明式 UI 思维",
        items: [
          {
            id: "p1-decl-q1",
            type: "quiz",
            question: "Flutter 声明式 UI 的核心理念是什么？",
            options: [
              "通过直接修改 UI 组件的属性来更新界面",
              "UI = f(state)，通过改变状态来驱动整个 UI 重新构建",
              "每次更新只修改 DOM 中变化的节点",
              "通过命令式 API 逐个操作 UI 元素"
            ],
            answer: 1,
            explain:
              "Flutter 采用声明式 UI 范式，核心理念是 `UI = f(state)`。开发者描述「UI 应该是什么样」而非「如何修改 UI」。当状态（state）发生变化时，Flutter 会重新调用 build 方法生成新的 Widget 树，然后通过 diff 算法高效更新渲染。这与传统的命令式 UI（如 Android View、iOS UIKit）直接操作 UI 对象的方式截然不同。"
          },
          {
            id: "p1-decl-c1",
            type: "code",
            question: "以下代码存在一个声明式 UI 思维上的「坏味道」，请找出问题：",
            code: `class MyHomePage extends StatefulWidget {
  const MyHomePage({super.key});
  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  String _displayText = "初始文本";

  void _updateText(String newText) {
    setState(() {
      _displayText = newText;
    });
  }

  @override
  Widget build(BuildContext context) {
    _displayText = "每次 build 都被重置";
    return Column(
      children: [
        Text(_displayText),
        ElevatedButton(
          onPressed: () => _updateText("按钮点击"),
          child: const Text("点击"),
        ),
      ],
    );
  }
}`,
            options: [
              "Column 组件不能包含 Text 和 ElevatedButton",
              "build 方法中直接赋值 _displayText，导致 setState 更新的状态在每次 build 时被覆盖",
              "_updateText 方法不应该调用 setState",
              "ElevatedButton 的 onPressed 不能使用箭头函数"
            ],
            answer: 1,
            explain:
              "在 build 方法中直接修改状态变量 `_displayText = \"每次 build 都被重置\"` 是典型的反模式。声明式 UI 中，build 方法应该是纯粹的——根据当前状态描述 UI，而不应修改状态。这行代码会在每次 build 时（包括 setState 触发后）覆盖状态，导致按钮点击无效。应将该赋值移除，让状态仅由用户交互或业务逻辑驱动。"
          },
          {
            id: "p1-decl-t1",
            type: "task",
            question: "实现一个带有状态建模的登录页面",
            desc: "实现一个登录页面，使用 sealed class 对登录状态进行建模：Idle（初始）、Loading（加载中）、Success（登录成功，含用户名）、Failure（登录失败，含错误信息）。页面包含用户名输入框、密码输入框和登录按钮，根据当前状态显示不同的 UI（按钮禁用、加载指示器、成功/失败提示）。",
            criteria: [
              "使用 sealed class 正确建模 4 种登录状态",
              "登录按钮在 Loading 状态下禁用并显示 CircularProgressIndicator",
              "Success 状态跳转到欢迎页面或显示欢迎信息",
              "Failure 状态显示错误信息（如 SnackBar）",
              "正确使用 setState 或状态管理方案驱动 UI 更新"
            ]
          }
        ]
      },
      {
        id: "widget-basics",
        title: "Widget 基础与生命周期",
        items: [
          {
            id: "p1-wb-q1",
            type: "quiz",
            question: "关于 Flutter 中的 Widget，以下说法正确的是？",
            options: [
              "Widget 是可变对象，可以直接修改其属性来更新 UI",
              "Widget 是不可变的（immutable）轻量级配置描述，用于描述 UI 的一部分",
              "Widget 在运行时会持有大量系统资源，创建和销毁的开销很大",
              "Widget 和 Element 是一一对应的同一个概念"
            ],
            answer: 1,
            explain:
              "Widget 是不可变的配置对象（immutable configuration），它非常轻量级，仅描述 UI 应该呈现什么样子（包含类型、属性等），不持有任何渲染资源。Widget 的创建和丢弃开销极小，Flutter 会在每次 build 时创建新的 Widget 实例。真正持有资源、管理生命周期的是 Element（和 RenderObject）。Widget 是「蓝图」，Element 是「实例」。"
          },
          {
            id: "p1-wb-q2",
            type: "quiz",
            question: "在 StatefulWidget 的 State 中，以下哪些资源必须在 `dispose()` 方法中手动释放？",
            options: [
              "所有的局部变量和临时对象",
              "AnimationController、StreamSubscription、TextEditingController、Timer 等订阅/控制器资源",
              "所有的 Widget 子组件",
              "BuildContext 引用"
            ],
            answer: 1,
            explain:
              "dispose() 方法的职责是释放在 State 生命周期内持有的、不会被 GC 自动回收的资源。包括：AnimationController（内部有 Ticker 订阅）、StreamSubscription（流订阅）、TextEditingController（监听器）、Timer（定时器）、FocusNode 等。局部变量会被 GC 回收无需手动处理；Widget 子组件和 BuildContext 由框架管理。"
          },
          {
            id: "p1-wb-c1",
            type: "code",
            question: "以下代码在页面反复进出后出现了内存泄漏警告，请找出原因：",
            code: `class _NewsPageState extends State<NewsPage> {
  late StreamSubscription _sub;
  final _items = <String>[];

  @override
  void initState() {
    super.initState();
    _sub = newsStream().listen((item) {
      setState(() => _items.add(item));
    });
  }

  @override
  Widget build(BuildContext context) {
    return ListView.builder(
      itemCount: _items.length,
      itemBuilder: (_, i) => ListTile(title: Text(_items[i])),
    );
  }
}`,
            options: [
              "ListView.builder 不应该使用 itemCount 参数",
              "dispose 方法中没有调用 _sub.cancel() 来取消流订阅",
              "initState 中不能调用 listen 方法",
              "Text 组件不能直接放在 ListTile 的 title 中"
            ],
            answer: 1,
            explain:
              "代码在 initState 中创建了 StreamSubscription，但没有重写 dispose() 方法来取消订阅。当页面被销毁后，StreamSubscription 仍然存活并持续接收数据，调用 setState 会抛出异常（因为 State 已 dispose）。修复方法：添加 `@override void dispose() { _sub.cancel(); super.dispose(); }`。"
          },
          {
            id: "p1-wb-t1",
            type: "task",
            question: "实现一个带完整生命周期管理的倒计时页面",
            desc: "实现一个倒计时页面，包含：1) 一个 Timer.periodic 每秒更新显示；2) 一个 StreamController 广播倒计时事件；3) 一个 AnimationController 驱动进度条动画。在 State 的生命周期方法中添加日志（initState, didChangeDependencies, build, deactivate, dispose），确保在 dispose 中正确释放所有资源。",
            criteria: [
              "Timer.periodic 在 dispose 中正确 cancel",
              "StreamController 在 dispose 中正确 close",
              "AnimationController 在 dispose 中正确 dispose",
              "生命周期方法调用顺序正确（super 调用位置正确）",
              "页面功能正常，倒计时、动画、事件广播均工作"
            ]
          },
          {
            id: "p1-wb-o1",
            type: "open",
            question: "Flutter 中 `build()` 方法会在哪些情况下被调用？请尽可能列举所有触发 build 的场景，并解释每种场景背后的机制。",
            ref: "build() 方法被触发的主要场景：\n\n1. **首次挂载**：Element 首次 mount 时调用 build 构建初始 Widget 树。\n2. **setState()**：StatefulWidget 调用 setState 后，标记该 Element 为 dirty，下一帧会调用 build。\n3. **父 Widget 重建**：父级 Widget 的 build 重新执行时，子 Widget 也会被重建（即使参数没变，Widget 实例不同就会重建）。\n4. **InheritedWidget 变化**：当依赖的 InheritedWidget 数据变化时，通过 dependOnInheritedWidgetOfExactType 注册的依赖者会被通知重建。\n5. **didChangeDependencies**：当依赖关系变化（如 Locale、MediaQuery 变化）时触发，紧接着会调用 build。\n6. **didUpdateWidget**：父 Widget 重建且传递了新的 Widget 配置时调用，之后会调用 build。\n7. **强制重建**：通过 Element.markNeedsBuild() 手动标记（一般框架内部使用）。\n\n关键理解：build 可能被频繁调用，因此必须保持轻量、无副作用。"
          }
        ]
      },
      {
        id: "context",
        title: "BuildContext",
        items: [
          {
            id: "p1-ctx-q1",
            type: "quiz",
            question: "Flutter 中的 `BuildContext` 本质上是什么？",
            options: [
              "一个包含屏幕尺寸和像素密度的配置对象",
              "Element 类的实例，代表 Widget 在 Element 树中的位置",
              "一个全局单例，所有 Widget 共享同一个 Context",
              "RenderObject 的引用，用于直接操作渲染"
            ],
            answer: 1,
            explain:
              "BuildContext 实际上就是 Element 类本身（Element implements BuildContext）。每个 Widget 都有一个对应的 Element，而 BuildContext 提供的方法（如 findAncestorWidgetOfExactType、dependOnInheritedWidgetOfExactType）实际上是在 Element 树上进行查找操作。理解「Context 就是 Element」是深入理解 Flutter 框架的关键。"
          },
          {
            id: "p1-ctx-c1",
            type: "code",
            question: "以下代码在点击按钮后抛出异常：\"Looking up a deactivated widget's ancestor is unsafe\"。请找出原因：",
            code: `class _MyPageState extends State<MyPage> {
  void _showMessage() async {
    final result = await showDialog<String>(
      context: context,
      builder: (ctx) => AlertDialog(
        title: const Text("提示"),
        content: const Text("操作完成"),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(ctx).pop("ok"),
            child: const Text("确定"),
          ),
        ],
      ),
    );
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(content: Text("结果: \$result")),
    );
  }

  @override
  Widget build(BuildContext context) {
    return ElevatedButton(
      onPressed: _showMessage,
      child: const Text("点击"),
    );
  }
}`,
            options: [
              "showDialog 不能使用 context 参数",
              "await 返回后，原 context 对应的 Element 可能已被销毁或失效，应缓存 ScaffoldMessengerState",
              "AlertDialog 的 actions 不能为空数组",
              "SnackBar 不能显示在 ScaffoldMessenger 中"
            ],
            answer: 1,
            explain:
              "在 async 方法中 await 返回后，页面可能已经被 pop 或重建，原来的 `context`（即当前 State 的 Element）可能已经 deactivated。此时再使用 `ScaffoldMessenger.of(context)` 会抛出异常。修复方法：在 await 之前先保存引用 `final messenger = ScaffoldMessenger.of(context);`，然后在 await 之后使用 `messenger.showSnackBar(...)`，或者在 await 之后检查 `if (!mounted) return;`。"
          },
          {
            id: "p1-ctx-o1",
            type: "open",
            question: "在使用 `showDialog` 时，为什么有时传入的 `context` 会导致 \"No Scaffold found\" 错误？请解释 Dialog 的 context 和当前页面的 context 有什么区别，以及如何正确地在 Dialog 中访问 Scaffold、Theme 等上层数据。",
            ref: "showDialog 会创建一个新的路由（OverlayEntry），Dialog 的 Widget 树被挂载到这个新路由下，而不是当前页面的 Widget 树中。因此：\n\n1. Dialog 的 builder 中的 `ctx` 是 Dialog 路由下的 context，它不在当前页面的 Scaffold 之下，所以 `Scaffold.of(ctx)` 找不到 Scaffold。\n2. 当前页面的 `context`（State 的 context）仍然在当前页面的 Element 树上，它在 Scaffold 之下，可以使用。\n\n解决方案：\n- 在 showdialog 之前保存需要的引用（如 ScaffoldMessenger.of(context)）\n- 使用 GlobalKey<ScaffoldState> 来直接访问 Scaffold\n- 在 Dialog 内使用 Scaffold 包裹（如果确实需要的话）\n- 对于 Theme，Dialog 的 context 通常可以正常访问到，因为 Theme 在 MaterialApp 层级注入"
          }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────
  // Module 2: 布局与 UI 构建
  // ─────────────────────────────────────────────
  {
    id: "p2",
    title: "布局与 UI 构建",
    level: 2,
    color: "#60a5fa",
    builtin: true,
    topics: [
      {
        id: "layout",
        title: "Layout 约束模型",
        items: [
          {
            id: "p2-layout-q1",
            type: "quiz",
            question: "Flutter 布局系统的三条核心规则是什么？",
            options: [
              "父组件决定大小、子组件决定位置、Box 决定约束",
              "父节点向子节点传递约束（Constraints），子节点在约束内决定自身大小（Size），父节点根据子节点大小决定其位置（Position）",
              "子节点先测量、父节点后布局、RenderObject 最后绘制",
              "Width 和 Height 决定一切，Margin 和 Padding 仅影响视觉"
            ],
            answer: 1,
            explain:
              "Flutter 布局三规则：(1) Constraints go down — 父节点向子节点传递 BoxConstraints（minWidth/maxWidth/minHeight/maxHeight）; (2) Sizes come up — 子节点在约束范围内自行决定大小并返回给父节点; (3) Parent sets position — 父节点根据子节点返回的大小决定子节点的位置（offset）。这三条规则是理解所有 Flutter 布局行为的基础。"
          },
          {
            id: "p2-layout-c1",
            type: "code",
            question: "以下代码在运行时报出 \"Vertical viewport was given unbounded height\" 错误，请找出原因：",
            code: `class MyPage extends StatelessWidget {
  const MyPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        const Text("标题"),
        ListView.builder(
          itemCount: 20,
          itemBuilder: (_, i) => ListTile(title: Text("Item \$i")),
        ),
        const Text("底部"),
      ],
    );
  }
}`,
            options: [
              "Column 不能包含 Text 和 ListView 两种不同类型的子组件",
              "ListView 在 Column 中会获得无限高度约束，需要用 Expanded 包裹或设置 shrinkWrap",
              "ListView.builder 必须设置 shrinkWrap: true 才能工作",
              "Column 必须设置 mainAxisAlignment 才能正常工作"
            ],
            answer: 1,
            explain:
              "Column 给子组件的垂直约束是无限的（unbounded），而 ListView 默认会尝试占满所有可用空间（expand），在无限约束下它无法确定自身高度，因此报错。解决方案有两种：(1) 用 `Expanded` 或 `Flexible` 包裹 ListView，给它一个有限的约束；(2) 设置 `shrinkWrap: true`（但要注意性能影响，shrinkWrap 会一次性构建所有子项）。"
          },
          {
            id: "p2-layout-t1",
            type: "task",
            question: "实现一个响应式布局页面",
            desc: "实现一个自适应布局页面：当屏幕宽度 >= 600px 时显示左右两栏布局（左侧导航列表 + 右侧内容详情），当屏幕宽度 < 600px 时显示单栏布局（列表页点击进入详情页）。使用 LayoutBuilder 或 MediaQuery 判断屏幕宽度，使用 NavigationRail 作为宽屏的侧边导航。",
            criteria: [
              "正确使用 LayoutBuilder 或 MediaQuery 获取可用宽度",
              "宽屏（>= 600px）模式下显示 NavigationRail + 内容区的双栏布局",
              "窄屏（< 600px）模式下显示列表，点击后 push 到详情页",
              "两种布局之间的切换流畅，没有布局溢出或错误"
            ]
          },
          {
            id: "p2-layout-o1",
            type: "open",
            question: "请解释 Flutter 中「紧约束（tight constraints）」和「松约束（loose constraints）」的区别，并分别给出 3 个以上会产生紧约束和松约束的常见 Widget。",
            ref: "紧约束（Tight Constraints）：minWidth == maxWidth 且 minHeight == maxHeight，子组件没有选择余地，只能使用父组件指定的大小。\n\n松约束（Loose Constraints）：min 和 max 之间有范围，子组件可以在约束范围内自行决定大小。\n\n产生紧约束的常见 Widget：\n1. SizedBox(width: 100, height: 100) — 宽高都被固定\n2. Container(width: 200, height: 200) — 设置了具体宽高时\n3. FittedBox — 先让子组件自由布局，然后缩放适配\n\n产生松约束的常见 Widget：\n1. Center — 允许子组件在 0 到父组件尺寸之间自由选择\n2. Align — 类似 Center，允许子组件自行决定大小\n3. Padding — 将约束减去 padding 后传递给子组件\n4. ConstrainedBox(constraints: BoxConstraints(minWidth: 100)) — 只设置最小值"
          }
        ]
      },
      {
        id: "layout-widgets",
        title: "常用布局组件",
        items: [
          {
            id: "p2-lw-q1",
            type: "quiz",
            question: "以下哪个组件是「单子组件（single-child）」布局组件，而不是「多子组件（multi-child）」组件？",
            options: [
              "Column — 排列多个子组件",
              "Stack — 堆叠多个子组件",
              "FittedBox — 缩放单个子组件以适配",
              "Wrap — 自动换行排列多个子组件"
            ],
            answer: 2,
            explain:
              "FittedBox 是单子组件布局组件（SingleChildRenderObjectWidget），它接受一个 child，根据 fit 属性（contain、fill、cover 等）对子组件进行缩放以适配可用空间。Column、Stack、Wrap 都是多子组件布局组件（MultiChildRenderObjectWidget），它们接受 children 列表。理解 single-child 和 multi-child 的区别有助于理解 RenderObject 的类型体系。"
          },
          {
            id: "p2-lw-q2",
            type: "quiz",
            question: "在 Row 中使用 Expanded 和 Flexible，以下说法正确的是？",
            options: [
              "Expanded 和 Flexible 完全相同，只是命名不同",
              "Expanded 等价于 Flexible(flex: 1, fit: FlexFit.tight)，即 Expanded 总是占满分配的空间，而 Flexible 可以让子组件小于分配的空间",
              "Expanded 只能用在 Column 中，Flexible 只能用在 Row 中",
              "Flexible 的 flex 属性不能大于 1"
            ],
            answer: 1,
            explain:
              "Expanded 等价于 `Flexible(flex: 1, fit: FlexFit.tight)`。关键区别在于 `fit` 属性：Expanded 使用 FlexFit.tight（紧约束），强制子组件占满分配的空间；Flexible 默认使用 FlexFit.loose（松约束），子组件可以小于分配的空间（不会强制拉伸）。两者的 flex 属性都可以设置任意正整数来控制比例。"
          },
          {
            id: "p2-lw-t1",
            type: "task",
            question: "复刻一个真实应用的复杂布局",
            desc: "选择以下任一界面进行复刻：(A) 微信聊天列表页 — 包含顶部 AppBar（搜索框）、聊天列表（头像 + 名称 + 最后消息 + 时间 + 未读数 badge）、底部 TabBar；(B) 淘宝商品详情页 — 包含顶部图片轮播、价格/标题/标签区域、规格选择、评价列表、底部操作栏（加入购物车 + 立即购买）。要求使用多种布局组件组合完成。",
            criteria: [
              "使用至少 5 种不同的布局组件（如 Row, Column, Stack, Expanded, ListView, GridView 等）",
              "布局结构清晰，无溢出或截断问题",
              "列表支持滚动，长列表使用 ListView.builder",
              "视觉效果接近目标应用（可使用占位图和假数据）"
            ]
          }
        ]
      },
      {
        id: "sliver",
        title: "Sliver 和复杂滚动",
        items: [
          {
            id: "p2-sliver-q1",
            type: "quiz",
            question: "相比普通的 ListView/GridView，使用 Sliver 体系的主要优势是什么？",
            options: [
              "Sliver 的代码更简短、更容易编写",
              "Sliver 可以在同一个滚动视图中混合使用不同的滚动布局（如列表 + 网格 + 自定义头部），且共享同一个滚动坐标",
              "Sliver 性能一定比普通 ListView 更好",
              "Sliver 只支持垂直滚动，不支持水平滚动"
            ],
            answer: 1,
            explain:
              "Sliver 体系的核心优势是允许在同一个 CustomScrollView 中组合不同类型的滚动内容（SliverList、SliverGrid、SliverAppBar、SliverToBoxAdapter 等），它们共享同一个滚动偏移量和视口。这使得复杂场景（如可折叠头部 + 列表 + 网格混合布局）变得可行。Sliver 并非性能一定更优，普通 ListView 内部也是 Sliver 实现，优势在于灵活组合。"
          },
          {
            id: "p2-sliver-t1",
            type: "task",
            question: "实现一个带粘性标签头的滚动页面",
            desc: "实现一个类似新闻客户端的页面：顶部是一个可折叠的 SliverAppBar（展开时显示大图和标题，滚动时折叠为普通 AppBar）；下方是多个 Tab 标签页，每个 Tab 页内是一个 SliverList 显示新闻列表。要求 SliverAppBar 和 TabBarView 协调滚动，TabBar 始终粘性固定在 AppBar 下方。",
            criteria: [
              "SliverAppBar 正确实现展开/折叠效果（expandedHeight, flexibleSpace）",
              "TabBar 粘性固定在折叠区域下方（pinned: true）",
              "每个 Tab 页的 SliverList 独立滚动，互不影响",
              "滚动流畅，无卡顿或布局异常"
            ]
          },
          {
            id: "p2-sliver-o1",
            type: "open",
            question: "请解释 Sliver 协议的核心机制：SliverConstraints 包含哪些信息？SliverGeometry 返回哪些信息？它们如何配合实现懒加载滚动？",
            ref: "Sliver 协议的核心是 SliverConstraints → SliverGeometry 的交互：\n\n**SliverConstraints**（由 Viewport 传递给每个 Sliver）：\n- scrollOffset：当前 Sliver 的滚动偏移量\n- remainingPaintExtent：视口中剩余的可绘制空间\n- overlap：与前一个 Sliver 的重叠量（如 SliverAppBar 折叠时）\n- cacheExtent：缓存区域范围\n- viewportMainAxisExtent：视口主轴方向的大小\n- axisDirection / crossAxisExtent 等\n\n**SliverGeometry**（Sliver 返回给 Viewport）：\n- scrollExtent：该 Sliver 的总可滚动范围\n- paintExtent：当前实际绘制范围\n- maxPaintExtent：最大绘制范围\n- hasVisualOverflow：是否有超出视口的内容\n- visible（是否可见）等\n\n**懒加载机制**：SliverMultiBoxAdaptorElement 只创建视口可见范围 + cacheExtent 内的子组件。当滚动时，超出范围的 Element 被回收（deactivate），进入 cacheExtent 的新项目被创建。这就是为什么 SliverList + builder 可以高效处理大量数据。"
          }
        ]
      },
      {
        id: "routing",
        title: "路由与导航",
        items: [
          {
            id: "p2-route-q1",
            type: "quiz",
            question: "相比 Flutter 原生的 Navigator 1.0（push/pop），使用 go_router 等声明式路由库的主要优势是什么？",
            options: [
              "go_router 的性能比原生 Navigator 更好",
              "go_router 提供声明式路由配置、深链接支持、路由守卫、嵌套路由等能力，更适合复杂应用",
              "go_router 是唯一支持页面转场动画的方案",
              "go_router 不需要定义任何路由表，完全自动发现页面"
            ],
            answer: 1,
            explain:
              "go_router 基于 Navigator 2.0（Router API），提供声明式路由配置（路由表集中管理）、深链接（URL 到页面的映射）、路由守卫（redirect 拦截）、嵌套路由（ShellRoute）、路径参数等能力。它让路由管理更加可预测和可测试，特别适合需要 Web 支持或深链接的生产应用。原生 Navigator 1.0 虽然简单直观，但在复杂导航场景下难以维护。"
          },
          {
            id: "p2-route-t1",
            type: "task",
            question: "实现一个多 Tab 嵌套路由应用",
            desc: "使用 go_router 实现一个带底部 Tab 导航的应用，包含 3 个 Tab：首页（/home）、发现（/discover）、我的（/profile）。每个 Tab 内可以 push 到子页面（如首页 → 文章详情 /home/article/:id）。要求：(1) 切换 Tab 时保持各 Tab 的导航栈；(2) 深链接 /home/article/42 可以直接打开文章详情页；(3) 实现路由守卫，未登录时访问 /profile 跳转到登录页。",
            criteria: [
              "使用 ShellRoute 实现底部 Tab 导航",
              "Tab 切换时各 Tab 的导航栈独立保持",
              "深链接可以正确导航到嵌套页面",
              "路由守卫（redirect）正确拦截未认证的访问",
              "页面转场动画自然流畅"
            ]
          }
        ]
      },
      {
        id: "form-gesture",
        title: "表单、手势与响应式",
        items: [
          {
            id: "p2-fg-q1",
            type: "quiz",
            question: "`GestureDetector` 和 `InkWell` 的核心区别是什么？",
            options: [
              "两者功能完全相同，只是命名不同",
              "GestureDetector 不依赖 Material 库，只提供手势检测；InkWell 依赖 Material，额外提供水波纹（splash）视觉反馈",
              "GestureDetector 只能检测点击，InkWell 可以检测所有手势类型",
              "InkWell 比 GestureDetector 性能更好"
            ],
            answer: 1,
            explain:
              "GestureDetector 是通用手势检测器，不依赖任何视觉库，可以检测 tap、double tap、long press、pan、scale 等各种手势，但不提供任何视觉反馈。InkWell 基于 GestureDetector（内部使用 InkResponse），依赖 Material 库，在检测到触摸时会显示水波纹效果（splash + highlight），适合 Material Design 风格的交互反馈。非 Material 场景可使用 GestureDetector 配合自定义反馈。"
          },
          {
            id: "p2-fg-t1",
            type: "task",
            question: "实现一个完整的注册表单",
            desc: "实现一个用户注册表单，包含以下字段：用户名（3-20 字符，仅字母数字下划线）、邮箱（格式验证）、密码（8+ 字符，含大小写和数字）、确认密码（与密码一致）、手机号（可选，格式验证）。要求：(1) 每个字段实时验证并显示错误信息；(2) 密码字段有显示/隐藏切换；(3) 所有字段验证通过后提交按钮才可用；(4) 提交时显示 loading 状态并模拟网络请求。",
            criteria: [
              "使用 Form + GlobalKey<FormState> 管理表单状态",
              "每个 TextFormField 有正确的 validator 逻辑",
              "密码显示/隐藏切换功能正常",
              "提交按钮的 enabled 状态与表单验证结果联动",
              "提交过程有 loading 状态和成功/失败反馈"
            ]
          }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────
  // Module 3: 深入理解 Flutter 框架
  // ─────────────────────────────────────────────
  {
    id: "p3",
    title: "深入理解 Flutter 框架",
    level: 3,
    color: "#f472b6",
    builtin: true,
    topics: [
      {
        id: "three-trees",
        title: "三棵树核心理解",
        items: [
          {
            id: "p3-tree-q1",
            type: "quiz",
            question: "关于 Flutter 的三棵树（Widget Tree、Element Tree、RenderObject Tree），以下说法**不正确**的是？",
            options: [
              "每个 Widget 在挂载时都会创建对应的 Element",
              "不是所有 Widget 都有对应的 RenderObject，例如 Row、Column 等布局 Widget 通过 MultiChildRenderObjectElement 拥有 RenderObject，但 StatelessWidget 和 StatefulWidget 本身不直接创建 RenderObject",
              "Element 负责协调 Widget 和 RenderObject，管理生命周期",
              "RenderObject Tree 只包含需要参与布局渲染的节点，因此节点数通常少于 Element Tree"
            ],
            answer: 0,
            explain:
              "选项 A 的说法是正确的，但题目要求找不正确的。实际上每个 Widget 在挂载时确实会创建对应的 Element（StatelessElement 或 StatefulElement 等）。本题的陷阱在于，所有 Widget 都有 Element，但不是所有 Widget/Element 都有 RenderObject。例如一个 StatelessWidget 只是作为「中间节点」，它本身没有 RenderObject，它的 RenderObject 来自于其子树中的 RenderObjectWidget。所以三棵树的节点数关系是：Widget Tree ≈ Element Tree > RenderObject Tree。"
          },
          {
            id: "p3-tree-q2",
            type: "quiz",
            question: "调用 `setState()` 后，Flutter 框架内部的执行流程是什么？",
            options: [
              "setState → 直接重新绘制屏幕像素",
              "setState → 标记 Element 为 dirty → 下一帧调度 rebuild → 重建 Widget 子树 → diff Element 树 → 更新 RenderObject → 布局 → 绘制",
              "setState → 销毁当前 Element → 重新创建所有 Element 和 RenderObject",
              "setState → 立即同步执行 build → 立即同步绘制"
            ],
            answer: 1,
            explain:
              "setState 的完整流程：(1) setState 调用，执行回调更新状态；(2) 当前 Element 被标记为 dirty（加入 _dirtyElements 列表）；(3) 下一帧 VSync 信号到来时，WidgetsBinding.drawFrame 被调度；(4) buildScope 遍历所有 dirty 的 Element 调用 rebuild → build；(5) 新的 Widget 与旧 Element 进行 diff（canUpdate 判断）；(6) 可复用的 Element 更新，不可复用的创建新 Element；(7) 对应 RenderObject 的属性更新；(8) 标记需要重新布局的节点 pipelineOwner.requestVisualUpdate；(9) flushLayout → flushPaint → compositeFrame 完成布局和绘制。"
          },
          {
            id: "p3-tree-c1",
            type: "code",
            question: "以下代码在两个列表项交换位置后，动画状态出现了错乱（项 A 的动画状态跑到了项 B 上）。请找出原因：",
            code: `class ItemList extends StatefulWidget {
  final List<String> items;
  const ItemList({super.key, required this.items});
  @override
  State<ItemList> createState() => _ItemListState();
}

class _ItemListState extends State<ItemList> {
  @override
  Widget build(BuildContext context) {
    return Column(
      children: widget.items.map((item) {
        return _AnimatedCard(label: item);
      }).toList(),
    );
  }
}

class _AnimatedCard extends StatefulWidget {
  final String label;
  const _AnimatedCard({required this.label});
  @override
  State<_AnimatedCard> createState() => _AnimatedCardState();
}

class _AnimatedCardState extends State<_AnimatedCard>
    with SingleTickerProviderStateMixin {
  late AnimationController _ctrl;
  @override
  void initState() {
    super.initState();
    _ctrl = AnimationController(vsync: this, duration: Duration(milliseconds: 300));
    _ctrl.forward();
  }
  @override
  void dispose() { _ctrl.dispose(); super.dispose(); }
  @override
  Widget build(BuildContext context) {
    return ScaleTransition(scale: _ctrl, child: Card(child: Text(widget.label)));
  }
}`,
            options: [
              "AnimationController 的 duration 太短导致动画错乱",
              "Column 不支持动画，应该使用 AnimatedList",
              "列表项没有使用 Key，Flutter 的 Element diff 使用 widget.runtimeType 和 key 来匹配，无 Key 时按位置匹配导致 Element 被复用到不同的数据项上",
              "ScaleTransition 不能放在 Column 中"
            ],
            answer: 2,
            explain:
              "Flutter 在 diff 时，如果子 Widget 没有 Key，会使用 `canUpdate(oldWidget, newWidget)` 来判断 Element 是否可复用。canUpdate 默认比较 runtimeType 和 key。当两个相同类型且都没有 Key 的 Widget 交换位置时，Flutter 按位置匹配：原来位置 0 的 Element 被更新为新的 Widget（数据变了但 State 不变，包括 AnimationController 的状态）。因此动画状态「跟着 Element 留在原位」而不是「跟着数据移动」。修复方法：给每个 _AnimatedCard 添加 `ValueKey(item)`。"
          },
          {
            id: "p3-tree-t1",
            type: "task",
            question: "实现三棵树生命周期日志观察器",
            desc: "创建一组自定义 Widget（如 LoggingStatelessWidget、LoggingStatefulWidget、LoggingSingleChildRenderObjectWidget），在关键生命周期方法中添加日志输出。关键节点包括：Widget.createElement、Element.mount、Element.update、Element.unmount、State.initState、State.build、State.dispose、RenderObject.attach、RenderObject.detach。用这些 Widget 构建一个测试页面，通过增删改操作触发各种生命周期事件，观察日志并理解三棵树的交互。",
            criteria: [
              "正确实现 3 种自定义 Widget 类型",
              "在正确的生命周期方法中添加日志（使用 debugPrint）",
              "测试页面能通过按钮触发添加、删除、更新、移动子组件",
              "日志输出清晰展示了三棵树的创建/更新/销毁顺序"
            ]
          },
          {
            id: "p3-tree-o1",
            type: "open",
            question: "请完整描述从 `setState()` 调用到最终像素上屏的全部流程，包括 SchedulerBinding、WidgetsBinding、RendererBinding 各自的职责，以及 VSync 信号在其中的角色。",
            ref: "完整流程：\n\n1. **setState() 调用**：执行回调更新 State 内部状态，调用 `markNeedsBuild()` 将当前 Element 标记为 dirty，加入 `BuildOwner._dirtyElements` 集合。\n\n2. **VSync 信号**：屏幕每帧发出 VSync 信号（通常 60Hz / 120Hz），通过 `SchedulerBinding.scheduleFrameCallback` 触发帧回调。\n\n3. **SchedulerBinding.handleBeginFrame**：处理 transient frame callbacks（动画回调等）。\n\n4. **SchedulerBinding.handleDrawFrame**：处理 persistent frame callbacks，其中最重要的是 `WidgetsBinding.drawFrame`。\n\n5. **WidgetsBinding.drawFrame**：\n   - `buildScope`：BuildOwner 对所有 dirty Elements 排序后逐个调用 `rebuild()` → `performRebuild()` → `build()`，生成新 Widget 子树。\n   - Widget diff：新 Widget 与旧 Element 通过 `canUpdate` 比较，可复用则 `update()`，否则创建新 Element。\n\n6. **RendererBinding.drawFrame**（在 WidgetsBinding.drawFrame 内调用 `super.drawFrame`）：\n   - `PipelineOwner.flushLayout()`：对所有 dirty 的 RenderObject 执行布局（performLayout），自底向上计算大小和位置。\n   - `PipelineOwner.flushCompositingBits()`：更新合成层信息。\n   - `PipelineOwner.flushPaint()`：对所有 dirty 的 RenderObject 执行绘制（paint），通过 PaintingContext 和 Layer 树记录绘制指令。\n   - `RenderView.compositeFrame()`：将 Layer 树提交给 GPU（通过 Flutter Engine 的 Scene Builder）。\n\n7. **GPU 渲染**：Engine 将 Layer 树转为 GPU 指令，最终像素上屏。\n\n关键理解：setState 不是立即执行的，而是标记 dirty 后等下一帧统一处理；布局是自底向上的约束传递，绘制是自顶向下的指令生成。"
          }
        ]
      },
      {
        id: "key",
        title: "Key 与 Element 复用",
        items: [
          {
            id: "p3-key-q1",
            type: "quiz",
            question: "`GlobalKey` 和 `ValueKey` 的核心区别是什么？",
            options: [
              "两者只是命名不同，功能完全相同",
              "ValueKey 是 LocalKey 的子类，只影响同一父节点下的 Element diff；GlobalKey 在整个 Widget 树中唯一，可以跨父节点保持 Element/State 的连续性",
              "GlobalKey 性能更好，应该尽可能使用",
              "ValueKey 只能用于 ListView，GlobalKey 可以用于所有 Widget"
            ],
            answer: 1,
            explain:
              "LocalKey（包括 ValueKey、ObjectKey、UniqueKey）只在同一个父 Widget 的子列表中参与 diff 逻辑，帮助 Flutter 识别哪些子 Widget 是「同一个」应该复用 Element。GlobalKey 在整个 Widget 树中必须唯一，它允许 Widget 在树中移动位置时保持 Element 和 State 的连续性（不丢失状态）。GlobalKey 还可以通过 `.currentState` 或 `.currentContext` 直接访问对应 State 或 BuildContext，但开销更大，不应滥用。"
          },
          {
            id: "p3-key-t1",
            type: "task",
            question: "Key 的作用实验",
            desc: "创建一个实验页面来验证 Key 的作用：(1) 创建两个相同类型的 StatefulWidget 列表项（带 TextField），不使用 Key 时交换位置，观察 TextField 内容是否跟随移动；(2) 添加 ValueKey 后重复实验，观察差异；(3) 使用 GlobalKey 将一个 Widget 从一个父节点移动到另一个父节点，验证 State 是否保持。页面需要有清晰的对比展示和说明文字。",
            criteria: [
              "无 Key 时，交换位置后 TextField 内容不跟随（State 留在原位）",
              "有 ValueKey 时，交换位置后 TextField 内容正确跟随",
              "GlobalKey 实验中，Widget 移动到新父节点后 State 保持",
              "页面有清晰的说明文字解释每种情况的原理"
            ]
          }
        ]
      },
      {
        id: "inherited",
        title: "InheritedWidget",
        items: [
          {
            id: "p3-inh-q1",
            type: "quiz",
            question: "`InheritedWidget` 中的 `updateShouldNotify` 方法的作用是什么？",
            options: [
              "决定 InheritedWidget 是否需要 rebuild",
              "当 InheritedWidget 被重建时，决定是否需要通知依赖它的子 Widget 进行重建",
              "控制 InheritedWidget 的更新频率",
              "决定 InheritedWidget 是否可以被缓存"
            ],
            answer: 1,
            explain:
              "`updateShouldNotify` 在新旧 InheritedWidget 进行 diff 时被调用。当 Element 检测到 InheritedWidget 更新了（新的 Widget 实例），会调用 `updateShouldNotify(oldWidget)` 来判断是否需要通知所有通过 `dependOnInheritedWidgetOfExactType` 注册了依赖的子 Element 进行重建。如果返回 true，所有依赖者会被标记为 dirty 并在下一帧重建；返回 false 则不通知。通常比较新旧数据是否相等来决定。"
          },
          {
            id: "p3-inh-t1",
            type: "task",
            question: "手写一个迷你 Provider",
            desc: "不使用任何第三方库，从零手写一个迷你版 Provider 状态管理框架，基于 InheritedWidget 实现。要求支持：(1) 创建 Store（持有状态和更新方法）；(2) 通过 MiniProvider 注入到 Widget 树中；(3) 子 Widget 通过 `MiniProvider.of<T>(context)` 读取状态；(4) 状态变更时只通知依赖了该状态的 Widget（精准重建）；(5) 支持 listen: false 模式（只获取引用，不监听更新）。",
            criteria: [
              "正确使用 InheritedWidget + updateShouldNotify 实现依赖通知",
              "of<T>(context) 方法能正确查找到对应类型的 Store",
              "listen: false 时不建立依赖关系（不触发重建）",
              "状态更新时只有依赖的 Widget 重建（用日志验证）",
              "代码结构清晰，有注释说明核心原理"
            ]
          },
          {
            id: "p3-inh-o1",
            type: "open",
            question: "请分析 Provider、Riverpod 和 Bloc 这三个状态管理方案与 InheritedWidget 的关系。它们各自的底层实现是否都基于 InheritedWidget？它们分别解决了 InheritedWidget 的哪些不足？",
            ref: "**InheritedWidget** 是 Flutter 提供的底层原语，所有上层状态管理方案最终都依赖它来实现「跨组件数据传递」和「选择性通知」。\n\n**Provider**：\n- 底层直接基于 InheritedWidget（InheritedProvider 继承自 InheritedWidget）\n- 解决了：手动管理 InheritedWidget 的繁琐（封装了 Provider 注入、Selector 精准订阅、ChangeNotifierProxyProvider 组合等）\n- 不足：依赖 BuildContext 查找（运行时类型安全弱）、ProviderNotFoundException 是运行时错误、嵌套过多时代码冗长\n\n**Riverpod**：\n- 底层也基于 InheritedWidget（ProviderScope 内部使用 InheritedWidget）\n- 解决了：编译时安全（Provider 是全局声明的，不依赖 BuildContext）、支持 Provider 之间的依赖组合、自动缓存和生命周期管理、测试友好（override）\n- 与 Provider 的核心区别：Provider 定义在 Widget 树外部，通过 ref 而非 context 读取\n\n**Bloc (flutter_bloc)**：\n- 底层使用 InheritedWidget（BlocProvider 内部使用 InheritedProvider）\n- 解决了：业务逻辑和 UI 分离（Event → Bloc → State 模式）、强制使用不可变状态、支持事件驱动的复杂状态流转\n- 特点：更重的架构但更适合复杂业务逻辑，与 InheritedWidget 的关系较「远」（中间有 Bloc 层）\n\n总结：三者都基于 InheritedWidget 做数据传递，但在「状态定义方式」「更新通知机制」「与 Widget 树的耦合度」上有本质区别。"
          }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────
  // Module 4: 数据与异步
  // ─────────────────────────────────────────────
  {
    id: "p4",
    title: "数据与异步",
    level: 4,
    color: "#fbbf24",
    builtin: true,
    topics: [
      {
        id: "async",
        title: "异步编程",
        items: [
          {
            id: "p4-async-q1",
            type: "quiz",
            question: "`Future` 和 `Stream` 的核心区别是什么？",
            options: [
              "Future 比 Stream 更快",
              "Future 表示单个异步结果（成功或失败），Stream 表示一系列异步事件（可以有多个值）",
              "Stream 只能用于网络请求，Future 用于所有异步操作",
              "Future 和 Stream 可以无条件互相替代"
            ],
            answer: 1,
            explain:
              "Future 代表一个将来会完成的单一异步操作，最终产出一个值（或一个错误），类似 JavaScript 的 Promise。Stream 代表一个异步事件流，可以持续产出多个值（或错误），类似 RxJS 的 Observable。例如：一次 HTTP 请求返回 Future<Response>；WebSocket 连接持续接收消息用 Stream<Message>。Stream 可以转换为 Future（如 stream.first、stream.toList()），Future 也可以包装为单元素 Stream。"
          },
          {
            id: "p4-async-c1",
            type: "code",
            question: "以下代码在页面反复进出后出现异常 \"setState() called after dispose()\"，请找出原因：",
            code: `class _ChatPageState extends State<ChatPage> {
  late StreamSubscription _sub;

  @override
  void initState() {
    super.initState();
    _sub = chatService.messages.listen((msg) {
      setState(() {
        // 更新消息列表
      });
    });
  }

  @override
  Widget build(BuildContext context) {
    return ListView(
      children: const [Text("聊天内容")],
    );
  }
}`,
            options: [
              "ListView 的 children 不能为 const",
              "缺少 dispose 方法，StreamSubscription 没有在页面销毁时取消，导致流事件回调中继续调用已 dispose 的 State 的 setState",
              "listen 方法不能在 initState 中调用",
              "chatService.messages 返回的不是 Stream 类型"
            ],
            answer: 1,
            explain:
              "代码在 initState 中订阅了 Stream，但没有在 dispose 中取消订阅。当页面被 pop 后，State 已 dispose，但 StreamSubscription 仍然活跃。当新的消息到来时，listen 的回调仍然执行 setState()，此时 State 已经不在 Widget 树中，Flutter 会抛出 \"setState() called after dispose()\" 异常。修复方法：添加 `@override void dispose() { _sub.cancel(); super.dispose(); }`。"
          },
          {
            id: "p4-async-t1",
            type: "task",
            question: "实现一个带防抖的搜索功能",
            desc: "实现一个搜索页面，包含搜索输入框和搜索结果列表。要求：(1) 用户输入时进行 300ms 防抖（debounce），即停止输入 300ms 后才发起搜索请求；(2) 如果新的搜索请求发出，旧的请求结果应该被丢弃（或使用 switchMap 模式）；(3) 搜索过程中显示 loading 状态；(4) 搜索结果为空时显示空状态页；(5) 搜索出错时显示错误提示和重试按钮。",
            criteria: [
              "正确使用 StreamTransformer 或 Timer 实现 debounce",
              "旧请求结果不会覆盖新请求结果（避免竞态）",
              "loading、空状态、错误状态均有正确的 UI 展示",
              "代码结构清晰，异步逻辑与 UI 逻辑分离"
            ]
          },
          {
            id: "p4-async-o1",
            type: "open",
            question: "请解释 Dart 中 Microtask Queue（微任务队列）和 Event Queue（事件队列）的区别、优先级关系和执行时机。async 函数中的代码一定在 Microtask 中执行吗？",
            ref: "Dart 的事件循环有两个队列：\n\n**Microtask Queue（微任务队列）**：\n- 优先级最高，每次事件循环迭代时会先清空所有微任务\n- 来源：scheduleMicrotask()、Future.microtask()、Completer.complete()\n- 特点：微任务会在当前事件处理完成后、下一个事件开始前全部执行完毕\n\n**Event Queue（事件队列）**：\n- 优先级低于微任务队列\n- 来源：Timer、I/O 事件、手势事件、Future.delayed、postEvent 等\n- 特点：每次循环处理一个事件，处理完后检查微任务队列\n\n**执行顺序**：同步代码 → 清空微任务 → 处理一个事件 → 清空微任务 → 处理下一个事件 → ...\n\n**关于 async 函数**：async 函数中 await 之前的同步代码在当前同步上下文中执行；await 之后的代码通常作为一个事件（而非微任务）被调度（Dart 2.x 之后的实现中，Future 的 then/microtask 使用微任务，但 async/await 的 continuation 实际上也被安排为微任务）。需要特别注意：Future() 构造函数中的代码是同步执行的（立即执行），只有 .then() 的回调才是异步的。"
          }
        ]
      },
      {
        id: "data-layer",
        title: "网络请求、存储与错误处理",
        items: [
          {
            id: "p4-data-q1",
            type: "quiz",
            question: "在一个 Flutter 应用的分层架构中，以下哪一层负责将网络数据（JSON）转换为领域模型（Domain Model）？",
            options: [
              "UI 层（Widget / Page）",
              "数据层（Repository / DataSource），其中 DataSource 负责网络请求和 JSON 解析，Repository 负责协调和转换",
              "状态管理层（Bloc / Provider）",
              "渲染层（RenderObject）"
            ],
            answer: 1,
            explain:
              "标准的 Flutter 分层架构通常包含：UI 层（Widget/Page，负责展示和用户交互）、状态管理层（Bloc/Notifier，管理页面状态和业务逻辑）、数据层（Repository + DataSource，负责数据获取和缓存）。其中 DataSource 负责与外部数据源交互（网络请求、数据库读写）并返回 DTO（Data Transfer Object），Repository 负责将 DTO 转换为 Domain Model 并提供统一的接口给上层。这种分层使得每一层职责清晰、可独立测试。"
          },
          {
            id: "p4-data-t1",
            type: "task",
            question: "实现一个完整的数据层",
            desc: "为一个「待办事项」应用实现完整的数据层，包括：(1) Domain Model（Todo 类，含 id, title, description, isDone, createdAt）；(2) DTO（TodoDto，含 fromJson/toJson）；(3) RemoteDataSource（模拟网络请求，支持 CRUD）；(4) LocalDataSource（使用 SharedPreferences 或 SQLite 本地缓存）；(5) Repository（组合 Remote 和 Local，实现「先返回本地缓存，再拉取远程更新」的策略）；(6) 使用 sealed class 定义结果类型 Result<T>（Success/Failure）。",
            criteria: [
              "分层清晰：Model / DTO / DataSource / Repository 各层职责明确",
              "DTO 的 fromJson/toJson 正确处理字段映射",
              "Repository 实现缓存策略（本地优先 + 远程更新）",
              "使用 sealed class Result 统一处理成功和失败",
              "各层有合理的错误处理（异常不吞没、有明确的错误类型）"
            ]
          },
          {
            id: "p4-data-o1",
            type: "open",
            question: "请说明如何使用 Dart 3 的 sealed class 对异步操作的状态进行建模（如 Idle / Loading / Success / Failure），以及这种模式相比传统的「多个布尔标志」或「枚举 + 属性」方案有什么优势？",
            ref: "使用 sealed class 建模异步状态：\n\n```dart\nsealed class AsyncState<T> {}\nclass Idle<T> extends AsyncState<T> {}\nclass Loading<T> extends AsyncState<T> {}\nclass Success<T> extends AsyncState<T> {\n  final T data;\n  Success(this.data);\n}\nclass Failure<T> extends AsyncState<T> {\n  final Object error;\n  Failure(this.error);\n}\n```\n\n**相比多布尔标志方案（isLoading, isError, data）的优势**：\n1. **状态互斥性**：sealed class 天然保证同一时刻只能处于一种状态，不会出现 isLoading=true 且 isError=true 的非法组合\n2. **穷举性检查**：switch expression 要求穷举所有子类，遗漏处理某个状态会报编译错误\n3. **数据关联性**：data 只存在于 Success 中，error 只存在于 Failure 中，避免了「data 为 null 但 isLoading 为 false」的歧义\n4. **模式匹配**：switch 表达式可以直接提取关联数据，代码更简洁\n5. **可组合性**：可以基于 sealed class 构建通用的 AsyncValue、AsyncNotifier 等工具\n\n这种模式是函数式编程中 Algebraic Data Types（ADT）在 Dart 中的体现。"
          }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────
  // Module 5: 状态管理
  // ─────────────────────────────────────────────
  {
    id: "p5",
    title: "状态管理",
    level: 5,
    color: "#a78bfa",
    builtin: true,
    topics: [
      {
        id: "state-mgmt",
        title: "状态管理框架对比与实践",
        items: [
          {
            id: "p5-sm-q1",
            type: "quiz",
            question: "以下关于 Flutter 状态管理的说法，正确的是？",
            options: [
              "所有状态都应该使用全局状态管理框架来管理，不应该使用 StatefulWidget",
              "setState 适合管理仅影响当前 Widget 的临时 UI 状态（如动画、折叠展开），全局业务状态才需要使用状态管理框架",
              "Riverpod 已经完全取代了 Provider，Provider 不应该再被使用",
              "Bloc 是唯一适合大型项目的状态管理方案"
            ],
            answer: 1,
            explain:
              "状态管理的核心原则是「使用适合当前场景的最简单方案」。setState 是 Flutter 最基础的状态管理方式，适合管理局部的、临时的 UI 状态（如 Tab 选中、动画状态、表单输入）。当状态需要跨 Widget/跨页面共享、有复杂的业务逻辑、或需要持久化时，才引入状态管理框架。没有「最好的」方案，只有「最适合的」方案。Provider、Riverpod、Bloc 各有适用场景，选择取决于项目复杂度、团队经验和具体需求。"
          },
          {
            id: "p5-sm-q2",
            type: "quiz",
            question: "在 Provider 中，`context.select<T, R>()` 方法的作用是什么？",
            options: [
              "从 Widget 树中选择指定类型的 Widget 进行更新",
              "只监听 T 类型对象中 R 类型的特定属性，仅当该属性变化时才重建当前 Widget，实现精准订阅",
              "选择一个随机的 Provider 进行读取",
              "从多个 Provider 中选择一个满足条件的"
            ],
            answer: 1,
            explain:
              "`context.select<T, R>(callback)` 用于精准订阅。例如 `context.select<UserModel, String>((user) => user.name)` 只监听 UserModel 的 name 属性变化，当 UserModel 的其他属性（如 age、email）变化时，当前 Widget 不会重建。这对于大型状态对象非常重要，可以避免不必要的全量重建。对应的 Consumer 组件也有 `selector` 模式可实现类似功能。在 Riverpod 中类似功能是 `ref.watch(provider.select(...))`。"
          },
          {
            id: "p5-sm-c1",
            type: "code",
            question: "以下代码在 UserModel 的任何属性变化时都会导致头像组件重建，性能不佳。请找出问题：",
            code: `class UserAvatar extends StatelessWidget {
  const UserAvatar({super.key});

  @override
  Widget build(BuildContext context) {
    final user = context.watch<UserModel>();
    return CircleAvatar(
      backgroundImage: NetworkImage(user.avatarUrl),
      radius: 30,
    );
  }
}`,
            options: [
              "CircleAvatar 不能使用 NetworkImage",
              "应该使用 context.select 只订阅 avatarUrl 属性，而不是 watch 整个 UserModel",
              "StatelessWidget 不能使用 context.watch",
              "radius 不能设置为 30"
            ],
            answer: 1,
            explain:
              "`context.watch<UserModel>()` 会订阅整个 UserModel 对象，当 UserModel 的**任何**属性（name、email、age 等）变化时，UserAvatar 都会重建。但 UserAvatar 只依赖 `avatarUrl`，应该使用 `context.select<UserModel, String>((u) => u.avatarUrl)` 进行精准订阅。这样只有当 avatarUrl 真正变化时才会重建，其他属性变化不影响头像组件。这是 Provider 性能优化的关键技巧。"
          },
          {
            id: "p5-sm-t1",
            type: "task",
            question: "双框架对比实现",
            desc: "使用两种不同的状态管理框架（如 Provider + Riverpod 或 Bloc + Riverpod）分别实现同一个功能模块——「购物车」。购物车需要支持：添加商品、删除商品、修改数量、计算总价、选中/取消选中、全选/取消全选。两种实现需要功能完全一致，方便对比。最终总结两种方案在代码量、可测试性、学习曲线、性能控制等方面的差异。",
            criteria: [
              "两种框架都正确实现了购物车的全部功能",
              "每种实现都遵循了对应框架的最佳实践",
              "状态类/模型类的定义合理（不可变对象、copyWith 等）",
              "有文字总结两种方案的优缺点对比"
            ]
          },
          {
            id: "p5-sm-o1",
            type: "open",
            question: "假设你要开发一个电商 App（包含首页、分类、购物车、订单、用户中心等模块），请设计其状态管理架构。说明你会选择哪些状态管理工具来管理不同类型的状态，以及为什么。",
            ref: "电商 App 的状态可以分为几个层次，使用不同的工具管理：\n\n**1. 全局应用状态（跨页面共享）**\n- 用户认证状态（登录/未登录、Token）：使用 Riverpod/Bloc 管理。因为涉及异步操作、多个页面依赖、需要全局响应登出事件。\n- 购物车数据：使用 Riverpod/Bloc。因为多个页面（商品详情、购物车、首页角标）需要实时同步。\n\n**2. 页面级业务状态**\n- 首页的商品推荐列表、分类页的筛选条件：使用 Bloc 或 Riverpod AsyncNotifier。因为这些有复杂的加载/刷新/分页逻辑。\n- 订单列表的状态（筛选、排序、分页）：Bloc 特别适合，因为事件驱动的模型与列表操作天然匹配。\n\n**3. 局部 UI 状态**\n- Tab 选中状态、下拉刷新状态、Dialog 显示状态：使用 setState 或 StatefulBuilder。这些状态不需要跨组件共享。\n- 表单输入状态：使用 Form + TextEditingController。\n\n**4. 配置/环境状态**\n- 主题、语言、服务器地址：使用 InheritedWidget 或 Provider/Riverpod 的简单 Provider。\n\n**架构原则**：\n- 上层（UI）不应该知道下层（数据）的实现细节\n- 状态越局部越好，只在必要时提升作用域\n- 使用 Repository 模式隔离数据源\n- 使用 sealed class 对异步状态建模"
          }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────
  // Module 6: 动画与绘制
  // ─────────────────────────────────────────────
  {
    id: "p6",
    title: "动画与绘制",
    level: 6,
    color: "#fb923c",
    builtin: true,
    topics: [
      {
        id: "animation",
        title: "动画体系",
        items: [
          {
            id: "p6-anim-q1",
            type: "quiz",
            question: "Flutter 中隐式动画（Implicit Animation）和显式动画（Explicit Animation）的核心区别是什么？",
            options: [
              "隐式动画使用 GPU 加速，显式动画使用 CPU 计算",
              "隐式动画通过改变属性值自动过渡（如 AnimatedContainer），无需手动控制 AnimationController；显式动画需要手动创建 AnimationController 和 Tween，精确控制动画过程",
              "隐式动画只能用于位移，显式动画可以用于所有属性",
              "显式动画性能更好，应该优先使用"
            ],
            answer: 1,
            explain:
              "隐式动画（如 AnimatedContainer、AnimatedOpacity、AnimatedPositioned）：只需改变目标属性值，组件内部自动处理过渡动画，无需 AnimationController。使用简单但控制力有限。显式动画（如 SlideTransition + AnimationController）：需要手动创建 AnimationController（控制时长、曲线、播放/暂停/反转）和 Tween（定义值范围），配合 AnimatedWidget 或 AnimatedBuilder 使用。控制力强，可以实现复杂动画编排（串行、并行、交错），但代码量更多。选择原则：简单过渡用隐式，复杂编排用显式。"
          },
          {
            id: "p6-anim-t1",
            type: "task",
            question: "实现卡片展开/折叠动画",
            desc: "实现一个可展开/折叠的信息卡片列表。每张卡片折叠时显示标题和摘要，点击后展开显示完整内容。要求：(1) 展开/折叠有平滑的高度过渡动画；(2) 展开时卡片有轻微放大 + 阴影加深效果；(3) 同一时间只能展开一张卡片（手风琴模式）或可以多张展开；(4) 展开/折叠的图标有旋转动画（如箭头旋转 180 度）；(5) 使用 AnimationController 和 CurvedAnimation 实现，不使用 AnimatedContainer。",
            criteria: [
              "AnimationController 正确创建和管理（dispose）",
              "使用 CurvedAnimation + Interval 实现分阶段动画效果",
              "高度过渡使用 SizeTransition 或 AnimatedBuilder 实现",
              "图标旋转动画与展开/折叠同步",
              "动画曲线自然（如 easeInOut），没有卡顿或跳动"
            ]
          },
          {
            id: "p6-anim-o1",
            type: "open",
            question: "请详细解释 `AnimationController`、`Tween` 和 `CurvedAnimation` 三者的职责和关系。如果要实现一个「先缩放再平移」的分阶段动画，应该如何组合使用它们？",
            ref: "**AnimationController**：\n- 职责：动画的「时钟」，控制动画的播放、暂停、反转、停止\n- 核心属性：duration（总时长）、value（当前进度 0.0~1.0）、lowerBound/upperBound\n- 方法：forward()、reverse()、repeat()、stop()、reset()\n- 需要 vsync（TickerProvider）驱动，每帧更新 value\n\n**Tween<T>**：\n- 职责：定义动画的「值域映射」，将 0.0~1.0 的进度映射为具体类型的值\n- 例如：Tween<double>(begin: 0, end: 100) 将进度 0.5 映射为 50.0\n- Tween<Color>、Tween<Offset>、Tween<Alignment> 等\n- 通过 .animate(animation) 与 AnimationController 或 CurvedAnimation 绑定\n\n**CurvedAnimation**：\n- 职责：在 AnimationController 上叠加「缓动曲线」，将线性的 0→1 进度转换为非线性的\n- 例如：Curves.easeInOut 使动画开始和结束时慢、中间快\n- 支持 curve 和 reverseCurve（正播和反播使用不同曲线）\n- 本身也是一个 Animation<double>，可以链式组合\n\n**分阶段动画实现**：\n使用 Interval（Curve 的子类）定义各阶段在总时间线中的占比：\n```dart\n// 缩放阶段：0% ~ 50% 的时间\nfinal scaleAnim = Tween(begin: 1.0, end: 1.5).animate(\n  CurvedAnimation(parent: controller, curve: Interval(0.0, 0.5, curve: Curves.easeOut))\n);\n// 平移阶段：50% ~ 100% 的时间\nfinal translateAnim = Tween(begin: Offset.zero, end: Offset(100, 0)).animate(\n  CurvedAnimation(parent: controller, curve: Interval(0.5, 1.0, curve: Curves.easeIn))\n);\n```\n这样在一个 AnimationController 的 forward() 过程中，前 50% 时间执行缩放，后 50% 时间执行平移。"
          }
        ]
      },
      {
        id: "custom-paint",
        title: "自定义绘制与 RenderObject",
        items: [
          {
            id: "p6-paint-t1",
            type: "task",
            question: "使用 CustomPaint 实现环形进度条",
            desc: "实现一个可定制的环形进度条组件，要求：(1) 使用 CustomPainter 绘制底层灰色圆环和前景彩色进度弧；(2) 进度从 0 到 1，前景弧的长度根据进度值变化；(3) 进度变化时有动画过渡效果；(4) 圆环中心显示百分比文字；(5) 支持自定义颜色、线宽、大小等参数；(6) 可选：前景弧的末端有圆形端点（StrokeCap.round），支持渐变色。",
            criteria: [
              "CustomPainter 的 paint 方法正确使用 Canvas 和 Paint API",
              "shouldRepaint 方法正确实现（比较新旧进度值）",
              "使用 drawArc 绘制圆弧，角度计算正确",
              "动画过渡平滑（配合 AnimationController 或 AnimatedBuilder）",
              "中心文字使用 TextPainter 绘制，正确居中对齐"
            ]
          },
          {
            id: "p6-paint-o1",
            type: "open",
            question: "在 Flutter 中实现自定义视觉效果时，CustomPaint（CustomPainter）、自定义 RenderObject 和 Widget 组合这三种方式分别适合什么场景？它们的性能特点和适用边界是什么？",
            ref: "**1. Widget 组合（Container、Stack、ClipPath 等）**\n- 适合：可以通过现有 Widget 组合实现的视觉效果\n- 优势：代码可读性好、易于维护、框架优化充分\n- 性能：每个 Widget 对应一个 Element，复杂组合可能创建大量节点\n- 边界：当需要几十个 Widget 组合才能实现的效果时，考虑换方案\n\n**2. CustomPaint（CustomPainter）**\n- 适合：需要直接操作 Canvas 绘制自定义图形（图表、装饰、进度条、签名板等）\n- 优势：轻量级（只有一个 RenderCustomPaint 节点），直接操作 Canvas API\n- 性能：绑制本身在 CPU 执行（光栅化由 GPU 完成），shouldRepaint 控制重绘频率\n- 限制：不能处理手势（需配合 GestureDetector）、不能参与布局协商\n- 注意：避免在 paint 中创建大量对象（Paint、Path 等应缓存复用）\n\n**3. 自定义 RenderObject**\n- 适合：需要自定义布局行为（非标准约束模型）或需要布局和绘制深度耦合的场景\n- 优势：完全控制布局算法（performLayout）和绘制（paint），可以参与父子的约束协商\n- 性能：最优，没有多余的中间层\n- 成本：开发复杂度高，需要理解 Sliver 协议、约束模型、hit testing 等\n- 典型场景：自定义 Layout Widget（如 Flow）、需要自定义 hit test 的组件\n\n**选择建议**：优先 Widget 组合 → 不满足时用 CustomPaint → 需要自定义布局时再用 RenderObject。"
          }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────
  // Module 7: 性能优化
  // ─────────────────────────────────────────────
  {
    id: "p7",
    title: "性能优化",
    level: 7,
    color: "#ef4444",
    builtin: true,
    topics: [
      {
        id: "perf",
        title: "性能分析与优化",
        items: [
          {
            id: "p7-perf-q1",
            type: "quiz",
            question: "Flutter 性能优化的核心原则是什么？",
            options: [
              "尽可能多地使用 const Widget 就能解决所有性能问题",
              "减少不必要的 Widget rebuild，避免每帧做昂贵的计算和对象创建，将工作量分散到帧间",
              "使用 setState 比使用状态管理框架性能更好",
              "Flutter 引擎会自动优化所有性能问题，开发者不需要关注"
            ],
            answer: 1,
            explain:
              "Flutter 性能优化的核心是减少不必要的 rebuild（避免 build 方法频繁执行导致的 Widget 重建和 diff 开销），避免在 build 方法或每帧回调中做昂贵的同步计算（阻塞 UI 线程导致掉帧），以及避免在高频路径（如滚动、动画）中创建大量临时对象（增加 GC 压力）。关键工具：const Widget（编译时常量，不触发 rebuild）、RepaintBoundary（隔离重绘）、shouldRebuild（精准订阅）、Isolate（将耗时计算移到独立线程）。"
          },
          {
            id: "p7-perf-q2",
            type: "quiz",
            question: "什么时候应该使用 `Isolate` 或 `compute()` 函数？",
            options: [
              "所有的异步操作都应该使用 Isolate",
              "当有 CPU 密集型的同步计算（如大数据排序、图片处理、JSON 解析大量数据）可能导致 UI 线程阻塞超过 16ms 时",
              "Isolate 只能用于网络请求",
              "compute() 是 setState 的替代品"
            ],
            answer: 1,
            explain:
              "Isolate 是 Dart 的独立执行线程，拥有独立的内存空间（不共享堆）。compute() 是 Flutter 提供的便捷 API，内部创建一个 Isolate 来执行指定的 top-level 函数或 static 方法。应该在 CPU 密集型计算可能阻塞 UI 线程时使用（判断标准：同步计算耗时超过 16ms / 8ms）。典型场景：大 JSON 解析、复杂数据转换、图片处理、加密计算。注意：Isolate 之间有通信开销（消息序列化），不适合频繁小数据的场景。Dart 2.15+ 的 Isolate.run() 是更现代的 API。"
          },
          {
            id: "p7-perf-c1",
            type: "code",
            question: "以下代码在滚动列表时明显卡顿掉帧，请找出所有性能问题：",
            code: `class ProductList extends StatelessWidget {
  final List<Product> products;
  const ProductList({super.key, required this.products});

  @override
  Widget build(BuildContext context) {
    // 每次 build 都对整个列表排序
    final sorted = List.from(products)..sort((a, b) => b.price.compareTo(a.price));

    return ListView.builder(
      itemCount: sorted.length,
      itemBuilder: (context, index) {
        final p = sorted[index];
        return Card(
          elevation: 8,
          shadowColor: Colors.black.withOpacity(0.8),
          child: Row(
            children: [
              Image.network(p.imageUrl, width: 100, height: 100),
              Expanded(
                child: Column(
                  children: [
                    Text(p.name, style: const TextStyle(fontSize: 16)),
                    Text("¥\${p.price}"),
                    // 每行都创建一个新的 DateFormat 实例
                    Text(DateFormat("yyyy-MM-dd").format(p.createdAt)),
                  ],
                ),
              ),
            ],
          ),
        );
      },
    );
  }
}`,
            options: [
              "只存在一个问题：Image.network 应该使用 cached_network_image",
              "存在多个问题：每次 build 都重新排序（应在外部处理）、每行都创建 DateFormat 实例（应复用）、高 elevation 阴影 + 大量 opacity 计算影响合成层性能、列表项未使用 const",
              "只存在一个问题：Card 的 elevation 太高",
              "代码没有性能问题，卡顿是网络加载图片导致的"
            ],
            answer: 1,
            explain:
              "代码存在多个性能问题：(1) **每次 build 都重新排序** — sort 是 O(n log n) 操作，ListView 的 itemBuilder 会频繁调用，应在数据层或状态管理中预先排序。(2) **每行创建 DateFormat 实例** — DateFormat 的创建开销不小，应作为 static final 或类级别变量复用。(3) **高 elevation + shadowColor** — elevation: 8 在每行都产生阴影层，大量阴影会增加 GPU 合成压力。(4) **Image.network 无缓存** — 滚动时反复下载图片，应使用 CachedNetworkImage。优化方向：排序外提、DateFormat 复用、降低 elevation、图片缓存、列表项加 key。"
          },
          {
            id: "p7-perf-t1",
            type: "task",
            question: "性能优化前后对比实验",
            desc: "创建一个故意包含多个性能问题的列表页面（模拟真实场景），然后逐一修复并对比效果。故意制造的问题包括：(1) build 中做耗时计算；(2) 每行创建昂贵对象；(3) 不必要的 setState 导致全局重建；(4) 无图片缓存；(5) 过深的 Widget 嵌套。对每个问题使用 Flutter DevTools 的 Performance Overlay 截图对比优化前后的帧率表现。",
            criteria: [
              "优化前的页面有明显的卡顿/掉帧现象（Performance Overlay 中 UI Thread 超过 16ms）",
              "至少识别并修复 5 个性能问题",
              "每个修复有清晰的说明（问题是什么、为什么影响性能、如何修复）",
              "优化后的页面滚动流畅，Performance Overlay 表现良好"
            ]
          },
          {
            id: "p7-perf-o1",
            type: "open",
            question: "请描述使用 Flutter DevTools 进行性能分析的完整工作流程。包括：如何发现性能问题、使用哪些工具定位瓶颈、如何验证优化效果。",
            ref: "Flutter DevTools 性能分析工作流：\n\n**1. 发现问题（Performance Overview）**\n- 打开 DevTools → Performance 面板\n- 观察 FPS 图表，识别掉帧区间（低于 60fps / 120fps 的区域）\n- 开启 Performance Overlay 在设备上实时观察 UI Thread 和 Raster Thread\n\n**2. 定位瓶颈**\n\n*UI Thread 问题（build/动画卡顿）：*\n- **Flutter Frame Chart**：点击具体帧查看耗时分布\n- **Timeline Events**：查看 build()、layout()、paint() 各阶段耗时\n- **Widget Rebuild Profiler**：查看哪些 Widget 被频繁重建，识别不必要的 rebuild\n- **CPU Profiler**：录制 CPU Profile，通过 Bottom-up / Call Tree 找到耗时函数\n\n*Raster Thread 问题（GPU 渲染卡顿）：*\n- 检查是否有大量 Overdraw（Layer 重叠绘制）\n- 使用 `debugRepaintRainbowEnabled` 查看重绘区域\n- 检查是否有不必要的 `saveLayer`（如 ClipPath + 透明混合）\n\n*内存问题：*\n- **Memory 面板**：观察堆内存增长趋势，识别内存泄漏\n- **Heap Snapshot**：分析对象分配和引用关系\n\n**3. 验证优化效果**\n- 在相同操作场景下对比优化前后的 FPS\n- 使用 `debugProfileBuildsEnabledUserWidgets` 精确测量 build 耗时\n- 通过 Widget Rebuild Counts 验证 rebuild 次数减少\n- 使用 benchmark 测试（如 `flutter_driver` 或 `integration_test`）进行定量对比\n\n**关键原则**：先测量、后优化、再验证。不要凭感觉优化，用数据说话。"
          }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────
  // Module 8: 工程化与进阶
  // ─────────────────────────────────────────────
  {
    id: "p8",
    title: "工程化与进阶",
    level: 8,
    color: "#8b5cf6",
    builtin: true,
    topics: [
      {
        id: "arch",
        title: "架构分层与依赖注入",
        items: [
          {
            id: "p8-arch-q1",
            type: "quiz",
            question: "在 Clean Architecture 风格的 Flutter 项目架构中，Repository 层的核心职责是什么？",
            options: [
              "直接发起 HTTP 网络请求并解析 JSON",
              "作为数据源的协调者，对上层（UseCase/Bloc）屏蔽数据来源细节（网络/缓存/数据库），提供统一的数据访问接口",
              "管理 UI 组件的生命周期",
              "负责路由跳转和页面导航"
            ],
            answer: 1,
            explain:
              "Repository 模式的核心价值是「数据源抽象」。它协调 RemoteDataSource（网络 API）和 LocalDataSource（本地缓存/数据库），对上层提供统一接口。上层不需要关心数据来自网络还是缓存。Repository 通常实现缓存策略（如 cache-first、network-first）、数据转换（DTO → Entity）、错误统一处理等。这使得切换数据源（如从 REST 换到 GraphQL）或添加新的缓存层时，不影响上层代码。"
          },
          {
            id: "p8-arch-t1",
            type: "task",
            question: "搭建完整的项目架构",
            desc: "为一个中型 Flutter 项目（如新闻阅读 App）搭建完整的分层架构，包括：(1) 目录结构设计（feature-first 或 layer-first）；(2) 依赖注入配置（使用 get_it + injectable 或 Riverpod）；(3) 数据层（DataSource + Repository）；(4) 领域层（Entity + UseCase）；(5) 表示层（Bloc/Notifier + Page/Widget）。要求每一层之间有清晰的依赖方向（外层依赖内层，内层不知道外层存在）。",
            criteria: [
              "目录结构清晰，遵循选定的组织方式",
              "依赖方向正确：UI → Bloc → UseCase → Repository → DataSource",
              "依赖注入正确配置，各层通过接口（abstract class）解耦",
              "数据在各层之间有正确的转换（JSON → DTO → Entity → UI Model）",
              "有 README 或注释说明架构决策理由"
            ]
          }
        ]
      },
      {
        id: "testing",
        title: "测试",
        items: [
          {
            id: "p8-test-q1",
            type: "quiz",
            question: "Flutter 的测试学习顺序应该是怎样的？以下哪个顺序最合理？",
            options: [
              "集成测试 → Widget 测试 → 单元测试（从大到小）",
              "先学 Widget 测试，因为它覆盖了 UI 和逻辑",
              "单元测试（纯逻辑验证）→ Widget 测试（组件级 UI 测试）→ 集成测试（端到端流程测试），从简单到复杂、从隔离到集成",
              "只需要写集成测试，单元测试和 Widget 测试没有价值"
            ],
            answer: 2,
            explain:
              "推荐的学习顺序：单元测试 → Widget 测试 → 集成测试。单元测试最简单（只验证纯函数/类逻辑，无需 Flutter 框架知识），帮助建立测试思维；Widget 测试需要理解 pumpWidget、finder、tester API，验证组件的渲染和交互行为；集成测试最复杂（需要完整应用环境、可能涉及真实后端或 Mock Server），验证端到端流程。这个顺序符合「从简单到复杂、从隔离到集成」的工程原则，也对应测试金字塔（底层多、顶层少）。"
          },
          {
            id: "p8-test-t1",
            type: "task",
            question: "为一个功能模块编写完整测试套件",
            desc: "选择你之前实现的一个功能模块（如购物车、登录、搜索等），编写完整的测试套件：(1) 单元测试：测试 Repository 的缓存策略逻辑、Model 的 fromJson/toJson、Bloc/Notifier 的状态转换逻辑；(2) Widget 测试：测试关键 Widget 的渲染（初始状态、加载状态、错误状态、空状态）和用户交互（点击、输入）；(3) 至少一个集成测试：验证一个完整的用户流程（如「搜索商品 → 点击 → 加入购物车」）。",
            criteria: [
              "单元测试覆盖核心业务逻辑（至少 5 个测试用例）",
              "Widget 测试覆盖各种状态下的 UI 渲染（至少 4 个测试用例）",
              "集成测试验证至少一个完整用户流程",
              "正确使用 Mock（mocktail 或 mockito）隔离外部依赖",
              "测试命名清晰，遵循 Given-When-Then 模式"
            ]
          }
        ]
      },
      {
        id: "engineering",
        title: "主题、国际化与工程化",
        items: [
          {
            id: "p8-eng-t1",
            type: "task",
            question: "搭建一个工程化的项目脚手架",
            desc: "创建一个可复用的 Flutter 项目脚手架（可以是模板仓库或 Mason brick），包含：(1) 预配置的主题系统（亮色/暗色，支持自定义主色调）；(2) 国际化配置（flutter_localizations + ARB 文件，至少支持中英文）；(3) 路由配置（go_router 骨架）；(4) 依赖注入配置；(5) 环境配置（dev/staging/prod 三套环境）；(6) CI/CD 配置文件（GitHub Actions 或 Codemagic）；(7) 代码规范配置（analysis_options.yaml + pre-commit hooks）。",
            criteria: [
              "脚手架可以一键生成新项目（或使用模板快速初始化）",
              "主题系统支持亮色/暗色切换，颜色定义集中管理",
              "国际化配置正确，新增翻译文本有清晰流程",
              "环境配置可通过编译参数或 flavor 切换",
              "CI 配置包含 analyze、test、build 步骤"
            ]
          },
          {
            id: "p8-eng-t2",
            type: "task",
            question: "实现一个 Platform Channel 通信",
            desc: "使用 Flutter 的 Platform Channel 实现一个跨平台功能：(1) 通过 MethodChannel 调用原生功能（如获取电池电量、打开系统设置页、调用设备震动）；(2) 通过 EventChannel 接收原生的持续数据流（如传感器数据、电池状态变化）；(3) 通过 BasicMessageChannel 实现 Flutter 与原生的双向自定义消息通信。至少在一个平台上（Android 或 iOS）完整实现对应的原生代码。",
            criteria: [
              "MethodChannel 正确调用原生方法并处理返回结果",
              "EventChannel 正确接收原生事件流并转换为 Dart Stream",
              "错误处理完善（原生端抛出异常时 Flutter 端能正确捕获）",
              "至少在一个平台上有完整的原生实现代码",
              "Flutter 端代码封装为易用的 Dart API"
            ]
          }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────
  // Module 9: 综合实战
  // ─────────────────────────────────────────────
  {
    id: "p9",
    title: "综合实战",
    level: 9,
    color: "#ec4899",
    builtin: true,
    topics: [
      {
        id: "capstone",
        title: "综合项目实战",
        items: [
          {
            id: "p9-cap-t1",
            type: "task",
            question: "开发一个完整的 Flutter 应用",
            desc: "综合运用所有学过的知识，开发一个功能完整的 Flutter 应用。推荐选题：(A) 社区论坛 App — 包含帖子列表（无限滚动）、帖子详情（富文本渲染）、评论系统（嵌套回复）、发布帖子（富文本编辑器）、用户主页、关注/粉丝、消息通知（WebSocket 实时推送）；(B) 个人记账 App — 包含收支记录、分类管理、月度/年度统计图表（CustomPaint 绘制）、预算管理、数据导出（CSV/PDF）、多账本支持。要求项目有完整的架构设计、状态管理、数据层、错误处理、加载状态、空状态、响应式布局（适配手机和平板）。",
            criteria: [
              "项目架构清晰，遵循分层设计（至少包含数据层、状态层、UI 层）",
              "至少包含 5 个以上功能页面，页面间导航合理",
              "网络请求有完善的错误处理（离线、超时、服务器错误）和加载状态",
              "列表页面支持无限滚动（分页加载）",
              "有本地数据缓存策略（减少网络请求）",
              "支持亮色/暗色主题切换",
              "代码有核心模块的单元测试（至少覆盖 Repository 和状态管理）",
              "UI 细节完善（空状态页、骨架屏或 loading 动画、下拉刷新）"
            ]
          },
          {
            id: "p9-cap-o1",
            type: "open",
            question: "在完成综合项目后，请撰写一篇技术回顾文章（800 字以上），包含以下内容：(1) 你在架构设计上的关键决策及理由；(2) 遇到的最有挑战性的技术问题及解决过程；(3) 如果重新做一遍，你会改变哪些决策；(4) 对 Flutter 开发的理解相比项目开始前有什么变化；(5) 你学到的最有价值的 3 个 Flutter 技巧或模式。",
            ref: "这是一道开放性反思题，没有标准答案。好的回答应该包含：\n\n1. **架构决策**：具体说明为什么选择了某种架构模式（如 Clean Architecture + BLoC），而不是简单罗列概念。应该提到权衡过程（如「项目规模中等，选择了 Provider 而非 Bloc，因为团队更熟悉 Provider」）。\n\n2. **技术挑战**：描述具体的技术难题（如「嵌套滚动协调」「复杂表单联动状态管理」「大量数据的前端缓存策略」），而不是泛泛而谈「遇到了 bug」。\n\n3. **决策反思**：诚实地反思哪些决策是对的、哪些需要改进。如「过早引入依赖注入增加了复杂度」「应该更早开始写测试」。\n\n4. **认知变化**：例如「从把 Flutter 当作 Android 来写，到真正理解声明式 UI 的思维转变」「从追求花哨的技术方案到关注简单可维护」。\n\n5. **实用技巧**：例如 const Widget 的性能收益、BuildContext 就是 Element 的理解、sealed class 的状态建模模式等。"
          }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────
  // Module 10: Android 开发
  // ─────────────────────────────────────────────
  {
    id: "p10",
    title: "Android 开发",
    level: 10,
    color: "#34d399",
    builtin: true,
    topics: [
      {
        id: "android-basics",
        title: "Android 基础架构",
        items: [
          {
            id: "p10-basics-q1",
            type: "quiz",
            question: "Android 应用的四大组件是什么？",
            options: [
              "Activity、Fragment、ViewModel、LiveData",
              "Activity、Service、BroadcastReceiver、ContentProvider",
              "Application、Activity、Fragment、Layout",
              "Context、Intent、Bundle、Handler"
            ],
            answer: 1,
            explain:
              "Android 四大组件是 Activity（界面）、Service（后台服务）、BroadcastReceiver（广播接收器）和 ContentProvider（内容提供者）。每个组件都需要在 AndroidManifest.xml 中声明。Fragment 不是四大组件，它是 Activity 的一个片段；ViewModel 和 LiveData 是 Jetpack 架构组件。"
          },
          {
            id: "p10-basics-q2",
            type: "quiz",
            question: "关于 Android 的 Intent，以下说法正确的是？",
            options: [
              "显式 Intent 只能用于启动 Service，隐式 Intent 只能用于启动 Activity",
              "显式 Intent 指定了目标组件的完整类名，隐式 Intent 通过 action/category/data 等过滤条件让系统匹配合适的组件",
              "隐式 Intent 比显式 Intent 更安全，因为它不暴露类名",
              "Intent 只能携带基本类型的数据，不能传递 Parcelable 对象"
            ],
            answer: 1,
            explain:
              "显式 Intent 通过 setClass/setComponent 明确指定要启动的组件，通常用于应用内部跳转；隐式 Intent 通过 action、category、data 等声明需要的操作类型，由系统通过 IntentFilter 匹配最合适的组件，常用于跨应用调用（如打开网页、分享内容）。隐式 Intent 由于需要系统解析，可能存在安全风险（如 Intent 劫持），应谨慎处理。Intent 可以通过 Bundle 携带基本类型、Parcelable 和 Serializable 对象。"
          },
          {
            id: "p10-basics-c1",
            type: "code",
            question: "以下 Activity 代码在旋转屏幕后数据丢失，请找出原因：",
            code: `public class MainActivity extends AppCompatActivity {
    private int counter = 0;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        counter++;
        TextView tv = findViewById(R.id.counter_text);
        tv.setText("Count: " + counter);
    }
}`,
            options: [
              "TextView 的 setText 方法不支持整数类型",
              "屏幕旋转会导致 Activity 重建，onCreate 重新执行，counter 被重置为 0，且没有在 onSaveInstanceState 中保存 counter 的值",
              "findViewById 返回 null 导致空指针",
              "counter 应该声明为 static"
            ],
            answer: 1,
            explain:
              "屏幕旋转是配置变更（Configuration Change）的一种，默认行为是销毁并重建 Activity。重建后 counter 重新初始化为 0。正确做法：(1) 在 onSaveInstanceState 中保存 counter 值，在 onCreate 中从 savedInstanceState 恢复；(2) 或使用 ViewModel（Jetpack），ViewModel 可以在配置变更时存活；(3) 或在 Manifest 中为 Activity 添加 android:configChanges=\"orientation|screenSize\" 阻止重建（不推荐）。"
          },
          {
            id: "p10-basics-t1",
            type: "task",
            question: "实现一个完整的 Activity 生命周期观察器",
            desc: "创建一个包含两个 Activity 的应用，在所有生命周期回调中添加日志输出（onCreate、onStart、onResume、onPause、onStop、onDestroy、onRestart）。通过以下操作观察生命周期变化：(1) 启动应用；(2) 按 Home 键；(3) 从最近任务返回；(4) 启动第二个 Activity；(5) 从第二个 Activity 返回；(6) 旋转屏幕；(7) 按返回键退出。将观察到的生命周期顺序记录下来并解释每个回调的含义。",
            criteria: [
              "所有 7 个生命周期回调都有日志输出",
              "6 种操作场景的日志输出顺序正确",
              "理解各回调的含义（如 onCreate 只调用一次 vs onStart 每次可见都调用）",
              "能解释屏幕旋转时的完整生命周期流程"
            ]
          },
          {
            id: "p10-basics-o1",
            type: "open",
            question: "请解释 Android 中 Context 的概念。Activity、Application 和 Service 的 Context 有什么区别？在什么场景下应该使用哪种 Context？使用错误的 Context 会导致什么问题？",
            ref: "Context 是 Android 中访问系统资源和类的接口，几乎所有组件操作都需要 Context。\n\n**Activity Context**：\n- 生命周期与 Activity 绑定\n- 可以显示 Dialog、启动 Activity、注册 BroadcastReceiver 等\n- 适合与 UI 相关的操作（如 LayoutInflater、Dialog）\n- 泄漏风险：如果长生命周期的对象（如 Singleton、Static 变量）持有 Activity Context，会导致 Activity 无法被 GC 回收\n\n**Application Context**：\n- 生命周期与整个应用绑定\n- 不能显示 Dialog、不能启动带 UI 的 Activity（除非加 FLAG_ACTIVITY_NEW_TASK）\n- 适合长生命周期的操作（如数据库初始化、全局单例）\n- 不会导致 Activity 泄漏\n\n**Service Context**：\n- 生命周期与 Service 绑定\n- 功能介于 Activity 和 Application 之间\n\n**使用原则**：\n- UI 相关操作用 Activity Context\n- 长生命周期对象用 Application Context\n- 使用弱引用或 Lifecycle-aware 回调避免泄漏\n- 常见泄漏场景：Handler 持有 Activity、内部类持有外部类引用、单例持有 Context"
          }
        ]
      },
      {
        id: "android-layout",
        title: "布局与 UI",
        items: [
          {
            id: "p10-layout-q1",
            type: "quiz",
            question: "在 Android 中，ConstraintLayout 相比 LinearLayout 的主要优势是什么？",
            options: [
              "ConstraintLayout 的语法更简洁，代码量更少",
              "ConstraintLayout 可以通过约束关系实现扁平化布局，减少嵌套层级，从而提升布局性能",
              "ConstraintLayout 支持的 View 类型更多",
              "ConstraintLayout 自动处理所有动画效果"
            ],
            answer: 1,
            explain:
              "ConstraintLayout 的核心优势是减少布局嵌套。传统的 LinearLayout 嵌套会导致 View 层级过深，多次 measure/layout 传递影响性能。ConstraintLayout 通过约束（constraint）让每个 View 与其他 View 或父容器建立关系，实现扁平化布局（通常只需一层）。它支持链（Chain）、屏障（Barrier）、引导线（Guideline）等高级特性，可以替代大多数嵌套布局。性能测试表明，扁平的 ConstraintLayout 比多层嵌套的 LinearLayout 在 measure 阶段快约 40%。"
          },
          {
            id: "p10-layout-q2",
            type: "quiz",
            question: "RecyclerView 相比 ListView 的核心改进是什么？",
            options: [
              "RecyclerView 只能显示垂直列表，ListView 可以显示网格",
              "RecyclerView 强制使用 ViewHolder 模式，将布局管理（LayoutManager）和项目装饰（ItemDecoration）解耦，并且内置动画支持",
              "RecyclerView 的适配器更简单，代码量更少",
              "RecyclerView 不需要编写 Adapter，自动绑定数据"
            ],
            answer: 1,
            explain:
              "RecyclerView 的核心改进：(1) 强制 ViewHolder 模式 — ListView 的 ViewHolder 是可选优化，RecyclerView 在 Adapter 中强制实现；(2) LayoutManager 解耦 — 支持 LinearLayoutManager、GridLayoutManager、StaggeredGridLayoutManager，而 ListView 只支持垂直列表；(3) ItemDecoration — 自定义分割线和装饰；(4) ItemAnimator — 内置增删改动画；(5) DiffUtil — 高效计算数据差异并更新。RecyclerView 的 API 更复杂但更灵活，是现代 Android 列表的标准方案。"
          },
          {
            id: "p10-layout-c1",
            type: "code",
            question: "以下 RecyclerView Adapter 代码存在性能问题，滚动时出现卡顿，请找出原因：",
            code: `public class MyAdapter extends RecyclerView.Adapter<MyAdapter.MyHolder> {
    private List<String> data;

    @Override
    public void onBindViewHolder(@NonNull MyHolder holder, int position) {
        String item = data.get(position);
        // 每次绑定都加载图片
        Bitmap bmp = BitmapFactory.decodeFile(item);
        holder.imageView.setImageBitmap(bmp);
        // 每次绑定都创建新的监听器
        holder.itemView.setOnClickListener(v -> {
            new AlertDialog.Builder(v.getContext())
                .setTitle(item)
                .show();
        });
    }

    // ... 省略其他方法
}`,
            options: [
              "onBindViewHolder 中不应该设置点击事件",
              "在 onBindViewHolder 中进行同步的图片解码（阻塞 UI 线程）且每次都创建新的 OnClickListener 对象",
              "RecyclerView Adapter 不支持 String 类型的数据",
              "BitmapFactory 应该使用 decodeResource 而非 decodeFile"
            ],
            answer: 1,
            explain:
              "代码存在两个主要问题：(1) **同步图片解码** — BitmapFactory.decodeFile 是同步 I/O 操作，在 onBindViewHolder 中执行会直接阻塞 UI 线程，导致滚动卡顿。应使用 Glide/Coil 等异步图片加载库。(2) **重复创建监听器** — 每次绑定都 new 一个 OnClickListener 和 AlertDialog.Builder，在快速滚动时会创建大量临时对象，增加 GC 压力。应在 onCreateViewHolder 中设置监听器，或在 ViewHolder 中复用监听器并通过 adapterPosition 获取当前位置。"
          },
          {
            id: "p10-layout-t1",
            type: "task",
            question: "实现一个多类型 RecyclerView 列表",
            desc: "实现一个类似微信朋友圈的动态列表，支持多种 Item 类型：(1) 纯文字动态；(2) 图片动态（单图、三图、九宫格）；(3) 视频动态（缩略图 + 播放按钮）。要求使用 sealed class 或多 ViewType 实现，使用 Glide 或 Coil 加载图片，支持下拉刷新和分页加载，Item 点击和长按有不同的交互（点击进入详情、长按弹出菜单）。",
            criteria: [
              "正确使用 getItemViewType 和多 ViewHolder 实现多类型列表",
              "图片加载使用异步库（Glide/Coil），列表中显示 placeholder",
              "下拉刷新（SwipeRefreshLayout）和分页加载正常工作",
              "点击和长按事件正确区分并响应",
              "列表滚动流畅，无明显卡顿"
            ]
          }
        ]
      },
      {
        id: "android-jetpack",
        title: "Jetpack 架构组件",
        items: [
          {
            id: "p10-jetpack-q1",
            type: "quiz",
            question: "ViewModel 在 Android 架构中的核心作用是什么？",
            options: [
              "ViewModel 负责所有的网络请求和数据解析",
              "ViewModel 在配置变更（如屏幕旋转）时存活，用于持有和管理与 UI 相关的数据，避免因 Activity 重建而丢失状态",
              "ViewModel 替代了 Activity 的所有功能",
              "ViewModel 是一种新的布局容器"
            ],
            answer: 1,
            explain:
              "ViewModel 的核心价值是「配置变更时存活」。当 Activity 因屏幕旋转等配置变更而重建时，ViewModel 不会被销毁（它存储在 ViewModelStore 中），新 Activity 可以获取同一个 ViewModel 实例，从而保留之前的数据和状态。这解决了传统方案中 onSaveInstanceState 的限制（只能保存少量可序列化数据）和静态变量方案的问题（无法正确处理多实例）。ViewModel 不应持有 View、Activity Context 或 Lifecycle 相关的引用，否则会导致内存泄漏。"
          },
          {
            id: "p10-jetpack-q2",
            type: "quiz",
            question: "关于 Kotlin Flow 和 LiveData，以下说法正确的是？",
            options: [
              "LiveData 完全可以替代 Flow，两者功能一样",
              "Flow 是 Kotlin 协程的响应式流，支持冷流/热流、背压处理、丰富的操作符；LiveData 是 Android 生命周期感知的观察者，适合简单的 UI 状态观察，但操作符有限",
              "Flow 只能在 ViewModel 中使用，LiveData 只能在 Activity 中使用",
              "LiveData 的性能一定比 Flow 好"
            ],
            answer: 1,
            explain:
              "LiveData 是 Android 架构组件，核心优势是生命周期感知（自动在 onStart 后开始观察、onStop 后暂停、onDestroy 后移除），适合简单的 UI 状态更新。但 LiveData 缺少丰富的数据变换操作符（map/switchMap 有限），不支持背压，一次只持有一个值。Flow 是 Kotlin 协程生态的一部分，支持冷流（每次收集重新执行）和热流（SharedFlow/StateFlow），有丰富的操作符（map、filter、flatMapLatest、debounce 等），支持背压处理，可以表示数据流（如数据库变更、WebSocket 消息）。推荐做法：数据层使用 Flow，UI 层通过 asLiveData() 或 collectAsStateWithLifecycle() 桥接。"
          },
          {
            id: "p10-jetpack-c1",
            type: "code",
            question: "以下 ViewModel 代码可能导致内存泄漏，请找出原因：",
            code: `class UserViewModel(private val userRepository: UserRepository) : ViewModel() {
    private val _userData = MutableLiveData<User>()
    val userData: LiveData<User> = _userData

    fun loadUser(userId: String) {
        viewModelScope.launch {
            val result = userRepository.getUser(userId)
            _userData.value = result
        }
    }

    // 添加一个全局监听器
    init {
        GlobalScope.launch(Dispatchers.Main) {
            eventBus.events.collect { event ->
                _userData.value = userRepository.handleEvent(event)
            }
        }
    }
}`,
            options: [
              "viewModelScope.launch 不应该在 ViewModel 中使用",
              "在 init 块中使用 GlobalScope 启动协程，该协程不受 ViewModel 生命周期管理，ViewModel 销毁后协程仍在运行并可能持有 ViewModel 引用",
              "MutableLiveData 不能在 ViewModel 中使用",
              "userRepository 不应该作为构造函数参数"
            ],
            answer: 1,
            explain:
              "GlobalScope 启动的协程生命周期与整个应用相同，不会因 ViewModel 的 onCleared() 而自动取消。当 Activity/Fragment 销毁且 ViewModel 被清理时，GlobalScope 协程仍在运行，且它的 lambda 捕获了 _userData 和 userRepository 引用（间接持有 ViewModel），导致 ViewModel 无法被 GC 回收。正确做法：使用 viewModelScope.launch（自动在 onCleared 时取消），或者在 onCleared 中手动取消 Job。viewModelScope.launch 是推荐的 ViewModel 协程用法。"
          },
          {
            id: "p10-jetpack-t1",
            type: "task",
            question: "使用 MVVM + Repository 模式实现一个功能模块",
            desc: "为一个「电影列表」功能实现完整的 MVVM 架构：(1) Movie 数据类（id, title, posterUrl, rating, overview）；(2) MovieRepository（协调 RemoteDataSource 和 LocalDataSource，实现缓存策略）；(3) MovieViewModel（使用 StateFlow 管理页面状态：Idle/Loading/Success/Error，支持刷新和分页）；(4) MovieListActivity/Fragment（观察 StateFlow 并渲染 UI）；(5) 使用 Hilt 或手动依赖注入。要求所有异步操作使用 Kotlin 协程。",
            criteria: [
              "分层清晰：UI → ViewModel → Repository → DataSource",
              "StateFlow 正确管理 4 种状态（Idle/Loading/Success/Error）",
              "下拉刷新和分页加载正确实现",
              "协程在 viewModelScope 中启动，不会泄漏",
              "依赖注入正确配置（Hilt 或手动）"
            ]
          },
          {
            id: "p10-jetpack-o1",
            type: "open",
            question: "请对比 Android 中 MVI 和 MVVM 架构模式的区别。MVI 的「单向数据流」是什么意思？在什么场景下 MVI 比 MVVM 更合适？",
            ref: "**MVVM（Model-View-ViewModel）**：\n- ViewModel 暴露多个 LiveData/StateFlow 供 View 观察\n- View 可以调用 ViewModel 的多个方法触发状态更新\n- 状态可以是分散的（多个流分别管理不同数据）\n- 优点：灵活、直观、与 Jetpack 组件配合好\n- 缺点：多流可能导致状态不一致（如 isLoading=true 但 data=null 的中间态）\n\n**MVI（Model-View-Intent）**：\n- 单一状态：整个页面用一个 UiState 类描述所有可能的 UI 状态\n- 单向数据流：Intent（用户操作/系统事件）→ ViewModel 处理 → 更新 UiState → View 渲染\n- Intent 不是 Android 的 Intent 类，而是表示「用户意图」的 sealed class\n- 优点：状态可预测（不可能出现不一致）、便于调试和测试、方便添加中间件（日志/分析）\n- 缺点：样板代码较多（大量 sealed class 定义）、所有状态变化都要创建新 UiState 对象\n\n**单向数据流**：\n1. View 发出 Intent（如 UserClickRefresh）\n2. ViewModel 接收 Intent，执行业务逻辑\n3. ViewModel 生成新的 UiState\n4. View 观察到新 UiState 并渲染\n\n数据流方向是单向的（View → Intent → ViewModel → State → View），不存在反向依赖，使状态变化可追踪。\n\n**MVI 更合适的场景**：\n- 复杂页面，状态组合多（如表单、多步骤流程）\n- 需要精确的调试和日志追踪\n- 需要状态回放/撤销功能\n- 多人协作时需要严格的状态管理规范"
          }
        ]
      },
      {
        id: "android-concurrency",
        title: "协程与并发",
        items: [
          {
            id: "p10-conc-q1",
            type: "quiz",
            question: "Kotlin 协程中 `suspend` 关键字的作用是什么？",
            options: [
              "suspend 让函数在新的线程上执行",
              "suspend 标记一个函数为可挂起函数，表示该函数可以在不阻塞线程的情况下暂停执行并在稍后恢复",
              "suspend 让函数执行速度更快",
              "suspend 只能在 Activity 中使用"
            ],
            answer: 1,
            explain:
              "suspend 关键字标记的函数称为挂起函数（suspend function），它可以在执行过程中被挂起（暂停）而不阻塞当前线程，在条件满足后恢复执行。挂起函数只能在协程中或其他挂起函数中调用。常见的挂起函数包括 delay()、withContext()、await()、网络请求、数据库操作等。suspend 本身并不指定函数在哪个线程执行，线程切换需要通过 withContext(Dispatchers.IO) 等方式实现。"
          },
          {
            id: "p10-conc-q2",
            type: "quiz",
            question: "关于协程的 Dispatchers，以下说法正确的是？",
            options: [
              "Dispatchers.Main 用于执行 CPU 密集型计算",
              "Dispatchers.IO 用于网络请求、文件读写等 I/O 操作，Dispatchers.Default 用于 CPU 密集型计算（如排序、解析），Dispatchers.Main 用于 UI 更新",
              "所有协程都应该使用 Dispatchers.IO",
              "Dispatchers 是可选的，协程会自动选择最优线程"
            ],
            answer: 1,
            explain:
              "Dispatchers 决定协程在哪个线程/线程池上执行：\n- Dispatchers.Main：主线程（UI 线程），用于 UI 更新和轻量级操作\n- Dispatchers.IO：优化的 I/O 线程池（默认 64 个线程），用于网络请求、文件读写、数据库操作\n- Dispatchers.Default：优化的计算线程池（线程数 = CPU 核心数，最少 2），用于排序、解析、图片处理等 CPU 密集型任务\n- Dispatchers.Unconfined：不限定线程，在调用者线程启动，挂起后在恢复者线程继续\n\n选择原则：I/O 操作用 IO，计算用 Default，UI 操作用 Main。"
          },
          {
            id: "p10-conc-c1",
            type: "code",
            question: "以下代码在主线程上执行了耗时操作导致 ANR，请找出问题：",
            code: `class MyViewModel : ViewModel() {
    private val _result = MutableStateFlow<String?>(null)
    val result: StateFlow<String?> = _result

    fun fetchData() {
        viewModelScope.launch {
            // 直接在 Main 调度器上执行耗时网络请求
            val response = apiService.getData()
            val parsed = parseLargeJson(response.body()!!)
            _result.value = parsed
        }
    }

    private fun parseLargeJson(json: String): String {
        // 大量 JSON 解析逻辑...
        return json.substring(0, 100)
    }
}`,
            options: [
              "viewModelScope 不能用于网络请求",
              "apiService.getData() 和 parseLargeJson() 在主线程（Dispatchers.Main）上执行，网络请求和大量解析会阻塞主线程导致 ANR",
              "StateFlow 不能在 ViewModel 中使用",
              "substring 方法会导致 ANR"
            ],
            answer: 1,
            explain:
              "viewModelScope 默认使用 Dispatchers.Main，因此 launch 块中的代码默认在主线程执行。apiService.getData() 如果不是 suspend 函数（如使用 Retrofit 但未声明 suspend），则会在主线程同步执行网络请求，直接导致 ANR。即使 getData() 是 suspend 函数，parseLargeJson() 作为非 suspend 的 CPU 密集操作仍会在主线程执行。修复方法：(1) 确保 apiService 方法声明为 suspend（Retrofit 会自动切换到 IO 线程）；(2) 将 parseLargeJson 用 withContext(Dispatchers.Default) 包裹，将 CPU 密集操作移到 Default 线程池。"
          },
          {
            id: "p10-conc-t1",
            type: "task",
            question: "实现一个带超时和重试的协程网络请求封装",
            desc: "封装一个通用的网络请求函数 safeApiCall，支持：(1) 超时控制（withTimeout，可配置超时时间）；(2) 自动重试（retry，可配置重试次数和延迟）；(3) 统一的错误处理（网络错误、超时、HTTP 错误码、JSON 解析错误）；(4) 使用 sealed class 定义结果类型 ApiResult< T >（Success / Error / Loading）；(5) 在 ViewModel 中使用该封装发起请求并更新 UI 状态。",
            criteria: [
              "withTimeout 正确使用，超时后取消协程并返回 Error",
              "重试逻辑正确（指数退避或固定延迟），重试耗尽后返回最终错误",
              "sealed class Result 覆盖所有可能的错误类型",
              "safeApiCall 可以在任何 viewModelScope.launch 中使用",
              "代码可复用，不与特定业务逻辑耦合"
            ]
          },
          {
            id: "p10-conc-o1",
            type: "open",
            question: "请解释 Kotlin 协程中 Structured Concurrency（结构化并发）的概念。为什么说协程比 RxJava 更安全？什么是协程泄漏，如何避免？",
            ref: "**结构化并发**是 Kotlin 协程的核心设计原则，要求：\n\n1. **父子关系**：每个协程都有一个父协程（通过 CoroutineScope 或 Job 建立）\n2. **生命周期绑定**：子协程的生命周期不能超过父协程\n3. **级联取消**：取消父协程时，所有子协程也会被取消\n4. **异常传播**：子协程的失败会传播给父协程\n\n**与 RxJava 对比**：\n- RxJava 的 Disposable 需要手动管理（在 onCreate 订阅、onDestroy 取消），容易遗漏导致泄漏\n- 协程通过 scope（如 viewModelScope）自动管理生命周期，scope 取消时所有子协程自动取消\n- 协程的异常传播机制更完善，未捕获的异常会向上传播而非静默丢失\n\n**协程泄漏**：\n当协程在其作用域被取消后仍在运行（通常因为使用了 GlobalScope 或手动创建了不绑定的 Job），导致协程持有外部引用无法被 GC 回收。\n\n**避免方法**：\n1. 永远不要使用 GlobalScope（除非明确知道后果）\n2. 使用 viewModelScope、lifecycleScope 等绑定了生命周期的 scope\n3. 自定义 scope 时确保在合适的生命周期回调中 cancel\n4. 使用 withContext 切换线程而非手动创建新协程\n5. 在 onCleared / onDestroy 中确保所有协程被取消"
          }
        ]
      },
      {
        id: "android-storage",
        title: "数据存储",
        items: [
          {
            id: "p10-store-q1",
            type: "quiz",
            question: "Android 中以下数据存储方案，哪个适合存储大量结构化数据并支持复杂查询？",
            options: [
              "SharedPreferences / DataStore（Preferences）",
              "Room（SQLite 封装）",
              "文件存储（Internal/External Storage）",
              "ContentProvider"
            ],
            answer: 1,
            explain:
              "Room 是 Android Jetpack 提供的 SQLite 封装库，适合存储大量结构化数据（如聊天记录、商品列表、订单数据），支持 SQL 查询、事务、类型安全、迁移和 Flow/LiveData 观察。SharedPreferences/DataStore 适合少量键值对（如用户偏好、设置）；文件存储适合二进制文件（如图片、PDF）；ContentProvider 主要用于跨应用数据共享。Room 的核心优势是编译时 SQL 验证、类型安全的 DAO 接口、自动迁移支持和与协程/Flow 的深度集成。"
          },
          {
            id: "p10-store-c1",
            type: "code",
            question: "以下 Room DAO 代码在主线程执行时报错，请找出原因：",
            code: `@Dao
interface UserDao {
    @Query("SELECT * FROM users WHERE id = :userId")
    fun getUser(userId: String): User

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    fun insertUser(user: User)

    @Query("SELECT * FROM users")
    fun getAllUsers(): List<User>
}`,
            options: [
              "Room DAO 不支持 String 类型的主键",
              "DAO 方法返回同步结果（非 Flow/LiveData），Room 默认禁止在主线程执行数据库操作，应改为 suspend 函数或返回 Flow/LiveData",
              "SQL 语法有错误",
              "onConflict 参数不应该使用 REPLACE"
            ],
            answer: 1,
            explain:
              "Room 默认禁止在主线程执行数据库操作（防止 ANR），同步的 DAO 方法（返回 User、List<User> 等直接类型）不能在主线程调用。修复方式：(1) 将方法声明为 suspend 函数：`suspend fun getUser(userId: String): User`，然后在协程中调用；(2) 返回 Flow 或 LiveData 实现异步观察：`fun getAllUsers(): Flow<List<User>>`。推荐使用 suspend + Flow 组合：一次性查询用 suspend，持续观察用 Flow。"
          },
          {
            id: "p10-store-t1",
            type: "task",
            question: "使用 Room 实现一个本地缓存层",
            desc: "为一个新闻阅读 App 实现 Room 本地缓存：(1) Entity（NewsArticle，含 id, title, content, author, publishedAt, isBookmarked, categoryId）；(2) Dao（包含按分类查询、搜索标题、分页加载、收藏操作）；(3) Database 和 TypeConverter（Date ↔ Long）；(4) Repository（实现网络优先策略：先返回本地缓存，同时拉取远程数据更新本地，Flow 自动推送更新）；(5) 数据库迁移（v1→v2 添加 isBookmarked 字段）。",
            criteria: [
              "Entity 和 TypeConverter 正确定义",
              "DAO 方法支持分页（PagingSource 或 LIMIT/OFFSET）和搜索",
              "Repository 的网络优先策略正确实现（先返回缓存，异步更新）",
              "Flow 观察本地数据变化自动通知 UI",
              "数据库迁移脚本正确编写并在测试中验证"
            ]
          }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────
  // Module 11: Android 进阶
  // ─────────────────────────────────────────────
  {
    id: "p11",
    title: "Android 进阶",
    level: 11,
    color: "#10b981",
    builtin: true,
    topics: [
      {
        id: "android-perf",
        title: "性能优化",
        items: [
          {
            id: "p11-perf-q1",
            type: "quiz",
            question: "Android 中内存泄漏（Memory Leak）和内存溢出（OOM）的区别是什么？",
            options: [
              "内存泄漏和内存溢出是同一个概念",
              "内存泄漏是对象不再使用但无法被 GC 回收（如长生命周期对象持有短生命周期引用），导致可用内存逐渐减少；内存溢出是应用申请的内存超出了系统分配的上限",
              "内存泄漏只会发生在 C/C++ 代码中，Java/Kotlin 不会有内存泄漏",
              "内存溢出可以通过重启 Activity 解决，内存泄漏不能"
            ],
            answer: 1,
            explain:
              "内存泄漏（Memory Leak）：对象不再被使用，但因为仍然被其他存活对象引用（如静态变量、单例、未取消的注册、内部类隐式引用等），GC 无法回收，导致内存逐渐被占满。内存溢出（OOM）：应用尝试分配内存但堆空间不足，抛出 OutOfMemoryError。内存泄漏是 OOM 的常见原因——多次泄漏累积后可用内存越来越少，最终触发 OOM。排查工具：LeakCanary（自动检测泄漏）、Android Studio Memory Profiler（堆转储分析）、MAT（Memory Analyzer Tool）。"
          },
          {
            id: "p11-perf-q2",
            type: "quiz",
            question: "关于 Android 启动优化，以下说法正确的是？",
            options: [
              "冷启动和热启动的时间完全相同",
              "冷启动时应在 Application.onCreate 和首个 Activity.onCreate 中尽可能多地初始化所有第三方库，避免延迟加载",
              "冷启动是进程不存在的完整启动，应通过延迟初始化、异步初始化、任务拓扑排序等策略减少主线程阻塞时间；热启动是 Activity 从后台恢复，无需重新创建",
              "启动优化只影响用户体验，不影响应用的 Google Play 排名"
            ],
            answer: 2,
            explain:
              "冷启动（Cold Start）：应用进程不存在，需要创建进程→初始化 Application→创建首个 Activity→布局渲染。这是最慢的启动路径，也是优化的重点。热启动（Warm/Hot Start）：Activity 已在后台（ onStop/onPause 状态），直接恢复即可，速度很快。冷启动优化策略：(1) 延迟初始化——非必要库不在 Application.onCreate 中初始化；(2) 异步初始化——无依赖关系的库在子线程初始化；(3) 任务拓扑排序——使用有向无环图（DAG）管理初始化任务的依赖关系；(4) 闪屏优化——使用 windowBackground 设置启动主题，避免白屏。工具：Macrobenchmark、Systrace。"
          },
          {
            id: "p11-perf-c1",
            type: "code",
            question: "以下代码存在内存泄漏风险，请找出所有泄漏点：",
            code: `class MainActivity : AppCompatActivity() {
    private val handler = Handler(Looper.getMainLooper())
    private var heavyObject: Bitmap? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        heavyObject = BitmapFactory.decodeResource(resources, R.drawable.huge_image)
        
        // 延迟任务
        handler.postDelayed({
            // 使用 Activity 引用更新 UI
            findViewById<TextView>(R.id.tv).text = "Updated"
        }, 60_000)

        // 注册广播
        registerReceiver(object : BroadcastReceiver() {
            override fun onReceive(ctx: Context, intent: Intent) {
                Toast.makeText(this@MainActivity, "Received", Toast.LENGTH_SHORT).show()
            }
        }, IntentFilter("com.example.ACTION"))
    }
}`,
            options: [
              "代码没有内存泄漏问题，GC 会自动处理",
              "存在多个泄漏点：(1) Handler 的 Runnable 隐式持有 Activity 引用，Activity 销毁后 Runnable 仍在消息队列中；(2) BroadcastReceiver 注册但未在 onDestroy 中反注册；(3) heavyObject 大图未在 onDestroy 中回收",
              "只有 BroadcastReceiver 的泄漏，其他都不是问题",
              "Bitmap 不会导致内存泄漏，因为它会被自动回收"
            ],
            answer: 1,
            explain:
              "三个泄漏点：(1) **Handler 泄漏** — postDelayed 的 lambda 隐式捕获了 Activity 引用（通过 findViewById 和 this@MainActivity），即使 Activity 销毁，Runnable 仍在主线程消息队列中等待 60 秒后执行，期间 Activity 无法被 GC。修复：使用 WeakReference 或在 onDestroy 中 removeCallbacksAndMessages(null)。(2) **BroadcastReceiver 泄漏** — 动态注册的 Receiver 未在 onDestroy 中调用 unregisterReceiver()，系统持有 Receiver 引用进而持有 Activity。修复：保存 Receiver 引用并在 onDestroy 反注册。(3) **Bitmap 泄漏** — 大图对象在 Activity 销毁后如果没有被释放，会持续占用大量堆内存。修复：在 onDestroy 中 recycle() 并置 null。"
          },
          {
            id: "p11-perf-t1",
            type: "task",
            question: "实现一个启动优化方案",
            desc: "为一个中型应用实现启动优化：(1) 使用 Systrace 或 Macrobenchmark 测量优化前的冷启动时间（从进程创建到首帧渲染）；(2) 将 Application.onCreate 中的第三方库初始化按依赖关系构建 DAG，分为必须同步初始化（如 CrashSDK）和可异步初始化（如统计SDK、图片库）；(3) 实现一个简单的任务调度器 TaskDispatcher，支持依赖声明、线程池执行、回调通知；(4) 优化首个 Activity 的布局层级（减少嵌套、使用 ViewStub 延迟加载）；(5) 测量优化后的启动时间并对比。",
            criteria: [
              "优化前后的冷启动时间有量化对比（如从 2s 降到 800ms）",
              "TaskDispatcher 正确处理任务依赖关系（拓扑排序）",
              "同步/异步初始化任务划分合理",
              "布局优化后层级深度减少",
              "使用 Systrace 或 Profiler 验证主线程阻塞减少"
            ]
          },
          {
            id: "p11-perf-o1",
            type: "open",
            question: "请详细描述 Android 应用的卡顿（Jank）优化方案。包括：如何定义和检测卡顿、常见的卡顿原因、优化手段，以及如何建立线上卡顿监控体系。",
            ref: "**卡顿定义**：单帧渲染时间超过 16.67ms（60fps）或 8.33ms（120fps），导致画面不连续。\n\n**检测方法**：\n1. **开发者选项 → Profile GPU Rendering**：实时查看每帧耗时\n2. **Systrace / Perfetto**：系统级 trace 分析，定位具体耗时函数\n3. **Choreographer.FrameCallback**：代码层面检测掉帧\n4. **Android Studio CPU Profiler**：方法级耗时分析\n\n**常见卡顿原因**：\n1. **主线程 I/O**：文件读写、SharedPreferences 同步提交、数据库查询\n2. **布局复杂**：View 层级过深、过度绘制（Overdraw）\n3. **频繁 GC**：循环中创建大量临时对象（如 String 拼接、auto-boxing）\n4. **图片加载**：未降采样的大图解码、主线程 Bitmap 操作\n5. **动画卡顿**：硬件层未启用、属性动画在 onDraw 中触发\n\n**优化手段**：\n1. 主线程只做 UI 操作，I/O 和计算移到子线程\n2. 减少布局层级（ConstraintLayout 扁平化、ViewStub 延迟加载、Merge 减少冗余节点）\n3. 减少对象分配（对象池、ArrayMap 替代 HashMap、避免 auto-boxing）\n4. 图片降采样 + 异步解码 + 缓存\n5. 列表优化（DiffUtil、ViewHolder 复用、setHasFixedSize）\n6. 使用 hardware layer 加速动画\n\n**线上监控**：\n1. Looper 的 Printer 方案：在主线程 Looper 的 dispatchMessage 前后打点，计算耗时\n2. Choreographer 方案：注册 FrameCallback 统计掉帧率\n3. ArgusAPM / Matrix 等开源 APM 框架\n4. 上报指标：FPS、掉帧率、卡顿堆栈、卡顿时长\n5. 采样策略：不是每帧都采集，而是检测到掉帧后采集调用栈"
          }
        ]
      },
      {
        id: "android-custom-view",
        title: "自定义 View",
        items: [
          {
            id: "p11-view-q1",
            type: "quiz",
            question: "自定义 View 时，`onMeasure()`、`onLayout()` 和 `onDraw()` 的执行顺序和职责分别是什么？",
            options: [
              "onDraw → onMeasure → onLayout，先绘制再测量再布局",
              "onMeasure → onLayout → onDraw，先测量确定大小，再布局确定位置，最后绘制内容",
              "onLayout → onMeasure → onDraw，顺序不影响结果",
              "只有 onDraw 是必须重写的，其他两个可选"
            ],
            answer: 1,
            explain:
              "View 的三大流程严格按 measure → layout → draw 顺序执行：\n(1) onMeasure：测量 View 的大小。根据父容器传递的 MeasureSpec（EXACTLY/AT_MOST/UNSPECIFIED）计算自身宽高，调用 setMeasuredDimension 保存。自定义 View 必须处理 wrap_content 场景，否则会与 match_parent 表现一致。\n(2) onLayout：确定 View 的位置。只有 ViewGroup 需要重写，遍历子 View 调用 layout() 指定上下左右位置。单个 View 不需要。\n(3) onDraw：绘制 View 的内容。使用 Canvas 和 Paint 绘制图形、文字、图片等。仅在需要自定义视觉效果时重写。\n\n注意：View 的 measure 和 layout 可能执行多次（如父容器需要多次测量才能确定最终大小）。"
          },
          {
            id: "p11-view-c1",
            type: "code",
            question: "以下自定义 View 代码设置 wrap_content 时无效（表现为 match_parent），请找出原因：",
            code: `class CircleView @JvmOverloads constructor(
    context: Context, attrs: AttributeSet? = null, defStyle: Int = 0
) : View(context, attrs, defStyle) {

    private val paint = Paint(Paint.ANTI_ALIAS_FLAG).apply {
        color = Color.RED
        style = Paint.Style.FILL
    }

    override fun onDraw(canvas: Canvas) {
        super.onDraw(canvas)
        val radius = Math.min(width, height) / 2f
        canvas.drawCircle(width / 2f, height / 2f, radius, paint)
    }
}`,
            options: [
              "drawCircle 的参数计算有误",
              "没有重写 onMeasure 方法处理 wrap_content，View 默认在 AT_MOST 模式下使用父容器传入的可用大小，导致 wrap_content 与 match_parent 表现相同",
              "Paint 应该设置为 STROKE 而不是 FILL",
              "CircleView 不需要构造函数参数"
            ],
            answer: 1,
            explain:
              "View 的默认 onMeasure 实现中，当 MeasureSpec 为 AT_MOST（即 wrap_content）时，会将 size 设置为父容器允许的最大值，导致 wrap_content 与 match_parent 表现相同。修复方法：重写 onMeasure，在 AT_MOST 模式下设置一个默认的内部尺寸（如 200px），并在 EXACTLY 模式下使用父容器的精确值。代码示例：\n```kotlin\noverride fun onMeasure(widthMeasureSpec: Int, heightMeasureSpec: Int) {\n    val w = resolveSize(200, widthMeasureSpec)\n    val h = resolveSize(200, heightMeasureSpec)\n    setMeasuredDimension(w, h)\n}\n```\nresolveSize 会自动处理 EXACTLY/AT_MOST/UNSPECIFIED 三种模式。"
          },
          {
            id: "p11-view-t1",
            type: "task",
            question: "实现一个自定义的FlowLayout（流式布局）",
            desc: "实现一个自定义 ViewGroup——FlowLayout，子 View 按行排列，一行放不下时自动换行（类似 CSS 的 flex-wrap）。要求：(1) 重写 onMeasure，遍历子 View 测量并根据可用宽度计算换行，正确处理 padding；(2) 重写 onLayout，根据 onMeasure 中记录的行信息对子 View 进行定位；(3) 支持 wrap_content 和 match_parent；(4) 支持子 View 的 margin；(5) 添加自定义属性 flow_horizontalSpacing 和 flow_verticalSpacing（通过 declare-styleable）。",
            criteria: [
              "onMeasure 正确处理换行逻辑和自身尺寸",
              "onLayout 正确定位每行每个子 View",
              "wrap_content 时尺寸刚好包裹内容",
              "子 View 的 margin 正确生效",
              "自定义属性可通过 XML 配置"
            ]
          },
          {
            id: "p11-view-o1",
            type: "open",
            question: "请解释 Android 中 View 的事件分发机制。dispatchTouchEvent、onInterceptTouchEvent 和 onTouchEvent 三者的关系是什么？如何解决滑动冲突？",
            ref: "**事件分发流程**：\n\nTouch 事件从 Activity → Window → 顶级 ViewGroup → 子 View 逐层传递：\n\n1. **dispatchTouchEvent**：事件分发入口\n   - ViewGroup：决定是自己处理还是分发给子 View\n   - 返回 true：事件被消费，不再传递\n   - 返回 false：事件回传给父 View 的 onTouchEvent\n\n2. **onInterceptTouchEvent**（仅 ViewGroup 有）：\n   - 决定是否拦截事件不让子 View 处理\n   - 返回 true：拦截，交给自己的 onTouchEvent 处理\n   - 返回 false：不拦截，继续传给子 View\n\n3. **onTouchEvent**：\n   - 处理触摸事件\n   - 返回 true：消费事件\n   - 返回 false：不消费，事件回传给父 View\n\n**核心规则**：\n- 事件先传给子 View，子 View 不消费再回传给父 View（类似责任链模式）\n- 一旦某个 View 的 onTouchEvent 返回 true，后续 MOVE/UP 事件都直接给它\n- requestDisallowInterceptTouchEvent 可以禁止父 View 拦截\n\n**滑动冲突解决**：\n1. **外部拦截法**：在父 ViewGroup 的 onInterceptTouchEvent 中，根据条件决定是否拦截（如水平滑动时拦截、垂直滑动时不拦截）\n2. **内部拦截法**：在子 View 的 onTouchEvent 中，根据条件调用 parent.requestDisallowInterceptTouchEvent(true) 阻止父 View 拦截\n3. 常见场景：ViewPager 嵌套 ScrollView、RecyclerView 嵌套 RecyclerView\n4. 判断滑动方向：根据 dx/dy 的绝对值之比判断是水平还是垂直滑动"
          }
        ]
      },
      {
        id: "android-ipc",
        title: "IPC 与多进程",
        items: [
          {
            id: "p11-ipc-q1",
            type: "quiz",
            question: "Android 中 AIDL 和 Messenger 的核心区别是什么？",
            options: [
              "AIDL 和 Messenger 功能完全相同，只是 API 不同",
              "AIDL 支持跨进程调用任意方法（可定义丰富接口），适合复杂 IPC；Messenger 基于 Message 串行处理，只能单向传递消息，适合简单通信",
              "Messenger 性能比 AIDL 更好",
              "AIDL 只能用于同一应用内的多进程通信"
            ],
            answer: 1,
            explain:
              "AIDL（Android Interface Definition Language）：定义跨进程接口，支持任意方法调用、多种参数类型（包括 Parcelable）、同步和异步调用。适合复杂的跨进程交互（如 Service 与多个 Client 交互）。底层使用 Binder 机制。\n\nMessenger：基于 AIDL 的简化封装，内部使用一个 Handler 串行处理 Message。只能传递 Message 对象，不支持直接调用方法。优点是线程安全（串行处理）、使用简单。适合低频的简单消息传递。\n\n选择原则：需要调用多方法、传复杂对象用 AIDL；只需简单消息传递用 Messenger。两者底层都是 Binder。"
          },
          {
            id: "p11-ipc-q2",
            type: "quiz",
            question: "Android 中使用多进程（android:process）时，会带来哪些问题？",
            options: [
              "多进程没有任何副作用，只是性能更好",
              "多进程会导致：Application 多次创建、静态成员不共享、SharedPreferences 不支持多进程并发写入、内存泄漏风险增加",
              "多进程只是内存占用增加，其他没有影响",
              "只有 Service 才能使用多进程，Activity 不行"
            ],
            answer: 1,
            explain:
              "Android 多进程的副作用：\n(1) **Application 多次创建**：每个进程启动时都会创建 Application 实例，onCreate 被多次调用，需要根据进程名做初始化区分。\n(2) **静态成员不共享**：不同进程有独立的虚拟机实例，静态变量各自独立，修改互不影响。\n(3) **SharedPreferences 不安全**：SP 的多进程模式（MODE_MULTI_PROCESS）已废弃，并发写入可能导致数据丢失。应使用 ContentProvider 或 MMKV 替代。\n(4) **内存翻倍**：每个进程有独立的堆内存，Application 级资源被重复加载。\n(5) **组件通信复杂**：跨进程需要使用 Binder/AIDL/Messenger/ContentProvider/Broadcast。\n\n多进程适用于：WebView 独立进程（防止内存泄漏导致主进程崩溃）、推送服务进程、后台音乐播放进程等。"
          },
          {
            id: "p11-ipc-t1",
            type: "task",
            question: "使用 AIDL 实现跨进程通信",
            desc: "实现一个跨进程的「图书管理服务」：(1) 服务端：RemoteBookService 运行在独立进程，提供 addBook、getBookList、registerListener（注册回调）、unregisterListener 方法；(2) 客户端：绑定服务后调用上述方法，实时显示图书列表变化；(3) Book 类实现 Parcelable；(4) 使用 AIDL 定义接口 IBookManager 和 IOnNewBookAddedListener；(5) 处理 RemoteException 和 Service 断开重连逻辑。",
            criteria: [
              "AIDL 接口正确定义，包含基本方法和回调注册",
              "Book 类正确实现 Parcelable",
              "客户端绑定服务并成功调用远程方法",
              "回调通知正常工作（新书添加时客户端实时更新）",
              "处理了 Service 意外断开的重连逻辑"
            ]
          },
          {
            id: "p11-ipc-o1",
            type: "open",
            question: "请深入解释 Android Binder 机制。为什么 Android 选择 Binder 而不是传统的 Socket/管道/共享内存作为主要 IPC 方式？Binder 的内存映射是如何工作的？",
            ref: "**Binder 为什么优于传统 IPC**：\n\n1. **性能**：Binder 只需一次拷贝（发送方→内核缓冲区→接收方通过 mmap 直接访问），而 Socket/管道需要两次拷贝（发送方→内核→接收方）。共享内存零拷贝但缺乏同步机制。\n\n2. **安全性**：Binder 在内核中为每个进程维护 UID/PID，接收方可以验证调用者身份。Socket/管道无法可靠验证对方身份。\n\n3. **易用性**：Binder 提供面向对象的接口定义（AIDL），方法调用像本地调用一样自然。Socket 是字节流，需要自行解析协议。\n\n4. **C/S 架构**：Binder 天然支持 Client-Server 模式，ServiceManager 作为命名服务管理 Binder 引用。\n\n**Binder 内存映射原理**：\n\n1. **mmap 映射**：进程打开 /dev/binder 设备后，调用 mmap() 将一块物理内存同时映射到内核空间和用户空间\n2. **一次拷贝**：发送方调用 ioctl(BINDER_WRITE_READ)，将数据从用户空间拷贝到内核的 binder 缓冲区（唯一一次拷贝）\n3. **零拷贝读取**：接收方因为 mmap 映射，可以直接在用户空间访问内核缓冲区的数据，无需再次拷贝\n4. **内存限制**：每个进程的 mmap 映射大小通常为 1MB-8MB，所以 Binder 事务有大小限制（异步事务约 1MB，同步事务更小）\n5. **释放**：接收方处理完后通知内核释放缓冲区\n\n**Binder 通信流程**：Client → Binder Proxy（BpBinder）→ 内核 Binder 驱动 → Binder Stub（BBinder）→ Server → 原路返回结果"
          }
        ]
      },
      {
        id: "android-compose",
        title: "Jetpack Compose",
        items: [
          {
            id: "p11-compose-q1",
            type: "quiz",
            question: "Jetpack Compose 中的「重组（Recomposition）」是什么？如何避免不必要的重组？",
            options: [
              "重组就是 Activity 重建，和配置变更一样",
              "重组是 Compose 在状态变化时重新执行可组合函数以更新 UI；避免不必要重组的方法包括：remember 缓存计算结果、derivedStateOf 减少通知频率、LazyColumn 使用 key 标识项、避免 lambda 在重组时创建新实例",
              "重组可以完全避免，只要使用 setState 正确",
              "重组只会影响整个页面，不能局部重组"
            ],
            answer: 1,
            explain:
              "重组（Recomposition）是 Compose 的核心机制——当观察到的 State 变化时，Compose 会重新执行依赖该 State 的可组合函数，生成新的 UI 描述，然后智能地只更新变化的部分。\n\n避免不必要重组的关键技巧：\n(1) **remember**：缓存计算结果，避免每次重组重新计算\n(2) **derivedStateOf**：只在派生状态真正变化时触发重组\n(3) **key**：LazyColumn 中使用唯一 key 标识列表项，避免项移动时全量重组\n(4) **Lambda 稳定性**：使用 remember 保存 lambda 或使用无状态 lambda，避免每次重组创建新实例导致子组件重组\n(5) **@Stable / @Immutable**：标记数据类为稳定类型，帮助 Compose 跳过不可变参数的重组\n(6) **状态下沉**：将状态尽可能下沉到需要它的最小组件中"
          },
          {
            id: "p11-compose-q2",
            type: "quiz",
            question: "Compose 中 `remember` 和 `rememberSaveable` 的区别是什么？",
            options: [
              "两者功能完全相同",
              "remember 在重组时保持值但在配置变更（如旋转屏幕）时会丢失；rememberSaveable 在配置变更时也能保持值，因为它将数据保存到了 SavedInstanceState 中",
              "rememberSaveable 比 remember 性能更好",
              "remember 只能用在 Composable 函数中，rememberSaveable 可以在任何地方使用"
            ],
            answer: 1,
            explain:
              "remember：在 Composable 函数的重组过程中保持值（存在 Composition 中），但当 Activity 因配置变更而重建时，整个 Composition 被销毁并重新创建，remember 的值会丢失。\n\nrememberSaveable：在 remember 的基础上，将值通过 Bundle 保存到 SavedInstanceState 中，当 Activity 因配置变更重建后可以恢复。支持基本类型、Parcelable、Serializable 等 Bundle 支持的类型。对于自定义对象，需要提供 Saver。\n\n选择：纯 UI 临时状态（如滚动位置、展开/折叠）用 remember；需要跨配置变更保持的状态（如用户输入的文本、选中项）用 rememberSaveable。注意：两者都不能跨进程恢复（进程被杀后丢失），持久化数据应使用 DataStore/Room。"
          },
          {
            id: "p11-compose-c1",
            type: "code",
            question: "以下 Compose 代码在列表滚动时出现卡顿，请找出原因并修复：",
            code: `@Composable
fun UserList(users: List<User>) {
    LazyColumn {
        items(users.size) { index ->
            val user = users[index]
            // 每次重组都创建新的 DateFormatter
            val dateFormatter = SimpleDateFormat("yyyy-MM-dd", Locale.getDefault())
            val formattedDate = dateFormatter.format(user.joinDate)
            
            // 每次都创建新的 onClick lambda
            Row(
                modifier = Modifier.clickable {
                    navigateToProfile(user.id)
                }
            ) {
                Text(user.name)
                Text(formattedDate)
            }
        }
    }
}`,
            options: [
              "LazyColumn 不支持点击事件",
              "存在多个问题：index 方式缺少 key 导致列表增删时全量重组、每次重组创建 SimpleDateFormat 对象、clickable lambda 每次重组都创建新实例导致 Row 不必要的重组",
              "Row 组件不支持 clickable 修饰符",
              "SimpleDateFormat 是线程安全的所以没有问题"
            ],
            answer: 1,
            explain:
              "代码存在三个问题：\n(1) **缺少 key** — 使用 items(users.size) 而非 items(users, key = { it.id })，当列表增删项时 Compose 无法识别哪些项发生了变化，导致全量重组。应改为 items(users, key = { it.id }) { user -> ... }\n(2) **重复创建对象** — SimpleDateFormat 在每次重组时都创建新实例。应使用 remember 缓存：`val dateFormatter = remember { SimpleDateFormat(...) }`\n(3) **不稳定的 lambda** — clickable 中的 lambda 每次重组都创建新实例，导致 Row 的 modifier 变化触发子组件重组。应使用 remember 或将 lambda 提升为稳定引用。\n\n修复后代码片段：\n```kotlin\nitems(users, key = { it.id }) { user ->\n    val formatter = remember { SimpleDateFormat(\"yyyy-MM-dd\", Locale.getDefault()) }\n    val date = formatter.format(user.joinDate)\n    Row(modifier = Modifier.clickable { navigateToProfile(user.id) }) { ... }\n}\n```"
          },
          {
            id: "p11-compose-t1",
            type: "task",
            question: "使用 Compose 实现一个完整的功能页面",
            desc: "使用 Jetpack Compose 实现一个「GitHub 仓库搜索」页面：(1) 搜索栏（输入关键词，300ms 防抖触发搜索）；(2) 搜索结果列表（仓库名、描述、星数、语言标签，使用 LazyColumn + Coil 异步图片）；(3) 状态管理（Idle/Loading/Success/Error/Empty，使用 sealed class + viewModelScope + StateFlow）；(4) 分页加载（滚动到底部自动加载下一页）；(5) 收藏功能（使用 Room 本地存储，带收藏动画）；(6) 主题切换（亮色/暗色，使用 MaterialTheme）。",
            criteria: [
              "搜索防抖正确实现（LaunchedEffect + delay 或 debounce）",
              "LazyColumn 使用 key 且滚动流畅",
              "StateFlow 管理状态，UI 根据状态正确渲染",
              "分页加载正常，无重复请求",
              "Room 收藏数据和 Compose UI 正确同步",
              "亮色/暗色主题切换正确"
            ]
          },
          {
            id: "p11-compose-o1",
            type: "open",
            question: "请对比 Jetpack Compose 和传统 Android View 体系的核心区别。Compose 的副作用（Side Effect）有哪些类型？分别适用于什么场景？",
            ref: "**核心区别**：\n\n| 维度 | View 体系 | Compose |\n|------|----------|---------|\n| 范式 | 命令式（命令 UI 怎么变） | 声明式（描述 UI 是什么） |\n| 状态 | 分散在 View/ViewModel 中 | 单一数据源（State Hoisting） |\n| 更新 | 手动 findViewById + setText | 自动重组（State 变化驱动） |\n| 复用 | 自定义 View/ViewGroup | Composable 函数组合 |\n| 预览 | 需要 XML + 运行 | @Preview 注解即时预览 |\n| 测试 | 需要启动 Activity | 可独立测试 Composable |\n\n**Compose 副用（Side Effect）类型**：\n\n1. **LaunchedEffect**：当 key 变化时启动协程，离开 Composition 自动取消。适合：网络请求、动画、定时器等需要协程的异步操作。\n\n2. **rememberCoroutineScope**：获取 Composition 绑定的 CoroutineScope，可在非 Composable 上下文（如点击回调）中启动协程。\n\n3. **rememberUpdatedState**：保持对可变值的最新引用，避免 LaunchedEffect 中捕获旧值。适合：LaunchedEffect 长时间运行但需要访问最新状态。\n\n4. **DisposableEffect**：需要清理的副作用（类似 useEffect 的 cleanup）。适合：注册/反注册监听器、Observer 订阅管理。\n\n5. **SideEffect**：每次重组成功后执行，用于与非 Compose 代码同步状态。适合：上报分析事件、更新 ViewModel 状态。\n\n6. **produceState**：将非 Compose 状态源转为 Compose State。适合：Flow/LiveData → State 转换。\n\n7. **derivedStateOf**：从其他 State 派生新 State，只在结果变化时触发重组。适合：过滤/排序/计算等派生数据。\n\n**选择原则**：需要协程用 LaunchedEffect/rememberCoroutineScope；需要清理用 DisposableEffect；派生状态用 derivedStateOf；其他场景用 SideEffect 或 produceState。"
          }
        ]
      },
      {
        id: "android-gradle",
        title: "Gradle 构建体系",
        items: [
          {
            id: "p11-gradle-q1",
            type: "quiz",
            question: "关于 Android Gradle 的 build variant（构建变体），以下说法正确的是？",
            options: [
              "build variant 只能有一个 flavor 和一个 build type",
              "build variant = Product Flavor × Build Type，每个 variant 产生一个 APK；multi-flavor 维度可以组合出更多 variant（如 flavorDimensions: tier × env）",
              "build type 和 product flavor 功能完全相同",
              "每个 variant 必须有不同的 applicationId"
            ],
            answer: 1,
            explain:
              "Build Variant = Product Flavor × Build Type。Build Type 定义构建类型（debug/release，控制混淆、签名、调试等），Product Flavor 定义产品变体（free/paid、不同功能包、不同服务器环境）。两者组合产生所有可能的变体。例如 2 个 flavor（free/paid）× 2 个 build type（debug/release）= 4 个 variant。使用 flavorDimensions 可以支持多维 flavor：如 dimension1（free/paid）× dimension2（staging/prod）× build type（debug/release）= 8 个 variant。每个 variant 可以有独立的 applicationIdSuffix、versionNameSuffix 等配置。"
          },
          {
            id: "p11-gradle-t1",
            type: "task",
            question: "配置多环境构建体系",
            desc: "为一个中型项目配置完整的 Gradle 多环境构建体系：(1) 定义 3 个 build type（debug、staging、release），debug 使用 debug 签名 + 可调试，staging 使用测试签名 + ProGuard 规则，release 使用正式签名 + R8 混淆；(2) 定义 2 个 flavor dimension（tier: free/premium, env: dev/prod），共 4 个 flavor；(3) 为每个环境配置不同的 applicationIdSuffix、versionNameSuffix、BuildConfig 字段（如 BASE_URL）；(4) 配置 flavor 维度的源集目录（src/free、src/premium）；(5) 配置 release 签名（使用 keystore.properties 管理密钥信息）。",
            criteria: [
              "所有 build variant 配置正确（共 12 个 variant）",
              "每个环境有独立的 BuildConfig.BASE_URL",
              "flavor 源集目录结构正确",
              "release 签名配置安全（密钥信息不在版本控制中）",
              "ProGuard/R8 规则正确配置"
            ]
          },
          {
            id: "p11-gradle-o1",
            type: "open",
            question: "请解释 Android Gradle Plugin (AGP) 8.x 的主要变化，以及如何优化 Gradle 构建速度。Configuration Cache 和 Build Cache 的区别是什么？",
            ref: "**AGP 8.x 主要变化**：\n1. **Namespace 替代 package**：build.gradle 中的 namespace 替代 AndroidManifest.xml 的 package 属性\n2. **非传递性 R 类**：默认启用 nonTransitiveRClass，模块只暴露自己的 R 类，减少编译依赖\n3. **BuildConfig 默认关闭**：需要显式 buildFeatures { buildConfig = true } 才生成 BuildConfig\n4. **Java 17 要求**：需要 JDK 17 运行 Gradle\n5. **PM 支持**：更好的 Kotlin KSP 替代 KAPT\n\n**构建速度优化**：\n1. **Gradle 配置**：org.gradle.parallel=true、org.gradle.caching=true、org.gradle.jvmargs=-Xmx4g\n2. **Configuration Cache**：缓存配置阶段的结果，后续构建跳过配置阶段\n3. **Build Cache**：缓存任务输出，相同输入的任务不重新执行\n4. **增量编译**：Kotlin/Java 增量编译只重新编译变化的文件\n5. **模块化**：拆分大模块为小模块，减少每次编译的范围\n6. **依赖优化**：使用 implementation 替代 api，减少编译传递\n\n**Configuration Cache vs Build Cache**：\n- Configuration Cache：缓存「配置阶段」（解析 build.gradle、计算 task graph），避免每次都执行配置脚本。是 Gradle 层面的优化。\n- Build Cache：缓存「执行阶段」的任务输出（如 .class 文件、.dex 文件），相同输入的任务直接使用缓存结果。是任务层面的优化。\n- 两者互补：Configuration Cache 加速配置，Build Cache 加速执行，一起使用效果最佳。"
          }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────
  // Module 12: Android 系统版本与适配
  // ─────────────────────────────────────────────
  {
    id: "p12",
    title: "Android 系统版本与适配",
    level: 12,
    color: "#06b6d4",
    builtin: true,
    topics: [
      {
        id: "version-overview",
        title: "Android 版本演进概览",
        items: [
          {
            id: "p12-ver-q1",
            type: "quiz",
            question: "Android 5.0（Lollipop）引入的哪项架构变更对应用开发影响最为深远？",
            options: [
              "引入了 Kotlin 语言支持",
              "引入了 Material Design 设计语言和 ART 运行时替代 Dalvik，彻底移除 JIT 编译，改为 AOT 编译，显著提升运行性能",
              "引入了 Jetpack Compose",
              "引入了 Gradle 构建系统"
            ],
            answer: 1,
            explain:
              "Android 5.0 Lollipop 带来了两个重大变更：(1) **ART 替代 Dalvik** — ART 采用 AOT（Ahead-Of-Time）编译，在安装时将 dex 编译为本地机器码，运行时无需 JIT，大幅提升启动速度和运行性能，同时引入了 64 位支持。(2) **Material Design** — 全新的视觉设计语言，引入了 elevation（阴影层次）、ripple（水波纹）、转场动画等概念。此外 Lollipop 还引入了 JobScheduler（后台任务调度）、DocumentFile（SAF 文档访问）等 API。"
          },
          {
            id: "p12-ver-q2",
            type: "quiz",
            question: "从 Android 8.0（Oreo）开始，以下哪个行为受到了严格限制？",
            options: [
              "前台 Service 的使用",
              "后台 Service 和隐式广播受到严格限制，应用在后台时无法自由启动 Service，静态注册的广播接收器大部分被禁用",
              "所有网络请求都必须使用 HTTPS",
              "不再支持 Java 语言开发"
            ],
            answer: 1,
            explain:
              "Android 8.0 开始了系统性的后台执行限制：(1) **后台 Service 限制** — 处于后台的应用无法使用 startService() 启动 Service，必须使用 startForegroundService() 并在 5 秒内调用 startForeground() 显示通知，否则抛出 ANR。(2) **隐式广播限制** — 大部分系统广播（如 BOOT_COMPLETED 除外）不再能通过 AndroidManifest 静态注册接收，必须使用 Context.registerReceiver() 动态注册。(3) **后台位置限制** — 后台应用获取位置信息的频率被降低。这些限制的目的是减少后台应用对系统资源的消耗，提升电池续航。"
          },
          {
            id: "p12-ver-t1",
            type: "task",
            question: "梳理 Android 版本关键变更时间线",
            desc: "制作一个 Android 版本关键变更的思维导图或文档，涵盖 Android 5.0 到 Android 15 的每个大版本（选择对开发者影响最大的变更），每个版本列出 3-5 个关键 API 变更或行为限制。重点标注「破坏性变更」（如需要适配才能正常运行的变化）和「新增能力」（如新功能、新 API）。",
            criteria: [
              "覆盖 Android 5.0 ~ 15 的每个大版本",
              "每个版本至少 3 个关键变更",
              "破坏性变更和新增能力有明确标注",
              "关注对开发者实际影响最大的变更（如权限、后台限制、存储等）"
            ]
          },
          {
            id: "p12-ver-o1",
            type: "open",
            question: "Android 系统版本碎片化是长期存在的问题。请分析：(1) 为什么 Android 相比 iOS 碎片化更严重？(2) Google 采取了哪些措施来缓解碎片化？(3) 作为应用开发者，如何制定合理的 minSdkVersion 和 targetSdkVersion 策略？",
            ref: "**碎片化原因**：(1) OEM 厂商众多（三星、小米、OPPO 等），各自定制 ROM，系统更新需要厂商适配推送；(2) 芯片厂商的驱动更新滞后；(3) 运营商参与审核（部分市场）；(4) 设备种类繁多，低价设备厂商缺乏更新动力；(5) 用户可能拒绝系统更新。\n\n**Google 的缓解措施**：(1) Project Treble（Android 8.0）— 将 Android 框架与厂商 HAL 分离，使系统更新不再依赖芯片厂商驱动更新；(2) Project Mainline（Android 10）— 将核心系统组件模块化（APEX 模块），可通过 Google Play 系统更新推送，无需完整 OTA；(3) GMS 认证要求 — 强制要求预装 Google 服务的设备必须满足 CDD 兼容性要求；(4) Play Console 的 targetSdkVersion 要求 — 强制要求上架应用达到指定 targetSdkVersion；(5) Android Go — 为低端设备提供精简版系统。\n\n**minSdkVersion 策略**：根据目标市场的设备分布决定。一般原则：(1) 跟随主流 — 覆盖 90%+ 的活跃设备；(2) 参考Android Studio 的推荐值；(3) B2B 应用可根据客户设备决定；(4) 每年提升一次，通常在主要版本发布 2-3 年后。(2024 年推荐 minSdk 24+)\n\n**targetSdkVersion 策略**：(1) 必须满足 Google Play 的强制要求（每年提升）；(2) 新项目直接设为最新稳定版；(3) 老项目每年至少提升一次；(4) targetSdk 提升前必须测试所有行为变更的适配。"
          }
        ]
      },
      {
        id: "permission-evolution",
        title: "权限体系演进",
        items: [
          {
            id: "p12-perm-q1",
            type: "quiz",
            question: "Android 6.0 引入的运行时权限模型与之前的安装时权限模型的核心区别是什么？",
            options: [
              "运行时权限让用户在每次使用功能时都要授权",
              "安装时权限在安装时一次性授予所有声明权限；运行时权限将危险权限（如位置、相机、存储）分为安装时自动授予和运行时用户确认两类，危险权限必须在使用时弹窗请求用户授权",
              "运行时权限不再需要在 AndroidManifest 中声明",
              "所有权限都变成了可选的，用户可以拒绝任何权限"
            ],
            answer: 1,
            explain:
              "Android 6.0 将权限分为两类：(1) **普通权限（Normal Permissions）** — 如 INTERNET、VIBRATE、SET_WALLPAPER，安装时自动授予，无需用户确认。(2) **危险权限（Dangerous Permissions）** — 如 CAMERA、LOCATION、READ_CONTACTS，必须在运行时通过 requestPermissions() 弹窗请求用户授权，用户可以拒绝。危险权限按权限组（Permission Group）归类，同组内授权一个等于授权整个组（Android 11 后此行为已改变）。用户还可以在设置中随时撤销已授权的权限。这个模型要求开发者必须处理「权限被拒绝」的场景，提供降级功能或引导用户授权。"
          },
          {
            id: "p12-perm-q2",
            type: "quiz",
            question: "关于 Android 13（API 33）的通知权限变更，以下说法正确的是？",
            options: [
              "Android 13 取消了所有通知功能",
              "Android 13 新增了 POST_NOTIFICATIONS 运行时权限，应用必须先获得用户授权才能发送通知，否则通知会被静默丢弃",
              "通知权限属于普通权限，自动授予",
              "只有系统应用才能发送通知"
            ],
            answer: 1,
            explain:
              "Android 13 引入了 POST_NOTIFICATIONS（危险权限），所有发送通知的应用必须在 AndroidManifest 声明该权限，并在运行时请求用户授权。如果用户拒绝或未授权，应用发出的通知会被系统静默丢弃，不会显示。首次请求时会弹出系统权限对话框；如果用户选择「不再询问」并拒绝，后续需要引导用户到系统设置页面手动开启。这要求开发者必须：(1) 在合适时机请求通知权限（如用户点击「开启通知」按钮时）；(2) 处理权限拒绝的降级场景；(3) 使用 shouldShowRequestPermissionRationale 判断是否需要展示权限说明。"
          },
          {
            id: "p12-perm-c1",
            type: "code",
            question: "以下权限请求代码在 Android 11+ 上行为异常（第二次请求不弹窗），请找出原因：",
            code: `// 在 Activity 中请求位置权限
if (ContextCompat.checkSelfPermission(this, Manifest.permission.ACCESS_FINE_LOCATION)
        != PackageManager.PERMISSION_GRANTED) {
    // 直接请求，没有检查 shouldShowRequestPermissionRationale
    requestPermissions(
        arrayOf(Manifest.permission.ACCESS_FINE_LOCATION),
        REQUEST_CODE_LOCATION
    )
}

override fun onRequestPermissionsResult(requestCode: Int, permissions: Array<out String>,
    grantResults: IntArray) {
    if (requestCode == REQUEST_CODE_LOCATION) {
        if (grantResults.isNotEmpty() && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
            // 权限授予
        } else {
            // 权限拒绝，直接再次请求
            requestPermissions(permissions, REQUEST_CODE_LOCATION)
        }
    }
}`,
            options: [
              "requestPermissions 方法在 Android 11 上已被废弃",
              "Android 11 引入了「几次拒绝后永久拒绝」机制：用户拒绝两次后，系统不再弹出权限对话框，直接返回 DENIED，必须引导用户到设置页面手动开启",
              "onRequestPermissionsResult 在 Android 11 上不再被调用",
              "位置权限在 Android 11 上不再需要请求"
            ],
            answer: 1,
            explain:
              "Android 11 的新行为：如果用户在权限对话框中点击了两次「拒绝」（包括选择「仅限本次」后再次请求又被拒绝），系统会将该权限标记为「永久拒绝」。此后无论调用多少次 requestPermissions()，系统都不会再弹出权限对话框，而是直接在 onRequestPermissionsResult 中返回 DENIED。\n\n正确处理方式：(1) 使用 shouldShowRequestPermissionRationale() 判断——如果返回 false 且权限未授予，说明用户已永久拒绝；(2) 此时需要显示一个对话框解释为什么需要该权限，并提供一个按钮跳转到应用设置页面（Settings.ACTION_APPLICATION_DETAILS_SETTINGS）；(3) 在 onActivityResult 中检查用户是否手动开启了权限。\n\n推荐使用 Activity Result API（registerForActivityResult）替代旧的 requestPermissions/onRequestPermissionsResult。"
          },
          {
            id: "p12-perm-t1",
            type: "task",
            question: "实现一个完善的权限请求框架",
            desc: "实现一个权限请求框架，覆盖以下场景：(1) 首次请求——弹出系统权限对话框；(2) 用户拒绝后——展示权限说明（shouldShowRequestPermissionRationale），解释为什么需要该权限后再次请求；(3) 永久拒绝（Android 11+）——引导用户到应用设置页面手动开启；(4) 多权限请求——同时请求位置和相机权限，分别处理各权限结果；(5) 使用 Activity Result API（registerForActivityResult）替代旧的 requestPermissions；(6) 封装为可复用的 PermissionHelper 工具类。",
            criteria: [
              "三种权限状态（授予/拒绝/永久拒绝）正确区分和处理",
              "shouldShowRequestPermissionRationale 逻辑正确",
              "永久拒绝时引导跳转设置页面",
              "多权限请求结果逐一处理",
              "使用现代 Activity Result API"
            ]
          }
        ]
      },
      {
        id: "storage-evolution",
        title: "存储访问演进",
        items: [
          {
            id: "p12-store-q1",
            type: "quiz",
            question: "Android 10 引入的「分区存储（Scoped Storage）」的核心变化是什么？",
            options: [
              "完全禁止应用访问任何外部存储",
              "应用只能访问自己专属目录（getExternalFilesDir）和用户通过 SAF 选择的文件，不再能通过文件路径自由读写公共目录（如 DCIM、Downloads）",
              "分区存储只影响 SD 卡，不影响内部存储",
              "分区存储只对 targetSdkVersion >= 29 的应用生效，其他应用不受影响"
            ],
            answer: 1,
            explain:
              "Scoped Storage 的核心变化：(1) **私有目录无限制** — 应用在自己的专属目录（getExternalFilesDir / getExternalCacheDir）中可以自由读写，无需权限。(2) **公共目录受限** — 不再能通过文件路径直接读写 DCIM、Pictures、Downloads 等公共目录，必须通过 MediaStore API（读写媒体文件）或 Storage Access Framework / SAF（用户选择文件）。(3) **READ_EXTERNAL_STORAGE 失效** — Android 13 后该权限不再有任何效果，被细分为 READ_MEDIA_IMAGES、READ_MEDIA_VIDEO、READ_MEDIA_AUDIO。(4) **媒体文件归属** — 应用只能修改/删除自己创建的媒体文件，修改其他应用的媒体文件需要用户确认。过渡策略：Android 10 可通过 requestLegacyExternalStorage=true 临时兼容，Android 11 强制启用。"
          },
          {
            id: "p12-store-c1",
            type: "code",
            question: "以下代码在 Android 11+ 上无法访问公共目录中的图片，请找出原因并修复：",
            code: `// 尝试读取外部存储的图片
fun loadProfileImage(context: Context, imagePath: String): Bitmap? {
    // 使用文件路径直接读取
    val file = File(imagePath)  // 如 /storage/emulated/0/DCIM/photo.jpg
    if (!file.exists()) return null
    
    return BitmapFactory.decodeFile(file.absolutePath)
}

// 请求权限
fun requestStoragePermission(activity: Activity) {
    if (ContextCompat.checkSelfPermission(activity, Manifest.permission.READ_EXTERNAL_STORAGE)
            != PackageManager.PERMISSION_GRANTED) {
        activity.requestPermissions(arrayOf(Manifest.permission.READ_EXTERNAL_STORAGE), 100)
    }
}`,
            options: [
              "BitmapFactory.decodeFile 在 Android 11 上已被废弃",
              "Android 11 强制启用分区存储，不能通过文件路径直接访问公共目录，应使用 MediaStore API 查询图片的 Content URI，再通过 ContentResolver 打开 InputStream 解码；READ_EXTERNAL_STORAGE 在 Android 13+ 已失效，应使用 READ_MEDIA_IMAGES",
              "文件路径格式不正确，应该使用 Environment.getExternalStorageDirectory()",
              "只需添加 WRITE_EXTERNAL_STORAGE 权限即可"
            ],
            answer: 1,
            explain:
              "Android 11 强制启用分区存储：(1) 不能再通过 File 路径直接访问公共目录（如 /storage/emulated/0/DCIM/），即使有 READ_EXTERNAL_STORAGE 权限也会返回文件不存在或 Permission Denied。(2) 正确做法是使用 MediaStore API：\n```kotlin\nval projection = arrayOf(MediaStore.Images.Media._ID)\nval selection = \"${MediaStore.Images.Media.DISPLAY_NAME} = ?\"\nval selectionArgs = arrayOf(\"photo.jpg\")\nval cursor = contentResolver.query(MediaStore.Images.Media.EXTERNAL_CONTENT_URI, projection, selection, selectionArgs, null)\ncursor?.use {\n    if (it.moveToFirst()) {\n        val id = it.getLong(it.getColumnIndexOrThrow(MediaStore.Images.Media._ID))\n        val uri = ContentUris.withAppendedId(MediaStore.Images.Media.EXTERNAL_CONTENT_URI, id)\n        val bitmap = BitmapFactory.decodeStream(contentResolver.openInputStream(uri))\n    }\n}\n```\n(3) Android 13+ 应使用 READ_MEDIA_IMAGES 替代 READ_EXTERNAL_STORAGE。"
          },
          {
            id: "p12-store-t1",
            type: "task",
            question: "实现兼容多版本的照片选择与保存功能",
            desc: "实现一个照片功能模块，要求：(1) 选择照片——Android 13+ 使用 Photo Picker（ActivityResultContracts.PickVisualMedia），Android 10-12 使用 SAF（ACTION_OPEN_DOCUMENT），Android 9 及以下使用 MediaStore 查询 + 权限请求；(2) 保存照片到公共目录——使用 MediaStore.insert() 写入 Pictures 目录，兼容 Android 10+ 的分区存储；(3) 删除自己保存的照片——使用 MediaStore.delete() 或 ContentResolver.delete()；(4) 处理 Android 14 的新限制：部分照片/视频的权限需要用户逐个授权（READ_MEDIA_VISUAL_USER_SELECTED）。",
            criteria: [
              "三种 Android 版本的图片选择方案正确实现和兼容",
              "MediaStore 保存照片到公共目录正确实现",
              "Android 14 的部分媒体权限正确处理",
              "权限请求和降级逻辑完善",
              "代码有清晰的版本兼容注释"
            ]
          },
          {
            id: "p12-store-o1",
            type: "open",
            question: "请梳理 Android 存储访问从 Android 4.4 到 Android 14 的完整演进历程，包括每个版本的关键变化、对开发者的影响，以及迁移策略。",
            ref: "**Android 4.4（KitKat）**：\n- 引入 Storage Access Framework（SAF），提供系统级文件选择器\n- READ_EXTERNAL_STORAGE 首次成为危险权限\n\n**Android 5.0-9.0**：\n- 基本存储模型不变\n- READ/WRITE_EXTERNAL_STORAGE 管理外部存储访问\n- 应用可以自由读写公共目录\n\n**Android 10（Q）**：\n- **引入分区存储（Scoped Storage）**\n- 应用只能自由访问 getExternalFilesDir() 专属目录\n- 公共目录（DCIM、Pictures 等）必须通过 MediaStore 或 SAF 访问\n- 提供 requestLegacyExternalStorage=true 临时兼容\n\n**Android 11（R）**：\n- **强制启用分区存储**，requestLegacyExternalStorage 不再生效\n- 引入 MANAGE_EXTERNAL_STORAGE 权限（仅文件管理器类应用可申请）\n- MediaStore 创建的文件其他应用默认不可见（IS_PENDING 标记）\n\n**Android 12（S）**：\n- 近乎不变的存储模型\n- 优化了 MediaStore 性能\n\n**Android 13（T）**：\n- **READ_EXTERNAL_STORAGE 失效**\n- 新增细粒度媒体权限：READ_MEDIA_IMAGES、READ_MEDIA_VIDEO、READ_MEDIA_AUDIO\n- 引入 Photo Picker（系统级图片/视频选择器）\n- 通知需要 POST_NOTIFICATIONS 权限\n\n**Android 14（U）**：\n- **部分媒体权限**（READ_MEDIA_VISUAL_USER_SELECTED）\n- 用户可以选择「选择照片和视频」而非授予全部媒体访问权限\n- 应用只能访问用户选中的照片/视频，其他返回空结果\n- 需要定期重新请求权限（用户可能随时修改选择）\n\n**迁移策略**：\n1. 使用 MediaStore API 替代 File 路径访问公共目录\n2. 使用 Content URI 替代 file:// URI\n3. 使用 SAF/Photo Picker 替代直接文件访问\n4. 应用私有数据存 getExternalFilesDir()\n5. 文件管理器类应用使用 MANAGE_EXTERNAL_STORAGE"
          }
        ]
      },
      {
        id: "background-evolution",
        title: "后台执行限制演进",
        items: [
          {
            id: "p12-bg-q1",
            type: "quiz",
            question: "Android 12 引入的前台 Service 通知延迟（Foreground Service Launch Restrictions）的核心变化是什么？",
            options: [
              "完全禁止使用前台 Service",
              "从后台启动前台 Service 受到严格限制，只有在特定场景（如高优先级 FCM、用户交互触发等）才允许从后台启动前台 Service，否则会抛出 ForegroundServiceStartNotAllowedException",
              "前台 Service 不再需要显示通知",
              "所有 Service 都必须改为 JobScheduler"
            ],
            answer: 1,
            explain:
              "Android 12 的前台 Service 限制：应用从后台（没有任何可见 Activity）启动前台 Service 时，系统会抛出 ForegroundServiceStartNotAllowedException，除非满足以下豁免条件之一：(1) 从高优先级 FCM 消息触发；(2) 从用户交互（如通知点击、Widget 点击）触发；(3) 从蓝牙/USB 等硬件事件触发；(4) 从系统广播（如 BOOT_COMPLETED）触发；(5) 应用是设备所有者或_profile 所有者。如果不满足豁免条件，应使用 WorkManager 替代前台 Service 处理后台任务。这个限制的目的是防止应用在后台偷偷运行长时间任务消耗电池。"
          },
          {
            id: "p12-bg-q2",
            type: "quiz",
            question: "WorkManager 相比 JobScheduler 和 AlarmManager 的核心优势是什么？",
            options: [
              "WorkManager 的 API 更简单，只有一行代码",
              "WorkManager 兼容 Android 6.0+（内部自动选择 JobScheduler/AlarmManager），支持约束条件（网络/电量/存储）、重试策略、链式任务、观察任务状态，且保证任务执行（即使应用退出或设备重启）",
              "WorkManager 性能一定比 JobScheduler 更好",
              "WorkManager 只能执行一次性任务，不能执行周期性任务"
            ],
            answer: 1,
            explain:
              "WorkManager 是 Jetpack 提供的后台任务调度库，核心优势：(1) **兼容性** — API 23+ 自动使用 JobScheduler，API 14-22 使用 AlarmManager + BroadcastReceiver，开发者无需关心平台差异。(2) **约束条件** — 支持网络类型（WiFi/计费/任意）、电量（不为低电量）、存储（空间充足）、设备空闲等约束，满足条件才执行。(3) **保证执行** — 任务持久化到数据库，应用退出或设备重启后仍会执行（不保证执行时间）。(4) **重试策略** — 支持 backoff criteria（指数退避或线性退避）。(5) **链式任务** — 支持任务依赖和并行组合。(6) **观察状态** — 通过 LiveData/Flow 观察 WorkInfo 状态变化。(7) **周期性任务** — 支持最小间隔 15 分钟的周期性执行。适用场景：数据同步、日志上传、缓存清理、定期备份等不需要立即执行的延迟任务。"
          },
          {
            id: "p12-bg-t1",
            type: "task",
            question: "将后台任务迁移到 WorkManager",
            desc: "将一个使用 Service + AlarmManager 实现的后台日志上传功能迁移到 WorkManager：(1) 创建 UploadLogWorker（继承 CoroutineWorker），在 doWork 中执行网络上传，返回 Result.success()/retry()/failure()；(2) 配置约束条件（需要网络连接、电量不为低）；(3) 配置重试策略（指数退避，初始 30 秒，最大 1 小时）；(4) 设置为 PeriodicWork（每 4 小时执行一次）；(5) 使用 UniqueWork 避免重复调度；(6) 在 UI 中观察 WorkInfo 状态并显示上次同步时间；(7) 处理 Android 12+ 的后台启动限制。",
            criteria: [
              "CoroutineWorker 正确实现，doWork 中使用协程发起网络请求",
              "约束条件正确配置（网络 + 电量）",
              "重试策略使用指数退避",
              "PeriodicWork 间隔不小于 15 分钟",
              "UniqueWork 确保不重复调度",
              "WorkInfo 状态观察正确"
            ]
          },
          {
            id: "p12-bg-o1",
            type: "open",
            question: "请梳理 Android 后台执行限制从 Android 6.0 到 Android 14 的完整演进。每一步限制了什么？开发者应该使用什么替代方案？",
            ref: "**Android 6.0（M）**：\n- 引入 Doze 模式：设备静止一段时间后进入低电耗模式，延迟后台任务、网络访问、Alarm\n- App Standby：不活跃应用限制网络访问频率\n- 替代方案：使用 JobScheduler 替代 AlarmManager 调度后台任务\n\n**Android 7.0（N）**：\n- Doze 模式增强：移动时也可进入轻度 Doze\n- 移除 CONNECTIVITY_ACTION、ACTION_NEW_PICTURE 等隐式广播\n- 替代方案：JobScheduler + ContentObserver\n\n**Android 8.0（O）**：\n- 后台 Service 限制：后台应用无法 startService，必须 startForegroundService + 5秒内 startForeground\n- 隐式广播进一步限制：大部分系统广播不再支持静态注册\n- 替代方案：JobScheduler、前台 Service、动态注册广播\n\n**Android 9.0（P）**：\n- 后台应用无法访问麦克风、相机、通话记录\n- App Standby Buckets：按使用频率将应用分为 Active/Working Set/Frequent/Rare，限制后台资源\n- 替代方案：前台 Service，减少后台监听需求\n\n**Android 10（Q）**：\n- 后台位置需要 ACCESS_BACKGROUND_LOCATION 权限\n- 后台启动 Activity 受限\n- 替代方案：高优先级 FCM + 全屏 Intent 通知\n\n**Android 11（R）**：\n- 后台位置权限需先获得前台位置权限\n- 包名可见性限制（需要 queries 声明）\n- 替代方案：WorkManager、前台 Service\n\n**Android 12（S）**：\n- 前台 Service 从后台启动受限（ForegroundServiceStartNotAllowedException）\n- 精确 Alarm 需要使用 SCHEDULE_EXACT_ALARM 权限（Android 13 改为 USE_EXACT_ALARM）\n- 前台 Service 通知延迟（10 秒后才显示）\n- 替代方案：WorkManager、高优先级 FCM\n\n**Android 13（T）**：\n- 后台任务进一步限制\n- 通知需要 POST_NOTIFICATIONS 权限\n- 替代方案：WorkManager + 前台 Service（仅在豁免场景）\n\n**Android 14（U）**：\n- 前台 Service 类型必须声明（foregroundServiceType）\n- 部分类型需要额外权限（如 health 需要 HIGH_SAMPLING_RATE_SENSORS）\n- 后台启动 Activity 更严格的限制\n- 替代方案：WorkManager 为主，前台 Service 仅在声明类型和权限后使用\n\n**总结趋势**：\n- 后台执行越来越受限，从「自由后台执行」到「必须有合理理由」\n- 核心替代方案：WorkManager（延迟任务）、前台 Service（用户可感知的任务）、高优先级 FCM（服务器推送）\n- 设计原则：能不做就不做，能延迟就延迟，必须做就告诉用户"
          }
        ]
      }
    ]
  }
];
