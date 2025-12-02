# 中国朝代更迭动态演示系统

## 当前状态

### 已完成功能
- ✅ 项目基础结构
- ✅ 数据类型定义
- ✅ 朝代数据（已包含5个主要朝代：夏、商、周、秦、汉）
- ✅ 时间轴视图
- ✅ 卡片流视图
- ✅ 朝代详情面板
- ✅ 视图切换功能
- ✅ 基础UI和布局

### 待完成功能
- [ ] 添加更多朝代数据（完成所有17个主要朝代）
- [ ] 地图视图
- [ ] 关系图视图
- [ ] 搜索功能实现
- [ ] 筛选功能
- [ ] 对比功能
- [ ] 智能助手UI
- [ ] 封面图（cover.png）

## 如何运行

1. 确保已安装依赖：
```bash
pnpm install
```

2. 启动开发服务器：
```bash
pnpm dev
```

3. 访问：
```
http://localhost:3000/dynasty
```

## 添加封面图

需要在 `src/app/dynasty/` 目录下添加 `cover.png` 文件，建议尺寸：1200x630px

可以使用以下方式创建：
- 使用设计工具（Figma、Photoshop等）创建
- 使用AI生成工具
- 使用项目截图

## 数据结构

朝代数据位于 `src/app/dynasty/data/dynasties.ts`，按照以下格式添加新朝代：

```typescript
{
  id: "dynasty-id",
  name: "朝代名称",
  startYear: -202,  // 公元前用负数
  endYear: 220,
  founder: "开国皇帝",
  capital: ["都城1", "都城2"],
  territory: {
    description: "疆域描述"
  },
  majorEvents: [...],
  declineReasons: [...],
  fallDetails: {...},
  culturalAchievements: [...],
  notableFigures: [...],
  color: "#颜色代码",
  icon: "crown"
}
```

