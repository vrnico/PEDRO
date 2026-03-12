// ============================================================
// PERSONALITIES (see personalities.js)
// ============================================================

// ============================================================
// FAVORITE DAILIES DATA
// ============================================================
const DAILY_TASKS = [
  { emoji: '🛏️', label: 'Get out of bed',                  diff: 1 },
  { emoji: '💧', label: 'Drink a glass of water',           diff: 1 },
  { emoji: '🪟', label: 'Open a window',                    diff: 1 },
  { emoji: '💊', label: 'Take medication',                  diff: 1 },
  { emoji: '🦷', label: 'Brush teeth',                      diff: 2 },
  { emoji: '👕', label: 'Get dressed',                      diff: 2 },
  { emoji: '📱', label: 'Check messages',                   diff: 2 },
  { emoji: '🍳', label: 'Eat breakfast',                    diff: 2 },
  { emoji: '😊', label: 'Do one thing that makes me happy', diff: 2 },
  { emoji: '🧘', label: 'Stretch',                          diff: 2 },
  { emoji: '🚿', label: 'Shower',                           diff: 3 },
  { emoji: '🍽️', label: 'Do the dishes',                   diff: 3 },
  { emoji: '🚶', label: 'Walk',                             diff: 3 },
  { emoji: '🌟', label: 'Pick goals for tomorrow',          diff: 3 },
  { emoji: '🍲', label: 'Cook a meal',                      diff: 4 },
  { emoji: '🧺', label: 'Do a load of laundry',             diff: 4 },
  { emoji: '🧹', label: 'Tidy one space',                   diff: 4 },
  { emoji: '🛒', label: 'Grocery run',                      diff: 5 },
  { emoji: '💸', label: 'Pay a bill',                       diff: 5 },
  { emoji: '📞', label: 'Make an appointment',              diff: 5 },
];

const DIFF_LABELS = {
  1: { label: 'Very easy' },
  2: { label: 'Easy' },
  3: { label: 'Medium' },
  4: { label: 'Takes some effort' },
  5: { label: 'Big task' },
};

function diffDisplay(n) {
  return '🍉'.repeat(n);
}

// ============================================================
// STATE
// ============================================================
let state = {
  tasks: [],
  personality: null,
  personalityDate: null,
  completedTasksCount: 0,  // Track completed tasks for celebration timing
  dailies: {
    mood: 'all',
    done: [],
    customDiff: {},
    picks: [],
    customTasks: []
  },
  userProfile: null  // filled in by personality survey

};

function saveState() {
  try {
    localStorage.setItem('pedro-state', JSON.stringify(state));
  } catch(e) { /* quota exceeded or unavailable */ }
}

function loadState() {
  try {
    const saved = localStorage.getItem('pedro-state');
    if (saved) {
      const parsed = JSON.parse(saved);
      state.tasks = parsed.tasks || [];
      state.personality = parsed.personality || null;
      state.personalityDate = parsed.personalityDate || null;
      state.completedTasksCount = parsed.completedTasksCount || 0;
      const d = parsed.dailies || {};
      state.dailies = {
        mood:        d.mood        || 'all',
        done:        d.done        || [],
        customDiff:  d.customDiff  || {},
        picks:       d.picks       || [],
        customTasks: d.customTasks || []
      };
      state.userProfile = parsed.userProfile || null;
    }
  } catch(e) { /* corrupted or unavailable */ }
}

// ============================================================
// SETTINGS
// ============================================================
const DEFAULT_SETTINGS = {
  theme: 'dark-cyberpunk',
  celebrationsEnabled: true,
  celebrationTiming: 'smart',
  confettiEnabled: true,
  pedroEnabled: true,
  soundsEnabled: true,
  soundType: 'chime',
  volume: 70,
  apiKey: '',
  aiPersonality: true
};

function getSettings() {
  try {
    const saved = localStorage.getItem('pedro-settings');
    if (saved) {
      const parsed = JSON.parse(saved);
      // Merge with defaults to ensure all properties exist
      return { ...DEFAULT_SETTINGS, ...parsed };
    }
    return { ...DEFAULT_SETTINGS };
  } catch(e) {
    return { ...DEFAULT_SETTINGS };
  }
}

function saveSettings(settings) {
  try {
    localStorage.setItem('pedro-settings', JSON.stringify(settings));
  } catch(e) { /* quota exceeded or unavailable */ }
}

function updateSetting(key, value) {
  const settings = getSettings();
  settings[key] = value;
  saveSettings(settings);
  return settings;
}

// ============================================================
// THEME SYSTEM
// ============================================================
function setTheme(themeName) {
  document.body.setAttribute('data-theme', themeName);
  updateSetting('theme', themeName);
}

function initTheme() {
  const settings = getSettings();
  document.body.setAttribute('data-theme', settings.theme);
}

