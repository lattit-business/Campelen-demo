# Campelen på Bryggen AS – Premium Website

> **"Bergens fremste fiskeutstyrbutikk i hjertet av historiske Bryggen"**
> Conversion-focused premium website for Campelen på Bryggen AS – Bergen's iconic fishing & camping gear store located inside the UNESCO-listed Bryggen wharf buildings.

---

## 🎯 Project Goal

Turn Google Maps / "fiskeutstyr Bergen" search visitors into **phone calls, contact form submissions, expert advice requests, and in-store visits**. Built to the quality standard of top Norwegian web agencies.

---

## ✅ Implemented Features

### Design & UX
- **"Bryggen Fishing Heritage" theme** – Deep navy (#001F3F) × fishing buoy orange (#FF6600) × sea green (#006666) × warm wood (#8B5A2B) × off-white (#F8F5F0)
- **Typography**: Inter (modern UI) + Playfair Display (editorial headings)
- Fully **responsive mobile-first** design
- Smooth **scroll-triggered animations** (Intersection Observer)
- **Sticky header** with blur-glass effect on scroll
- Ken Burns **hero image** effect
- Real-time **"Open Now / Stengt"** badge in trust bar
- **Custom SVG logo** (fishing rod motif)
- Premium CSS custom properties throughout

### Sections (6 main)
1. **Hero** – Full-screen Bryggen image, headline, 3 CTAs (call, tips modal, visit), trust features strip, animated scroll indicator, floating Google review badge
2. **Om Oss** – Store story, team mention (Kristian), 3 highlight cards, dual CTAs, stat card overlay ("1947 – Etablert")
3. **Butikk / Produkter** – 5-card product category grid (Stenger & Sneller, Agn & Fortom, Klær & Utstyr, Camping, Havfiske-spesial), hover-zoom images, "Få råd om dette" micro-CTAs
4. **FiskeTips** – 4 expert tip articles with tag chips (category-based), each ending with "Send oss en melding" CTA, bottom conversion banner
5. **Kundeanmeldelser** – Animated star summary (4.8/5, 326+), 6-card touch-swipe carousel (auto-play, dots, prev/next), "Bli neste fornøyde kunde" CTA block
6. **Kontakt & Besøk oss** – Pulsating click-to-call hero button, address/hours/social details, Google Maps embed, 3-type contact form with real-time validation

### Conversion Elements
- **Floating mobile call button** (appears after scroll past hero)
- **Contact modal** (opens from hero CTA, fisketips CTAs)
- Product card → auto-fill kontakt form topic + scroll
- **Trust bar** (rating, reviews count, address, hours, phone) below hero
- Click-to-call on phone number throughout

### Technical
- Zero external JS dependencies (pure Vanilla JS)
- Font Awesome 6.5 (CDN) for icons
- Google Fonts (Inter + Playfair Display)
- Semantic HTML5 + ARIA labels for accessibility
- `loading="lazy"` on all non-hero images
- Analytics hook stubs (ready for Google Analytics)
- Print stylesheet

---

## 📁 File Structure

```
index.html          # Main single-page website (all 6 sections)
css/
  style.css         # Complete CSS (~900 lines, CSS custom properties)
js/
  main.js           # All JavaScript modules (~350 lines)
README.md           # This file
```

---

## 🌐 Entry Points

| URL | Description |
|-----|-------------|
| `/index.html` | Main website (home page) |
| `/#om-oss` | Om Oss section |
| `/#produkter` | Butikk / Produkter section |
| `/#fisketips` | FiskeTips section |
| `/#anmeldelser` | Kundeanmeldelser section |
| `/#kontakt` | Kontakt & Besøk oss section |

---

## 🗄️ Data Model

### Table: `contact_submissions`

| Field | Type | Description |
|-------|------|-------------|
| `id` | text | Auto-generated UUID |
| `name` | text | Visitor's full name |
| `phone` | text | Phone number (optional) |
| `email` | text | Email address |
| `message` | rich_text | Message / inquiry text |
| `type` | text | `radgivning` / `sporsmal` / `bestilling` / `tips` / `modal` |
| `status` | text | `new` / `read` / `replied` |
| `created_at` | datetime | Auto-generated |
| `updated_at` | datetime | Auto-managed |

**API Endpoints:**
- `GET  tables/contact_submissions` – List all submissions
- `POST tables/contact_submissions` – Create new submission (used by contact form and modal)
- `GET  tables/contact_submissions/{id}` – Get single record
- `PATCH tables/contact_submissions/{id}` – Update status

---

## 🎨 Design System

### Colors
```css
--navy:        #001F3F   /* Primary – deep Bryggen sea */
--accent:      #FF6600   /* Fishing buoy orange */
--teal:        #006666   /* Sea green */
--wood:        #8B5A2B   /* Warm wood */
--offwhite:    #F8F5F0   /* Background warm white */
```

### Typography
- **Headings**: Playfair Display (serif) – editorial, trustworthy
- **Body / UI**: Inter (sans-serif) – clean, modern
- Scale: clamp-based fluid typography

---

## 📞 Business Info

| | |
|---|---|
| **Store** | Campelen på Bryggen AS |
| **Address** | Bredsgården 2, 5003 Bergen |
| **Phone** | 55 32 88 93 |
| **Email** | post@campelenpabryggen.no |
| **Mon–Fri** | 10:00 – 17:00 |
| **Saturday** | 10:00 – 16:00 |
| **Sunday** | Stengt |
| **Google Rating** | 4.8 / 5 (326+ reviews) |

---

## 🚀 Deployment

To publish this website and make it live online, go to the **Publish tab** in the editor. One-click deployment will generate your live URL automatically.

---

## 🔮 Recommended Next Steps

1. **Replace placeholder images** with actual professional photos of the store interior/exterior (shoot in golden hour at Bryggen for best results)
2. **Connect Google Analytics** (GA4) – hook is ready in `js/main.js` `Analytics.track()`
3. **Add real email address** – update `post@campelenpabryggen.no` if different
4. **Connect Facebook page** – update the Facebook link in footer and header
5. **Add organization schema markup** (JSON-LD) for rich Google results
6. **Implement email notifications** when new form submissions arrive (backend integration needed)
7. **Add a Products page** with detailed product listings and Hooked+ integration
8. **Instagram feed** – embed latest posts from @campelenpabryggen (if active)
9. **Blog/FiskeTips** expand – more articles for SEO on "fiskeutstyr Bergen" keywords
10. **Add a Cookie consent banner** for GDPR compliance
