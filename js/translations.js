// 翻译数据
const translations = {
    // 中文翻译
    zh: {
        // 导航
        "subtitle": "GEMINI模型-Gemini 2.5 Pro最新版-在线体验",
        "nav-chat": "对话",
        "nav-capabilities": "能力介绍",
        "nav-reviews": "用户评价",
        
        // 侧边栏菜单
        "menu-login": "点击登录",
        "menu-chat": "对话",
        "menu-newchat": "新建对话",
        "menu-history": "历史对话",
        "menu-capabilities": "核心功能",
        "menu-performance": "性能表现",
        "menu-presets": "预设提示",
        
        // 对话页面
        "welcome-message": "你好！我是 Gemini 2.5 Pro，有什么我可以帮助你的吗？",
        "input-placeholder": "输入问题...",
        "scenarios-title": "使用场景",
        "scenario-writing": "写作助手",
        "scenario-learning": "学习导师",
        "scenario-coding": "代码助手",
        "scenario-travel": "旅行规划",
        "scenario-image": "图像分析",
        "scenario-summary": "内容总结",
        "scenario-fiction": "科幻创作",
        "scenario-ml": "机器学习",
        "scenario-social": "自媒体营销",
        "scenario-scriptwriting-title": "影视剧本",
        "scenario-scriptwriting-desc": "AI辅助创作，打造精彩故事",
        
        // 能力介绍页面
        "performance-title": "性能表现",
        "mmlu-desc": "在多任务语言理解基准测试中，Gemini 2.5 Pro 取得了90.0%的成绩，超越了人类专家水平。",
        "humaneval-desc": "在代码生成能力测试中，Gemini 2.5 Pro 达到了94.4%的通过率，远超前代模型。",
        "gsm8k-desc": "在数学推理能力测试中，Gemini 2.5 Pro 解题准确率达到97.7%，创下新纪录。",
        "core-capabilities": "核心功能",
        "core-capabilitie": "核心能力",
        "conversation-title": "多轮对话能力",
        "conversation-desc": "Gemini 2.5 Pro 能够维持长时间、复杂的对话，保持上下文连贯性，理解隐含信息。",
        "multimodal-title": "多模态理解",
        "multimodal-desc": "能够同时处理文本、图像、音频和视频输入，实现跨模态内容理解与生成。",
        "code-title": "代码能力",
        "code-desc": "支持多种编程语言的代码生成、调试和优化，理解复杂算法和系统架构。",
        "creative-title": "创意思维",
        "creative-desc": "具备创造性思维能力，可以生成原创内容、创意写作和艺术创作辅助。",
        "comparison-title": "2.5 Pro 相比上一代的提升",
        "table-capability": "能力",
        "table-improvement": "提升",
        "table-context": "上下文窗口",
        "table-multimodal": "多模态理解",
        "table-basic": "基础理解",
        "table-advanced": "深度理解与推理",
        "table-significant": "显著提升",
        "table-reasoning": "推理能力",
        "table-good": "良好",
        "table-expert": "接近人类专家",
        "table-code-gen": "代码生成",
        "table-knowledge": "知识更新",
        "table-realtime": "2024年实时",
        "table-current": "更新至今",
        
        // 预设提示
        "presets-title": "预设提示",
        
        // 用户评价页面
        "user-reviews": "用户真实评价",
        "filter-all": "全部评价",
        "filter-coding": "编程能力",
        "filter-understanding": "理解能力",
        "filter-image": "图像处理",
        "reviewer-zhang": "何RE",
        "review-1": "作为一名资深开发者，我对Gemini 2.5 Pro的代码能力印象深刻。它不仅能生成高质量的代码，还能理解复杂的系统架构，并提供有价值的重构建议。它帮我解决了一个困扰了几天的并发问题，分析得非常透彻。",
        "tag-coding-assistant": "编程助手",
        "tag-debugging": "代码调试",
        "tag-system-design": "系统设计",
        "reviewer-wang": "无路可回",
        "review-2": "Gemini 2.5 Pro在多语言编程方面表现出色。我用它生成了Python、JavaScript和Rust代码，质量都很高。特别是它对算法优化的建议，帮我将一个O(n²)的算法优化到了O(n log n)，性能提升明显。",
        "tag-algorithm": "算法优化",
        "tag-multilingual": "多语言支持",
        "reviewer-li": "灰灰",
        "review-3": "Gemini 2.5 Pro 的文生图功能太惊艳了！我只需要简单的文字描述，就能生成非常富有创意和细节的图像。无论是想快速可视化一个概念，还是创作独特的数字艺术，它都能满足我的需求。",
        "tag-research": "学术研究",
        "tag-expertise": "专业知识",
        "tag-reasoning": "逻辑推理",
        "tag-tti": "文生图",
        "tag-creative-image": "创意图像",
        "tag-ai-art": "AI艺术",
        "reviewer-wu": "ISFP婷",
        "review-iti-wu": "我经常使用 Gemini 2.5 Pro 的图生图功能来编辑和增强我的设计作品。上传一张图片，就能轻松转换艺术风格，或者进行精细调整，比如改变光照、添加元素。对于设计师来说非常实用！",
        "tag-iti": "图生图",
        "tag-image-edit": "图像编辑",
        "tag-style-transfer": "风格转换",
        "reviewer-qian": "sijer",
        "review-6": "用 Gemini 2.5 Pro 处理数据和生成 Python 脚本简直是享受。它能快速理解复杂的分析需求，生成的代码质量很高，大大提高了我的工作效率。",
        "tag-coding": "编程能力",
        "tag-data-analysis": "数据分析",
        "tag-python": "Python",
        "reviewer-chen": "就是那块小饼干",
        "review-4": "我在教学中使用Gemini 2.5 Pro辅助备课和答疑。它能根据学生的不同理解水平调整解释方式，将复杂概念简化为易懂的比喻。它对问题的理解非常准确，即使是含糊不清的提问也能把握核心意图。",
        "tag-education": "教育辅助",
        "tag-explanation": "概念解释",
        "reviewer-zhao": "赵博士",
        "review-5": "Gemini 2.5 Pro的图像理解能力非常强大。我上传了一些设计草图，它不仅能准确描述内容，还能给出专业的设计建议和改进方向。它甚至能识别图像中的设计风格和参考元素，这对我的创作过程很有帮助。",
        "tag-image-analysis": "图像分析",
        "tag-design": "设计辅助",
        "tag-creative": "创意建议",
        "reviewer-zhou": "是小左呀",
        "review-6": "在医学影像辅助分析方面，Gemini 2.5 Pro表现出色。它能从X光片和CT图像中识别出关键特征，并提供初步的分析意见。虽然不能替代专业诊断，但作为辅助工具，它的准确性和详细程度令人印象深刻。",
        "tag-medical": "医学影像",
        "tag-analysis": "专业分析",
        "overall-rating": "综合评分",
        "rating-count": "基于 {1269} 条评价",
        "rating-coding": "编程能力",
        "rating-understanding": "理解能力",
        "rating-image": "图像处理",
        "rating-speed": "响应速度",
        "rating-creative": "创意能力",
        "review-text-4": "Gemini 2.5 Pro has significantly improved my workflow. Its ability to understand context and provide relevant information is outstanding.",
        "reviewer-name-4": "Software Engineer - Alex P.",
        "tag-workflow": "Workflow",
        "tag-context": "Contextual Understanding",
        "reviewer-name-5": "创意写手小明",
        "review-text-5": "Gemini 2.5 Pro 对我的写作帮助巨大！它不仅能理解我那些天马行空的想法，还能提供非常精彩的续写建议和情节构思，太棒了！",
        "tag-creative": "创意写作",
        "tag-brainstorming": "头脑风暴",
        "reviewer-name-6": "数据科学家李华",
        "review-text-6": "用 Gemini 2.5 Pro 处理数据和生成 Python 脚本简直是享受。它能快速理解复杂的分析需求，生成的代码质量很高，大大提高了我的工作效率。",
        "tag-data-analysis": "数据分析",
        "tag-python": "Python",
        "reviewer-name-7": "摄影师王刚",
        "review-text-7": "尝试让 Gemini 2.5 Pro 分析我的摄影作品，它能准确识别构图元素，并给出非常专业的色彩和光影调整建议。虽然不能直接修图，但对我启发很大。",
        "tag-image-processing": "图像处理",
        "tag-photography": "摄影",
        "tag-analysis": "分析能力",
        "rating-overall": "综合评分",
        
        // New Review 8 (overall 10th review)
        "reviewer-name-8": "学生小李",
        "reviewer-ma": "自由的小马驹",
        "review-text-8": "用Gemini来学习和理解复杂的概念真是太棒了，解释得通俗易懂，比教科书有趣多了！",
        "tag-learning-tool": "学习工具",
        "tag-student-friendly": "学生友好",
        
        // 页脚
        "footer-text": "本站仅用于演示目的",

        // Sub-prompts for scenario buttons
        "subprompt-writing-1": "写一篇关于人工智能伦理的博客文章，探讨其潜在风险与社会责任。",
        "subprompt-writing-2": "帮我构思一个关于平行宇宙的科幻短篇故事大纲，包含主要角色和核心冲突。",
        "subprompt-writing-3": "将这段复杂的学术摘要改写成一段简洁明了、适合大众阅读的科普介绍。",
        "subprompt-learning-1": "解释什么是区块链技术，并列举三个实际应用案例。",
        "subprompt-learning-2": "简述光合作用的基本原理及其对地球生态系统的重要性。",
        "subprompt-learning-3": "描述一下蝴蝶效应的概念，并举例说明它在现实生活中的体现。",
        "subprompt-coding-1": "用Python写一个函数，实现快速排序算法，并添加适当的注释。",
        "subprompt-coding-2": "解释JavaScript中的异步编程模型，特别是 async/await 的用法和优势。",
        "subprompt-coding-3": "如何优化这个SQL查询以提高其在大型数据集上的执行效率？ SELECT ... FROM ... WHERE ... GROUP BY ...",
        "subprompt-travel-1": "推荐三个适合家庭带小孩同游的国内目的地，并说明理由。",
        "subprompt-travel-2": "为一个为期七天的法国深度文化探索之旅制定详细行程计划，包含交通和住宿建议。",
        "subprompt-travel-3": "独自去东南亚背包旅行，有哪些必须注意的安全事项和文化礼仪？",
        "subprompt-scriptwriting-1": "帮我构思一个反乌托邦题材的电影剧本大纲，主角是一个试图颠覆体制的黑客。",
        "subprompt-scriptwriting-2": "为一个古装喜剧角色设计三句既搞笑又能体现其性格特点的标志性台词。",
        "subprompt-scriptwriting-3": "这个悬疑故事情节如何发展能制造更多转折并保持观众的紧张感？",
        "subprompt-summary-1": "总结这篇关于全球气候变化的深度报道的主要论点、证据和提出的解决方案。",
        "subprompt-summary-2": "从这份公司年度财务报告中提取关键的营收、利润及增长率数据，并进行简要分析。",
        "subprompt-summary-3": "将这本非虚构类书籍的核心思想浓缩成一个500字左右的精炼摘要。",
        "subprompt-fiction-1": "写一个发生在赛博朋克未来都市的侦探故事的开头，引入神秘的委托人和案件线索。",
        "subprompt-fiction-2": "创建一个名为'艾瑞多尼亚'的奇幻魔法世界设定，包括独特的种族、魔法体系和地理环境。",
        "subprompt-fiction-3": "描写一个年轻探险家在古老神庙中意外唤醒守护神兽的紧张刺激场景。",
        "subprompt-ml-1": "解释深度学习中卷积神经网络（CNN）的工作原理及其在图像识别领域的应用。",
        "subprompt-ml-2": "什么是自然语言处理（NLP）？列举三个NLP在日常生活中的常见应用。",
        "subprompt-ml-3": "如何评估一个分类机器学习模型的性能？请说明至少三种评估指标及其含义。",
        "subprompt-social-1": "为一款新上市的环保咖啡品牌撰写三条风格各异但都具吸引力的小红书推广文案。",
        "subprompt-social-2": "策划一个能够引发Z世代用户病毒式传播的抖音挑战赛创意，结合当下热点。",
        "subprompt-social-3": "如何通过内容营销策略有效提升一个B2B科技公司的微信公众号关注度和用户参与度？",
        "subprompt-tti-1": "生成一张写实风格的图片：一只金毛犬在盛开的樱花树下打盹，阳光斑驳。",
        "subprompt-tti-2": "创作一幅具有蒸汽朋克美学的画作：一个巨大的黄铜机械章鱼正在攀爬古老的灯塔。",
        "subprompt-tti-3": "根据描述'孤独的宇航员站在红色星球的山丘上，遥望远方的双子蓝色太阳'生成一张科幻插画。",
        "subprompt-iti-1": "将这张上传的城市风景照片转换成日本浮世绘风格的艺术作品。",
        "subprompt-iti-2": "参考这张人物肖像，为其添加一副复古飞行员护目镜，并调整整体色调为棕褐色。",
        "subprompt-iti-3": "增强这张美食照片的色彩鲜艳度和对比度，使其看起来更加诱人，并添加微妙的景深效果。",
        "subprompt-img-analyze-detail-1": "分析此图，它可能是由怎样的提示词生成的？",
        "subprompt-img-analyze-detail-2": "告诉我生成这张图片最关键的描述语。",
        "subprompt-img-analyze-detail-3": "如果用AI绘画，生成此图的咒语可能是什么？",

        // 9th Scenario Button Placeholder
        "scenario-placeholder": "敬请期待",

        // Scenario Descriptions - ZH
        "scenario-writing-desc": "专业文案，一键生成",
        "scenario-learning-desc": "解答疑惑，高效辅导",
        "scenario-coding-desc": "智能编程，提升效率",
        "scenario-travel-desc": "行程定制，轻松出行",
        "scenario-image-desc": "洞察图片，提取信息",
        "scenario-summary-desc": "提炼要点，快速掌握",
        "scenario-fiction-desc": "奇思妙想，构建未来",
        "scenario-ml-desc": "模型构建，数据洞察",
        "scenario-social-desc": "爆款文案，玩转流量",
        "scenario-scriptwriting-desc": "AI辅助创作，打造精彩故事",

        "scenario-tti-title": "文生图",
        "scenario-tti-desc": "根据文本描述生成图像",
        "scenario-iti-title": "图生图",
        "scenario-iti-desc": "基于现有图像进行修改和创作",
        "scenario-img-analyze-detail-title": "图像提示",
        "scenario-img-analyze-detail-desc": "深入理解和分析图像内容",

        "subprompt-tti-1": "生成一张 '未来城市的黄昏' 的图片",
        "subprompt-tti-2": "请画'一只穿小裙子的猫' 出来",
        "subprompt-tti-3": "创作赛博朋克风格的夜景图",
        "subprompt-iti-1": "把这张图变成梵高风格",
        "subprompt-iti-2": "给这张照片里的人物换个发型",
        "subprompt-iti-3": "增强这张风景照的色彩饱和度",
        "subprompt-img-analyze-detail-1": "分析此图，它可能是由怎样的提示词生成的？",
        "subprompt-img-analyze-detail-2": "告诉我生成这张图片最关键的描述语。",
        "subprompt-img-analyze-detail-3": "如果用AI绘画，生成此图的咒语可能是什么？",

        "uploadImageTooltip": "上传图片",

        // 新增：为酒肆馨月和心心子的评价提供更完善的翻译
        "reviewer-scriptwriter-li": "酒肆馨月",
        "tag-scriptwriting": "剧本创作",
        "tag-plot-generation": "情节构思",
        "tag-dialogue-writing": "对话生成",
        "review-script-1": "Gemini在剧本创作上真是我的得力助手！特别是当我需要为角色设计复杂的内心戏或者富有张力的情节时，它总能提供一些非常棒的切入点和写作建议。它帮助我把一个原本平淡的角色变得立体多了。",
        "reviewer-videographer-sun": "心心子",
        "tag-short-video": "短视频",
        "tag-creative-script": "创意脚本",
        "tag-script-optimization": "剧本优化",
        "review-script-2": "用Gemini来构思短视频剧本太酷了！我经常用它来 brainstorm 搞笑段子和反转剧情。它生成的点子又快又新颖，让我的视频内容总能抓住观众的眼球，互动率都高了不少！",

        // 登录/注册页面
        "loginTitle": "登录 - Gemini 2.5 Pro",
        "loginPageTitle": "用户登录",
        "usernamePlaceholder": "用户名/邮箱",
        "passwordPlaceholder": "密码",
        "loginButtonText": "登录",
        "loginWithGoogle": "使用Google登录", // Will be superseded by continueWithGoogle for the button text
        "continueWithGoogle": "使用 Google 继续", // New key for the button text
        "orSeparator": "或",
        "createAccountPrompt": "没有账户？立即注册",
        "backToHome": "返回首页",
        "registerTitle": "注册 - Gemini 2.5 Pro",
        "registerPageTitle": "创建账户",
        "usernameRegPlaceholder": "用户名",
        "emailRegPlaceholder": "邮箱地址",
        "passwordRegPlaceholder": "密码 (至少6位)",
        "confirmPasswordPlaceholder": "确认密码",
        "registerButtonText": "注册",
        "alreadyAccountPrompt": "已有账户？点击登录"
    },
    
    // 英文翻译
    en: {
        // Navigation
        "subtitle": "GEMINI Model - Gemini 2.5 Pro Latest Version - Online Experience",
        "nav-chat": "Chat",
        "nav-capabilities": "Capabilities",
        "nav-reviews": "Reviews",
        
        // Sidebar Menu
        "menu-login": "Login",
        "menu-chat": "Chat",
        "menu-newchat": "New Chat",
        "menu-history": "History",
        "menu-capabilities": "Core Features",
        "menu-performance": "Performance",
        "menu-presets": "Presets",
        
        // Chat page
        "welcome-message": "Hello! I'm Gemini 2.5 Pro. How can I help you today?",
        "input-placeholder": "Type your question...",
        "scenarios-title": "Use Cases",
        "scenario-writing": "Writing Assistant",
        "scenario-learning": "Learning Tutor",
        "scenario-coding": "Code Helper",
        "scenario-travel": "Travel Planning",
        "scenario-image": "Image Analysis",
        "scenario-summary": "Content Summary",
        "scenario-fiction": "Sci-Fi Creation",
        "scenario-ml": "Machine Learning",
        "scenario-social": "Social Media Marketing",
        "scenario-scriptwriting-title": "Film & TV Script",
        "scenario-scriptwriting-desc": "AI-assisted creation, craft compelling stories",
        
        // Capabilities page
        "performance-title": "Performance",
        "mmlu-desc": "In the Massive Multitask Language Understanding benchmark, Gemini 2.5 Pro achieved a score of 90.0%, surpassing human expert level.",
        "humaneval-desc": "In code generation capability tests, Gemini 2.5 Pro reached a 94.4% pass rate, far exceeding previous models.",
        "gsm8k-desc": "In mathematical reasoning ability tests, Gemini 2.5 Pro achieved a problem-solving accuracy of 97.7%, setting a new record.",
        "core-capabilities": "Core Capabilities",
        "core-capabilitie": "core competencies",
        "conversation-title": "Multi-turn Conversation",
        "conversation-desc": "Gemini 2.5 Pro can maintain long, complex conversations, preserve context coherence, and understand implied information.",
        "multimodal-title": "Multimodal Understanding",
        "multimodal-desc": "Capable of simultaneously processing text, image, audio, and video inputs, enabling cross-modal content understanding and generation.",
        "code-title": "Coding Ability",
        "code-desc": "Supports code generation, debugging, and optimization across multiple programming languages, with understanding of complex algorithms and system architectures.",
        "creative-title": "Creative Thinking",
        "creative-desc": "Possesses creative thinking capabilities, generating original content, creative writing, and artistic creation assistance.",
        "comparison-title": "2.5 Pro Improvements Over Previous Generation",
        "table-capability": "Capability",
        "table-improvement": "Improvement",
        "table-context": "Context Window",
        "table-multimodal": "Multimodal Understanding",
        "table-basic": "Basic Understanding",
        "table-advanced": "Deep Understanding & Reasoning",
        "table-significant": "Significant Improvement",
        "table-reasoning": "Reasoning Ability",
        "table-good": "Good",
        "table-expert": "Near Human Expert",
        "table-code-gen": "Code Generation",
        "table-knowledge": "Knowledge Update",
        "table-realtime": "2024 Real-time",
        "table-current": "Up to date",
        
        // Reviews page
        "user-reviews": "Real User Reviews",
        "filter-all": "All Reviews",
        "filter-coding": "Coding",
        "filter-understanding": "Understanding",
        "filter-image": "Image Processing",
        "reviewer-zhang": "HeRE",
        "review-1": "As a senior developer, I am deeply impressed by Gemini 2.5 Pro's coding capabilities. It not only generates high-quality code but also understands complex system architectures and provides valuable refactoring suggestions. It helped me solve a concurrency issue that had been bothering me for days with its thorough analysis.",
        "tag-coding-assistant": "Coding Assistant",
        "tag-debugging": "Debugging",
        "tag-system-design": "System Design",
        "reviewer-wang": "No Way Back",
        "review-2": "Gemini 2.5 Pro excels in multilingual programming. I used it to generate Python, JavaScript, and Rust code, and the quality was consistently high. Its suggestions for algorithm optimization were particularly helpful, allowing me to improve an O(n²) algorithm to O(n log n), resulting in a significant performance boost.",
        "tag-algorithm": "Algorithm Optimization",
        "tag-multilingual": "Multilingual Support",
        "reviewer-li": "Huihui",
        "review-3": "The Gemini 2.5 Pro's text-based image function is amazing! I only need simple text descriptions to generate very creative and detailed images. Whether I want to quickly visualize a concept or create unique digital art, it can meet my needs.",
        "tag-research": "Academic Research",
        "tag-expertise": "Expert Knowledge",
        "tag-reasoning": "Logical Reasoning",
        "tag-tti": "Text to Image",
        "tag-iti": "Image to Image",
        "tag-image-edit": "Image Editing",
        "tag-style-transfer": "Style Transfer",
        "tag-creative-image": "Creative Image",
        "tag-ai-art": "AI Art",
        "reviewer-wu": "ISFPTing",
        "review-iti-wu": "I often use the Gemini 2.5 Pro's image-to-image function to edit and enhance my design work. Uploading an image allows me to easily convert artistic styles or make precise adjustments, such as changing lighting or adding elements. This is very useful for designers.",
        "tag-image-editing": "Image Editing",
        "tag-ai-art": "AI Art",
        "reviewer-qian": "sijer",
        "review-6": "Using Gemini 2.5 Pro to process data and generate Python scripts is a joy. It quickly grasps complex analytical requirements, and the code quality is high, significantly boosting my productivity.",
        "tag-coding": "Coding Ability",
        "tag-data-analysis": "Data Analysis",
        "tag-python": "Python",
        "reviewer-chen": "That little cookie.",
        "review-4": "I use Gemini 2.5 Pro in my teaching to assist with lesson preparation and Q&A. It can adjust its explanations based on students' different levels of understanding, simplifying complex concepts into easy-to-understand analogies. Its comprehension of questions is very accurate, grasping the core intent even of vaguely worded queries.",
        "tag-education": "Educational Aid",
        "tag-explanation": "Concept Explanation",
        "reviewer-zhao": "Dr. Zhao",
        "review-5": "Gemini 2.5 Pro's image understanding capability is extremely powerful. I uploaded some design sketches, and it not only accurately described the content but also provided professional design advice and improvement directions. It can even identify design styles and reference elements in images, which is very helpful for my creative process.",
        "tag-image-analysis": "Image Analysis",
        "tag-design": "Design Assistance",
        "tag-creative": "Creative Suggestions",
        "reviewer-zhou": "It's Xiao Zuo",
        "review-6": "Gemini 2.5 Pro performs excellently in medical image-assisted analysis. It can identify key features from X-rays and CT images and provide preliminary analysis. While it cannot replace professional diagnosis, its accuracy and detail as an auxiliary tool are impressive.",
        "tag-medical": "Medical Imaging",
        "tag-analysis": "Professional Analysis",
        "overall-rating": "Overall Rating",
        "rating-count": "Based on {0} reviews",
        "rating-coding": "Coding Ability",
        "rating-understanding": "Understanding",
        "rating-image": "Image Processing",
        "rating-speed": "Response Speed",
        "rating-creative": "Creative Ability",
        "review-text-4": "Gemini 2.5 Pro has significantly improved my workflow. Its ability to understand context and provide relevant information is outstanding.",
        "reviewer-name-4": "Software Engineer - Alex P.",
        "tag-workflow": "Workflow",
        "tag-context": "Contextual Understanding",
        "reviewer-name-5": "Creative Writer - Xiaoming",
        "review-text-5": "Gemini 2.5 Pro is a huge help for my writing! It not only understands my wildest ideas but also provides excellent suggestions for continuation and plot development. It's fantastic!",
        "tag-creative": "Creative Writing",
        "tag-brainstorming": "Brainstorming",
        "reviewer-name-6": "Data Scientist - Li Hua",
        "review-text-6": "Using Gemini 2.5 Pro to process data and generate Python scripts is a joy. It quickly grasps complex analytical requirements, and the code quality is high, significantly boosting my productivity.",
        "tag-data-analysis": "Data Analysis",
        "tag-python": "Python",
        "reviewer-name-7": "Photographer - Wang Gang",
        "review-text-7": "I tried having Gemini 2.5 Pro analyze my photographs. It accurately identified compositional elements and offered very professional advice on color and light adjustments. While it can't directly edit photos, it's been very insightful.",
        "tag-image-processing": "Image Processing",
        "tag-photography": "Photography",
        "tag-analysis": "Analytical Skills",
        "rating-overall": "Overall Rating",
        
        // New Review 8 (overall 10th review)
        "reviewer-name-8": "Student Xiao Li",
        "reviewer-ma": "Free pony",
        "review-text-8": "Using Gemini to learn and understand complex concepts is fantastic; it explains things in a simple and engaging way, much more interesting than textbooks!",
        "tag-learning-tool": "Learning Tool",
        "tag-student-friendly": "Student-Friendly",
        
        // Footer
        "footer-text": "This site is for demonstration purposes only",

        // Sub-prompts for scenario buttons
        "subprompt-writing-1": "Write a blog post about the ethics of artificial intelligence, discussing potential risks and social responsibilities.",
        "subprompt-writing-2": "Help me outline a science fiction short story about parallel universes, including main characters and core conflicts.",
        "subprompt-writing-3": "Rewrite this complex academic abstract into a concise and clear popular science introduction suitable for the general public.",
        "subprompt-learning-1": "Explain what blockchain technology is and list three real-world application examples.",
        "subprompt-learning-2": "Briefly describe the basic principles of photosynthesis and its importance to Earth's ecosystem.",
        "subprompt-learning-3": "Describe the concept of the butterfly effect and give examples of its manifestation in real life.",
        "subprompt-coding-1": "Write a Python function to implement the quicksort algorithm, and add appropriate comments.",
        "subprompt-coding-2": "Explain the asynchronous programming model in JavaScript, especially the usage and advantages of async/await.",
        "subprompt-coding-3": "How can I optimize this SQL query to improve its execution efficiency on large datasets? SELECT ... FROM ... WHERE ... GROUP BY ...",
        "subprompt-travel-1": "Recommend three domestic destinations suitable for family trips with young children, and explain why.",
        "subprompt-travel-2": "Develop a detailed itinerary for a seven-day in-depth cultural exploration tour of France, including transportation and accommodation suggestions.",
        "subprompt-travel-3": "What are the essential safety precautions and cultural etiquette to be aware of when backpacking alone in Southeast Asia?",
        "subprompt-scriptwriting-1": "Help me brainstorm a movie script outline with a dystopian theme, where the protagonist is a hacker trying to subvert the system.",
        "subprompt-scriptwriting-2": "Design three signature lines for a historical comedy character that are both funny and reflect their personality.",
        "subprompt-scriptwriting-3": "How can this suspenseful plot be developed to create more twists and maintain audience tension?",
        "subprompt-summary-1": "Summarize the main arguments, evidence, and proposed solutions from this in-depth report on global climate change.",
        "subprompt-summary-2": "Extract key revenue, profit, and growth rate data from this company's annual financial report and provide a brief analysis.",
        "subprompt-summary-3": "Condense the core ideas of this non-fiction book into a concise summary of about 500 words.",
        "subprompt-fiction-1": "Write the beginning of a detective story set in a cyberpunk futuristic metropolis, introducing a mysterious client and case clues.",
        "subprompt-fiction-2": "Create a fantasy magical world setting called 'Aeredonia,' including unique races, magic systems, and geography.",
        "subprompt-fiction-3": "Describe a tense and exciting scene where a young explorer accidentally awakens a guardian beast in an ancient temple.",
        "subprompt-ml-1": "Explain the working principle of Convolutional Neural Networks (CNNs) in deep learning and their applications in image recognition.",
        "subprompt-ml-2": "What is Natural Language Processing (NLP)? List three common applications of NLP in daily life.",
        "subprompt-ml-3": "How do you evaluate the performance of a classification machine learning model? Please explain at least three evaluation metrics and their meanings.",
        "subprompt-social-1": "Write three distinct yet attractive Xiaohongshu promotional posts for a newly launched eco-friendly coffee brand.",
        "subprompt-social-2": "Plan a TikTok challenge idea that can go viral among Gen Z users, incorporating current trends.",
        "subprompt-social-3": "How to effectively increase the WeChat official account followers and user engagement for a B2B technology company through content marketing strategies?",
        "subprompt-tti-1": "Generate a photorealistic image of a golden retriever napping under a sun-dappled cherry blossom tree.",
        "subprompt-tti-2": "Create a steampunk-style painting of a giant mechanical brass octopus scaling an old lighthouse.",
        "subprompt-tti-3": "Illustrate a sci-fi scene: a lone astronaut on a Martian hill, gazing at distant twin blue suns.",
        "subprompt-iti-1": "Transform this city landscape photo into the style of a Japanese Ukiyo-e woodblock print.",
        "subprompt-iti-2": "Add vintage aviator goggles to this portrait and apply a sepia tone.",
        "subprompt-iti-3": "Boost the color vibrancy and contrast in this food photo, and add a subtle depth-of-field effect to make it pop.",
        "subprompt-img-analyze-detail-1": "Describe in detail all the objects and scenes in this picture.",
        "subprompt-img-analyze-detail-2": "Analyze the composition and lighting characteristics of this picture.",
        "subprompt-img-analyze-detail-3": "What emotion or story might this image be trying to convey?",

        // 9th Scenario Button Placeholder
        "scenario-placeholder": "Coming Soon",

        // Scenario Descriptions - EN
        "scenario-writing-desc": "Expert copywriting, generated instantly.",
        "scenario-learning-desc": "Doubts cleared, efficient tutoring.",
        "scenario-coding-desc": "Smart coding, boost efficiency.",
        "scenario-travel-desc": "Custom itineraries, travel with ease.",
        "scenario-image-desc": "Analyze images, extract insights.",
        "scenario-summary-desc": "Key points extracted, grasp quickly.",
        "scenario-fiction-desc": "Creative ideas, build the future.",
        "scenario-ml-desc": "Model building, data insights.",
        "scenario-social-desc": "Viral content, master the traffic.",
        "scenario-scriptwriting-desc": "AI-assisted creation, craft compelling stories",
        "scenario-multilingual-desc": "Multilingual support, communicate effortlessly.",
        "scenario-tti-title": "Text to Image",
        "scenario-iti-title": "Image to Image",
        "scenario-tti-desc": "Generate images based on text descriptions.",
        "scenario-iti-desc": "Modify and create based on existing images.",
        "scenario-img-analyze-detail-desc": "Deep understanding and analysis of image content.",
        "scenario-img-analyze-desc": "Analyze images, extract insights.",
        "scenario-img-analyze-detail-title": "image to prompt",
        "scenario-img-analyze-title": "Image Analysis",
        "scenario-img-analyze-desc": "Analyze images, extract insights.",

        // Language Switcher specific
        "lang-current-chinese": "Chinese",
        "lang-opt-chinese": "中文",
        "lang-opt-english": "English",

        // ADDING/UPDATING English translations for Li Bianju and Sun Xiaomei reviews
        "reviewer-scriptwriter-li": "Wine shop Xinyue",
        "tag-scriptwriting": "Scriptwriting",
        "tag-plot-generation": "Plot Generation",
        "tag-dialogue-writing": "Dialogue Writing",
        "review-script-1": "Gemini is truly my go-to assistant for scriptwriting! Especially when I need to design complex inner monologues for characters or create suspenseful plots, it always provides some fantastic entry points and writing suggestions. It helped me make a previously flat character much more three-dimensional.",
        "reviewer-videographer-sun": "Xinxinzi",
        "tag-short-video": "Short Video",
        "tag-creative-script": "Creative Script",
        "tag-script-optimization": "Script Optimization",
        "review-script-2": "Using Gemini to brainstorm short video scripts is so cool! I often use it to brainstorm funny gags and plot twists. The ideas it generates are fast and novel, allowing my video content to always catch the audience's eye, and the interaction rate has increased significantly!",

        // Login/Register Pages
        "loginTitle": "Login - Gemini 2.5 Pro",
        "loginPageTitle": "User Login",
        "usernamePlaceholder": "Username/Email",
        "passwordPlaceholder": "Password",
        "loginButtonText": "Login",
        "loginWithGoogle": "Login with Google", // Will be superseded by continueWithGoogle for the button text
        "continueWithGoogle": "Continue with Google", // New key for the button text
        "orSeparator": "Or",
        "createAccountPrompt": "No account? Register now",
        "backToHome": "Back to Home",
        "registerTitle": "Register - Gemini 2.5 Pro",
        "registerPageTitle": "Create Account",
        "usernameRegPlaceholder": "Username",
        "emailRegPlaceholder": "Email Address",
        "passwordRegPlaceholder": "Password (at least 6 characters)",
        "confirmPasswordPlaceholder": "Confirm Password",
        "registerButtonText": "Register",
        "alreadyAccountPrompt": "Already have an account? Login"
    }
};

