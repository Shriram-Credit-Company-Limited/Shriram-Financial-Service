# Shriram Financial Services — Design System Spec

This is the **single source of truth and direction for every page in this project** —
`about.html`, `calculators.html`, `contact.html`, `demat.html`, `equity.html`,
`sip-calculator.html`, and any page added from now on. It is not specific to one page:
all pages must follow the spacing, colour, typography, components, responsiveness and
motion defined here. Hand this file (with the shared `styles.css` / `app.js`, see §9) to
any builder (human or AI) together with the content for a page; following it reproduces a
consistent design across the whole site. `equity.html` is simply the original page these
tokens were lifted from — it is one example of the system, **not** a privileged reference.

> Stack: a static `.html` file per page that **links the shared `styles.css` and `app.js`**
> (§9), plus a small page-specific `<style>` block for anything unique to that page.
> Font: **Outfit** (Google Fonts), weights 400 / 500 / 600 / 700.
> The design is authored for a 1920px desktop canvas and reflows fluidly to mobile.
> No eyebrow / kicker label above hero or section headings on any page unless explicitly requested.
> **Every text element renders at `line-height:1.5`** (see §2) — no exceptions.

> **Keeping the system in sync:** any change to a design guideline must be applied in **all
> three** sources — **`DESIGN-SYSTEM.md`** (this file, the direction), **`styles.css`** /
> `app.js` (the implementation), and **`CLAUDE.md`** (the project rulebook). A guideline
> change is not done until it lands in all three.

---

## 1. Design tokens (CSS variables)

Declare these on `:root` exactly as below.

```css
:root{
  /* Backgrounds */
  --page:#fcf8ef;            /* page base */
  --sec-light:#fef8ee;       /* alternating section background A */
  --sec-tint:#f6efe1;        /* alternating section background B (slightly deeper) */
  --card:#fffdf8;            /* card / container fill */

  /* Lines & borders */
  --card-border:#e1e0db;     /* card + grid borders */
  --card-border-soft:rgba(28,28,22,.13);
  --row-line:rgba(28,28,22,.08);  /* table row + list dividers */

  /* Olives / greens */
  --olive-title:#2e3914;     /* big section titles */
  --olive-head:#2d3813;      /* table header fill */
  --olive-deep:#1b2010;      /* dark cards + dark CTA text */
  --green:#009d58;           /* success ticks */

  /* Text */
  --ink:#1c1c16;             /* primary headings */
  --ink-2:#46463c;           /* secondary body (costs/analyse sections + table values) */
  --ink-3:#595959;           /* default body copy */
  --muted:#73736a;           /* card body copy */
  --muted-2:#9a9a8e;         /* footer link text */

  /* Accent / gold */
  --gold:#e0a82e;            /* hero primary CTA fill */
  --gold-2:#f2b83f;          /* highlights, ticks, arrows, accents */
  --gold-btn:#f3b83f;        /* standard CTA button fill */
  --gold-ink:#231a06;        /* hero CTA label */
  --olive-ink:#2e3914;       /* gold-button label */

  --blue:#2f7ef4;            /* "Login" link */

  /* Layout scale */
  --pad:clamp(20px, 8vw, 144px); /* fluid section side padding (144 @1920); overridden to 16px ≤768px */
  --container-pad:32px;          /* inner padding of all content containers */
  --section-y:72px;              /* section top/bottom padding */
  --cta-w:220px;                 /* standard CTA button width (desktop) */
  --hero-text-w:600px;           /* hero H1 + lead max text-column width (same on every page) */
  --hero-aside-w:clamp(360px, 40vw, 520px); /* hero right-side container (Demat & Contact forms) — identical on both */
}
```

Footer-only colours (not tokens): footer fill `#15150f`, contact text `#b4b4a6`,
copyright `#7c7c70`, nav/faq text `#333`, faq answer `#404040`.

---

## 2. Typography scale

Family: `'Outfit', system-ui, -apple-system, Segoe UI, Roboto, sans-serif`.
Global: `font-feature-settings:"liga" 0;` `-webkit-font-smoothing:antialiased;`

