# CV Maker

Mobile-first **CV builder** as a Progressive Web App (PWA).  
Edit your resume, preview A4 layout, export PDF — works offline after first load.

**Live demo:** [https://bt8b.github.io/Cvapp/](https://bt8b.github.io/Cvapp/)

**Türkçe:** [README.tr.md](README.tr.md)

---

## Why this project?

I built this to edit my own CV on a phone and export a clean A4 PDF offline. I couldn’t find a simple tool that fit that need, so I wrote one and released it under the **MIT License** so others can use it freely.

Your data stays on your device — nothing is uploaded to a server. This is a personal / learning project, not a commercial product.

---

## Features

| Area | What you get |
|------|----------------|
| **Edit / Preview** | Two modes: form editor + live CV preview |
| **Sections** | Identity, summary, experience, education, skills, systems, technical, custom sidebar blocks |
| **Appearance** | Colors, fonts, photo position/shape, page frame, sidebar styles, PDF fit modes |
| **PDF** | One-click PDF download (html2canvas + jsPDF), optional browser print |
| **Undo / Redo** | History stack for safe editing |
| **Storage** | **IndexedDB** (primary) + localStorage backup; auto-migrates old data |
| **Offline** | Service worker (`sw.js`) caches the app shell on first visit |
| **Language** | **TR / EN** UI toggle (top bar) |
| **PWA** | Installable on phone (Add to Home Screen) |

---

## How to use

1. Open the live URL (or host `index.html` yourself).
2. **Edit** → fill Professional / Sidebar / Appearance tabs.
3. **Preview** → zoom with − / + / Fit.
4. **Save** → stores on your device (IndexedDB).
5. **PDF** → download A4 PDF.

Data stays **on the user’s device**. Nothing is uploaded to a server.

---

## Files

```
index.html             App (UI + logic)
sw.js                  Offline service worker
manifest.webmanifest   PWA manifest
icon-192.png / icon-512.png
README.md              English
README.tr.md           Turkish
LICENSE                MIT License
```

---

## Tech

- Single-page app: HTML / CSS / Vanilla JS  
- Storage: IndexedDB + localStorage fallback  
- PDF: html2canvas, jsPDF, html2pdf.js (CDN)  
- Fonts: Google Fonts (Inter, Source Sans 3, Libre Baskerville)  
- Hosting: GitHub Pages  

---

## Language (TR / EN)

Top-right **TR | EN** switches the interface language.  
Preference is saved in `localStorage` (`cv_app_lang`).  
CV *content* (your name, job text, etc.) is not auto-translated — only the app chrome.

---

## Offline notes

- First open needs internet (load app + optional CDNs).  
- Later opens can work offline via cache + IndexedDB.  
- Clearing site data removes the app cache and saved CV.  
- Unpublishing the GitHub site stops *new* loads; installed PWAs may keep a cached copy for a while only.

---

## Local / deploy

**Local:** open `index.html` in a browser, or serve the folder with any static server.  
**GitHub Pages:** push to `main` (or Pages branch); site updates in about 1–2 minutes.

After updates, hard-refresh or clear site data if the old service worker cache sticks.

---

## License

**MIT License** — free to use, copy, modify, merge, publish, and distribute.

See the [LICENSE](LICENSE) file in the repository for the full text.

---

## Changelog (recent)

- Pro mobile shell (header, segment tabs, colored dock buttons)
- IndexedDB storage + localStorage migration
- Stronger offline caching (`sw.js` v3)
- **TR / EN** UI language switch
- PDF export improvements (single page fit, photo position)
- Custom sidebar sections (FAB), reorder / hide / delete
- MIT license
