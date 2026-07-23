# Deepthy Learning Hub

> An interactive, bilingual (English + Malayalam) learning application built for neurodivergent early learners at **Deepthy Society for Differently-Abled**, Alappuzha, Kerala.

---

## Table of Contents

- [About the Project](#-about-the-project)
- [Who This Is For](#-who-this-is-for)
- [Features](#-features)
- [Learning Modules](#-learning-modules)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Adding Your Content](#-adding-your-content)
- [Generating Audio Files](#-generating-audio-files)
- [Deployment](#-deployment)
- [How to Use in the Classroom](#-how-to-use-in-the-classroom)
- [Design Philosophy](#-design-philosophy)

---

## About the Project

**Deepthy Learning Hub** is a fullscreen, touch-friendly classroom learning application designed to be projected on a shared classroom screen. It provides structured, multi-sensory lessons across eight learning modules — combining visual images, bilingual audio, animated feedback, and interactive quizzes — all built around the learning pace of neurodivergent children.

The application was built specifically for the shared classroom environment at Deepthi Society, where 8–10 students learn together with a teacher guiding the session from a single screen. Every interaction is designed to be large, clear, forgiving, and celebratory — rewarding participation at every step.

---

## Who This Is For

This app is designed for **neurodivergent early learners** — children with:

- **Autism Spectrum Disorder (ASD)**
- **Intellectual disabilities**
- **Attention difficulties (ADHD)**
- **Learning differences** (dyslexia, dyscalculia)
- **Communication and language delays**

### Why a dedicated app?

Mainstream learning apps are often:
- Too fast-paced or text-heavy
- Cluttered with distracting elements
- Not available in Malayalam
- Not designed for shared classroom projection
- Missing the sensory reinforcement (audio + visual + interactive) that neurodivergent learners benefit from

Deepthi Learning Hub was built to fill that gap — calm, structured, bilingual, and designed for the classroom screen rather than individual devices.

---

## Features

### Core Learning Features
- **Bilingual audio** — Every lesson item speaks in both English and Malayalam at the tap of a button
- **Real images** — Actual photographs replace emojis as primary visuals (with emoji fallback during development)
- **Structured lesson flow** — Every alphabet letter goes through: Learn → Repeat After Me → Quiz
- **Interactive quizzes** — Large tap targets, immediate visual feedback, no time pressure
- **Progress bar** — Shows how far through the module the session has gone

### Celebration & Feedback
- **Confetti burst** on every correct quiz answer
- **Trophy celebration** when a full module is completed
- **Red shake animation** on wrong answers — clear but gentle
- **Lock system** — Quiz options and navigation lock during celebrations so children cannot accidentally skip content
- **Previous button turns red** with a shake when tapped while locked — visual feedback instead of silent blocking

### Accessibility & Neurodivergent Design
- **Large touch targets** — All buttons minimum 80×80px
- **No time limits** — Children can take as long as they need
- **No penalties** — Wrong answers reset cleanly after 1.2 seconds
- **Dyslexia-friendly fonts** — Nunito (display) and Lexend (body)
- **Malayalam script** — Noto Sans Malayalam for accurate rendering
- **Reduced motion support** — Respects OS accessibility setting
- **No background music** — Audio plays only on demand to avoid sensory overload
- **High contrast colour palette** — Each module has a distinct colour for easy recognition
- **Repeat button** — Every screen allows unlimited audio replays

---

## Learning Modules

The home screen shows 8 modules in a 4-column grid. Each has a distinct colour and image thumbnail.

| # | Module | Malayalam | Content | Audio |
|---|---|---|---|---|
| 1 | **Alphabet** | അക്ഷരമാല | A–Z with images, Learn → Repeat → Quiz flow | English + Malayalam |
| 2 | **Numbers** | അക്കങ്ങൾ | 1–100 with counting dots and quiz | English + Malayalam |
| 3 | **Addition** | കൂട്ടൽ | Single-digit addition 1+1 to 5+10, dot grid visual, quiz-only | None (visual only) |
| 4 | **Animals** | മൃഗങ്ങൾ | 15 animals with animal sounds | English + Malayalam + Animal sound |
| 5 | **Plants** | സസ്യങ്ങൾ | Common plants and trees | English + Malayalam |
| 6 | **Vehicles** | വാഹനങ്ങൾ | 12 vehicles, image-primary, no quiz | English only |
| 7 | **Daily Routine** | ദൈനദിന ദിനചര്യ | 10 activities from wake-up to sleep | English + Malayalam |
| 8 | **Good Manners** | നല്ല മര്യാദ | 10 manners (home, school, public) | English + Malayalam |

### Alphabet Module Flow

```
Learn Phase          →    Repeat Phase           →    Quiz Phase
─────────────────         ─────────────────────        ──────────────────
Show big letter           Auto-play "A for Apple"      Show 4 image options
Show Malayalam letter     Display phrase on card        Tap correct answer
Show image                Mic animation while           ✅ Confetti on correct
Play English audio        playing                       ❌ Red shake on wrong
Play Malayalam audio      Play Again button             Auto-advance after win
```

### Numbers Module Flow

```
Show numeral large    →    Show counting dots    →    Mini Quiz (4 options)
Play English + ML          Dots animate in             Correct → celebration
audio on demand            one by one                  Wrong → shake + reset
                                                        Auto-advance after win
```

### Addition Module

```
Show equation card         Dot grid above each         4 answer options
  ● + ●● = ?               number (visual count)       Correct → confetti
                                                        → auto-advance
```

---

## 🛠 Tech Stack

| Technology | Purpose | Why Chosen |
|---|---|---|
| **Next.js 14** | App framework | Works offline (static export), fast, easy Vercel deploy |
| **React 18** | UI components | Industry standard, excellent for interactive screens |
| **TypeScript** | Type safety | Prevents data errors across 8 modules and 100+ lesson items |
| **Tailwind CSS** | Styling | Rapid consistent styling, safelist for dynamic module colours |
| **Framer Motion** | Animations | Smooth spring animations, celebration sequences, shake feedback |
| **Howler.js** | Audio playback | Best offline audio library, handles .mp3 reliably, graceful fallback |
| **canvas-confetti** | Celebration effects | Lightweight, beautiful confetti bursts on quiz wins |
| **gTTS (Python)** | Audio generation | Generates all English and Malayalam audio .mp3 files offline |

### Why Next.js over plain React?

Next.js gives us the option to run as a **static export** (fully offline, no server needed) or deploy instantly to **Vercel** as a web app — with zero configuration changes. For a classroom with unreliable internet, this flexibility is essential.

---

## Project Structure

```
deepthi-learning/
│
├── public/                          ← Static assets served directly
│   ├── images/
│   │   ├── modules/                 ← Home screen card thumbnails
│   │   │   ├── alphabet.png
│   │   │   ├── numbers.png
│   │   │   └── ... (8 total)
│   │   ├── alphabet/                ← A–Z lesson images
│   │   │   ├── apple.png
│   │   │   └── ...
│   │   ├── animals/                 ← 15 animal images
│   │   ├── plants/                  ← Plant images
│   │   ├── vehicles/                ← 12 vehicle images
│   │   ├── routine/                 ← Daily routine images
│   │   └── manners/                 ← Manners images
│   └── audio/
│       ├── en/                      ← English .mp3 files
│       │   ├── A.mp3                ← Letter pronunciation
│       │   ├── A_repeat.mp3         ← "A for Apple" phrase
│       │   ├── 1.mp3                ← Number pronunciation
│       │   ├── lion.mp3             ← Animal name
│       │   └── ...
│       ├── ml/                      ← Malayalam .mp3 files
│       │   ├── A.mp3
│       │   ├── 1.mp3
│       │   └── ...
│       └── sounds/                  ← Animal sound effects
│           ├── lion.mp3
│           └── ...
│
├── src/
│   ├── app/
│   │   ├── page.tsx                 ← Home screen (module selector grid)
│   │   ├── layout.tsx               ← Root layout, fonts, metadata
│   │   └── globals.css              ← Global styles, Malayalam font
│   │
│   ├── components/
│   │   ├── animations/
│   │   │   └── Celebration.tsx      ← Confetti + star celebration overlay
│   │   ├── modules/
│   │   │   ├── AlphabetModule.tsx   ← A–Z Learn/Repeat/Quiz flow
│   │   │   ├── NumbersModule.tsx    ← 1–100 with dots + quiz
│   │   │   ├── AdditionModule.tsx   ← Addition quiz with dot grids
│   │   │   ├── VehiclesModule.tsx   ← Vehicles browse (English only)
│   │   │   └── GenericModule.tsx    ← Shared layout for Animals/Plants/Routine/Manners
│   │   ├── quiz/
│   │   │   └── Quiz.tsx             ← Reusable 4-option quiz component
│   │   └── ui/
│   │       ├── AudioButton.tsx      ← Animated audio play button
│   │       ├── LessonImage.tsx      ← Image with automatic emoji fallback
│   │       ├── NavControls.tsx      ← Previous / Repeat / Next bar
│   │       └── ProgressBar.tsx      ← Animated progress indicator
│   │
│   ├── data/
│   │   ├── alphabet.ts              ← A–E lesson data + merged export
│   │   ├── alphabet_fz.ts           ← F–Z lesson data
│   │   ├── modules.ts               ← All other module data + MODULES registry
│   │   └── numbers_6to100.ts        ← Numbers 6–100 data
│   │
│   └── hooks/
│       └── useAudio.ts              ← Howler.js audio hook
│
├── .eslintrc.json                   ← ESLint config (warnings suppressed)
├── tailwind.config.ts               ← Theme colours, safelist, animations
├── next.config.mjs                  ← Next.js config (static export option)
├── package.json
└── tsconfig.json
```

---

## Getting Started

### Prerequisites

- **Node.js 18 or higher** — Download from [nodejs.org](https://nodejs.org) (choose LTS)
- **npm** — Comes bundled with Node.js
- **Python 3** — For generating audio files ([python.org](https://python.org))

### Step 1 — Install Node.js

1. Go to [https://nodejs.org](https://nodejs.org)
2. Download the **LTS** version
3. Run the installer and click through the defaults
4. Verify installation — open **Command Prompt** (Windows) or **Terminal** (Mac/Linux):

```bash
node -v    # Should print e.g. v20.11.0
npm -v     # Should print e.g. 10.2.4
```

### Step 2 — Set Up the Project

```bash
# Navigate to the project folder
cd deepthi-learning

# Install all dependencies (run once)
npm install

# Start the development server
npm run dev
```

Open your browser and go to **http://localhost:3000**

The app is now running. You will see the home screen with 8 module cards.

### Step 3 — Build for Production

When you are ready to deploy or run the optimised version:

```bash
npm run build
npm run start
```

---

### Changing Module Colours

Open `tailwind.config.ts` and find the `module` section under `colors`:

```ts
module: {
  alphabet: "#7C6FE0",   // Purple
  numbers:  "#4A90D9",   // Blue
  addition: "#E84393",   // Pink
  animals:  "#E85D75",   // Coral
  plants:   "#52C07C",   // Green
  vehicles: "#16A085",   // Teal
  routine:  "#F5A623",   // Orange
  manners:  "#9B59B6",   // Violet
},
```

Change the hex value and restart `npm run dev`. The colour updates on both the home card and the module header bar.


## Deployment

### Option A — Offline Classroom (Recommended)

Run the app locally and open Chrome in kiosk mode on the classroom PC connected to the projector or TV.

```bash
# Terminal 1 — keep this running
npm run dev

# Terminal 2 — open Chrome in kiosk mode (Windows)
start chrome --kiosk http://localhost:3000 --no-first-run --disable-infobars
```

**To exit kiosk mode:** Press `Alt + F4`

**Auto-start batch file** — Create `start-deepthi.bat` on the Desktop:

```bat
@echo off
start /B npm --prefix C:\Users\YourName\Desktop\deepthi-learning run dev
timeout /t 5
start chrome --kiosk http://localhost:3000 --no-first-run
```

Double-click this file each morning to launch the app automatically.

### Option B — Vercel (Web Deployment)

Deploy to the internet so the app is accessible from any device with a browser.

1. Push your code to [GitHub](https://github.com)
2. Go to [vercel.com](https://vercel.com) and sign in with GitHub
3. Click **Add New Project** → import your repository
4. Click **Deploy** — done in ~2 minutes
5. Your app is live at `https://your-project-name.vercel.app`

> Note: For Vercel, comment out `output: "export"` in `next.config.mjs` — Vercel handles server rendering automatically.

---

## 👩‍🏫 How to Use in the Classroom

### Starting a Session

1. Double-click `start-deepthi.bat` (or run `npm run dev` in the terminal)
2. The home screen shows all 8 module cards
3. The teacher taps the module card for today's lesson
4. The lesson begins fullscreen

### Navigating Lessons

| Button | Action |
|---|---|
| **▶ Next** | Move to next item or phase |
| **◀ Previous** | Go back to previous item |
| **🔁 Repeat** | Restart the current item |
| **🔊 English** | Play English audio |
| **🔊 മലയാളം** | Play Malayalam audio |
| **🔊 Animal Sound** | Play the animal's real sound (Animals module) |
| **← Back** | Return to home screen |

### During a Quiz

- Children tap one of the 4 large answer buttons
- **Correct** → green highlight + confetti celebration + auto-advance
- **Wrong** → red shake animation + resets after 1.2 seconds to try again
- **Previous button turns red** if tapped while celebration is playing — tap again after it finishes

### Suggested Weekly Schedule

| Day | Module | Focus |
|---|---|---|
| Monday | Alphabet | 5 letters (A–E or wherever you left off) |
| Tuesday | Numbers | 1–10 or 10–20 |
| Wednesday | Animals | 5 animals with sounds |
| Thursday | Daily Routine + Manners | Morning routine or one manners topic |
| Friday | Addition | 5–10 addition questions as a group activity |

Revisit Vehicles and Plants as supplementary sessions or when children need a change of pace.

---

## 🎨 Design Philosophy

Every design decision in Deepthi Learning Hub was made with neurodivergent learners in mind:

### Visual Design
- **One thing at a time** — Each screen shows a single lesson item with no competing elements
- **Consistent layout** — Every module follows the same header → content → navigation structure so children know where to look
- **Large text** — Minimum 3rem for lesson content, 10rem for letter displays
- **Module colour coding** — Each module has a unique colour used consistently in the home card and header bar, helping children recognise which module is active

### Audio Design
- **On-demand only** — No audio plays without a tap (except the Repeat After Me phase which auto-plays once)
- **No background music** — Avoids sensory overload for children sensitive to sound
- **Bilingual** — Malayalam first language support ensures children can connect new English words to concepts they already understand
- **Slow speech** — Repeat After Me phrases use `slow=True` in gTTS for clearer pronunciation modelling

### Interaction Design
- **No time limits** — Children take as long as they need
- **No score tracking** — Removes anxiety and comparison between students
- **Celebration always wins** — Every correct answer gets the same enthusiastic celebration regardless of how many attempts it took
- **Locked navigation during key moments** — Prevents accidental skipping of content during celebrations, protecting the learning moment
- **Forgiving wrong answers** — Wrong answers simply shake and reset; there is no penalty, no sound, no negative reinforcement

### Fonts
- **Nunito** — Rounded, friendly display font for headings and large text
- **Lexend** — Designed specifically to reduce visual stress for readers with dyslexia
- **Noto Sans Malayalam** — Google's Malayalam font designed for accurate, clear rendering of the script

---

## 📞 About Deepthi Society

**Deepthy Society for Differently-Abled** is a non-profit organisation based in Alappuzha, Kerala, providing education, therapy, and support services for children and adults with intellectual and developmental disabilities.

This application was built to support their classroom programme and is intended for use solely within their educational setting.

---

*Built with ❤️ for the students and teachers of Deepthy Society.*
