# Bhekani Abantu Services: website mock-up

A design mock-up of a refreshed website for Bhekani Abantu Services (Roodepoort). It is a static site with no build step. Pages: `index.html` (home), `services.html`, `about.html`, `team.html`, `contact.html`, and a quote form for each service group (`quote-guarding.html`, `quote-technical.html`, `quote-risk.html`, `quote-maintenance.html`), sharing `styles.css` and `script.js`. Images are in `images/`.

**This is not the company's live site.** It was prepared by Pablo Lebelo as a free proposal.

## Run it locally

Open `index.html` in a browser, or serve the folder:

```
python3 -m http.server 8000
```

## Forms

The forms check required answers and then show a confirmation, but **nothing is sent** because this is a mock-up. Before going live, point them at a form backend (for example a Cloudflare Worker that emails info@basecurity.co.za, or a service such as Formspree) and remove the `e.preventDefault()` confirmation logic in `script.js`.

## Before this goes in front of the client

- The logo, team portraits, vehicle photo and PSIRA/SAIDSA badges were cropped from phone screenshots of their current site, so they are low resolution. Ask the company for the original files.
- Add their PSIRA registration number.
- Check every service description against what they currently offer.

## Content source

All copy is rewritten from the current site at basecurity.co.za (services, vision and mission, management names and roles, contact details).
