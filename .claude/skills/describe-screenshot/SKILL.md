---
name: describe-screenshot
description: Analyze a screenshot image and produce a fully detailed, structured description that can be used directly as an AI prompt. Use when the user wants to describe a UI, design mockup, error screen, or any image for AI prompt input. Trigger on phrases like "describe screenshot", "describe this image for AI", "generate prompt from screenshot", "/describe-screenshot".
tools: Read
---

# Screenshot Describer

Produce a rich, structured natural-language description of a screenshot that can be used verbatim as an AI prompt.

## Input

The user provides a file path to the screenshot (e.g., `/path/to/screenshot.png`).
If no path is given, ask: "Please provide the path to the screenshot you want described."

## Workflow

1. **Read the image** using the Read tool with the provided path.
2. **Analyze every visible element** thoroughly.
3. **Output the description** in the format below — nothing else.

## Analysis Checklist

Go through each category and extract as much detail as possible:

### Layout & Structure
- Overall page/screen type (landing page, dashboard, modal, form, error screen, mobile app, desktop app, etc.)
- Layout pattern (single-column, multi-column, grid, sidebar, full-screen, card-based, etc.)
- Visual hierarchy — what draws the eye first, second, third
- Sections and their relative positions (header, hero, nav, sidebar, footer, content area, etc.)
- Spacing, alignment, and density (compact / spacious / balanced)

### Typography
- Headings: exact text, approximate size hierarchy (H1/H2/H3), font weight, color
- Body text: content summary, font size, line spacing, color
- Labels, captions, placeholders, tooltips — list all visible text verbatim
- Font style observations (serif, sans-serif, monospace, bold, italic)

### Color & Visual Style
- Primary, secondary, and accent colors (describe as precisely as possible: "deep navy #1a1a2e", "warm coral", etc.)
- Background color/texture/gradient
- Overall theme: light, dark, glass-morphism, flat, neumorphic, material, etc.
- Brand feel: professional, playful, minimal, luxurious, techy, etc.

### UI Components & Interactive Elements
- List every visible component: buttons (text, color, size, shape), input fields, dropdowns, checkboxes, toggles, sliders, tabs, accordions, modals, tooltips, badges, chips, avatars, icons, progress bars, pagination, etc.
- For each: position on screen, label/text, state (active, disabled, selected, error, loading)
- Navigation: type (top nav, sidebar, hamburger, breadcrumbs, tabs), items listed verbatim

### Imagery & Media
- Images: subject matter, style (photo, illustration, icon, 3D render), position, approximate size
- Icons: what they represent, style (outline, filled, colored)
- Videos or animations: describe any visible frames or indicators
- Logos: describe shape, text, colors

### Content & Data
- All visible text content summarized or quoted verbatim
- Data visualizations: chart type, axes labels, data ranges, colors
- Tables: column headers, row content, formatting
- Lists: items verbatim

### State & Context
- Any visible error messages, warnings, success states, empty states
- Loading indicators or skeleton screens
- User-specific content (username, avatar, notifications)
- URL bar or browser chrome if visible

### Interactions & Affordances
- Hover states, focus rings, or cursor hints visible
- Drag handles, resize indicators
- Any visible animation paths or transitions

## Output Format

Output ONLY the following block — no preamble, no "Here is your description", no markdown headers outside this block:

```
SCREENSHOT DESCRIPTION (AI PROMPT READY)
=========================================

**Screen Type:** [type]
**Layout:** [layout description]
**Visual Theme:** [theme/style]
**Color Palette:** [colors]

**Visible Text (verbatim):**
[List all text exactly as it appears]

**UI Components:**
[Detailed list of every component, its state, position, and label]

**Content & Data:**
[Summary of all content, data, or media present]

**Visual Hierarchy:**
[What dominates visually, reading order, focal points]

**Interaction Affordances:**
[Buttons, links, inputs, and their apparent states]

**Overall Description:**
[3–5 sentence narrative describing what this screen is, what it does, who it appears to be for, and what the user can do on it]

**Suggested AI Prompt:**
Recreate the following UI: [concise but complete description optimized for a generative AI to reproduce or extend this design — include layout, colors, components, content, and style in one flowing paragraph]
```

Output nothing outside the block above.
