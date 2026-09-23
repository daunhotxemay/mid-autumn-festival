/**
 * TẾT TRUNG THU - YAMAHA TOWN NAM TIẾN LANDING PAGE
 * Interactive Features, Sequence Replay, Ambient Synthesizer & Canvas Particles
 */

(function () {
  'use strict';
  if (new URLSearchParams(window.location.search).has('settled')) {
    document.body.classList.add('skip-animations');
  }


  /* ==========================================================================
     CẤU HÌNH GOOGLE APPS SCRIPT / GOOGLE SHEETS
     Sau khi deploy Web App từ file google-apps-script.js, hãy dán URL vào đây:
     Ví dụ: const GOOGLE_SHEET_SCRIPT_URL = 'https://script.google.com/macros/s/.../exec';
     ========================================================================== */
  const GOOGLE_SHEET_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwb3cQ5Bes9YR9Nlg4Cm5xHAO8xen8qOkTgt58xzsWs5U7-PinfgPaXzijcUyV4hfP9AA/exec';

  // DOM Elements
  const festivalStage = document.getElementById('festivalStage');
  const btnMusic = document.getElementById('btnMusic');
  const musicText = document.getElementById('musicText');
  const iconMusic = document.getElementById('iconMusic');
  const btnToggleChars = document.getElementById('btnToggleCharacters');
  const charChiHang = document.getElementById('charChiHang');
  const charChuCuoi = document.getElementById('charChuCuoi');
  const thoNgoc = document.getElementById('thoNgoc');
  const rabbitDialogue = document.getElementById('rabbitDialogue');
  const btnOpenRegister = document.getElementById('btnOpenRegister');
  const invitationCard = document.getElementById('invitationCard');
  const sectionRegister = document.getElementById('sectionRegister');
  const registerForm = document.getElementById('registerForm');
  const successBox = document.getElementById('successBox');
  const giftToast = document.getElementById('giftToast');
  const toastTitle = document.getElementById('toastTitle');
  const toastDesc = document.getElementById('toastDesc');
  const particleCanvas = document.getElementById('particleCanvas');

  // Fanpage Chooser Modal Elements
  const btnOpenFanpageModal = document.getElementById('btnOpenFanpageModal');
  const fanpageModal = document.getElementById('fanpageModal');
  const btnCloseFanpageModal = document.getElementById('btnCloseFanpageModal');
  const fanpageModalBackdrop = document.getElementById('fanpageModalBackdrop');

  // Mooncakes
  const cake1 = document.getElementById('cake1');
  const cake2 = document.getElementById('cake2');
  const cake3 = document.getElementById('cake3');

  // Countdown Elements
  const cdDays = document.getElementById('cdDays');
  const cdHours = document.getElementById('cdHours');
  const cdMins = document.getElementById('cdMins');
  const cdSecs = document.getElementById('cdSecs');

  /* ==========================================================================
     1. STAGGERED ENTRANCE REPLAY ENGINE
     ========================================================================== */
  function replayEntrance() {
    const animatedElements = festivalStage.querySelectorAll('[class*="anim-phase-"]');
    
    // Remove animation classes
    animatedElements.forEach((el) => {
      const classList = Array.from(el.classList);
      classList.forEach((cls) => {
        if (cls.startsWith('anim-phase-')) {
          el.dataset.animClass = cls;
          el.classList.remove(cls);
        }
      });
    });

    // Force single browser reflow
    void festivalStage.offsetWidth;

    // Restore animation classes to trigger silky sequence
    requestAnimationFrame(() => {
      animatedElements.forEach((el) => {
        if (el.dataset.animClass) {
          el.classList.add(el.dataset.animClass);
        }
      });
    });

    // Show toast notice
    showToast('Đang phát lại hiệu ứng!', 'Thưởng thức chuỗi xuất hiện mượt mà từng chi tiết ✨');
  }



  /* ==========================================================================
     2. COUNTDOWN TIMER TO TẾT TRUNG THU
     ========================================================================== */
  // Target: Set to Mid-Autumn Festival night
  let targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + 5);
  targetDate.setHours(18, 0, 0, 0);

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate.getTime() - now;

    if (distance <= 0) {
      if (cdDays) cdDays.textContent = '00';
      if (cdHours) cdHours.textContent = '00';
      if (cdMins) cdMins.textContent = '00';
      if (cdSecs) cdSecs.textContent = '00';
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (cdDays) cdDays.textContent = String(days).padStart(2, '0');
    if (cdHours) cdHours.textContent = String(hours).padStart(2, '0');
    if (cdMins) cdMins.textContent = String(minutes).padStart(2, '0');
    if (cdSecs) cdSecs.textContent = String(seconds).padStart(2, '0');
  }

  setInterval(updateCountdown, 1000);
  updateCountdown();

  /* ==========================================================================
     3. INTERACTIVE MOONCAKES & RABBIT DELIGHTS
     ========================================================================== */
  let toastTimeout = null;

  function showToast(title, message, icon = '🥮') {
    if (!giftToast) return;
    const iconEl = giftToast.querySelector('.gift-toast-icon');
    if (iconEl) iconEl.textContent = icon;
    if (toastTitle) toastTitle.textContent = title;
    if (toastDesc) toastDesc.textContent = message;

    giftToast.classList.add('active');
    playTone(523.25, 0.15, 'triangle'); // C5 chime

    if (toastTimeout) clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      giftToast.classList.remove('active');
    }, 4500);
  }

  if (cake1) {
    cake1.addEventListener('click', () => {
      showToast('Bánh Trăng Vàng Thập Cẩm!', 'Bạn vừa nhặt được Hộp Bánh Thượng Hạng tại cung đường trăng! Bấm Đăng ký để nhận quà nhé.', '🥮');
    });
  }

  if (cake2) {
    cake2.addEventListener('click', () => {
      showToast('Bánh Hạt Sen Trứng Muối!', 'Voucher bảo dưỡng xe Yamaha 300.000đ đã được thêm vào giỏ quà của bạn!', '🎁');
    });
  }

  if (cake3) {
    cake3.addEventListener('click', () => {
      showToast('Bánh Đậu Xanh Hoàng Kim!', 'Quà tặng Lồng Đèn Phát Sáng Yamaha đang chờ bé cưng của bạn!', '🏮');
    });
  }

  // Rabbit dialogue click
  const rabbitPhrases = [
    '🐰 Thỏ Ngọc chào bạn! Chúc một mùa Trung Thu tràn đầy phúc lộc!',
    '🌙 Trăng rằm tháng Tám sáng nhất, ghé Yamaha Nam Tiến rước lộc to nha!',
    '🥮 Bánh ngon, trà thơm, xe đẹp đang chờ đón bạn cùng gia đình!',
    '🏮 Đừng quên bấm Đăng Ký để nhận ngay hộp bánh trung thu miễn phí!'
  ];
  let phraseIdx = 0;

  if (thoNgoc) {
    thoNgoc.addEventListener('click', () => {
      phraseIdx = (phraseIdx + 1) % rabbitPhrases.length;
      if (rabbitDialogue) {
        const textSpan = rabbitDialogue.querySelector('span');
        if (textSpan) textSpan.textContent = rabbitPhrases[phraseIdx];
        rabbitDialogue.classList.add('show-bubble');
        playTone(659.25, 0.2, 'sine'); // E5 chime
        setTimeout(() => {
          rabbitDialogue.classList.remove('show-bubble');
        }, 3500);
      }
    });
  }

  /* ==========================================================================
     4. CHARACTERS TOGGLE
     ========================================================================== */
  if (btnToggleChars) {
    let charsVisible = true;
    btnToggleChars.addEventListener('click', () => {
      charsVisible = !charsVisible;
      if (charChiHang) charChiHang.style.display = charsVisible ? 'block' : 'none';
      if (charChuCuoi) charChuCuoi.style.display = charsVisible ? 'block' : 'none';
      btnToggleChars.style.opacity = charsVisible ? '1' : '0.6';
    });
  }

  /* ==========================================================================
     5. SMOOTH SCROLL TO REGISTRATION FORM & SUBMISSION
     ========================================================================== */
  function scrollToRegister() {
    if (!sectionRegister) return;
    const isAtTop = window.scrollY < window.innerHeight * 0.8;
    if (isAtTop) {
      window.scrollTo({
        top: window.innerHeight,
        behavior: 'smooth'
      });
    } else {
      sectionRegister.scrollIntoView({ behavior: 'smooth' });
    }
  }

  window.scrollToRegister = scrollToRegister;

  if (btnOpenRegister) {
    btnOpenRegister.addEventListener('click', (e) => {
      e.preventDefault();
      scrollToRegister();
    });
  }

  if (invitationCard && invitationCard !== btnOpenRegister) {
    invitationCard.addEventListener('click', (e) => {
      e.preventDefault();
      scrollToRegister();
    });
  }

  if (giftToast) {
    giftToast.style.cursor = 'pointer';
    giftToast.addEventListener('click', scrollToRegister);
  }

  /* ==========================================================================
     3.5. FANPAGE CHOOSER POPUP MODAL
     ========================================================================== */
  const fanpageModalCard = fanpageModal ? fanpageModal.querySelector('.fanpage-modal-card') : null;

  function openFanpageModal() {
    if (!fanpageModal) return;
    fanpageModal.removeAttribute('hidden');
    fanpageModal.classList.add('is-active');

    // Chime sound effect
    playTone(659.25, 0.12, 'sine'); // E5 chime

    if (window.gsap && fanpageModalCard) {
      gsap.killTweensOf([fanpageModal, fanpageModalCard]);
      gsap.fromTo(fanpageModal,
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 0.25, ease: 'power2.out' }
      );
      gsap.fromTo(fanpageModalCard,
        { scale: 0.88, y: 30 },
        { scale: 1, y: 0, duration: 0.38, ease: 'back.out(1.5)' }
      );
    }
  }

  function closeFanpageModal() {
    if (!fanpageModal || !fanpageModal.classList.contains('is-active')) return;

    if (window.gsap && fanpageModalCard) {
      gsap.killTweensOf([fanpageModal, fanpageModalCard]);
      gsap.to(fanpageModalCard, {
        scale: 0.9,
        y: 18,
        duration: 0.2,
        ease: 'power2.in'
      });
      gsap.to(fanpageModal, {
        autoAlpha: 0,
        duration: 0.2,
        ease: 'power2.in',
        onComplete: () => {
          fanpageModal.classList.remove('is-active');
          fanpageModal.setAttribute('hidden', '');
        }
      });
    } else {
      fanpageModal.classList.remove('is-active');
      fanpageModal.setAttribute('hidden', '');
    }
  }

  if (btnOpenFanpageModal) {
    btnOpenFanpageModal.addEventListener('click', (e) => {
      e.preventDefault();
      openFanpageModal();
    });
  }

  if (btnCloseFanpageModal) {
    btnCloseFanpageModal.addEventListener('click', (e) => {
      e.preventDefault();
      closeFanpageModal();
    });
  }

  if (fanpageModalBackdrop) {
    fanpageModalBackdrop.addEventListener('click', closeFanpageModal);
  }

  // Keyboard accessibility: ESC key to close
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && fanpageModal && fanpageModal.classList.contains('is-active')) {
      closeFanpageModal();
    }
  });

  // Open modal if URL query has modal or hash #fanpage
  if (new URLSearchParams(window.location.search).has('modal') || window.location.hash === '#fanpage') {
    setTimeout(openFanpageModal, 350);
  }

  window.submitForm = async function () {
    const nameInput = document.getElementById('txtName');
    const phoneInput = document.getElementById('txtPhone');
    const name = nameInput ? nameInput.value.trim() : '';
    const phone = phoneInput ? phoneInput.value.trim() : '';

    if (!name || !phone) return;

    // Validate phone number format (10-11 digits)
    const cleanPhone = phone.replace(/[\s.-]/g, '');
    if (!/^[0-9]{10,11}$/.test(cleanPhone)) {
      alert('Vui lòng nhập đúng định dạng số điện thoại (10 hoặc 11 chữ số)');
      if (phoneInput) phoneInput.focus();
      return;
    }

    const submitBtn = registerForm ? registerForm.querySelector('button[type="submit"]') : null;
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span>⏳ Đang gửi thông tin đăng ký...</span>';
    }

    // Dynamic unique gift code for attendee
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const uniqueGiftCode = `YAMAHA-TT-${randomSuffix}`;
    const codeEl = document.querySelector('.gift-code');
    if (codeEl) {
      codeEl.textContent = uniqueGiftCode;
    }

    const deviceType = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
      ? 'Điện thoại (Mobile)'
      : 'Máy tính (Desktop)';

    const payload = {
      name: name,
      phone: cleanPhone,
      giftCode: uniqueGiftCode,
      device: deviceType,
      note: 'Đăng ký nhận quà Đêm Hội Trăng Rằm'
    };

    // Send data to Google Sheets Web App if URL is provided
    if (GOOGLE_SHEET_SCRIPT_URL && GOOGLE_SHEET_SCRIPT_URL.trim() !== '') {
      try {
        await fetch(GOOGLE_SHEET_SCRIPT_URL.trim(), {
          method: 'POST',
          mode: 'no-cors',
          cache: 'no-cache',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        });
      } catch (err) {
        console.warn('Lưu ý kết nối Google Sheet:', err);
      }
    }

    if (registerForm) registerForm.style.display = 'none';
    if (successBox) {
      successBox.style.display = 'block';
      successBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    triggerConfetti();
    playTone(880, 0.3, 'sine'); // A5 fanfare
    setTimeout(() => playTone(1046.5, 0.4, 'sine'), 150); // C6 fanfare
  };

  /* ==========================================================================
     6. AMBIENT MID-AUTUMN MUSIC SYNTHESIZER (WEB AUDIO API)
     Zero-latency, royalty-free pentatonic chime melody
     ========================================================================== */
  let audioCtx = null;
  let isPlayingMusic = false;
  let musicTimer = null;

  function initAudio() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioContext();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  function playTone(freq, duration = 0.3, type = 'sine') {
    try {
      initAudio();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

      gain.gain.setValueAtTime(0.12, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {
      // Audio context policy
    }
  }

  // Traditional Pentatonic Scale Frequencies (C4, D4, E4, G4, A4, C5, D5, E5, G5)
  const pentatonicScale = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 587.33, 659.25, 783.99];

  function playAmbientNote() {
    if (!isPlayingMusic) return;
    const note = pentatonicScale[Math.floor(Math.random() * pentatonicScale.length)];
    playTone(note, 1.8, 'sine');

    const nextDelay = 800 + Math.random() * 1400;
    musicTimer = setTimeout(playAmbientNote, nextDelay);
  }

  if (btnMusic) {
    btnMusic.addEventListener('click', () => {
      initAudio();
      isPlayingMusic = !isPlayingMusic;

      if (isPlayingMusic) {
        musicText.textContent = 'Âm nhạc: Bật 🎶';
        btnMusic.style.borderColor = 'var(--color-gold)';
        playAmbientNote();
      } else {
        musicText.textContent = 'Âm nhạc: Tắt';
        btnMusic.style.borderColor = 'rgba(255, 220, 100, 0.35)';
        if (musicTimer) clearTimeout(musicTimer);
      }
    });
  }

  /* ==========================================================================
     7. CONFETTI CELEBRATION EFFECT
     ========================================================================== */
  function triggerConfetti() {
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100vw';
    canvas.style.height = '100vh';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '999999';
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const colors = ['#ffd700', '#ff4b2b', '#ff416c', '#00d2ff', '#9b51e0', '#ffffff'];

    for (let i = 0; i < 100; i++) {
      particles.push({
        x: canvas.width / 2,
        y: canvas.height / 2,
        vx: (Math.random() - 0.5) * 16,
        vy: (Math.random() - 0.7) * 18,
        size: Math.random() * 7 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        vr: (Math.random() - 0.5) * 12,
        opacity: 1
      });
    }

    let frames = 0;
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      frames++;

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.35; // gravity
        p.rotation += p.vr;
        p.opacity = Math.max(0, 1 - frames / 120);

        ctx.save();
        ctx.globalAlpha = p.opacity;
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.7);
        ctx.restore();
      });

      if (frames < 120) {
        requestAnimationFrame(animate);
      } else {
        canvas.remove();
      }
    }
    requestAnimationFrame(animate);
  }

  /* ==========================================================================
     8. AMBIENT STARRY CANVAS PARTICLES
     ========================================================================== */
  if (particleCanvas) {
    const ctx = particleCanvas.getContext('2d');
    let width = (particleCanvas.width = window.innerWidth);
    let height = (particleCanvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = particleCanvas.width = window.innerWidth;
      height = particleCanvas.height = window.innerHeight;
    });

    const numStars = 35;
    const stars = [];

    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.8 + 0.5,
        alpha: Math.random(),
        speed: Math.random() * 0.015 + 0.005,
        driftX: (Math.random() - 0.5) * 0.2,
        driftY: -Math.random() * 0.25 - 0.05
      });
    }

    function renderParticles() {
      ctx.clearRect(0, 0, width, height);

      stars.forEach((s) => {
        s.alpha += s.speed;
        if (s.alpha > 1 || s.alpha < 0) s.speed = -s.speed;

        s.x += s.driftX;
        s.y += s.driftY;

        if (s.y < 0) s.y = height;
        if (s.x < 0) s.x = width;
        if (s.x > width) s.x = 0;

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 235, 150, ${Math.max(0, Math.min(1, s.alpha * 0.8))})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = '#ffeaa7';
        ctx.fill();
      });

      requestAnimationFrame(renderParticles);
    }

    requestAnimationFrame(renderParticles);
  }

  /* ==========================================================================
     9. GSAP SCROLL-DRIVEN CELESTIAL CHOREOGRAPHY
     - Sân khấu Hero được Ghim (Pin) trong lúc người dùng cuộn
     - Phase 1 (0.0 -> 0.65): Mây tách ra 2 bên, Chị Hằng bay sang trái, Chú Cuội bay sang phải
     - Phase 2 (0.05 -> 0.55): Toàn bộ chi tiết còn lại (Trăng, thiệp mời, tiêu đề, bánh, thỏ, khung, sao) mờ dần
     - Phase 3 (0.28 -> 1.00): "RỒI" Section Form được đẩy trồi lên mượt mà theo cuộn
     - Đảo chiều 100% khi cuộn ngược lên đầu trang
     ========================================================================== */
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    // Tối ưu hóa ScrollTrigger cho Mobile (Tránh giật khi thanh địa chỉ co giãn)
    ScrollTrigger.config({
      ignoreMobileResize: true,
      autoRefreshEvents: 'visibilitychange,DOMContentLoaded,load'
    });

    const pageContainer = document.querySelector('.page-container');

    const mm = gsap.matchMedia();

    mm.add({
      isDesktop: '(min-width: 769px)',
      isMobile: '(max-width: 768px)',
      reduceMotion: '(prefers-reduced-motion: reduce)'
    }, (context) => {
      const { isDesktop, isMobile, reduceMotion } = context.conditions;

      if (!festivalStage || !pageContainer || !sectionRegister) return;

      // Đặt trước các thuộc tính căn giữa trong GSAP
      gsap.set(['#titleDemHoi', '.layer-ribbon-tagline', '#invitationCard'], {
        xPercent: -50
      });

      if (reduceMotion) {
        const reducedTl = gsap.timeline({
          scrollTrigger: {
            trigger: pageContainer,
            start: 'top top',
            end: '+=80%',
            pin: true,
            pinSpacing: false,
            scrub: true
          }
        });
        reducedTl.to(festivalStage, { autoAlpha: 0, duration: 0.5 }, 0);
        reducedTl.fromTo(sectionRegister, { y: 100, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.5 }, 0.3);
        return;
      }

      // Kịch bản cuộn chính (Scrollytelling Timeline)
      const scrollyTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: pageContainer,
          start: 'top top',
          end: '+=100%',
          pin: true,
          pinSpacing: false,
          scrub: isMobile ? 0.8 : 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (self.progress > 0.01 && !festivalStage.classList.contains('gsap-scrolling')) {
              festivalStage.classList.add('gsap-scrolling');
            }
          }
        }
      });

      // ----------------------------------------------------------------------
      // BƯỚC 1: MÂY TÁCH RA & CHỊ HẰNG, CHÚ CUỘI TÁCH RA 2 BÊN
      // ----------------------------------------------------------------------

      // 1. Nhánh Trái: Mây bên trái & Chị Hằng cùng lướt dạt sang trái
      const leftClouds = ['.cloud-m2', '.cloud-m3'];
      scrollyTimeline.to(leftClouds, {
        xPercent: isMobile ? -85 : -115,
        yPercent: -5,
        autoAlpha: 0,
        ease: 'power1.inOut',
        duration: 0.6
      }, 0);

      if (charChiHang) {
        scrollyTimeline.to(charChiHang, {
          xPercent: isMobile ? -110 : -140,
          yPercent: -15,
          autoAlpha: 0,
          ease: 'power1.inOut',
          duration: 0.65
        }, 0);
      }

      // 2. Nhánh Phải: Mây bên phải & Chú Cuội cùng lướt dạt sang phải
      const rightClouds = ['.cloud-m4', '.cloud-m4-base'];
      scrollyTimeline.to(rightClouds, {
        xPercent: isMobile ? 85 : 115,
        yPercent: -5,
        autoAlpha: 0,
        ease: 'power1.inOut',
        duration: 0.6
      }, 0);

      if (charChuCuoi) {
        scrollyTimeline.to(charChuCuoi, {
          xPercent: isMobile ? 110 : 140,
          yPercent: -15,
          autoAlpha: 0,
          ease: 'power1.inOut',
          duration: 0.65
        }, 0);
      }

      // 3. Vầng sáng mây vàng và lớp sương mờ ở giữa mờ dần
      scrollyTimeline.to(['.stage-cloud-glow', '.cloud-dream-blur'], {
        autoAlpha: 0,
        ease: 'power1.out',
        duration: 0.4
      }, 0);

      // ----------------------------------------------------------------------
      // BƯỚC 2: CÁC PHẦN CÒN LẠI MỜ DẦN THEO CUỘN
      // ----------------------------------------------------------------------

      // Mặt trăng rằm phóng nhẹ và mờ dần vào vũ trụ
      const moonEl = document.getElementById('moonElement');
      if (moonEl) {
        scrollyTimeline.to(moonEl, {
          scale: 1.15,
          yPercent: -20,
          autoAlpha: 0,
          ease: 'power1.out',
          duration: 0.5
        }, 0.05);
      }

      // Tiêu đề, Logo, Thư mời và dải ruy băng trôi lên nhẹ rồi mờ dần
      scrollyTimeline.to(['.layer-logo', '.layer-brand-title', '.layer-thu-moi'], {
        yPercent: -25,
        autoAlpha: 0,
        ease: 'power1.out',
        duration: 0.45
      }, 0.05);

      const titleDemHoi = document.getElementById('titleDemHoi');
      if (titleDemHoi) {
        scrollyTimeline.to(titleDemHoi, {
          xPercent: -50,
          yPercent: -35,
          autoAlpha: 0,
          ease: 'power1.out',
          duration: 0.45
        }, 0.05);
      }

      scrollyTimeline.to('.layer-ribbon-tagline', {
        xPercent: -50,
        yPercent: -25,
        autoAlpha: 0,
        ease: 'power1.out',
        duration: 0.45
      }, 0.05);

      // Cung đường ngân hà trôi lùi xuống và mờ dần
      scrollyTimeline.to('.layer-cung-duong', {
        yPercent: 20,
        autoAlpha: 0,
        ease: 'power1.out',
        duration: 0.45
      }, 0.05);

      // Thiệp mời trung tâm thu nhỏ nhẹ và mờ dần
      if (invitationCard) {
        scrollyTimeline.to(invitationCard, {
          xPercent: -50,
          scale: 0.88,
          yPercent: -15,
          autoAlpha: 0,
          ease: 'power1.out',
          duration: 0.48
        }, 0.06);
      }

      // Bánh trung thu & Thỏ ngọc trôi xuống và mờ dần
      scrollyTimeline.to(['.cake-1', '.cake-2', '.cake-3'], {
        yPercent: 30,
        autoAlpha: 0,
        ease: 'power1.out',
        duration: 0.45
      }, 0.06);

      if (thoNgoc) {
        scrollyTimeline.to(thoNgoc, {
          yPercent: 25,
          autoAlpha: 0,
          ease: 'power1.out',
          duration: 0.45
        }, 0.06);
      }

      // Khung hình 3D, tia laser, sao lấp lánh mờ dần
      scrollyTimeline.to(['.layer-khung-dai', '.layer-khung-giua', '.layer-anh-sang', '.star-sparkle'], {
        autoAlpha: 0,
        ease: 'power1.out',
        duration: 0.4
      }, 0.05);

      // Chân viền & Thanh Hotline trôi xuống và mờ dần
      scrollyTimeline.to(['.layer-frame-strip', '.layer-dia-chi'], {
        yPercent: 30,
        autoAlpha: 0,
        ease: 'power1.out',
        duration: 0.4
      }, 0.05);

      // Nền vũ trụ dịu dần hòa vào màu nền section form
      scrollyTimeline.to('.layer-nen', {
        opacity: 0.2,
        ease: 'power1.out',
        duration: 0.55
      }, 0.08);

      // ----------------------------------------------------------------------
      // BƯỚC 3: "RỒI" SECTION FORM ĐƯỢC ĐẨY LÊN THEO CUỘN (0.28 -> 1.00)
      // ----------------------------------------------------------------------
      const registerHeader = sectionRegister.querySelector('.section-header');
      const formWrapperCard = sectionRegister.querySelector('.form-wrapper');
      const quickActions = sectionRegister.querySelector('.form-quick-actions');

      // Toàn bộ section form được đẩy từ dưới trồi lên che phủ sân khấu
      scrollyTimeline.fromTo(sectionRegister,
        {
          y: () => window.innerHeight * (isMobile ? 0.45 : 0.5)
        },
        {
          y: 0,
          ease: 'power1.inOut',
          duration: 0.72
        },
        0.28
      );

      // Tiêu đề của form xuất hiện trang trọng
      if (registerHeader) {
        scrollyTimeline.fromTo(registerHeader,
          { y: 45, autoAlpha: 0.1 },
          { y: 0, autoAlpha: 1, ease: 'power2.out', duration: 0.55 },
          0.42
        );
      }

      // Khung thẻ đăng ký Frosted Glass trượt lên vững chãi
      if (formWrapperCard) {
        scrollyTimeline.fromTo(formWrapperCard,
          { y: isMobile ? 60 : 80, scale: 0.95, autoAlpha: 0.2 },
          { y: 0, scale: 1, autoAlpha: 1, ease: 'power2.out', duration: 0.55 },
          0.48
        );
      }

      // Nút Google Maps & Fanpage trượt nhẹ vào vị trí
      if (quickActions) {
        scrollyTimeline.fromTo(quickActions,
          { y: 30, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, ease: 'power2.out', duration: 0.45 },
          0.62
        );
      }
    });

    // Refresh lại ScrollTrigger khi ảnh tải xong
    window.addEventListener('load', () => {
      ScrollTrigger.refresh();
    });
  }

  console.log('🌕 Đêm Hội Trăng Rằm - Yamaha Town Nam Tiến loaded smoothly!');
})();
