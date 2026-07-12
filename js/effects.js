// ===== 博客美化特效合集 =====

(function() {
  'use strict';

  // 1. 鼠标点击爱心特效
  function createHeart(e) {
    const heart = document.createElement('div');
    heart.innerHTML = '❤';
    heart.style.cssText = `
      position: fixed;
      left: ${e.clientX}px;
      top: ${e.clientY}px;
      pointer-events: none;
      font-size: 20px;
      z-index: 99999;
      animation: heartFloat 1s ease-out forwards;
      color: hsl(${Math.random() * 360}, 70%, 60%);
    `;
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 1000);
  }

  // 2. 鼠标点击文字特效
  const clickWords = ['富强', '民主', '文明', '和谐', '自由', '平等', '公正', '法治', '爱国', '敬业', '诚信', '友善'];
  function createClickWord(e) {
    const word = document.createElement('span');
    word.textContent = clickWords[Math.floor(Math.random() * clickWords.length)];
    word.style.cssText = `
      position: fixed;
      left: ${e.clientX}px;
      top: ${e.clientY - 20}px;
      pointer-events: none;
      font-size: 16px;
      font-weight: bold;
      z-index: 99999;
      animation: wordFloat 1.5s ease-out forwards;
      color: hsl(${Math.random() * 360}, 80%, 50%);
      text-shadow: 0 0 5px rgba(0,0,0,0.3);
    `;
    document.body.appendChild(word);
    setTimeout(() => word.remove(), 1500);
  }

  // 3. 鼠标烟花特效
  function createFirework(e) {
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7', '#dfe6e9', '#fd79a8'];
    for (let i = 0; i < 8; i++) {
      const particle = document.createElement('div');
      const angle = (Math.PI * 2 / 8) * i;
      const velocity = 50 + Math.random() * 50;
      const x = Math.cos(angle) * velocity;
      const y = Math.sin(angle) * velocity;
      particle.style.cssText = `
        position: fixed;
        left: ${e.clientX}px;
        top: ${e.clientY}px;
        width: 6px;
        height: 6px;
        border-radius: 50%;
        pointer-events: none;
        z-index: 99999;
        background: ${colors[Math.floor(Math.random() * colors.length)]};
        animation: particleFly 0.8s ease-out forwards;
        --x: ${x}px;
        --y: ${y}px;
      `;
      document.body.appendChild(particle);
      setTimeout(() => particle.remove(), 800);
    }
  }

  // 4. 飘落的樱花/树叶效果
  function createFallingElement() {
    const element = document.createElement('div');
    const type = Math.random() > 0.5 ? '🌸' : '🍃';
    element.textContent = type;
    const startX = Math.random() * window.innerWidth;
    const duration = 5000 + Math.random() * 5000;
    const size = 14 + Math.random() * 14;
    element.style.cssText = `
      position: fixed;
      left: ${startX}px;
      top: -30px;
      font-size: ${size}px;
      pointer-events: none;
      z-index: 9998;
      opacity: ${0.6 + Math.random() * 0.4};
      animation: falling ${duration}ms linear forwards;
      filter: drop-shadow(0 0 3px rgba(0,0,0,0.1));
    `;
    document.body.appendChild(element);
    setTimeout(() => element.remove(), duration);
  }

  // 5. 自定义光标跟随效果
  function createCursorTrail(e) {
    const trail = document.createElement('div');
    trail.style.cssText = `
      position: fixed;
      left: ${e.clientX}px;
      top: ${e.clientY}px;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      pointer-events: none;
      z-index: 99998;
      background: radial-gradient(circle, rgba(102, 126, 234, 0.8), transparent);
      animation: trailFade 0.5s ease-out forwards;
    `;
    document.body.appendChild(trail);
    setTimeout(() => trail.remove(), 500);
  }

  // 6. 页面滚动进度条增强
  function updateScrollProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / docHeight) * 100;
    const progressBar = document.getElementById('scroll-progress');
    if (progressBar) {
      progressBar.style.width = progress + '%';
    }
  }

  // 7. 标题动画效果
  function animateTitle() {
    const title = document.querySelector('.site-title');
    if (title) {
      title.addEventListener('mouseenter', () => {
        title.style.animation = 'none';
        title.offsetHeight; // 触发重绘
        title.style.animation = 'titleBounce 0.5s ease';
      });
    }
  }

  // 8. 文章卡片3D倾斜效果 (已禁用)
  function initTiltEffect() {
    // 已移除倾斜效果
  }

  // 9. 打字机效果
  function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';
    function type() {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
        setTimeout(type, speed);
      }
    }
    type();
  }

  // 10. 滚动显示动画
  function initScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.post-block, .sidebar-inner').forEach(el => {
      el.classList.add('scroll-reveal');
      observer.observe(el);
    });
  }

  // 11. 夜间模式切换按钮
  function createDarkModeToggle() {
    const btn = document.createElement('button');
    btn.innerHTML = '🌙';
    btn.id = 'dark-mode-toggle';
    btn.style.cssText = `
      position: fixed;
      bottom: 80px;
      right: 20px;
      width: 45px;
      height: 45px;
      border-radius: 50%;
      border: 2px solid rgba(102, 126, 234, 0.3);
      background: rgba(255,255,255,0.9);
      font-size: 20px;
      cursor: pointer;
      z-index: 9999;
      box-shadow: 0 4px 15px rgba(0,0,0,0.1);
      transition: all 0.3s ease;
      backdrop-filter: blur(10px);
    `;
    btn.addEventListener('mouseenter', () => {
      btn.style.transform = 'scale(1.1) rotate(20deg)';
      btn.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.4)';
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'scale(1) rotate(0deg)';
      btn.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
    });
    btn.addEventListener('click', toggleDarkMode);
    document.body.appendChild(btn);
  }

  // 12. 夜间模式切换
  function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const btn = document.getElementById('dark-mode-toggle');
    if (document.body.classList.contains('dark-mode')) {
      btn.innerHTML = '☀️';
      localStorage.setItem('darkMode', 'true');
    } else {
      btn.innerHTML = '🌙';
      localStorage.setItem('darkMode', 'false');
    }
  }

  // 13. 返回顶部平滑滚动
  function smoothScrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // 14. 阅读时间估算
  function estimateReadingTime() {
    const postBody = document.querySelector('.post-body');
    if (postBody) {
      const text = postBody.textContent;
      const wordCount = text.length;
      const readingTime = Math.ceil(wordCount / 500); // 假设每分钟500字
      const meta = document.querySelector('.post-meta');
      if (meta) {
        const timeSpan = document.createElement('span');
        timeSpan.className = 'reading-time';
        timeSpan.innerHTML = ` | ⏱️ 约 ${readingTime} 分钟`;
        meta.appendChild(timeSpan);
      }
    }
  }

  // 15. 图片懒加载增强
  function initLazyLoad() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.add('loaded');
          imageObserver.unobserve(img);
        }
      });
    });
    images.forEach(img => imageObserver.observe(img));
  }

  // 注入CSS动画样式
  function injectStyles() {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes heartFloat {
        0% { transform: translateY(0) scale(1); opacity: 1; }
        100% { transform: translateY(-100px) scale(1.5); opacity: 0; }
      }

      @keyframes wordFloat {
        0% { transform: translateY(0) scale(1); opacity: 1; }
        100% { transform: translateY(-150px) scale(0.5); opacity: 0; }
      }

      @keyframes particleFly {
        0% { transform: translate(0, 0) scale(1); opacity: 1; }
        100% { transform: translate(var(--x), var(--y)) scale(0); opacity: 0; }
      }

      @keyframes falling {
        0% { transform: translateY(0) rotate(0deg); opacity: 1; }
        50% { opacity: 1; }
        100% { transform: translateY(${window.innerHeight + 50}px) rotate(720deg); opacity: 0; }
      }

      @keyframes trailFade {
        0% { transform: scale(1); opacity: 0.8; }
        100% { transform: scale(0); opacity: 0; }
      }

      @keyframes titleBounce {
        0%, 100% { transform: translateY(0); }
        30% { transform: translateY(-15px); }
        50% { transform: translateY(-8px); }
        70% { transform: translateY(-4px); }
      }

      @keyframes fadeInUp {
        from { opacity: 0; transform: translateY(30px); }
        to { opacity: 1; transform: translateY(0); }
      }

      @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
      }

      @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
      }

      /* 滚动显示动画 */
      .scroll-reveal {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease-out;
      }

      .scroll-reveal.revealed {
        opacity: 1;
        transform: translateY(0);
      }

      /* 夜间模式 */
      .dark-mode {
        filter: invert(1) hue-rotate(180deg);
        background: #1a1a2e;
      }

      .dark-mode img,
      .dark-mode video,
      .dark-mode .dark-mode-exclude {
        filter: invert(1) hue-rotate(180deg);
      }

      /* 图片加载动画 */
      img {
        transition: opacity 0.5s ease;
      }

      img[data-src] {
        opacity: 0;
      }

      img.loaded {
        opacity: 1;
      }

      /* 按钮悬停效果 */
      .btn, button {
        transition: all 0.3s ease !important;
      }

      .btn:hover, button:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
      }

      /* 链接下划线动画 */
      .post-body a {
        position: relative;
        text-decoration: none;
      }

      .post-body a::after {
        content: '';
        position: absolute;
        bottom: -2px;
        left: 0;
        width: 0;
        height: 2px;
        background: linear-gradient(135deg, #667eea, #764ba2);
        transition: width 0.3s ease;
      }

      .post-body a:hover::after {
        width: 100%;
      }

      /* 滚动进度条 */
      #scroll-progress {
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(90deg, #667eea, #764ba2, #f093fb);
        z-index: 99999;
        transition: width 0.1s ease;
      }

      /* 选中文本样式 */
      ::selection {
        background: rgba(102, 126, 234, 0.3);
        color: inherit;
      }

      /* 平滑滚动 */
      html {
        scroll-behavior: smooth;
      }

      /* 代码块复制按钮 */
      .code-copy-btn {
        position: absolute;
        top: 5px;
        right: 5px;
        padding: 3px 8px;
        background: rgba(102, 126, 234, 0.2);
        border: none;
        border-radius: 4px;
        color: #667eea;
        font-size: 12px;
        cursor: pointer;
        opacity: 0;
        transition: all 0.3s ease;
      }

      .highlight:hover .code-copy-btn {
        opacity: 1;
      }

      .code-copy-btn:hover {
        background: rgba(102, 126, 234, 0.4);
      }

      /* 3D卡片效果 */
      .post-block {
        transform-style: preserve-3d;
        transition: transform 0.3s ease;
      }
    `;
    document.head.appendChild(style);
  }

  // 创建滚动进度条
  function createScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.id = 'scroll-progress';
    document.body.appendChild(progressBar);
  }

  // 代码块复制功能
  function initCodeCopy() {
    document.querySelectorAll('.highlight').forEach(block => {
      const copyBtn = document.createElement('button');
      copyBtn.className = 'code-copy-btn';
      copyBtn.textContent = '复制';
      copyBtn.addEventListener('click', () => {
        const code = block.querySelector('code') || block.querySelector('.code');
        if (code) {
          navigator.clipboard.writeText(code.textContent).then(() => {
            copyBtn.textContent = '已复制!';
            copyBtn.style.background = 'rgba(46, 204, 113, 0.3)';
            setTimeout(() => {
              copyBtn.textContent = '复制';
              copyBtn.style.background = 'rgba(102, 126, 234, 0.2)';
            }, 2000);
          });
        }
      });
      block.style.position = 'relative';
      block.appendChild(copyBtn);
    });
  }

  // 初始化所有特效
  function init() {
    injectStyles();
    createScrollProgress();
    createDarkModeToggle();
    animateTitle();
    initTiltEffect();
    initScrollReveal();
    initCodeCopy();
    estimateReadingTime();
    initLazyLoad();

    // 恢复夜间模式状态
    if (localStorage.getItem('darkMode') === 'true') {
      document.body.classList.add('dark-mode');
      const btn = document.getElementById('dark-mode-toggle');
      if (btn) btn.innerHTML = '☀️';
    }

    // 鼠标事件
    let clickCount = 0;
    document.addEventListener('click', (e) => {
      clickCount++;
      if (clickCount % 3 === 0) {
        createFirework(e);
      } else {
        createHeart(e);
        createClickWord(e);
      }
    });

    // 鼠标移动轨迹（节流）
    let trailThrottle = false;
    document.addEventListener('mousemove', (e) => {
      if (!trailThrottle) {
        trailThrottle = true;
        setTimeout(() => {
          createCursorTrail(e);
          trailThrottle = false;
        }, 50);
      }
    });

    // 滚动事件
    window.addEventListener('scroll', updateScrollProgress);

    // 樱花飘落（每3秒一个）
    setInterval(createFallingElement, 3000);

    // 初始樱花
    for (let i = 0; i < 5; i++) {
      setTimeout(createFallingElement, i * 600);
    }
  }

  // 页面加载完成后初始化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // PJAX支持
  document.addEventListener('pjax:complete', init);
})();
