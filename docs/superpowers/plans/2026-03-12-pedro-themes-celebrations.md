# Pedro: Themes, Personalities & Celebrations Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform Pedro into a customizable productivity companion with 5 visual themes, 28 personalities, and celebration effects (confetti, dancing Pedro, sounds).

**Architecture:** Refactor single-file app into 6 focused modules (index.html, styles.css, app.js, personalities.js, celebrations.js, sw.js). Each module has clear responsibilities and simple global variable interfaces. Maintain offline-first PWA capabilities.

**Tech Stack:** Vanilla HTML/CSS/JS, Web Audio API, Service Workers, CSS Animations

**Spec:** `docs/superpowers/specs/2026-03-11-pedro-themes-celebrations-design.md`

---

## Chunk 1: File Restructuring & Theme System

### Task 1.1: Extract CSS to styles.css

**Goal:** Move all CSS from index.html to new styles.css file

**Files:**
- Create: `pedro/styles.css`
- Modify: `pedro/index.html` (remove `<style>` block, add `<link>` tag)

- [ ] **Step 1: Create styles.css with current styles**

Create `pedro/styles.css` and copy all CSS from `index.html` `<style>` block (lines 14-605):

```bash
# No test needed - this is a pure extraction
```

- [ ] **Step 2: Add link tag to index.html**

In `pedro/index.html`, replace the `<style>` block with:

```html
<link rel="stylesheet" href="styles.css">
```

- [ ] **Step 3: Verify app still works**

```bash
cd pedro
python3 -m http.server 8000
# Open http://localhost:8000 in browser
# Verify: App loads, styles applied, tasks can be added/completed
```

Expected: App looks and functions exactly as before

- [ ] **Step 4: Commit**

```bash
git add pedro/styles.css pedro/index.html
git commit -m "refactor: extract CSS to styles.css

- Move all styles from index.html to styles.css
- Update HTML to link external stylesheet
- No functional changes"
```

---

### Task 1.2: Add Theme CSS Variables

**Goal:** Define 5 theme color schemes using CSS custom properties

**Files:**
- Modify: `pedro/styles.css` (wrap existing variables, add 4 new themes)

- [ ] **Step 1: Wrap existing variables in theme selector**

In `pedro/styles.css`, find the `:root` block and replace with:

```css
/* Base variables - default to dark cyberpunk theme */
:root {
  --bg-dark: #1a0a2e;
  --bg-card: #2a1a4e;
  --bg-input: #3a2a5e;
  --accent-orange: #ff6b35;
  --accent-green: #4ecdc4;
  --accent-pink: #ff6b9d;
  --accent-yellow: #ffe66d;
  --text-primary: #f0e6ff;
  --text-secondary: #b8a9d4;
  --text-muted: #7a6b9a;
  --shadow: 0 4px 20px rgba(0,0,0,0.3);
  --radius: 16px;
  --safe-bottom: env(safe-area-inset-bottom, 0px);
}

/* Theme: Dark Cyberpunk (default) */
[data-theme="dark-cyberpunk"] {
  --bg-dark: #1a0a2e;
  --bg-card: #2a1a4e;
  --bg-input: #3a2a5e;
  --accent-orange: #ff6b35;
  --accent-green: #4ecdc4;
  --accent-pink: #ff6b9d;
  --accent-yellow: #ffe66d;
  --text-primary: #f0e6ff;
  --text-secondary: #b8a9d4;
  --text-muted: #7a6b9a;
}
```

- [ ] **Step 2: Add Light & Clean theme**

Add after dark-cyberpunk theme:

```css
/* Theme: Light & Clean */
[data-theme="light-clean"] {
  --bg-dark: #f8f9fa;
  --bg-card: #ffffff;
  --bg-input: #e9ecef;
  --accent-orange: #ff6b6b;
  --accent-green: #4ecdc4;
  --accent-pink: #ff6b9d;
  --accent-yellow: #ffc107;
  --text-primary: #1a535c;
  --text-secondary: #495057;
  --text-muted: #6c757d;
  --shadow: 0 4px 20px rgba(0,0,0,0.1);
}
```

- [ ] **Step 3: Add Nature & Calm theme**

```css
/* Theme: Nature & Calm */
[data-theme="nature"] {
  --bg-dark: #2d3e2e;
  --bg-card: #3d5a40;
  --bg-input: #4a6b4e;
  --accent-orange: #c9a847;
  --accent-green: #80a05d;
  --accent-pink: #b5896b;
  --accent-yellow: #e8dcc4;
  --text-primary: #f0e9d2;
  --text-secondary: #d4c5a0;
  --text-muted: #9a8f7a;
  --shadow: 0 4px 20px rgba(0,0,0,0.4);
}
```

- [ ] **Step 4: Add Sunset Warmth theme**

```css
/* Theme: Sunset Warmth */
[data-theme="sunset"] {
  --bg-dark: #2b1b3d;
  --bg-card: #3d2b4e;
  --bg-input: #4d3b5e;
  --accent-orange: #ff6b35;
  --accent-green: #ff8c42;
  --accent-pink: #ff6b9d;
  --accent-yellow: #ffc857;
  --text-primary: #f7dba7;
  --text-secondary: #e8c896;
  --text-muted: #c9a876;
  --shadow: 0 4px 20px rgba(0,0,0,0.4);
}
```

- [ ] **Step 5: Add Ocean Breeze theme**

```css
/* Theme: Ocean Breeze */
[data-theme="ocean"] {
  --bg-dark: #0a1929;
  --bg-card: #1a2942;
  --bg-input: #2a3952;
  --accent-orange: #00a8e8;
  --accent-green: #4ecdc4;
  --accent-pink: #7eb2dd;
  --accent-yellow: #c8f4f9;
  --text-primary: #c8f4f9;
  --text-secondary: #a0d4e0;
  --text-muted: #7eb2c0;
  --shadow: 0 4px 20px rgba(0,0,0,0.5);
}
```

- [ ] **Step 6: Test theme switching manually**

```bash
# Open browser console
document.body.setAttribute('data-theme', 'light-clean');
# Verify: App switches to light theme
document.body.setAttribute('data-theme', 'nature');
# Verify: App switches to green/brown theme
document.body.setAttribute('data-theme', 'sunset');
# Verify: App switches to warm orange theme
document.body.setAttribute('data-theme', 'ocean');
# Verify: App switches to blue theme
document.body.setAttribute('data-theme', 'dark-cyberpunk');
# Verify: App returns to default purple theme
```

- [ ] **Step 7: Commit**

```bash
git add pedro/styles.css
git commit -m "feat: add 5 theme color schemes

- Dark Cyberpunk (default)
- Light & Clean
- Nature & Calm
- Sunset Warmth
- Ocean Breeze

Each theme uses CSS custom properties for colors"
```

---

### Task 1.3: Extract JavaScript to app.js

**Goal:** Move all JavaScript from index.html to new app.js file

**Files:**
- Create: `pedro/app.js`
- Modify: `pedro/index.html` (remove `<script>` block, add `<script src>` tag)

- [ ] **Step 1: Create app.js with current JavaScript**

Create `pedro/app.js` and copy all JavaScript from `index.html` `<script>` block (lines 708-1423):

```javascript
// Copy entire script content starting from:
// ============================================================
// PERSONALITIES
// ============================================================
// ... through to the end including:
// if ('serviceWorker' in navigator) {
//   navigator.serviceWorker.register('sw.js');
// }
```

- [ ] **Step 2: Update index.html script tag**

In `pedro/index.html`, replace the `<script>` block with:

```html
<script src="app.js"></script>
```

- [ ] **Step 3: Verify app still works**

```bash
cd pedro
python3 -m http.server 8000
# Open http://localhost:8000
# Test: Add task, complete task, delete task, roll personality, voice input, photo input
```

Expected: All features work exactly as before

- [ ] **Step 4: Commit**

```bash
git add pedro/app.js pedro/index.html
git commit -m "refactor: extract JavaScript to app.js

- Move all JS from index.html to app.js
- Update HTML to load external script
- No functional changes"
```

---

### Task 1.4: Extract Personalities to personalities.js

**Goal:** Move PERSONALITIES array to dedicated file

**Files:**
- Create: `pedro/personalities.js`
- Modify: `pedro/app.js` (remove PERSONALITIES array)
- Modify: `pedro/index.html` (add script tag for personalities.js)

- [ ] **Step 1: Create personalities.js**

Create `pedro/personalities.js`:

```javascript
// ============================================================
// PERSONALITIES
// ============================================================
const PERSONALITIES = [
  {
    name: "Gordon Ramsay",
    emoji: "👨‍🍳",
    greeting: "Right then, let's get this day sorted, shall we?",
    encourage: [
      "That task is RAAWW! Get it done!",
      "Move your backside, this won't finish itself!",
      "Come on, you're better than this!",
      "Focus! Perfection takes effort!",
      "This task needs passion, not excuses!"
    ],
    praise: [
      "Finally! Beautiful! Stunning!",
      "Now THAT is what I'm talking about!",
      "Gorgeous work, absolutely gorgeous!",
      "You've earned your Michelin star today!",
      "That's done properly. Well done, you."
    ]
  },
  // ... copy all 18 existing personalities from app.js
];
```

- [ ] **Step 2: Remove PERSONALITIES from app.js**