**Line-height is `1.5` for every text element, site-wide — no exceptions.** This is
enforced globally in `styles.css` (a low-level rule sets `line-height:1.5 !important` on
all text/interactive elements: headings, paragraphs, links, buttons, inputs, list items,
table cells, etc.). The "Line-height" column in the table below is therefore historical —
treat **1.5** as the only correct value and do not introduce display/footer/step overrides
that deviate from it. Every new page inherits this automatically by linking `styles.css`.

| Role | Size | Weight | Line-height | Colour | Notes |
|---|---|---|---|---|---|
| Section title | 40px | 400 | 1.5 | `--olive-title` | `text-transform:capitalize` |
| Section lead | 16px | 400 | 1.5 | `--ink-3` (or `--ink-2` in Costs/Analyse) | |
| Sub-title (block heading) | 24px | 500 | 1.5 | `--ink` | |
| Sub-lead | 16px | 400 | 1.5 | `--ink-3` / `--ink-2` | |
| Card title | 20px | 500 | 1.5 | `--ink` | |
| Card body | 16px | 400 | 1.5 | `--muted` (`--ink-3` in checklists/risks) | |
| Hero H1 | 40px | 500 | 1.5 | `#fff` | no tracking; highlight span `--gold-2`; `max-width:var(--hero-text-w)` (600px) — wraps to 2–3 lines, same column width on every page |
| Hero lead | 18px | 400 | 1.5 | `rgba(255,255,255,.74)` | `max-width:var(--hero-text-w)` (600px) |
| Hero feature label | 16px | 500 | 1.5 | `rgba(255,255,255,.9)` | gold ✓ (15px) before each |
| Table header cell | 16px | 600 | 1.5 | `#fff` | centered, on `--olive-head` |
| Table key cell (col 1) | 16px | 600 | 1.5 | `--ink` | centered |
| Table value cell | 16px | 400 | 1.5 | `--ink-2` | centered |
| Step number | 32px | 400 | 34px | `--gold` | |
| FAQ question | 14px | 500 | 1.5 | `#333` | |
| FAQ answer | 14px | 400 | 1.5 | `#404040` | `padding-top:16px` |
| Dark card label ("Approach 01") | 14px | 400 | 21.45px | `rgba(255,255,255,.5)` | `letter-spacing:.65px` |
| Dark card title | 24px | 500 | 1.5 | `#fff` | |
| Dark card body | 16px | 400 | 1.5 | `rgba(255,255,255,.72)` | `max-width:450px` |
| CTA-box H3 | 38px | 500 | 42.56px | `--olive-deep` | `letter-spacing:-0.76px`, centered |
| CTA-box sub | 17px | 400 | 28.05px | `--olive-deep` | centered |
| Footer brand name | 17px | 700 | 28.05px | `#fff` | `letter-spacing:.68px` |
| Footer column heading | 14px | 700 | 23.1px | `#fff` | `letter-spacing:.42px` |
| Footer link | 14.5px | 400 | 23.925px | `--muted-2` | |
| Footer copyright | 13px | 400 | 21.45px | `#7c7c70` | |

**Mobile body-copy rule (≤768px):** every 16px body element drops to **14px**
(`.sec-lead, .sub-lead, .card-p, .cat p, .step p, .check-row .tx, .appr p, .risk p, .cell p`).
Big titles fluidly shrink: section title `clamp(28px,7vw,40px)`, sub-title
`clamp(20px,5.4vw,24px)`, hero H1 `clamp(28px,7vw,40px)`, CTA H3 `clamp(24px,6.4vw,38px)`.

---

## 2a. Icon sizes (hard rule)

**Every icon renders at one of these five sizes only: `16 / 20 / 24 / 32 / 40px`.** No other
icon size is allowed — round to the nearest of these. Use:
- **16px** — inline icons inside text, links, list rows, table cells, contact pills,
  download / directions links, small buttons.
- **20px** — standalone UI icons: search field, info/hours banner, back-to-top.
- **24px** — feature / card icons (channel cards, dropdown chevrons, office mark, success tick).
- **32px** — large feature / hero-level icons and prominent illustrative marks.
- **40px** — the largest standalone icons (oversized feature or empty-state icons).

This governs the **icon glyph itself** (the `<svg>` width/height). The tinted **container**
around an icon (e.g. a rounded square) is a layout box and follows the §3 spacing grid
(`40 / 48 / 72`, etc.), not the icon scale. Pure-CSS carets/chevrons are decorative, but keep
them ≤8px.

