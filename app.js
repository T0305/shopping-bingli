const dimensions = {
  impulse: "冲动值",
  hoard: "囤积欲",
  bargain: "薅感雷达",
  emotion: "情绪代偿",
  social: "共犯浓度"
};

const questionSeeds = [
  ["第 1 诊室", "你会把购物车当成临时收容所，先让商品住几天。", { yes: { impulse: 2, hoard: 1 }, no: { bargain: 2 }, unsure: { impulse: 1, bargain: 1 } }],
  ["补贴幻觉科", "看到“官方补贴”，你会觉得不参与就像错过时代分红。", { yes: { bargain: 2, impulse: 1 }, no: { bargain: 1 }, unsure: { bargain: 1, emotion: 1 } }],
  ["凑单影像科", "差一点满减时，你会突然发现家里缺很多“可能用得上”的东西。", { yes: { hoard: 2, bargain: 1 }, no: { bargain: 2 }, unsure: { impulse: 1, hoard: 1 } }],
  ["深夜急诊", "你越累，越容易觉得某个小东西可以把今天修好。", { yes: { emotion: 3 }, no: { bargain: 1 }, unsure: { emotion: 1, impulse: 1 } }],
  ["直播间观察室", "主播说“最后三分钟”时，你的手指会比大脑先到支付页。", { yes: { impulse: 3 }, no: { bargain: 1 }, unsure: { impulse: 1, social: 1 } }],
  ["赠品科", "你买套装时，赠品的可爱程度会影响正装是否“突然有用”。", { yes: { hoard: 2, impulse: 1 }, no: { bargain: 1 }, unsure: { hoard: 1, emotion: 1 } }],
  ["比价科", "你能为了便宜十几块，查到这个商品的三代价格族谱。", { yes: { bargain: 3 }, no: { impulse: 2 }, unsure: { bargain: 1, emotion: 1 } }],
  ["二手幻想科", "“不喜欢还能卖”会让你下单时更勇敢。", { yes: { impulse: 2, hoard: 1 }, no: { bargain: 2 }, unsure: { impulse: 1, bargain: 1 } }],
  ["库存科", "你看到常用品降价，会听见未来的自己在柜子里呼救。", { yes: { hoard: 3 }, no: { bargain: 1 }, unsure: { hoard: 1, emotion: 1 } }],
  ["社交种草科", "朋友说“这个很适合你”，你会立刻觉得商品开始认亲。", { yes: { social: 3 }, no: { bargain: 1 }, unsure: { social: 1, emotion: 1 } }],
  ["冷静期科", "你经常说“我先拍下再想”，但想的时候订单已经在路上。", { yes: { impulse: 3 }, no: { bargain: 1 }, unsure: { impulse: 1, emotion: 1 } }],
  ["平替考古科", "你找平替时，常常找着找着买了一整个替身宇宙。", { yes: { bargain: 2, hoard: 1 }, no: { impulse: 1 }, unsure: { bargain: 1, impulse: 1 } }],
  ["收藏夹精神科", "你的收藏夹里住着一个“以后会变精致”的自己。", { yes: { emotion: 2, social: 1 }, no: { bargain: 1 }, unsure: { emotion: 1, hoard: 1 } }],
  ["退货科", "“能退”对你来说更像下单前的心理麻醉。", { yes: { impulse: 2, emotion: 1 }, no: { bargain: 2 }, unsure: { impulse: 1, hoard: 1 } }],
  ["群聊会诊", "你发链接给朋友，表面求建议，实际想获得下单许可证。", { yes: { social: 2, impulse: 1 }, no: { bargain: 1 }, unsure: { social: 1, emotion: 1 } }],
  ["发工资科", "发工资当天，你会觉得不给自己买点什么就像缺少仪式感。", { yes: { emotion: 2, impulse: 1 }, no: { bargain: 2 }, unsure: { emotion: 1, impulse: 1 } }],
  ["参数迷雾科", "你看不懂复杂参数时，会转而相信“看起来顺眼”。", { yes: { impulse: 1, emotion: 1 }, no: { bargain: 2 }, unsure: { social: 1, bargain: 1 } }],
  ["小红书复查科", "你搜“值不值得买”，最后更想买了。", { yes: { social: 2, impulse: 1 }, no: { bargain: 1 }, unsure: { social: 1, bargain: 1 } }],
  ["囤货安全科", "你家里至少有一样东西处于“够用到下个购物节”的状态。", { yes: { hoard: 3 }, no: { bargain: 1 }, unsure: { hoard: 1, impulse: 1 } }],
  ["优惠券法事科", "你会因为不用券而产生一种“浪费了什么”的错觉。", { yes: { bargain: 3 }, no: { impulse: 1 }, unsure: { bargain: 1, emotion: 1 } }],
  ["限量恐惧科", "看到“库存紧张”，你会觉得商品正在从人生里撤离。", { yes: { impulse: 2, emotion: 1 }, no: { bargain: 1 }, unsure: { impulse: 1, social: 1 } }],
  ["生活方式科", "你买东西时，经常买的是“我也可以变成那种人”的想象。", { yes: { emotion: 2, social: 1 }, no: { bargain: 1 }, unsure: { emotion: 1, impulse: 1 } }],
  ["闲置复盘科", "你有一些东西，当初买的时候已经想好“不行就卖”，但现在还在。", { yes: { hoard: 2, impulse: 1 }, no: { bargain: 2 }, unsure: { hoard: 1, emotion: 1 } }],
  ["最终复查", "如果钱包能说话，它会说：你不是没钱，你是太会给欲望写理由。", { yes: { impulse: 2, emotion: 1 }, no: { bargain: 1 }, unsure: { social: 1, impulse: 1 } }]
];

const questions = questionSeeds.map(([kicker, text, scores]) => ({
  kicker,
  text,
  options: [
    { text: "是", hint: "我承认，病历可以如实记录。", scores: scores.yes },
    { text: "否", hint: "暂未发现该症状，建议继续观察。", scores: scores.no },
    { text: "不确定", hint: "有点像我，但我还想保留一点体面。", scores: scores.unsure }
  ]
}));