In `pedro/app.js`, delete the PERSONALITIES array (keep the comment marker for reference):

```javascript
// ============================================================
// PERSONALITIES (now in personalities.js)
// ============================================================

// ============================================================
// STATE
// ============================================================
let state = {
  // ... rest of app.js
```

- [ ] **Step 3: Add script tag to index.html**

In `pedro/index.html`, before the `<script src="app.js"></script>` tag, add:

```html
<script src="personalities.js"></script>
<script src="app.js"></script>
```

- [ ] **Step 4: Verify personalities work**

```bash
cd pedro
python3 -m http.server 8000
# Open http://localhost:8000
# Test: Roll personality multiple times
# Verify: All 18 personalities appear, messages display correctly
```

Expected: Personality system works as before

- [ ] **Step 5: Commit**

```bash
git add pedro/personalities.js pedro/app.js pedro/index.html
git commit -m "refactor: extract personalities to personalities.js

- Move PERSONALITIES array to dedicated file
- Update script loading order in index.html
- No functional changes"
```

---

## Chunk 2: Settings Infrastructure & Theme Switching

### Task 2.1: Add Settings State Management

**Goal:** Implement localStorage-based settings with defaults

**Files:**
- Modify: `pedro/app.js` (add settings functions after state management)

- [ ] **Step 1: Add default settings constant**

In `pedro/app.js`, after the `state` object declaration, add:

```javascript
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
  volume: 70
};

function getSettings() {
  try {
    const saved = localStorage.getItem('pedro-settings');
    return saved ? JSON.parse(saved) : DEFAULT_SETTINGS;
  } catch(e) {
    return DEFAULT_SETTINGS;
  }
}

function saveSettings(settings) {
  try {
    localStorage.setItem('pedro-settings', JSON.stringify(settings));
  } catch(e) {
    // localStorage unavailable or quota exceeded
  }
}

function updateSetting(key, value) {
  const settings = getSettings();
  settings[key] = value;
  saveSettings(settings);
  return settings;
}
```

- [ ] **Step 2: Test settings in browser console**

```bash
cd pedro
python3 -m http.server 8000
# Open browser console:
console.log(getSettings());
# Expected: Returns DEFAULT_SETTINGS object

updateSetting('theme', 'ocean');
console.log(getSettings());
# Expected: Returns settings with theme: 'ocean'

# Reload page
console.log(getSettings());
# Expected: Settings persist, theme is still 'ocean'
```

- [ ] **Step 3: Commit**

```bash
git add pedro/app.js
git commit -m "feat: add settings state management

- Add DEFAULT_SETTINGS constant
- Implement getSettings, saveSettings, updateSetting
- Settings persist in localStorage"
```

---

### Task 2.2: Implement Theme Switching

**Goal:** Add setTheme function and initialize theme on load

**Files:**
- Modify: `pedro/app.js` (add theme functions, call on init)

- [ ] **Step 1: Add setTheme function**

In `pedro/app.js`, after the settings functions, add:

```javascript
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
```

- [ ] **Step 2: Call initTheme on page load**

In `pedro/app.js`, find the initialization section (after the event listener for Enter key) and add:

```javascript
// ============================================================
// INIT
// ============================================================
document.getElementById('task-text-input').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') addTaskFromInput();
});

initTheme();  // NEW: Initialize theme before rendering
loadState();
renderTasks();
updatePersonalityBanner();
checkConsent();
updateVoiceButton();
```

- [ ] **Step 3: Test theme persistence**

```bash
cd pedro
python3 -m http.server 8000
# Browser console:
setTheme('light-clean');
# Verify: App switches to light theme
# Reload page
# Verify: Light theme persists

setTheme('nature');
# Reload page
# Verify: Nature theme persists

setTheme('dark-cyberpunk');
# Reset to default
```

- [ ] **Step 4: Commit**

```bash
git add pedro/app.js
git commit -m "feat: implement theme switching

- Add setTheme function to change and persist theme
- Add initTheme to load saved theme on startup
- Theme persists across page reloads"
```

---

### Task 2.3: Add Settings Modal HTML

**Goal:** Create settings modal structure in index.html

**Files:**
- Modify: `pedro/index.html` (add modal markup before closing `</body>`)

- [ ] **Step 1: Add settings button to header**

In `pedro/index.html`, modify the `#pedro-header` section to add a settings button:

```html
<header id="pedro-header">
  <div class="raccoon-icon">🦝</div>
  <div class="header-text">
    <h1>PEDRO</h1>
    <p>Personal Executive Dysfunction Relief Operator</p>
  </div>
  <button class="settings-btn" onclick="openSettings()" title="Settings">⚙️</button>
</header>
```

- [ ] **Step 2: Add settings modal HTML**

Before `</body>`, after the `#toast` div, add:

```html
<!-- SETTINGS MODAL -->
<div id="settings-modal" class="modal">
  <div class="modal-content settings-panel">
    <h2>⚙️ Settings</h2>

    <!-- Theme Selection -->
    <div class="setting-group">
      <h3>🎨 Theme</h3>
      <div class="theme-options">
        <div class="theme-option" data-theme="dark-cyberpunk" onclick="selectTheme(this)">
          <div class="theme-colors">
            <span style="background: #1a0a2e"></span>
            <span style="background: #ff6b35"></span>
            <span style="background: #4ecdc4"></span>
            <span style="background: #ffe66d"></span>
          </div>
          <div class="theme-name">Dark Cyberpunk</div>
        </div>
        <div class="theme-option" data-theme="light-clean" onclick="selectTheme(this)">
          <div class="theme-colors">
            <span style="background: #f8f9fa"></span>
            <span style="background: #ff6b6b"></span>
            <span style="background: #4ecdc4"></span>
            <span style="background: #ffc107"></span>
          </div>
          <div class="theme-name">Light & Clean</div>
        </div>
        <div class="theme-option" data-theme="nature" onclick="selectTheme(this)">
          <div class="theme-colors">
            <span style="background: #2d3e2e"></span>
            <span style="background: #80a05d"></span>
            <span style="background: #c9a847"></span>
            <span style="background: #e8dcc4"></span>
          </div>
          <div class="theme-name">Nature & Calm</div>
        </div>
        <div class="theme-option" data-theme="sunset" onclick="selectTheme(this)">
          <div class="theme-colors">
            <span style="background: #2b1b3d"></span>
            <span style="background: #ff6b35"></span>
            <span style="background: #ff8c42"></span>
            <span style="background: #ffc857"></span>
          </div>
          <div class="theme-name">Sunset Warmth</div>
        </div>
        <div class="theme-option" data-theme="ocean" onclick="selectTheme(this)">
          <div class="theme-colors">
            <span style="background: #0a1929"></span>
            <span style="background: #4ecdc4"></span>
            <span style="background: #00a8e8"></span>
            <span style="background: #c8f4f9"></span>
          </div>
          <div class="theme-name">Ocean Breeze</div>
        </div>
      </div>
    </div>

    <button class="modal-close-btn" onclick="closeSettings()">Close</button>
  </div>
</div>
```

- [ ] **Step 3: Verify modal structure exists**

```bash
cd pedro
python3 -m http.server 8000
# Open browser, inspect HTML
# Verify: settings-modal element exists in DOM
# Note: Modal won't be visible yet (needs CSS and JS)
```

- [ ] **Step 4: Commit**

```bash
git add pedro/index.html
git commit -m "feat: add settings modal HTML structure

- Add settings button to header
- Add modal markup with theme selector
- Modal functionality to be implemented next"
```

---

### Task 2.4: Add Settings Modal CSS

**Goal:** Style the settings modal and theme selector

**Files:**
- Modify: `pedro/styles.css` (add modal and settings styles)

- [ ] **Step 1: Add settings button styles**

In `pedro/styles.css`, add after the header styles:

```css
.settings-btn {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  padding: 8px;
  transition: transform 0.2s;
  margin-left: auto;
}

.settings-btn:hover {
  transform: scale(1.1);
}

.settings-btn:active {
  transform: scale(0.95);
}
```

- [ ] **Step 2: Add modal base styles**

Add before the scrollbar styles:

```css
/* ===== MODAL ===== */
.modal {
  display: none;
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.8);
  z-index: 200;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(8px);
  padding: 20px;
}

.modal.active {
  display: flex;
}

.modal-content {
  background: var(--bg-card);
  border-radius: 24px;
  padding: 28px 24px;
  max-width: 600px;
  width: 100%;
  max-height: 85vh;
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(0,0,0,0.5);
}

.modal-content h2 {
  font-size: 24px;
  font-weight: 900;
  color: var(--accent-yellow);
  margin-bottom: 24px;
  text-align: center;
}
```

- [ ] **Step 3: Add settings panel styles**

```css
.setting-group {
  margin-bottom: 28px;
  padding-bottom: 24px;
  border-bottom: 1px solid rgba(255,255,255,0.1);
}

.setting-group:last-child {
  border-bottom: none;
  margin-bottom: 0;
}

.setting-group h3 {
  font-size: 18px;
  color: var(--accent-yellow);
  margin-bottom: 16px;
  font-weight: 800;
}
```

- [ ] **Step 4: Add theme selector styles**

