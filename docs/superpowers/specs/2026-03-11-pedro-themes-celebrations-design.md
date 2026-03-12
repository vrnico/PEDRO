# Pedro: Visual Themes, Personalities & Celebrations
**Design Specification**
**Date:** 2026-03-11
**Version:** 1.0

---

## Overview

This specification defines three major feature additions to Pedro:

1. **Visual Themes** - 5 color schemes users can switch between
2. **Expanded Personalities** - 10 new personalities (28 total)
3. **Celebration System** - Confetti, dancing Pedro GIF, and sound effects when completing tasks

These features transform Pedro from a single-theme, 18-personality task app into a highly customizable productivity companion with rich visual feedback.

---

## Goals

- **Personalization**: Let users customize Pedro's look and feel to match their preferences
- **Dopamine-friendly**: Make task completion more rewarding with celebrations
- **Variety**: Expand personality roster for better replayability
- **Maintainability**: Restructure codebase for easier long-term development
- **Offline-first**: Preserve PWA capabilities and offline functionality
- **Zero friction**: Keep the core experience fast and simple

---

## Architecture Changes

### Current State
- Single file: `index.html` (~1300 lines with embedded CSS/JS)
- Service worker caches 1 HTML file + 2 icon files

### New Structure
```
pedro/
  index.html              # HTML structure + settings modal (~400 lines)
  styles.css              # All CSS including theme definitions (~600 lines)
  app.js                  # Core app logic, theme switching (~600 lines)
  personalities.js        # 28 personality objects (~500 lines)
  celebrations.js         # Confetti, Pedro GIF, sounds (~300 lines)
  sw.js                   # Service worker (updated cache)
  manifest.json           # PWA manifest (unchanged)
  icons/
    pedro-192.png
    pedro-512.png
  assets/
    pedro-walk.gif        # Pedro meme GIF (~300-500KB)
```

### File Responsibilities

**index.html**
- HTML structure
- Settings modal markup
- Script loading order

**styles.css**
- Base styles
- 5 theme definitions (CSS custom properties)
- Component styles
- Responsive design

**app.js**
- Task management (add, complete, delete)
- localStorage management
- Theme switching
- Settings management
- State initialization
- UI rendering

**personalities.js**
- Array of 28 personality objects
- Exposes global `PERSONALITIES` array

**celebrations.js**
- CSS confetti animation
- Pedro GIF overlay
- Web Audio sound generation
- Exposes `celebrate()` function

**sw.js**
- Caches all 7 files for offline use
- Version bumped to trigger update

### Loading Order
```html
<script src="personalities.js"></script>
<script src="celebrations.js"></script>
<script src="app.js"></script>
```

Simple global variables, no module system (keeps complexity low).

---

## Feature 1: Visual Themes

### Theme Definitions

