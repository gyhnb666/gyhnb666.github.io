// 雨滴特效 - 优化版
(function() {
  const canvas = document.createElement('canvas');
  canvas.id = 'rain-canvas';
  canvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:9999;opacity:0.6';
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  let drops = [];
  let animationId;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function createDrop() {
    return {
      x: Math.random() * canvas.width,
      y: -10,
      speed: 2 + Math.random() * 4,
      length: 10 + Math.random() * 20,
      opacity: 0.1 + Math.random() * 0.3
    };
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 添加新雨滴
    if (drops.length < 150) {
      drops.push(createDrop());
    }

    // 更新和绘制雨滴
    for (let i = drops.length - 1; i >= 0; i--) {
      const drop = drops[i];
      ctx.beginPath();
      ctx.moveTo(drop.x, drop.y);
      ctx.lineTo(drop.x + 1, drop.y + drop.length);
      ctx.strokeStyle = `rgba(174, 194, 224, ${drop.opacity})`;
      ctx.lineWidth = 1;
      ctx.stroke();

      drop.y += drop.speed;

      // 移除超出屏幕的雨滴
      if (drop.y > canvas.height) {
        drops.splice(i, 1);
      }
    }

    animationId = requestAnimationFrame(animate);
  }

  // 初始化
  resize();
  window.addEventListener('resize', resize);
  animate();

  // 页面卸载时清理
  window.addEventListener('beforeunload', function() {
    cancelAnimationFrame(animationId);
  });
})();