// ============================================================
// AI PERSONALITY MESSAGES
// ============================================================
async function getPersonalityMessage(type, taskText) {
  const settings = getSettings();
  const p = state.personality;
  if (!p || !settings.apiKey || !settings.aiPersonality) return null;

  const context = type === 'encourage'
    ? `The user just added a new task: "${taskText}". Give them encouragement to tackle it.`
    : `The user just completed a task: "${taskText}". Praise them for finishing it.`;

  const otherTasks = state.tasks
    .filter(t => type === 'encourage' ? !t.done : t.text !== taskText)
    .slice(0, 5)
    .map(t => `${t.done ? '✅' : '⬜'} ${t.text}`)
    .join('\n');

  const profileContext = state.userProfile
    ? `\n\nWhat you know about this person from your earlier conversation:\n${state.userProfile}`
    : '';

  const systemPrompt = `You are ${p.name} ${p.emoji}. Stay completely in character as ${p.name} — use their speech patterns, catchphrases, mannerisms, and worldview. You are acting as a motivational companion inside a task management app called Pedro (for people with executive dysfunction).

Respond with a single short message (1-2 sentences max, under 120 characters ideally). No quotes around your response. Be warm, funny, and authentic to the character. Reference the specific task when it makes sense.${profileContext}`;

  const userMsg = `${context}${otherTasks ? `\n\nTheir other tasks:\n${otherTasks}` : ''}`;

  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': settings.apiKey,
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true'
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 150,
        system: systemPrompt,
        messages: [{ role: 'user', content: userMsg }]
      })
    });

    if (!res.ok) return null;
    const data = await res.json();
    return data.content?.[0]?.text || null;
  } catch (e) {
    return null;
  }
}

async function showPersonalityMessage(type, taskText) {
  const p = state.personality;
  if (!p) return;

  // Show static message immediately
  const staticMsgs = type === 'encourage' ? p.encourage : p.praise;
  const staticMsg = staticMsgs[Math.floor(Math.random() * staticMsgs.length)];
  showToast(`${p.emoji} ${staticMsg}`);

  // Then try AI message — if it comes back, replace the toast with longer display
  const aiMsg = await getPersonalityMessage(type, taskText);
  if (aiMsg) {
    showToast(`${p.emoji} ${aiMsg}`, 6000);
  }
}

// ============================================================
// TASK MANAGEMENT
// ============================================================

/**
 * Determines if a celebration should be triggered based on celebration timing setting
 * Implements four timing modes: smart, every, random, milestones
 *
 * @returns {boolean} true if celebration should trigger, false otherwise
 */
function shouldCelebrate() {
  const settings = getSettings();

  // If celebrations are disabled, never celebrate
  if (!settings.celebrationsEnabled) return false;

  const timing = settings.celebrationTiming || 'smart';
  const totalTasks = state.tasks.filter(t => t.done).length;

  switch (timing) {
    case 'every':
      // Celebrate every task completion
      return true;

    case 'random':
      // 50% chance to celebrate
      return Math.random() < 0.5;

    case 'milestones':
      // Celebrate at milestones: 1, 5, 10, 25, 50, 100, etc.
      return totalTasks === 1 ||
             totalTasks === 5 ||
             totalTasks === 10 ||
             totalTasks === 25 ||
             totalTasks === 50 ||
             totalTasks === 100 ||
             totalTasks % 100 === 0;

    case 'smart':
    default:
      // Smart mode: first and last tasks always celebrate,
      // random celebrations in between
      const incompleteTasks = state.tasks.filter(t => !t.done).length;

      // First task completion - always celebrate
      if (totalTasks === 1) return true;

      // Last task completion - always celebrate
      if (incompleteTasks === 0 && totalTasks > 0) return true;

      // In between - random chance (30%)
      return Math.random() < 0.3;
  }
}

function addTask(text, photoDataUrl) {
  if (!text && !photoDataUrl) return;
  const task = {
    id: Date.now() + Math.random(),
    text: text || '(photo task)',
    done: false,
    createdAt: new Date().toISOString(),
    photo: photoDataUrl || null
  };
  state.tasks.unshift(task);
  saveState();
  renderTasks();

  showPersonalityMessage('encourage', text);
}

function toggleTask(id) {
  const task = state.tasks.find(t => t.id === id);
  if (!task) return;

  const wasCompleted = task.done;
  task.done = !task.done;

  // Update completed task count
  if (task.done && !wasCompleted) {
    state.completedTasksCount++;
  } else if (!task.done && wasCompleted) {
    state.completedTasksCount--;
  }

  saveState();
  renderTasks();

  // If task is being completed (not uncompleted)
  if (task.done && !wasCompleted) {
    // Show personality praise message
    showPersonalityMessage('praise', task.text);

    // Trigger celebration if conditions are met
    if (shouldCelebrate()) {
      celebrate();
    }
  }
}

function deleteTask(id) {
  state.tasks = state.tasks.filter(t => t.id !== id);
  saveState();
  renderTasks();
}

