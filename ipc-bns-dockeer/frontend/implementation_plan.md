# Implementation Plan: IPC-BNS Legal Mapper

Create a modern, professional, government-grade legal technology platform that enables users to convert Indian Penal Code (IPC) references into their corresponding Bharatiya Nyaya Sanhita (BNS) provisions, search legal codes, and contact support.

---

## Technical Stack & Configuration
- **Framework**: Next.js 15 (App Router, `src/` directory structure)
- **Language**: TypeScript (`strict` mode enabled)
- **Styling**: Tailwind CSS (with custom color palette for a professional legal-tech theme)
- **Animations**: Framer Motion for modern transitions and micro-animations
- **Icons**: Lucide React for clean, minimalist legal-tech visual icons
- **Form Handling**: React Hook Form for Contact form validations
- **API Integration Ready**: Defined mock API routes in Next.js (`/api/analyze-document` and `/api/section-search`) to make it instantly ready for actual backend connection.
- **Theme**: Premium light and dark mode support

---

## Design System & Color Palette
To project a government-grade, professional legal-tech appearance, we will use a refined color palette:
- **Primary Color**: Elegant, deep legal green (`hsl(150, 40%, 15%)` for dark accents, `hsl(150, 45%, 24%)` for headers)
- **Neutral Colors**: Pure White (`#FFFFFF`) for cards, Cool Gray/Slate background (`hsl(210, 40%, 98%)`), and Jet Black (`#0F172A`) for text.
- **Accent Colors**: Slate Purple (`hsl(262, 50%, 40%)`) and Warm Amber/Orange (`#F59E0B`).
- **Typography**: Inter (Modern, professional sans-serif) for body and headlines.
- **Components**: Cards with subtle borders, soft shadows, rounded corners (`rounded-xl`), and crisp interactive transitions.

---

## Proposed Changes & Application Architecture

We will structure the project under the `src/` directory:
- `src/app/layout.tsx`: Root layout with SEO metadata, Lucide icons configuration, Google Font import (Inter), and theme provider.
- `src/app/page.tsx`: Home Page containing:
  - Hero Section
  - Document Analyzer (with File upload & Text area inputs)
  - Interactive Process Flow
  - Results Panel (Split Screen Layout with annotated comparisons)
  - Features grid
- `src/app/about/page.tsx`: About Us page outlining the mission, vision, target users, and key stats.
- `src/app/library/page.tsx`: Legal Library page featuring a search bar, filters (All / IPC / BNS), search results cards, and an "Explain This Section" button connecting to a simulated AI API.
- `src/app/contact/page.tsx`: Contact Us page featuring a validated contact form, organization field, contact information, social links, and a stylized Google Maps mock component.
- `src/components/`:
  - `Navbar.tsx`: Sticky responsive header with navigation links, branding, and dark mode toggle.
  - `Footer.tsx`: Professional legal footer.
  - `DocumentAnalyzer.tsx`: State manager for document ingestion, file reading (PDF/TXT parser simulator), and display.
  - `ThemeToggle.tsx`: Context/state toggle for dark mode.
- `src/app/api/analyze-document/route.ts`:
  - Next.js API route that handles `POST` requests containing file or raw text.
  - Automatically runs a parser that scans text for IPC references, maps them to a built-in dictionary of IPC-BNS sections, and returns annotated text with highlights.
- `src/app/api/section-search/route.ts`:
  - Next.js API route that handles `GET /api/section-search?query=...`
  - Searches through the comprehensive dataset of both IPC and BNS codes and returns titles, descriptions, and related sections.

---