```css
.theme-options {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 12px;
}

.theme-option {
  background: rgba(255,255,255,0.05);
  border-radius: 12px;
  padding: 12px;
  cursor: pointer;
  transition: all 0.2s;
  border: 3px solid transparent;
}

.theme-option:hover {
  background: rgba(255,255,255,0.1);
  transform: translateY(-2px);
}

.theme-option.selected {
  border-color: var(--accent-green);
  background: rgba(78,205,196,0.15);
}

.theme-colors {
  display: flex;
  gap: 4px;
  margin-bottom: 8px;
  height: 40px;
}

.theme-colors span {
  flex: 1;
  border-radius: 6px;
  border: 1px solid rgba(0,0,0,0.2);
}

.theme-name {
  font-size: 13px;
  font-weight: 700;
  text-align: center;
  color: var(--text-primary);
}
```

- [ ] **Step 5: Add modal close button styles**

```css
.modal-close-btn {
  width: 100%;
  background: linear-gradient(135deg, var(--accent-orange), var(--accent-pink));
  border: none;
  color: white;
  font-family: 'Nunito', sans-serif;
  font-weight: 900;
  font-size: 16px;
  padding: 14px;
  border-radius: 14px;
  cursor: pointer;
  margin-top: 16px;
  transition: transform 0.2s;
}

.modal-close-btn:hover {
  transform: scale(1.02);
}

.modal-close-btn:active {
  transform: scale(0.98);
}
```

- [ ] **Step 6: Test modal appearance**

```bash
cd pedro
python3 -m http.server 8000
# Browser console:
document.getElementById('settings-modal').classList.add('active');
# Verify: Modal appears centered with backdrop
# Verify: Theme options display with color swatches
# Note: Click handlers not yet implemented
```

- [ ] **Step 7: Commit**

```bash
git add pedro/styles.css
git commit -m "feat: add settings modal CSS

- Style settings button in header
- Add modal overlay and content styles
- Style theme selector with color swatches
- Add close button styling"
```

---

### Task 2.5: Implement Settings Modal Functions

**Goal:** Add open/close and theme selection functions

**Files:**
- Modify: `pedro/app.js` (add modal and theme selection functions)

- [ ] **Step 1: Add modal open/close functions**

In `pedro/app.js`, after the theme functions, add:

```javascript
// ============================================================
// SETTINGS MODAL
// ============================================================
function openSettings() {
  const modal = document.getElementById('settings-modal');
  modal.classList.add('active');

  // Highlight current theme
  const settings = getSettings();
  document.querySelectorAll('.theme-option').forEach(opt => {
    if (opt.dataset.theme === settings.theme) {
      opt.classList.add('selected');
    } else {
      opt.classList.remove('selected');
    }
  });
}

function closeSettings() {
  const modal = document.getElementById('settings-modal');
  modal.classList.remove('active');
}

function selectTheme(element) {
  const themeName = element.dataset.theme;

  // Update selection visual
  document.querySelectorAll('.theme-option').forEach(opt => {
    opt.classList.remove('selected');
  });
  element.classList.add('selected');

  // Apply theme
  setTheme(themeName);
}
```

- [ ] **Step 2: Add backdrop click to close**

Update the modal HTML onclick in `index.html`:

```html
<div id="settings-modal" class="modal" onclick="if(event.target === this) closeSettings()">
```

- [ ] **Step 3: Test settings modal**

```bash
cd pedro
python3 -m http.server 8000
# Click settings button (⚙️) in header
# Verify: Modal opens
# Click each theme option
# Verify: Theme switches immediately, option highlights
# Click backdrop
# Verify: Modal closes
# Reload page
# Verify: Selected theme persists
```

- [ ] **Step 4: Commit**

```bash
git add pedro/app.js pedro/index.html
git commit -m "feat: implement settings modal functionality

- Add openSettings and closeSettings functions
- Implement theme selection with visual feedback
- Add backdrop click to close modal
- Theme changes apply immediately"
```

---

## Chunk 3: New Personalities

### Task 3.1: Add New Personalities (Part 1/2)

**Goal:** Add 5 new personalities to personalities.js

**Files:**
- Modify: `pedro/personalities.js` (append 5 personalities to array)

- [ ] **Step 1: Add Leslie Knope**

In `pedro/personalities.js`, after the last existing personality (Yoda), add:

```javascript
  {
    name: "Leslie Knope",
    emoji: "📋",
    greeting: "You are a beautiful, talented, brilliant, powerful musk ox!",
    encourage: [
      "Write that task down! Binders are life!",
      "We have to remember what's important in life: friends, waffles, tasks.",
      "I'm big enough to admit I'm often inspired by myself. You should be too!",
      "This task is getting DONE. No question.",
      "Why would anybody ever complete anything? Oh right, BECAUSE IT FEELS AMAZING!"
    ],
    praise: [
      "That's what overachievers DO! Amazing!",
      "You beautiful, rule-following enthusiast!",
      "That task just got Knope'd!",
      "I love you and I LIKE you for doing that!",
      "You are now a member of the elite Task Champions Club!"
    ]
  },
```

- [ ] **Step 2: Add Keanu Reeves**

```javascript
  {
    name: "Keanu Reeves",
    emoji: "🏍️",
    greeting: "Whoa. You can do this. You're breathtaking.",
    encourage: [
      "Be excellent to yourself. Do the task.",
      "Every task is a journey. Let's take the first step.",
      "You're breathtaking. Now show that task who's boss.",
      "I know kung fu. And I know you can do this.",
      "The task chose you. It's time to answer."
    ],
    praise: [
      "You're breathtaking. Seriously.",
      "That was some Matrix-level task completion.",
      "Excellent work, dude. Most excellent.",
      "You just did a John Wick on that task.",
      "Whoa. That was amazing."
    ]
  },
```

- [ ] **Step 3: Add Beyoncé**

```javascript
  {
    name: "Beyoncé",
    emoji: "👑",
    greeting: "Okay ladies, now let's get in formation and FINISH THESE TASKS.",
    encourage: [
      "Who run the world? You. Now prove it.",
      "I'm not bossy, I'm the boss. You're the boss of this task.",
      "If you liked it then you shoulda put a checkmark on it.",
      "Okay, now let's get in formation and DO THIS TASK.",
      "You wake up like this. Flawless. Now finish flawlessly."
    ],
    praise: [
      "Flawless. Absolutely flawless.",
      "You just put a ring on that task!",
      "Who run the world? TASKS! (That you just completed.)",
      "Bow down, task. Bow DOWN.",
      "Feeling myself, and you should too after that!"
    ]
  },
```

- [ ] **Step 4: Add Bob Belcher**

```javascript
  {
    name: "Bob Belcher",
    emoji: "🍔",
    greeting: "Oh my god. You did the thing. I'm so proud of you.",
    encourage: [
      "Alright, let's flip this task like a burger.",
      "You're doing great, buddy. I believe in you.",
      "This task is like a good burger. Just take it one ingredient at a time.",
      "Lin would be so proud. I'M so proud. Do the task.",
      "Oh my god, you can do this. I know you can."
    ],
    praise: [
      "That's my little task champion!",
      "Oh my god, you actually did it. I love you.",
      "That was beautiful. Like a perfectly cooked burger.",
      "You did it, buddy. I'm so proud.",
      "That's a five-star task completion right there."
    ]
  },
```

- [ ] **Step 5: Add Michelle Obama**

```javascript
  {
    name: "Michelle Obama",
    emoji: "💪",
    greeting: "When they go low, we complete tasks.",
    encourage: [
      "Success isn't about how much money you make; it's about the tasks you complete.",
      "There is no limit to what we can accomplish.",
      "When they go low, we go high. And we finish tasks.",
      "Your story is what you have, what you will always have. Make it count.",
      "Am I good enough? Yes, you are. Now do the task."
    ],
    praise: [
      "That's what I call going high!",
      "You are setting an example for everyone.",
      "Becoming is better than being. And you're becoming a task champion.",
      "That's the kind of excellence we need in this world.",
      "I am so proud of the work you're doing."
    ]
  },
```

- [ ] **Step 6: Test new personalities appear**

```bash
cd pedro
python3 -m http.server 8000
# Click personality banner to open roller
# Click SPIN multiple times
# Verify: New personalities (Leslie, Keanu, Beyoncé, Bob, Michelle) appear in roller
# Verify: Messages display correctly when selected
```

- [ ] **Step 7: Commit**

```bash
git add pedro/personalities.js
git commit -m "feat: add 5 new personalities (part 1/2)

- Leslie Knope 📋
- Keanu Reeves 🏍️
- Beyoncé 👑
- Bob Belcher 🍔
- Michelle Obama 💪

Total personalities: 23/28"
```

---

### Task 3.2: Add New Personalities (Part 2/2)

**Goal:** Add remaining 5 personalities

**Files:**
- Modify: `pedro/personalities.js` (append 5 more personalities)

- [ ] **Step 1: Add Terry Crews**

In `pedro/personalities.js`, after Michelle Obama, add:

```javascript
  {
    name: "Terry Crews",
    emoji: "💪",
    greeting: "TERRY LOVES PRODUCTIVITY! TERRY LOVES TASKS!",
    encourage: [
      "TERRY SAYS DO IT NOW!",
      "POWER! TASKS! TERRY LOVES THIS!",
      "TERRY BELIEVES IN YOU! TERRY BELIEVES IN THIS TASK!",
      "MUSCLES AND TASKS! BOTH NEED WORK! LET'S GO!",
      "TERRY IS WATCHING! TERRY WANTS TO SEE SUCCESS!"
    ],
    praise: [
      "TERRY IS SO PROUD OF YOU!",
      "THAT'S WHAT TERRY'S TALKING ABOUT!",
      "TERRY LOVES IT! TERRY LOVES WATCHING YOU WIN!",
      "POWER MOVES! TERRY APPROVES!",
      "YES! THAT'S HOW YOU DO IT! TERRY IS IMPRESSED!"
    ]
  },
```

