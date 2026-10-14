# Zovariq Digital — premium agency website (v3)

## Preview
Open `index.html` in Chrome, Firefox, Safari or Edge. No dependencies, build tools or paid subscriptions needed.

## Before publishing
- Replace `your-business-email@example.com` in `index.html` with your real agency email.
- Update the portfolio descriptions and add verified case studies, proof and client consent as appropriate. Concept projects are clearly labelled.
- Confirm brand/domain/trademark availability. This website does not establish ownership of the name.
- Add an actual domain URL to the JSON-LD schema after publishing and create a sitemap at that point.

## Publish free to GitHub Pages
1. Create a public GitHub repository, e.g. `zovariq-digital`.
2. Upload `index.html`, `styles.css`, `script.js`, and `favicon.svg` into the repository root.
3. In repository Settings → Pages → Build and deployment, choose Deploy from a branch, select `main` and `/ (root)`, then Save.
4. Visit the URL GitHub displays once Pages deployment completes.
5. Submit that URL to Google Search Console; indexing is not guaranteed.

## Accessibility
Mobile responsive, keyboard skip link, text labels, reduced-motion preferences and semantic sections.

## Performance & stability (v4)
- No external images, CSS frameworks, font requests, video embeds, trackers or JavaScript libraries.
- Progressive enhancement: all text stays visible when JavaScript is disabled or errors.
- Scroll reveals use IntersectionObserver once per visible element and stop observing afterwards.
- Respects reduced-motion preferences; no expensive scroll handlers or looping JavaScript timers.
- CSS illustrations avoid downloading large photos or background videos.
- Contact email is a placeholder and must be replaced before launch.
- This is a static brochure/portfolio site, not a hosting uptime guarantee. Test on target devices and run Lighthouse after deployment.
