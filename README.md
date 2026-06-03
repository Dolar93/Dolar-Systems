# DOLAR_SYSTEMS — Showcase Agencji AI Automatyzacji

**Stack:** Next.js 16 · TypeScript · Tailwind CSS v4 · Framer Motion · React Three Fiber

---

## Uruchomienie lokalne

```bash
npm install
# Skonfiguruj .env.local (patrz niżej)
npm run dev
```

Aplikacja: http://localhost:3000

---

## Zmienne środowiskowe (.env.local)

| Zmienna | Opis |
|---------|------|
| `EMAIL_HOST` | Host SMTP (smtp.gmail.com) |
| `EMAIL_PORT` | Port (587) |
| `EMAIL_USER` | Adres email nadawcy |
| `EMAIL_PASS` | Hasło aplikacji Google |
| `CONTACT_TO` | Adres docelowy formularza |

**Hasło aplikacji Gmail:** Konto Google → Bezpieczeństwo → Hasła aplikacji (wymaga 2FA).

---

## Deploy

**Vercel (rekomendowany):**
```bash
npx vercel
# Ustaw env vars w panelu: Project → Settings → Environment Variables
```

**Railway:**
```bash
railway login && railway up
# plik railway.json jest już skonfigurowany
```

---

## Struktura

```
app/
  layout.tsx        — Root layout, fonty, SEO
  page.tsx          — Strona główna
  globals.css       — Design tokens (Tailwind v4)
  api/kontakt/      — POST endpoint formularza
components/
  sections/         — Hero, WhatWeAutomate, CaseStudies, AboutUs, Contact
  ui/               — NavBar, Footer, SectionLabel, GridBackground
  animations/       — Framer Motion (Reveal, StaggerReveal)
lib/
  mailer.ts         — Nodemailer
```

---

## Customizacja kluczowych danych

- Kolory: `app/globals.css` → `@theme inline {}`
- Zespół: `components/sections/AboutUs.tsx` → `TEAM`
- Case studies: `components/sections/CaseStudies.tsx` → `CASES`
- Branże: `components/sections/WhatWeAutomate.tsx` → `INDUSTRIES`
- NIP/dane: `components/ui/Footer.tsx`