- [ ] **Step 2: Add Lizzo**

```javascript
  {
    name: "Lizzo",
    emoji: "🎤",
    greeting: "100% that task. You better do it, 'cause you deserve it.",
    encourage: [
      "If you can love me, you can love this task!",
      "You are 100% that productive person!",
      "Feeling good as hell? You will after this task!",
      "It's about damn time you did this task!",
      "Juice? Check. Task? About to be checked!"
    ],
    praise: [
      "DNA test says you're 100% THAT COMPLETER!",
      "Truth hurts, and that task is DONE!",
      "Feeling good as HELL after that completion!",
      "That's what happens when you love yourself AND finish tasks!",
      "Mirror, mirror on the wall, who's the task-completin'est of them all? YOU!"
    ]
  },
```

- [ ] **Step 3: Add Wednesday Addams**

```javascript
  {
    name: "Wednesday Addams",
    emoji: "🖤",
    greeting: "I'm not perky. But I do finish tasks.",
    encourage: [
      "I'll stop wearing black when they make a darker color. Do the task.",
      "This task is like a small death. Embrace it.",
      "I'm not perky. This task isn't fun. But it must be done.",
      "Normal is an illusion. Finishing tasks is reality.",
      "I find death mildly amusing. I find task completion... acceptable."
    ],
    praise: [
      "I'm having the time of my life. Said no one. Except you just finished a task.",
      "Morbidly impressive.",
      "Well done. I'm as impressed as I ever am, which is slightly.",
      "The task is dead. You killed it. Good.",
      "That was almost... adequate."
    ]
  },
```

- [ ] **Step 4: Add MrBeast**

```javascript
  {
    name: "MrBeast",
    emoji: "💰",
    greeting: "I just gave away $1 MILLION to the person who completes this task!",
    encourage: [
      "LAST PERSON TO STOP DOING TASKS WINS $10,000!",
      "This is INSANE! You're actually doing it!",
      "I'm about to give away a HOUSE to whoever finishes this task!",
      "We're doing the BIGGEST task challenge EVER!",
      "Every task you complete, I donate $1000 to charity! GO!"
    ],
    praise: [
      "OH MY GOD YOU WON! YOU FINISHED THE TASK!",
      "Congratulations! You just earned... SATISFACTION!",
      "THAT'S CRAZY! I can't believe you actually did it!",
      "This is the most INSANE task completion I've ever seen!",
      "You just won the ULTIMATE task challenge! LEGENDARY!"
    ]
  },
```

- [ ] **Step 5: Add Ron Swanson**

```javascript
  {
    name: "Ron Swanson",
    emoji: "🥃",
    greeting: "Never half-ass two things. Whole-ass one thing.",
    encourage: [
      "Don't half-ass it. Whole-ass that task.",
      "There is no problem that bacon, eggs, and a finished task can't solve.",
      "I know more than you. I know you can do this task.",
      "The government can't do this task for you. You must.",
      "Crying is acceptable at funerals and when tasks are incomplete. Fix one of those."
    ],
    praise: [
      "That's a whole-assed task completion.",
      "I know more than you. And I know you just did good.",
      "Give a man a fish, he eats for a day. Teach a man to complete tasks, you fed him forever.",
      "That was the most productive thing I've seen all day.",
      "Clear alcohols are for rich women on diets. Finished tasks are for everyone."
    ]
  }
```

- [ ] **Step 6: Test all 28 personalities**

```bash
cd pedro
python3 -m http.server 8000
# Click personality banner, spin roller 20+ times
# Verify: All 10 new personalities appear
# Verify: Original 18 personalities still work
# Add a task
# Verify: Encouragement message displays
# Complete a task
# Verify: Praise message displays
```

- [ ] **Step 7: Commit**

```bash
git add pedro/personalities.js
git commit -m "feat: add 5 new personalities (part 2/2)

- Terry Crews 💪
- Lizzo 🎤
- Wednesday Addams 🖤
- MrBeast 💰
- Ron Swanson 🥃

Total personalities: 28 complete"
```

---

## Chunk 4: Celebration System - Confetti & Sounds

### Task 4.1: Create celebrations.js with Confetti

**Goal:** Implement CSS confetti animation in new file

**Files:**
- Create: `pedro/celebrations.js`
- Modify: `pedro/index.html` (add script tag)

- [ ] **Step 1: Create celebrations.js with confetti function**

Create `pedro/celebrations.js`:

```javascript
// ============================================================
// CELEBRATIONS
// ============================================================

/**
 * Triggers CSS confetti animation
 * Creates 50 colored particles that fall from top to bottom
 */
function triggerConfetti() {
  const colors = [
    'var(--accent-orange)',
    'var(--accent-green)',
    'var(--accent-pink)',
    'var(--accent-yellow)'
  ];

  // Get computed color values (CSS variables resolve to actual colors)
  const style = getComputedStyle(document.body);
  const resolvedColors = colors.map(c => {
    const varName = c.match(/var\((.*?)\)/)[1];
    return style.getPropertyValue(varName).trim();
  });

  const container = document.createElement('div');
  container.className = 'confetti-container';
  document.body.appendChild(container);

  for (let i = 0; i < 50; i++) {
    const piece = document.createElement('div');
    piece.className = 'confetti-piece';
    piece.style.left = Math.random() * 100 + '%';
    piece.style.background = resolvedColors[Math.floor(Math.random() * resolvedColors.length)];
    piece.style.width = (Math.random() * 10 + 5) + 'px';
    piece.style.height = piece.style.width;
    piece.style.animation = `confetti-fall ${Math.random() * 2 + 2}s linear forwards`;
    piece.style.animationDelay = Math.random() * 0.3 + 's';

    container.appendChild(piece);
  }

  // Cleanup after animation completes
  setTimeout(() => container.remove(), 5000);
}
```

- [ ] **Step 2: Add confetti CSS to styles.css**

In `pedro/styles.css`, add before the scrollbar styles:

```css
/* ===== CONFETTI ===== */
.confetti-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 9998;
  overflow: hidden;
}

.confetti-piece {
  position: absolute;
  top: -20px;
}

@keyframes confetti-fall {
  0% {
    transform: translateY(0) rotate(0deg);
    opacity: 1;
  }
  100% {
    transform: translateY(100vh) rotate(720deg);
    opacity: 0;
  }
}
```

- [ ] **Step 3: Add script tag to index.html**

In `pedro/index.html`, update script loading order:

```html
<script src="personalities.js"></script>
<script src="celebrations.js"></script>
<script src="app.js"></script>
```

- [ ] **Step 4: Test confetti manually**

```bash
cd pedro
python3 -m http.server 8000
# Browser console:
triggerConfetti();
# Verify: 50 colored particles fall from top to bottom
# Verify: Colors match current theme
# Change theme and test:
setTheme('light-clean');
triggerConfetti();
# Verify: Confetti colors update to light theme colors
```

- [ ] **Step 5: Commit**

```bash
git add pedro/celebrations.js pedro/styles.css pedro/index.html
git commit -m "feat: add confetti celebration animation

- Create celebrations.js with triggerConfetti function
- Add CSS for confetti container and animation
- Confetti uses theme-aware colors
- 50 particles fall with rotation"
```

---

### Task 4.2: Add Web Audio Sound Effects

**Goal:** Implement 5 sound types using Web Audio API

**Files:**
- Modify: `pedro/celebrations.js` (add sound generation functions)

- [ ] **Step 1: Add audio context and playSound function**

In `pedro/celebrations.js`, after triggerConfetti, add:

```javascript
// ============================================================
// SOUND EFFECTS
// ============================================================

// Audio context (initialized on first sound play to avoid autoplay restrictions)
let audioContext = null;

function getAudioContext() {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }
  return audioContext;
}

/**
 * Play celebration sound
 * @param {string} type - 'chime' | 'fanfare' | 'pop' | 'coins' | 'woohoo' | 'none'
 * @param {number} volume - 0-100
 */
function playSound(type, volume) {
  if (type === 'none') return;

  try {
    const ctx = getAudioContext();
    const vol = volume / 100; // Convert 0-100 to 0-1
    const now = ctx.currentTime;

    switch(type) {
      case 'chime':
        playChime(ctx, now, vol);
        break;
      case 'fanfare':
        playFanfare(ctx, now, vol);
        break;
      case 'pop':
        playPop(ctx, now, vol);
        break;
      case 'coins':
        playCoins(ctx, now, vol);
        break;
      case 'woohoo':
        playWoohoo(ctx, now, vol);
        break;
    }
  } catch(e) {
    // Web Audio not supported or failed - fail silently
    console.warn('Sound playback failed:', e);
  }
}
```

- [ ] **Step 2: Add chime sound**

```javascript
function playChime(ctx, startTime, volume) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.frequency.value = 800;
  osc.type = 'sine';

  gain.gain.setValueAtTime(volume * 0.3, startTime);
  gain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.5);

  osc.start(startTime);
  osc.stop(startTime + 0.5);
}
```