function renderTasks() {
  const list = document.getElementById('task-list');
  list.innerHTML = state.tasks.map(t => `
    <div class="task-item ${t.done ? 'done' : ''}" data-id="${t.id}">
      <button class="task-check" onclick="toggleTask(${t.id})">${t.done ? '✓' : ''}</button>
      <div class="task-content">
        <div class="task-text">${escapeHtml(t.text)}</div>
        ${t.photo ? `<img class="task-photo" src="${t.photo}" alt="Task photo">` : ''}
        <div class="task-time">${formatTime(t.createdAt)}</div>
      </div>
      <button class="task-delete" onclick="deleteTask(${t.id})">✕</button>
    </div>
  `).join('');
}

function addTaskFromInput() {
  const input = document.getElementById('task-text-input');
  const text = input.value.trim();
  if (!text && !pendingPhoto) return;
  addTask(text, pendingPhoto);
  input.value = '';
  pendingPhoto = null;
}

// ============================================================
// VOICE INPUT
// ============================================================
let recognition = null;
let isListening = false;

function toggleVoice() {
  if (!voiceConsented) {
    showToast('🎤 Voice input is disabled — check privacy settings');
    return;
  }
  if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
    showToast('🎤 Voice input not supported in this browser');
    return;
  }

  if (isListening) {
    recognition.stop();
    return;
  }

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  recognition = new SpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.lang = 'en-US';

  const btn = document.getElementById('voice-btn');

  recognition.onstart = () => {
    isListening = true;
    btn.classList.add('listening');
  };

  recognition.onresult = (event) => {
    const text = event.results[0][0].transcript;
    document.getElementById('task-text-input').value = text;
  };

  recognition.onend = () => {
    isListening = false;
    btn.classList.remove('listening');
  };

  recognition.onerror = () => {
    isListening = false;
    btn.classList.remove('listening');
    showToast('🎤 Couldn\'t hear you, try again!');
  };

  recognition.start();
}

// ============================================================
// PHOTO INPUT
// ============================================================
let pendingPhoto = null;

function handlePhoto(event) {
  const file = event.target.files[0];
  if (!file) return;

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const img = new Image();

  img.onload = () => {
    const maxSize = 400;
    let w = img.width, h = img.height;
    if (w > h) { if (w > maxSize) { h = h * maxSize / w; w = maxSize; } }
    else { if (h > maxSize) { w = w * maxSize / h; h = maxSize; } }

    canvas.width = w;
    canvas.height = h;
    ctx.drawImage(img, 0, 0, w, h);

    pendingPhoto = canvas.toDataURL('image/jpeg', 0.7);
    const input = document.getElementById('task-text-input');
    if (!input.value.trim()) input.placeholder = '📷 Photo ready! Add a note or tap +';
    showToast('📷 Photo attached! Add text or tap + to save.');
  };

  img.src = URL.createObjectURL(file);
  event.target.value = '';
}

// ============================================================
// PERSONALITY ROLLER
// ============================================================
function openRoller() {
  document.getElementById('roller-modal').classList.add('active');
}

function closeRoller() {
  document.getElementById('roller-modal').classList.remove('active');
}

function spinRoller() {
  const btn = document.getElementById('spin-btn');
  btn.disabled = true;

  const emojiEl = document.getElementById('roller-emoji');
  const nameEl = document.getElementById('roller-name');
  const greetEl = document.getElementById('roller-greeting');

  let count = 0;
  const totalSpins = 25;
  let delay = 60;

  function spin() {
    const p = PERSONALITIES[Math.floor(Math.random() * PERSONALITIES.length)];
    emojiEl.textContent = p.emoji;
    nameEl.textContent = p.name;
    greetEl.textContent = '';
    emojiEl.style.transform = `rotate(${(Math.random() - 0.5) * 30}deg)`;

    count++;
    if (count < totalSpins) {
      delay += 15;
      setTimeout(spin, delay);
    } else {
      // Final selection
      const final = PERSONALITIES[Math.floor(Math.random() * PERSONALITIES.length)];
      emojiEl.textContent = final.emoji;
      emojiEl.style.transform = 'rotate(0deg) scale(1.2)';
      nameEl.textContent = final.name;
      greetEl.textContent = `"${final.greeting}"`;

      state.personality = final;
      state.personalityDate = new Date().toISOString().slice(0, 10);
      saveState();
      updatePersonalityBanner();

      setTimeout(() => {
        emojiEl.style.transform = 'rotate(0deg) scale(1)';
        btn.disabled = false;
        // Close roller and start personality survey
        closeRoller();
        startSurvey();
      }, 500);
    }
  }

  spin();
}

function updatePersonalityBanner() {
  const p = state.personality;
  if (p) {
    document.getElementById('current-emoji').textContent = p.emoji;
    document.getElementById('current-name').textContent = p.name;
    document.getElementById('current-quote').textContent = `"${p.greeting}"`;
  }
}

// ============================================================
// UTILITIES
// ============================================================
function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function formatTime(iso) {
  const d = new Date(iso);
  const now = new Date();
  const diff = now - d;

  if (diff < 60000) return 'just now';
  if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
  if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
  return d.toLocaleDateString();
}

