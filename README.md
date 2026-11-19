# basantinashine-dotcom.github.io

The personal website of Basanti Nashine, Head of Product at Orcana.AI and former Principal PM-T at Amazon.

The site is three static pages with one shared stylesheet, no build step and no dependencies. It uses the Geist fonts from Google Fonts and a cream color scheme for every visitor (there is no dark mode).

| Page | File | What's on it |
|---|---|---|
| Home | `index.html` | Round photo, headline, the CTR proof line, intro, one-line lists of Selected work and Personal projects, Background, Get in touch |
| Work | `work/index.html` | The four Selected work stories, each with an anchor (`#search-ads`, `#personalization`, `#advertiser-agents`, `#next-best-engagement`) |
| Projects | `projects/index.html` | Hey Mama with its spec sheet, then Tagalong, Decision Log, Campaign Lab and AdCanvas (`#hey-mama`, `#tagalong`, `#decision-log`, `#campaign-lab`, `#adcanvas`) |

`style.css` holds every style. The colors are set once at the top. Each page links it as `style.css?v=…`: when you change `style.css`, change that version (for example, to today's date) in all three pages, so browsers fetch the new styles instead of reusing a saved copy.

## Images

- The sculpture artwork is a fixed, full-height panel on the right on screens 1024px and wider (`banner-tall.webp`, a 1000×1116 crop centered on the crystal), and a slim strip above the content on smaller screens (`banner-600.webp`, `banner-1200.webp` and `banner-1200.jpg`, 1200×670 at full size).
- `avatar-256.webp` and `avatar-256.jpg` are the round headshot next to the name on Home (a 256×256 square crop shown as a 64px circle).
- `shot-hey-mama-*`, `shot-tagalong-*` and `shot-campaign-lab-*` are screenshots of those three live apps on the Projects page. Each comes as 600px and 1200px WebP plus a 1200×750 JPEG fallback (16:10).
- `photo-1200.jpg` is the 1200×800 image shown when the site is shared on social media or in messages.

## Publish with GitHub Pages

1. Open **Settings → Pages** in this repository.
2. Under **Build and deployment**, set **Source** to **Deploy from a branch**.
3. Choose branch **main** and folder **/ (root)**, then **Save**.

The site is live at https://basantinashine-dotcom.github.io/. Because this repository is named `basantinashine-dotcom.github.io`, GitHub serves it at the root of that address. Every push to `main` republishes it.

## Edit it

Change the text directly in the page files. When you add a story or project, add a one-line entry for it on Home that links to its anchor, so the two stay in step.

To preview locally, run `python3 -m http.server` in this folder and open http://localhost:8000. Opening the files directly also works, but the menu links then show folder listings instead of pages.
