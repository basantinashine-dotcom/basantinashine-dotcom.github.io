# basantinashine-dotcom.github.io

The personal website of Basanti Nashine, Head of Product at Orcana.AI and former Principal PM-T at Amazon.

The site is four static pages, plus build guides for the agents and AI PM Playbooks guides, with one shared stylesheet, no build step and no dependencies. It uses the Geist fonts from Google Fonts and a cream color scheme for every visitor (there is no dark mode).

| Page | File | What's on it |
|---|---|---|
| Home | `index.html` | A wider page: the hero (a thin artwork band, then name and headline), the bio with Background beside it, four compact stat cards that each link to their Work story (the 12 wks → 2 hrs card has a small before/after bar), Selected work as rows with outcomes, Personal projects as screenshot cards, Agents as image cards (three across on wide screens), with a link to the Threads build guide, Get in touch |
| Work | `work/index.html` | The five Selected work stories, each with an anchor (`#search-ads`, `#personalization`, `#advertiser-agents`, `#marketing-mix`, `#next-best-engagement`) |
| Projects | `projects/index.html` | Apps, each with Problem, Solution and Stack: AdCanvas, Hey Mama (with its spec sheet), Tagalong and Campaign Lab (`#adcanvas`, `#hey-mama`, `#tagalong`, `#campaign-lab`) |
| Agents | `agents/index.html` | AI agents, each with Problem, Solution and Stack: the Eval Agent (`#eval-agent`), the Threads Agent (`#threads-agent`) and Decision Log (`#decision-log`) |
| Build guides | `agents/eval-agent/index.html`, `agents/threads-agent/index.html` | Step-by-step guides to building each agent yourself, linked from its entry on Agents ("How to create this on your own"). Add new ones to `sitemap.xml`. |
| AI PM Playbooks | `agentic-evals-101/index.html`, `llm-as-a-judge/index.html`, `rag-evals/index.html`, `agent-guardrails/index.html` | Guides reached from **AI PM Playbooks** menu at the top of every page (a `<details>` dropdown; `nav.js` closes it on Escape or an outside click). **Agentic Evals** is Agentic Evals 101, with scroll-triggered animations, two interactive figures and an interview flashcard deck. **LLM-as-a-Judge** covers judge biases and fixes, with a verbosity toggle and a Cohen’s kappa calculator (`llm-judge.js`). **RAG Evals** separates retrieval from generation, with a retrieval-metrics calculator (`rag.js`). **Agent Guardrails** covers a three-layer defense, when to ask a human and fail-soft UI, with an action picker and a fail-hard/fail-soft toggle (`guardrails.js`). All of them use `agentic-evals.js` for their animations; without it, or with reduced motion, every figure shows its end frame. To add a guide, create its page, add it to the menu on every page and to `sitemap.xml`. |

Home uses Geist for text and Newsreader, a serif, only for the name in the hero.

`home.js` counts the Home stat numbers up from zero and shrinks the “2 hrs” bar once each is on screen. It does nothing for visitors who prefer reduced motion, and without it the final numbers still show.

`copy.js` adds a label and a Copy button to each code block on the build guides; without it the code still shows, just without the button.

`style.css` holds every style. The colors are set once at the top. Each page links it as `style.css?v=…`: when you change `style.css`, change that version (for example, to today's date) in every page, so browsers fetch the new styles instead of reusing a saved copy.

## Images

- The garden painting is a thin full-width band at the top of Home, above the name, on every screen size, as decoration (empty alt text). `band-garden-1536.webp`, `band-garden-1000.webp` and `band-garden-1000.jpg` are a 4:1 slice of the painting centered on the leaves and the creatures' faces; the page shows the middle of it as a thin strip, 12:1 on wider screens and 7:1 on phones.
- The Home project cards reuse the Projects page screenshots and the AdCanvas demo still.
- `avatar-256.webp` and `avatar-256.jpg` are the round headshot next to the name on Home (a 256×256 square crop shown as a 96px circle, 88px on phones).
- `shot-hey-mama-*`, `shot-tagalong-*` and `shot-campaign-lab-*` are screenshots of those three live apps on the Projects page. Each comes as 600px and 1200px WebP plus a 1200×750 JPEG fallback (16:10).
- `threads-agent-loop.gif` is the looping three-step demo of the growth agent (Look, Queue, Approve) on the Agents page, 1152×720, built from illustrative slides with sample data. Visitors whose device asks for reduced motion see `threads-agent-loop-still.webp`, the first slide, instead. `threads-agent-queue.webp`, the Queue slide, is the Threads Agent's card image on Home.
- `eval-agent-still.webp` is an illustration of the Eval Agent's plan step, with sample data, on the Agents page and as its card on Home.
- `decision-log-demo.gif` (Read, Ask why, Share) is a three-step demo on the Agents page, with a `-still.webp` for reduced motion; it uses the sample note from its README.
- The AdCanvas demo on Projects is a continuous animation of one generation: pick the Modern home theme and generate three variations, check each against the original (variation 2's label changed), then approve two and reject one. Browsers get `adcanvas-demo.webp` (smooth, smaller); `adcanvas-demo.gif` is the fallback, and `adcanvas-demo-still.webp` (the check step) is for reduced motion and the Home card. It uses the app's real theme names, settings and review labels. The images come from Campaign Lab's AI-generated Ember & Earth candle photo (`inspired-products/apps/campaign-lab/dist/candle.png`), recolored blue: the original is the jar cut out onto a plain backdrop, the variations are different framings and light, and variation 2's label is repainted to read "EMBRE & CO.".
- `photo-1200.jpg` is the 1200×800 image shown when the site is shared on social media or in messages.

## Visitor counts

Every page loads GoatCounter (`basantipm.goatcounter.com`), which counts visits without cookies, so no consent banner is needed. The dashboard is at https://basantipm.goatcounter.com. Add the same `<script data-goatcounter=…>` line to the `<head>` of any new page. Visits from `localhost` aren't counted.

## Search engines

- `robots.txt` lets every crawler in and points to `sitemap.xml`, which lists each page's address.
- Every page has a `<link rel="canonical">` and a matching `og:url` with its main address.
- Home carries a schema.org `Person` block (job, employer, schools, LinkedIn and GitHub); Agentic Evals 101 carries an `Article` block.
- When you add a page, add its address to `sitemap.xml` and give it a canonical link and `og:url`.
- After a change goes live, resubmit `sitemap.xml` in Google Search Console.

## Publish with GitHub Pages

1. Open **Settings → Pages** in this repository.
2. Under **Build and deployment**, set **Source** to **Deploy from a branch**.
3. Choose branch **main** and folder **/ (root)**, then **Save**.

The site is live at https://basantinashine-dotcom.github.io/. Because this repository is named `basantinashine-dotcom.github.io`, GitHub serves it at the root of that address. Every push to `main` republishes it.

## Edit it

Change the text directly in the page files. When you add a story or project, add a one-line entry for it on Home that links to its anchor, so the two stay in step.

To preview locally, run `python3 -m http.server` in this folder and open http://localhost:8000. Opening the files directly also works, but the menu links then show folder listings instead of pages.