let toastTimeout;
function showToast(msg, duration = 3000) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => toast.classList.remove('show'), duration);
}

// ============================================================
// PRIVACY & CONSENT
// ============================================================
let voiceConsented = false;

function checkConsent() {
  try {
    const consent = localStorage.getItem('pedro-privacy-accepted');
    if (!consent) {
      document.getElementById('privacy-modal').classList.add('active');
      return false;
    }
    voiceConsented = localStorage.getItem('pedro-voice-consent') === 'true';
    return true;
  } catch(e) {
    return true; // if localStorage fails, just let them use the app
  }
}

function acceptPrivacy() {
  const voiceToggle = document.getElementById('voice-consent-toggle');
  voiceConsented = voiceToggle.checked;

  try {
    localStorage.setItem('pedro-privacy-accepted', new Date().toISOString());
    localStorage.setItem('pedro-voice-consent', voiceConsented.toString());
  } catch(e) { /* storage unavailable */ }

  document.getElementById('privacy-modal').classList.remove('active');
  updateVoiceButton();
}

function showFullPrivacy() {
  alert(
    "PEDRO PRIVACY POLICY\n" +
    "Last updated: 2026-03-11\n\n" +
    "DATA STORAGE\n" +
    "All task data, photos, and preferences are stored exclusively in your browser's localStorage. " +
    "No data is transmitted to Pedro's developers or any third-party servers (except voice input, detailed below). " +
    "Clearing your browser data will permanently delete all Pedro data.\n\n" +
    "VOICE INPUT\n" +
    "If enabled, voice input uses the Web Speech API built into your browser. " +
    "Audio is transmitted to and processed by:\n" +
    "• Google (Chrome, Edge, Samsung Internet)\n" +
    "• Apple (Safari)\n" +
    "Pedro does not control, store, or have access to your audio recordings. " +
    "Audio processing is governed by the respective company's privacy policy. " +
    "You can disable voice input at any time in the app.\n\n" +
    "PHOTO INPUT\n" +
    "Photos are resized to a maximum of 400px and stored as JPEG data URLs in localStorage. " +
    "Photos never leave your device.\n\n" +
    "ANALYTICS & TRACKING\n" +
    "Pedro uses no analytics, cookies, tracking pixels, or third-party scripts.\n\n" +
    "CHILDREN\n" +
    "Pedro does not knowingly collect data from children. All data remains on-device.\n\n" +
    "CONTACT\n" +
    "For privacy questions, reach out to the project maintainers."
  );
}

function updateVoiceButton() {
  const btn = document.getElementById('voice-btn');
  const speechSupported = ('webkitSpeechRecognition' in window) || ('SpeechRecognition' in window);

  if (!speechSupported || !voiceConsented) {
    btn.style.display = 'none';
  } else {
    btn.style.display = 'flex';
  }
}

// ============================================================
// SETTINGS MODAL
// ============================================================
function openSettings() {
  const modal = document.getElementById('settings-modal');
  modal.classList.add('active');

  const settings = getSettings();

  // Highlight current theme
  document.querySelectorAll('.theme-option').forEach(opt => {
    if (opt.dataset.theme === settings.theme) {
      opt.classList.add('active');
    } else {
      opt.classList.remove('active');
    }
  });

  // Set toggle states
  document.getElementById('celebrations-toggle').checked = settings.celebrationsEnabled;
  document.getElementById('confetti-toggle').checked = settings.confettiEnabled;
  document.getElementById('pedro-toggle').checked = settings.pedroEnabled;
  document.getElementById('sounds-toggle').checked = settings.soundsEnabled;

  // Set timing selection
  document.querySelectorAll('.radio-option').forEach(opt => {
    if (opt.dataset.value === settings.celebrationTiming) {
      opt.classList.add('selected');
    } else {
      opt.classList.remove('selected');
    }
  });

  // Set sound selection
  document.querySelectorAll('.sound-card').forEach(card => {
    if (card.dataset.sound === settings.soundType) {
      card.classList.add('selected');
    } else {
      card.classList.remove('selected');
    }
  });

  // Set volume
  const volumeSlider = document.getElementById('volume-slider');
  volumeSlider.value = settings.volume;
  document.getElementById('volume-value').textContent = settings.volume + '%';

  // Set AI personality settings
  document.getElementById('ai-personality-toggle').checked = settings.aiPersonality;
  document.getElementById('api-key-input').value = settings.apiKey || '';
}

function closeSettings() {
  document.getElementById('settings-modal').classList.remove('active');
}

function selectTheme(element) {
  const themeName = element.getAttribute('data-theme');
  if (!themeName) return;

  // Update visual state
  document.querySelectorAll('.theme-option').forEach(opt => {
    opt.classList.remove('active');
  });
  element.classList.add('active');

  // Apply theme
  setTheme(themeName);
}

function toggleSetting(key, value) {
  updateSetting(key, value);
}

function saveApiKey(value) {
  updateSetting('apiKey', value.trim());
}