const roleCards = {
  bargain: "0% 0%",
  emotion: "33.333% 0%",
  impulse: "66.666% 0%",
  hoard: "100% 0%",
  social: "0% 100%",
  gift: "33.333% 100%",
  resale: "66.666% 100%",
  dupe: "100% 100%"
};

const diagnoses = {
  bargain: {
    name: "补贴神谕接收器",
    subtype: "SBTI：QJXJ｜券价玄学家",
    subtitle: "你不是在省钱，你是在和平台进行一场玄学谈判。",
    danger: 4,
    persona: "你的人格底色是“清醒地上头”。别人看到优惠是心动，你看到优惠是使命；别人买东西靠需要，你买东西还要参考历史价、叠券路径和宇宙补贴意志。你很容易把消费包装成一次漂亮的智力胜利，哪怕最后多买了三件原本不存在的人生配件。",
    verdict: "优点是不会轻易被原价羞辱，缺点是会被复杂规则温柔拿捏。你擅长把欲望翻译成公式，也擅长把公式翻译成下单理由。",
    symptom: "看到券就觉得自己被时代选中；不参与活动会产生轻微错过宇宙红利的幻痛。",
    scene: "官方补贴、跨店满减、历史价截图、朋友问你“到底哪家便宜”。",
    prescription: "每次下单前先写下“不买立省多少”，如果这个数字最大，立刻出院。",
    advice: "你的理性不是没有用，只是经常被优惠券雇佣。",
    share: "我是补贴神谕接收器，优惠没到账，我的使命感先到账。",
    palette: ["#f5b342", "#3566c8"]
  },
  emotion: {
    name: "情绪止痛型买手",
    subtype: "SBTI：QQTT｜情绪提款体",
    subtitle: "你买的不是东西，是给今天的自己发一张缓刑通知。",
    danger: 5,
    persona: "你对自己的情绪非常敏感，但你的安慰方式经常长得像快递。你不是完全冲动的人，你只是太会照顾当下的自己，以至于未来的自己常常收到一些陌生包裹。你的人生信念是：再苦不能苦今天，再穷也要给疲惫灵魂贴一张付款创可贴。",
    verdict: "你温柔、敏锐、很会给生活加一点糖。问题是有时候糖纸很贵，且支持七天无理由但你懒得退。",
    symptom: "白天扛住了工作，晚上没扛住购物车；越累越觉得某个小东西能救命。",
    scene: "深夜、发工资后、加班结束、被一句“买点开心的”击中。",
    prescription: "下单前先洗澡、喝水、睡十分钟；醒来还想买，再让明天的你会诊。",
    advice: "你需要的可能不是商品，是休息、拥抱、和一个不催付款的夜晚。",
    share: "我的购物车不是购物车，是情绪急诊室。",
    palette: ["#e84d60", "#7c5cff"]
  },
  impulse: {
    name: "理性离线闪购体",
    subtype: "SBTI：SSDD｜手速代替大脑型",
    subtitle: "你知道很多道理，但付款按钮知道你的指纹。",
    danger: 4,
    persona: "你的脑内住着一个理性顾问和一个闪购实习生。顾问负责讲道理，实习生负责趁顾问喝水的时候提交订单。你常常不是不知道风险，而是觉得“我先拍下再想”是一种很成熟的中间方案。可惜很多人生悲剧都发生在这个“先”字里。",
    verdict: "你行动力很强，决策路径很短，适合抢限量，不适合看倒计时。你的人生需要更多冷静期，而不是更多购物节。",
    symptom: "倒计时一跳，理智开始缓冲；库存一少，手指开始替灵魂发言。",
    scene: "限时补贴、最后库存、直播间突然喊三二一、支付页已经打开。",
    prescription: "任何倒计时商品先截图，不付款；十分钟后还记得它叫什么再复诊。",
    advice: "你的问题不是欲望太多，是手太懂事。",
    share: "我不是不理性，我只是理性临时离线。",
    palette: ["#ff6b4a", "#1f2937"]
  },
  hoard: {
    name: "家庭库存守夜人",
    subtype: "SBTI：CCDD｜柜门安全感患者",
    subtitle: "你不是囤货，你是在给未来世界建立民间储备体系。",
    danger: 3,
    persona: "你对“不够用”有一种古老而深沉的敬畏。别人买一瓶是补货，你买三瓶是修建安全感护城河。你很适合管理仓库、家庭后勤和末日物资清单，但不适合独自逛大促日化专区。你的柜子不是柜子，是你对不确定世界的温柔反击。",
    verdict: "你可靠、周到、很有生活兜底能力。只是你的兜底有时会兜成一个小型批发市场。",
    symptom: "看到常用品降价就像听见未来的自己在呼救；家里永远有第三瓶同款。",
    scene: "纸巾、洗衣液、护肤品、速食、抽屉深处的备用备用装。",
    prescription: "下单前先打开柜子拍照，若画面里出现同类商品超过 2 个，暂停治疗。",
    advice: "安全感可以囤一点，但别让柜子替你焦虑。",
    share: "我不是囤货，我是在给未来的自己发物资。",
    palette: ["#4f9f62", "#f0a732"]
  },
  social: {
    name: "直播间气氛受体",
    subtype: "SBTI：RQTT｜人群上头同步器",
    subtitle: "你的钱包不是你一个人在花，是气氛在刷医保卡。",
    danger: 4,
    persona: "你是很会感受气氛的人。朋友一句“适合你”、主播一句“最后三分钟”、评论区一句“已冲”，都能让你的人生进入同步付款模式。你不是盲从，你只是特别擅长把别人的兴奋翻译成自己的需要。你的消费行为有社交体温，也有群体加速度。",
    verdict: "你可爱、热闹、很适合当种草气氛组。危险在于你以为自己在围观，其实已经站到了收银台。",
    symptom: "评论区越热，你越觉得商品有灵魂；朋友越兴奋，你越像被点名。",
    scene: "直播间、拼单群、小红书收藏夹、闺蜜说“这个真的像你”。",
    prescription: "任何别人说“必须买”的东西，先让它在购物车冷静一晚。",
    advice: "你可以爱热闹，但付款最好别跟着弹幕走。",
    share: "我不是被种草，我是被气氛临时收编。",
    palette: ["#128c7e", "#e84d60"]
  }
};

