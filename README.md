# basantinashine-dotcom.github.io

The personal website of Basanti Nashine, Head of Product at Orcana.AI and former Principal PM-T at Amazon.

The site is four static pages, plus build guides for the agents, with one shared stylesheet, no build step and no dependencies. It uses the Geist fonts from Google Fonts and a cream color scheme for every visitor (there is no dark mode).

| Page | File | What's on it |
|---|---|---|
| Home | `index.html` | A wider page: the hero (a thin artwork band, then name and headline), three stat cards and a 12 weeks → 2 hours before/after bar that each link to their Work story, the bio with Background beside it, Selected work as rows with outcomes, Personal projects as screenshot cards, Agents previews in three columns, Get in touch |
| Work | `work/index.html` | The five Selected work stories, each with an anchor (`#search-ads`, `#personalization`, `#advertiser-agents`, `#marketing-mix`, `#next-best-engagement`) |
| Projects | `projects/index.html` | Apps, each with Problem, Solution and Stack: AdCanvas, Hey Mama (with its spec sheet), Tagalong and Campaign Lab (`#adcanvas`, `#hey-mama`, `#tagalong`, `#campaign-lab`) |
| Agents | `agents/index.html` | AI agents, each with Problem, Solution and Stack: the Threads Agent (`#threads-agent`), Decision Log (`#decision-log`) and the Eval Agent (`#eval-agent`) |
| Build guides | `agents/threads-agent/index.html` | A step-by-step guide to building the agent yourself, linked from its entry on Agents ("How to create this on your own") |

Home uses Geist for text and Newsreader, a serif, only for the name in the hero.

`home.js` counts the Home stat numbers up from zero and shrinks the “2 hours” bar once each is on screen. It does nothing for visitors who prefer reduced motion, and without it the final numbers still show.

`copy.js` adds a label and a Copy button to each code block on the build guides; without it the code still shows, just without the button.

`style.css` holds every style. The colors are set once at the top. Each page links it as `style.css?v=…`: when you change `style.css`, change that version (for example, to today's date) in every page, so browsers fetch the new styles instead of reusing a saved copy.

## Images

- The sculpture artwork is a thin full-width band at the top of Home, above the name, on every screen size, as decoration (empty alt text). `band-2000.webp`, `band-1000.webp` and `band-1000.jpg` are a 5:1 slice of the original artwork centered on the crystal; the page shows it as a thin strip, 12:1 on wider screens and 7:1 on phones.
- The Home project cards reuse the Projects page screenshots and the AdCanvas demo still.
- `avatar-256.webp` and `avatar-256.jpg` are the round headshot next to the name on Home (a 256×256 square crop shown as a 96px circle, 88px on phones).
- `shot-hey-mama-*`, `shot-tagalong-*` and `shot-campaign-lab-*` are screenshots of those three live apps on the Projects page. Each comes as 600px and 1200px WebP plus a 1200×750 JPEG fallback (16:10).
- `threads-agent-demo.gif` is the looping three-step demo (Draft, Approve, Post) on the Agents page, 1152×720, built from illustrative slides with sample data. Visitors whose device asks for reduced motion see `threads-agent-demo-still.webp`, the first slide, instead.
- `decision-log-demo.gif` (Read, Ask why, Share) and `adcanvas-demo.gif` (Generate, Check, Approve) are the same kind of three-step demo, on the Agents and Projects pages respectively, each with a `-still.webp` for reduced motion. Decision Log uses the sample note from its README; AdCanvas uses the app's real theme names, sizes and review labels with drawn product images.
- `photo-1200.jpg` is the 1200×800 image shown when the site is shared on social media or in messages.

## Publish with GitHub Pages

1. Open **Settings → Pages** in this repository.
2. Under **Build and deployment**, set **Source** to **Deploy from a branch**.
3. Choose branch **main** and folder **/ (root)**, then **Save**.

The site is live at https://basantinashine-dotcom.github.io/. Because this repository is named `basantinashine-dotcom.github.io`, GitHub serves it at the root of that address. Every push to `main` republishes it.

## Edit it

Change the text directly in the page files. When you add a story or project, add a one-line entry for it on Home that links to its anchor, so the two stay in step.

To preview locally, run `python3 -m http.server` in this folder and open http://localhost:8000. Opening the files directly also works, but the menu links then show folder listings instead of pages.