- [ ] **Step 3: Add fanfare sound**

```javascript
function playFanfare(ctx, startTime, volume) {
  const notes = [523.25, 659.25, 783.99]; // C, E, G
  notes.forEach((freq, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.frequency.value = freq;
    osc.type = 'triangle';

    const noteStart = startTime + (i * 0.15);
    gain.gain.setValueAtTime(volume * 0.2, noteStart);
    gain.gain.exponentialRampToValueAtTime(0.01, noteStart + 0.3);

    osc.start(noteStart);
    osc.stop(noteStart + 0.3);
  });
}
```

- [ ] **Step 4: Add pop sound**

```javascript
function playPop(ctx, startTime, volume) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.frequency.setValueAtTime(200, startTime);
  osc.frequency.exponentialRampToValueAtTime(100, startTime + 0.1);
  osc.type = 'sine';

  gain.gain.setValueAtTime(volume * 0.5, startTime);
  gain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.1);

  osc.start(startTime);
  osc.stop(startTime + 0.1);
}
```

- [ ] **Step 5: Add coins sound**

```javascript
function playCoins(ctx, startTime, volume) {
  for (let i = 0; i < 3; i++) {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.frequency.value = 1200 + (i * 100);
    osc.type = 'square';

    const coinStart = startTime + (i * 0.08);
    gain.gain.setValueAtTime(volume * 0.15, coinStart);
    gain.gain.exponentialRampToValueAtTime(0.01, coinStart + 0.1);

    osc.start(coinStart);
    osc.stop(coinStart + 0.1);
  }
}
```

- [ ] **Step 6: Add woohoo sound**

```javascript
function playWoohoo(ctx, startTime, volume) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.frequency.setValueAtTime(300, startTime);
  osc.frequency.exponentialRampToValueAtTime(800, startTime + 0.3);
  osc.type = 'sawtooth';

  gain.gain.setValueAtTime(volume * 0.2, startTime);
  gain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.4);

  osc.start(startTime);
  osc.stop(startTime + 0.4);
}
```

- [ ] **Step 7: Test all sounds**

```bash
cd pedro
python3 -m http.server 8000
# Browser console:
playSound('chime', 70);
# Verify: Bell tone plays
playSound('fanfare', 70);
# Verify: Three ascending notes play
playSound('pop', 70);
# Verify: Quick burst sound
playSound('coins', 70);
# Verify: Coin "cha-ching" sound
playSound('woohoo', 70);
# Verify: Rising pitch celebration
playSound('chime', 30);
# Verify: Quieter chime
playSound('chime', 100);
# Verify: Louder chime
```

- [ ] **Step 8: Commit**

```bash
git add pedro/celebrations.js
git commit -m "feat: add Web Audio sound effects

- Implement 5 sound types: chime, fanfare, pop, coins, woohoo
- Use Web Audio API for zero file size
- Volume control (0-100)
- Graceful fallback if Web Audio unsupported"
```

---

## Chunk 5: Pedro GIF & Celebration Integration

### Task 5.1: Source Pedro GIF

**Goal:** Find and optimize Pedro raccoon meme GIF

**Files:**
- Create: `pedro/assets/pedro-walk.gif` (or prepare fallback)

- [ ] **Step 1: Create assets directory**

```bash
mkdir -p pedro/assets
```

- [ ] **Step 2: Search for Pedro GIF**

Search online for "Pedro raccoon meme GIF walking" or "Pedro raccoon meme dramatic walk"

Sources to try:
- Giphy.com
- Tenor.com
- Know Your Meme
- Google Images (filter by GIF)

Target specs:
- Animated GIF showing Pedro walking
- Ideally 2-3 seconds loop
- Width: ~120-200px
- File size: <500KB

- [ ] **Step 3: Optimize GIF if found**

If GIF is too large, optimize with ezgif.com:
1. Upload GIF
2. Resize to width 150px (maintain aspect ratio)
3. Optimize (lossy compression ~30%)
4. Download optimized version

- [ ] **Step 4: Save GIF or note fallback**

If GIF found and optimized:
```bash
# Save as pedro/assets/pedro-walk.gif
```

If NO suitable GIF found:
```bash
# Note: Will use emoji fallback 🦝
# Skip creating pedro-walk.gif file
```

- [ ] **Step 5: Commit (if GIF added)**

```bash
git add pedro/assets/pedro-walk.gif
git commit -m "feat: add Pedro raccoon meme GIF

- Optimized to <500KB
- 150px width
- Will display during task completion celebrations"
```

OR (if using fallback):

```bash
# No commit needed - emoji fallback requires no assets
```

---

### Task 5.2: Add Pedro Walk Animation

**Goal:** Implement Pedro GIF/emoji walking across screen

**Files:**
- Modify: `pedro/celebrations.js` (add triggerPedroWalk function)
- Modify: `pedro/styles.css` (add pedro overlay styles)

- [ ] **Step 1: Add Pedro walk function to celebrations.js**

In `pedro/celebrations.js`, after the sound functions, add:

```javascript
// ============================================================
// PEDRO WALK ANIMATION
// ============================================================

/**
 * Trigger Pedro raccoon walking across screen
 * Uses GIF if available, emoji fallback if not
 */
function triggerPedroWalk() {
  const overlay = document.createElement('div');
  overlay.className = 'pedro-overlay';

  const pedro = document.createElement('img');
  pedro.className = 'pedro-walk';
  pedro.alt = 'Dancing Pedro';

  // Try to load GIF, fall back to emoji if fails
  pedro.src = 'assets/pedro-walk.gif';

  pedro.onerror = function() {
    // GIF failed to load - use emoji fallback
    overlay.innerHTML = '<div class="pedro-walk pedro-emoji">🦝</div>';
  };

  overlay.appendChild(pedro);
  document.body.appendChild(overlay);

  // Remove after animation completes
  setTimeout(() => overlay.remove(), 3500);
}
```

- [ ] **Step 2: Add Pedro overlay CSS**

In `pedro/styles.css`, add after confetti styles:

```css
/* ===== PEDRO WALK ANIMATION ===== */
.pedro-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 9999;
}

.pedro-walk {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  animation: pedro-walk-across 3.5s ease-in-out;
}

.pedro-walk img, .pedro-walk.pedro-emoji {
  width: 120px;
  height: auto;
}

.pedro-emoji {
  font-size: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
}

@keyframes pedro-walk-across {
  0% {
    left: -150px;
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    left: 100%;
    opacity: 0;
  }
}
```

- [ ] **Step 3: Test Pedro walk**

```bash
cd pedro
python3 -m http.server 8000
# Browser console:
triggerPedroWalk();
# If GIF exists: Verify Pedro GIF walks from left to right
# If no GIF: Verify 🦝 emoji walks from left to right
# Verify: Animation takes ~3.5 seconds
# Verify: Pedro fades in/out smoothly
```

- [ ] **Step 4: Commit**

```bash
git add pedro/celebrations.js pedro/styles.css
git commit -m "feat: add Pedro walk animation

- Pedro walks across screen on celebration
- Uses GIF if available, emoji fallback otherwise
- 3.5 second animation with fade in/out
- Positioned at center vertical"
```

---

### Task 5.3: Add Master Celebration Function

**Goal:** Create unified celebrate() function that triggers all effects

**Files:**
- Modify: `pedro/celebrations.js` (add celebrate function at top)

- [ ] **Step 1: Add celebrate function**

In `pedro/celebrations.js`, after the opening comment and before triggerConfetti, add:

```javascript
/**
 * Master celebration function
 * Triggers confetti, Pedro walk, and sound based on settings
 * @param {Object} settings - User settings object
 */
function celebrate(settings) {
  if (!settings.celebrationsEnabled) return;

  if (settings.confettiEnabled) {
    triggerConfetti();
  }

  if (settings.pedroEnabled) {
    triggerPedroWalk();
  }

  if (settings.soundsEnabled && settings.soundType !== 'none') {
    playSound(settings.soundType, settings.volume);
  }
}
```

- [ ] **Step 2: Test celebrate function**

```bash
cd pedro
python3 -m http.server 8000
# Browser console:
const testSettings = {
  celebrationsEnabled: true,
  confettiEnabled: true,
  pedroEnabled: true,
  soundsEnabled: true,
  soundType: 'chime',
  volume: 70
};
celebrate(testSettings);
# Verify: Confetti falls, Pedro walks, chime plays

# Test with different sound:
testSettings.soundType = 'woohoo';
celebrate(testSettings);
# Verify: Woohoo sound plays

# Test with disabled components:
testSettings.confettiEnabled = false;
celebrate(testSettings);
# Verify: No confetti, but Pedro and sound still work

testSettings.celebrationsEnabled = false;
celebrate(testSettings);
# Verify: Nothing happens
```

- [ ] **Step 3: Commit**

```bash
git add pedro/celebrations.js
git commit -m "feat: add master celebrate function

- Unified function to trigger all celebration effects
- Respects individual setting toggles
- Gracefully handles disabled celebrations"
```

---

### Task 5.4: Integrate Celebrations with Task Completion

**Goal:** Call celebrate() when tasks are completed

**Files:**
- Modify: `pedro/app.js` (update toggleTask function, add shouldCelebrate logic)

- [ ] **Step 1: Add completedTasksCount to state**

