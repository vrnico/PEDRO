# PEDRO - Personal Executive Dysfunction Relief Operator

A progressive web app that helps people with executive dysfunction manage tasks through a fun, low-friction interface powered by rotating AI personalities.

Built with vanilla HTML, CSS, and JavaScript. No frameworks, no build step, no accounts.

## Features

- **Text, voice, and photo task input** — multiple ways to capture tasks quickly
- **18 AI personalities** — roll a daily advisor (Gordon Ramsay, Bob Ross, Snoop Dogg, Gandalf, and more) who encourages and praises you in character
- **PWA installable** — add to your phone's home screen and use offline
- **Privacy-first** — all data stays in your browser's localStorage, with clear consent for voice input

## Getting Started

### Prerequisites

- Git
- Any web browser (Chrome/Edge recommended for full feature support)
- A local web server (needed for PWA/service worker features)

### Clone and Run

```bash
# Clone the repo
git clone https://github.com/vrnico/PEDRO.git
cd PEDRO

# Option 1: Python (most systems have this)
python3 -m http.server 8000

# Option 2: Node.js
npx serve .

# Option 3: PHP
php -S localhost:8000
```

Then open [http://localhost:8000/pedro/](http://localhost:8000/pedro/) in your browser.

> **Note:** Opening `index.html` directly as a file (`file://`) won't work — the service worker and voice input require a proper HTTP server.

### Deploy to a web host

Pedro is just static files. Upload the `pedro/` folder to any web host (GitHub Pages, Netlify, Vercel, any shared hosting) and it works.

## Contributing / Adding Features

We use feature branches to keep `main` stable. Here's how to add your own feature:

```bash
# 1. Make sure you're on main and up to date
git checkout main
git pull origin main

# 2. Create a feature branch (name it after what you're building)
git checkout -b feature/your-feature-name

# Examples:
# git checkout -b feature/dark-mode
# git checkout -b feature/task-categories
# git checkout -b feature/pomodoro-timer

# 3. Make your changes
# Edit files in the pedro/ directory

# 4. Stage and commit
git add pedro/
git commit -m "Add your feature description"

# 5. Push your branch
git push -u origin feature/your-feature-name

# 6. Open a Pull Request on GitHub
# Go to https://github.com/vrnico/PEDRO/pulls
# Click "New pull request"
# Select your branch and describe your changes
```

### Branch naming conventions

| Prefix | Use for |
|--------|---------|
| `feature/` | New functionality |
| `fix/` | Bug fixes |
| `style/` | Visual/CSS changes |
| `docs/` | Documentation updates |

### Project structure

```
PEDRO/
  pedro/                  # The app lives here
    index.html            # Entire app (HTML + CSS + JS in one file)
    sw.js                 # Service worker for offline/PWA
    manifest.json         # PWA manifest
    icons/
      pedro-192.png       # App icon 192x192
      pedro-512.png       # App icon 512x512
  SPEC.md                 # Full specification and roadmap
  README.md               # You are here
```

### Key areas to contribute

Check `SPEC.md` for the full roadmap. Some good first features:

- **Swipe to delete** tasks on mobile
- **Dark/light theme** toggle
- **Task categories** with color coding
- **Due dates** and reminders
- **Streak counter** for daily task completion
- **Sound effects** on task complete

## Browser Support

| Feature | Chrome | Firefox | Safari | Edge |
|---------|--------|---------|--------|------|
| Core app | Yes | Yes | Yes | Yes |
| Voice input | Yes | No | Yes | Yes |
| PWA install | Yes | No | Yes* | Yes |
| Camera capture | Yes | Yes | Yes | Yes |

*Safari: "Add to Home Screen" only

## License

MIT