const specialDiagnoses = [
  {
    key: "gift",
    match: (scores) => scores.hoard >= 12 && scores.impulse >= 8,
    data: {
      name: "赠品绑架型人格",
      subtype: "SBTI：ZPBD｜赠品本体倒置型",
      subtitle: "正装是顺便，赠品才是你的主治医生。",
      danger: 4,
      persona: "你的消费系统里有一个神秘按钮，名字叫“限定赠品”。它一亮，正装就会自动变成门票，价格就会自动变成背景，理性就会自动去走廊等候。你很会发现商品之外的小快乐，也很容易被“小快乐仅限今天”这句话绑架。",
      verdict: "你有一颗珍惜小东西的心，这很好；但商家也知道你珍惜，所以给你准备了很多小东西。",
      symptom: "买完之后最先拆赠品，正装在旁边像陪嫁；评价商品时先评价小样可不可爱。",
      scene: "买赠套装、联名周边、限定小样、下单页的赠品栏。",
      prescription: "先给赠品单独估价，如果不值这个差价，就让它离开病房。",
      advice: "可爱不是免罪金牌，赠品也不能替你使用正装。",
      share: "我承认，正装只是赠品的包装。",
      palette: ["#ff8fb3", "#f0a732"]
    }
  },
  {
    key: "resale",
    match: (scores) => scores.hoard >= 10 && scores.impulse >= 7,
    data: {
      name: "闲置回血幻想家",
      subtype: "SBTI：XXHX｜二手未来学派",
      subtitle: "买前想着能卖，买后从不挂出。",
      danger: 4,
      persona: "你拥有一种很浪漫的商业想象力：任何冲动购买在你脑内都可以通过二手平台实现财务闭环。你不是乱买，你是在提前规划一个大概率不会发生的回血故事。你的问题不是不会算账，而是太相信未来的自己会勤快。",
      verdict: "你乐观、有退路意识、很会给自己台阶。只是这些台阶常常通往柜子深处。",
      symptom: "“不喜欢还能卖”是你的消费赦免令；但上架按钮经常被你遗忘。",
      scene: "全新仅拆、买前想回血、买后懒得拍、二手平台草稿箱。",
      prescription: "下单前先挂出一件旧物，卖出再给新物放行。",
      advice: "未来的你很忙，别再提前给 TA 安排回血 KPI。",
      share: "我不是乱买，我只是提前规划了一个不会发生的回血。",
      palette: ["#8b5cf6", "#4f9f62"]
    }
  },
  {
    key: "dupe",
    match: (scores) => scores.bargain >= 12 && scores.impulse <= 9,
    data: {
      name: "平替考古学家",
      subtype: "SBTI：PTKG｜替身文学采购员",
      subtitle: "为了省钱，你买了一整个替身宇宙。",
      danger: 3,
      persona: "你对“性价比”有近乎学术的执着。别人看商品，你看替代关系；别人买正主，你先考古十篇平替笔记。你确实能省掉一些钱，但也容易在漫长的替代链里买到一堆“差一点就是它”的东西。你的人格关键词是：克制、研究、反复心动。",
      verdict: "你聪明、谨慎、很会做功课。只是有时功课做太深，会把自己挖进另一个消费坑。",
      symptom: "正主还没买，平替已经开会；省钱路线开始出现额外收费站。",
      scene: "平替清单、同款低价、功课帖、越搜越不甘心的夜晚。",
      prescription: "如果你已经找了三个平替，说明真正想要的还在心里。",
      advice: "今天只允许在“买正主”和“不买”之间二选一。",
      share: "我的省钱路线，已经贵到需要复盘。",
      palette: ["#3566c8", "#ffcf66"]
    }
  }
];

const relationLabels = [
  {
    key: "coupon-cult",
    card: "0% 0%",
    match: (a, b) => a.primaryKey === "bargain" && b.primaryKey === "bargain",
    title: "优惠券邪修同门",
    text: "你们不是一起购物，是一起破译平台阵法。凑单路线会被你们画成地铁图，满减门槛会被你们审到怀疑人生。",
    advice: "适合一起算券，但必须提前写下预算上限；否则你们会为了省 50，多买出一个小型仓库。"
  },
  {
    key: "mood-ambulance",
    card: "33.333% 0%",
    match: (a, b) => a.primaryKey === "emotion" || b.primaryKey === "emotion",
    title: "情绪急救购物车",
    text: "你们之间至少有一个人会把疲惫翻译成下单，另一个人很可能负责说“买吧，开心最重要”。这不是搭子，是钱包救护车。",
    advice: "适合互相安慰，不适合深夜互发链接。先聊 10 分钟今天怎么了，再决定要不要付款。"
  },
  {
    key: "atmosphere-engine",
    card: "66.666% 0%",
    match: (a, b) => a.primaryKey === "social" && b.primaryKey === "social",
    title: "气氛共振付款机",
    text: "你们的共犯浓度都很高，单独看还能冷静，一起看就会把“我觉得还行”共振成“现在必须拥有”。",
    advice: "适合一起种草，不适合一起看直播。任何链接必须先静置一晚，第二天还想要才允许复诊。"
  },
  {
    key: "warehouse-roommates",
    card: "100% 0%",
    match: (a, b) => a.primaryKey === "hoard" && b.primaryKey === "hoard",
    title: "民间仓储战略联盟",
    text: "你们对“不够用”都有深层敬畏，碰在一起会把纸巾、洗衣液和护肤品囤成家庭基础设施。",
    advice: "适合一起整理库存，不适合一起逛日化大促。先拍柜子，再开购物 App。"
  },
  {
    key: "gift-hostages",
    card: "0% 100%",
    match: (a, b) => a.diagnosisKey === "gift" || b.diagnosisKey === "gift",
    title: "赠品人质交换现场",
    text: "你们的组合里出现了赠品绑架信号。正装是否需要已经不重要，赠品可不可爱正在接管会议。",
    advice: "适合互相欣赏小东西，但要约定：为了赠品多花的钱，不能超过赠品单独估价的两倍。"
  },
  {
    key: "resale-startup",
    card: "33.333% 100%",
    match: (a, b) => a.diagnosisKey === "resale" || b.diagnosisKey === "resale",
    title: "回血商业计划书双人组",
    text: "你们至少有一个人相信“不喜欢还能卖”。这让每次冲动购买都看起来像一场未来创业。",
    advice: "适合互相监督闲置上架。规则很简单：卖出一件旧物，才能批准一件新物入院。"
  },
  {
    key: "dupe-lab",
    card: "66.666% 100%",
    match: (a, b) => a.diagnosisKey === "dupe" || b.diagnosisKey === "dupe" || (a.primaryKey === "bargain" && b.primaryKey === "impulse") || (a.primaryKey === "impulse" && b.primaryKey === "bargain"),
    title: "平替研究院与闪购实验体",
    text: "一个负责把商品研究成论文，一个负责在结论出来前先拍下。你们不是互补，是科研伦理委员会正在迟到。",
    advice: "适合一人做功课一人控时间。冲动方不得先付款，研究方不得无限加平替。"
  },
  {
    key: "flash-rocket",
    card: "100% 100%",
    match: (a, b) => a.primaryKey === "impulse" || b.primaryKey === "impulse",
    title: "闪购火箭发射中心",
    text: "你们的组合里有明显手速风险。只要出现倒计时、限量、最后库存，钱包就会进入发射倒计时。",
    advice: "适合抢演唱会票，不适合抢日用品。所有非刚需商品必须经过 10 分钟冷却。"
  },
  {
    key: "split-treatment",
    card: "66.666% 100%",
    match: () => true,
    title: "适合拼单，不适合凑单",
    text: "你们有一点互补，也有一点危险。一个人的理由会变成另一个人的台阶，最后商品以为自己通过了双人审批。",
    advice: "适合一起买明确刚需，不适合一起为满减扩建需求。先写谁真的需要，再决定谁付款。"
  }
];

