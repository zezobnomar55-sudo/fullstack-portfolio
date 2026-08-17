/* ==========================================================================
   ZIAD OMAR — LUXURY EDITORIAL JAVASCRIPT & BACKEND INTEGRATION
   ========================================================================== */

const BACKEND_API_URL = 'http://localhost:5000/api';

// ==========================================================================
// 1. CUSTOM INTERACTIVE MOUSE CURSOR
// ==========================================================================
const cursorDot = document.getElementById('customCursor');
const cursorFollower = document.getElementById('cursorFollower');

if (cursorDot && cursorFollower) {
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let followerX = mouseX;
  let followerY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorDot.style.left = `${mouseX}px`;
    cursorDot.style.top = `${mouseY}px`;
  });

  // Smooth lerp follower animation
  function animateCursor() {
    followerX += (mouseX - followerX) * 0.15;
    followerY += (mouseY - followerY) * 0.15;
    cursorFollower.style.left = `${followerX}px`;
    cursorFollower.style.top = `${followerY}px`;
    requestAnimationFrame(animateCursor);
  }
  requestAnimationFrame(animateCursor);

  // Hover states on interactive items
  const interactives = document.querySelectorAll('a, button, input, textarea, .project-card-editorial, .service-card');
  interactives.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursorDot.classList.add('hover-active');
      cursorFollower.style.borderColor = 'rgba(0, 210, 255, 0.6)';
      cursorFollower.style.transform = 'translate(-50%, -50%) scale(1.4)';
    });
    el.addEventListener('mouseleave', () => {
      cursorDot.classList.remove('hover-active');
      cursorFollower.style.borderColor = 'rgba(255, 255, 255, 0.25)';
      cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
    });
  });
}

// ==========================================================================
// 2. BOTTOM STICKY CHAPTER NAV & ACTIVE SECTION TRACKING
// ==========================================================================
const sections = document.querySelectorAll('section');
const chapterBtns = document.querySelectorAll('.chapter-btn');
const navLinks = document.querySelectorAll('.nav-item-link');
const siteNav = document.getElementById('siteNav');

window.addEventListener('scroll', () => {
  // Sticky nav appearance
  if (window.scrollY > 40) {
    siteNav?.classList.add('scrolled');
  } else {
    siteNav?.classList.remove('scrolled');
  }

  // Determine current active section
  let currentSectionId = '';
  const scrollPosition = window.scrollY + 200;

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      currentSectionId = section.getAttribute('id');
    }
  });

  if (currentSectionId) {
    // Update Chapter Buttons
    chapterBtns.forEach(btn => {
      if (btn.getAttribute('data-target') === currentSectionId) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // Update Top Nav
    navLinks.forEach(link => {
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.style.color = 'var(--c-soft-concrete)';
      } else {
        link.style.color = '';
      }
    });
  }
});

// Smooth Scroll on Chapter Click
chapterBtns.forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = btn.getAttribute('data-target');
    const targetEl = document.getElementById(targetId);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ==========================================================================
// 3. TOAST NOTIFICATIONS
// ==========================================================================
function showToast(message, isSuccess = true) {
  const toast = document.getElementById('toastNotice');
  if (!toast) return;
  toast.innerText = message;
  toast.style.borderColor = isSuccess ? 'var(--c-accent-cyan)' : 'var(--c-accent-crimson)';
  toast.classList.add('visible');
  setTimeout(() => {
    toast.classList.remove('visible');
  }, 4500);
}