function selectTiming(element) {
  const value = element.dataset.value;

  // Update visual selection
  document.querySelectorAll('.radio-option').forEach(opt => {
    opt.classList.remove('selected');
  });
  element.classList.add('selected');

  // Save setting
  updateSetting('celebrationTiming', value);
}

function selectSound(element) {
  const soundType = element.dataset.sound;

  // Update visual selection
  document.querySelectorAll('.sound-card').forEach(card => {
    card.classList.remove('selected');
  });
  element.classList.add('selected');

  // Save setting
  updateSetting('soundType', soundType);
}

function playRandomSound() {
  const soundOptions = ['chime', 'fanfare', 'pop', 'coins', 'woohoo'];
  const randomSound = soundOptions[Math.floor(Math.random() * soundOptions.length)];
  playSound(randomSound, 70);
}

function updateVolume(value) {
  document.getElementById('volume-value').textContent = value + '%';
  updateSetting('volume', parseInt(value));
}

// ============================================================
// FAVORITE DAILIES
// ============================================================
let editDiffMode = false;

function getEffectiveDiff(task) {
  return state.dailies.customDiff[task.label] || task.diff;
}

const MOOD_FILTER_RANGE = {
  all:   [1, 2, 3, 4, 5],
  low:   [1, 2],
  okay:  [2, 3],
  happy: [3, 4, 5],
};

function setMoodFilter(mood) {
  state.dailies.mood = mood;
  saveState();
  renderDailyModal();
}

function toggleDailyDone(label) {
  const idx = state.dailies.done.indexOf(label);
  if (idx >= 0) {
    state.dailies.done.splice(idx, 1);
  } else {
    state.dailies.done.push(label);
    if (state.personality) {
      const msgs = state.personality.praise;
      showToast(`${state.personality.emoji} ${msgs[Math.floor(Math.random() * msgs.length)]}`);
    }
  }
  saveState();
  renderDailyModal();
}

function changeDiff(label, delta) {
  const task = DAILY_TASKS.find(t => t.label === label);
  if (!task) return;
  const current = getEffectiveDiff(task);
  const next = Math.max(1, Math.min(5, current + delta));
  if (next === task.diff) {
    delete state.dailies.customDiff[label];
  } else {
    state.dailies.customDiff[label] = next;
  }
  saveState();
  renderDailyModal();
}

function toggleEditDiff() {
  editDiffMode = !editDiffMode;
  const doneBtn = document.getElementById('done-editing-btn');
  if (doneBtn) doneBtn.style.display = editDiffMode ? 'block' : 'none';
  renderDailyModal();
}

function buildTaskRow(task) {
  const diff = getEffectiveDiff(task);
  const isDone = state.dailies.done.includes(task.label);
  const labelSafe = task.label.replace(/'/g, "\\'");
  const isEditing = editDiffMode;
  const badge = diffDisplay(diff);

  const rightSide = isEditing
    ? `<div class="diff-editor visible">
         <button class="diff-stepper" onclick="changeDiff('${labelSafe}',-1)">−</button>
         <span class="diff-badge">${badge}</span>
         <button class="diff-stepper" onclick="changeDiff('${labelSafe}',+1)">+</button>
       </div>`
    : `<span class="diff-badge diff-badge-tap" onclick="toggleEditDiff()" title="Tap to edit difficulty">${badge}</span>`;

  return `
    <div class="daily-task-row ${isDone ? 'done-today' : ''}" data-diff="${diff}">
      <button class="daily-check" onclick="toggleDailyDone('${labelSafe}')">${isDone ? '✓' : ''}</button>
      <span class="daily-task-emoji">${task.emoji}</span>
      <span class="daily-task-label">${task.label}</span>
      ${rightSide}
    </div>`;
}

function renderDailyModal() {
  const mood = state.dailies.mood || 'all';
  const allowedDiffs = MOOD_FILTER_RANGE[mood] || MOOD_FILTER_RANGE.all;

  // Mood filter buttons
  document.querySelectorAll('.mood-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.mood === mood);
  });

  // Preset tasks filtered by mood range, grouped by difficulty
  const allFavEl = document.getElementById('all-favorites');
  let html = '';
  for (let d = 1; d <= 5; d++) {
    if (!allowedDiffs.includes(d)) continue;
    const group = DAILY_TASKS.filter(t => getEffectiveDiff(t) === d);
    if (!group.length) continue;
    html += `<div class="diff-group">
      <div class="diff-group-header">${diffDisplay(d)} — ${DIFF_LABELS[d].label}</div>
      ${group.map(t => buildTaskRow(t)).join('')}
    </div>`;
  }
  allFavEl.innerHTML = html;

  // Custom tasks — always show all of them regardless of filter
  const customEl = document.getElementById('custom-favorites');
  const custom = state.dailies.customTasks || [];
  if (custom.length) {
    customEl.innerHTML = `<div class="diff-group">
      <div class="diff-group-header">⭐ Your custom tasks</div>
      ${custom.map(t => buildCustomTaskRow(t)).join('')}
    </div>`;
  } else {
    customEl.innerHTML = '';
  }
}