**1. Dark Cyberpunk (Default)**
- Background: Deep purple/navy (#1a0a2e, #2a1a4e)
- Accents: Orange (#ff6b35), Green (#4ecdc4), Pink (#ff6b9d), Yellow (#ffe66d)
- Text: Light purple (#f0e6ff)
- Vibe: Current aesthetic, cyberpunk energy

**2. Light & Clean**
- Background: Off-white/white (#f8f9fa, #ffffff)
- Accents: Coral (#ff6b6b), Teal (#4ecdc4), Mint (#95e1d3)
- Text: Dark blue-gray (#1a535c)
- Vibe: Minimal, professional, daytime-friendly

**3. Nature & Calm**
- Background: Dark forest green (#2d3e2e, #3d5a40)
- Accents: Sage (#80a05d), Gold (#c9a847), Cream (#e8dcc4)
- Text: Light cream (#f0e9d2)
- Vibe: Earthy, soothing, focus-oriented

**4. Sunset Warmth**
- Background: Deep purple-brown (#2b1b3d, #3d2b4e)
- Accents: Orange (#ff6b35), Peach (#ff8c42), Gold (#ffc857)
- Text: Cream (#f7dba7)
- Vibe: Cozy, warm, evening productivity

**5. Ocean Breeze**
- Background: Deep navy (#0a1929, #1a2942)
- Accents: Teal (#4ecdc4), Blue (#00a8e8), Light blue (#c8f4f9)
- Text: Light blue (#c8f4f9)
- Vibe: Calm, professional, focused

### CSS Implementation

Each theme is a set of CSS custom properties applied via `data-theme` attribute:

```css
/* Base variables used throughout */
:root {
  --bg-dark: ...;
  --bg-card: ...;
  --bg-input: ...;
  --accent-orange: ...;
  --accent-green: ...;
  --accent-pink: ...;
  --accent-yellow: ...;
  --text-primary: ...;
  --text-secondary: ...;
  --text-muted: ...;
}

/* Theme overrides */
[data-theme="light-clean"] {
  --bg-dark: #f8f9fa;
  --bg-card: #ffffff;
  /* ...etc */
}

[data-theme="nature"] {
  --bg-dark: #2d3e2e;
  /* ...etc */
}
```

### Theme Switching

**JavaScript API:**
```javascript
function setTheme(themeName) {
  document.body.setAttribute('data-theme', themeName);
  localStorage.setItem('pedro-theme', themeName);
}
```

**On page load:**
```javascript
const savedTheme = localStorage.getItem('pedro-theme') || 'dark-cyberpunk';
setTheme(savedTheme);
```

**UI:**
- Theme selector in settings modal
- Radio buttons with color swatch previews
- Changes apply instantly (no reload needed)

---

## Feature 2: Expanded Personalities

### New Personalities (10 additions)

**1. Leslie Knope 📋**
- Greeting: "You are a beautiful, talented, brilliant, powerful musk ox!"
- Vibe: Overly enthusiastic, binder-loving productivity champion
- Encouragement: "Write that task down! Binders are life!", "We have to remember what's important: friends, waffles, tasks.", etc.
- Praise: "That's what overachievers DO!", "You beautiful rule-following enthusiast!", etc.

**2. Keanu Reeves 🏍️**
- Greeting: "Whoa. You can do this. You're breathtaking."
- Vibe: Wholesome, humble, genuinely supportive
- Encouragement: "Be excellent to yourself. Do the task.", "Every task is a journey. Let's take the first step.", etc.
- Praise: "You're breathtaking. Seriously.", "That was some Matrix-level task completion.", etc.

**3. Beyoncé 👑**
- Greeting: "Okay ladies, now let's get in formation and FINISH THESE TASKS."
- Vibe: Powerful, fierce, queen energy
- Encouragement: "Who run the world? You. Now prove it.", "I'm not bossy, I'm the boss. You're the boss of this task.", etc.
- Praise: "Flawless. Absolutely flawless.", "You just put a ring on that task!", etc.

**4. Bob Belcher 🍔**
- Greeting: "Oh my god. You did the thing. I'm so proud of you."
- Vibe: Dad energy, supportive, slightly stressed but loving
- Encouragement: "Alright, let's flip this task like a burger.", "You're doing great, buddy. I believe in you.", etc.
- Praise: "That's my little task champion!", "Oh my god, you actually did it. I love you.", etc.

**5. Michelle Obama 💪**
- Greeting: "When they go low, we complete tasks."
- Vibe: Empowering, graceful strength, inspiring
- Encouragement: "Success isn't about how much money you make; it's about the tasks you complete.", "There is no limit to what we can accomplish.", etc.
- Praise: "That's what I call going high!", "You are setting an example for everyone.", etc.

**6. Terry Crews 💪**
- Greeting: "TERRY LOVES PRODUCTIVITY! TERRY LOVES TASKS!"
- Vibe: High energy, third person, explosive enthusiasm
- Encouragement: "TERRY SAYS DO IT NOW!", "POWER! TASKS! TERRY LOVES THIS!", etc.
- Praise: "TERRY IS SO PROUD OF YOU!", "THAT'S WHAT TERRY'S TALKING ABOUT!", etc.

**7. Lizzo 🎤**
- Greeting: "100% that task. You better do it, 'cause you deserve it."
- Vibe: Self-love anthem energy, body positive, empowering
- Encouragement: "If you can love me, you can love this task!", "You are 100% that productive person!", etc.
- Praise: "DNA test says you're 100% THAT COMPLETER!", "Truth hurts, and that task is DONE!", etc.

**8. Wednesday Addams 🖤**
- Greeting: "I'm not perky. But I do finish tasks."
- Vibe: Dark humor, deadpan, macabre productivity
- Encouragement: "I'll stop wearing black when they make a darker color. Do the task.", "This task is like a small death. Embrace it.", etc.
- Praise: "I'm having the time of my life. Said no one. Except you just finished a task.", "Morbidly impressive.", etc.

**9. MrBeast 💰**
- Greeting: "I just gave away $1 MILLION to the person who completes this task!"
- Vibe: Over-the-top stunts, viral energy, generous chaos
- Encouragement: "LAST PERSON TO STOP DOING TASKS WINS $10,000!", "This is INSANE! You're actually doing it!", etc.
- Praise: "OH MY GOD YOU WON! YOU FINISHED THE TASK!", "Congratulations! You just earned... SATISFACTION!", etc.

**10. Ron Swanson 🥃**
- Greeting: "Never half-ass two things. Whole-ass one thing."
- Vibe: Gruff wisdom, anti-government, pro-efficiency
- Encouragement: "Don't half-ass it. Whole-ass that task.", "There is no problem that bacon, eggs, and a finished task can't solve.", etc.
- Praise: "That's a whole-assed task completion.", "I know more than you. And I know you just did good.", etc.

### Data Structure (Unchanged)

```javascript
{
  name: String,           // "Leslie Knope"
  emoji: String,          // "📋"
  greeting: String,       // Welcome message
  encourage: String[5],   // Messages when adding tasks
  praise: String[5]       // Messages when completing tasks
}
```

Each personality needs 5 encouragement + 5 praise messages = 10 total.
28 personalities × 10 messages = **280 unique messages**.

### Implementation

**personalities.js:**
```javascript
const PERSONALITIES = [
  // ...existing 18 personalities
  {
    name: "Leslie Knope",
    emoji: "📋",
    greeting: "You are a beautiful, talented, brilliant, powerful musk ox!",
    encourage: [
      "Write that task down! Binders are life!",
      "We have to remember what's important: friends, waffles, tasks.",
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
  // ...9 more new personalities
];
```

No changes to personality roller, daily rotation, or personality banner.

---

## Feature 3: Celebration System

### Overview

When a user completes a task, trigger a celebration with three components:
1. **CSS Confetti** - Colorful particles burst and fall
2. **Pedro GIF** - Pedro raccoon walks across screen
3. **Sound Effect** - Auditory feedback

### Component 1: CSS Confetti

**Implementation:**
```javascript
function triggerConfetti() {
  const colors = [
    'var(--accent-orange)',
    'var(--accent-green)',
    'var(--accent-pink)',
    'var(--accent-yellow)'
  ];

  const container = document.createElement('div');
  container.className = 'confetti-container';
  document.body.appendChild(container);

  for (let i = 0; i < 50; i++) {
    const piece = document.createElement('div');
    piece.className = 'confetti-piece';
    piece.style.left = Math.random() * 100 + '%';
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.width = (Math.random() * 10 + 5) + 'px';
    piece.style.height = piece.style.width;
    piece.style.animation = `confetti-fall ${Math.random() * 2 + 2}s linear forwards`;
    piece.style.animationDelay = Math.random() * 0.3 + 's';

    container.appendChild(piece);
  }

  // Cleanup after animation
  setTimeout(() => container.remove(), 5000);
}
```

**CSS:**
```css
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

**Details:**
- 50 particles per celebration
- Random: position, color, size (5-15px), duration (2-4s), delay (0-0.3s)
- Colors pulled from current theme
- Self-cleaning (removes DOM elements after 5s)

### Component 2: Pedro GIF

**GIF Asset:**
- File: `assets/pedro-walk.gif`
- Size target: <500KB
- Content: Pedro raccoon meme walking animation
- Source: Find existing meme GIF or create stylized version
- Duration: 2-3 seconds looping

**Implementation:**
```javascript
function triggerPedroWalk() {
  const overlay = document.createElement('div');
  overlay.className = 'pedro-overlay';

  const pedro = document.createElement('img');
  pedro.src = 'assets/pedro-walk.gif';
  pedro.className = 'pedro-walk';
  pedro.alt = 'Dancing Pedro';

  overlay.appendChild(pedro);
  document.body.appendChild(overlay);

  // Remove after animation
  setTimeout(() => overlay.remove(), 3500);
}
```

**CSS:**
```css
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
  width: 120px;
  height: auto;
  top: 50%;
  transform: translateY(-50%);
  animation: pedro-walk-across 3.5s ease-in-out;
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

**Fallback:**
If GIF fails to load or doesn't exist, use walking emoji:
```javascript
pedro.textContent = '🦝';
pedro.style.fontSize = '80px';
```

### Component 3: Sound Effects

**Implementation using Web Audio API:**

```javascript
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

function playSound(type, volume) {
  const vol = volume / 100; // Convert 0-100 to 0-1
  const now = audioContext.currentTime;

  switch(type) {
    case 'chime':
      playChime(now, vol);
      break;
    case 'fanfare':
      playFanfare(now, vol);
      break;
    case 'pop':
      playPop(now, vol);
      break;
    case 'coins':
      playCoins(now, vol);
      break;
    case 'woohoo':
      playWoohoo(now, vol);
      break;
    case 'none':
      // Silent
      break;
  }
}

function playChime(startTime, volume) {
  const osc = audioContext.createOscillator();
  const gain = audioContext.createGain();

  osc.connect(gain);
  gain.connect(audioContext.destination);

  osc.frequency.value = 800;
  osc.type = 'sine';

  gain.gain.setValueAtTime(volume * 0.3, startTime);
  gain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.5);

  osc.start(startTime);
  osc.stop(startTime + 0.5);
}

// Similar functions for fanfare, pop, coins, woohoo
```

**Sound Profiles:**

1. **Chime** - Clean sine wave bell tone (800Hz, 0.5s)
2. **Fanfare** - Three ascending notes: C-E-G (triangle wave, 0.45s total)
3. **Pop** - Quick burst, frequency drop (200→100Hz, 0.1s)
4. **Coins** - 3 quick metallic tones (square wave, 1200-1400Hz, 0.24s total)
5. **Woohoo** - Rising pitch excitement (300→800Hz, sawtooth, 0.4s)
6. **Silent** - No sound

**Advantages of Web Audio API:**
- No audio files to load (zero file size)
- Works offline immediately
- Customizable volume
- Low latency

### Celebration Timing Logic

**Smart Mode (Default):**
```javascript
function shouldCelebrate(taskIndex, totalTasks, completedCount) {
  // Always celebrate first completed task
  if (completedCount === 1) return true;

  // Always celebrate last task in list
  const remainingTasks = totalTasks - completedCount;
  if (remainingTasks === 0) return true;

  // Random 50% for tasks in between
  return Math.random() < 0.5;
}
```

**Other Modes:**

- **Every Task:** `return true`
- **Random:** `return Math.random() < 0.5`
- **Milestones:** `return completedCount % 5 === 0`

**Integration:**
```javascript
function toggleTask(id) {
  const task = state.tasks.find(t => t.id === id);
  if (!task) return;

  task.done = !task.done;

  if (task.done) {
    state.completedTasksCount++;

    const settings = getSettings();
    if (settings.celebrationsEnabled && shouldCelebrate(...)) {
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

**celebrate() function:**
```javascript
function celebrate(settings) {
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

---

## Feature 4: Settings Panel

### UI Structure

**Access:** Gear icon (⚙️) button added to header, opens modal overlay

**Modal Layout:**
```
Settings Modal (centered overlay, darkened backdrop)
├── Header: "🎉 Celebration Settings"
├── Section: Theme Selection
│   └── 5 radio options with color swatch previews
├── Section: Master Celebration Toggle
│   └── Enable/disable all celebrations
├── Section: Celebration Timing
│   ├── Smart Mode (default) - first, last, random between
│   ├── Every Task
│   ├── Random (50% chance)
│   └── Milestones (every 5 tasks)
├── Section: Confetti
│   └── Toggle confetti on/off
├── Section: Pedro Animation
│   └── Toggle Pedro GIF on/off
├── Section: Sound Effects
│   ├── Enable/disable toggle
│   ├── Sound type (6 buttons: Chime, Fanfare, Pop, Coins, Woohoo, Silent)
│   │   └── Each has "Preview" button
│   └── Volume slider (0-100%)
└── Footer: "✓ Settings save automatically"
```

**Visual Design:**
- Modal: max-width 600px, rounded corners, backdrop blur
- Sections separated by subtle borders
- Toggle switches: styled like iOS switches
- Radio buttons: custom styled with checkmarks
- Sound buttons: grid layout with icons
- Preview buttons: play sound immediately

**HTML Structure (simplified):**
```html
<div id="settings-modal" class="modal">
  <div class="modal-content">
    <h2>⚙️ Settings</h2>

    <div class="setting-group">
      <h3>🎨 Theme</h3>
      <!-- 5 radio buttons with color swatches -->
    </div>

    <div class="setting-group">
      <h3>🎉 Celebrations</h3>
      <!-- Toggle switches for confetti, pedro, sounds -->
      <!-- Timing mode selector -->
      <!-- Sound type selector -->
      <!-- Volume slider -->
    </div>

    <button onclick="closeSettings()">Close</button>
  </div>
</div>
```

### Settings State

**localStorage key:** `pedro-settings`

**Schema:**
```javascript
{
  theme: 'dark-cyberpunk',              // string
  celebrationsEnabled: true,            // boolean
  celebrationTiming: 'smart',           // 'smart' | 'every' | 'random' | 'milestones'
  confettiEnabled: true,                // boolean
  pedroEnabled: true,                   // boolean
  soundsEnabled: true,                  // boolean
  soundType: 'chime',                   // 'chime' | 'fanfare' | 'pop' | 'coins' | 'woohoo' | 'none'
  volume: 70                            // number 0-100
}
```

**Default values:**
```javascript
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
```

**Load/Save:**
```javascript
function getSettings() {
  const saved = localStorage.getItem('pedro-settings');
  return saved ? JSON.parse(saved) : DEFAULT_SETTINGS;
}

function saveSettings(settings) {
  localStorage.setItem('pedro-settings', JSON.stringify(settings));
}

function updateSetting(key, value) {
  const settings = getSettings();
  settings[key] = value;
  saveSettings(settings);
  applySettings(settings); // Update UI immediately
}
```

**Behavior:**
- Settings save automatically on every change
- No explicit "Save" button needed
- Changes apply immediately (except theme, which needs attribute update)
- Preview buttons for sounds play at current volume setting
- Modal dismisses on close button or backdrop click

---

## Data Model Changes

### Current State
```javascript
// pedro-state
{
  tasks: [...],
  personality: {...},
  personalityDate: "YYYY-MM-DD"
}
```

### New State
```javascript
// pedro-state
{
  tasks: [...],
  personality: {...},
  personalityDate: "YYYY-MM-DD",
  completedTasksCount: 0       // NEW: for milestone tracking
}

// pedro-settings (NEW storage key)
{
  theme: 'dark-cyberpunk',
  celebrationsEnabled: true,
  celebrationTiming: 'smart',
  confettiEnabled: true,
  pedroEnabled: true,
  soundsEnabled: true,
  soundType: 'chime',
  volume: 70
}

// pedro-theme (NEW: quick theme access)
'dark-cyberpunk'
```

**Migration:** No breaking changes. Existing users' data remains valid. New fields added with defaults.

---

## Service Worker Updates

**Updated cache list:**
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
  './assets/pedro-walk.gif'
];
```

Version bump triggers cache refresh for users with existing install.

---

## Browser Support

**Target browsers:**
- Chrome/Edge 90+ ✅
- Firefox 88+ ✅
- Safari 14+ ✅
- Mobile Safari (iOS 14+) ✅
- Chrome Android 90+ ✅

**Feature compatibility:**
- CSS custom properties: ✅ All
- Web Audio API: ✅ All
- CSS animations: ✅ All
- localStorage: ✅ All
- Service Workers: ✅ All (iOS 14+)

**Graceful degradation:**
- If Web Audio fails: celebrations still work (confetti + GIF)
- If GIF fails to load: fallback to emoji 🦝
- If CSS animations unsupported: celebrations skip (rare on target browsers)

---

## Performance Considerations

**File sizes:**
- index.html: ~15KB
- styles.css: ~20KB
- app.js: ~25KB
- personalities.js: ~30KB
- celebrations.js: ~10KB
- pedro-walk.gif: ~400KB (target)
- **Total:** ~500KB (initial load)

**Caching strategy:**
- All files cached by service worker after first load
- Subsequent visits: instant load from cache
- GIF cached separately to avoid blocking HTML/JS/CSS

**Runtime performance:**
- Confetti: 50 DOM elements created/destroyed per celebration (~10ms)
- Pedro GIF: Single img element, GPU-accelerated CSS animation
- Sounds: Web Audio has negligible CPU overhead
- Theme switching: Single attribute change, instant CSS variable update

**localStorage usage:**
- Existing: ~10-50KB (tasks + state)
- New: +2KB (settings)
- **Total:** <100KB typical (well under 5MB limit)

---

## Testing Checklist

### Theme System
- [ ] All 5 themes display correctly
- [ ] Theme persists after page reload
- [ ] Theme selector in settings works
- [ ] All UI elements adapt to theme colors
- [ ] Text remains readable in all themes
- [ ] Transitions between themes are smooth

### Personalities
- [ ] All 28 personalities appear in roller
- [ ] Each personality has 5 encourage + 5 praise messages
- [ ] Personality roller animation works
- [ ] Daily personality rotation nudge appears
- [ ] Personality messages use correct emoji
- [ ] No duplicate messages within a personality

### Celebrations
- [ ] Confetti triggers on task completion
- [ ] Confetti colors match current theme
- [ ] Confetti cleans up after animation
- [ ] Pedro GIF walks across screen
- [ ] Pedro GIF loads and animates correctly
- [ ] Fallback emoji works if GIF fails
- [ ] All 5 sounds play correctly
- [ ] Sound volume slider affects playback
- [ ] Silent mode produces no sound
- [ ] Preview buttons work in settings

### Timing Modes
- [ ] Smart mode: first task always celebrates
- [ ] Smart mode: last task always celebrates
- [ ] Smart mode: random 50% for middle tasks
- [ ] Every task mode: celebrates every completion
- [ ] Random mode: ~50% of tasks celebrate
- [ ] Milestone mode: celebrates every 5th task

### Settings Panel
- [ ] Settings modal opens/closes
- [ ] All toggles work
- [ ] All radio selections work
- [ ] Settings persist after reload
- [ ] Changes apply immediately
- [ ] Default settings apply for new users
- [ ] Close button and backdrop click both work

### Data & State
- [ ] Existing user data migrates correctly
- [ ] No data loss on upgrade
- [ ] localStorage keys don't conflict
- [ ] completedTasksCount increments correctly

### Offline & PWA
- [ ] App works offline after first load
- [ ] Service worker caches all files
- [ ] Pedro GIF available offline
- [ ] Themes work offline
- [ ] Settings work offline

### Mobile
- [ ] Responsive on iOS Safari
- [ ] Responsive on Chrome Android
- [ ] Touch targets are adequate (44px+)
- [ ] Animations perform smoothly (60fps)
- [ ] Settings modal fits on small screens
- [ ] No horizontal scroll

### Cross-browser
- [ ] Chrome: all features work
- [ ] Firefox: all features work
- [ ] Safari: all features work
- [ ] Edge: all features work

---

## Implementation Notes

### Order of Implementation

1. **File restructuring** - Split index.html into modules
2. **Theme system** - CSS variables and switching logic
3. **New personalities** - Add 10 personalities to array
4. **Celebrations core** - Confetti + sounds
5. **Pedro GIF** - Source/create GIF, add overlay
6. **Settings panel** - UI and persistence
7. **Service worker** - Update cache list
8. **Testing** - Comprehensive QA pass

### Pedro GIF Sourcing

**Option 1: Find existing meme**
- Search "Pedro raccoon meme GIF"
- Check Know Your Meme, Giphy, Tenor
- Optimize with tools like ezgif.com (resize, compress)
- Target: 300-500KB, ~120px width

**Option 2: Create custom**
- Use CSS raccoon from prototype
- Export frames as sprite sheet
- Convert to optimized GIF
- More work but zero licensing issues

**Option 3: Fallback**
- Use walking emoji 🦝 with CSS animation
- Zero file size, always available
- Less personality but functional

**Recommendation:** Try Option 1, keep Option 3 as permanent fallback in code.

### Code Style

- Use existing Pedro conventions (ES5-compatible, no modules)
- Keep functions small and focused
- Comment complex logic (especially Web Audio)
- Use descriptive variable names
- Match existing indentation (2 spaces)

### Backwards Compatibility

- No breaking changes to existing localStorage
- Graceful degradation if new features fail
- Default settings preserve current behavior (except adds celebrations)
- Existing users get new features automatically, can disable if desired

---

## Future Enhancements (Out of Scope)

These are not part of this spec but could be considered later:

- Custom themes (user-defined colors)
- More celebration animations (fireworks, sparkles)
- Personality creation (user-defined personalities)
- Sound file uploads (custom celebration sounds)
- Haptic feedback on mobile
- Accessibility improvements (reduced motion settings)
- More granular celebration controls per timing mode

---

## Success Metrics

This feature will be considered successful if:

1. **Adoption:** >50% of users try at least one non-default theme
2. **Engagement:** Celebration settings have >30% interaction rate
3. **Retention:** No decrease in task completion rates
4. **Performance:** Page load stays under 2s on 3G
5. **Stability:** No localStorage corruption reports
6. **Delight:** Positive user feedback on celebrations

---

## Appendix: Complete Personality Message List

All 10 new personalities with full message sets:

### Leslie Knope 📋
**Greeting:** "You are a beautiful, talented, brilliant, powerful musk ox!"

**Encourage:**
1. "Write that task down! Binders are life!"
2. "We have to remember what's important in life: friends, waffles, tasks."
3. "I'm big enough to admit I'm often inspired by myself. You should be too!"
4. "This task is getting DONE. No question."
5. "Why would anybody ever complete anything? Oh right, BECAUSE IT FEELS AMAZING!"

**Praise:**
1. "That's what overachievers DO! Amazing!"
2. "You beautiful, rule-following enthusiast!"
3. "That task just got Knope'd!"
4. "I love you and I LIKE you for doing that!"
5. "You are now a member of the elite Task Champions Club!"

### Keanu Reeves 🏍️
**Greeting:** "Whoa. You can do this. You're breathtaking."

**Encourage:**
1. "Be excellent to yourself. Do the task."
2. "Every task is a journey. Let's take the first step."
3. "You're breathtaking. Now show that task who's boss."
4. "I know kung fu. And I know you can do this."
5. "The task chose you. It's time to answer."

**Praise:**
1. "You're breathtaking. Seriously."
2. "That was some Matrix-level task completion."
3. "Excellent work, dude. Most excellent."
4. "You just did a John Wick on that task."
5. "Whoa. That was amazing."

### Beyoncé 👑
**Greeting:** "Okay ladies, now let's get in formation and FINISH THESE TASKS."

**Encourage:**
1. "Who run the world? You. Now prove it."
2. "I'm not bossy, I'm the boss. You're the boss of this task."
3. "If you liked it then you shoulda put a checkmark on it."
4. "Okay, now let's get in formation and DO THIS TASK."
5. "You wake up like this. Flawless. Now finish flawlessly."

**Praise:**
1. "Flawless. Absolutely flawless."
2. "You just put a ring on that task!"
3. "Who run the world? TASKS! (That you just completed.)"
4. "Bow down, task. Bow DOWN."
5. "Feeling myself, and you should too after that!"

### Bob Belcher 🍔
**Greeting:** "Oh my god. You did the thing. I'm so proud of you."

**Encourage:**
1. "Alright, let's flip this task like a burger."
2. "You're doing great, buddy. I believe in you."
3. "This task is like a good burger. Just take it one ingredient at a time."
4. "Lin would be so proud. I'M so proud. Do the task."
5. "Oh my god, you can do this. I know you can."

**Praise:**
1. "That's my little task champion!"
2. "Oh my god, you actually did it. I love you."
3. "That was beautiful. Like a perfectly cooked burger."
4. "You did it, buddy. I'm so proud."
5. "That's a five-star task completion right there."

### Michelle Obama 💪
**Greeting:** "When they go low, we complete tasks."

**Encourage:**
1. "Success isn't about how much money you make; it's about the tasks you complete."
2. "There is no limit to what we can accomplish."
3. "When they go low, we go high. And we finish tasks."
4. "Your story is what you have, what you will always have. Make it count."
5. "Am I good enough? Yes, you are. Now do the task."

**Praise:**
1. "That's what I call going high!"
2. "You are setting an example for everyone."
3. "Becoming is better than being. And you're becoming a task champion."
4. "That's the kind of excellence we need in this world."
5. "I am so proud of the work you're doing."

### Terry Crews 💪
**Greeting:** "TERRY LOVES PRODUCTIVITY! TERRY LOVES TASKS!"

**Encourage:**
1. "TERRY SAYS DO IT NOW!"
2. "POWER! TASKS! TERRY LOVES THIS!"
3. "TERRY BELIEVES IN YOU! TERRY BELIEVES IN THIS TASK!"
4. "MUSCLES AND TASKS! BOTH NEED WORK! LET'S GO!"
5. "TERRY IS WATCHING! TERRY WANTS TO SEE SUCCESS!"

**Praise:**
1. "TERRY IS SO PROUD OF YOU!"
2. "THAT'S WHAT TERRY'S TALKING ABOUT!"
3. "TERRY LOVES IT! TERRY LOVES WATCHING YOU WIN!"
4. "POWER MOVES! TERRY APPROVES!"
5. "YES! THAT'S HOW YOU DO IT! TERRY IS IMPRESSED!"

### Lizzo 🎤
**Greeting:** "100% that task. You better do it, 'cause you deserve it."

**Encourage:**
1. "If you can love me, you can love this task!"
2. "You are 100% that productive person!"
3. "Feeling good as hell? You will after this task!"
4. "It's about damn time you did this task!"
5. "Juice? Check. Task? About to be checked!"

**Praise:**
1. "DNA test says you're 100% THAT COMPLETER!"
2. "Truth hurts, and that task is DONE!"
3. "Feeling good as HELL after that completion!"
4. "That's what happens when you love yourself AND finish tasks!"
5. "Mirror, mirror on the wall, who's the task-completin'est of them all? YOU!"

### Wednesday Addams 🖤
**Greeting:** "I'm not perky. But I do finish tasks."

**Encourage:**
1. "I'll stop wearing black when they make a darker color. Do the task."
2. "This task is like a small death. Embrace it."
3. "I'm not perky. This task isn't fun. But it must be done."
4. "Normal is an illusion. Finishing tasks is reality."
5. "I find death mildly amusing. I find task completion... acceptable."

**Praise:**
1. "I'm having the time of my life. Said no one. Except you just finished a task."
2. "Morbidly impressive."
3. "Well done. I'm as impressed as I ever am, which is slightly."
4. "The task is dead. You killed it. Good."
5. "That was almost... adequate."

### MrBeast 💰
**Greeting:** "I just gave away $1 MILLION to the person who completes this task!"

**Encourage:**
1. "LAST PERSON TO STOP DOING TASKS WINS $10,000!"
2. "This is INSANE! You're actually doing it!"
3. "I'm about to give away a HOUSE to whoever finishes this task!"
4. "We're doing the BIGGEST task challenge EVER!"
5. "Every task you complete, I donate $1000 to charity! GO!"

**Praise:**
1. "OH MY GOD YOU WON! YOU FINISHED THE TASK!"
2. "Congratulations! You just earned... SATISFACTION!"
3. "THAT'S CRAZY! I can't believe you actually did it!"
4. "This is the most INSANE task completion I've ever seen!"
5. "You just won the ULTIMATE task challenge! LEGENDARY!"

### Ron Swanson 🥃
**Greeting:** "Never half-ass two things. Whole-ass one thing."

**Encourage:**
1. "Don't half-ass it. Whole-ass that task."
2. "There is no problem that bacon, eggs, and a finished task can't solve."
3. "I know more than you. I know you can do this task."
4. "The government can't do this task for you. You must."
5. "Crying is acceptable at funerals and when tasks are incomplete. Fix one of those."

**Praise:**
1. "That's a whole-assed task completion."
2. "I know more than you. And I know you just did good."
3. "Give a man a fish, he eats for a day. Teach a man to complete tasks, you fed him forever."
4. "That was the most productive thing I've seen all day."
5. "Clear alcohols are for rich women on diets. Finished tasks are for everyone."

---

**End of Specification**
