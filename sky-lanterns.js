/**
 * ==========================================================================
 * HIỆU ỨNG THIÊN ĐĂNG DẠ HỘI (SKY LANTERNS) - YAMAHA TOWN NAM TIẾN
 * Isolated Module: High-Aesthetic 60fps Ambient & Interactive Lanterns
 * ==========================================================================
 */

(function () {
  'use strict';

  // Danh sách lời chúc Trung Thu cộng đồng tạo không khí lễ hội ấm áp
  const COMMUNITY_WISHES = [
    'Gia đình sum vầy, vạn sự bình an 🌕',
    'Cầu chúc cha mẹ bình an, dồi dào sức khỏe 🏮',
    'Công danh thăng tiến, tài lộc hanh thông ✨',
    'Vạn dặm bình an cùng Nam Tiến Motor 🛵',
    'Trăng tròn hạnh phúc, ấm áp yêu thương 💛',
    'Học hành tấn tới, thi cử đỗ đạt 🎓',
    'Cầu chúc phát tài phát lộc, vạn sự hanh thông 🎋',
    'Vui Tết Trung Thu - Người lớn cũng có quà 🎁',
    'Tâm an vạn sự lành, đón trăng viên mãn 🥮',
    'Thành công rực rỡ, may mắn ngập tràn 🌟'
  ];

  /* --------------------------------------------------------------------------
     1. WEB AUDIO SYNTHESIZER (Chuông thiền & chuông gió phong cách phương Đông)
     -------------------------------------------------------------------------- */
  let audioCtx = null;

  function getAudioContext() {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        audioCtx = new AudioContextClass();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    return audioCtx;
  }

  function playHarmonicChime(freqs = [523.25, 659.25, 783.99], duration = 1.6) {
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const now = ctx.currentTime;
      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);

        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.08 / (idx + 1), now + idx * 0.08 + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + idx * 0.08);
        osc.stop(now + duration + 0.1);
      });
    } catch (e) {
      // Audio autoplay policy fallback
    }
  }

  /* --------------------------------------------------------------------------
     2. VECTOR SVG LANTERN TEMPLATE GENERATOR
     -------------------------------------------------------------------------- */
  let lanternUniqueCounter = 0;

  function createLanternSVG(tier = 'mid', isUser = false) {
    lanternUniqueCounter++;
    const gradId = `lanternGrad_${lanternUniqueCounter}`;
    const flameId = `flameGrad_${lanternUniqueCounter}`;
    const auraId = `auraGrad_${lanternUniqueCounter}`;
    const bottomGlowId = `bottomGlow_${lanternUniqueCounter}`;

    // Khổ kích thước chuẩn tỷ lệ Khổng Minh Đăng theo example.png
    const w = isUser ? 68 : (tier === 'near' ? 52 : (tier === 'mid' ? 36 : 24));
    const h = Math.round(w * 1.34);

    return `
      <svg width="${w}" height="${h}" style="width:${w}px; height:${h}px; max-width:${w}px; max-height:${h}px;" viewBox="0 0 100 134" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <!-- Gradient thân đèn lụa giấy dó chuẩn example.png: Đáy trắng vàng rực rỡ -> Thân cam hổ phách -> Đỉnh đỏ son trầm -->
          <linearGradient id="${gradId}" x1="50%" y1="100%" x2="50%" y2="0%">
            <stop offset="0%" stop-color="#ffffff" stop-opacity="1" />
            <stop offset="6%" stop-color="#fff575" stop-opacity="0.99" />
            <stop offset="22%" stop-color="#ffb703" stop-opacity="0.98" />
            <stop offset="55%" stop-color="#fb8500" stop-opacity="0.95" />
            <stop offset="82%" stop-color="#d90429" stop-opacity="0.92" />
            <stop offset="96%" stop-color="#9d0208" stop-opacity="0.92" />
            <stop offset="100%" stop-color="#4e0206" stop-opacity="0.95" />
          </linearGradient>

          <!-- Gradient tim lửa bập bùng -->
          <radialGradient id="${flameId}" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#ffffff" stop-opacity="1" />
            <stop offset="35%" stop-color="#fff07c" stop-opacity="0.95" />
            <stop offset="70%" stop-color="#ffb703" stop-opacity="0.85" />
            <stop offset="100%" stop-color="#f77f00" stop-opacity="0" />
          </radialGradient>

          <!-- Hào quang ấm áp tỏa rộng (Zero Filter - Render siêu tốc 60fps trên mọi máy cỏ) -->
          <radialGradient id="${auraId}" cx="50%" cy="58%" r="50%">
            <stop offset="0%" stop-color="#ffcf24" stop-opacity="${isUser ? '0.85' : '0.65'}" />
            <stop offset="35%" stop-color="#ff9100" stop-opacity="${isUser ? '0.5' : '0.35'}" />
            <stop offset="70%" stop-color="#e63946" stop-opacity="${isUser ? '0.2' : '0.12'}" />
            <stop offset="100%" stop-color="#3d0a4e" stop-opacity="0" />
          </radialGradient>

          <!-- Quầng sáng đáy rực rỡ xung quanh miệng lồng đèn -->
          <radialGradient id="${bottomGlowId}" cx="50%" cy="85%" r="35%">
            <stop offset="0%" stop-color="#ffffff" stop-opacity="0.9" />
            <stop offset="25%" stop-color="#fff07c" stop-opacity="0.75" />
            <stop offset="60%" stop-color="#ff9e00" stop-opacity="0.35" />
            <stop offset="100%" stop-color="#f77f00" stop-opacity="0" />
          </radialGradient>
        </defs>

        <!-- Quầng hào quang tỏa ấm tự nhiên vào nền trời đêm tím (Không dùng bất kỳ filter blur nào) -->
        <ellipse cx="50" cy="72" rx="49" ry="60" fill="url(#${auraId})" />
        <ellipse cx="50" cy="115" rx="38" ry="16" fill="url(#${bottomGlowId})" />

        <!-- Thân đèn Khổng Minh dạng hình thang đỉnh bằng chuẩn example.png -->
        <path d="M 24 12 
                 L 76 12 
                 Q 82 12 83 17 
                 L 89 114 
                 Q 90 118 83 121 
                 Q 50 126 17 121 
                 Q 10 118 11 114 
                 L 17 17 
                 Q 18 12 24 12 Z" 
              fill="url(#${gradId})" />

        <!-- Ánh sáng hắt mạnh hơn ở nửa dưới thân lồng đèn -->
        <path d="M 16 68 
                 L 84 68 
                 L 89 114 
                 Q 90 118 83 121 
                 Q 50 126 17 121 
                 Q 10 118 11 114 Z" 
              fill="url(#${flameId})" opacity="0.68" />

        <!-- Viền trên đỉnh lồng đèn sắc nét -->
        <path d="M 23 12 L 77 12" stroke="#4a0003" stroke-width="1.5" stroke-linecap="round" opacity="0.75" />

        <!-- Các nếp nan tre dọc theo thân đèn tạo cảm giác 3D đa chiều -->
        <line x1="36" y1="13" x2="30" y2="120" stroke="#fffae0" stroke-opacity="0.22" stroke-width="1" />
        <line x1="50" y1="12" x2="50" y2="122" stroke="#fffae0" stroke-opacity="0.3" stroke-width="1.2" stroke-dasharray="3 2" />
        <line x1="64" y1="13" x2="70" y2="120" stroke="#fffae0" stroke-opacity="0.22" stroke-width="1" />

        <!-- Tim lửa rực sáng bốc lên từ miệng đáy đèn chuẩn example.png -->
        <g class="lantern-flame-core">
          <!-- Cột lửa vàng cam bốc lên cao bên trong lòng lồng đèn -->
          <path d="M 50 46 C 42 72 41 98 44 116 C 47 119 53 119 56 116 C 59 98 58 72 50 46 Z" fill="url(#${flameId})" />
          <!-- Lõi lửa trắng tinh khiết rực sáng -->
          <path d="M 50 68 C 46 86 45 104 47 115 C 49 117 51 117 53 115 C 55 104 54 86 50 68 Z" fill="#ffffff" />
          <!-- Vùng tâm lửa rực rỡ tại miệng đáy -->
          <circle cx="50" cy="116" r="${isUser ? 6.5 : 5}" fill="#ffffff" />
        </g>

        <!-- Vành nan tre miệng đáy mở chuẩn đèn Khổng Minh -->
        <ellipse cx="50" cy="120" rx="34" ry="5.5" stroke="#3d0c02" stroke-width="2.2" fill="#1f0501" opacity="0.85" />
        <line x1="22" y1="120" x2="78" y2="120" stroke="#2b0a01" stroke-width="1.2" opacity="0.6" />
        <circle cx="50" cy="120" r="3.2" fill="#fffbe6" />
      </svg>
    `;
  }

  /* --------------------------------------------------------------------------
     3. AMBIENT LANTERNS ENGINE (VÒNG ĐỜI & CHUYỂN ĐỘNG 60FPS)
     -------------------------------------------------------------------------- */
  let viewportEl = null;
  let lanternsPool = [];
  let isRunning = true;
  let lastTimestamp = 0;

  class SkyLantern {
    constructor(tier, index, total) {
      this.tier = tier;
      this.index = index;
      this.total = total;
      this.isBlessed = false;
      this.isPaused = false;

      this.el = document.createElement('div');
      this.el.className = `sky-lantern tier-${tier}`;
      this.el.innerHTML = createLanternSVG(tier, false);

      // Gán tooltip lời chúc cộng đồng
      const wishText = COMMUNITY_WISHES[Math.floor(Math.random() * COMMUNITY_WISHES.length)];
      this.tooltip = document.createElement('div');
      this.tooltip.className = 'lantern-wish-tooltip';
      this.tooltip.textContent = `✨ ${wishText}`;
      this.el.appendChild(this.tooltip);

      // Thao tác click/chạm vào đèn mở sớ ước nguyện (gắn trực tiếp ngọn đèn này làm mục tiêu)
      let lastTrigger = 0;
      const triggerSelect = (e) => {
        if (Date.now() - lastTrigger < 450) return;
        lastTrigger = Date.now();
        e.stopPropagation();
        openWishModal(this);
      };

      this.el.addEventListener('pointerdown', triggerSelect);
      this.el.addEventListener('click', triggerSelect);

      this.reset(true);
      viewportEl.appendChild(this.el);
    }

    reset(initial = false) {
      // Nếu ngọn đèn vừa hoàn thành chu kỳ ước nguyện hoàng kim, trả về trạng thái đèn thường
      this.isPaused = false;
      if (this.isBlessed) {
        this.isBlessed = false;
        this.el.className = `sky-lantern tier-${this.tier}`;
        this.el.innerHTML = createLanternSVG(this.tier, false);

        const wishText = COMMUNITY_WISHES[Math.floor(Math.random() * COMMUNITY_WISHES.length)];
        this.tooltip = document.createElement('div');
        this.tooltip.className = 'lantern-wish-tooltip';
        this.tooltip.textContent = `✨ ${wishText}`;
        this.el.appendChild(this.tooltip);
      }

      const vW = window.innerWidth;
      const vH = window.innerHeight;

      // Safe Corridor: Phân bổ rộng rãi 2 bên rìa và khoảng thoáng giữa
      const rand = Math.random();
      if (rand < 0.45) {
        this.baseX = Math.random() * (vW * 0.28) + (vW * 0.02); // Dải trái
      } else if (rand < 0.90) {
        this.baseX = Math.random() * (vW * 0.26) + (vW * 0.70); // Dải phải
      } else {
        this.baseX = Math.random() * (vW * 0.34) + (vW * 0.33); // Vùng thoáng giữa
      }

      this.x = this.baseX;

      // Tốc độ bay & độ sáng nền theo từng tầng cự ly (rất êm đềm, bay chill chill)
      if (this.tier === 'far') {
        this.baseOpacity = 0.58;
        this.speed = Math.random() * 0.18 + 0.22; // Rất chậm, êm đềm
        this.swayAmp = Math.random() * 10 + 6;
        this.swayFreq = Math.random() * 0.0008 + 0.0005;
      } else if (this.tier === 'mid') {
        this.baseOpacity = 0.85;
        this.speed = Math.random() * 0.25 + 0.35;
        this.swayAmp = Math.random() * 16 + 10;
        this.swayFreq = Math.random() * 0.0010 + 0.0007;
      } else {
        // Near tier
        this.baseOpacity = 0.98;
        this.speed = Math.random() * 0.3 + 0.52;
        this.swayAmp = Math.random() * 20 + 14;
        this.swayFreq = Math.random() * 0.0012 + 0.0009;
      }

      this.swayPhase = Math.random() * Math.PI * 2;
      this.isDormant = false;
      this.dormantTimer = 0;
      this.lastOpacityStr = '';

      if (initial) {
        // Khi tải trang: phân bổ độ cao so le khắp bầu trời
        // Riêng một số đèn cho nghỉ ngẫu nhiên để xuất phát sau, tránh xuất phát đồng loạt
        if (this.index % 3 === 0) {
          this.y = vH + 80;
          this.dormantTimer = Math.random() * 150 + 60; // 1-3.5s sau mới bay
          this.isDormant = true;
          this.el.style.opacity = '0';
          this.lastOpacityStr = '0';
        } else {
          this.y = Math.random() * (vH * 0.75) + (vH * 0.08);
        }
      } else {
        // Khi đã bay khuất lên trời cao:
        // Đèn ẩn hoàn toàn (opacity 0) và nghỉ 3.5 - 9 giây trước khi tái xuất hiện từ chân trời
        this.y = vH + Math.random() * 120 + 60;
        this.dormantTimer = Math.random() * 320 + 200; // 3.5 - 9s
        this.isDormant = true;
        this.el.style.opacity = '0';
        this.lastOpacityStr = '0';
      }
    }

    update(time, delta) {
      if (this.isPaused) {
        // Đèn tạm dừng bay lên, chỉ đung đưa nhịp nhàng tại chỗ để người dùng quan sát
        const swayOffset = Math.sin(time * 0.0012 + this.swayPhase) * 3;
        const currentX = this.baseX + swayOffset;
        this.el.style.transform = `translate3d(${currentX.toFixed(1)}px, ${this.y.toFixed(1)}px, 0) scale(1.06)`;
        if (this.lastOpacityStr !== '1') {
          this.el.style.opacity = '1';
          this.lastOpacityStr = '1';
        }
        return;
      }

      if (this.isDormant) {
        this.dormantTimer -= (delta / 16.67);
        if (this.dormantTimer <= 0) {
          this.isDormant = false;
        } else {
          if (this.lastOpacityStr !== '0') {
            this.el.style.opacity = '0';
            this.lastOpacityStr = '0';
          }
          return;
        }
      }

      this.y -= this.speed * (delta / 16.67);

      const vW = window.innerWidth;
      const vH = window.innerHeight;
      const isMobile = vW <= 768;
      const swayOffset = Math.sin(time * this.swayFreq + this.swayPhase) * this.swayAmp;
      this.x = this.baseX + swayOffset;
      const tilt = isMobile ? 0 : Math.cos(time * this.swayFreq + this.swayPhase) * 2.0;

      let currentOpacity = this.baseOpacity;
      let currentScale = 1.0;

      // 1. Dưới đáy: Mờ ảo hiện dần lên từ chân trời (từ vH + 40 lên vH - 120)
      if (this.y > vH - 120) {
        const bottomProgress = Math.max(0, Math.min(1, (vH + 40 - this.y) / 160));
        currentOpacity *= bottomProgress;
      }

      // 2. Trên đỉnh: Bay lên tầng cao khí quyển thì thu nhỏ dần và tan biến vào vũ trụ
      const topThreshold = Math.max(220, vH * (this.isBlessed ? 0.42 : 0.38));
      const vanishY = this.isBlessed ? -70 : -60; // Điểm tan biến hoàn toàn thành hư vô
      if (this.y < topThreshold) {
        const topProgress = Math.max(0, Math.min(1, (this.y - vanishY) / (topThreshold - vanishY)));
        // Opacity giảm theo hàm mũ mượt mà để mờ dần tự nhiên
        currentOpacity *= Math.pow(topProgress, 1.35);
        // Scale thu nhỏ từ 1.0 xuống 0.18 như một đốm sao xa xôi
        currentScale = 0.18 + 0.82 * Math.pow(topProgress, 0.85);
      }

      // GPU Transform (Phần cứng tăng tốc - Không kích hoạt Layout Reflow)
      if (isMobile) {
        this.el.style.transform = `translate3d(${this.x.toFixed(1)}px, ${this.y.toFixed(1)}px, 0) scale(${currentScale.toFixed(2)})`;
      } else {
        this.el.style.transform = `translate3d(${this.x.toFixed(1)}px, ${this.y.toFixed(1)}px, 0) scale(${currentScale.toFixed(2)}) rotate(${tilt.toFixed(1)}deg)`;
      }

      // Chỉ cập nhật style.opacity khi giá trị thực sự biến thiên để bảo vệ WebKit Main Thread
      const opacityStr = currentOpacity.toFixed(2);
      if (this.lastOpacityStr !== opacityStr) {
        this.el.style.opacity = opacityStr;
        this.lastOpacityStr = opacityStr;
      }

      // Khi đã tan biến hoàn toàn (y <= vanishY) mới kích hoạt chu kỳ tái sinh ngẫu nhiên
      if (this.y <= vanishY) {
        this.reset(false);
      }
    }
  }

  /* --------------------------------------------------------------------------
     4. RENDER LOOP (60FPS HARDWARE ACCELERATED & SCROLL-FREEZE)
     -------------------------------------------------------------------------- */
  let isScrolling = false;
  let scrollTimeout = null;

  // Lắng nghe sự kiện cuộn: Khi ngón tay đang cuộn trang, tạm dừng render đèn
  // Lắng nghe sự kiện cuộn: Khi cuộn trang, làm mờ hẳn toàn bộ thiên đăng
  // để người dùng tập trung nội dung và không tạo cảm giác đơ/lag
  window.addEventListener('scroll', () => {
    isScrolling = true;
    if (viewportEl && !viewportEl.classList.contains('is-scrolling')) {
      viewportEl.classList.add('is-scrolling');
    }
    if (scrollTimeout) clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      isScrolling = false;
      if (viewportEl) {
        viewportEl.classList.remove('is-scrolling');
      }
      lastTimestamp = performance.now(); // Reset timestamp để tránh giật bước sau khi dừng cuộn
    }, 180);
  }, { passive: true });

  function animate(now) {
    if (!isRunning) return;

    if (!lastTimestamp) lastTimestamp = now;
    const delta = Math.min(now - lastTimestamp, 50); // Cap delta to prevent jump after tab switch
    lastTimestamp = now;

    // Khi người dùng đang vuốt cuộn trang, đóng băng update đèn để cuộn siêu mượt 120Hz/60Hz
    if (!isScrolling) {
      // Cập nhật đèn trong pool (số lượng cố định, cực nhẹ)
      for (let i = 0; i < lanternsPool.length; i++) {
        lanternsPool[i].update(now, delta);
      }
    }

    requestAnimationFrame(animate);
  }

  // Tạm dừng khi ẩn tab để bảo toàn pin
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      isRunning = false;
    } else {
      isRunning = true;
      lastTimestamp = 0;
      requestAnimationFrame(animate);
    }
  });

  /* --------------------------------------------------------------------------
     5. WISH PARCHMENT MODAL (TÂM THƯ GIẤY DÓ CỔ PHONG HOÀNG KIM)
     -------------------------------------------------------------------------- */
  let wishModal = null;
  let wishBackdrop = null;
  let wishTextarea = null;
  let wishNameInput = null;
  let activeTargetLantern = null;

  function createWishModalDOM() {
    // 1. Viewport Container
    viewportEl = document.createElement('div');
    viewportEl.id = 'skyLanternsContainer';
    viewportEl.className = 'sky-lanterns-viewport';
    document.body.appendChild(viewportEl);

    // 2. Wish Modal Overlay (Tâm Thư Giấy Dó Cổ Phong - Đường Cong Mỹ Thuật)
    const modalHTML = `
      <div class="wish-modal-overlay" id="wishModalOverlay" role="dialog" aria-modal="true" aria-labelledby="wishModalTitle" hidden>
        <div class="wish-modal-backdrop" id="wishModalBackdrop"></div>
        <div class="wish-parchment-container">
          <svg class="parchment-svg-bg" viewBox="0 0 380 430" preserveAspectRatio="none" aria-hidden="true">
            <defs>
              <linearGradient id="parchmentGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#fdf9ee"/>
                <stop offset="40%" stop-color="#faeed6"/>
                <stop offset="80%" stop-color="#f4dfb5"/>
                <stop offset="100%" stop-color="#ecd19d"/>
              </linearGradient>
              <radialGradient id="paperGlow" cx="50%" cy="20%" r="65%">
                <stop offset="0%" stop-color="#ffffff" stop-opacity="0.6"/>
                <stop offset="100%" stop-color="#ecd19d" stop-opacity="0"/>
              </radialGradient>
            </defs>

            <!-- Đường nét cuốn thư cổ phong với các đường cong uốn lượn mỹ thuật -->
            <path d="M 52,22 
                     C 130,-4 250,-4 328,22 
                     C 358,32 370,55 365,95 
                     C 358,160 366,245 362,335 
                     C 358,380 340,408 308,418 
                     C 235,436 145,436 72,418 
                     C 40,408 22,380 18,335 
                     C 14,245 22,160 15,95 
                     C 10,55 22,32 52,22 Z" 
                  fill="url(#parchmentGrad)" stroke="#c49337" stroke-width="2.5" />

            <path d="M 52,22 
                     C 130,-4 250,-4 328,22 
                     C 358,32 370,55 365,95 
                     C 358,160 366,245 362,335 
                     C 358,380 340,408 308,418 
                     C 235,436 145,436 72,418 
                     C 40,408 22,380 18,335 
                     C 14,245 22,160 15,95 
                     C 10,55 22,32 52,22 Z" 
                  fill="url(#paperGlow)" />

            <!-- Đường chỉ son viền chỉ tơ nội biên -->
            <path d="M 58,30 
                     C 132,6 248,6 322,30 
                     C 348,39 358,58 354,94 
                     C 348,158 356,242 352,330 
                     C 349,370 334,395 304,405 
                     C 235,421 145,421 76,405 
                     C 46,395 31,370 28,330 
                     C 24,242 32,158 26,94 
                     C 22,58 32,39 58,30 Z" 
                  fill="none" stroke="rgba(186, 24, 27, 0.45)" stroke-width="1.2" stroke-dasharray="5,3.5" />
          </svg>

          <div class="parchment-body">
            <button type="button" class="parchment-close" id="btnCloseWishModal" aria-label="Đóng">×</button>
            <h3 class="parchment-title" id="wishModalTitle">Nguyện Ước Đêm Rằm</h3>
            <p class="parchment-sub">Gửi tâm nguyện bình an lên Cung Trăng</p>
            <textarea id="txtCustomWish" class="parchment-textarea" placeholder="Nắn nót ghi lời tâm nguyện..."></textarea>
            <input type="text" id="txtWishAuthor" class="parchment-input" placeholder="Người gửi (tùy chọn)" maxlength="30" />
            <button type="button" class="parchment-btn" id="btnSendWish">Thả Đèn Lên Trời</button>
          </div>
        </div>
      </div>
    `;

    const range = document.createRange();
    const modalFrag = range.createContextualFragment(modalHTML);
    document.body.appendChild(modalFrag);

    // Gán elements
    wishModal = document.getElementById('wishModalOverlay');
    wishBackdrop = document.getElementById('wishModalBackdrop');
    wishTextarea = document.getElementById('txtCustomWish');
    wishNameInput = document.getElementById('txtWishAuthor');

    const btnClose = document.getElementById('btnCloseWishModal');
    if (btnClose) btnClose.addEventListener('click', closeWishModal);
    if (wishBackdrop) wishBackdrop.addEventListener('click', closeWishModal);

    // Mặc định điền sẵn lời nguyện ước thanh nhã
    if (wishTextarea) {
      wishTextarea.value = 'Gia đình sum vầy, vạn sự bình an';
    }

    // Nút gửi lời chúc
    const btnSend = document.getElementById('btnSendWish');
    if (btnSend) {
      btnSend.addEventListener('click', handleSendWish);
    }

    // Đóng khi nhấn phím ESC
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && wishModal && wishModal.classList.contains('is-active')) {
        closeWishModal();
      }
    });
  }

  function openWishModal(targetLantern = null) {
    if (!wishModal) return;

    const vW = window.innerWidth;
    const vH = window.innerHeight;

    // Gán ngọn đèn mục tiêu
    if (targetLantern && targetLantern instanceof SkyLantern) {
      activeTargetLantern = targetLantern;
    } else {
      // Nếu bấm nút nổi, tự động chọn ngọn đèn đang ở tầm mắt đẹp nhất (trung tâm màn hình)
      const candidates = lanternsPool.filter(l => !l.isDormant && !l.isBlessed && l.y > vH * 0.25 && l.y < vH * 0.85);
      if (candidates.length > 0) {
        // Ưu tiên ngọn đèn gần giữa màn hình nhất
        candidates.sort((a, b) => Math.abs(a.x - vW * 0.5) - Math.abs(b.x - vW * 0.5));
        activeTargetLantern = candidates[0];
      } else {
        // Nếu không có đèn nào đang ở tầm mắt, đưa đèn có sẵn về vùng nhìn thấy trang nhã ở trung tâm dưới
        activeTargetLantern = lanternsPool.find(l => !l.isBlessed) || lanternsPool[0];
        if (activeTargetLantern) {
          activeTargetLantern.isDormant = false;
          activeTargetLantern.baseX = vW * 0.5 - 35;
          activeTargetLantern.x = activeTargetLantern.baseX;
          activeTargetLantern.y = vH * 0.65;
          activeTargetLantern.baseOpacity = 1.0;
        }
      }
    }

    // Tạm dừng ngọn đèn này tại vị trí hiện tại để người dùng quan sát, không cho bay đi mất hay lặp lại
    if (activeTargetLantern) {
      activeTargetLantern.isPaused = true;
      lanternsPool.forEach(l => {
        if (l !== activeTargetLantern && l.el) l.el.classList.remove('sky-lantern--focused');
      });
      if (activeTargetLantern.el) {
        activeTargetLantern.el.classList.add('sky-lantern--focused');
      }
    }

    wishModal.removeAttribute('hidden');
    wishModal.classList.add('is-active');

    // Âm chuông thiền ngân mở sớ
    playHarmonicChime([523.25, 659.25, 783.99], 1.2);
  }

  function closeWishModal() {
    if (!wishModal || !wishModal.classList.contains('is-active')) return;
    wishModal.classList.remove('is-active');

    // Nếu đóng mà chưa thả, tiếp tục cho ngọn đèn bay bình thường
    if (activeTargetLantern && !activeTargetLantern.isBlessed) {
      activeTargetLantern.isPaused = false;
      if (activeTargetLantern.el) {
        activeTargetLantern.el.classList.remove('sky-lantern--focused');
      }
      activeTargetLantern = null;
    }

    setTimeout(() => {
      if (!wishModal.classList.contains('is-active')) {
        wishModal.setAttribute('hidden', '');
      }
    }, 250);
  }

  function handleSendWish() {
    let wishText = wishTextarea ? wishTextarea.value.trim() : '';
    if (!wishText) {
      wishText = 'Vạn sự bình an, vạn dặm hanh thông';
    }
    const author = wishNameInput ? wishNameInput.value.trim() : '';

    // Biến chính ngọn đèn người dùng đã bấm thành ngọn đèn hoàng kim đặc biệt
    if (activeTargetLantern) {
      const target = activeTargetLantern;
      target.isDormant = false;
      target.dormantTimer = 0;
      target.isPaused = false;
      target.isBlessed = true;
      target.baseOpacity = 1.0;
      target.lastOpacityStr = '1';
      if (target.el) {
        target.el.style.opacity = '1';
        target.el.classList.remove('sky-lantern--focused');
        target.el.classList.add('sky-lantern--blessed');

        // Thay thế bằng SVG hoàng kim rực rỡ
        target.el.innerHTML = createLanternSVG('near', true);

        // Thêm dải sớ lụa đỏ son rủ xuống dưới đèn (không có icon)
        const ribbon = document.createElement('div');
        ribbon.className = 'user-wish-ribbon';
        const displayName = author ? `${author}: ` : '';
        ribbon.textContent = `${displayName}${wishText}`;
        target.el.appendChild(ribbon);
      }

      // Tăng tốc độ bay bứt phá hướng về Cung Trăng
      target.speed = 2.4;
      target.swayAmp = 14;

      // Âm chuông thăng hoa khi thả đèn
      playHarmonicChime([587.33, 739.99, 880.00, 1174.66], 2.4);

      if (typeof window.showToast === 'function') {
        window.showToast('Đã thả ước nguyện', 'Ngọn đèn hoàng kim đang mang lời nguyện ước bay lên Cung Trăng', '🏮');
      }

      activeTargetLantern = null;
    }

    // Đóng modal sau khi ngọn đèn đã được thắp sáng
    closeWishModal();
  }

  /* --------------------------------------------------------------------------
     7. KHỞI TẠO HỆ THỐNG
     -------------------------------------------------------------------------- */
  function initSkyLanterns() {
    createWishModalDOM();

    // Tối ưu số lượng đèn: Mobile 4 đèn (siêu nhẹ, mượt 60fps không giật lag), Desktop 6 đèn (thoáng đãng, thanh tao)
    const isMobile = window.innerWidth <= 768;
    const config = isMobile ? [
      { tier: 'far', count: 1 },
      { tier: 'mid', count: 2 },
      { tier: 'near', count: 1 }
    ] : [
      { tier: 'far', count: 2 },
      { tier: 'mid', count: 2 },
      { tier: 'near', count: 2 }
    ];

    let total = 0;
    config.forEach((c) => (total += c.count));

    let index = 0;
    config.forEach(({ tier, count }) => {
      for (let i = 0; i < count; i++) {
        const lantern = new SkyLantern(tier, index++, total);
        lanternsPool.push(lantern);
      }
    });

    // Bắt đầu vòng lặp chuyển động
    requestAnimationFrame(animate);

    // Hỗ trợ mở sớ trực tiếp qua hash hoặc param chứa wish
    if (window.location.href.includes('wish')) {
      openWishModal();
    }

    // Hỗ trợ xem trước đèn ước nguyện
    if (window.location.href.includes('user_lantern') && lanternsPool.length > 0) {
      activeTargetLantern = lanternsPool[0];
      activeTargetLantern.y = window.innerHeight * 0.45;
      activeTargetLantern.baseX = window.innerWidth * 0.5 - 35;
      activeTargetLantern.x = activeTargetLantern.baseX;
      handleSendWish();
    }

    // Expose ra window để có thể gọi từ bên ngoài nếu cần
    window.openWishModal = openWishModal;

    console.log('🏮 Hiệu ứng Thiên Đăng Dạ Hội (Sky Lanterns) loaded silky smooth!');
  }

  // Khởi động khi DOM sẵn sàng
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSkyLanterns);
  } else {
    initSkyLanterns();
  }
})();