const state = {
  current: 0,
  answers: [],
  scores: emptyScores(),
  result: null,
  hostResult: null,
  friendRelation: null
};

const $ = (id) => document.getElementById(id);
const views = ["homeView", "quizView", "resultView"];
const pendingTrackEvents = [];
const translations = window.BINGLI_I18N || {};
const supportedLanguages = ["zh", "en"];
const chineseUi = {
  restart: "重新测试",
  quizEyebrow: "症状采样中",
  quizTitle: "抽象诊室卡",
  resultEyebrow: "诊断完成",
  resultTitle: "你的钱包人格档案",
  reportEyebrow: "抽象病历梗图报告",
  clinic: "618 门诊",
  danger: "钱包危险等级",
  persona: "人格切片",
  verdict: "精神状态",
  symptom: "钱包雷区",
  scene: "高发场景",
  prescription: "今日处方",
  advice: "复查提醒",
  friendEyebrow: "闺蜜钱包搭档测试",
  friendRisk: "一起逛街危险指数",
  friendWhy: "为什么会这样",
  friendAdvice: "相处建议",
  inviteLabel: "朋友挂号链接",
  shareImage: "生成分享图",
  inviteFriend: "让朋友也挂号",
  copyLink: "复制邀请链接"
};
const requestedLanguage = new URLSearchParams(window.location.search).get("lang");
let currentLanguage = supportedLanguages.includes(requestedLanguage)
  ? requestedLanguage
  : localStorage.getItem("shopping-bingli-language") || "zh";

function isEnglish() {
  return currentLanguage === "en";
}

function englishData() {
  return translations.en || {};
}

function uiText(key, fallback = "") {
  return isEnglish() ? englishData().ui?.[key] || fallback : chineseUi[key] || fallback;
}

function dimensionLabel(key) {
  return isEnglish() ? englishData().dimensions?.[key] || dimensions[key] : dimensions[key];
}

function localizedResult(result) {
  if (!result || !isEnglish()) return result;
  return {
    ...result,
    ...(englishData().diagnoses?.[result.diagnosisKey] || {})
  };
}

function localizedRelation(relation) {
  if (!relation || !isEnglish()) return relation;
  const localized = englishData().relations?.[relation.key];
  if (!localized) return relation;
  return {
    ...relation,
    title: localized[0],
    text: localized[1],
    advice: localized[2]
  };
}

function updateLanguageInUrl(language) {
  const url = new URL(window.location.href);
  url.searchParams.set("lang", language);
  window.history.replaceState({}, "", url);
}

function applyLanguage(language, updateUrl = true) {
  currentLanguage = supportedLanguages.includes(language) ? language : "zh";
  localStorage.setItem("shopping-bingli-language", currentLanguage);
  document.documentElement.lang = isEnglish() ? "en" : "zh-CN";

  document.querySelectorAll("[data-zh][data-en]").forEach((node) => {
    node.textContent = node.dataset[currentLanguage];
  });
  document.querySelectorAll("[data-aria-zh][data-aria-en]").forEach((node) => {
    node.setAttribute("aria-label", node.dataset[`aria${isEnglish() ? "En" : "Zh"}`]);
  });
  document.querySelectorAll("[data-ui]").forEach((node) => {
    const fallback = chineseUi[node.dataset.ui] || node.textContent;
    node.textContent = uiText(node.dataset.ui, fallback);
  });
  document.querySelectorAll("[data-lang-switch]").forEach((button) => {
    const active = button.dataset.langSwitch === currentLanguage;
    button.setAttribute("aria-pressed", String(active));
    button.classList.toggle("active", active);
  });

  document.title = isEnglish()
    ? "Shopping Bingli | Discover Your Wallet Personality"
    : "购物病历 | 618 前先挂个号";
  const description = document.querySelector('meta[name="description"]');
  if (description) {
    description.content = isEnglish()
      ? "A playful 24-question test that reveals your wallet personality, shopping triggers and friend compatibility."
      : "购物病历，618 前先挂个号，测测你的钱包得了什么病。";
  }
  if (updateUrl) updateLanguageInUrl(currentLanguage);

  renderRoleMarquee();
  if ($("quizView")?.classList.contains("active")) renderQuestion();
  if ($("resultView")?.classList.contains("active") && state.result) renderResult();
}

