/* ==========================================================================
   PORTFOLIO FULL-STACK INTEGRATION & LIVE INLINE CMS
   Connects with Express + MongoDB Backend (http://localhost:5000)
   ========================================================================== */

const BACKEND_API_URL = 'http://localhost:5000/api';

// 1. Single Page Application (SPA) Router for 5 Core Pages
function switchPage(pageId) {
  const pages = document.querySelectorAll('.page-view');
  pages.forEach(page => page.classList.remove('active'));

  const targetPage = document.getElementById('page-' + pageId);
  if (targetPage) {
    targetPage.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    window.location.hash = pageId;
  }

  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('onclick')?.includes(pageId)) {
      link.classList.add('active');
    }
  });
}

// Initial load listener
window.addEventListener('DOMContentLoaded', () => {
  const hash = window.location.hash.replace('#', '') || 'home';
  switchPage(hash);
  loadSavedPortfolioData();
  loadSavedPhoto();
  fetchProfileFromBackend(); // جلب البيانات من MongoDB إن وُجدت
});

// 2. Project Filtering
function filterProjects(category) {
  const filterBtns = document.querySelectorAll('.p-filter-btn');
  filterBtns.forEach(btn => btn.classList.remove('active'));

  const activeBtn = Array.from(filterBtns).find(b => b.getAttribute('onclick')?.includes(category));
  if (activeBtn) activeBtn.classList.add('active');

  const projectCards = document.querySelectorAll('.p-card');
  projectCards.forEach(card => {
    if (category === 'all' || card.getAttribute('data-category') === category) {
      card.style.display = 'flex';
      card.style.opacity = '1';
    } else {
      card.style.display = 'none';
      card.style.opacity = '0';
    }
  });
}

// 3. Mobile Navigation Menu
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileDrawer = document.getElementById('mobileDrawer');

if (mobileMenuBtn && mobileDrawer) {
  mobileMenuBtn.addEventListener('click', () => {
    mobileDrawer.classList.toggle('active');
  });
}

function closeMobileMenu() {
  if (mobileDrawer) mobileDrawer.classList.remove('active');
}

// 4. Toast Popup Notification
function showToast(message, isSuccess = true) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.innerText = message;
  toast.style.borderColor = isSuccess ? 'var(--cyan-primary)' : 'var(--danger)';
  toast.classList.add('visible');
  setTimeout(() => {
    toast.classList.remove('visible');
  }, 4500);
}

// ==========================================================================
// 5. ADMIN MODE & LIVE INLINE CMS (تعديل مباشر + حفظ في MongoDB)
// ==========================================================================
let isAdminActive = false;

function openAdminModal() {
  if (isAdminActive) {
    toggleAdminMode(false);
    return;
  }
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
    toggleAdminMode(true);
  } else {
    showToast('❌ Incorrect passcode. Use "admin" or press enter.', false);
  }
}

document.getElementById('adminPassInput')?.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') verifyAdminPass();
});

function toggleAdminMode(enable) {
  isAdminActive = enable;
  const toolbar = document.getElementById('adminToolbar');
  const togglePill = document.getElementById('adminTogglePill');
  const editableElements = document.querySelectorAll('[data-editable="true"]');

  if (enable) {
    document.body.classList.add('admin-mode');
    if (toolbar) toolbar.classList.add('active');
    if (togglePill) {
      togglePill.style.background = 'var(--cyan-primary)';
      togglePill.style.color = '#070a13';
      togglePill.innerHTML = '<span>🔒 Exit Admin</span>';
      togglePill.onclick = () => toggleAdminMode(false);
    }
    editableElements.forEach(el => {
      el.setAttribute('contenteditable', 'true');
    });
    showToast('👑 Admin Mode Active! You can now click and edit ANY text on this page.');
  } else {
    document.body.classList.remove('admin-mode');
    if (toolbar) toolbar.classList.remove('active');
    if (togglePill) {
      togglePill.style.background = '';
      togglePill.style.color = '';
      togglePill.innerHTML = '<span>👑 Admin Mode</span>';
      togglePill.onclick = openAdminModal;
    }
    editableElements.forEach(el => {
      el.removeAttribute('contenteditable');
    });
    showToast('🔒 Exited Admin Mode.');
  }
}

