# Happy Birthday, Gayatri! ❤️

An interactive, story-driven birthday surprise website created for **Gayatri (26 November)** using **React**, **Tailwind CSS**, **Framer Motion**, and **Lucide React**.

## ✨ Scenes & Experience

1. **Magical Bow & Arrow Intro** (`src/components/IntroAnimation.jsx`) — Pull and release the bow to shoot the glowing heart, triggering a particle explosion and birthday reveal banner.
2. **Birthday Hero & Heart Tree** (`src/components/BirthdayHero.jsx`, `src/components/AnimatedHeartTree.jsx`) — Animated heart-shaped tree canopy with blooming pink, coral, and gold hearts.
3. **Interactive Birthday Cake** (`src/components/BirthdayCake.jsx`) — Layer-by-layer cake assembly under a starry sky with a **"Make a wish 🕯️"** candle flame & confetti reveal.
4. **Pop the Balloons** (`src/components/BalloonSurprise.jsx`) — 5 floating balloons that each pop to reveal a personalized reason.
5. **A Walk Down Memory Lane** (`src/components/MemoryGallery.jsx`) — Swipeable / clickable Polaroid photo viewer showcasing 6 memories (`public/images/gallery-1.jpg` – `gallery-6.jpg`).
6. **Final Love Letter** (`src/components/FinalLoveLetter.jsx`) — Golden envelope with a `G` wax seal that opens to reveal a lined handwritten-style birthday letter.
7. **Cat Birthday Video** (`src/components/CatVideoSurprise.jsx`) — Vertical video frame decorated with party bunting and balloons, playing the embedded YouTube Short.
8. **Final Celebration** (`src/components/FinalCelebration.jsx`) — Falling confetti finale with birthday wishes and a replay option.
9. **Background Music** (`src/components/MusicPlayer.jsx`) — Floating music control powered by the YouTube IFrame API (starts after user interaction from `startSeconds: 60`).

## 🛠️ Tech Stack

- **React 19** + **Vite**
- **Tailwind CSS v4**
- **Framer Motion**
- **Lucide React**

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

> **Windows PowerShell note:** If `npm` is blocked by execution policy, use `npm.cmd install`, `npm.cmd run dev`, and `npm.cmd run build`.

## 🎨 Customization

All text, memories, video links, and music settings live in `src/config/birthdayConfig.js`:

- **`BIRTHDAY_PERSON`** — Recipient name, age, date, and sender name.
- **`BALLOON_MESSAGES`** — Messages revealed when each of the 5 balloons is popped.
- **`MEMORIES`** — Photo paths (`public/images/gallery-1.jpg` to `gallery-6.jpg`) and captions.
- **`LOVE_LETTER`** — Salutation, paragraphs, closing, and signature.
- **`MUSIC_CONFIG`** — YouTube video ID (`youtubeVideoId`), start offset (`startSeconds`), and volume (`defaultVolume`).
- **`CAT_VIDEO_CONFIG`** — YouTube Shorts URL (`youtubeUrl`) or local MP4 fallback (`videoSrc`).

## 📁 Project Structure

```text
├── public/
│   ├── images/          # gallery-1.jpg ... gallery-6.jpg
│   ├── music/           # Optional local MP3 fallback info
│   └── video/           # Optional local MP4 fallback info
├── src/
│   ├── components/      # Scene and UI components
│   ├── config/
│   │   └── birthdayConfig.js
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
└── vite.config.js
```

## ☁️ Deployment (Vercel)

1. Push this repository to GitHub (`main` branch).
2. Import the repository at [vercel.com](https://vercel.com).
3. Use the default Vite settings (`npm run build` → `dist`) and click **Deploy**.
