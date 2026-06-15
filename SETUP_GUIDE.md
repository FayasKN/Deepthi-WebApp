# Deepthi Society Learning Hub — Setup Guide

## What Is This App?

A fullscreen, offline-friendly interactive learning hub for 8–10 early learners in a shared classroom.  
Teaching **Alphabet, Numbers, Animals, Plants, Daily Routine, and Good Manners** in **English + Malayalam**, with audio, animations, quizzes, and celebration effects on every achievement.

---

## Tech Stack & Why

| Tool | Purpose | Why Chosen |
|---|---|---|
| **Next.js 14** | App framework | Fast, works offline (static export), easy Vercel deploy |
| **React 18** | UI components | Industry standard, great for interactive screens |
| **Tailwind CSS** | Styling | Rapid, consistent, no runtime cost |
| **Framer Motion** | Animations | Smooth, accessible, celebration sequences |
| **Howler.js** | Audio playback | Best offline audio library, handles .mp3 reliably |
| **canvas-confetti** | Celebration effects | Lightweight, stunning confetti on quiz wins |

---

## Option A — Offline App (Recommended for Classroom)

Run in the browser in **Kiosk Mode** on a Windows/Mac PC connected to your classroom screen. No internet required after first setup.

### Step 1: Install Node.js

1. Go to **https://nodejs.org**
2. Download **LTS version** (e.g. 20.x)
3. Run the installer → click Next → Finish
4. Verify: open **Command Prompt** (Windows) or **Terminal** (Mac) and type:
   ```
   node -v
   npm -v
   ```
   Both should print version numbers.

### Step 2: Download & Set Up the Project

```bash
# 1. Place the project folder on your Desktop or Documents

# 2. Open Terminal / Command Prompt and navigate to it:
cd Desktop/deepthi-learning

# 3. Install all dependencies (only needed once):
npm install

# 4. Start the development server:
npm run dev
```

Open your browser and go to: **http://localhost:3000**

### Step 3: Add Your Media Files

Place your media in the `/public` folder:

```
public/
├── images/
│   ├── alphabet/
│   │   ├── apple.png       ← image for letter A
│   │   ├── ball.png        ← image for letter B
│   │   └── ...
│   ├── animals/
│   │   ├── lion.png
│   │   └── ...
│   ├── plants/
│   ├── routine/
│   └── manners/
└── audio/
    ├── en/
    │   ├── A.mp3           ← English pronunciation for A
    │   ├── B.mp3
    │   ├── lion.mp3
    │   └── ...
    ├── ml/
    │   ├── A.mp3           ← Malayalam pronunciation for A
    │   └── ...
    └── sounds/
        ├── lion.mp3        ← Lion's roar sound
        └── ...
```

> 💡 **Tip**: If an image or audio file is missing, the app still works — it shows the emoji fallback and silently skips audio. You can add media gradually.

### Step 4: Run in Kiosk Mode (Teacher Setup)

**Chrome/Edge on Windows:**
1. Open Command Prompt
2. Run:
   ```
   start chrome --kiosk http://localhost:3000 --no-first-run --disable-infobars
   ```

**To exit kiosk mode:** Press `Alt + F4` or `Ctrl + W`

**For automatic startup**, create a batch file `start-learning.bat`:
```bat
@echo off
start /B npm --prefix C:\Users\YourName\Desktop\deepthi-learning run dev
timeout /t 5
start chrome --kiosk http://localhost:3000 --no-first-run
```

---

## Option B — Deploy to Vercel (Website / Remote Access)

Use this if you want the app accessible from **any device with a browser**, or want to share it with other classrooms.

### Step 1: Create a GitHub Account
Go to **https://github.com** and sign up (free).

### Step 2: Push Code to GitHub
```bash
cd deepthi-learning
git init
git add .
git commit -m "Initial Deepthi Learning Hub"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/deepthi-learning.git
git push -u origin main
```

### Step 3: Deploy to Vercel
1. Go to **https://vercel.com** → Sign up with GitHub (free)
2. Click **"Add New Project"**
3. Import your `deepthi-learning` repository
4. Leave all settings default → click **Deploy**
5. In ~2 minutes your app is live at: `https://deepthi-learning.vercel.app`

> ⚠️ **Note for Vercel**: Remove the `// output: "export"` comment in `next.config.mjs` before deploying — Vercel handles SSR automatically.

