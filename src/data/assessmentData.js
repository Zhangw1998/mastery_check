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
  }
];
