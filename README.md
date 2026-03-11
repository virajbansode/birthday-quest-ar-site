
# Birthday Quest – Puzzle Treasure Hunt + AR Reveal (Static, No Backend)

A fully static, zero‑cost (or near‑zero) **puzzle treasure hunt** you can deploy on GitHub Pages or AWS S3/CloudFront. Includes:

- 🧩 Sequenced **puzzles** (riddle/anagram/cipher/memory/math) with hints
- 🔖 Optional **QR cards** for a physical treasure hunt (auto‑generated)
- 💾 **Local progress save** (no login, no server)
- 🎉 **Confetti** and pretty UI (themeable)
- 🎈 **AR reveal** using AR.js + A‑Frame (marker‑based, works on phones)

## 1) Quick Start

1. Edit **`config.js`** → set `herName`, `steps[]`, and theme colors.
2. Open **`index.html`** locally to test.
3. Deploy to **GitHub Pages** or **S3 static hosting** (see below).

## 2) Customize Puzzles

Each step in `config.js` looks like:

```js
{
  id: "riddle-echo",
  title: "The Whispering Cave",
  type: "riddle",          // optional label, free text
  clue: "I speak without a mouth...",
  hint: "It repeats you.",
  answer: "echo",           // comparison is case-insensitive & trimmed
  token: "STEP1"            // optional: QR token to allow direct jump
}
```

- Change the **`answer`** to match your story (e.g., café initial).
- Add more steps (6–10 is great). The order is the quest path.
- If you plan a physical hunt, keep **`token`** set per step. Print QR cards from **`qr.html`**.

## 3) QR Cards for a Physical Hunt

Open **`qr.html`** and click **Print**. Each card contains a QR that links to `quest.html?step=<i>&token=<TOKEN>`.
- Set `domain` in `config.js` if using a custom domain. Otherwise it uses a relative path.
- Place cards at locations matching your clues (e.g., under a mug, beside a book, etc.).

## 4) AR Reveal

- Uses **AR.js** + **A‑Frame** in **marker mode**.
- By default, it uses the built‑in **HIRO** marker; print a HIRO marker and point your phone at it on `ar.html`.
- To use a custom marker, set `ar.useHiro=false` and supply `ar.patternUrl` (a `.patt` file) and `ar.markerSize` in meters.
- You can customize the message in `ar.text` (supports `<NAME>` placeholder).

> Tip: For camera permissions, host the site over **HTTPS** (GitHub Pages or S3+CloudFront). AR may not work from the local `file://` URL.

## 5) Deploy

### GitHub Pages
1. Push these files to a repo.
2. In **Settings → Pages**, deploy from `main`.
3. Visit `https://<username>.github.io/<repo>/`.

### AWS S3 (optional CloudFront for HTTPS)
```bash
aws s3 mb s3://your-bday-quest
aws s3 sync . s3://your-bday-quest --delete
aws s3 website s3://your-bday-quest --index-document index.html
# Optional: add a CloudFront distribution for HTTPS + CDN.
```

## 6) Tech Notes

- State is stored in `localStorage` under `bquest.progress`.
- Confetti via `canvas-confetti` (CDN). A‑Frame and AR.js via CDN.
- Works on modern mobile/desktop browsers. For AR, mobile + HTTPS recommended.

Have fun, and happy birthday to her! 🎉
"# birthday-quest-ar-site" 