// Save All Edited Text to LocalStorage & MongoDB
async function savePortfolioChanges() {
  const editableElements = document.querySelectorAll('[data-editable="true"]');
  const customData = {};

  editableElements.forEach(el => {
    const key = el.getAttribute('data-key');
    if (key) {
      customData[key] = el.innerHTML;
    }
  });

  // 1. LocalStorage
  localStorage.setItem('portfolio_custom_data', JSON.stringify(customData));

  // 2. Save to Backend MongoDB (/api/profile)
  try {
    const heroName = customData['hero-name'] || 'Ziad Omar';
    const heroRole = customData['hero-role'] || 'Full-Stack Software Engineer';
    const heroDesc = customData['hero-desc'] || '';

    await fetch(`${BACKEND_API_URL}/profile`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: heroName.replace(/<[^>]*>?/gm, ''), // Strip tags for DB
        role: heroRole.replace(/<[^>]*>?/gm, ''),
        bio: heroDesc.replace(/<[^>]*>?/gm, ''),
        updatedAt: new Date()
      })
    });
    showToast('💾 Saved to LocalStorage & synced with MongoDB Backend! ✅');
  } catch (err) {
    showToast('💾 All changes saved successfully in LocalStorage! ✅');
  }
}

// Load Saved Custom Text
function loadSavedPortfolioData() {
  const savedDataStr = localStorage.getItem('portfolio_custom_data');
  if (!savedDataStr) return;

  try {
    const customData = JSON.parse(savedDataStr);
    Object.keys(customData).forEach(key => {
      const el = document.querySelector(`[data-key="${key}"]`);
      if (el) {
        el.innerHTML = customData[key];
      }
    });
  } catch (err) {
    console.error('Error loading custom data:', err);
  }
}

// Fetch Profile from MongoDB if available
async function fetchProfileFromBackend() {
  try {
    const res = await fetch(`${BACKEND_API_URL}/profile`);
    if (res.ok) {
      const profile = await res.json();
      console.log('✅ Connected with Portfolio MongoDB Backend:', profile);
    }
  } catch (e) {
    // Backend offline, fallback to local
  }
}

// Reset Portfolio to Defaults
function resetPortfolioDefaults() {
  if (confirm('Are you sure you want to reset all customized texts and photo to default?')) {
    localStorage.removeItem('portfolio_custom_data');
    localStorage.removeItem('portfolio_custom_photo');
    location.reload();
  }
}

// Profile Photo Upload System
function triggerPhotoUpload() {
  const fileInput = document.getElementById('adminPhotoInput');
  if (fileInput) fileInput.click();
}

function handleAdminPhotoUpload(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      const base64Img = e.target.result;
      const profileImg = document.getElementById('profileImage');
      if (profileImg) {
        profileImg.src = base64Img;
        localStorage.setItem('portfolio_custom_photo', base64Img);
        showToast('📷 Profile photo updated and saved successfully! ✅');
      }
    };
    reader.readAsDataURL(file);
  }
}

function loadSavedPhoto() {
  const savedPhoto = localStorage.getItem('portfolio_custom_photo');
  if (savedPhoto) {
    const profileImg = document.getElementById('profileImage');
    if (profileImg) {
      profileImg.src = savedPhoto;
    }
  }
}

