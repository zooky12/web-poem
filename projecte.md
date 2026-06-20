# Interactive Poem — Web Project Spec (handoff)

A small, heartfelt, mobile-first interactive poem website. A personal gift (boyfriend → girlfriend). Eight full-screen "pages," one verse each, navigated by swipe, with light decorative animations tied to each verse and one main participatory interaction at the end. Deployed as a static page (GitHub Pages).

---

## HARD RULES — read first

- The poem is in **Catalan**. **Reproduce every line EXACTLY. Do NOT translate. Do NOT "correct" spelling or grammar.**
  - All-lowercase is **intentional**.
  - Minimal/no punctuation is **intentional**.
  - `tonteries` (screen 4) is **intentional** — it is a private joke. It echoes what she always says when she laughs ("què tonto ets"). The normative word would be "ximpleries"; do NOT change it. The joke dies if you do.
- Tone: intimate, handmade, warm. **Not** slick or corporate.
- Aesthetic: **pixel art / pixelated**. The maker makes pixel art (Aseprite).
- **Mobile-first, portrait.** It must feel right on a phone above all else.
- Sparse imagery: not every screen needs a photo. Let some verses breathe.

---

## Emotional arc (drives the visual/animation intensity)

The register descends deliberately:
1. cosmic / grand (screen 1)
2. who she is (screens 2–4)
3. the mirror — the spine of the poem (screens 5–6)
4. playful breath (screen 7)
5. plain, naked gratitude (screen 8)

Visual richness should follow this: lush early, simplest and quietest at the end. The ending lands on sincerity, not spectacle.

---

## Navigation

- One verse per screen, full-screen.
- **Swipe to advance.** Recommended: vertical swipe (story/reel style). Horizontal page-turn is an acceptable alternative — pick one, stay consistent.
- Slow pacing. Each screen is a moment. **Do not auto-advance.**
- Respect `prefers-reduced-motion`.

---

## Screens

Each screen = TEXT (verbatim Catalan) · VISUAL · ANIMATION · INTERACTION.

### Screen 1
- **Text:** `el cel s'estrellà en un banc de somriures`
- **Visual:** dark-blue night background, a bench, stars.
- **Animation:** stars; lean into the wordplay in "s'estrellà" (to crash / to turn to stars) — e.g. a star streaks down and settles beside the bench.
- **Context:** the night they met — a real bench where they talked and laughed until midnight.

### Screen 2
- **Text:** `les flors abraçaven amb la força del foc`
- **Visual:** flowers whose petals are made of fire / flame.
- **Concept:** "caring with strength" — her tenderness and her fight fused into one image.
- **Animation:** petals flickering gently like flame.

### Screen 3
- **Text:** `els nostres ulls es trobaren en una dansa de complicitat`
- **Visual:** one of THEIR real chat stickers (eye-related). **ASSET TO PROVIDE.**
- **Animation:** subtle — two elements meeting / locking.
- **Note:** "complicitat" is the relationship's core theme (private language, stickers, inside jokes).

### Screen 4
- **Text:** `rialles nascudes de boges tonteries`
- **Visual:** a mouth going "blah blah blah" (= him) and a laughing face (= her). Him making her laugh.
- **Animation:** blah-blah mouth → she laughs. **Make the direction readable: him → her.**
- **Note:** see HARD RULES re: `tonteries`.

### Screen 5
- **Text:** `les paraules brollaren plenes de valors`
- **Visual:** her, with a hand on a mirror.
- **Note:** screens 5 & 6 are a **matched pair** (the mirror). They must visually read as reflections of each other.

### Screen 6
- **Text:** `i els valors brotaren al cor que escoltava`
- **Visual:** a mirror of screen 5, but with him. Same composition, reflected.
- **Note:** 5 → 6 is the emotional spine: her values take root in him. Visually echo screen 5 as closely as possible.

### Screen 7
- **Text:** `RAWR`
- **Visual:** one of their stickers as background. **ASSET TO PROVIDE.**
- **Animation:** big, fun, single word. A deliberate tonal break — a playful breath right before the ending.

### Screen 8
- **Text:** `gràcies per triar-me`
- **Visual:** heart-shaped balloons rising.
- **MAIN INTERACTION:** the heart balloons can be **tapped / popped**. This is the one big participatory moment — the payoff of the whole piece.
  - Suggestion: popping all of them triggers a small final flourish (a last line, a burst, a soft reveal).
- **Note:** the landing. Keep it plain and sincere; let the interaction carry the emotion, not effects.

---

## Assets the maker will provide
- Pixelated photo(s) of the couple.
- Their real chat stickers — at minimum: one eye-related (screen 3), one for RAWR (screen 7).
- Use clear, obvious placeholders until these are supplied.

---

## Technical
- Static **HTML / CSS / JS**, no backend. Must work on **GitHub Pages**.
- **No browser storage** (localStorage/sessionStorage) — not needed, and it breaks in some sandboxes.
- Keep it lightweight. Pixel assets as PNG with `image-rendering: pixelated`.
- Smooth, reliable swipe on touch devices.

---

## Open decisions (for the maker to confirm)
- Swipe direction: vertical vs horizontal.
- A possible **second** special interaction beyond the final hearts — candidate: a swipe/slider reveal across the mirror pair (5 → 6), so the user physically "turns" her into him.
- Background music? Optional, **off by default, user-initiated** only.