// ==========================================================================
// 4. CONTACT FORM SUBMISSION -> EXPRESS + MONGODB BACKEND
// ==========================================================================
async function handleContactSubmit(event) {
  event.preventDefault();

  const nameInput = document.getElementById('senderName');
  const emailInput = document.getElementById('senderEmail');
  const msgInput = document.getElementById('senderMessage');
  const submitBtnMain = document.getElementById('submitBtnMainText');
  const submitBtnHover = document.getElementById('submitBtnHoverText');

  const payload = {
    name: nameInput?.value.trim() || '',
    email: emailInput?.value.trim() || '',
    message: msgInput?.value.trim() || '',
    date: new Date().toISOString()
  };

  if (submitBtnMain) submitBtnMain.innerText = 'Transmitting... ⏳';
  if (submitBtnHover) submitBtnHover.innerText = 'Transmitting... ⏳';

  try {
    const response = await fetch(`${BACKEND_API_URL}/messages`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      showToast('✦ Message transmitted & saved into MongoDB! Thank you, Ziad will be in touch.');
      document.getElementById('contactForm')?.reset();
    } else {
      throw new Error('Backend response was not ok');
    }
  } catch (error) {
    // Fallback gracefully to LocalStorage if offline
    console.warn('Backend offline or unreachable, storing locally:', error);
    const existing = JSON.parse(localStorage.getItem('ziad_portfolio_messages') || '[]');
    existing.push(payload);
    localStorage.setItem('ziad_portfolio_messages', JSON.stringify(existing));
    showToast('✦ Message saved locally (Backend offline). Thank you!');
    document.getElementById('contactForm')?.reset();
  } finally {
    if (submitBtnMain) submitBtnMain.innerText = 'Transmit Message ↗';
    if (submitBtnHover) submitBtnHover.innerText = 'Transmit Message ↗';
  }
}

// ==========================================================================
// 5. ADMIN CMS & MONGODB INBOX MODAL
// ==========================================================================
function openAdminModal() {
  const modal = document.getElementById('adminModal');
  if (modal) {
    modal.classList.add('open');
    const input = document.getElementById('adminPassInput');
    if (input) {
      input.value = '';
      input.focus();
    }
  }
}

function closeAdminModal() {
  const modal = document.getElementById('adminModal');
  if (modal) modal.classList.remove('open');
}

function verifyAdminPass() {
  const pass = document.getElementById('adminPassInput')?.value.trim();
  if (pass === 'admin' || pass === '123456' || pass === '') {
    closeAdminModal();
    openInboxModal();
    showToast('👑 Admin CMS Authenticated. Welcome back, Ziad!');
  } else {
    showToast('❌ Incorrect passcode. Use "admin" or press enter.', false);
  }
}

document.getElementById('adminPassInput')?.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') verifyAdminPass();
});

async function openInboxModal() {
  const modal = document.getElementById('inboxModal');
  if (modal) modal.classList.add('open');

  const container = document.getElementById('inboxListContent');
  if (!container) return;
  container.innerHTML = '<p style="color: var(--c-text-muted); text-align: center;">Fetching submissions from MongoDB...</p>';

  try {
    const response = await fetch(`${BACKEND_API_URL}/messages`);
    if (response.ok) {
      const messages = await response.json();
      renderInboxItems(messages, container);
    } else {
      throw new Error('API offline');
    }
  } catch (err) {
    // Read local fallback
    const local = JSON.parse(localStorage.getItem('ziad_portfolio_messages') || '[]');
    renderInboxItems(local, container);
  }
}

function closeInboxModal() {
  const modal = document.getElementById('inboxModal');
  if (modal) modal.classList.remove('open');
}

function renderInboxItems(messages, container) {
  if (!messages || messages.length === 0) {
    container.innerHTML = '<p style="color: var(--c-text-muted); text-align: center; padding: 20px;">No messages received yet.</p>';
    return;
  }

  container.innerHTML = messages.map(msg => `
    <div style="background: rgba(255,255,255,0.03); border: 1px solid var(--c-obsidian-border); border-radius: 10px; padding: 16px;">
      <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
        <div>
          <strong style="color: var(--c-soft-concrete); font-size: 0.95rem;">${msg.name || 'Anonymous'}</strong>
          <span style="color: var(--c-accent-cyan); font-family: var(--font-mono); font-size: 0.8rem; margin-left: 8px;">&lt;${msg.email}&gt;</span>
        </div>
        <span style="color: var(--c-text-subtle); font-family: var(--font-mono); font-size: 0.72rem;">${new Date(msg.createdAt || msg.date || Date.now()).toLocaleDateString()}</span>
      </div>
      <p style="color: var(--c-text-muted); font-size: 0.88rem; line-height: 1.5; margin: 0;">${msg.message}</p>
    </div>
  `).join('');
}
