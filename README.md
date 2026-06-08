# 购物病历

618 节点型移动端 H5 测试产品原型：消费版 SBTI + 甜酷抽象购物人格 + 角色卡分享。

## 已实现

- 24 道 SBTI 风格判断题，答案统一为“是 / 否 / 不确定”，降低完成门槛。
- 结果诊断单、分享图、朋友互测和双人钱包会诊流程。
- 5 个计分维度：冲动值、囤积欲、薅感雷达、情绪代偿、共犯浓度。
- 8 种诊断结果：
  - 补贴神谕接收器
  - 情绪止痛型买手
  - 平替考古学家
  - 直播间气氛受体
  - 家庭库存守夜人
  - 赠品绑架型人格
  - 闲置回血幻想家
  - 理性离线闪购体
- 结果卡包含诊断名称、SBTI 代号、钱包危险等级、人格切片、精神状态、钱包雷区、高发场景、今日处方和复查提醒。
- Image2 生成的 8 角色卡合集已复制到 `assets/image2/shopping-diagnosis-role-cards.png`，结果页会按诊断类型裁切展示对应角色卡。
- Image2 生成的 8 双人搭档卡合集已复制到 `assets/image2/shopping-diagnosis-duo-cards.png`，好友互测完成后会按双人组合裁切展示对应搭档卡。
- `assets/role-cards/` 保留一套 SVG 角色卡作为项目内兜底资产。
- 前端 canvas 生成 1080 x 1440 分享图，好友互测完成后优先生成双人会诊分享图。
- URL hash 邀请链接模拟朋友互测，无登录、无账单上传、无 AI。
- 前台已移除商业化展示，结果页只保留测试、互测和分享体验。

## 变现思路

- 第一版不在前台展示价格或付费墙，先验证完成率、保存分享图率和邀请朋友点击率。
- 后续商业化只做内部验证：品牌联名结果卡、大促节点复查、记账/二手/返利社区 CPS，不影响首轮轻体验。
- 商业合作：大促节点与记账、二手、返利、省钱社区做 CPS 或联名结果卡，但不能破坏“不上传账单、不接 AI”的轻体验。

## 试用

直接打开 `index.html` 即可运行。也可以在本目录启动任意静态服务器访问。

## 上线配置

- 正式域名：`https://bingli.200305.xyz/`
- GitHub Pages 自定义域名文件：`CNAME`
- Cloudflare DNS 建议：
  - Type: `CNAME`
  - Name: `bingli`
  - Target: `你的GitHub用户名.github.io`
  - Proxy status: 先用 `DNS only`，确认 GitHub Pages HTTPS 生效后再按需开启代理。
- Umami Cloud：
  - Website domain 填 `bingli.200305.xyz`
  - 将 `index.html` 中的 `REPLACE_WITH_UMAMI_WEBSITE_ID` 替换为 Umami 生成的真实 Website ID。
- 当前埋点事件：
  - `start_quiz`
  - `complete_quiz`
  - `generate_share_image`
  - `invite_friend`
  - `copy_invite_link`
  - `open_friend_invite`
  - `complete_friend_quiz`
