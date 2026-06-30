# Shriram Equity — Design System Spec

This is the single source of truth for building new pages that visually match the
**Equity** reference page (`equity.html`). Hand this file to any builder (human or AI)
together with the content for a new page; following it reproduces the exact spacing,
colour, typography, components, responsiveness and motion of the source.

> Stack: a single static `.html` file, plain CSS in a `<style>` block, vanilla JS.
> Font: **Outfit** (Google Fonts), weights 400 / 500 / 600 / 700.
> The design is authored for a 1920px desktop canvas and reflows fluidly to mobile.

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
}
```

Footer-only colours (not tokens): footer fill `#15150f`, contact text `#b4b4a6`,
copyright `#7c7c70`, nav/faq text `#333`, faq answer `#404040`.

---

## 2. Typography scale

Family: `'Outfit', system-ui, -apple-system, Segoe UI, Roboto, sans-serif`.
Global: `font-feature-settings:"liga" 0;` `-webkit-font-smoothing:antialiased;`
Default paragraph `line-height:1.5`.

| Role | Size | Weight | Line-height | Colour | Notes |
|---|---|---|---|---|---|
| Section title | 40px | 400 | 1.5 | `--olive-title` | `text-transform:capitalize` |
| Section lead | 16px | 400 | 1.5 | `--ink-3` (or `--ink-2` in Costs/Analyse) | |
| Sub-title (block heading) | 24px | 500 | 1.5 | `--ink` | |
| Sub-lead | 16px | 400 | 1.5 | `--ink-3` / `--ink-2` | |
| Card title | 20px | 500 | 1.5 | `--ink` | |
| Card body | 16px | 400 | 1.5 | `--muted` (`--ink-3` in checklists/risks) | |
| Hero H1 | 40px | 500 | 1.5 | `#fff` | no tracking; highlight span `--gold-2`; one line on desktop |
| Hero lead | 18px | 400 | 1.5 | `rgba(255,255,255,.74)` | `max-width:600px` |
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

## 3. Spacing & layout rules

**Section shell**
- Side padding: `var(--pad)` (≈144px @1920, fluid to 20px).
- Vertical padding: `var(--section-y)` → **72px desktop / 56px mobile**.
- Side margin on mobile (≤768px) is **16px** (`--pad:16px`).
- **Most sections are `min-height:100vh` (use `100dvh` too) and vertically center their
  content** (`display:flex; flex-direction:column; justify-content:center`), so a single
  section fills the viewport ("one section per screen"). Taller content simply grows past 100vh.
  **Exceptions kept at natural (content) height:** the hero (fixed `610.898px`), the first
  "about/definition" section (`#sec-about` → `min-height:0`), and the final CTA section
  (`.cta-sec`). Apply full-height per section, not blindly to every block.
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
| Section top/bottom | 72 | 56 |
| Hero inner (top/bottom) | 120 | 96 |
| FAQ section (top/bottom) | 158 | 128 |
| CTA box | 64 / 60 | 48 |
| Footer | 80 / 36 | 64 / 32 |
| Hero feature rule (`padding-top`) | 36 | 32 |

Paddings ≤32px (gaps, table cells, small UI) are left unchanged (table cells get their own
mobile rule, below).

**Radii:** cards/containers/tables `24px`; CTA box `22px`; buttons `4px` (gold/dark) and
`9px` (hero gold-lg); social tiles `9px`; nav links `10px`.

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
- `min-height:100vh`, radial gradient
  `radial-gradient(125% 210% at 100% -8%, #4f583b 0%, #363a2c 50%, #1d1d1d 100%)`.
- Inner padding 120px top/bottom (96 mobile). Content: H1 (with gold highlight span),
  lead (max 600px), primary CTA (`.btn-gold`), then a feature rule: a `border-top:1px solid rgba(255,255,255,.16)`
  strip (`padding-top:36px`) with ✓ chips (`flex-wrap`, gold ✓ + label).

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
**Hover:** lighten to `#26301a`, border `#3a471b`, `translateY(-4px)`, soft shadow, arrow
`translateX(6px)` — all `transition .25s`. Stacks ≤820px.

### 4.10 Risk cards (`.risks` / `.risk`)
`display:flex; gap:24px`; cards `flex:1 0 0`, container-pad, `gap:12px`, title 20px + body.
**4 → 2 (≤1024) → 1 (≤560).**

### 4.11 FAQ (`.faq-wrap`)
- Section is `min-height:100vh`, centered, side padding `var(--pad)`, vertical 158px (128 mobile).
- Two columns (`.faq-cols`, `gap:48px`): left `.faq-left` (title + `.faq-acc` accordion),
  right `.faq-side` (464px container card). **Stacks ≤900px.**
- Accordion items `.faq-item` (`.card` fill, padding 24px, `gap:40px`): question + 24px
  plus/minus SVG icon. Open state `.faq-item.open` reveals `.qa-wrap` answer.
- Side card: title (20px/500/#222320) + paragraph + gold CTA; a faint (`opacity:.1`) user
  SVG watermark positioned `left:var(--container-pad); top:64px` — **desktop only, hidden ≤1024px**.
- Note: the mobile dropdown menu's `border-bottom` lives on `.mobile-menu.open` only (not the
  closed state) — otherwise a `position:fixed`, `max-height:0` menu paints a 1px line where the
  hidden header's bottom edge was.

### 4.12 CTA box (`.cta-sec` / `.cta-box`)
Section centered & full-height; box is transparent, `border-radius:22px`, padding `64px 60px`
(48 mobile), centered H3 + sub + gold CTA.

### 4.13 Footer (`footer`)
Fill `#15150f`, padding `80px var(--pad) 36px` (64/32 mobile). `.foot-top` is
`flex; flex-wrap:wrap; gap:48px`: brand block (logo mark + name + description + contact)
+ link columns. Bottom bar: 1px top divider, copyright + 4 social tiles (36px, `border-radius:9px`).
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
| 900px | Steps stack; FAQ columns stack (side card full width) |
| 820px | Research cards stack |
| 768px | **Phone:** body copy 16→14; container pad 32→24; section 72→56; hero 120→96; FAQ 158→128; CTA box →48; footer →64/32; table cells →12/6; section/heading fonts shrink via clamp |
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
| Research card hover | bg/border/`translateY(-4px)`/shadow `.25s ease`; arrow `translateX(6px)` |
| All | wrap motion in `@media (prefers-reduced-motion: reduce)` to disable (search roll is already guarded) |

---

## 7. Build checklist for a new page

1. Copy the `:root` tokens, base resets, font link, and the full `<style>` block from
   `equity.html` verbatim — do **not** restyle from scratch.
2. Reuse the component classes above; only change **content** and add/remove
   sections/containers per the page's content template.
3. Keep section backgrounds alternating `--sec-light` / `--sec-tint`.
4. Sections are `min-height:100vh` + centered, **except** hero, the about/definition section,
   and the final CTA section (natural height).
5. Page CTAs use `.btn-gold` = **Primary – Large** (220px, all breakpoints; hero left-aligned,
   others centered); the header CTA `.btn-dark` = **Secondary – Large** (200px).
6. Tables always wrapped in `.t-scroll`; grids use `minmax(0,1fr)`.
7. Carry over both `<script>` blocks (sticky-header/hamburger and FAQ accordion).
8. Verify at 1920 / 1440 / 1024 / 768 / 375: no horizontal scroll, nav doesn't clip,
   tables don't scroll on mobile, sections fill the screen.
