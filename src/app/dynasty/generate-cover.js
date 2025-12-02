// 生成封面图的脚本
// 使用 Node.js 和 canvas 库将 SVG 转换为 PNG
// 需要安装: npm install canvas

const fs = require('fs');
const { createCanvas, loadImage } = require('canvas');

async function generateCover() {
  const width = 1200;
  const height = 630;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  // 背景渐变
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, '#1e1b4b');
  gradient.addColorStop(0.5, '#312e81');
  gradient.addColorStop(1, '#1e1b4b');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  // 光效
  const glow1 = ctx.createRadialGradient(300, 200, 0, 300, 200, 200);
  glow1.addColorStop(0, 'rgba(139, 92, 246, 0.3)');
  glow1.addColorStop(1, 'rgba(139, 92, 246, 0)');
  ctx.fillStyle = glow1;
  ctx.fillRect(0, 0, width, height);

  const glow2 = ctx.createRadialGradient(900, 430, 0, 900, 430, 250);
  glow2.addColorStop(0, 'rgba(139, 92, 246, 0.2)');
  glow2.addColorStop(1, 'rgba(139, 92, 246, 0)');
  ctx.fillStyle = glow2;
  ctx.fillRect(0, 0, width, height);

  // 时间轴线条
  ctx.strokeStyle = 'rgba(139, 92, 246, 0.4)';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(100, 400);
  ctx.lineTo(1100, 400);
  ctx.stroke();

  // 朝代节点
  const dynasties = [
    { x: 150, color: '#8B4513', size: 8 },
    { x: 250, color: '#CD853F', size: 8 },
    { x: 350, color: '#4169E1', size: 8 },
    { x: 450, color: '#2F4F4F', size: 8 },
    { x: 550, color: '#FF6347', size: 8 },
    { x: 650, color: '#FFD700', size: 10 },
    { x: 750, color: '#32CD32', size: 8 },
    { x: 850, color: '#DC143C', size: 8 },
    { x: 950, color: '#000000', size: 8 },
  ];

  dynasties.forEach(d => {
    ctx.fillStyle = d.color;
    ctx.globalAlpha = 0.8;
    ctx.beginPath();
    ctx.arc(d.x, 400, d.size, 0, Math.PI * 2);
    ctx.fill();
  });

  // 连接线
  ctx.strokeStyle = 'rgba(139, 92, 246, 0.3)';
  ctx.lineWidth = 2;
  ctx.setLineDash([5, 5]);
  ctx.beginPath();
  ctx.moveTo(150, 400);
  dynasties.slice(1).forEach(d => ctx.lineTo(d.x, 400));
  ctx.stroke();
  ctx.setLineDash([]);

  // 主标题
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 72px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
  ctx.shadowBlur = 3;
  ctx.shadowOffsetY = 2;
  ctx.fillText('中国朝代更迭', width / 2, 180);

  // 副标题
  ctx.fillStyle = '#e0e7ff';
  ctx.font = '32px Arial';
  ctx.globalAlpha = 0.9;
  ctx.fillText('从夏朝到清朝的历史演示', width / 2, 240);

  // 英文副标题
  ctx.fillStyle = '#a5b4fc';
  ctx.font = '24px Arial';
  ctx.globalAlpha = 0.7;
  ctx.fillText('Chinese Dynasty Timeline', width / 2, 280);

  // 底部信息
  ctx.fillStyle = '#a5b4fc';
  ctx.font = '18px Arial';
  ctx.globalAlpha = 0.8;
  ctx.fillText('开国皇帝 · 时间 · 都城 · 重要事件 · 衰落原因', width / 2, 560);

  // 保存为 PNG
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync('src/app/dynasty/cover.png', buffer);
  console.log('封面图已生成: src/app/dynasty/cover.png');
}

// 如果直接运行此脚本
if (require.main === module) {
  generateCover().catch(console.error);
}

module.exports = { generateCover };