In `pedro/app.js`, update the state object:

```javascript
let state = {
  tasks: [],
  personality: null,
  personalityDate: null,
  completedTasksCount: 0  // NEW
};
```

- [ ] **Step 2: Update saveState to persist completedTasksCount**

Verify saveState includes completedTasksCount (it should automatically via JSON.stringify)

- [ ] **Step 3: Add shouldCelebrate function**

After the celebrate function definitions (before toggleTask), add:

```javascript
// ============================================================
// CELEBRATION TIMING
// ============================================================

/**
 * Determine if this task completion should trigger celebration
 * @param {number} completedCount - Total completed tasks count
 * @param {number} remainingTasks - Number of incomplete tasks left
 * @param {string} timing - Timing mode ('smart', 'every', 'random', 'milestones')
 */
function shouldCelebrate(completedCount, remainingTasks, timing) {
  switch(timing) {
    case 'every':
      return true;

    case 'random':
      return Math.random() < 0.5;

    case 'milestones':
      return completedCount % 5 === 0;

    case 'smart':
    default:
      // Always celebrate first task
      if (completedCount === 1) return true;

      // Always celebrate last task
      if (remainingTasks === 0) return true;

      // Random 50% for tasks in between
      return Math.random() < 0.5;
  }
}
```

- [ ] **Step 4: Update toggleTask to trigger celebrations**

Find the toggleTask function and update it:

```javascript
function toggleTask(id) {
  const task = state.tasks.find(t => t.id === id);
  if (!task) return;

  task.done = !task.done;

  if (task.done) {
    state.completedTasksCount++;

    const remainingTasks = state.tasks.filter(t => !t.done).length;
    const settings = getSettings();

    // Trigger celebration if conditions met
    if (shouldCelebrate(state.completedTasksCount, remainingTasks, settings.celebrationTiming)) {
      celebrate(settings);
    }

    // Show personality praise toast
    if (state.personality) {
      const msgs = state.personality.praise;
      showToast(`${state.personality.emoji} ${msgs[Math.floor(Math.random() * msgs.length)]}`);
    }
  }

  saveState();
  renderTasks();
}
```

- [ ] **Step 5: Test celebration integration**

```bash
cd pedro
python3 -m http.server 8000
# Add 5 tasks
# Complete first task
# Verify: Celebration triggers (confetti, Pedro, sound, toast)
# Complete second task
# Verify: Random chance (may or may not celebrate)
# Complete remaining tasks until last one
# Verify: Last task always celebrates

# Test settings respect:
# Open settings, disable confetti
# Complete a task
# Verify: Pedro and sound play, but no confetti

# Open settings, set timing to "Every Task"
# Complete tasks
# Verify: Every completion celebrates

# Set timing to "Milestones"
# Add 10 tasks, complete them
# Verify: Celebrations at 5, 10, 15, etc.
```

- [ ] **Step 6: Commit**

```bash
git add pedro/app.js
git commit -m "feat: integrate celebrations with task completion

- Add completedTasksCount to state
- Implement shouldCelebrate with 4 timing modes
- Call celebrate() when tasks completed
- Smart mode: always first/last, random between
- Respects celebration settings"
```

---

## Chunk 6: Settings Panel Completion

### Task 6.1: Add Celebration Settings UI

**Goal:** Add celebration toggle and timing options to settings modal

**Files:**
- Modify: `pedro/index.html` (add celebration settings markup)

- [ ] **Step 1: Add celebration master toggle**

In `pedro/index.html`, in the settings modal, after the theme section and before the close button, add:

```html
<!-- Celebration Master Toggle -->
<div class="setting-group">
  <div class="setting-row">
    <div class="setting-label">
      <div class="setting-label-main">🎊 Enable Celebrations</div>
      <div class="setting-label-sub">Show confetti and Pedro animations when completing tasks</div>
    </div>
    <div class="toggle-switch">
      <input type="checkbox" id="celebrations-toggle" checked onchange="toggleSetting('celebrationsEnabled', this.checked)">
      <span class="toggle-slider"></span>
    </div>
  </div>
</div>
```

- [ ] **Step 2: Add celebration timing section**

```html
<!-- Celebration Timing -->
<div class="setting-group">
  <h3>⏰ When to Celebrate</h3>
  <div class="radio-group">
    <div class="radio-option" data-value="smart" onclick="selectTiming(this)">
      <div class="radio-circle"></div>
      <div class="radio-label">
        <div class="radio-label-main">Smart Mode</div>
        <div class="radio-label-sub">Always: first & last task. Random: tasks in between.</div>
      </div>
    </div>
    <div class="radio-option" data-value="every" onclick="selectTiming(this)">
      <div class="radio-circle"></div>
      <div class="radio-label">
        <div class="radio-label-main">Every Task</div>
        <div class="radio-label-sub">Maximum dopamine! Celebrate everything.</div>
      </div>
    </div>
    <div class="radio-option" data-value="random" onclick="selectTiming(this)">
      <div class="radio-circle"></div>
      <div class="radio-label">
        <div class="radio-label-main">Random (50% chance)</div>
        <div class="radio-label-sub">Keeps it special and unexpected.</div>
      </div>
    </div>
    <div class="radio-option" data-value="milestones" onclick="selectTiming(this)">
      <div class="radio-circle"></div>
      <div class="radio-label">
        <div class="radio-label-main">Milestones Only</div>
        <div class="radio-label-sub">Celebrate every 5 tasks completed.</div>
      </div>
    </div>
  </div>
</div>
```

- [ ] **Step 3: Add confetti toggle**

```html
<!-- Confetti Toggle -->
<div class="setting-group">
  <div class="setting-row">
    <div class="setting-label">
      <div class="setting-label-main">🎊 Show Confetti</div>
      <div class="setting-label-sub">Colorful particles burst on screen</div>
    </div>
    <div class="toggle-switch">
      <input type="checkbox" id="confetti-toggle" checked onchange="toggleSetting('confettiEnabled', this.checked)">
      <span class="toggle-slider"></span>
    </div>
  </div>
</div>
```

- [ ] **Step 4: Add Pedro animation toggle**

```html
<!-- Pedro Animation Toggle -->
<div class="setting-group">
  <div class="setting-row">
    <div class="setting-label">
      <div class="setting-label-main">🦝 Show Dancing Pedro</div>
      <div class="setting-label-sub">Pedro walks across screen celebrating with you</div>
    </div>
    <div class="toggle-switch">
      <input type="checkbox" id="pedro-toggle" checked onchange="toggleSetting('pedroEnabled', this.checked)">
      <span class="toggle-slider"></span>
    </div>
  </div>
</div>
```

- [ ] **Step 5: Verify HTML structure**

```bash
cd pedro
python3 -m http.server 8000
# Open settings modal
# Verify: New sections appear (no styling/function yet)
```

- [ ] **Step 6: Commit**

```html
git add pedro/index.html
git commit -m "feat: add celebration settings UI

- Add master celebrations toggle
- Add timing mode selector (4 options)
- Add confetti toggle
- Add Pedro animation toggle
- Functionality to be implemented next"
```

---

### Task 6.2: Add Sound Settings UI

**Goal:** Add sound toggle, type selector, and volume slider

**Files:**
- Modify: `pedro/index.html` (add sound settings markup)

- [ ] **Step 1: Add sound master toggle**

In settings modal, after Pedro toggle, add:

```html
<!-- Sound Effects -->
<div class="setting-group">
  <div class="setting-row">
    <div class="setting-label">
      <div class="setting-label-main">🔊 Play Sound Effects</div>
      <div class="setting-label-sub">Audio feedback when completing tasks</div>
    </div>
    <div class="toggle-switch">
      <input type="checkbox" id="sounds-toggle" checked onchange="toggleSetting('soundsEnabled', this.checked)">
      <span class="toggle-slider"></span>
    </div>
  </div>

  <!-- Sound Type Selector -->
  <div class="sound-options">
    <div class="sound-card" data-sound="chime" onclick="selectSound(this)">
      <div class="sound-icon">🔔</div>
      <div class="sound-name">Chime</div>
      <button class="sound-preview-btn" onclick="event.stopPropagation(); playSound('chime', 70)">▶</button>
    </div>
    <div class="sound-card" data-sound="fanfare" onclick="selectSound(this)">
      <div class="sound-icon">🎺</div>
      <div class="sound-name">Fanfare</div>
      <button class="sound-preview-btn" onclick="event.stopPropagation(); playSound('fanfare', 70)">▶</button>
    </div>
    <div class="sound-card" data-sound="pop" onclick="selectSound(this)">
      <div class="sound-icon">💥</div>
      <div class="sound-name">Pop</div>
      <button class="sound-preview-btn" onclick="event.stopPropagation(); playSound('pop', 70)">▶</button>
    </div>
    <div class="sound-card" data-sound="coins" onclick="selectSound(this)">
      <div class="sound-icon">🪙</div>
      <div class="sound-name">Coins</div>
      <button class="sound-preview-btn" onclick="event.stopPropagation(); playSound('coins', 70)">▶</button>
    </div>
    <div class="sound-card" data-sound="woohoo" onclick="selectSound(this)">
      <div class="sound-icon">🎉</div>
      <div class="sound-name">Woohoo</div>
      <button class="sound-preview-btn" onclick="event.stopPropagation(); playSound('woohoo', 70)">▶</button>
    </div>
    <div class="sound-card" data-sound="none" onclick="selectSound(this)">
      <div class="sound-icon">🔇</div>
      <div class="sound-name">Silent</div>
      <button class="sound-preview-btn" onclick="event.stopPropagation()">-</button>
    </div>
  </div>
</div>
```

