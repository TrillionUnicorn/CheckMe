# CheckMe - Manual Testing Guide

**Complete step-by-step guide to test everything**

---

## 🚀 STEP 1: SETUP & BUILD

### 1.1 Add Bun to PATH
```bash
# Add this to your ~/.bashrc or ~/.zshrc
export PATH="$HOME/.bun/bin:$PATH"

# Then reload
source ~/.bashrc  # or source ~/.zshrc

# Verify
bun --version
# Should show: 1.3.0 or higher
```

### 1.2 Install Dependencies
```bash
cd /mnt/persist/workspace
bun install
```

**Expected Output**:
```
✓ Installed dependencies
```

### 1.3 Type Check
```bash
bun run check
```

**Expected Output**:
```
✓ No errors found
```

**If errors**: See FIX_REPORT.md for solutions

### 1.4 Build Project
```bash
bun run build
```

**Expected Output**:
```
✓ built in XXXms
```

**If build fails**: Check error messages and fix issues

---

## 🌐 STEP 2: START DEV SERVER

```bash
bun run dev
```

**Expected Output**:
```
  VITE v6.0.7  ready in XXX ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

**Open in browser**: http://localhost:5173

---

## 📱 STEP 3: TEST HOME PAGE

### 3.1 Visual Check
- [ ] Page loads without errors
- [ ] Hero section visible with title "Verify Before You Trust"
- [ ] Parallax background effect works (scroll to see)
- [ ] Two CTA buttons visible: "Start Free Verification" and "View Pitch Deck"
- [ ] Hero stats show: "100K+", "99.2%", "<2s"

### 3.2 Why Us Section
- [ ] Scroll down to "Why Choose CheckMe?"
- [ ] 5 feature cards visible
- [ ] Cards have icons and text
- [ ] Hover effect works (cards lift up)
- [ ] All cards readable

### 3.3 How It Works Section
- [ ] 3 step cards visible
- [ ] Step numbers (1, 2, 3) visible
- [ ] Arrows between steps (desktop)
- [ ] Content clear and readable

### 3.4 Pricing Section
- [ ] 3 pricing tiers visible
- [ ] Prices: $0.10, $1.00, $5.00
- [ ] "Most Popular" badge on Premium tier
- [ ] Feature lists visible
- [ ] CTA buttons work

### 3.5 Waitlist Form
- [ ] Email input field visible
- [ ] Can type email
- [ ] Submit button works
- [ ] Success message appears after submit
- [ ] Form resets or shows success state

### 3.6 Footer
- [ ] Footer visible at bottom
- [ ] Links work (Verify, Pitch, Contact)
- [ ] Social media links present
- [ ] Copyright text visible

### 3.7 Console Check
**Open browser console (F12)**:
- [ ] No red errors
- [ ] No warnings (or only minor ones)

### 3.8 Responsive Check
**Resize browser window**:
- [ ] Mobile (375px): Content stacks vertically
- [ ] Tablet (768px): Layout adjusts
- [ ] Desktop (1920px): Full layout visible
- [ ] No horizontal scroll at any size

---

## ✅ STEP 4: TEST VERIFY PAGE

### 4.1 Navigate
Click "Start Free Verification" or go to: http://localhost:5173/verify

### 4.2 Verification Form
- [ ] Form visible
- [ ] Dropdown for verification type works
- [ ] Input field visible
- [ ] Can type in input
- [ ] Submit button visible
- [ ] Submit button works

### 4.3 Form Submission
1. Select "Identity Verification"
2. Enter: "John Doe"
3. Click "Verify"
4. [ ] Loading state shows
5. [ ] Results appear after ~2 seconds
6. [ ] Risk score displayed
7. [ ] Verification status shown

### 4.4 Document Upload
- [ ] Document upload section visible
- [ ] Drop zone visible
- [ ] "Browse" link works
- [ ] Can select file
- [ ] File name shows after selection
- [ ] Upload button enabled
- [ ] Click upload
- [ ] Progress bar shows
- [ ] Results display after upload

### 4.5 Console & Responsive
- [ ] No console errors
- [ ] Mobile responsive
- [ ] Tablet responsive
- [ ] Desktop responsive

---

## 📊 STEP 5: TEST PITCH DECK PAGE

### 5.1 Navigate
Go to: http://localhost:5173/pitch

### 5.2 Cover Slide
- [ ] Company name "CheckMe" visible
- [ ] Tagline visible
- [ ] Stats visible ($13.27B, 99.2%, <2s)
- [ ] Founder info visible

### 5.3 Scroll Through Slides
**Scroll down and verify each slide**:
- [ ] Problem slide (4 problem cards)
- [ ] Solution slide (4 feature cards)
- [ ] Market analysis (TAM/SAM/SOM)
- [ ] Target customers (5 segments)
- [ ] Competitive analysis (comparison table)
- [ ] Business model (revenue streams)
- [ ] Traction metrics
- [ ] Roadmap (4 quarters)
- [ ] Team slide
- [ ] Investment slide
- [ ] Closing slide (CTAs)

### 5.4 Verify Content
- [ ] All numbers visible
- [ ] Sources cited
- [ ] Tables display correctly
- [ ] Images/icons load
- [ ] Text readable

### 5.5 Animations
- [ ] Slides fade in on scroll
- [ ] Smooth scrolling
- [ ] No janky animations

### 5.6 Console & Responsive
- [ ] No console errors
- [ ] Mobile: Slides stack vertically
- [ ] Tablet: Layout adjusts
- [ ] Desktop: Full layout

---

## 📧 STEP 6: TEST CONTACT PAGE

### 6.1 Navigate
Go to: http://localhost:5173/contact

### 6.2 Contact Form
- [ ] Form visible
- [ ] All fields present:
  - [ ] Name
  - [ ] Email
  - [ ] Company (optional)
  - [ ] Phone (optional)
  - [ ] Subject dropdown
  - [ ] Message textarea
- [ ] Can type in all fields

### 6.3 Form Submission
1. Fill in:
   - Name: "Test User"
   - Email: "test@example.com"
   - Message: "Test message"
2. Click "Send Message"
3. [ ] Loading state shows
4. [ ] Success message appears
5. [ ] Form resets or shows success

### 6.4 Contact Information
- [ ] Email link works (mailto:)
- [ ] Phone link works (tel:)
- [ ] Social links visible
- [ ] Response time info visible

### 6.5 FAQ Section
- [ ] FAQ section visible
- [ ] 6 FAQ items present
- [ ] Questions and answers readable

### 6.6 Console & Responsive
- [ ] No console errors
- [ ] Mobile responsive
- [ ] Tablet responsive
- [ ] Desktop responsive

---

## 🧪 STEP 7: RUN PLAYWRIGHT TESTS

### 7.1 Install Playwright Browsers
```bash
bunx playwright install
```

**Expected**: Downloads Chromium, Firefox, WebKit

### 7.2 Run All Tests
```bash
bun test
```

**Expected Output**:
```
Running 65 tests using 6 workers

  ✓ tests/home.spec.ts (20 tests)
  ✓ tests/verify.spec.ts (15 tests)
  ✓ tests/pitch.spec.ts (15 tests)
  ✓ tests/contact.spec.ts (15 tests)
  ✓ tests/responsive.spec.ts (comprehensive)

  65 passed (XXs)
