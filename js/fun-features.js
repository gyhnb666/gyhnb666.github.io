// ===== 有趣小功能合集 =====

(function() {
  'use strict';

  // 1. 鼠标跟随彩色星星
  function createStar(e) {
    const star = document.createElement('div');
    const symbols = ['✨', '⭐', '🌟', '💫', '✦', '❋', '✧'];
    star.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    const size = 10 + Math.random() * 15;
    star.style.cssText = `
      position: fixed;
      left: ${e.clientX}px;
      top: ${e.clientY}px;
      font-size: ${size}px;
      pointer-events: none;
      z-index: 99999;
      animation: starFloat ${0.8 + Math.random() * 0.4}s ease-out forwards;
      transform: rotate(${Math.random() * 360}deg);
    `;
    document.body.appendChild(star);
    setTimeout(() => star.remove(), 1200);
  }

  // 2. 点击爆炸烟花效果
  function createExplosion(e) {
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7', '#fd79a8', '#a29bfe', '#6c5ce7'];
    const emojis = ['🎉', '🎊', '💥', '🔥', '❤️', '💖', '⭐'];

    for (let i = 0; i < 12; i++) {
      const particle = document.createElement('div');
      const angle = (Math.PI * 2 / 12) * i;
      const velocity = 60 + Math.random() * 80;
      const x = Math.cos(angle) * velocity;
      const y = Math.sin(angle) * velocity;
      const isEmoji = Math.random() > 0.7;

      particle.textContent = isEmoji ? emojis[Math.floor(Math.random() * emojis.length)] : '';
      particle.style.cssText = `
        position: fixed;
        left: ${e.clientX}px;
        top: ${e.clientY}px;
        width: ${isEmoji ? '20' : '8'}px;
        height: ${isEmoji ? '20' : '8'}px;
        border-radius: ${isEmoji ? '0' : '50'}%;
        pointer-events: none;
        z-index: 99999;
        background: ${isEmoji ? 'transparent' : colors[Math.floor(Math.random() * colors.length)]};
        font-size: 16px;
        animation: explode 1s ease-out forwards;
        --x: ${x}px;
        --y: ${y}px;
      `;
      document.body.appendChild(particle);
      setTimeout(() => particle.remove(), 1000);
    }
  }

  // 3. 页面加载动画
  function createLoadingAnimation() {
    const loader = document.createElement('div');
    loader.id = 'page-loader';
    loader.innerHTML = `
      <div class="loader-content">
        <div class="loader-spinner"></div>
        <div class="loader-text">加载中...</div>
      </div>
    `;
    loader.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, #667eea, #764ba2);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 999999;
      transition: opacity 0.5s ease;
    `;
    document.body.appendChild(loader);

    window.addEventListener('load', () => {
      setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => loader.remove(), 500);
      }, 800);
    });
  }

  // 4. 实时时钟
  function createClock() {
    const clock = document.createElement('div');
    clock.id = 'live-clock';
    clock.style.cssText = `
      position: fixed;
      top: 10px;
      right: 10px;
      background: rgba(0,0,0,0.7);
      color: #0f0;
      padding: 8px 15px;
      border-radius: 20px;
      font-family: 'Fira Code', monospace;
      font-size: 14px;
      z-index: 9998;
      backdrop-filter: blur(10px);
      border: 1px solid rgba(0,255,0,0.3);
      text-shadow: 0 0 10px rgba(0,255,0,0.5);
    `;
    document.body.appendChild(clock);

    function updateClock() {
      const now = new Date();
      const timeStr = now.toLocaleTimeString('zh-CN', { hour12: false });
      const dateStr = now.toLocaleDateString('zh-CN', { month: 'short', day: 'numeric', weekday: 'short' });
      clock.textContent = `🕐 ${timeStr} | ${dateStr}`;
    }

    updateClock();
    setInterval(updateClock, 1000);
  }

  // 5. 一言/随机格言
  function createHitokoto() {
    const hitokoto = document.createElement('div');
    hitokoto.id = 'hitokoto-box';
    hitokoto.style.cssText = `
      position: fixed;
      bottom: 80px;
      left: 20px;
      max-width: 300px;
      background: rgba(255,255,255,0.95);
      padding: 15px 20px;
      border-radius: 15px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.1);
      font-size: 14px;
      color: #333;
      z-index: 9998;
      backdrop-filter: blur(10px);
      border-left: 4px solid #667eea;
      animation: slideInLeft 0.5s ease;
      cursor: pointer;
      transition: all 0.3s ease;
    `;
    document.body.appendChild(hitokoto);

    const quotes = [
      '生活不止眼前的苟且，还有诗和远方。',
      '人生如逆旅，我亦是行人。',
      '愿你出走半生，归来仍是少年。',
      '世界那么大，我想去看看。',
      '不忘初心，方得始终。',
      '你若盛开，清风自来。',
      '星辰大海，永不止步。',
      '代码改变世界。',
      'Stay hungry, stay foolish.',
      '代码是写给人看的，顺便让机器执行。',
      '任何足够先进的技术都与魔法无异。',
      '简单是终极的复杂。',
      '好的代码是最好的文档。',
      '程序必须是为了给人看而写，给机器执行只是附带。',
      '在任何特定时刻，你都只应关注一件事。',
      '不要重复自己。',
      '保持简单，愚蠢。',
      '先让它工作，再让它正确，最后让它快速。',
      '过早优化是万恶之源。',
      '软件设计就像做菜，适量的调料才能做出美味。'
    ];

    function showRandomQuote() {
      const quote = quotes[Math.floor(Math.random() * quotes.length)];
      hitokoto.innerHTML = `
        <div style="margin-bottom: 8px; font-style: italic;">「${quote}」</div>
        <div style="font-size: 12px; color: #667eea; text-align: right;">—— 点击换一句</div>
      `;
    }

    showRandomQuote();
    hitokoto.addEventListener('click', showRandomQuote);

    // 5秒后自动隐藏
    setTimeout(() => {
      hitokoto.style.opacity = '0';
      hitokoto.style.transform = 'translateX(-100%)';
      setTimeout(() => hitokoto.style.display = 'none', 500);
    }, 8000);
  }

  // 6. 快捷键提示
  function createShortcutHint() {
    const hint = document.createElement('div');
    hint.id = 'shortcut-hint';
    hint.style.cssText = `
      position: fixed;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      background: rgba(0,0,0,0.8);
      color: white;
      padding: 10px 20px;
      border-radius: 25px;
      font-size: 12px;
      z-index: 9998;
      backdrop-filter: blur(10px);
      opacity: 0;
      transition: opacity 0.3s ease;
    `;
    hint.innerHTML = '💡 按 <kbd style="background:#667eea;padding:2px 6px;border-radius:3px;">M</kbd> 键切换音乐 | <kbd style="background:#667eea;padding:2px 6px;border-radius:3px;">T</kbd> 回到顶部';
    document.body.appendChild(hint);

    // 鼠标移动时显示
    let hintTimeout;
    document.addEventListener('mousemove', () => {
      hint.style.opacity = '1';
      clearTimeout(hintTimeout);
      hintTimeout = setTimeout(() => {
        hint.style.opacity = '0';
      }, 3000);
    });
  }

  // 7. 打字效果的副标题
  function initTypewriterSubtitle() {
    const subtitle = document.querySelector('.site-subtitle');
    if (subtitle) {
      const text = subtitle.textContent;
      subtitle.textContent = '';
      let i = 0;
      function type() {
        if (i < text.length) {
          subtitle.textContent += text.charAt(i);
          i++;
          setTimeout(type, 100);
        }
      }
      setTimeout(type, 1000);
    }
  }

  // 8. 复制文字提示
  function initCopyTip() {
    document.addEventListener('copy', (e) => {
      const tip = document.createElement('div');
      tip.textContent = '✅ 复制成功！';
      tip.style.cssText = `
        position: fixed;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        background: rgba(46, 204, 113, 0.9);
        color: white;
        padding: 15px 30px;
        border-radius: 10px;
        font-size: 16px;
        z-index: 999999;
        animation: fadeInOut 1.5s ease forwards;
        pointer-events: none;
      `;
      document.body.appendChild(tip);
      setTimeout(() => tip.remove(), 1500);
    });
  }

  // 9. 图片点击放大
  function initImageLightbox() {
    document.querySelectorAll('.post-body img').forEach(img => {
      img.style.cursor = 'zoom-in';
      img.addEventListener('click', (e) => {
        e.stopPropagation();
        const overlay = document.createElement('div');
        overlay.style.cssText = `
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0,0,0,0.9);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 999999;
          cursor: zoom-out;
          animation: fadeIn 0.3s ease;
        `;

        const bigImg = document.createElement('img');
        bigImg.src = img.src;
        bigImg.style.cssText = `
          max-width: 90%;
          max-height: 90%;
          border-radius: 10px;
          box-shadow: 0 0 50px rgba(0,0,0,0.5);
          animation: scaleIn 0.3s ease;
        `;

        overlay.appendChild(bigImg);
        document.body.appendChild(overlay);

        overlay.addEventListener('click', () => {
          overlay.style.opacity = '0';
          setTimeout(() => overlay.remove(), 300);
        });
      });
    });
  }

  // 10. 随机彩虹文字
  function initRainbowText() {
    document.querySelectorAll('.post-title-link').forEach(title => {
      title.addEventListener('mouseenter', () => {
        const text = title.textContent;
        title.innerHTML = '';
        [...text].forEach((char, i) => {
          const span = document.createElement('span');
          span.textContent = char;
          span.style.cssText = `
            display: inline-block;
            animation: rainbow 1s ease infinite;
            animation-delay: ${i * 0.05}s;
          `;
          title.appendChild(span);
        });
      });

      title.addEventListener('mouseleave', () => {
        title.textContent = title.textContent;
      });
    });
  }

  // 11. 页面滚动视差效果
  function initParallax() {
    const header = document.querySelector('.header-inner');
    if (header) {
      window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        header.style.transform = `translateY(${scrolled * 0.3}px)`;
      });
    }
  }

  // 12. 鼠标滚轮音效
  function initScrollSound() {
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
      const now = Date.now();
      if (now - lastScroll > 100) {
        // 可以在这里添加音效
        lastScroll = now;
      }
    });
  }

  // 13. 随机背景颜色
  function initRandomBg() {
    const gradients = [
      'linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)',
      'linear-gradient(-45deg, #667eea, #764ba2, #f093fb, #f5576c)',
      'linear-gradient(-45deg, #4facfe, #00f2fe, #43e97b, #38f9d7)',
      'linear-gradient(-45deg, #fa709a, #fee140, #fa709a, #fee140)',
      'linear-gradient(-45deg, #a18cd1, #fbc2eb, #a18cd1, #fbc2eb)',
    ];

    const bgBtn = document.createElement('button');
    bgBtn.innerHTML = '🎨';
    bgBtn.title = '切换背景';
    bgBtn.style.cssText = `
      position: fixed;
      bottom: 140px;
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
    `;

    let currentBg = 0;
    bgBtn.addEventListener('click', () => {
      currentBg = (currentBg + 1) % gradients.length;
      document.body.style.background = gradients[currentBg];
      document.body.style.backgroundSize = '400% 400%';
      document.body.style.animation = 'gradientBG 15s ease infinite';
      localStorage.setItem('customBg', currentBg);
    });

    document.body.appendChild(bgBtn);

    // 恢复保存的背景
    const savedBg = localStorage.getItem('customBg');
    if (savedBg) {
      document.body.style.background = gradients[savedBg];
      document.body.style.backgroundSize = '400% 400%';
      document.body.style.animation = 'gradientBG 15s ease infinite';
    }
  }

  // 14. 访问计数器
  function createVisitorCounter() {
    const counter = document.createElement('div');
    counter.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      background: rgba(0,0,0,0.7);
      color: #0f0;
      padding: 8px 15px;
      border-radius: 20px;
      font-family: 'Fira Code', monospace;
      font-size: 12px;
      z-index: 9998;
      backdrop-filter: blur(10px);
      border: 1px solid rgba(0,255,0,0.3);
    `;

    let visits = parseInt(localStorage.getItem('visitCount') || '0');
    visits++;
    localStorage.setItem('visitCount', visits);
    counter.textContent = `👁️ 第 ${visits} 次访问`;
    document.body.appendChild(counter);
  }

  // 15. 快捷键功能
  function initKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
      // T 键回到顶部
      if (e.key === 't' || e.key === 'T') {
        if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }

      // B 键到底部
      if (e.key === 'b' || e.key === 'B') {
        if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
          window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        }
      }

      // D 键切换夜间模式
      if (e.key === 'd' || e.key === 'D') {
        if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
          const btn = document.getElementById('dark-mode-toggle');
          if (btn) btn.click();
        }
      }
    });
  }

  // 16. 鼠标右键菜单
  function initContextMenu() {
    document.addEventListener('contextmenu', (e) => {
      // 不阻止默认行为，只添加自定义菜单项
    });
  }

  // 17. 滚动到一定位置显示元素
  function initScrollRevealElements() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('h1, h2, h3, p, pre, table, blockquote').forEach(el => {
      observer.observe(el);
    });
  }

  // 18. 文字选中高亮
  function initTextHighlight() {
    document.addEventListener('mouseup', () => {
      const selection = window.getSelection();
      if (selection.toString().length > 0) {
        // 可以添加分享功能
      }
    });
  }

  // 19. 随机表情雨
  function createEmojiRain() {
    const emojis = ['🌸', '🌺', '🌹', '🌻', '🌼', '🌷', '💐', '🎊', '🎉', '✨', '⭐', '🌟', '💫', '🎈', '🎀'];
    const emoji = document.createElement('div');
    emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    emoji.style.cssText = `
      position: fixed;
      left: ${Math.random() * 100}vw;
      top: -30px;
      font-size: ${20 + Math.random() * 20}px;
      pointer-events: none;
      z-index: 9998;
      animation: emojiRain ${3 + Math.random() * 4}s linear forwards;
    `;
    document.body.appendChild(emoji);
    setTimeout(() => emoji.remove(), 7000);
  }

  // 20. 页面切换动画
  function initPageTransition() {
    document.querySelectorAll('a').forEach(link => {
      if (link.hostname === window.location.hostname) {
        link.addEventListener('click', (e) => {
          // 可以添加页面切换动画
        });
      }
    });
  }

  // 注入所有动画样式
  function injectFunStyles() {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes starFloat {
        0% { transform: translateY(0) scale(1) rotate(0deg); opacity: 1; }
        100% { transform: translateY(-80px) scale(0.3) rotate(360deg); opacity: 0; }
      }

      @keyframes explode {
        0% { transform: translate(0, 0) scale(1); opacity: 1; }
        100% { transform: translate(var(--x), var(--y)) scale(0); opacity: 0; }
      }

      @keyframes fadeInOut {
        0% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
        20% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        80% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        100% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
      }

      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }

      @keyframes scaleIn {
        from { transform: scale(0.5); opacity: 0; }
        to { transform: scale(1); opacity: 1; }
      }

      @keyframes rainbow {
        0% { color: #ff6b6b; }
        16% { color: #feca57; }
        33% { color: #48dbfb; }
        50% { color: #ff9ff3; }
        66% { color: #54a0ff; }
        83% { color: #5f27cd; }
        100% { color: #ff6b6b; }
      }

      @keyframes slideInLeft {
        from { transform: translateX(-100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }

      @keyframes emojiRain {
        0% { transform: translateY(0) rotate(0deg); opacity: 1; }
        100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
      }

      @keyframes gradientBG {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }

      /* 加载动画样式 */
      .loader-content {
        text-align: center;
        color: white;
      }

      .loader-spinner {
        width: 50px;
        height: 50px;
        border: 4px solid rgba(255,255,255,0.3);
        border-top: 4px solid white;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin: 0 auto 20px;
      }

      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }

      .loader-text {
        font-size: 18px;
        font-weight: 500;
      }

      /* 代码块样式增强 */
      .highlight {
        position: relative;
      }

      /* 选中文本样式 */
      ::selection {
        background: rgba(102, 126, 234, 0.4);
        color: inherit;
      }

      /* 按钮悬停效果 */
      button:hover {
        transform: scale(1.05);
      }

      /* 平滑滚动 */
      html {
        scroll-behavior: smooth;
      }

      /* 隐藏滚动条但保持功能 */
      ::-webkit-scrollbar {
        width: 8px;
      }

      ::-webkit-scrollbar-track {
        background: transparent;
      }

      ::-webkit-scrollbar-thumb {
        background: rgba(102, 126, 234, 0.5);
        border-radius: 4px;
      }

      ::-webkit-scrollbar-thumb:hover {
        background: rgba(102, 126, 234, 0.8);
      }

      /* 快捷键样式 */
      kbd {
        background: #667eea;
        padding: 2px 6px;
        border-radius: 3px;
        font-size: 11px;
        font-family: monospace;
      }

      /* 提示框动画 */
      .toast {
        animation: toastIn 0.3s ease, toastOut 0.3s ease 2.7s;
      }

      @keyframes toastIn {
        from { transform: translateY(20px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
      }

      @keyframes toastOut {
        from { transform: translateY(0); opacity: 1; }
        to { transform: translateY(-20px); opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  }

  // 初始化所有有趣功能
  function initFunFeatures() {
    injectFunStyles();
    createLoadingAnimation();
    createClock();
    createHitokoto();
    createShortcutHint();
    createVisitorCounter();
    initTypewriterSubtitle();
    initCopyTip();
    initImageLightbox();
    initRainbowText();
    initKeyboardShortcuts();
    initScrollRevealElements();
    initRandomBg();

    // 鼠标移动星星（节流）
    let starThrottle = false;
    document.addEventListener('mousemove', (e) => {
      if (!starThrottle) {
        starThrottle = true;
        setTimeout(() => {
          createStar(e);
          starThrottle = false;
        }, 100);
      }
    });

    // 点击爆炸效果
    let clickCount = 0;
    document.addEventListener('click', (e) => {
      clickCount++;
      if (clickCount % 5 === 0) {
        createExplosion(e);
      }
    });

    // 定时表情雨
    setInterval(createEmojiRain, 5000);

    // 初始表情雨
    for (let i = 0; i < 3; i++) {
      setTimeout(createEmojiRain, i * 1000);
    }
  }

  // 页面加载完成后初始化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFunFeatures);
  } else {
    initFunFeatures();
  }

  // PJAX支持
  document.addEventListener('pjax:complete', initFunFeatures);
})();
