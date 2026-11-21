# Advance Dental Clinic – Website

Four independent pages (HTML5, CSS3, vanilla JavaScript). No build step or backend.

Clinic: Advance Dental Clinic · Dr. Binod Kumar Singh · Karma Road, Aurangabad, Bihar 824101, India · 10:30 AM – 7:30 PM · 086770 00360

## Run locally
Open `index.html` in a browser, or serve the folder:

    python3 -m http.server 8000
    # then visit http://localhost:8000

Internet is needed for the Google Maps embed, Google Fonts (falls back to system fonts) and WhatsApp.

## Structure
    index.html  about.html  services.html  contact.html
    assets/css/style.css   assets/js/script.js
    assets/images/*.webp   assets/images/favicon.svg
    IMAGE-PROMPTS.md       (prompt for each image)

## Before publishing
1. **Images.** All 12 supplied images are in place under their exact filenames. `doctor-profile.webp` is a generic portrait, not Dr. Binod Kumar Singh; swap in his real photo when available. `IMAGE-PROMPTS.md` has prompts if you want higher-resolution replacements (the current files are small, so they look soft on large screens).
2. **Confirm services** with the clinic; the Services page lists treatments as information only and asks visitors to confirm availability.
3. **Set your domain.** Replace `https://www.example.com` in the `canonical` and Open Graph tags of each page.
4. **Appointment form.** There is no backend; the form validates input and opens a pre-filled WhatsApp message to +91 86770 00360. It never says an appointment is confirmed.
5. Optionally add qualifications, experience or timings to the About page only once the clinic verifies them.

## Where things are controlled
- WhatsApp number/message: top of `assets/js/script.js`.
- Colours: CSS variables at the top of `assets/css/style.css`.
- Directions and map links: `contact.html`.