## Comprehensive IPC-BNS Legal Dataset
We will seed our application with a structured legal mapping dictionary containing the most common criminal provisions to ensure highly realistic and accurate mapping:
1. IPC 34 ↔ BNS 3(5) (Common Intention)
2. IPC 120B ↔ BNS 61 (Criminal Conspiracy)
3. IPC 143 ↔ BNS 189(1) (Unlawful Assembly)
4. IPC 147 ↔ BNS 191(1) (Rioting)
5. IPC 188 ↔ BNS 223 (Disobedience to Public Servant Order)
6. IPC 269 ↔ BNS 271 (Negligent Spread of Disease)
7. IPC 279 ↔ BNS 281 (Rash Driving)
8. IPC 299 ↔ BNS 100 (Culpable Homicide)
9. IPC 300 ↔ BNS 101 (Murder - Definition)
10. IPC 302 ↔ BNS 103(1) (Murder - Punishment)
11. IPC 304A ↔ BNS 106 (Causing Death by Negligence)
12. IPC 304B ↔ BNS 80 (Dowry Death)
13. IPC 306 ↔ BNS 108 (Abetment of Suicide)
14. IPC 307 ↔ BNS 109 (Attempt to Murder)
15. IPC 323 ↔ BNS 115 (Voluntarily Causing Hurt)
16. IPC 324 ↔ BNS 118(1) (Voluntarily Causing Hurt by Dangerous Weapons)
17. IPC 325 ↔ BNS 117 (Grievous Hurt)
18. IPC 336 ↔ BNS 125(a) (Act Endangering Life of Others)
19. IPC 337 ↔ BNS 125(b) (Causing Hurt by Act Endangering Life)
20. IPC 338 ↔ BNS 125(c) (Causing Grievous Hurt by Act Endangering Life)
21. IPC 341 ↔ BNS 126 (Wrongful Restraint)
22. IPC 342 ↔ BNS 127 (Wrongful Confinement)
23. IPC 353 ↔ BNS 132 (Assault to Deter Public Servant)
24. IPC 354 ↔ BNS 74 (Assault to Woman with Intent to Outrage Modesty)
25. IPC 354A ↔ BNS 75 (Sexual Harassment)
26. IPC 354B ↔ BNS 76 (Assault to Woman with Intent to Disrobe)
27. IPC 354C ↔ BNS 77 (Voyeurism)
28. IPC 354D ↔ BNS 78 (Stalking)
29. IPC 359 ↔ BNS 137 (Kidnapping)
30. IPC 362 ↔ BNS 138 (Abduction)
31. IPC 375 ↔ BNS 63 (Rape - Definition)
32. IPC 376 ↔ BNS 64 (Rape - Punishment)
33. IPC 378 ↔ BNS 303(1) (Theft)
34. IPC 383 ↔ BNS 308 (Extortion)
35. IPC 390 ↔ BNS 309 (Robbery)
36. IPC 391 ↔ BNS 310 (Dacoity)
37. IPC 405 ↔ BNS 316 (Criminal Breach of Trust)
38. IPC 411 ↔ BNS 317 (Dishonestly Receiving Stolen Property)
39. IPC 415 ↔ BNS 318(1) (Cheating)
40. IPC 420 ↔ BNS 318(4) (Cheating and Dishonestly Inducing Delivery of Property)
41. IPC 427 ↔ BNS 324 (Mischief)
42. IPC 447 ↔ BNS 329(1) (Criminal Trespass)
43. IPC 448 ↔ BNS 329(3) (House-trespass)
44. IPC 465 ↔ BNS 336(1) (Forgery)
45. IPC 468 ↔ BNS 336(3) (Forgery for Cheating)
46. IPC 471 ↔ BNS 340(2) (Using Forged Document as Genuine)
47. IPC 498A ↔ BNS 85 (Cruelty by Husband/Relatives)
48. IPC 499 ↔ BNS 356 (Defamation)
49. IPC 500 ↔ BNS 356 (Defamation Punishment)
50. IPC 506 ↔ BNS 351 (Criminal Intimidation)
51. IPC 509 ↔ BNS 79 (Word/Gesture Intended to Insult Modesty of Woman)

---

## Verification Plan

### Automated Verification
- Verify code compiles successfully with TypeScript: `npm run build` or `npx tsc --noEmit`
- Verify lint rules pass: `npm run lint`

### Manual Verification
- Test PDF/TXT file upload processing in the browser.
- Test the text box analyzer using custom legal paragraphs containing various IPC sections.
- Test that IPC numbers are highlighted in **blue**, BNS in **green**, and descriptions have a **light yellow** background.
- Verify download formats (TXT/PDF) download the annotated reports.
- Verify Legal Library search with queries like "IPC 302", "BNS 103", "Murder", "Theft", "Cheating".
- Verify Contact Form validation error messages and submission animation.
- Verify Dark Mode toggles correctly across all pages.
- Verify fully responsive layout down to mobile screens.