// ============================================================
// CUSTOM TASK FORM
// ============================================================
let newCustomDiff = 1;

function isEmoji(str) {
  const emojiRegex = /^\p{Emoji}/u;
  return emojiRegex.test(str);
}

function showAddCustomForm() {
  newCustomDiff = 1;
  document.getElementById('new-diff-display').textContent = diffDisplay(1);
  const input = document.getElementById('custom-task-input');
  input.value = '⭐ ';
  document.getElementById('add-custom-form').style.display = 'block';
  document.getElementById('add-custom-btn').style.display = 'none';
  input.focus();
  input.setSelectionRange(2, 2);
}

function hideAddCustomForm() {
  document.getElementById('add-custom-form').style.display = 'none';
  document.getElementById('add-custom-btn').style.display = 'block';
  document.getElementById('custom-task-input').value = '';
}

function changeNewDiff(delta) {
  newCustomDiff = Math.max(1, Math.min(5, newCustomDiff + delta));
  document.getElementById('new-diff-display').textContent = diffDisplay(newCustomDiff);
}

function saveCustomTask() {
  let val = document.getElementById('custom-task-input').value.trim();
  if (!val || val === '⭐') return;
  if (!isEmoji(val)) val = '⭐ ' + val;
  state.dailies.customTasks = state.dailies.customTasks || [];
  state.dailies.customTasks.push({ label: val, diff: newCustomDiff, id: Date.now() });
  saveState();
  hideAddCustomForm();
  renderDailyModal();
}

function deleteCustomTask(id) {
  state.dailies.customTasks = (state.dailies.customTasks || []).filter(t => t.id !== id);
  saveState();
  renderDailyModal();
}

function buildCustomTaskRow(task) {
  const isDone = state.dailies.done.includes(task.label);
  const labelSafe = task.label.replace(/'/g, "\\'");
  const badge = diffDisplay(task.diff);

  const rightSide = editDiffMode
    ? `<div class="diff-editor visible">
         <button class="diff-stepper" onclick="changeCustomDiff(${task.id},-1)">−</button>
         <span class="diff-badge">${badge}</span>
         <button class="diff-stepper" onclick="changeCustomDiff(${task.id},+1)">+</button>
       </div>
       <button class="custom-task-row-delete" onclick="deleteCustomTask(${task.id})" title="Remove">✕</button>`
    : `<span class="diff-badge diff-badge-tap" onclick="toggleEditDiff()" title="Tap to edit difficulty">${badge}</span>`;

  return `
    <div class="daily-task-row ${isDone ? 'done-today' : ''}" data-diff="${task.diff}">
      <button class="daily-check" onclick="toggleDailyDone('${labelSafe}')">${isDone ? '✓' : ''}</button>
      <span class="daily-task-label" style="flex:1;">${task.label}</span>
      ${rightSide}
    </div>`;
}

function changeCustomDiff(id, delta) {
  const task = (state.dailies.customTasks || []).find(t => t.id === id);
  if (!task) return;
  task.diff = Math.max(1, Math.min(5, task.diff + delta));
  saveState();
  renderDailyModal();
}

// Auto-refill star emoji on blur if missing
document.addEventListener('blur', (e) => {
  if (e.target.id !== 'custom-task-input') return;
  const val = e.target.value.trim();
  if (val && !isEmoji(val)) {
    e.target.value = '⭐ ' + val;
  }
}, true);

function openDailyModal() {
  renderDailyModal();
  document.getElementById('daily-modal').classList.add('active');
}

function closeDailyModal() {
  document.getElementById('daily-modal').classList.remove('active');
}

// ============================================================
// PERSONALITY SURVEY
// ============================================================
const SURVEY_QUESTIONS = [
  "First off, what should I call you?",
  "What's on your plate today — work stuff, personal stuff, or a mix?",
  "How are you feeling right now, honestly? Scale of 1 to 10, or just tell me in your own words.",
  "What's the one thing you keep putting off that would feel amazing to finish?"
];

let surveyState = {
  active: false,
  questionIndex: 0,
  answers: [],
  chatHistory: []
};

function startSurvey() {
  const settings = getSettings();
  if (!settings.apiKey || !settings.aiPersonality) {
    // No API key — skip survey
    return;
  }

  const p = state.personality;
  if (!p) return;

  surveyState = {
    active: true,
    questionIndex: 0,
    answers: [],
    chatHistory: []
  };

  document.getElementById('survey-emoji').textContent = p.emoji;
  document.getElementById('survey-name').textContent = p.name;
  document.getElementById('survey-chat').innerHTML = '';
  document.getElementById('survey-input').value = '';
  document.getElementById('survey-input-row').style.display = 'flex';
  document.getElementById('survey-modal').classList.add('active');

  // Ask first question via AI (in character)
  askSurveyQuestion(0);
}

async function askSurveyQuestion(index) {
  const p = state.personality;
  const settings = getSettings();
  const chatEl = document.getElementById('survey-chat');

  // Show typing indicator
  const typingEl = document.createElement('div');
  typingEl.className = 'survey-bubble ai typing';
  typingEl.textContent = `${p.emoji} typing...`;
  chatEl.appendChild(typingEl);
  chatEl.scrollTop = chatEl.scrollHeight;

  const baseQuestion = SURVEY_QUESTIONS[index];
  const isFirst = index === 0;

  const priorChat = surveyState.chatHistory
    .map(m => `${m.role === 'ai' ? p.name : 'User'}: ${m.text}`)
    .join('\n');

  const systemPrompt = `You are ${p.name} ${p.emoji}. Stay completely in character — use their speech patterns, catchphrases, mannerisms, and worldview. You are meeting someone for the first time inside a task management app called Pedro (for people with executive dysfunction). You're doing a quick introductory chat to get to know them so you can help them better.

Be warm, fun, and brief. Ask ONE question at a time. Keep your message under 200 characters. No quotes around your response.`;

  const userMsg = isFirst
    ? `Start the conversation. Your first question should be a version of: "${baseQuestion}" — but in your own character's voice and style.`
    : `The conversation so far:\n${priorChat}\n\nNow ask them this next question in your character's voice: "${baseQuestion}"`;

  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': settings.apiKey,
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true'
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 200,
        system: systemPrompt,
        messages: [{ role: 'user', content: userMsg }]
      })
    });

    typingEl.remove();

    if (!res.ok) {
      addSurveyBubble('ai', `${baseQuestion}`);
      return;
    }

    const data = await res.json();
    const aiText = data.content?.[0]?.text || baseQuestion;
    addSurveyBubble('ai', aiText);
    surveyState.chatHistory.push({ role: 'ai', text: aiText });
  } catch (e) {
    typingEl.remove();
    addSurveyBubble('ai', baseQuestion);
    surveyState.chatHistory.push({ role: 'ai', text: baseQuestion });
  }
}