- [ ] **Step 2: Add volume slider**

```html
<!-- Volume Control -->
<div class="setting-group">
  <div class="setting-row">
    <div class="setting-label">
      <div class="setting-label-main">🔊 Sound Volume</div>
      <div class="setting-label-sub">Adjust celebration sound volume</div>
    </div>
    <div style="display: flex; align-items: center; gap: 8px;">
      <span style="font-size: 12px; opacity: 0.7;">🔉</span>
      <input type="range" min="0" max="100" value="70" id="volume-slider" oninput="updateVolume(this.value)">
      <span id="volume-value" style="min-width: 35px; text-align: center; font-size: 13px; font-weight: 600;">70%</span>
    </div>
  </div>
</div>
```

- [ ] **Step 3: Verify UI exists**

```bash
cd pedro
python3 -m http.server 8000
# Open settings
# Verify: Sound toggle, 6 sound cards, volume slider appear
# Note: No styling yet
```

- [ ] **Step 4: Commit**

```bash
git add pedro/index.html
git commit -m "feat: add sound settings UI

- Add sound effects toggle
- Add 6 sound type options with preview buttons
- Add volume slider (0-100)
- Styling and functionality next"
```

---

### Task 6.3: Style Settings Panel Components

**Goal:** Add CSS for toggles, radio buttons, and sound cards

**Files:**
- Modify: `pedro/styles.css` (add settings component styles)

- [ ] **Step 1: Add toggle switch styles**

In `pedro/styles.css`, after the modal styles, add:

```css
/* ===== SETTING COMPONENTS ===== */
.setting-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  gap: 16px;
}

.setting-label {
  flex: 1;
}

.setting-label-main {
  font-size: 15px;
  font-weight: 600;
  margin-bottom: 4px;
  color: var(--text-primary);
}

.setting-label-sub {
  font-size: 12px;
  opacity: 0.7;
  line-height: 1.4;
  color: var(--text-secondary);
}

.toggle-switch {
  position: relative;
  width: 50px;
  height: 28px;
  flex-shrink: 0;
}

.toggle-switch input {
  position: absolute;
  opacity: 0;
  width: 100%;
  height: 100%;
  margin: 0;
  cursor: pointer;
  z-index: 2;
}

.toggle-slider {
  position: absolute;
  inset: 0;
  background: var(--text-muted);
  border-radius: 28px;
  cursor: pointer;
  transition: 0.3s;
  z-index: 1;
}

.toggle-slider::before {
  content: '';
  position: absolute;
  width: 22px;
  height: 22px;
  left: 3px;
  bottom: 3px;
  background: white;
  border-radius: 50%;
  transition: 0.3s;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
}

.toggle-switch input:checked + .toggle-slider {
  background: var(--accent-green);
}

.toggle-switch input:checked + .toggle-slider::before {
  transform: translateX(22px);
}
```

- [ ] **Step 2: Add radio button styles**

```css
.radio-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.radio-option {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  background: rgba(255,255,255,0.05);
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s;
  border: 2px solid transparent;
}

.radio-option:hover {
  background: rgba(255,255,255,0.1);
}

.radio-option.selected {
  background: rgba(78,205,196,0.15);
  border-color: var(--accent-green);
}

.radio-circle {
  width: 20px;
  height: 20px;
  border: 2px solid var(--text-secondary);
  border-radius: 50%;
  position: relative;
  flex-shrink: 0;
  transition: all 0.2s;
}

.radio-option.selected .radio-circle {
  border-color: var(--accent-green);
}

.radio-circle::after {
  content: '';
  position: absolute;
  width: 10px;
  height: 10px;
  background: var(--accent-green);
  border-radius: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0);
  transition: transform 0.2s;
}

.radio-option.selected .radio-circle::after {
  transform: translate(-50%, -50%) scale(1);
}

.radio-label {
  flex: 1;
}

.radio-label-main {
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 2px;
  color: var(--text-primary);
}

.radio-label-sub {
  font-size: 12px;
  opacity: 0.7;
  color: var(--text-secondary);
}
```

- [ ] **Step 3: Add sound card styles**

```css
.sound-options {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin-top: 12px;
}

.sound-card {
  background: rgba(255,255,255,0.05);
  border-radius: 10px;
  padding: 12px;
  cursor: pointer;
  transition: all 0.2s;
  border: 2px solid transparent;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
}

.sound-card:hover {
  background: rgba(255,255,255,0.1);
}

.sound-card.selected {
  background: rgba(78,205,196,0.15);
  border-color: var(--accent-green);
}

.sound-icon {
  font-size: 28px;
}

.sound-name {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-primary);
}

.sound-preview-btn {
  background: rgba(255,255,255,0.1);
  border: 1px solid rgba(255,255,255,0.2);
  color: var(--text-primary);
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 11px;
  cursor: pointer;
  font-family: inherit;
  transition: all 0.2s;
}

.sound-preview-btn:hover {
  background: rgba(255,255,255,0.2);
}

.sound-preview-btn:active {
  transform: scale(0.95);
}
```

- [ ] **Step 4: Add volume slider styles**

```css
input[type="range"] {
  width: 120px;
  height: 6px;
  border-radius: 3px;
  background: var(--bg-input);
  outline: none;
  -webkit-appearance: none;
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--accent-green);
  cursor: pointer;
  transition: all 0.2s;
}

input[type="range"]::-webkit-slider-thumb:hover {
  transform: scale(1.2);
}

input[type="range"]::-moz-range-thumb {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--accent-green);
  cursor: pointer;
  border: none;
  transition: all 0.2s;
}

input[type="range"]::-moz-range-thumb:hover {
  transform: scale(1.2);
}
```

- [ ] **Step 5: Test styled components**

```bash
cd pedro
python3 -m http.server 8000
# Open settings modal
# Verify: Toggles styled like iOS switches
# Verify: Radio buttons have circles with center dot when selected
# Verify: Sound cards in 3-column grid with icons
# Verify: Volume slider styled
# Verify: All elements match theme colors
```

- [ ] **Step 6: Commit**

```bash
git add pedro/styles.css
git commit -m "feat: style settings panel components

- Add toggle switch styles (iOS-like)
- Add radio button styles with selection indicator
- Style sound cards in 3-column grid
- Style volume slider with custom thumb
- All components theme-aware"
```

---

### Task 6.4: Implement Settings Panel Functions

**Goal:** Wire up all settings controls to update and persist state

**Files:**
- Modify: `pedro/app.js` (add setting update functions)

- [ ] **Step 1: Add toggle setting function**

In `pedro/app.js`, in the SETTINGS MODAL section, add:

```javascript
function toggleSetting(key, value) {
  updateSetting(key, value);
}
```

- [ ] **Step 2: Add timing selection function**

```javascript
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
```

- [ ] **Step 3: Add sound selection function**

```javascript
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
```

- [ ] **Step 4: Add volume update function**

```javascript
function updateVolume(value) {
  document.getElementById('volume-value').textContent = value + '%';
  updateSetting('volume', parseInt(value));
}
```

- [ ] **Step 5: Update openSettings to restore saved values**

Update the openSettings function:

```javascript
function openSettings() {
  const modal = document.getElementById('settings-modal');
  modal.classList.add('active');

  const settings = getSettings();

  // Highlight current theme
  document.querySelectorAll('.theme-option').forEach(opt => {
    if (opt.dataset.theme === settings.theme) {
      opt.classList.add('selected');
    } else {
      opt.classList.remove('selected');
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
}
```

- [ ] **Step 6: Test all settings controls**

```bash
cd pedro
python3 -m http.server 8000
# Open settings
# Toggle each switch on/off
# Verify: State updates in localStorage
# Select different timing modes
# Verify: Selection persists
# Click different sound types
# Verify: Selection persists
# Click preview buttons
# Verify: Sounds play at current volume
# Adjust volume slider
# Verify: Display updates, setting saves
# Close and reopen settings
# Verify: All selections restored correctly
```

- [ ] **Step 7: Commit**

```bash
git add pedro/app.js
git commit -m "feat: implement settings panel functionality

- Add toggleSetting, selectTiming, selectSound, updateVolume
- Update openSettings to restore saved values
- All settings persist to localStorage
- Changes apply immediately"
```

---

## Chunk 7: Service Worker & Final Integration

### Task 7.1: Update Service Worker Cache

**Goal:** Update sw.js to cache all new files

**Files:**
- Modify: `pedro/sw.js` (update cache name and file list)

- [ ] **Step 1: Update cache version and file list**

In `pedro/sw.js`, update the cache configuration:

```javascript
const CACHE_NAME = 'pedro-v2';
const urlsToCache = [
  './index.html',
  './styles.css',
  './app.js',
  './personalities.js',
  './celebrations.js',
  './manifest.json',
  './icons/pedro-192.png',
  './icons/pedro-512.png',
  './assets/pedro-walk.gif'  // Include only if GIF exists
];
```

If no GIF was added, remove the last line:

