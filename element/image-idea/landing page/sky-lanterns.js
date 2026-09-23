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
    const glowId = `glowFilter_${lanternUniqueCounter}`;

    // Khổ kích thước chuẩn tỷ lệ Khổng Minh Đăng
    const w = isUser ? 68 : (tier === 'near' ? 52 : (tier === 'mid' ? 36 : 22));
    const h = Math.round(w * 1.35);

    // Bảng màu rực rỡ ấm áp
    const topColor = isUser ? '#fff5cc' : (tier === 'near' ? '#ffeaa7' : '#ffd166');
    const midColor = isUser ? '#ffb703' : (tier === 'near' ? '#f77f00' : '#f48c06');
    const bottomColor = isUser ? '#e85d04' : (tier === 'near' ? '#d00000' : '#dc2f02');

    return `
      <svg width="${w}" height="${h}" style="width:${w}px; height:${h}px; max-width:${w}px; max-height:${h}px;" viewBox="0 0 100 135" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <!-- Gradient thân đèn lụa giấy dó -->
          <linearGradient id="${gradId}" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stop-color="${topColor}" stop-opacity="0.88" />
            <stop offset="35%" stop-color="${topColor}" stop-opacity="0.95" />
            <stop offset="70%" stop-color="${midColor}" stop-opacity="0.98" />
            <stop offset="100%" stop-color="${bottomColor}" stop-opacity="1" />
          </linearGradient>

          <!-- Gradient tim lửa bập bùng -->
          <radialGradient id="${flameId}" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#ffffff" stop-opacity="1" />
            <stop offset="40%" stop-color="#fff07c" stop-opacity="0.95" />
            <stop offset="80%" stop-color="#ffb703" stop-opacity="0.8" />
            <stop offset="100%" stop-color="#f77f00" stop-opacity="0" />
          </radialGradient>

          <!-- Filter quầng hào quang mềm -->
          <filter id="${glowId}" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="${isUser ? 6 : (tier === 'near' ? 4 : 2.5)}" />
          </filter>
        </defs>

        <!-- Quầng sáng sau lưng đèn -->
        <ellipse cx="50" cy="85" rx="38" ry="42" fill="url(#${flameId})" filter="url(#${glowId})" opacity="${isUser ? 0.9 : 0.65}" />

        <!-- Thân đèn Khổng Minh vòm cong truyền thống -->
        <path d="M22 118 C14 85 10 38 32 12 C40 4 60 4 68 12 C90 38 86 85 78 118 C70 122 30 122 22 118 Z" 
              fill="url(#${gradId})" />

        <!-- Các nếp gấp nan tre mờ đục dọc thân đèn -->
        <path d="M50 8 C48 45 48 90 50 120" stroke="#fff" stroke-opacity="0.25" stroke-width="1.2" stroke-dasharray="3 2" />
        <path d="M35 11 C31 45 32 88 36 119" stroke="#fff" stroke-opacity="0.18" stroke-width="1" />
        <path d="M65 11 C69 45 68 88 64 119" stroke="#fff" stroke-opacity="0.18" stroke-width="1" />

        <!-- Tim lửa rực sáng bập bùng ở đáy đèn -->
        <g class="lantern-flame-core">
          <ellipse cx="50" cy="110" rx="${isUser ? 16 : 12}" ry="${isUser ? 15 : 11}" fill="url(#${flameId})" />
          <circle cx="50" cy="111" r="${isUser ? 6 : 4.5}" fill="#ffffff" />
        </g>

        <!-- Vành nan tre giữ đáy đèn -->
        <ellipse cx="50" cy="120" rx="28" ry="4" stroke="#4a1c02" stroke-width="2.2" fill="none" opacity="0.85" />
        <!-- Nan chéo giữ bùi nhùi nến -->
        <line x1="32" y1="120" x2="68" y2="120" stroke="#331402" stroke-width="1.2" />
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
      this.isUser = false;

      this.el = document.createElement('div');
      this.el.className = `sky-lantern tier-${tier}`;
      this.el.innerHTML = createLanternSVG(tier, false);

      // Gán tooltip lời chúc cộng đồng
      const wishText = COMMUNITY_WISHES[Math.floor(Math.random() * COMMUNITY_WISHES.length)];
      this.tooltip = document.createElement('div');
      this.tooltip.className = 'lantern-wish-tooltip';
      this.tooltip.textContent = `✨ ${wishText}`;
      this.el.appendChild(this.tooltip);

      // Thao tác click vào đèn mở sớ ước nguyện
      this.el.addEventListener('click', (e) => {
        e.stopPropagation();
        openWishModal();
      });

      this.reset(true);
      viewportEl.appendChild(this.el);
    }

    reset(initial = false) {
      const vW = window.innerWidth;
      const vH = window.innerHeight;

      // Safe Corridor: Phân bổ 75% ở 2 mạn sườn (0-28% và 72-98%), 25% ở giữa
      const rand = Math.random();
      if (rand < 0.42) {
        this.baseX = Math.random() * (vW * 0.26) + (vW * 0.02); // Dải trái
      } else if (rand < 0.84) {
        this.baseX = Math.random() * (vW * 0.24) + (vW * 0.72); // Dải phải
      } else {
        this.baseX = Math.random() * (vW * 0.4) + (vW * 0.3);   // Vùng giữa
      }

      this.x = this.baseX;

      // Tốc độ bay & chu kỳ gió theo từng tầng cự ly
      if (this.tier === 'far') {
        this.speed = Math.random() * 0.35 + 0.3; // 0.3 - 0.65 px/frame
        this.swayAmp = Math.random() * 14 + 10;
        this.swayFreq = Math.random() * 0.0012 + 0.0008;
      } else if (this.tier === 'mid') {
        this.speed = Math.random() * 0.5 + 0.55; // 0.55 - 1.05 px/frame
        this.swayAmp = Math.random() * 22 + 15;
        this.swayFreq = Math.random() * 0.0015 + 0.001;
      } else {
        // Near tier
        this.speed = Math.random() * 0.6 + 0.85; // 0.85 - 1.45 px/frame
        this.swayAmp = Math.random() * 32 + 20;
        this.swayFreq = Math.random() * 0.0018 + 0.0012;
      }

      this.swayPhase = Math.random() * Math.PI * 2;

      if (initial) {
        // Trải đều khắp màn hình khi tải trang lần đầu
        this.y = Math.random() * (vH * 1.1) - (vH * 0.05);
      } else {
        // Tái sinh từ dưới mép đáy màn hình
        this.y = vH + Math.random() * 80 + 20;
      }
    }

    update(time, delta) {
      this.y -= this.speed * (delta / 16.67);

      // Chuyển động đung đưa hình sin
      const swayOffset = Math.sin(time * this.swayFreq + this.swayPhase) * this.swayAmp;
      this.x = this.baseX + swayOffset;

      // Độ nghiêng khí động học theo hướng gió
      const tilt = Math.cos(time * this.swayFreq + this.swayPhase) * 2.8;

      // GPU Transform
      this.el.style.transform = `translate3d(${this.x.toFixed(1)}px, ${this.y.toFixed(1)}px, 0) rotate(${tilt.toFixed(1)}deg)`;

      // Khi bay vượt quá đỉnh màn hình -> Tái sinh từ đáy
      if (this.y < -130) {
        this.reset(false);
      }
    }
  }

  /* --------------------------------------------------------------------------
     4. USER WISH LANTERN (ĐÈN ƯỚC NGUYỆN CÁ NHÂN SÁNG VƯỢT TRỘI)
     -------------------------------------------------------------------------- */
  class UserWishLantern {
    constructor(wishText, senderName, startX, startY) {
      this.el = document.createElement('div');
      this.el.className = 'sky-lantern sky-lantern--user';
      this.el.innerHTML = createLanternSVG('near', true);

      // Thêm dải sớ nguyện ước rủ xuống
      const ribbon = document.createElement('div');
      ribbon.className = 'user-wish-ribbon';
      const displayName = senderName ? `${senderName}: ` : '';
      ribbon.textContent = `🏮 ${displayName}${wishText}`;
      this.el.appendChild(ribbon);

      viewportEl.appendChild(this.el);

      this.baseX = startX || (window.innerWidth * 0.5 - 39);
      this.x = this.baseX;
      this.y = startY || (window.innerHeight - 80);
      this.speed = 2.4; // Tốc độ nhanh hơn 1.85x đèn thường
      this.swayAmp = 25;
      this.swayFreq = 0.002;
      this.swayPhase = 0;
      this.isAlive = true;
    }

    update(time, delta) {
      if (!this.isAlive) return;

      this.y -= this.speed * (delta / 16.67);
      const swayOffset = Math.sin(time * this.swayFreq + this.swayPhase) * this.swayAmp;
      this.x = this.baseX + swayOffset;
      const tilt = Math.cos(time * this.swayFreq + this.swayPhase) * 3.5;

      this.el.style.transform = `translate3d(${this.x.toFixed(1)}px, ${this.y.toFixed(1)}px, 0) rotate(${tilt.toFixed(1)}deg)`;

      // Khi bay khuất khỏi màn hình, dọn dẹp nhẹ nhàng
      if (this.y < -180) {
        this.isAlive = false;
        if (this.el.parentNode) {
          this.el.parentNode.removeChild(this.el);
        }
      }
    }
  }

  let userLanterns = [];

  /* --------------------------------------------------------------------------
     5. RENDER LOOP (60FPS HARDWARE ACCELERATED)
     -------------------------------------------------------------------------- */
  function animate(now) {
    if (!isRunning) return;

    if (!lastTimestamp) lastTimestamp = now;
    const delta = Math.min(now - lastTimestamp, 50); // Cap delta to prevent jump after tab switch
    lastTimestamp = now;

    // Cập nhật đèn nền
    for (let i = 0; i < lanternsPool.length; i++) {
      lanternsPool[i].update(now, delta);
    }

    // Cập nhật đèn của người dùng
    for (let i = userLanterns.length - 1; i >= 0; i--) {
      userLanterns[i].update(now, delta);
      if (!userLanterns[i].isAlive) {
        userLanterns.splice(i, 1);
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
     6. WISH SCROLL MODAL (SỚ ƯỚC NGUYỆN HOÀNG KIM)
     -------------------------------------------------------------------------- */
  let wishModal = null;
  let wishBackdrop = null;
  let wishTextarea = null;
  let wishNameInput = null;
  let chipButtons = [];

  function createWishModalDOM() {
    // 1. Viewport Container
    viewportEl = document.createElement('div');
    viewportEl.id = 'skyLanternsContainer';
    viewportEl.className = 'sky-lanterns-viewport';
    document.body.appendChild(viewportEl);

    // 2. Floating Quick Launch Button
    const btnLaunch = document.createElement('button');
    btnLaunch.type = 'button';
    btnLaunch.id = 'btnLaunchLantern';
    btnLaunch.className = 'btn-launch-lantern';
    btnLaunch.title = 'Gửi gắm ước nguyện lên Cung Trăng';
    btnLaunch.innerHTML = `
      <svg class="lantern-icon-svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C7.5 2 6 6 6 10c0 4.5 3 8 6 10 3-2 6-5.5 6-10 0-4-1.5-8-6-10zm0 15c-1.5 0-3-1.8-3-4s1.5-4 3-4 3 1.8 3 4-1.5 4-3 4z"/>
      </svg>
      <span>🏮 Thả Thiên Đăng</span>
    `;
    btnLaunch.addEventListener('click', openWishModal);
    document.body.appendChild(btnLaunch);

    // 3. Wish Modal Overlay
    const modalHTML = `
      <div class="wish-modal-overlay" id="wishModalOverlay" role="dialog" aria-modal="true" aria-labelledby="wishModalTitle" hidden>
        <div class="wish-modal-backdrop" id="wishModalBackdrop"></div>
        <div class="wish-modal-card">
          <button type="button" class="wish-modal-close" id="btnCloseWishModal" aria-label="Đóng sớ ước nguyện">
            <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>

          <div class="wish-modal-header">
            <div class="wish-modal-badge">
              <span>🏮 THIÊN ĐĂNG NGUYỆN ƯỚC</span>
            </div>
            <h3 class="wish-modal-title" id="wishModalTitle">THẢ ĐÈN LÊN CUNG TRĂNG</h3>
            <p class="wish-modal-desc">Thắp sáng một ngọn đèn mang theo tâm nguyện bình an, tài lộc đêm Rằm tháng Tám:</p>
          </div>

          <div class="wish-chips-title">Chọn nhanh ước nguyện ý nghĩa:</div>
          <div class="wish-chips-grid">
            <button type="button" class="wish-chip-btn is-selected" data-text="Gia đình sum vầy, vạn sự bình an 🌕">🌕 Gia đình sum vầy, bình an</button>
            <button type="button" class="wish-chip-btn" data-text="Công danh thăng tiến, tài lộc hanh thông 🏮">🏮 Công danh, tài lộc hanh thông</button>
            <button type="button" class="wish-chip-btn" data-text="Vạn dặm bình an cùng Nam Tiến Motor 🛵">🛵 Vạn dặm bình an - Nam Tiến</button>
            <button type="button" class="wish-chip-btn" data-text="Trăng tròn hạnh phúc, ấm áp yêu thương 💛">💛 Trăng tròn viên mãn hạnh phúc</button>
          </div>

          <div class="wish-input-group">
            <label class="wish-label" for="txtCustomWish">Hoặc tự tay viết lời chúc của bạn:</label>
            <textarea id="txtCustomWish" class="wish-textarea" placeholder="Nhập tâm nguyện hoặc lời chúc tốt đẹp đêm Trung Thu..."></textarea>
          </div>

          <div class="wish-input-group">
            <label class="wish-label" for="txtWishAuthor">Tên người gửi (không bắt buộc):</label>
            <input type="text" id="txtWishAuthor" class="wish-name-input" placeholder="Ví dụ: Gia đình An Nhiên, Tuấn Anh..." maxlength="30" />
          </div>

          <button type="button" class="btn-submit-wish" id="btnSendWish">
            <span>✨ Thắp Sáng & Thả Đèn Lên Trời</span>
          </button>
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

    // Gán sự kiện cho các nút chọn nhanh
    chipButtons = Array.from(document.querySelectorAll('.wish-chip-btn'));
    chipButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        chipButtons.forEach((b) => b.classList.remove('is-selected'));
        btn.classList.add('is-selected');
        if (wishTextarea) {
          wishTextarea.value = btn.dataset.text;
        }
      });
    });

    // Mặc định điền lời chúc đầu tiên
    if (wishTextarea) {
      wishTextarea.value = 'Gia đình sum vầy, vạn sự bình an 🌕';
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

  function openWishModal() {
    if (!wishModal) return;
    wishModal.removeAttribute('hidden');
    wishModal.classList.add('is-active');

    // Âm chuông thiền mở sớ
    playHarmonicChime([523.25, 659.25, 783.99], 1.2);
  }

  function closeWishModal() {
    if (!wishModal || !wishModal.classList.contains('is-active')) return;
    wishModal.classList.remove('is-active');
    setTimeout(() => {
      if (!wishModal.classList.contains('is-active')) {
        wishModal.setAttribute('hidden', '');
      }
    }, 250);
  }

  function handleSendWish() {
    let wishText = wishTextarea ? wishTextarea.value.trim() : '';
    if (!wishText) {
      wishText = 'Vạn sự bình an, hạnh phúc viên mãn 🌕';
    }
    const author = wishNameInput ? wishNameInput.value.trim() : '';

    // Đóng modal
    closeWishModal();

    // Âm chuông thăng hoa khi thả đèn
    playHarmonicChime([587.33, 739.99, 880.00, 1174.66], 2.4);

    // Sinh ngọn đèn của người dùng xuất phát từ giữa dưới màn hình
    const startX = window.innerWidth * 0.5 - 39;
    const startY = window.innerHeight - 70;
    const userLantern = new UserWishLantern(wishText, author, startX, startY);
    userLanterns.push(userLantern);

    // Hiển thị thông báo Toast nếu trang có hàm showToast
    if (typeof window.showToast === 'function') {
      window.showToast('Đã thả đèn ước nguyện!', 'Ngọn đèn hoàng kim mang theo lời chúc của bạn đang bay lên Cung Trăng ✨', '🏮');
    }
  }

  /* --------------------------------------------------------------------------
     7. KHỞI TẠO HỆ THỐNG
     -------------------------------------------------------------------------- */
  function initSkyLanterns() {
    createWishModalDOM();

    // Khởi tạo 16 ngọn đèn phân bổ 3 tầng cự ly
    // 7 đèn tầng Xa, 6 đèn tầng Trung, 3 đèn tầng Gần
    const config = [
      { tier: 'far', count: 7 },
      { tier: 'mid', count: 6 },
      { tier: 'near', count: 3 }
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

    // Hỗ trợ xem trước đèn cá nhân người dùng
    if (window.location.href.includes('user_lantern')) {
      const u = new UserWishLantern('Gia đình sum vầy, vạn sự bình an 🌕', 'Gia đình Nam Tiến', window.innerWidth * 0.5 - 39, window.innerHeight * 0.5);
      userLanterns.push(u);
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