function flushTrackEvents() {
  if (!window.umami || typeof window.umami.track !== "function") return false;
  while (pendingTrackEvents.length) {
    const event = pendingTrackEvents.shift();
    window.umami.track(event.name, event.data);
  }
  return true;
}

function trackEvent(name, data = {}) {
  if (!window.umami || typeof window.umami.track !== "function") {
    pendingTrackEvents.push({ name, data });
    return;
  }
  window.umami.track(name, data);
}

window.addEventListener("load", () => {
  if (flushTrackEvents()) return;
  const timer = window.setInterval(() => {
    if (flushTrackEvents()) window.clearInterval(timer);
  }, 1000);
  window.setTimeout(() => window.clearInterval(timer), 8000);
});

function roleShowcaseItems() {
  return [
    { key: "bargain", ...diagnoses.bargain },
    { key: "emotion", ...diagnoses.emotion },
    { key: "impulse", ...diagnoses.impulse },
    { key: "hoard", ...diagnoses.hoard },
    { key: "social", ...diagnoses.social },
    { key: "gift", ...specialDiagnoses.find((item) => item.key === "gift").data },
    { key: "resale", ...specialDiagnoses.find((item) => item.key === "resale").data },
    { key: "dupe", ...specialDiagnoses.find((item) => item.key === "dupe").data }
  ];
}

function renderRoleMarquee() {
  const root = $("roleMarquee");
  if (!root) return;
  const roleItems = roleShowcaseItems();
  const pairItems = relationLabels.slice(0, 8).map((item) => ({
    key: item.key,
    name: item.title,
    subtype: "闺蜜关系卡",
    card: item.card
  }));
  const rows = [
    { items: roleItems, rowClass: "single", artClass: "single-art", reverse: false },
    { items: pairItems, rowClass: "duo", artClass: "duo-art", reverse: true }
  ];
  root.innerHTML = rows
    .map(({ items: rowItems, rowClass, artClass, reverse }) => {
      const doubled = [...rowItems, ...rowItems];
      const cards = doubled.map((item) => {
        const localized = localizedResult({ ...item, diagnosisKey: item.key });
        const relationTranslation = isEnglish() ? englishData().relations?.[item.key] : null;
        const name = relationTranslation?.[0] || localized.name;
        const subtype = relationTranslation ? "Friend compatibility card" : localized.subtype.replace("SBTI：", "").replace("SBTI:", "");
        return `
        <article class="marquee-card ${rowClass}-card">
          <div class="marquee-art ${artClass}" style="--sprite-pos:${item.card || roleCards[item.key]}" aria-hidden="true"></div>
          <div class="marquee-copy">
            <strong>${name}</strong>
            <span>${subtype}</span>
          </div>
        </article>
      `;
      }).join("");
      return `<div class="marquee-row ${rowClass} ${reverse ? "reverse" : ""}"><div class="marquee-track">${cards}</div></div>`;
    })
    .join("");
}

function emptyScores() {
  return Object.keys(dimensions).reduce((acc, key) => {
    acc[key] = 0;
    return acc;
  }, {});
}

function showView(id) {
  views.forEach((viewId) => $(viewId).classList.toggle("active", viewId === id));
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function startQuiz() {
  trackEvent("start_quiz", { hasFriend: Boolean(state.hostResult) });
  state.current = 0;
  state.answers = [];
  state.scores = emptyScores();
  state.result = null;
  $("shareCanvas").classList.remove("ready");
  renderQuestion();
  showView("quizView");
}

function renderQuestion() {
  const question = questions[state.current];
  const englishQuestion = englishData().questions?.[state.current];
  const progress = ((state.current + 1) / questions.length) * 100;
  $("questionCount").textContent = `${state.current + 1}/${questions.length}`;
  $("progressBar").style.width = `${progress}%`;
  $("questionKicker").textContent = isEnglish() && englishQuestion ? englishQuestion[0] : question.kicker;
  $("questionText").textContent = isEnglish() && englishQuestion ? englishQuestion[1] : question.text;

  const list = $("optionList");
  list.innerHTML = "";
  question.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "option-button";
    const marks = ["✓", "×", "?"];
    const optionKeys = ["yes", "no", "unsure"];
    const hintKeys = ["yesHint", "noHint", "unsureHint"];
    const optionText = isEnglish() ? uiText(optionKeys[index], option.text) : option.text;
    const optionHint = isEnglish() ? uiText(hintKeys[index], option.hint) : option.hint;
    button.innerHTML = `<b aria-hidden="true">${marks[index]}</b><strong>${optionText}</strong><span>${optionHint}</span>`;
    button.addEventListener("click", () => answerQuestion(index));
    list.appendChild(button);
  });
}

function answerQuestion(index) {
  const question = questions[state.current];
  const option = question.options[index];
  state.answers[state.current] = index;
  Object.entries(option.scores).forEach(([key, value]) => {
    state.scores[key] += value;
  });

  if (state.current < questions.length - 1) {
    state.current += 1;
    renderQuestion();
    return;
  }

  finishQuiz();
}

function finishQuiz() {
  state.result = computeResult(state.scores, state.answers);
  if (state.hostResult) {
    state.friendRelation = computeRelation(state.hostResult, state.result);
  }
  trackEvent(state.hostResult ? "complete_friend_quiz" : "complete_quiz", {
    diagnosisKey: state.result.diagnosisKey,
    hasFriend: Boolean(state.hostResult)
  });
  renderResult();
  showView("resultView");
}

function computeResult(scores, answers) {
  const scoreEntries = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  const topKey = scoreEntries[0][0];
  const secondKey = scoreEntries[1][0];
  const special = specialDiagnoses.find((item) => item.match(scores, answers));
  const diagnosisKey = special ? special.key : topKey;
  const diagnosis = special ? special.data : diagnoses[topKey];

  return {
    diagnosisKey,
    primaryKey: topKey,
    secondaryKey: secondKey,
    scores: { ...scores },
    answers: [...answers],
    roleCard: roleCards[diagnosisKey],
    ...diagnosis
  };
}

