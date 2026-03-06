---
name: font-extractor
description: Extract font information from screenshots or images. Use this skill whenever the user uploads a screenshot, UI mockup, design file, or any image and wants to know what fonts, text styles, sizes, weights, or colors are used. Trigger on phrases like "what font is this", "extract fonts from screenshot", "identify text styles", "what typeface", "font analysis", "identify fonts in image", or any time the user shares an image and asks about typography or text appearance.
model: claude-sonnet-4-5
---

# Font Extractor Skill

Analyze screenshots or images to identify and report all font and text style information present.

## Your Task

When given a screenshot or image, carefully examine every visible text element and extract its typographic properties. Report findings as a clear plain-text summary.

## Extraction Process

### Step 1: Identify All Text Elements
Scan the entire image systematically:
- Headings and titles
- Body text / paragraphs
- Labels, captions, metadata
- Button text, navigation items
- UI elements (inputs, tooltips, badges)
- Watermarks or overlays

### Step 2: For Each Text Element, Extract

**Font Family/Name**
- Identify the exact font name if possible (e.g., "Inter", "SF Pro Display", "Roboto", "Georgia")
- Use visual cues: letterform shapes, x-height, stroke contrast, terminals, serifs
- Common UI fonts: Inter, SF Pro, Roboto, Helvetica Neue, Arial, Segoe UI
- Common heading fonts: Playfair Display, Montserrat, Raleway, Oswald
- If uncertain, name the closest match and note it's approximate
- If unidentifiable, state the category: serif / sans-serif / monospace / display / handwritten

**Font Size**
- Estimate relative size in px or pt if scale reference is available
- If no scale reference, use relative descriptors: e.g., "~32px (large heading)", "~14px (body text)"
- Group similar sizes together

**Font Weight**
- Thin (100), ExtraLight (200), Light (300), Regular (400), Medium (500), SemiBold (600), Bold (700), ExtraBold (800), Black (900)
- Use the numeric weight when confident, otherwise: Regular / Medium / Bold / Black

**Font Color**
- Provide hex code if color is clearly readable (e.g., #1A1A1A, #FFFFFF)
- If hex isn't certain, describe: "dark gray", "white", "muted blue (#6B8EAD approx)"
- Note opacity/transparency if apparent

**Text Style**
- Italic: yes/no
- Underline: yes/no
- Strikethrough: yes/no
- ALL CAPS / Title Case / lowercase styling
- Letter spacing: tight / normal / wide (if visually notable)

### Step 3: Group and Summarize

Group text elements by their role/style. Don't list every single word — group by visual style tier:

```
HEADING (H1)
  Text: "Welcome to Dashboard"
  Font: Inter (or SF Pro Display)
  Size: ~32px
  Weight: Bold (700)
  Color: #1A1A1A
  Style: None

SUBHEADING (H2)
  Text: "Overview", "Settings", etc.
  Font: Inter
  Size: ~20px
  Weight: SemiBold (600)
  Color: #333333
  Style: None

BODY TEXT
  Font: Inter
  Size: ~14–16px
  Weight: Regular (400)
  Color: #666666
  Style: None

BUTTON LABELS
  Font: Inter
  Size: ~14px
  Weight: Medium (500)
  Color: #FFFFFF
  Style: ALL CAPS
```

## Output Format

Write a clean plain-text summary organized by text role/tier. Always include:

1. **Overview line**: How many distinct font families are used (e.g., "This design uses 2 font families: Inter and Playfair Display.")
2. **Per-tier breakdown**: As shown above
3. **Notable observations**: Any unusual choices, inconsistencies, or interesting typographic details
4. **Confidence note**: Flag any properties you're uncertain about with "(approx)" or "(uncertain)"

## Tips for Accuracy

- Compare letter shapes carefully: 'a', 'g', 'l', 'I', '1' are most distinctive
- Check if double-story 'g' and 'a' are present (common in humanist sans-serifs like Gill Sans, Frutiger)
- Monospace fonts have equal-width characters
- Geometric sans-serifs (Futura, Montserrat) have near-perfect circles for 'O', 'C', 'G'
- Humanist sans-serifs (Inter, Gill Sans) have more organic letterforms
- System fonts by platform: macOS → SF Pro, Windows → Segoe UI, Android → Roboto
- Web apps commonly use Inter, Plus Jakarta Sans, DM Sans, or Google Fonts
