// Hub Engine v4 — Core App Logic
// Owner: John Lanter — AffiliateMediaHub Studio

'use strict';

// ── STATE ──
const App = {
  currentPage: 'dashboard',
  groqKey: '',
  sidebarOpen: false,

  init() {
    this.groqKey = localStorage.getItem('hev4_groq') || '';
    this.loadPage('dashboard');
    this.bindNav();
    this.bindSidebar();
    this.updateTopbar('Dashboard');
    Dashboard.init();
  },

  loadPage(id) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    // Show target
    const target = document.getElementById('page-' + id);
    if (target) target.classList.add('active');
    // Update nav
    document.querySelectorAll('.nav-item').forEach(n => {
      n.classList.toggle('active', n.dataset.page === id);
    });
    this.currentPage = id;
    // Close sidebar on mobile
    if (window.innerWidth <= 768) this.closeSidebar();
  },

  bindNav() {
    document.querySelectorAll('.nav-item[data-page]').forEach(item => {
      item.addEventListener('click', () => {
        const page = item.dataset.page;
        const label = item.querySelector('.nav-label')?.textContent || page;
        this.loadPage(page);
        this.updateTopbar(label);
      });
    });
  },

  updateTopbar(label) {
    const el = document.getElementById('topbar-page');
    if (el) el.textContent = label;
  },

  bindSidebar() {
    const menuBtn = document.getElementById('menuBtn');
    const overlay = document.getElementById('sidebarOverlay');
    if (menuBtn) menuBtn.addEventListener('click', () => this.toggleSidebar());
    if (overlay) overlay.addEventListener('click', () => this.closeSidebar());
  },

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
    document.getElementById('sidebar').classList.toggle('open', this.sidebarOpen);
    document.getElementById('sidebarOverlay').classList.toggle('show', this.sidebarOpen);
  },

  closeSidebar() {
    this.sidebarOpen = false;
    document.getElementById('sidebar').classList.remove('open');
    document.getElementById('sidebarOverlay').classList.remove('show');
  }
};

// ── DASHBOARD ──
const Dashboard = {
  init() {
    this.setGreeting();
    this.setTodayShow();
    this.setScheduleBar();
  },

  setGreeting() {
    const hour = new Date().getHours();
    let greeting = 'Good morning';
    if (hour >= 12 && hour < 17) greeting = 'Good afternoon';
    else if (hour >= 17) greeting = 'Good evening';
    const el = document.getElementById('dash-greeting');
    if (el) el.textContent = `${greeting}, John! 👋`;
    const dateEl = document.getElementById('dash-date');
    if (dateEl) {
      dateEl.textContent = new Date().toLocaleDateString('en-US', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
      });
    }
  },

  setTodayShow() {
    const days = ['sunday','monday','tuesday','wednesday','thursday','friday','saturday'];
    const today = days[new Date().getDay()];
    const showInfo = SCHEDULE[today];
    const el = document.getElementById('today-show');
    if (!el) return;
    if (showInfo) {
      const team = HUB_TEAM[showInfo.show];
      el.innerHTML = `
        <span class="dot" style="background:${team.color};"></span>
        <strong>Today:</strong> ${showInfo.label} &nbsp;·&nbsp; ${team.days}
      `;
      el.style.background = `${team.color}15`;
      el.style.border = `1px solid ${team.color}30`;
      el.style.color = team.color;
    } else {
      el.innerHTML = `<span class="dot dot-teal"></span> No show scheduled today`;
    }
  },

  setScheduleBar() {
    const days = ['Mon','Tue','Wed','Thu','Fri','Sat'];
    const fullDays = ['monday','tuesday','wednesday','thursday','friday','saturday'];
    const today = new Date().getDay(); // 0=Sun
    const el = document.getElementById('schedule-bar');
    if (!el) return;
    el.innerHTML = days.map((d, i) => {
      const show = SCHEDULE[fullDays[i]];
      if (!show) return '';
      const team = HUB_TEAM[show.show];
      const isToday = (i + 1) === today; // Mon=1
      return `<div class="schedule-item ${isToday ? 'today' : ''}"
        style="border-color:${team.color}40;color:${team.color};background:${team.color}10;">
        ${d} — ${team.host.name}+${team.guest.name}
      </div>`;
    }).join('');
  }
};

// ── GROQ API ──
const Groq = {
  async chat(prompt, system) {
    const key = localStorage.getItem('hev4_groq') || '';
    if (!key) { Toast.show('Enter Groq API key in Settings'); return null; }
    const clean = key.replace(/[^\x20-\x7E]/g, '').trim();
    try {
      const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${clean}` },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: [
            { role: 'system', content: system || 'You are Becky, AI Assistant and Creative Director for Hub Engine v4. You are warm, honest, direct, and genuinely helpful. Greet John by name.' },
            { role: 'user', content: prompt }
          ],
          max_tokens: 1000,
          temperature: 0.8
        })
      });
      const data = await res.json();
      if (data.error) { Toast.show('Groq error: ' + data.error.message); return null; }
      return data.choices[0].message.content.trim();
    } catch (e) {
      Toast.show('Connection error — check your key');
      return null;
    }
  }
};

// ── TOAST ──
const Toast = {
  show(msg, duration = 2500) {
    const t = document.getElementById('toast');
    if (!t) return;
    t.textContent = msg;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), duration);
  }
};

// ── SETTINGS ──
const Settings = {
  saveGroqKey() {
    const val = document.getElementById('groq-key-input')?.value?.trim();
    if (!val) { Toast.show('Please enter a key'); return; }
    localStorage.setItem('hev4_groq', val);
    App.groqKey = val;
    Toast.show('✅ Groq API key saved!');
  },

  clearAll() {
    if (!confirm('Clear all saved data? This cannot be undone.')) return;
    localStorage.clear();
    Toast.show('All data cleared');
  }
};

// ── START APP ──
document.addEventListener('DOMContentLoaded', () => App.init());