function computeRelation(host, guest) {
  const template = relationLabels.find((item) => item.match(host, guest));
  const hostTop = topDimension(host.scores);
  const guestTop = topDimension(guest.scores);
  const shared = hostTop.key === guestTop.key;
  const strongestGap = biggestDimensionGap(host.scores, guest.scores);
  const basis = shared
    ? `你们的最高维度都是「${dimensions[hostTop.key]}」：你 ${guestTop.value} 分，朋友 ${hostTop.value} 分，所以组合会把同一种消费病灶互相放大。`
    : `你的最高维度是「${dimensions[guestTop.key]}」${guestTop.value} 分，朋友的最高维度是「${dimensions[hostTop.key]}」${hostTop.value} 分；差异最大的是「${dimensions[strongestGap.key]}」，相差 ${strongestGap.gap} 分。这个搭配结果来自你们各自的原始诊断和五维分数。`;

  return {
    ...template,
    basis,
    hostTop,
    guestTop,
    strongestGap
  };
}

function relationBasis(relation) {
  if (!isEnglish()) return relation.basis;
  const { hostTop, guestTop, strongestGap } = relation;
  if (hostTop.key === guestTop.key) {
    return `Your highest dimension is the same: “${dimensionLabel(hostTop.key)}.” You scored ${guestTop.value}; your friend scored ${hostTop.value}. The pairing amplifies the same shopping trigger.`;
  }
  return `Your highest dimension is “${dimensionLabel(guestTop.key)}” (${guestTop.value}); your friend’s is “${dimensionLabel(hostTop.key)}” (${hostTop.value}). Your largest gap is “${dimensionLabel(strongestGap.key)},” at ${strongestGap.gap} points. This duo result comes directly from both original score profiles.`;
}

function topDimension(scores) {
  const [key, value] = Object.entries(scores).sort((a, b) => b[1] - a[1])[0];
  return { key, value };
}

function biggestDimensionGap(aScores, bScores) {
  return Object.keys(dimensions)
    .map((key) => ({ key, gap: Math.abs((aScores[key] || 0) - (bScores[key] || 0)) }))
    .sort((a, b) => b.gap - a.gap)[0];
}

function renderResult() {
  const result = localizedResult(state.result);
  $("diagnosisName").textContent = result.name;
  $("diagnosisSubtype").textContent = result.subtype;
  $("diagnosisSubtitle").textContent = result.subtitle;
  $("dangerStars").textContent = "●".repeat(result.danger) + "○".repeat(5 - result.danger);
  $("dangerPill").textContent = `${result.danger}/5`;
  $("resultTags").innerHTML = [
    `${uiText("resultTagPersonality", "消费人格")}：${dimensionLabel(result.primaryKey)}`,
    `${uiText("resultTagTrigger", "钱包雷区")}：${dimensionLabel(result.secondaryKey)}`,
    uiText("resultTagShare", "适合转发给：每年都说最后一次的人")
  ].map((tag) => `<span>${tag}</span>`).join("");
  $("personaText").textContent = result.persona;
  $("verdictText").textContent = result.verdict;
  $("symptomText").textContent = result.symptom;
  $("sceneText").textContent = result.scene;
  $("prescriptionText").textContent = result.prescription;
  $("adviceText").textContent = result.advice;
  const roleCardArt = $("roleCardArt");
  roleCardArt.className = `role-card-art art-${result.diagnosisKey}`;
  roleCardArt.style.backgroundPosition = result.roleCard;
  roleCardArt.setAttribute("aria-label", `${result.name} Image2 ${uiText("roleCard", "抽象角色卡")}`);
  renderDimensions(state.result.scores);

  if (state.friendRelation && state.hostResult) {
    const relation = localizedRelation(state.friendRelation);
    const host = localizedResult(state.hostResult);
    $("friendPanel").classList.remove("hidden");
    $("friendTitle").textContent = relation.title;
    $("friendText").textContent = isEnglish()
      ? `You are “${result.name}.” Your friend is “${host.name}.” ${relation.text}`
      : `你是「${result.name}」，朋友是「${host.name}」。${relation.text}`;
    $("friendBasis").textContent = relationBasis(state.friendRelation);
    $("friendAdvice").textContent = relation.advice;
    const pairCardArt = $("pairCardArt");
    pairCardArt.className = `pair-card-art pair-${state.friendRelation.key}`;
    pairCardArt.style.backgroundPosition = state.friendRelation.card;
    pairCardArt.setAttribute("aria-label", `${relation.title} Image2 ${uiText("pairCard", "双人搭档卡")}`);
  } else {
    $("friendPanel").classList.add("hidden");
  }
  $("inviteLinkField").value = inviteLink();
}

function renderDimensions(scores) {
  const grid = $("dimensionGrid");
  grid.innerHTML = "";
  Object.entries(dimensions).forEach(([key, label]) => {
    const max = Math.max(1, questions.length * 3);
    const percent = Math.min(100, Math.round((scores[key] / max) * 100));
    const item = document.createElement("div");
    item.className = "dimension-item";
    item.style.setProperty("--score", `${percent}%`);
    item.innerHTML = `<strong>${scores[key]}</strong><span>${dimensionLabel(key)}</span><i style="height:${percent}%"></i>`;
    grid.appendChild(item);
  });
}

function encodePayload(value) {
  return btoa(unescape(encodeURIComponent(JSON.stringify(value))));
}

function decodePayload(value) {
  try {
    return JSON.parse(deURIComponentSafe(escape(atob(value))));
  } catch {
    return null;
  }
}

function deURIComponentSafe(value) {
  return decodeURIComponent(value);
}

function inviteLink() {
  const url = new URL(window.location.href);
  url.hash = `friend=${encodePayload(state.result)}`;
  return url.toString();
}