// 当前语言
let currentLang = 'zh';

// 初始化语言
function initLanguage() {
    // 检查本地存储中是否有语言设置
    const savedLang = localStorage.getItem('language');
    if (savedLang && translations[savedLang]) {
        currentLang = savedLang;
    }
    
    // 设置语言按钮状态
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-lang') === currentLang);
    });
    
    // 应用翻译
    applyTranslations();
    
    // 添加语言切换事件监听
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.getAttribute('data-lang');
            if (lang && translations[lang] && lang !== currentLang) {
                currentLang = lang;
                localStorage.setItem('language', lang);
                
                // 更新按钮状态
                document.querySelectorAll('.lang-btn').forEach(b => {
                    b.classList.toggle('active', b === btn);
                });
                
                // 应用新语言
                applyTranslations();
                
                // 更新场景按钮的提示文本
                updateScenarioPrompts();
            }
        });
    });
}

// 应用翻译到页面
function applyTranslations() {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
        const key = el.getAttribute('data-i18n');
        // Check if the key exists in the current language's translations
        if (translations[currentLang] && translations[currentLang][key]) {
            
            // If the element is a scenario button itself (e.g., <button class="scenario-btn" data-i18n="scenario-writing">),
            // we must NOT set its textContent directly. Doing so erases its internal structure 
            // (emoji span, title span, description span).
            // The data-i18n on the button is for other JS logic (like sub-prompts) to identify the scenario.
            // The spans inside the button have their own data-i18n attributes and will be translated correctly in subsequent iterations of this loop.
            if (el.classList.contains('scenario-btn')) {
                return; // Skip directly setting textContent for the button itself.
            }

            // Original logic for other elements (including spans inside scenario-btn)
            const paramsAttr = el.getAttribute('data-i18n-params');
            if (paramsAttr) {
                const params = paramsAttr.split(',');
                let text = translations[currentLang][key];
                params.forEach((param, index) => {
                    text = text.replace(`{${index}}`, param.trim());
                });
                el.textContent = text;
            } else {
                el.textContent = translations[currentLang][key];
            }
        }
    });
    
    // 处理占位符文本
    const placeholders = document.querySelectorAll('[data-i18n-placeholder]');
    placeholders.forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (translations[currentLang][key]) {
            el.placeholder = translations[currentLang][key];
        }
    });
    
    // 更新页面标题 (using the more robust logic from previous attempt)
    const pageTitleElement = document.querySelector('title');
    if (pageTitleElement) {
        const titleKey = pageTitleElement.getAttribute('data-i18n');
        if (titleKey && translations[currentLang] && translations[currentLang][titleKey]) {
            document.title = translations[currentLang][titleKey];
        } else {
            // Fallback to default title if data-i18n key not found on title or no specific title key in translations
            document.title = currentLang === 'zh' ? 
                "Gemini 2.5 Pro中文版 | 国内高速访问与AI模型下载" : 
                "Gemini 2.5 Pro | Fast Access & AI Model Download";
        }
    } else {
        // Fallback if title element itself is not found
        document.title = currentLang === 'zh' ? 
            "Gemini 2.5 Pro中文版 | 国内高速访问与AI模型下载" : 
            "Gemini 2.5 Pro | Fast Access & AI Model Download";
    }
}

// 更新场景按钮的提示文本
function updateScenarioPrompts() {
    const scenarioButtons = document.querySelectorAll('.scenario-btn');
    scenarioButtons.forEach(btn => {
        if (currentLang === 'zh') {
            btn.setAttribute('data-prompt', btn.getAttribute('data-prompt') || btn.getAttribute('data-prompt-zh'));
        } else {
            btn.setAttribute('data-prompt', btn.getAttribute('data-prompt-en') || btn.getAttribute('data-prompt'));
        }
    });
}

// 页面加载完成后初始化语言
document.addEventListener('DOMContentLoaded', initLanguage); 