---

## 3. Spacing & layout rules

**🟦 The 8px grid (hard rule).** Every spacing value — `gap`, `padding`, `margin`, and
fixed box sizes — is a **multiple of 8px** (`8, 16, 24, 32, 40, 48, 56, 72 …`). Use a
**multiple of 4px** (`4, 12, 20, 28, 44 …`) only when 8 is too coarse — that is the worst
case. **Never** use off-grid values (`6, 10, 14, 18, 41 …`); round them to the nearest 8
(or 4). Micro-gaps inside a control (e.g. a label above its value) bottom out at **4px**.

**Section shell**
- Side padding: `var(--pad)` (≈144px @1920, fluid to 20px).
- Vertical padding: `var(--section-y)` → **72px desktop / 56px mobile**.
- Side margin on mobile (≤768px) is **16px** (`--pad:16px`).
- **Sections are natural (content) height** — they are NOT forced to the viewport height.
  Each is simply its content plus the 72px (56px mobile) top/bottom padding. The hero is the
  only height-driven block — **552px on a 1920 canvas**, set as `min-height:clamp(440px, 29vw, 552px)`
  so it scales down proportionally on smaller screens.
- Sections alternate background `--sec-light` / `--sec-tint`.
- Inner vertical rhythm via `gap`: **56px** between major blocks, **32px** block→grid/table,
  **16px** title→lead, **12px** compact card title→body, **24px** checklist rows & grid gutters.

**Containers (cards)**
- Fill `--card`, `border:1px solid --card-border`, `border-radius:24px`.
- Inner padding `var(--container-pad)` → **32px desktop / 24px mobile**, all sides.

**Proportional mobile padding scale (≤768px).** Container 32→24, section 72→56, and every
other padding **above 32px** is scaled ≈×0.8 and rounded to the nearest 8px:

| Element | Desktop | Mobile |
|---|---|---|
| Section side margin (`--pad`) | ≤144 (fluid) | 16 |
| Container padding | 32 | 24 |
| Section top/bottom (all sections incl. FAQ) | 72 | 56 |
| Hero inner (top/bottom) | 120 | 96 |
| CTA box | 64 / 60 | 48 |
| Footer | 80 / 36 | 64 / 32 |
| Hero feature rule (`padding-top`) | 36 | 32 |

Paddings ≤32px (gaps, table cells, small UI) are left unchanged (table cells get their own
mobile rule, below).

**Radii:** cards/containers/tables `24px`; CTA box `24px`; buttons `4px` (gold/dark) and
`9px` (hero gold-lg); social tiles `8px`; nav links `8px`.

---

## 4. Components