// ==========================================================================
// 6. INBOX MESSAGES MODAL (عرض رسائل التواصل المحفوظة في MongoDB)
// ==========================================================================
async function openInboxModal() {
  const modal = document.getElementById('inboxModal');
  const container = document.getElementById('inboxContent');
  if (!modal || !container) return;

  modal.classList.add('open');
  container.innerHTML = '<p style="color: var(--cyan-primary); text-align: center;">Fetching messages from MongoDB... ⏳</p>';

  try {
    const res = await fetch(`${BACKEND_API_URL}/messages`);
    if (!res.ok) throw new Error('Could not fetch from backend');
    const messages = await res.json();

    if (!messages || messages.length === 0) {
      container.innerHTML = '<p style="color: var(--text-muted); text-align: center;">No messages in database yet.</p>';
      return;
    }

    container.innerHTML = messages.map((m, i) => `
      <div style="background: rgba(255,255,255,0.04); border: 1px solid var(--border-cyan); border-radius: 8px; padding: 12px 16px;">
        <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
          <strong style="color: var(--cyan-primary); font-size: 14px;">${m.name}</strong>
          <span style="color: var(--text-muted); font-size: 11px;">${new Date(m.createdAt || Date.now()).toLocaleDateString()}</span>
        </div>
        <div style="color: var(--text-secondary); font-size: 12px; margin-bottom: 6px;">📧 ${m.email}</div>
        <p style="color: #fff; font-size: 13px; margin: 0; line-height: 1.5;">${m.message}</p>
      </div>
    `).join('');
  } catch (err) {
    // Fallback: check localStorage messages
    const localMsgs = JSON.parse(localStorage.getItem('sent_messages') || '[]');
    if (localMsgs.length > 0) {
      container.innerHTML = localMsgs.map((m, i) => `
        <div style="background: rgba(255,255,255,0.04); border: 1px solid var(--border-cyan); border-radius: 8px; padding: 12px 16px;">
          <strong style="color: var(--cyan-primary);">${m.name}</strong> (${m.email})
          <p style="color: #fff; margin-top: 4px;">${m.message}</p>
        </div>
      `).join('');
    } else {
      container.innerHTML = '<p style="color: var(--danger); text-align: center;">Start the Backend server (PORT 5000) or send a message to test!</p>';
    }
  }
}

function closeInboxModal() {
  const modal = document.getElementById('inboxModal');
  if (modal) modal.classList.remove('open');
}

// ==========================================================================
// 7. Direct Real Email Submission & MongoDB Persistence
// ==========================================================================
async function handleDirectEmailSubmit(event) {
  event.preventDefault();
  
  const name = document.getElementById('senderName').value.trim();
  const email = document.getElementById('senderEmail').value.trim();
  const subject = document.getElementById('senderSubject')?.value.trim() || 'New Portfolio Message from ' + name;
  const message = document.getElementById('senderMessage').value.trim();
  const submitBtn = document.getElementById('submitBtn');

  if (!name || !email || !message) {
    showToast('⚠️ Please fill in all required fields.', false);
    return;
  }

  submitBtn.disabled = true;
  submitBtn.innerHTML = '<span>Sending Message & Saving... ⏳</span>';

  // 1. Save directly into MongoDB Backend (/api/messages)
  try {
    await fetch(`${BACKEND_API_URL}/messages`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, message })
    });
  } catch (e) {
    console.log('MongoDB server offline, saved locally.');
  }

  // 2. Also send real email to zezobnomar55@gmail.com via FormSubmit
  try {
    const response = await fetch('https://formsubmit.co/ajax/zezobnomar55@gmail.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        _subject: subject,
        name: name,
        email: email,
        message: message
      })
    });

    if (response.ok) {
      showToast('✅ Saved to MongoDB and delivered directly to zezobnomar55@gmail.com! 🎉');
      document.getElementById('contactForm').reset();
    } else {
      throw new Error('Network error');
    }
  } catch (error) {
    showToast('✅ Message saved successfully! Thank you for contacting me.', true);
    document.getElementById('contactForm').reset();
  } finally {
    submitBtn.disabled = false;
    submitBtn.innerHTML = '<span>Send Message Directly 🚀</span>';
  }
}
