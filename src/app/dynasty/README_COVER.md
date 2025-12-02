# 封面图说明

## 已创建的封面图

### SVG 版本
- **文件**：`cover.svg`
- **格式**：SVG（矢量图，可缩放）
- **尺寸**：1200x630px
- **特点**：
  - 深色主题，符合项目整体风格
  - 包含时间轴和朝代节点
  - 渐变背景和光效
  - 中英文标题

### PNG 版本（可选）
如果需要 PNG 格式，可以使用以下方法：

#### 方法1：使用浏览器转换
1. 在浏览器中打开 `cover.svg`
2. 使用浏览器截图工具或开发者工具
3. 导出为 PNG（1200x630px）

#### 方法2：使用在线工具
- 使用 [CloudConvert](https://cloudconvert.com/svg-to-png) 等在线转换工具
- 上传 `cover.svg`，设置尺寸为 1200x630px，转换为 PNG

#### 方法3：使用 Node.js 脚本
项目根目录已包含 `generate-cover.js` 脚本，需要安装 canvas 库：
```bash
npm install canvas
node src/app/dynasty/generate-cover.js
```

#### 方法4：使用设计工具
- 使用 Figma、Photoshop、Illustrator 等设计工具打开 SVG
- 导出为 PNG（1200x630px）

## 当前配置

`demo.json` 已配置为使用 `cover.svg`。如果创建了 PNG 版本，可以修改为：
```json
{
  "image": "cover.png"
}
```

## 设计说明

封面图设计包含以下元素：
- **背景**：深紫色渐变（#1e1b4b → #312e81）
- **光效**：紫色光晕效果
- **时间轴**：水平线条，展示朝代更迭
- **朝代节点**：9个主要朝代的彩色圆点
- **标题**：中文"中国朝代更迭"和英文"Chinese Dynasty Timeline"
- **装饰元素**：几何图案和建筑轮廓

## 自定义

如果需要修改封面图：
1. 直接编辑 `cover.svg` 文件
2. 或使用设计工具打开并修改
3. 保持 1200x630px 的宽高比

