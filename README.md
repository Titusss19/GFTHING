# 🌸 Sunflower & Floral Surprise | Gift Web App

A romantic, aesthetic, mobile-first surprise website built with **Vite + React**, **Tailwind CSS**, **Framer Motion**, **YouTube IFrame API**, and **EmailJS**.

---

## 🎨 Visual Style & Theme
- **Theme**: Dreamy Strawberry Milk & Rose Gold (`#FFF0F5`, `#E8546D`, `#D81B60`, `#FFB6C1`)
- **Typography**: Google Fonts (*Dancing Script*, *Caveat*, and *Nunito*)
- **Flowers**: Roses, Cherry Blossoms (Sakura), Tulips, Pink Daisies, and Sunflowers!
- **Sender**: **JM** 💖

---

## ✨ Features & Scene Flow

1. **Scene 0: Name Screen**
   - Asks for her name first before entering the gift experience.
   - Her name is dynamically injected across the entire site (tags, burst message, bouquet, photobooth strip).

2. **Scene 1: Gift Box**
   - Floating pastel pink gift box with satin ribbon and idle floating/wiggling lid.
   - Tap/click opens the box with a glowing pink floral burst!

3. **Scene 2: Multi-Flower Burst & Transition**
   - 72 flowers (Roses, Sakura, Tulips, Daisies, Sunflowers) burst across the screen with staggered spring physics!
   - Card: *"For You, [Her Name] 🌸"*

4. **Scene 3: Floral Bouquet**
   - Hand-wrapped floral bouquet with idle sway.
   - Tap to scale up and reveal the **Cassette Tape (Left)** and **Instant Camera (Right)**.

5. **Scene 4: Vintage Cassette Player (YouTube Streaming 🎵)**
   - **No downloading needed!** Streams music directly from YouTube via the YouTube IFrame API.
   - Spinning reels while playing, seekable progress bar, volume control, and playlist.
   - **Add Any Song**: You can paste ANY YouTube link or video ID directly inside the player to add songs dynamically!
   - Background audio keeps playing smoothly while browsing the bouquet and photobooth.

6. **Scene 5: Instant Photobooth (1, 3, or 4 Cuts! 📸)**
   - Choose your layout:
     - **1 Shot**: Classic Polaroid
     - **3-Cut Strip**: 3-photo vertical strip
     - **4-Cut Korean**: Authentic Life4Cuts / Photism 4-cut vertical strip!
   - Live camera preview, front/back flip, filters, and frames.
   - Automated multi-shot countdown with pose change intervals.
   - Bakes photos into a high-res printable photobooth strip with date, pink border, and *"Special Memory • From JM ✨"*.
   - Save or email via EmailJS!

---

## 🎵 Customizing YouTube Songs

You can edit `src/data/songs.js` or paste YouTube links directly in the player UI:
```javascript
export const songs = [
  {
    id: 1,
    title: "Pasilyo",
    artist: "SunKissed Lola",
    url: "https://www.youtube.com/watch?v=JgssHqH5u8E",
    youtubeId: "JgssHqH5u8E",
    duration: "4:30",
  },
  // Add any YouTube URL or 11-char ID!
];
```

---

## 🚀 How to Run Locally

```bash
npm install
npm run dev
```
Open **`http://localhost:3001/`** (or `http://localhost:3000/`).