async function copyInvite(eventName = "copy_invite_link") {
  const link = $("inviteLinkField").value || inviteLink();
  try {
    await navigator.clipboard.writeText(link);
    trackEvent(eventName, { diagnosisKey: state.result?.diagnosisKey || "unknown" });
    toast(uiText("copied", "邀请链接已复制，转给最该挂号的人。"));
  } catch {
    const input = $("inviteLinkField");
    input.focus();
    input.select();
    document.execCommand("copy");
    trackEvent(eventName, { diagnosisKey: state.result?.diagnosisKey || "unknown" });
    toast(uiText("copied", "邀请链接已复制。"));
  }
}

function loadFriendFromHash() {
  const match = window.location.hash.match(/friend=([^&]+)/);
  if (!match) return false;
  const payload = decodePayload(match[1]);
  if (!payload || !payload.name || !payload.scores) return false;
  state.hostResult = payload;
  trackEvent("open_friend_invite", { hostDiagnosisKey: payload.diagnosisKey || "unknown" });
  const host = localizedResult(payload);
  toast(
    isEnglish()
      ? uiText("friendOpened", "Your friend is “{name}.” Now it is your turn.").replace("{name}", host.name)
      : `朋友是「${host.name}」，现在轮到你挂号。`
  );
  startQuiz();
  return true;
}

function drawShareCard() {
  const canvas = $("shareCanvas");
  const ctx = canvas.getContext("2d");
  const result = localizedResult(state.result);
  const relation = localizedRelation(state.friendRelation);
  const host = localizedResult(state.hostResult);
  const isDuo = Boolean(relation && host);
  const width = canvas.width;
  const height = canvas.height;
  const [c1, c2] = result.palette || ["#e84d60", "#128c7e"];

  ctx.clearRect(0, 0, width, height);
  const bg = ctx.createLinearGradient(0, 0, width, height);
  bg.addColorStop(0, "#fff3f7");
  bg.addColorStop(0.48, "#f4edff");
  bg.addColorStop(1, "#e8fff8");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, width, height);
  drawGrid(ctx, width, height);

  ctx.fillStyle = "rgba(255,255,255,0.88)";
  roundRect(ctx, 64, 64, width - 128, height - 128, 48);
  ctx.fill();
  ctx.strokeStyle = "#49384f";
  ctx.lineWidth = 4;
  ctx.stroke();

  if (isDuo) {
    drawDuoAvatar(ctx, 766, 268, c1, c2, result.name, host.name);
    drawSticker(ctx, isEnglish() ? "FRIEND WALLET FILE" : "闺蜜钱包关系卡", 118, 146, "#fff0f6", "#bf5272");

    ctx.fillStyle = "#49384f";
    ctx.font = '900 32px "Microsoft YaHei", sans-serif';
    ctx.fillText(isEnglish() ? "WALLET PERSONALITY TEST" : "618 前先挂个号", 118, 226);

    ctx.fillStyle = "#1f2937";
    ctx.font = '900 72px "Microsoft YaHei", sans-serif';
    wrapText(ctx, relation.title, 118, 342, 640, 82, 2);

    ctx.fillStyle = "#766577";
    ctx.font = '800 28px "Microsoft YaHei", sans-serif';
    wrapText(ctx, isEnglish() ? `YOU: ${result.name}  |  FRIEND: ${host.name}` : `你：${result.name}  |  朋友：${host.name}`, 118, 520, 800, 38, 2);

    drawTextPill(ctx, uiText("friendWhy", "为什么会这样"), relationBasis(state.friendRelation), 118, 650, 3, "#fff5dc");
    drawTextPill(ctx, uiText("friendRisk", "一起逛街危险指数"), relation.text, 118, 920, 2, "#eefbf7");
    drawTextPill(ctx, uiText("friendAdvice", "相处建议"), relation.advice, 118, 1135, 2, "#f5efff");

    ctx.fillStyle = "#bf5272";
    roundRect(ctx, 118, 1304, 844, 72, 36);
    ctx.fill();
    ctx.fillStyle = "#ffffff";
    ctx.font = '900 30px "Microsoft YaHei", sans-serif';
    ctx.textAlign = "center";
    ctx.fillText(isEnglish() ? "NOT RANDOM SHOPPING. YOUR WALLETS TOOK A PHOTO." : "这不是乱买，是你们的钱包在合照。", 540, 1349);
    ctx.textAlign = "left";

    canvas.classList.add("ready");
    trackEvent("generate_share_image", {
      diagnosisKey: result.diagnosisKey,
      hasFriend: true
    });
    toast(uiText("duoShareReady", "双人会诊分享图已生成，可以长按保存或截图。"));
    return;
  }

  drawAbstractAvatar(ctx, 782, 330, c1, c2, result.name);
  drawSticker(ctx, isEnglish() ? "WALLET PERSONALITY" : "消费人格病历", 118, 146, "#fff0f6", "#bf5272");

  ctx.fillStyle = "#49384f";
  ctx.font = '900 32px "Microsoft YaHei", sans-serif';
  ctx.fillText(isEnglish() ? "UNOFFICIAL SHOPPING FILE" : "618 前先挂个号", 118, 226);

  ctx.fillStyle = "#1f2937";
  ctx.font = '900 72px "Microsoft YaHei", sans-serif';
  wrapText(ctx, result.name, 118, 344, 620, 82, 2);

  ctx.fillStyle = "#766577";
  ctx.font = '900 28px "Microsoft YaHei", sans-serif';
  wrapText(ctx, result.subtype, 118, 505, 760, 38, 2);

  drawShareRow(ctx, uiText("danger", "钱包危险等级"), "●".repeat(result.danger) + "○".repeat(5 - result.danger), 118, 610, c1);
  drawTextPill(ctx, uiText("persona", "人格切片"), result.persona, 118, 742, 3, "#fff5dc");
  drawTextPill(ctx, uiText("verdict", "精神状态"), result.verdict, 118, 1006, 2, "#eefbf7");
  drawTextPill(ctx, uiText("prescription", "今日处方"), result.prescription, 118, 1198, 2, "#f5efff");

  ctx.fillStyle = "#bf5272";
  roundRect(ctx, 118, 1304, 844, 72, 36);
  ctx.fill();
  ctx.fillStyle = "#ffffff";
  ctx.font = '900 28px "Microsoft YaHei", sans-serif';
  ctx.textAlign = "center";
  wrapText(ctx, result.share, 540, 1347, 760, 34, 1);
  ctx.textAlign = "left";

  canvas.classList.add("ready");
  trackEvent("generate_share_image", {
    diagnosisKey: result.diagnosisKey,
    hasFriend: false
  });
  toast(uiText("shareReady", "分享图已生成，可以长按保存或截图。"));
}