### Media on Vercel
- Small images and audio files (< 50MB total): commit them to the repo — they'll be served from Vercel's CDN
- Large files: use **Cloudinary** (free tier) or **Supabase Storage** for audio/video

---

## Adding New Content

### New Letter (Alphabet)
Open `src/data/alphabet.ts` and copy/paste an existing entry:

```typescript
{
  id: "F",
  letter_en: "F",
  letter_ml: "ഫ",
  word_en: "Fish",
  word_ml: "മീൻ",
  emoji: "🐟",
  image: "/images/alphabet/fish.png",
  audio_en: "/audio/en/F.mp3",
  audio_ml: "/audio/ml/F.mp3",
  quiz: {
    question_en: "Which one is a Fish?",
    question_ml: "ഏതാണ് മീൻ?",
    options: ["🍎", "🐟", "🚗", "🐶"],
    answer: "🐟",
  },
},
```

Then add the image to `/public/images/alphabet/fish.png` and audio to `/public/audio/en/F.mp3`.

### New Animal / Plant / Manner
Same pattern in `src/data/modules.ts`.

---

## Celebration Animations

Every achievement triggers a visual celebration:

| Event | Animation |
|---|---|
| Quiz correct answer | Gold confetti burst + ⭐⭐⭐ stars pop-in + "Great Job!" card |
| Module completed | Side cannon confetti (3 seconds) + 🏆 trophy + "Excellent!" |
| Auto-dismisses | After 1.8s (quiz) / 3.2s (module) — app continues automatically |

---

## Accessibility Settings (Autism-Friendly)

The app is pre-configured for your classroom:
- ✅ **No flashing** animations — smooth only
- ✅ **Large touch targets** — minimum 80×80px buttons
- ✅ **High contrast** colors — blue, green, orange palette
- ✅ **Fonts**: Nunito + Lexend (dyslexia-friendly)
- ✅ **Malayalam rendering** — Noto Sans Malayalam Google Font
- ✅ **No background music** during lessons
- ✅ **Repeat button** on every screen
- ✅ **Reduced-motion support** — respects OS settings

---

## Daily Lesson Schedule (Suggested)

| Day | Module | Items |
|---|---|---|
| Monday | Alphabet | A–E |
| Tuesday | Numbers | 1–5 |
| Wednesday | Animals | Lion, Dog, Cat |
| Thursday | Plants | Mango, Banana |
| Friday | Manners + Routine | Handwash, Thank You |

---

## Troubleshooting

| Issue | Solution |
|---|---|
| `npm install` fails | Check Node.js is installed: `node -v` |
| Audio doesn't play | Check file is in `/public/audio/en/` with correct name |
| Malayalam text shows boxes | Internet required first time to load Google Fonts |
| App is slow | Run `npm run build && npm run start` for production mode |
| Screen too small on TV | Press F11 for fullscreen in browser |

---

## Project Structure (Quick Reference)

```
deepthi-learning/
├── src/
│   ├── app/
│   │   ├── page.tsx              ← Home screen (module selector)
│   │   ├── layout.tsx            ← Root layout + fonts
│   │   └── globals.css           ← Global styles
│   ├── components/
│   │   ├── modules/
│   │   │   ├── AlphabetModule.tsx
│   │   │   ├── NumbersModule.tsx
│   │   │   └── GenericModule.tsx  ← Animals, Plants, Routine, Manners
│   │   ├── quiz/
│   │   │   └── Quiz.tsx
│   │   ├── animations/
│   │   │   └── Celebration.tsx   ← Confetti + stars
│   │   └── ui/
│   │       ├── AudioButton.tsx
│   │       ├── NavControls.tsx
│   │       └── ProgressBar.tsx
│   ├── data/
│   │   ├── alphabet.ts           ← All alphabet lesson data
│   │   └── modules.ts            ← Numbers, Animals, Plants, etc.
│   └── hooks/
│       └── useAudio.ts           ← Howler.js audio hook
├── public/
│   ├── images/                   ← Your lesson images go here
│   └── audio/                    ← Your .mp3 files go here
├── package.json
├── tailwind.config.ts
└── next.config.mjs
```

---

Built for **Deepthi Society for Differently-Abled** — Shared Classroom Learning Screen  
Malayalam + English • Offline-first • Autism-friendly
