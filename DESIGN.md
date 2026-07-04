# DESIGN.md

version: 1.0
name: Modern Developer Blog

---

## 1. Visual Theme

Minimal, editorial, premium.

Inspired by:
- Vercel
- Linear
- Medium
- Tailwind UI

Goals:
- Focus on readability.
- Lots of whitespace.
- Soft borders.
- Rounded cards.
- Smooth animations.
- Excellent dark mode.

Avoid:
- Glassmorphism
- Heavy gradients
- Bootstrap appearance
- Excessive shadows

---

## 2. Color Palette

Background
#FAFAFA

Surface
#FFFFFF

Text
#111827

Secondary Text
#6B7280

Border
#E5E7EB

Primary
#2563EB

Primary Hover
#1D4ED8

Success
#10B981

Warning
#F59E0B

Danger
#EF4444

Dark Background
#09090B

Dark Surface
#18181B

Dark Border
#27272A

Dark Text
#FAFAFA

---

## 3. Typography

Headings

Font:
Inter

H1
48px
700

H2
36px
700

H3
28px
600

Body

18px
Line height 1.8

Code

JetBrains Mono

Buttons

15px
600

---

## 4. Layout

Container

1280px

Reading Width

760px

Spacing Scale

4
8
12
16
24
32
48
64
96

Sections

120px vertical spacing

---

## 5. Navigation

Sticky

Transparent initially

Blur after scrolling

Height

72px

Contains

Logo

Articles

Categories

Search

GitHub

Theme Switcher

Subscribe

---

## 6. Hero Section

Large title

Short subtitle

Primary CTA

Featured article

Background illustration

---

## 7. Article Cards

Radius

20px

Padding

24px

Border

1px solid

Hover

Lift 4px

Shadow

Image

16:9

Metadata

Author

Reading time

Date

Category

---

## 8. Blog Page

Sidebar

Categories

Popular Posts

Newsletter

Main Content

Markdown typography

Code highlighting

Table of Contents

Share buttons

Comments

Related articles

---

## 9. Components

Buttons

Primary

Secondary

Ghost

Cards

Rounded

Soft border

No shadow

Inputs

Rounded

Large padding

Blue focus ring

Tags

Rounded pill

Small

Primary outline

---

## 10. Animations

Duration

200ms

Ease

ease-out

Hover

Scale 1.02

Fade

Slide Up

Never bounce.

---

## 11. Icons

Lucide Icons

Stroke 1.75

---

## 12. Images

Rounded 16px

Lazy loaded

Subtle zoom on hover

---

## 13. Accessibility

WCAG AA

Visible focus ring

Keyboard navigation

Minimum touch size 44px

---

## 14. Responsive

Desktop

1440+

Laptop

1024

Tablet

768

Mobile

375

Collapse sidebar on tablet.

Stack cards on mobile.

---

## 15. Agent Instructions

Always use:

- TailwindCSS
- shadcn/ui
- Framer Motion
- Lucide Icons
- Responsive first
- Semantic HTML
- Dark mode support
- Beautiful typography
- Proper spacing

Never:

- Bootstrap
- Material UI
- Tiny buttons
- Dense layouts
- Generic dashboard styling