```javascript
const urlsToCache = [
  './index.html',
  './styles.css',
  './app.js',
  './personalities.js',
  './celebrations.js',
  './manifest.json',
  './icons/pedro-192.png',
  './icons/pedro-512.png'
];
```

- [ ] **Step 2: Verify service worker installs**

```bash
cd pedro
python3 -m http.server 8000
# Open browser DevTools > Application > Service Workers
# Verify: New service worker installs with version pedro-v2
# Verify: All 8 files (or 9 with GIF) cached
# Go offline (DevTools > Network > Offline)
# Reload page
# Verify: App loads from cache
```

- [ ] **Step 3: Commit**

```bash
git add pedro/sw.js
git commit -m "feat: update service worker for v2

- Bump cache version to pedro-v2
- Add new files to cache list
- Ensures offline functionality with all new features"
```

---

### Task 7.2: Add .gitignore for Assets (if needed)

**Goal:** Ensure assets directory is tracked correctly

**Files:**
- Verify: `.gitignore` (create if doesn't exist)

- [ ] **Step 1: Check if .gitignore exists**

```bash
ls -la /home/evan/PEDRO/.gitignore
```

If it doesn't exist, create it:

```bash
# Create .gitignore if needed
```

- [ ] **Step 2: Verify assets are tracked**

```bash
git status
# Verify: pedro/assets/pedro-walk.gif appears if it exists
# If using emoji fallback, assets/ directory won't exist
```

- [ ] **Step 3: Commit if .gitignore created**

```bash
# Only if .gitignore was created:
git add .gitignore
git commit -m "chore: add gitignore"
```

---

### Task 7.3: Integration Testing

**Goal:** Comprehensive test of all features working together

**Files:**
- None (manual testing)

- [ ] **Step 1: Test theme switching end-to-end**

```bash
cd pedro
python3 -m http.server 8000
# For each theme:
# 1. Open settings, select theme
# 2. Verify: App colors change
# 3. Add and complete task
# 4. Verify: Confetti uses theme colors
# 5. Reload page
# 6. Verify: Theme persists
```

Test all 5 themes: dark-cyberpunk, light-clean, nature, sunset, ocean

- [ ] **Step 2: Test all 28 personalities**

```bash
# Roll personality 30+ times
# Verify: All personalities appear (spot check names)
# For 3-5 personalities:
# - Add task, verify encouragement message
# - Complete task, verify praise message
```

- [ ] **Step 3: Test celebration timing modes**

```bash
# Smart Mode (default):
# - Add 5 tasks
# - Complete first task → Verify: Celebrates
# - Complete middle tasks → Verify: Random (some do, some don't)
# - Complete last task → Verify: Celebrates

# Every Task:
# - Change setting to "Every Task"
# - Complete 3 tasks
# - Verify: All 3 celebrate

# Random:
# - Change to "Random"
# - Complete 10 tasks
# - Verify: ~5 celebrate (roughly 50%)

# Milestones:
# - Change to "Milestones"
# - Complete 15 tasks
# - Verify: Celebrations at task #5, #10, #15
```

- [ ] **Step 4: Test celebration component toggles**

```bash
# Disable confetti:
# - Open settings, turn off confetti
# - Complete task
# - Verify: Pedro and sound play, no confetti

# Disable Pedro:
# - Turn off Pedro animation
# - Complete task
# - Verify: Confetti and sound, no Pedro

# Disable sounds:
# - Turn off sounds
# - Complete task
# - Verify: Confetti and Pedro, no sound

# Disable all celebrations:
# - Turn off master toggle
# - Complete task
# - Verify: No celebration effects (but personality toast still shows)
```

- [ ] **Step 5: Test sound types and volume**

```bash
# For each sound (chime, fanfare, pop, coins, woohoo):
# - Select sound in settings
# - Click preview button
# - Verify: Correct sound plays
# - Complete a task
# - Verify: Selected sound plays

# Test volume:
# - Set volume to 10%
# - Complete task
# - Verify: Sound is quiet
# - Set volume to 100%
# - Complete task
# - Verify: Sound is loud
# - Set volume to 0%
# - Complete task
# - Verify: No sound plays
```

- [ ] **Step 6: Test persistence across reload**

```bash
# Configure unique settings:
# - Theme: Ocean Breeze
# - Timing: Milestones
# - Sound: Woohoo at 50% volume
# - Confetti: Off
# - Pedro: On

# Reload page
# Open settings
# Verify: All settings restored correctly
# Complete a task (on milestone)
# Verify: Pedro walks, woohoo plays, no confetti
```

- [ ] **Step 7: Test offline functionality**

```bash
# With app loaded:
# DevTools > Network > Offline checkbox
# Reload page
# Verify: App loads from cache
# Verify: All features work offline:
#   - Add tasks
#   - Complete tasks (celebrations work)
#   - Change theme
#   - Change settings
#   - Roll personality
```

- [ ] **Step 8: Test mobile responsiveness**

```bash
# DevTools > Toggle device toolbar
# Test at:
# - iPhone SE (375x667)
# - iPhone 12 Pro (390x844)
# - Pixel 5 (393x851)
# - iPad Air (820x1180)

# For each device:
# - Verify: Layout doesn't break
# - Verify: Settings modal fits on screen
# - Verify: Sound cards readable
# - Verify: Theme selector usable
# - Verify: Celebrations visible
```

Expected: All features work correctly across all tests

- [ ] **Step 9: Document any issues found**

If issues found during testing, create a checklist:

```markdown
## Issues Found in Integration Testing

- [ ] [Description of issue 1]
- [ ] [Description of issue 2]

## Fixes Needed

- [ ] [Fix for issue 1]
- [ ] [Fix for issue 2]
```

If no issues: proceed to commit

- [ ] **Step 10: Commit test completion**

```bash
git commit --allow-empty -m "test: complete integration testing

All features tested and working:
- 5 themes with persistence
- 28 personalities
- Celebration system (confetti, Pedro, sounds)
- 4 timing modes
- Settings panel with 8 controls
- Offline PWA functionality
- Mobile responsiveness"
```

---

### Task 7.4: Final Commit & Version Tag

**Goal:** Create final commit and tag release

**Files:**
- All (final verification)

- [ ] **Step 1: Verify all files are committed**

```bash
git status
# Expected: "working tree clean" or only untracked files like .DS_Store
```

- [ ] **Step 2: Review commit history**

```bash
git log --oneline -20
# Verify: Clear commit messages for all tasks
```

- [ ] **Step 3: Create version tag**

```bash
git tag -a v0.2 -m "Pedro v0.2: Themes, Personalities & Celebrations

New Features:
- 5 visual themes (Dark Cyberpunk, Light & Clean, Nature, Sunset, Ocean)
- 10 new personalities (28 total)
- Celebration system (CSS confetti, Pedro GIF, 5 sounds)
- Comprehensive settings panel
- Smart celebration timing (first/last + random)

Technical:
- Refactored to 6 focused modules
- Offline-first PWA
- Theme-aware celebration colors
- Web Audio API for sounds
- 280 unique personality messages"
```

- [ ] **Step 4: Push commits and tag**

```bash
git push origin main
git push origin v0.2
```

- [ ] **Step 5: Verify deployment**

```bash
cd pedro
python3 -m http.server 8000
# Final smoke test:
# - Load app
# - Switch theme
# - Roll personality
# - Complete task (verify celebration)
# - Open settings (verify all controls)
```

Expected: All features working in final deployment

- [ ] **Step 6: Final commit**

```bash
git commit --allow-empty -m "release: Pedro v0.2 complete

All implementation tasks completed:
✅ File restructuring (6 modules)
✅ 5 theme system with switcher
✅ 10 new personalities (28 total)
✅ Celebration system (confetti + Pedro + sounds)
✅ Settings panel (8 controls)
✅ Service worker updated
✅ Integration tested
✅ Offline PWA verified

Ready for production use."
```

---

## Implementation Complete

**Plan saved to:** `docs/superpowers/plans/2026-03-12-pedro-themes-celebrations.md`

**Total tasks:** 7 chunks, 26 tasks, ~150 steps

**Estimated time:** 6-8 hours for experienced developer

**Next steps:** Execute this plan using `superpowers:subagent-driven-development` or `superpowers:executing-plans`

---

## Quick Reference

**Key Files Created/Modified:**

Created:
- `pedro/styles.css` - All CSS including 5 themes
- `pedro/app.js` - Core logic, settings, theme switching
- `pedro/personalities.js` - 28 personalities
- `pedro/celebrations.js` - Confetti, Pedro, sounds
- `pedro/assets/pedro-walk.gif` - Pedro meme (if sourced)

Modified:
- `pedro/index.html` - Structure, settings modal
- `pedro/sw.js` - Cache update for v2

**Key Functions:**

- `setTheme(themeName)` - Switch and persist theme
- `celebrate(settings)` - Master celebration trigger
- `shouldCelebrate(count, remaining, timing)` - Timing logic
- `triggerConfetti()` - Confetti animation
- `triggerPedroWalk()` - Pedro walk animation
- `playSound(type, volume)` - Sound generation
- `openSettings()` / `closeSettings()` - Settings modal
- `selectTheme(element)` - Theme selection
- `selectTiming(element)` - Timing mode selection
- `selectSound(element)` - Sound type selection
- `updateVolume(value)` - Volume adjustment

**Testing Checklist:** See Task 7.3 for comprehensive test coverage