function drawSticker(ctx, text, x, y, bg, color) {
  ctx.fillStyle = bg;
  roundRect(ctx, x, y - 36, 280, 54, 20);
  ctx.fill();
  ctx.strokeStyle = "rgba(73,56,79,0.28)";
  ctx.lineWidth = 3;
  ctx.stroke();
  ctx.fillStyle = color;
  ctx.font = '900 26px "Microsoft YaHei", sans-serif';
  ctx.fillText(text, x + 24, y);
}

function drawTextPill(ctx, label, text, x, y, maxLines, bg) {
  ctx.fillStyle = bg;
  roundRect(ctx, x, y - 42, 844, 164 + (maxLines - 2) * 34, 28);
  ctx.fill();
  ctx.strokeStyle = "rgba(73,56,79,0.16)";
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.fillStyle = "#bf5272";
  ctx.font = '900 26px "Microsoft YaHei", sans-serif';
  ctx.fillText(label, x + 30, y);
  ctx.fillStyle = "#49384f";
  ctx.font = '700 29px "Microsoft YaHei", sans-serif';
  wrapText(ctx, text, x + 30, y + 48, 780, 38, maxLines);
}

function drawGrid(ctx, width, height) {
  ctx.strokeStyle = "rgba(191,82,114,0.08)";
  ctx.lineWidth = 2;
  for (let x = 0; x < width; x += 54) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }
  for (let y = 0; y < height; y += 54) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }
}

function drawAbstractAvatar(ctx, x, y, c1, c2, label) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(0.07);
  ctx.fillStyle = "#ffffff";
  roundRect(ctx, -122, -138, 244, 286, 42);
  ctx.fill();
  ctx.strokeStyle = "#49384f";
  ctx.lineWidth = 4;
  ctx.stroke();
  ctx.fillStyle = c2;
  roundRect(ctx, -88, -102, 176, 176, 54);
  ctx.fill();
  ctx.fillStyle = c1;
  ctx.beginPath();
  ctx.arc(0, -34, 56, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#fff3f7";
  ctx.fillRect(-40, 30, 80, 86);
  ctx.fillStyle = "#49384f";
  ctx.font = '900 25px "Microsoft YaHei", sans-serif';
  ctx.textAlign = "center";
  ctx.fillText(label.slice(0, 4), 0, 126);
  ctx.restore();
}

function drawDuoAvatar(ctx, x, y, c1, c2, leftLabel, rightLabel) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(-0.04);
  ctx.fillStyle = "#ffffff";
  roundRect(ctx, -142, -126, 284, 246, 46);
  ctx.fill();
  ctx.strokeStyle = "#49384f";
  ctx.lineWidth = 4;
  ctx.stroke();
  ctx.fillStyle = c1;
  ctx.beginPath();
  ctx.arc(-50, -20, 56, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = c2;
  ctx.beginPath();
  ctx.arc(56, -10, 56, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = "#bf5272";
  ctx.lineWidth = 8;
  ctx.beginPath();
  ctx.moveTo(-2, 30);
  ctx.lineTo(24, 30);
  ctx.stroke();
  ctx.fillStyle = "#49384f";
  ctx.font = '900 22px "Microsoft YaHei", sans-serif';
  ctx.textAlign = "center";
  ctx.fillText(leftLabel.slice(0, 3), -58, 94);
  ctx.fillText(rightLabel.slice(0, 3), 60, 94);
  ctx.restore();
}

function drawShareRow(ctx, label, value, x, y, color) {
  ctx.fillStyle = "#fff0f6";
  roundRect(ctx, x, y, 844, 84, 28);
  ctx.fill();
  ctx.fillStyle = "#bf5272";
  ctx.font = '900 27px "Microsoft YaHei", sans-serif';
  ctx.fillText(label, x + 30, y + 53);
  ctx.fillStyle = color;
  ctx.font = '900 32px "Microsoft YaHei", sans-serif';
  ctx.fillText(value, x + 560, y + 54);
}

function wrapText(ctx, text, x, y, maxWidth, lineHeight, maxLines = 99) {
  const chars = Array.from(text);
  let line = "";
  let lines = 0;
  for (const char of chars) {
    const testLine = line + char;
    if (ctx.measureText(testLine).width > maxWidth && line) {
      lines += 1;
      if (lines >= maxLines) {
        ctx.fillText(line.slice(0, Math.max(0, line.length - 1)) + "…", x, y);
        return;
      }
      ctx.fillText(line, x, y);
      line = char;
      y += lineHeight;
    } else {
      line = testLine;
    }
  }
  if (line) ctx.fillText(line, x, y);
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function toast(text) {
  const node = $("toast");
  node.textContent = text;
  node.classList.add("show");
  clearTimeout(node.timer);
  node.timer = setTimeout(() => node.classList.remove("show"), 2200);
}

function bindEvents() {
  $("startBtn").addEventListener("click", startQuiz);
  $("backHomeBtn").addEventListener("click", () => showView("homeView"));
  $("restartTopBtn").addEventListener("click", startQuiz);
  $("restartBtn").addEventListener("click", startQuiz);
  $("saveImageBtn").addEventListener("click", drawShareCard);
  $("inviteBtn").addEventListener("click", () => copyInvite("invite_friend"));
  $("copyInviteBtn").addEventListener("click", () => copyInvite("copy_invite_link"));
  document.querySelectorAll("[data-lang-switch]").forEach((button) => {
    button.addEventListener("click", () => applyLanguage(button.dataset.langSwitch));
  });
  window.addEventListener("hashchange", loadFriendFromHash);
}

bindEvents();
applyLanguage(currentLanguage, false);
if (!loadFriendFromHash()) {
  showView("homeView");
}