function addSurveyBubble(type, text) {
  const chatEl = document.getElementById('survey-chat');
  const bubble = document.createElement('div');
  bubble.className = `survey-bubble ${type}`;
  bubble.textContent = text;
  chatEl.appendChild(bubble);
  chatEl.scrollTop = chatEl.scrollHeight;
}

async function submitSurveyAnswer() {
  const input = document.getElementById('survey-input');
  const answer = input.value.trim();
  if (!answer) return;

  input.value = '';
  addSurveyBubble('user', answer);
  surveyState.answers.push(answer);
  surveyState.chatHistory.push({ role: 'user', text: answer });
  surveyState.questionIndex++;

  if (surveyState.questionIndex < SURVEY_QUESTIONS.length) {
    // Ask next question
    await askSurveyQuestion(surveyState.questionIndex);
  } else {
    // Survey done — generate profile summary and closing message
    await finishSurvey();
  }
}

async function finishSurvey() {
  const p = state.personality;
  const settings = getSettings();
  const inputRow = document.getElementById('survey-input-row');
  inputRow.style.display = 'none';

  const chatEl = document.getElementById('survey-chat');
  const typingEl = document.createElement('div');
  typingEl.className = 'survey-bubble ai typing';
  typingEl.textContent = `${p.emoji} thinking...`;
  chatEl.appendChild(typingEl);
  chatEl.scrollTop = chatEl.scrollHeight;

  const convo = surveyState.chatHistory
    .map(m => `${m.role === 'ai' ? p.name : 'User'}: ${m.text}`)
    .join('\n');

  // Generate a profile summary + closing message in one call
  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': settings.apiKey,
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true'
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 400,
        system: `You are ${p.name} ${p.emoji}. Based on the conversation below, do TWO things:

1. First, write a brief factual profile summary of what you learned about this person (name, what they're working on, how they're feeling, what they struggle with). This should be plain text, NOT in character. Write it as bullet points. Prefix this section with "PROFILE:" on its own line.

2. Then write a short in-character closing message (under 150 chars) expressing enthusiasm about helping them today. Prefix this with "CLOSING:" on its own line.`,
        messages: [{ role: 'user', content: convo }]
      })
    });

    typingEl.remove();

    if (res.ok) {
      const data = await res.json();
      const text = data.content?.[0]?.text || '';

      const profileMatch = text.match(/PROFILE:\s*([\s\S]*?)(?:CLOSING:|$)/i);
      const closingMatch = text.match(/CLOSING:\s*([\s\S]*)/i);

      if (profileMatch) {
        state.userProfile = profileMatch[1].trim();
        saveState();
      }

      const closing = closingMatch ? closingMatch[1].trim() : "Let's do this!";
      addSurveyBubble('ai', closing);
    } else {
      // Save raw answers as fallback profile
      state.userProfile = surveyState.answers.map((a, i) => `Q: ${SURVEY_QUESTIONS[i]}\nA: ${a}`).join('\n');
      saveState();
      addSurveyBubble('ai', "Alright, I've got a good read on you. Let's crush it!");
    }
  } catch (e) {
    typingEl.remove();
    state.userProfile = surveyState.answers.map((a, i) => `Q: ${SURVEY_QUESTIONS[i]}\nA: ${a}`).join('\n');
    saveState();
    addSurveyBubble('ai', "Got it! Let's get to work!");
  }

  // Auto-close after a moment
  setTimeout(() => {
    document.getElementById('survey-modal').classList.remove('active');
    surveyState.active = false;
  }, 3000);
}

