# basantinashine-dotcom.github.io

The personal website of Basanti Nashine, Head of Product at Orcana.AI and former Principal PM-T at Amazon.

The site is one static file, `index.html`, plus a few images, with no build step and no dependencies. It uses the Geist fonts from Google Fonts and a cream color scheme for every visitor (there is no dark mode). The colors are set once at the top of the `<style>` block.

- The sculpture artwork is a fixed, full-height panel on the left on screens 1024px and wider (`banner-tall.webp`, a 1000×1116 crop centered on the crystal), and a slim strip above the name on smaller screens (`banner-600.webp`, `banner-1200.webp` and `banner-1200.jpg`, 1200×670 at full size).
- `avatar-256.webp` and `avatar-256.jpg` are the round headshot next to the name (a 256×256 square crop; the page shows it as a 64px circle).
- `shot-tagalong-*` and `shot-campaign-lab-*` are screenshots of those two live apps, shown in Personal projects. Each comes as 600px and 1200px WebP plus a 1200×750 JPEG fallback (16:10).
- `photo-1200.jpg` is the 1200×800 image shown when the site is shared on social media or in messages.

## Publish with GitHub Pages

1. Open **Settings → Pages** in this repository.
2. Under **Build and deployment**, set **Source** to **Deploy from a branch**.
3. Choose branch **main** and folder **/ (root)**, then **Save**.

The site is live at https://basantinashine-dotcom.github.io/. Because this repository is named `basantinashine-dotcom.github.io`, GitHub serves it at the root of that address. Every push to `main` republishes it.

## Edit it

Open `index.html` and change the text directly. The sections run in this order: the intro with the round photo, headline and one proof line, **Selected work** (four short stories), **Personal projects** (Hey Mama and the project list), **How I work**, **Background** (one line per role), and the footer links. To preview locally, open the file in a browser.
