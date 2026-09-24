(function () {
  'use strict';
  if (new URLSearchParams(window.location.search).has('settled')) {
    document.body.classList.add('skip-animations');
  }

  const GOOGLE_SHEET_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwb3cQ5Bes9YR9Nlg4Cm5xHAO8xen8qOkTgt58xzsWs5U7-PinfgPaXzijcUyV4hfP9AA/exec';

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

  const btnOpenFanpageModal = document.getElementById('btnOpenFanpageModal');
  const fanpageModal = document.getElementById('fanpageModal');
  const btnCloseFanpageModal = document.getElementById('btnCloseFanpageModal');
  const fanpageModalBackdrop = document.getElementById('fanpageModalBackdrop');

  const cake1 = document.getElementById('cake1');
  const cake2 = document.getElementById('cake2');
  const cake3 = document.getElementById('cake3');

  const cdDays = document.getElementById('cdDays');
  const cdHours = document.getElementById('cdHours');
  const cdMins = document.getElementById('cdMins');
  const cdSecs = document.getElementById('cdSecs');

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

  let toastTimeout = null;

  function showToast(title, message, icon = '🥮') {
    if (!giftToast) return;
    const iconEl = giftToast.querySelector('.gift-toast-icon');
    if (iconEl) iconEl.textContent = icon;
    if (toastTitle) toastTitle.textContent = title;
    if (toastDesc) toastDesc.textContent = message;

    giftToast.classList.add('active');
    playTone(523.25, 0.15, 'triangle');

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
        playTone(659.25, 0.2, 'sine');
        setTimeout(() => {
          rabbitDialogue.classList.remove('show-bubble');
        }, 3500);
      }
    });
  }

  if (btnToggleChars) {
    let charsVisible = true;
    btnToggleChars.addEventListener('click', () => {
      charsVisible = !charsVisible;
      if (charChiHang) charChiHang.style.display = charsVisible ? 'block' : 'none';
      if (charChuCuoi) charChuCuoi.style.display = charsVisible ? 'block' : 'none';
      btnToggleChars.style.opacity = charsVisible ? '1' : '0.6';
    });
  }

  function scrollToRegister() {
    const isMobile = window.innerWidth <= 768;
    const targetScroll = isMobile ? 780 : 1000;

    if (window.lenisInstance) {
      window.lenisInstance.scrollTo(targetScroll, {
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
      });
    } else {
      window.scrollTo({
        top: targetScroll,
        behavior: 'smooth'
      });
    }

    setTimeout(() => {
      const inp = document.getElementById('txtName');
      if (inp) inp.focus();
    }, 900);
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

  const scrollHint = document.getElementById('scrollHint');
  if (scrollHint) {
    scrollHint.addEventListener('click', (e) => {
      e.preventDefault();
      scrollToRegister();
    });
    scrollHint.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        scrollToRegister();
      }
    });
  }

  if (giftToast) {
    giftToast.style.cursor = 'pointer';
    giftToast.addEventListener('click', scrollToRegister);
  }

  const fanpageModalCard = fanpageModal ? fanpageModal.querySelector('.fanpage-modal-card') : null;

  function openFanpageModal() {
    if (!fanpageModal) return;
    fanpageModal.removeAttribute('hidden');
    fanpageModal.classList.add('is-active');

    playTone(659.25, 0.12, 'sine');

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

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && fanpageModal && fanpageModal.classList.contains('is-active')) {
      closeFanpageModal();
    }
  });

  if (new URLSearchParams(window.location.search).has('modal') || window.location.hash === '#fanpage') {
    setTimeout(openFanpageModal, 350);
  }

  const inputNameEl = document.getElementById('txtName');
  const inputPhoneEl = document.getElementById('txtPhone');
  [inputNameEl, inputPhoneEl].forEach(function (inp) {
    if (!inp) return;
    inp.addEventListener('touchend', function () {
      if (document.activeElement !== inp) {
        inp.focus();
      }
    }, { passive: true });
  });

  window.submitForm = async function () {
    const nameInput = document.getElementById('txtName');
    const phoneInput = document.getElementById('txtPhone');
    const name = nameInput ? nameInput.value.trim() : '';
    const phone = phoneInput ? phoneInput.value.trim() : '';

    if (!name || !phone) return;

    const cleanPhone = phone.replace(/[\s.-]/g, '');
    if (!/^[0-9]{10,11}$/.test(cleanPhone)) {
      alert('Vui lòng nhập đúng định dạng số điện thoại (10 hoặc 11 chữ số)');
      if (phoneInput) phoneInput.focus();
      return;
    }

    if (nameInput) nameInput.blur();
    if (phoneInput) phoneInput.blur();
    if (document.activeElement && (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA')) {
      document.activeElement.blur();
    }

    const submitBtn = registerForm ? registerForm.querySelector('button[type="submit"]') : null;
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span>⏳ Đang gửi thông tin đăng ký...</span>';
    }

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
      if (window.lenisInstance) {
        window.lenisInstance.scrollTo(successBox, { offset: -60, duration: 1.2 });
      } else {
        successBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }

    triggerConfetti();
    playTone(880, 0.3, 'sine');
    setTimeout(() => playTone(1046.5, 0.4, 'sine'), 150);
  };

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

    }
  }

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
        p.vy += 0.35;
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

  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    ScrollTrigger.config({
      ignoreMobileResize: true,
      autoRefreshEvents: 'visibilitychange,DOMContentLoaded,load,resize'
    });

    const heroCurtainWrapper = document.getElementById('heroCurtainWrapper');
    const doorBgLeft = document.getElementById('doorBgLeft');
    const doorBgRight = document.getElementById('doorBgRight');
    const doorLeftGroup = document.getElementById('doorLeftGroup');
    const doorRightGroup = document.getElementById('doorRightGroup');
    const doorCenterGroup = document.getElementById('doorCenterGroup');
    const sectionRegister = document.getElementById('sectionRegister');

    if (!heroCurtainWrapper || !sectionRegister) return;

    const isMobile = window.innerWidth <= 768;

    let lenis = null;
    if (typeof Lenis !== 'undefined') {
      lenis = new Lenis({
        duration: 1.25,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 1.0,
        touchMultiplier: 1.2
      });
      window.lenisInstance = lenis;

      lenis.on('scroll', ScrollTrigger.update);

      gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
      });

      gsap.ticker.lagSmoothing(0);
    }

    let entranceTimeline = null;

    function initEntranceAnimation() {
      if (document.body.classList.contains('skip-animations')) return;

      entranceTimeline = gsap.timeline({
        defaults: { ease: 'power2.out' }
      });

      entranceTimeline.fromTo(['.door-inner-bg', '.star-sparkle'],
        { opacity: 0 },
        { opacity: 1, duration: 0.65, stagger: 0.07 },
        0
      );

      const moonEl = document.getElementById('moonElement');
      if (moonEl) {
        entranceTimeline.fromTo(moonEl,
          { x: 25, y: -20, scale: 0.82, opacity: 0 },
          { x: 0, y: 0, scale: 1, opacity: 1, duration: 0.85, ease: 'back.out(1.2)' },
          0.18
        );
      }

      entranceTimeline.fromTo(['.layer-logo', '.layer-brand-title'],
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.65, stagger: 0.08 },
        0.35
      );

      entranceTimeline.fromTo('.layer-thu-moi',
        { y: -15, opacity: 0, rotate: -2.5 },
        { y: 0, opacity: 1, rotate: 0, duration: 0.65, ease: 'back.out(1.2)' },
        0.5
      );

      entranceTimeline.fromTo('#titleDemHoi',
        { y: 22, scale: 0.85, opacity: 0 },
        { y: 0, scale: 1, opacity: 1, duration: 0.75, ease: 'back.out(1.3)' },
        0.6
      );

      entranceTimeline.fromTo('.layer-ribbon-tagline',
        { y: 15, scaleX: 0.85, opacity: 0 },
        { y: 0, scaleX: 1, opacity: 1, duration: 0.65 },
        0.75
      );

      entranceTimeline.fromTo(['.layer-cung-duong', '.layer-frame-strip'],
        { y: 25, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.07 },
        0.88
      );

      const invitationCard = document.getElementById('invitationCard');
      const scrollHintEl = document.getElementById('scrollHint');
      if (invitationCard) {
        entranceTimeline.fromTo(invitationCard,
          { y: 25, scale: 0.88, opacity: 0 },
          { y: 0, scale: 1, opacity: 1, duration: 0.75, ease: 'back.out(1.2)' },
          1.02
        );
      }
      if (scrollHintEl) {
        entranceTimeline.fromTo(scrollHintEl,
          { opacity: 0 },
          { opacity: 1, duration: 0.7, ease: 'power2.out' },
          1.25
        );
      }

      if (charChiHang) {
        entranceTimeline.fromTo(charChiHang,
          { x: -45, y: 15, scale: 0.92, opacity: 0 },
          { x: 0, y: 0, scale: 1, opacity: 1, duration: 0.8 },
          1.15
        );
      }
      if (charChuCuoi) {
        entranceTimeline.fromTo(charChuCuoi,
          { x: 45, y: 15, scale: 0.92, opacity: 0 },
          { x: 0, y: 0, scale: 1, opacity: 1, duration: 0.8 },
          1.22
        );
      }

      const cloudTargets = ['#stageCloudGlow', '#cloudLeft', '#cloudRight', '#cloudDreamBlur'];
      const cornerLeft = document.getElementById('cloudCornerLeft');
      const cornerRight = document.getElementById('cloudCornerRight');
      if (cornerLeft) cloudTargets.push('#cloudCornerLeft');
      if (cornerRight) cloudTargets.push('#cloudCornerRight');

      entranceTimeline.fromTo(cloudTargets,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.08 },
        1.35
      );

      entranceTimeline.fromTo(['#cake3', '#cake2', '#cake1'],
        { y: -18, scale: 0.72, opacity: 0 },
        { y: 0, scale: 1, opacity: 1, duration: 0.6, stagger: 0.08, ease: 'back.out(1.3)' },
        1.55
      );

      if (thoNgoc) {
        entranceTimeline.fromTo(thoNgoc,
          { y: 20, scale: 0.75, opacity: 0 },
          { y: 0, scale: 1, opacity: 1, duration: 0.7, ease: 'back.out(1.4)' },
          1.72
        );
      }
    }

    function fastForwardEntrance() {
      if (entranceTimeline && entranceTimeline.progress() < 1) {
        entranceTimeline.progress(1);
      }
    }

    function onUserScrollDown() {
      if (window.scrollY > 30) {
        fastForwardEntrance();
        window.removeEventListener('scroll', onUserScrollDown);
      }
    }
    window.addEventListener('scroll', onUserScrollDown, { passive: true });

    initEntranceAnimation();

    const curtainTl = gsap.timeline({
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: isMobile ? '+=750' : '+=950',
        pin: sectionRegister,
        pinSpacing: true,
        scrub: isMobile ? 0.6 : 0.8,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          if (self.progress > 0.03) fastForwardEntrance();
          if (self.progress > 0.02) {
            heroCurtainWrapper.classList.add('is-opening');
            if (heroDiaChi) heroDiaChi.classList.add('is-opening');
          } else {
            heroCurtainWrapper.classList.remove('is-opening');
            if (heroDiaChi) heroDiaChi.classList.remove('is-opening');
          }
          if (self.progress >= 0.5) {
            sectionRegister.style.zIndex = '200';
            heroCurtainWrapper.style.visibility = 'hidden';
            heroCurtainWrapper.style.pointerEvents = 'none';
          } else {
            sectionRegister.style.zIndex = '10';
            heroCurtainWrapper.style.visibility = 'visible';
            heroCurtainWrapper.style.pointerEvents = 'none';
          }
        }
      }
    });

    const heroDiaChi = document.getElementById('heroDiaChi');
    const scrollHintEl = document.getElementById('scrollHint');
    const centerElements = [doorCenterGroup, heroDiaChi, scrollHintEl].filter(Boolean);
    if (centerElements.length > 0) {
      curtainTl.to(centerElements, {
        autoAlpha: 0,
        y: -30,
        ease: 'power1.out',
        duration: 0.25
      }, 0);
    }

    const leftElements = [doorBgLeft, doorLeftGroup].filter(Boolean);
    if (leftElements.length > 0) {
      curtainTl.to(leftElements, {
        xPercent: -105,
        autoAlpha: 0,
        ease: 'power2.inOut',
        duration: 0.85
      }, 0);
    }

    const rightElements = [doorBgRight, doorRightGroup].filter(Boolean);
    if (rightElements.length > 0) {
      curtainTl.to(rightElements, {
        xPercent: 105,
        autoAlpha: 0,
        ease: 'power2.inOut',
        duration: 0.85
      }, 0);
    }

    const registerHeader = sectionRegister.querySelector('.section-header');
    const formWrapperCard = sectionRegister.querySelector('.form-wrapper');

    if (registerHeader) {
      curtainTl.fromTo(registerHeader,
        { autoAlpha: 0.3, y: isMobile ? 45 : 65 },
        { autoAlpha: 1, y: 0, ease: 'power2.out', duration: 0.45 },
        0.08
      );
    }

    if (formWrapperCard) {
      curtainTl.fromTo(formWrapperCard,
        { autoAlpha: 0.4, scale: 0.95, y: isMobile ? 70 : 100 },
        { autoAlpha: 1, scale: 1, y: 0, ease: 'power2.out', duration: 0.55 },
        0.12
      );
    }

    const urlParams = new URLSearchParams(window.location.search);
    const progressParam = urlParams.get('progress');
    if (progressParam) {
      if (curtainTl.scrollTrigger) curtainTl.scrollTrigger.kill();
      fastForwardEntrance();
      curtainTl.progress(parseFloat(progressParam));
    }
    const scrollParam = urlParams.get('scroll');
    if (scrollParam) {
      window.scrollTo(0, parseInt(scrollParam, 10));
      ScrollTrigger.update();
    }

    window.addEventListener('load', () => {
      ScrollTrigger.refresh();
      const scrollParam = new URLSearchParams(window.location.search).get('scroll');
      if (scrollParam) {
        window.scrollTo(0, parseInt(scrollParam, 10));
        ScrollTrigger.update();
      }
    });
    setTimeout(() => {
      ScrollTrigger.refresh();
      const scrollParam = new URLSearchParams(window.location.search).get('scroll');
      if (scrollParam) {
        window.scrollTo(0, parseInt(scrollParam, 10));
        ScrollTrigger.update();
      }
    }, 250);
  }

  document.addEventListener('focusout', function (e) {
    if (e.target && ['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) {
      setTimeout(function () {
        window.scrollTo(window.scrollX, window.scrollY);
      }, 60);
    }
  });

  console.log('🌕 Đêm Hội Trăng Rằm - Yamaha Town Nam Tiến loaded smoothly!');
})();