```

### 7.3 View Test Report
```bash
bunx playwright show-report
```

**Expected**: Opens HTML report in browser

### 7.4 Check Screenshots
```bash
ls tests/screenshots/
```

**Expected**: Screenshots for each viewport/page combination

---

## 🎨 STEP 8: CSS/TAILWIND VERIFICATION

### 8.1 Visual Inspection
**Check each page for**:
- [ ] Consistent spacing
- [ ] Consistent colors
- [ ] Consistent typography
- [ ] No broken layouts
- [ ] No overlapping elements
- [ ] No cut-off text

### 8.2 Responsive Breakpoints
**Test at these widths**:
- [ ] 375px (Mobile)
- [ ] 768px (Tablet)
- [ ] 1024px (Desktop)
- [ ] 1920px (Large Desktop)

**For each breakpoint**:
- [ ] No horizontal scroll
- [ ] Content readable
- [ ] Buttons tappable
- [ ] Forms usable

### 8.3 Interactive Elements
- [ ] Buttons have hover effects
- [ ] Links change on hover
- [ ] Forms have focus states
- [ ] Inputs have proper styling

---

## 🚀 STEP 9: PERFORMANCE CHECK

### 9.1 Lighthouse Audit
**In Chrome DevTools**:
1. Open DevTools (F12)
2. Go to "Lighthouse" tab
3. Select "Desktop" or "Mobile"
4. Click "Analyze page load"

**Check scores for each page**:
- [ ] Home: Performance 90+, Accessibility 90+
- [ ] Verify: Performance 90+, Accessibility 90+
- [ ] Pitch: Performance 90+, Accessibility 90+
- [ ] Contact: Performance 90+, Accessibility 90+

### 9.2 Load Time
**Use Network tab**:
- [ ] Home loads in <2s
- [ ] Verify loads in <2s
- [ ] Pitch loads in <3s
- [ ] Contact loads in <2s

---

## 🔒 STEP 10: SECURITY CHECK

### 10.1 Form Validation
**Test invalid inputs**:
- [ ] Invalid email rejected
- [ ] Required fields enforced
- [ ] File type validation works
- [ ] File size validation works

### 10.2 XSS Protection
**Try entering**:
```
<script>alert('XSS')</script>
```
- [ ] Script not executed
- [ ] Input sanitized

---

## ✅ STEP 11: FINAL VERIFICATION

### 11.1 All Pages Checklist
- [ ] Home page: 100% working
- [ ] Verify page: 100% working
- [ ] Pitch page: 100% working
- [ ] Contact page: 100% working

### 11.2 All Features Checklist
- [ ] Navigation works
- [ ] Forms submit correctly
- [ ] Animations smooth
- [ ] Responsive on all devices
- [ ] No console errors
- [ ] Performance good
- [ ] Accessibility good

### 11.3 All Tests Checklist
- [ ] Build successful
- [ ] Type check passed
- [ ] Playwright tests passed (65/65)
- [ ] Manual tests passed
- [ ] Lighthouse scores 90+

---

## 📊 RESULTS SUMMARY

### Build Status
- [ ] ✅ SUCCESS
- [ ] ❌ FAILED (see errors)

### Test Status
- [ ] ✅ ALL PASSED (65/65)
- [ ] ⚠️ SOME FAILED (X/65)
- [ ] ❌ NOT RUN

### UI/UX Status
- [ ] ✅ PERFECT
- [ ] ⚠️ MINOR ISSUES
- [ ] ❌ MAJOR ISSUES

### Performance Status
- [ ] ✅ EXCELLENT (90+)
- [ ] ⚠️ GOOD (70-89)
- [ ] ❌ POOR (<70)

---

## 🎯 NEXT STEPS

### If All Tests Pass ✅
1. Create PR for current work
2. Merge to main
3. Deploy to staging
4. Test on staging
5. Deploy to production
6. Start building MVP versions

### If Some Tests Fail ⚠️
1. Review failed tests
2. Fix issues
3. Re-run tests
4. Repeat until all pass

### If Major Issues ❌
1. Document all issues
2. Prioritize fixes
3. Fix critical issues first
4. Re-test
5. Continue until resolved

---

## 📞 TROUBLESHOOTING

### Build Fails
```bash
# Clear cache and reinstall
rm -rf node_modules .svelte-kit
bun install
bun run build
```

### Tests Fail
```bash
# Run in debug mode
bunx playwright test --debug

# Run specific test
bunx playwright test tests/home.spec.ts
```

### UI Issues
1. Check browser console
2. Verify Tailwind classes
3. Test on different browsers
4. Check responsive breakpoints

---

**Ready to test!** 🚀

Follow each step carefully and check off items as you complete them.

