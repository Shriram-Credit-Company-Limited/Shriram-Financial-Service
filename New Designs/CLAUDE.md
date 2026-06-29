# Shriram Financial Services — Project Guide

A static, multi-page marketing/product site. One `.html` file per page, a shared
stylesheet, and a shared behaviour script. No build step, no framework.

---

## ⭐ The three sources of truth

Every page and every change flows through these three files. Keep them in sync.

| File | Role | What it holds |
|---|---|---|
| **`DESIGN-SYSTEM.md`** | **Direction** — the rulebook | Which components, tokens, spacing, colour, typography, conventions to use and how they behave. The "what & why". |
| **`styles.css`** | **Implementation** — the styles | The actual CSS: tokens, typography (incl. the global `line-height:1.5` rule), every component, responsive breakpoints, reduced-motion guard. Editing it updates **every page at once**. |
| **`app.js`** | **Implementation** — the behaviour | Shared JS: nav (hamburger + sticky auto-hide) and the accessible FAQ accordion. |
| **`CLAUDE.md`** (this file) | **Rulebook / onboarding** | The conventions below — the first thing any builder (human or AI) reads. |

`DESIGN-SYSTEM.md` = the direction. `styles.css` + `app.js` = the implementation.
This file = the rules for using them.

---

## 🔒 Standing rules

1. **Every page links the shared files.** In `<head>`, after the Google-Fonts link:
   `<link rel="stylesheet" href="styles.css" />`. Near `</body>`:
   `<script src="app.js"></script>`. Never paste the design-system CSS/JS inline — only
   add a small page-specific `<style>` block (and inline `<script>`) for what's truly unique
   to that page.

2. **Every page follows `DESIGN-SYSTEM.md`.** It is the source of truth for all pages, not
   just one. Reuse its documented components and conventions; don't restyle from scratch.

3. **Every text element is `line-height:1.5`, site-wide — no exceptions.** Enforced globally
   in `styles.css`.

4. **Icons are `16 / 20 / 24 / 32 / 40px` only.** The `<svg>` glyph uses one of these five sizes —
   nothing else. (Icon *containers* follow the spacing grid below, not this scale.)

5. **Spacing sits on the 8px grid.** Every `gap` / `padding` / `margin` / box size is a multiple
   of **8px** (multiples of **4px** worst case). No off-grid values like 6, 10, 14, 18, 41.

6. **The hero is standardised across every page.** Same gradient, `min-height`,
   `.hero-inner` padding (`56px 0`), H1/lead font sizes and two-column `gap:56px` on all of
   `equity`, `sip-calculator`, `about`, `demat`, `contact`, `grievance-redressal` — **only the
   text content changes**, no other visual jumps. H1 and lead are both capped at
   `--hero-text-w` (600px) so titles wrap to a **consistent column width** (long ones go 2–3
   lines, short ones stay one line). The right-side card on the two-column heroes (`demat`,
   `contact`) uses `--hero-aside-w` (`clamp(360px,40vw,520px)`) — **identical on both**. See
   DESIGN-SYSTEM §4.2.

7. **🟢 Design-guideline changes land in ALL THREE places.** When asked to add or change a
   design guideline, update **all three**, or the change is not done:
   - **`DESIGN-SYSTEM.md`** — document the rule/direction.
   - **`styles.css`** (and/or `app.js`) — implement it.
   - **`CLAUDE.md`** (this README) — reflect it in the rules if it's project-wide.

---

## ▶️ Running / preview

- Local server: `python3 serve.py` — serves this directory on **port 4178**; `/` maps to
  `about.html`.
- Open any page directly, e.g. `http://localhost:4178/contact.html`.

---

## 📄 Pages

| File | Page |
|---|---|
| `about.html` | About Us |
| `become-a-partner.html` | Become a Partner (single-column hero; registration form is a body "Apply" section using the Contact `.hf-*` field treatment) |
| `calculators.html` | Calculators hub |
| `contact.html` | Contact Us (tabbed: Customer Care / Branch Locator / Downloads) |
| `demat.html` | Open a Demat Account |
| `equity.html` | Equity (also the page the design tokens were originally lifted from — **not** a privileged reference) |
| `sip-calculator.html` | SIP Calculator |

When adding a new page: copy the `<head>` boilerplate + nav/footer from any existing page,
link `styles.css` and `app.js`, then build from the components in `DESIGN-SYSTEM.md`.