### 4.1 Nav (`.nav`)
- 80px tall, `background:#ffffff` (solid white — no blur), side padding `var(--pad)`.
- `position:sticky; top:0; z-index:100` + auto-hide: hides on scroll down, reappears on
  scroll up (`transition:transform .35s ease`; hidden = `translateY(calc(-100% - 1px))` —
  the extra 1px prevents a residual hairline at the header's old bottom edge).
- Left: logo (white rounded box, cropped image) + nav links (label + chevron, 14px/500/#333).
- Right: actions group only — **Login** link + dark CTA (200px). (No search box.)
- **Responsive:** ≤1500px tighten nav gaps; **≤1300px collapse to a hamburger**
  (`.nav-toggle` ☰→✕) with a `position:fixed` dropdown `.mobile-menu` under the bar.

### 4.2 Hero (`.hero`)
- Height: **552px on a 1920 canvas**, set as `min-height:clamp(440px, 29vw, 552px)` so it
  scales down proportionally on smaller screens and never clips content (440px floor). Radial
  gradient `radial-gradient(125% 210% at 100% -8%, #4f583b 0%, #363a2c 50%, #1d1d1d 100%)`.
- Inner padding 120px top/bottom (96 mobile). Content: H1 (with gold highlight span),
  lead, primary CTA (`.btn-gold`), then a feature rule: a `border-top:1px solid rgba(255,255,255,.16)`
  strip (`padding-top:36px`) with ✓ chips (`flex-wrap`, gold ✓ + label).
- **🟢 Standardised hero (no page-to-page jumps).** The hero must look identical on every
  page (`equity`, `sip-calculator`, `about`, `demat`, `contact`, `grievance-redressal`) —
  only the **text content** changes. Same gradient, `min-height`, `.hero-inner` padding
  (`56px 0`, 48px mobile), H1 size (40 → `clamp(28px,7vw,40px)`), lead size (18 → 16 mobile)
  and two-column `gap:56px`.
  - **H1 + lead share one text-column width:** both are capped at **`--hero-text-w` (600px)**.
    Long titles therefore wrap to 2–3 lines and short titles stay on one line, but the text
    column is the **same width on every page**. Do not give a hero H1 its own width or let it
    run full-bleed.
  - **Two-column heroes** (`demat`, `contact`) place the right-side card/form in a container of
    **`--hero-aside-w` (`clamp(360px, 40vw, 520px)`)** — **identical on both** so the box edge
    never shifts when navigating between them. `about`'s stat grid is its own width (different
    content) but uses the same `gap:56px`.
- **🟢 The hero layout is canonical in `styles.css` — pages do NOT re-declare it.** Everything
  structural (`.hero`, `.hero-inner` padding, H1/lead sizes + `--hero-text-w` cap, the
  `.hero-grid` flex + `gap:56px`, the `.hero-aside` width, and the **≤980px stacking**) ships in
  `styles.css`. A page only adds the *content-specific* look of its aside (the form's
  background/padding/fields, the pills, etc.). **Never** copy the grid/aside-width/stacking rules
  into a page or hard-code an aside width — use the classes and inherit. Build a hero from these
  two templates verbatim:

  **Single-column hero** (`equity`, `sip-calculator`, `grievance-redressal`, …):
  ```html
  <section class="hero" id="sec-hero" data-section="hero">
    <div class="hero-inner">
      <h1>Headline With A <span class="g">Gold Span</span></h1>
      <p class="lead">One- or two-sentence subheader.</p>
      <div class="cta"><a class="btn-gold" href="#">Primary CTA</a></div>
      <!-- optional: <div class="hero-feats"><div class="feats">✓ chips…</div></div> -->
    </div>
  </section>
  ```

  **Two-column hero** (`demat`, `contact`, and any future split hero):
  ```html
  <section class="hero" id="sec-hero" data-section="hero">
    <div class="hero-grid">
      <div class="hero-inner"> … h1 / lead / cta or feats / pills … </div>
      <form class="hero-form hero-aside …"> … aside content … </form>
    </div>
  </section>
  ```
  The right element carries **`hero-aside`** (gives it `--hero-aside-w` + the mobile stack);
  its second class (`hero-form`, etc.) carries only its own visual styling.

### 4.3 Generic section heading block
```
<div class="stack" style="gap:16px">
  <p class="sec-title">…</p>
  <p class="sec-lead">…</p>
</div>
```
Sub-blocks use the same pattern with `.sub-title` / `.sub-lead`.

### 4.4 Two-card row (`.row-2`)
`display:flex; gap:32px; align-items:stretch`; children `.card` are `flex:1 0 0`,
column layout, `gap:16px`. Stacks to one column ≤768px.

### 4.5 Category grid (`.cat-grid`)
4-col CSS grid inside a bordered `border-radius:24px` clip; cells `.cat` carry right/bottom
1px borders (last col/row stripped). **4 cols → 2 (≤1024) → 1 (≤560)**; border resets are
handled per breakpoint.

### 4.6 Steps (`.steps`)
One bordered rounded box, `display:flex`; each `.step` (`flex:1 0 0`, padding container-pad)
shows a gold number (32px) + title + body, separated by 1px `.step-div` verticals.
**Stacks vertically ≤900px** (dividers hidden, bottom borders between steps).

### 4.7 Checklist card (`.check-card`, uses `.card`)
Column, `gap:32px` (title→list). `.check-list` `gap:24px` (→ **16px on mobile**, tighter
text↔divider rhythm); each `.check-row` = green bold ✓
(`--green`, width 13.438px) + text (16px/`--ink-3`), with 1px `.check-sep` dividers between.
Cards in a row are equal height (`align-items:stretch`).

### 4.8 Tables (`.table.t3` / `.table.t4`)
- Grid `repeat(N, minmax(0,1fr))` (the `minmax(0,…)` is required so columns shrink on
  mobile), `background:--card`, `border-radius:24px`, `overflow:hidden`. Add `.bordered`
  for a 1px outer border (used by the Trading-Strategies & vs-Mutual-Funds tables; the
  Brokerage & Tax tables omit it).
- Header cells `.cell.th` on `--olive-head`, white 600 centered. Body cells `.cell.tb`
  with `border-top:1px solid --row-line`; first column `.k` (600/`--ink`), rest `.v`
  (400/`--ink-2`). Cell padding `16px 24px`. `.cell p{overflow-wrap:break-word}`.
- **Mobile:** wrap each table in `.t-scroll{overflow-x:auto}`; ≤768px cell padding → `12px 6px`
  and font 14px so 3–4 columns fit with **no horizontal scroll**.

### 4.9 Research / dark cards (`.appr`)
`background:--olive-deep`, `border-radius:24px`, padding container-pad, `display:flex; gap:32px`.
Left column: label + title + body; right: "Explore →" (`--gold-2`, 15px/600).
**Hover:** lighten to `#26301a`, border `#3a471b`, and arrow `translateX(6px)` — `transition .25s`.
No lift or shadow (subtle colour shift + arrow only). Stacks ≤820px.

### 4.10 Risk cards (`.risks` / `.risk`)
`display:flex; gap:24px`; cards `flex:1 0 0`, container-pad, `gap:12px`, title 20px + body.
**4 → 2 (≤1024) → 1 (≤560).**

### 4.11 FAQ (`.faq-wrap`)
- Standard section: natural height, side padding `var(--pad)`, vertical `var(--section-y)` (72 / 56).
- Two columns (`.faq-cols`, `gap:48px`): left `.faq-left` (title + `.faq-acc` accordion),
  right `.faq-side` (464px container card). **Stacks ≤900px.**
- Accordion items `.faq-item` (`.card` fill, padding 24px, `gap:40px`): question + 24px
  plus/minus SVG icon. Open state `.faq-item.open` reveals `.qa-wrap` answer.
- Side card: title (20px/500/#222320) + paragraph + gold CTA; a faint (`opacity:.1`) user
  SVG watermark positioned `left:var(--container-pad); top:64px` — **desktop only, hidden ≤1024px**.
  Its stroke is **background-dependent**, exactly like the accordion (see §8): strokeless by
  default (suits `--sec-tint`); light-background pages add the 1px `--card-border`. Always stroke
  (or un-stroke) the accordion **and** the side card together so the FAQ block stays consistent.
- Note: the mobile dropdown menu's `border-bottom` lives on `.mobile-menu.open` only (not the
  closed state) — otherwise a `position:fixed`, `max-height:0` menu paints a 1px line where the
  hidden header's bottom edge was.

### 4.12 CTA box (`.cta-sec` / `.cta-box`)
Section is natural height (72/56 padding); box is transparent, `border-radius:24px`, padding `64px 60px`
(48 mobile), centered H3 + sub + gold CTA.

### 4.13 Footer (`footer`)
Fill `#15150f`, padding `80px var(--pad) 36px` (64/32 mobile). `.foot-top` is
`flex; flex-wrap:wrap; gap:48px`: brand block (logo mark + name + description + contact)
+ link columns. Bottom bar: 1px top divider, copyright + 4 social tiles (36px, `border-radius:8px`).
Columns wrap then stack on mobile; bottom bar stacks ≤768px.

### 4.14 Buttons / CTAs

Button naming (sizes beyond "Large" to be defined later):

- **Primary – Large** (`.btn-gold`) — the gold CTA used across the page (hero + section CTAs):
  `--gold-btn` fill, 40px tall, `width:var(--cta-w)` (220px), `border-radius:4px`,
  label 12px/500/`--olive-ink`.
- **Secondary – Large** (`.btn-dark`) — the black header CTA: `#333` fill, white 12px,
  **`width:200px`** (narrower than the standard 220px CTA).

Width & alignment:
- **Page CTAs (Primary – Large) are 220px wide** at every breakpoint (`--cta-w`) — they do
  **not** go full-width on mobile. The header CTA (Secondary – Large) is 200px.
- Alignment: the **hero CTA is left-aligned**; the standalone **section CTAs (Types, Costs,
  Analyse) and the final CTA are centered** (`align-self:center`). The **FAQ helper-card
  ("Need A Clearer Direction?") CTA is left-aligned** (it follows its card's left-aligned content).

---

## 5. Responsive breakpoints (summary)

| Max-width | What changes |
|---|---|
| 1500px | Nav: tighten gaps |
| 1300px | Nav → hamburger + fixed dropdown menu |
| 1024px | Category grid 4→2; risks 4→2 |
| 980px | **Two-column hero stacks** (`.hero-grid` → column; `.hero-aside` full-width) — same for every split hero |
| 900px | Steps stack; FAQ columns stack (side card full width) |
| 820px | Research cards stack |
| 768px | **Phone:** body copy 16→14; container pad 32→24; section 72→56; hero 120→96; CTA box →48; footer →64/32; table cells →12/6; section/heading fonts shrink via clamp |
| 560px | Category grid →1; risks →1 |

`html,body{ overflow-x:clip }` (clip, not hidden, so `position:sticky` keeps working).

---

## 6. Animations & motion

| Element | Motion |
|---|---|
| Sticky header | `transform .35s ease`; JS adds `.nav--hidden` (`translateY(calc(-100% - 1px))`) on scroll-down past 80px, removes on scroll-up |
| Hamburger icon | bar spans `transition .25s`; `.nav.open` morphs ☰→✕ |
| Mobile menu | `max-height` transition `.35s ease` (0 → 560px) |
| FAQ accordion | `.qa-wrap` `grid-template-rows:0fr→1fr` `transition .38s cubic-bezier(.4,0,.2,1)`; the plus icon's vertical bar `scaleY(0)` + `opacity` `.38s` (plus→minus) |
| **Card Hover Animation 1** | The standard card hover, for **dark-green cards**: on hover the dark olive surface lightens (`--olive-deep` `#1b2010` → `#26301a`) and the border lightens (`#1b2010` → `#3a471b`), and the CTA arrow (`.arr`) nudges `translateX(5–6px)`. **No lift, no shadow**, `transition .25s ease`. To use it the card itself must be a dark-green card (olive-deep fill, white title, `rgba(255,255,255,.72)` body, `--gold-2` CTA + gold icons). Used on the Equity research-approach cards and the SIP page "Explore More" cards. |
| **Card hover — light cards** | The same idea applied to **light (`--card`) cards**: on hover the surface gets a subtle warm wash (`#fffdf8` → `~#fbf5e8`) and the border defines slightly (`--card-border` → `~#d8d1bf`). **Never a drop-shadow or lift** — card hovers are always a quiet surface + border shift, `transition .25s ease`. Used on the Contact page's document & branch cards. |
| **Scroll reveal** | Every major block fades + slides up (`opacity 0→1`, `translateY(18px)→0`, `.6s`) as it enters the viewport, with a light per-sibling stagger (`70ms`, capped `280ms`). **Progressive enhancement:** the hidden state lives on `.js-reveal [data-reveal]` — `app.js` adds the `.js-reveal` flag to `<html>` and the `[data-reveal]` attribute + `IntersectionObserver` only when motion is allowed and IO is supported, so without JS (or under reduced-motion / no-IO) every block stays fully visible. **Neutralised** under `prefers-reduced-motion` (the flag isn't added, plus a CSS `!important` visible override as a backstop). Blocks targeted: `.hero-inner > *`, `.calc-hero > *`, `.section > *`, `.faq-cols`, `.cta-box`, `footer .foot-top > *`, `.foot-bottom`. Wired automatically for every page on the shared `app.js`. |
| All | wrap motion in `@media (prefers-reduced-motion: reduce)` to disable (search roll is already guarded) |

---

## 7. Build checklist for a new page

1. **Link the shared design system, do not copy it.** In `<head>`, after the Google-Fonts
   link, add `<link rel="stylesheet" href="styles.css" />`; near `</body>` add
   `<script src="app.js"></script>`. These carry all tokens, base resets, typography, every
   component, the responsive breakpoints, the global `line-height:1.5` rule, the reduced-motion
   guard, the nav (hamburger + sticky auto-hide), and the FAQ accordion. **Never paste the
   design-system CSS/JS inline** — only add a small page-specific `<style>` block (and inline
   `<script>`) for things unique to that page. Every existing page already does this.
2. Reuse the component classes documented here; only change **content** and add/remove
   sections/containers per the page's content template.
3. Keep section backgrounds alternating `--sec-light` / `--sec-tint`.
4. Sections are natural (content) height with 72px top/bottom padding (56 mobile) — not forced
   to the viewport height. The hero is the only height-driven block: 552px on a 1920 canvas via
   `min-height:clamp(440px, 29vw, 552px)`, scaling down on smaller screens.
4a. **Build the hero from the §4.2 templates verbatim** — the standardised hero is canonical in
   `styles.css` (gradient, padding, H1/lead sizes + `--hero-text-w` cap, `.hero-grid` `gap:56px`,
   `.hero-aside` = `--hero-aside-w`, ≤980px stacking). Only add the aside's own content styling.
   Do **not** re-declare the grid, cap an H1 width, or hard-code an aside width — no deviations.
5. Page CTAs use `.btn-gold` = **Primary – Large** (220px, all breakpoints; hero left-aligned,
   others centered); the header CTA `.btn-dark` = **Secondary – Large** (200px).
6. Tables always wrapped in `.t-scroll`; grids use `minmax(0,1fr)`.
7. Page-specific JS stays inline after the `app.js` include (the shared nav + accordion come
   from `app.js`; do not re-implement them).
8. Verify at 1920 / 1440 / 1024 / 768 / 375: no horizontal scroll, nav doesn't clip,
   tables don't scroll on mobile, every text element is at `line-height:1.5`.

---

## 8. Page conventions (applies to every page)

These rules are mandatory defaults for all pages built from this system, unless a
specific instruction overrides them for a given element.

- **Hero on every page.** Every page opens with the dark `.hero` block (the equity
  hero gradient + `.hero-inner` 56/48px padding). It must carry a **header** (`<h1>`,
  with a `.g` gold highlight span) and a **subheader** (`.lead`, max-width 600px). The
  gold CTA and the ✓ feature rule are optional but encouraged for full fidelity. **Hero
  height is 552px on a 1920 canvas** — `min-height:clamp(440px, 29vw, 552px)` — adapting
  down proportionally on smaller screens.
- **Left-align everything by default.** Section titles and all body copy are
  left-aligned. **Do not center-align** any section content unless that element is
  explicitly defined as centered — the only centered elements in this system are the
  standalone gold section CTAs and the final CTA box (§4.14 / §4.12). No
  `text-align:center` / `margin:0 auto` on titles, leads or paragraphs.
- **Questions section is always titled "General Questions"** — never "FAQ" or
  "Frequently Asked Questions" — and is left-aligned like every other section.
- **Accordion opens one item at a time.** Opening a question closes any other open
  question (single-open behaviour, not independent toggles). It is wired by the shared
  `app.js` (see §9.3) — markup just needs `.faq-item > .faq-q (button) + .qa-wrap`.
- **General Questions stroke is background-dependent (applies to the whole FAQ block).**
  The card fills (`--card` `#fffdf8`) are almost identical to the lighter section background
  (`--sec-light` `#fef8ee`), so the accordion's and helper card's edges disappear on it.
  The rule covers **both** the accordion (`.faq-acc`) **and** the helper side card
  (`.faq-side`) — always stroke or un-stroke the two **together** so the block stays
  consistent. **Decide per page by which alternating background the section lands on:**
  - On the **lighter background (`--sec-light`)** — as on the SIP Calculator page — give
    both a **1px `--card-border` stroke** so they have a defined edge, as a page-level
    override (not in `styles.css`):
    `.faq-acc{ border:1px solid var(--card-border); padding:1px; }`
    `.faq-side{ border:1px solid var(--card-border); }`
  - On the **deeper background (`--sec-tint`)** — as on the Equity and Demat pages —
    **omit the stroke on both**; there is already enough contrast. This is the default in
    `styles.css` (`.faq-acc` and `.faq-side` ship strokeless), so no override is needed.
  Because sections alternate `--sec-light` / `--sec-tint` page to page, the same FAQ block
  needs the stroke on one page and not the other — always check the background first.
- **Calculator pages — "Ready to build your future?" CTA.** Place it at the **bottom
  of the calculator section** as a full-width **horizontal bar** (`.ready-bar`:
  heading left, gold button right), not as a side column beside the results.
- **Bullet points are olive green.** Every bulleted-list marker uses `--olive-title`
  (`#2e3914`) as its fill — never gold or grey.

---

## 9. Shared assets, semantics, accessibility & SEO

As of the multi-page refactor, the design system lives in two shared files. **Do not
paste the CSS/JS blocks inline anymore** — link the shared files and keep only
page-specific rules in each page's own small `<style>` block.

### 9.1 Shared files

- **`styles.css`** — the entire design-system base (tokens, typography, the global
  `line-height:1.5` rule, every component, responsive breakpoints, the reduced-motion guard,
  focus rings, `.sr-only` and `.skip-link`). **Linked by every page** (`about`, `calculators`,
  `contact`, `demat`, `equity`, `sip-calculator`, and every page added from now on):
  `<link rel="stylesheet" href="styles.css" />` immediately after the Google-Fonts link.
  Editing `styles.css` changes every page at once — it is the canonical implementation of
  this document.
- **`app.js`** — shared behaviour: the nav (hamburger + sticky auto-hide) and the
  accessible single-open General Questions accordion. Linked once near `</body>`:
  `<script src="app.js"></script>`. Page-specific JS (e.g. the SIP calculator) stays
  inline on its page, after the `app.js` include.
- **Page-specific CSS** stays in a per-page `<style>` block (e.g. `.calc-*` on the
  calculators page, the calculator components on the SIP page).

### 9.2 Semantic heading hierarchy

Headings are real heading tags, not styled `<p>`s, so the document has a valid outline:

- `<h1>` — hero headline (exactly one per page).
- `<h2 class="sec-title">` / `<h2 class="faq-title">` — section titles.
- `<h3 class="sub-title">` — block sub-headings; also the FAQ side-card heading.
- `<h4 class="card-h">` / `.ch-title` / `.cat h4` / `.step h4` / `.risk h4` / `.appr h4` —
  leaf card/grid headings.

Never skip a level. The styling classes carry the look, so the tag is free to be semantic.

### 9.3 Accessibility baseline (every page)

- **Skip link** `<a class="skip-link" href="#main">` as the first body element, and a
  `<main id="main">` landmark wrapping everything between the nav and the footer.
- **General Questions accordion** uses a real `<button class="faq-q">` per question with
  the answer in a sibling `.qa-wrap`. `app.js` wires `aria-expanded`, `aria-controls` and
  `role="region"` automatically and keeps it single-open. Keyboard works for free.
- **Decorative SVGs** carry `aria-hidden="true"`; icon-only social links get `aria-label`.
- **Reduced motion** — all transitions/animations are neutralised under
  `@media (prefers-reduced-motion: reduce)` (in `styles.css`); JS animations (e.g. the
  calculator count-up) check `matchMedia('(prefers-reduced-motion: reduce)')`.
- **Focus** — visible `:focus-visible` outline on links, buttons and inputs.

### 9.4 SEO / `<head>`

Every page includes: a descriptive `<title>` and `<meta name="description">`, a
`<link rel="canonical">`, Open Graph + Twitter card tags, and `<meta name="theme-color">`.
Pages with a General Questions section also embed **`FAQPage` JSON-LD**
(`<script type="application/ld+json">`) whose questions/answers mirror the visible accordion.

### 9.5 Calculator pattern (SIP calculator reference)

The calculator section (`.calc-row` = input panel + results) supports:

- **Inputs**: amount, duration, expected return and an **annual step-up**, each a slider
  two-way-bound to a typed field, with min/max scale labels under the track. A
  **frequency** segmented control (Monthly / Quarterly / Yearly) drives the maths.
- **Money fields are comma-grouped** (en-IN) live as you type; values clamp to range on blur.
- **Maths** is computed period-by-period (annuity-due) so step-up and frequency are exact.
- **Results**: a donut (invested vs returns, total value in the centre), invested & returns
  cards, an **inflation-adjusted** "today's money" line, and a count-up animation
  (reduced-motion aware). A collapsible **year-by-year breakdown** table backs it up.
- **Shareable state** — inputs are reflected in the URL query (`history.replaceState`) and
  restored on load; a **Copy link** button copies the current scenario.
- **`aria-live`** screen-reader summary announces the settled result; sliders expose
  `aria-valuetext` matching the visible value.
- The contextual CTA bar (`.ready-bar`) headline reflects the current amount/frequency.
