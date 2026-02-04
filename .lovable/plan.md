

## MedPrep AI - Medical Exam Preparation App

A comprehensive frontend application for medical students preparing for anatomy and medical exams (USMLE, Physikum, PLAB, etc.) with a professional, polished design.

---

### Phase 1: Foundation & Public Pages

**Landing Page (Public)**
- Hero section with compelling headline and subtitle about exam preparation
- Auth card with "Student Portal" title and toggle between Login/Signup modes
- Login: email, password, Sign in button, Google sign-in option
- Signup: email, full name, password, Create account button
- Three feature cards: Adaptive engine, Global exam styles, Instant feedback
- Three pricing cards: Starter (€0), Pro Monthly (€9.99), Annual (€99)
- Footer with copyright and legal links

**Standalone Legal Pages**
- Pricing page with detailed plan comparison and FAQ accordions
- Terms of Service page
- Privacy Policy page
- Refund Policy page
- All with consistent footer navigation

---

### Phase 2: Main App Shell & Navigation

**App Layout (Logged-in users)**
- Collapsible sidebar with:
  - Logo and app name
  - User card (name, role, token count)
  - Log out button
  - Quiz Settings section (language, exam style, mode, questions slider)
- Main content area with three tabs: Quiz, Dashboard, Wallet
- Smooth transitions between views

---

### Phase 3: Quiz Experience

**Topic Selection**
- Heading "Anatomy Professor AI"
- Topic input field with "Surprise Me" random topic button
- "Generate Quiz" button with token cost indicator
- Validation messages for empty topics or insufficient tokens

**Taking Quiz**
- Two modes toggle:
  - **Exam Mode**: All questions displayed, answers hidden until submission
  - **Tutor Mode**: Instant feedback after each answer with explanations
- Question display with radio options (A-E)
- Optional figure/image references
- Professor's Logic explanations and detailed option analysis

**Quiz Results**
- Celebration animation
- Score display with pass/fail styling
- Expandable detailed review for each question
- "Add to Smart Review" and "Report Error" buttons per question
- Start New Quiz button

---

### Phase 4: Dashboard & Analytics

**Performance Dashboard**
- Profile card with name, plan status, member since date
- "Daily AI Mission" cards with suggested activities
- Four key metrics: Exams Taken, Questions Answered, Average Accuracy, Learning Streak
- Performance by Topic bar chart
- Focus Areas section highlighting weak topics
- Recent Exam History table

---

### Phase 5: Wallet & Subscription

**Wallet Tab**
- Current plan status display (Free/Pro)
- Token balance with "1 Quiz = 1 Token" explanation
- Upgrade section with Monthly and Annual plan cards
- Top Up section with demo token request button
- Transaction History table

---

### Phase 6: Spaced Repetition System (SRS)

**Smart Review Overlay**
- "Smart Review Session" heading with progress indicator
- Flashcard display with front/back reveal
- Difficulty rating buttons: Again, Hard, Good, Easy
- "All caught up" success state when no cards due
- Exit Review button

---

### Phase 7: Polish & Interactions

**Loading States**
- Initial app splash screen
- Post-login redirect loading
- Quiz generation loading state
- SRS review loading state

**Toast Notifications**
- "Added to Memory Deck" after SRS add
- "Thanks! We will review this question" after error report
- Login/signup success messages
- Token refill confirmation

---

### Mock Data Included

- Sample user profile with token balance
- 10-15 pre-written anatomy quiz questions with explanations
- Sample quiz history and performance data
- Transaction history examples
- Pre-built flashcard deck for SRS demo

---

This approach gives you a fully interactive prototype to test the entire user journey before connecting real backend services, AI integration, and payment processing.

