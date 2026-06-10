# HNH Consulting, LLC

Marketing site for HNH Consulting. Static HTML, CSS, and JavaScript. No build step.

**AI infrastructure. Human greatness.**

## Pages

| File | Purpose |
| --- | --- |
| `index.html` | Homepage, full StoryBrand flow |
| `services.html` | Work with me, flagship AI OS Build Sprint |
| `about.html` | About Hosanna Noelle |
| `blog.html` | Blog index with three sample post cards |
| `contact.html` | Booking link, email, and a note form |

Shared files: `styles.css` (whole design system) and `main.js` (nav toggle, FAQ accordion).

## Images

`images/` currently holds solid brand-color placeholders so the site previews cleanly.
Replace each with the real editorial photo, keeping the same filename:

- `hero.jpg` — homepage hero, full body editorial shot
- `about.jpg` — about page, navy blazer headshot
- `services.jpg` — services page, warm ivory blouse
- `blog.jpg` — blog accent
- `headshot.jpg` — social share image and contact

## Contact form setup (Formspree)

The note form on `contact.html` sends submissions straight to your inbox through
[Formspree](https://formspree.io), a free service. To turn it on you edit one line:

1. Sign up at formspree.io with `contact@hosannanoelle.com`.
2. Create a new form. Formspree gives you an endpoint like
   `https://formspree.io/f/abcdwxyz`. The ID is the last part, `abcdwxyz`.
3. Open `main.js`. At the very top, find this line:

   ```js
   var HNH_FORMSPREE_ID = "YOUR_FORM_ID";
   ```

   Put your real ID between the quotes, for example `"abcdwxyz"`. That is the
   only change. You do not touch `contact.html`.
4. Submit the form once yourself and confirm the first email from Formspree to
   verify the address. After that, notes arrive automatically with no redirect.

The free plan covers 50 submissions a month. The honeypot field already blocks
most spam bots. Until the ID is set, the form shows a friendly note telling
visitors to email you directly, so nothing looks broken before you finish setup.

## Preview locally

From this folder:

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000 in your browser. You can also double click `index.html`,
but the local server is closer to how it runs live.

## Push to GitHub

```bash
git init
git add .
git commit -m "HNH Consulting website"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/hnhconsulting-website.git
git push -u origin main
```

To publish free with GitHub Pages: in the repo go to Settings, then Pages, set the
source to the `main` branch root, and save. Your site goes live at
`https://YOUR-USERNAME.github.io/hnhconsulting-website/` within a minute or two.
