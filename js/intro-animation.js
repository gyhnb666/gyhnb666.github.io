// ===== 炫酷开场动画 =====

(function() {
  'use strict';

  function createIntroAnimation() {
    // 检查是否已经看过开场动画（24小时内不重复显示）
    const lastShown = localStorage.getItem('introLastShown');
    const now = Date.now();
    if (lastShown && (now - parseInt(lastShown)) < 24 * 60 * 60 * 1000) {
      return;
    }

    // 创建开场动画容器
    const intro = document.createElement('div');
    intro.id = 'intro-animation';
    intro.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 9999999;
      overflow: hidden;
      font-family: 'Noto Serif SC', serif;
    `;

    // 动画内容
    intro.innerHTML = `
      <!-- 背景粒子 -->
      <canvas id="intro-canvas" style="position:absolute;top:0;left:0;width:100%;height:100%;"></canvas>

      <!-- 主内容 -->
      <div id="intro-content" style="
        position: relative;
        z-index: 10;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100%;
        text-align: center;
        opacity: 0;
      ">
        <!-- Logo/头像 -->
        <div id="intro-avatar" style="
          width: 120px;
          height: 120px;
          border-radius: 50%;
          overflow: hidden;
          margin-bottom: 30px;
          transform: scale(0) rotate(180deg);
          transition: all 1s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          box-shadow: 0 0 50px rgba(102, 126, 234, 0.5);
          border: 4px solid rgba(255,255,255,0.8);
        ">
          <img src="/images/avatar.jpg" style="width:100%;height:100%;object-fit:cover;" onerror="this.src='/images/avatar.gif'">
        </div>

        <!-- 标题 -->
        <h1 id="intro-title" style="
          font-size: 3.5rem;
          font-weight: 700;
          margin: 0 0 10px;
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s ease;
          background: linear-gradient(135deg, #fff, #e0e0e0);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-shadow: none;
        ">卡密的博客</h1>

        <!-- 副标题 -->
        <p id="intro-subtitle" style="
          font-size: 1.3rem;
          color: rgba(255,255,255,0.8);
          margin: 0 0 40px;
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.8s ease 0.3s;
          letter-spacing: 5px;
        ">记录学习与生活的点滴</p>

        <!-- 装饰线条 -->
        <div id="intro-line" style="
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent);
          margin-bottom: 40px;
          transition: width 1s ease 0.5s;
        "></div>

        <!-- 特色文字 -->
        <div id="intro-features" style="
          display: flex;
          gap: 30px;
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.8s ease 0.7s;
        ">
          <span style="color: rgba(255,255,255,0.7); font-size: 0.9rem;">✨ 技术</span>
          <span style="color: rgba(255,255,255,0.7); font-size: 0.9rem;">📚 学习</span>
          <span style="color: rgba(255,255,255,0.7); font-size: 0.9rem;">🎨 创意</span>
        </div>

        <!-- 进入按钮 -->
        <button id="intro-enter" style="
          margin-top: 50px;
          padding: 15px 50px;
          background: rgba(255,255,255,0.15);
          border: 2px solid rgba(255,255,255,0.5);
          color: white;
          font-size: 1rem;
          border-radius: 50px;
          cursor: pointer;
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.8s ease 1s;
          backdrop-filter: blur(10px);
          letter-spacing: 3px;
        ">
          ✨ 进入博客 ✨
        </button>

        <!-- 跳过提示 -->
        <div id="intro-skip" style="
          position: absolute;
          bottom: 30px;
          right: 30px;
          color: rgba(255,255,255,0.5);
          font-size: 0.8rem;
          cursor: pointer;
          opacity: 0;
          transition: opacity 0.3s ease;
        ">
          按 ESC 跳过 →
        </div>
      </div>

      <!-- 打字效果容器 -->
      <div id="intro-typewriter" style="
        position: absolute;
        bottom: 15%;
        left: 50%;
        transform: translateX(-50%);
        color: rgba(255,255,255,0.6);
        font-size: 1rem;
        z-index: 10;
        font-family: 'Fira Code', monospace;
        opacity: 0;
        transition: opacity 0.5s ease;
      "></div>
    `;

    document.body.appendChild(intro);

    // 背景粒子动画
    initIntroParticles();

    // 动画序列
    setTimeout(() => {
      document.getElementById('intro-content').style.opacity = '1';
    }, 300);

    setTimeout(() => {
      document.getElementById('intro-avatar').style.transform = 'scale(1) rotate(0deg)';
    }, 500);

    setTimeout(() => {
      document.getElementById('intro-title').style.opacity = '1';
      document.getElementById('intro-title').style.transform = 'translateY(0)';
    }, 1000);

    setTimeout(() => {
      document.getElementById('intro-subtitle').style.opacity = '1';
      document.getElementById('intro-subtitle').style.transform = 'translateY(0)';
    }, 1300);

    setTimeout(() => {
      document.getElementById('intro-line').style.width = '200px';
    }, 1500);

    setTimeout(() => {
      document.getElementById('intro-features').style.opacity = '1';
      document.getElementById('intro-features').style.transform = 'translateY(0)';
    }, 1800);

    setTimeout(() => {
      document.getElementById('intro-enter').style.opacity = '1';
      document.getElementById('intro-enter').style.transform = 'translateY(0)';
    }, 2100);

    setTimeout(() => {
      document.getElementById('intro-skip').style.opacity = '1';
    }, 2500);

    // 打字效果
    setTimeout(() => {
      const typewriter = document.getElementById('intro-typewriter');
      typewriter.style.opacity = '1';
      const messages = [
        '> 初始化博客系统...',
        '> 加载主题配置...',
        '> 渲染页面组件...',
        '> 欢迎访问！🚀'
      ];
      let msgIndex = 0;
      let charIndex = 0;

      function typeMessage() {
        if (msgIndex < messages.length) {
          if (charIndex < messages[msgIndex].length) {
            typewriter.textContent += messages[msgIndex][charIndex];
            charIndex++;
            setTimeout(typeMessage, 30);
          } else {
            typewriter.textContent += '\n';
            msgIndex++;
            charIndex = 0;
            setTimeout(typeMessage, 300);
          }
        }
      }
      typeMessage();
    }, 2000);

    // 进入按钮事件
    document.getElementById('intro-enter').addEventListener('click', exitIntro);
    document.getElementById('intro-enter').addEventListener('mouseenter', (e) => {
      e.target.style.background = 'rgba(255,255,255,0.3)';
      e.target.style.transform = 'translateY(-3px) scale(1.05)';
      e.target.style.boxShadow = '0 10px 30px rgba(0,0,0,0.2)';
    });
    document.getElementById('intro-enter').addEventListener('mouseleave', (e) => {
      e.target.style.background = 'rgba(255,255,255,0.15)';
      e.target.style.transform = 'translateY(0) scale(1)';
      e.target.style.boxShadow = 'none';
    });

    // ESC键跳过
    document.addEventListener('keydown', function escHandler(e) {
      if (e.key === 'Escape') {
        exitIntro();
        document.removeEventListener('keydown', escHandler);
      }
    });

    // 点击跳过提示
    document.getElementById('intro-skip').addEventListener('click', exitIntro);

    // 5秒后自动进入
    setTimeout(exitIntro, 8000);
  }

  function exitIntro() {
    const intro = document.getElementById('intro-animation');
    if (!intro) return;

    // 记录显示时间
    localStorage.setItem('introLastShown', Date.now().toString());

    // 退出动画
    intro.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    intro.style.opacity = '0';
    intro.style.transform = 'scale(1.1)';

    setTimeout(() => {
      intro.remove();
    }, 800);
  }

  // 背景粒子效果
  function initIntroParticles() {
    const canvas = document.getElementById('intro-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 80;

    // 创建粒子
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 2,
        speedY: (Math.random() - 0.5) * 2,
        opacity: Math.random() * 0.5 + 0.2
      });
    }

    // 连线距离
    const maxDistance = 150;

    function animateParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 绘制渐变背景
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, '#0c0c1d');
      gradient.addColorStop(0.5, '#1a1a3e');
      gradient.addColorStop(1, '#2d1b69');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // 更新和绘制粒子
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // 更新位置
        p.x += p.speedX;
        p.y += p.speedY;

        // 边界检测
        if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
        if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;

        // 绘制粒子
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(102, 126, 234, ${p.opacity})`;
        ctx.fill();

        // 绘制连线
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < maxDistance) {
            const opacity = (1 - distance / maxDistance) * 0.3;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(102, 126, 234, ${opacity})`;
            ctx.lineWidth = 1;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(animateParticles);
    }

    animateParticles();

    // 窗口大小改变时调整canvas
    window.addEventListener('resize', () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });
  }

  // 页面加载时创建开场动画
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createIntroAnimation);
  } else {
    createIntroAnimation();
  }
})();