function skipSurvey() {
  document.getElementById('survey-modal').classList.remove('active');
  surveyState.active = false;
}

// Hook Enter key for survey input
document.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && surveyState.active) {
    const surveyInput = document.getElementById('survey-input');
    if (document.activeElement === surveyInput) {
      e.preventDefault();
      submitSurveyAnswer();
    }
  }
});

// ============================================================
// AI TASK SUGGESTIONS
// ============================================================
async function openSuggestModal() {
  const settings = getSettings();
  const p = state.personality;

  if (!settings.apiKey || !settings.aiPersonality) {
    showToast('💡 Set up your API key in Settings to get AI suggestions');
    return;
  }
  if (!p) {
    showToast('🎲 Roll for a personality first!');
    return;
  }

  const modal = document.getElementById('suggest-modal');
  const listEl = document.getElementById('suggest-list');
  const titleEl = document.getElementById('suggest-title');
  titleEl.textContent = `💡 ${p.name} suggests...`;
  listEl.innerHTML = '<div class="suggest-loading">✨ Thinking...</div>';
  modal.classList.add('active');

  const currentTasks = state.tasks
    .map(t => `${t.done ? '✅' : '⬜'} ${t.text}`)
    .join('\n');

  const dailyTasks = DAILY_TASKS.map(t => `${t.emoji} ${t.label}`).join(', ');

  const profileContext = state.userProfile
    ? `\nWhat you know about this person:\n${state.userProfile}`
    : '';

  const systemPrompt = `You are ${p.name} ${p.emoji}. Stay in character. You are suggesting tasks for someone using Pedro, a task app for people with executive dysfunction.${profileContext}

Based on their current tasks and situation, suggest 4-5 tasks they might want to add. Mix practical next steps related to their existing tasks with self-care/wellness tasks. Keep task names short (under 50 chars). For each task, add a brief one-line reason why you're suggesting it (in character).

Format each suggestion as:
TASK: [task name]
WHY: [brief reason in character]`;

  const userMsg = currentTasks
    ? `Here are my current tasks:\n${currentTasks}\n\nSuggest some tasks I should add.`
    : `I don't have any tasks yet. Suggest some good starting tasks for today.`;

  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': settings.apiKey,
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true'
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 500,
        system: systemPrompt,
        messages: [{ role: 'user', content: userMsg }]
      })
    });

    if (!res.ok) {
      listEl.innerHTML = '<div class="suggest-loading">Couldn\'t get suggestions right now. Check your API key in Settings.</div>';
      return;
    }

    const data = await res.json();
    const text = data.content?.[0]?.text || '';

    // Parse TASK: / WHY: pairs
    const suggestions = [];
    const taskMatches = text.matchAll(/TASK:\s*(.+)/gi);
    const whyMatches = [...text.matchAll(/WHY:\s*(.+)/gi)];

    let i = 0;
    for (const match of taskMatches) {
      suggestions.push({
        text: match[1].trim(),
        why: whyMatches[i] ? whyMatches[i][1].trim() : ''
      });
      i++;
    }

    if (suggestions.length === 0) {
      listEl.innerHTML = '<div class="suggest-loading">No suggestions came through. Try again!</div>';
      return;
    }

    listEl.innerHTML = suggestions.map(s => {
      const safeText = s.text.replace(/'/g, "\\'").replace(/"/g, '&quot;');
      return `<div class="suggest-task" onclick="addSuggestedTask('${safeText}')">
        <div style="flex:1;">
          <div class="suggest-task-text">${s.text}</div>
          ${s.why ? `<div class="suggest-reason">${s.why}</div>` : ''}
        </div>
        <button class="suggest-task-add" onclick="event.stopPropagation(); addSuggestedTask('${safeText}')">+</button>
      </div>`;
    }).join('');

  } catch (e) {
    listEl.innerHTML = '<div class="suggest-loading">Something went wrong. Try again!</div>';
  }
}

function addSuggestedTask(text) {
  addTask(text);
  // Visual feedback — briefly highlight
  showToast(`✅ Added: ${text}`, 2000);
}

function closeSuggestModal() {
  document.getElementById('suggest-modal').classList.remove('active');
}

// ============================================================
// INIT
// ============================================================
document.getElementById('task-text-input').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') addTaskFromInput();
});

initTheme();
loadState();
renderTasks();
updatePersonalityBanner();
checkConsent();
updateVoiceButton();

// Check if personality is from a different day
if (state.personality && state.personalityDate !== new Date().toISOString().slice(0, 10)) {
  showToast('🎲 New day! Roll for a new advisor!');
}

// Register service worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js');
}
