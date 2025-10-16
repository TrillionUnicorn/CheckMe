# Testing Guide for CheckMe

This document outlines the testing procedures for the CheckMe platform.

## Table of Contents

1. [Manual Testing](#manual-testing)
2. [Automated Testing](#automated-testing)
3. [Performance Testing](#performance-testing)
4. [Security Testing](#security-testing)
5. [Browser Compatibility](#browser-compatibility)

---

## Manual Testing

### Home Page Testing

#### Hero Section
- [ ] Hero title and subtitle display correctly
- [ ] CTA buttons are clickable and navigate to correct pages
- [ ] Hero stats (100K+, 99.2%, <2s) are visible
- [ ] Parallax background effect works on scroll
- [ ] Animations trigger on page load

#### Why Us Section
- [ ] All 5 feature cards display correctly
- [ ] Icons render properly
- [ ] Hover effects work on cards
- [ ] Content is readable and accurate

#### How It Works Section
- [ ] 3-step workflow displays correctly
- [ ] Step numbers are visible
- [ ] Arrows display between steps (desktop)
- [ ] Arrows rotate on mobile
- [ ] Content is clear and concise

#### Pricing Section
- [ ] All 3 pricing tiers display
- [ ] "Most Popular" badge shows on Premium tier
- [ ] Pricing amounts are correct
- [ ] Feature lists are complete
- [ ] CTA buttons work
- [ ] Early bird banner displays

#### Mission & Vision Section
- [ ] Both cards display side by side (desktop)
- [ ] Cards stack on mobile
- [ ] Background gradient renders correctly
- [ ] Text is readable on gradient background

#### Waitlist Section
- [ ] Email input field works
- [ ] Form validation works (invalid email shows error)
- [ ] Submit button is functional
- [ ] Success message displays after submission
- [ ] Data is stored in localStorage
- [ ] Benefits list displays correctly

#### Footer
- [ ] All footer links are present
- [ ] Social media links work
- [ ] Footer columns display correctly
- [ ] Copyright year is current
- [ ] Footer is responsive

### Verification Page Testing

#### Basic Verification Form
- [ ] All input fields are functional
- [ ] Form validation works
- [ ] Submit button triggers verification
- [ ] Loading state displays during verification
- [ ] Results display correctly
- [ ] Risk score is calculated
- [ ] Verification history is stored

#### Document Upload
- [ ] Drag and drop zone is visible
- [ ] File input works
- [ ] Drag and drop functionality works
- [ ] File type validation works (JPG, PNG, PDF, WebP)
- [ ] File size validation works (max 10MB)
- [ ] Selected file displays with name and size
- [ ] Remove file button works
- [ ] Upload progress bar displays
- [ ] Verification results show after upload
- [ ] Document details are extracted correctly
- [ ] Verification checks display with pass/fail status
- [ ] "Upload Another Document" button resets form

### Pitch Deck Page Testing

#### Cover Slide
- [ ] Company name displays prominently
- [ ] Tagline is visible
- [ ] Stats display correctly
- [ ] Founder info is present
- [ ] Background gradient renders

#### Problem Slide
- [ ] All 4 problem cards display
- [ ] Statistics are accurate
- [ ] Sources are cited
- [ ] Pain points list is complete

#### Solution Slide
- [ ] All 4 feature cards display
- [ ] Icons render correctly
- [ ] Hover effects work
- [ ] Content is clear

#### Market Analysis Slide
- [ ] TAM, SAM, SOM cards display
- [ ] Market values are correct
- [ ] Sources are cited
- [ ] Growth statistics are present

#### Target Customers Slide
- [ ] All 5 customer segments display
- [ ] Segment sizes are shown
- [ ] ARR potential is calculated
- [ ] Cards are responsive

#### Competitive Analysis Slide
- [ ] Comparison table displays correctly
- [ ] CheckMe column is highlighted
- [ ] All features are compared
- [ ] Competitors list is complete

#### Business Model Slide
- [ ] Revenue streams display
- [ ] Pricing tiers are shown
- [ ] Total revenue calculation is correct
- [ ] Subscription revenue is displayed

#### Traction Slide
- [ ] Metrics cards display
- [ ] Growth percentages are shown
- [ ] Projections timeline is visible
- [ ] Year-over-year growth is calculated

#### Roadmap Slide
- [ ] All 4 quarters display
- [ ] Features are listed for each quarter
- [ ] Status indicators (✅, 🔄, 📅) are correct
- [ ] Timeline is clear

#### Team Slide
- [ ] Team member info displays
- [ ] Photo/avatar renders
- [ ] Links are functional
- [ ] Advisors section is present

#### Investment Slide
- [ ] Funding ask is prominent
- [ ] Valuation is displayed
- [ ] Use of funds breakdown is complete
- [ ] ROI projections are shown

#### Closing Slide
- [ ] Closing title is impactful
- [ ] Stats summary displays
- [ ] Contact info is correct
- [ ] CTA buttons work

### Contact Page Testing

#### Contact Form
- [ ] All form fields are functional
- [ ] Required field validation works
- [ ] Email validation works
- [ ] Subject dropdown has all options
- [ ] Message textarea works
- [ ] Submit button is functional
- [ ] Loading state displays
- [ ] Success message shows after submission
- [ ] Form data is stored in localStorage
- [ ] "Send Another Message" button resets form

#### Contact Information
- [ ] Email link works (mailto:)
- [ ] Phone link works (tel:)
- [ ] Social media links work
- [ ] Response time info is displayed
- [ ] Headquarters info is shown

#### FAQ Section
- [ ] All 6 FAQ items display
- [ ] Questions and answers are clear
- [ ] Grid layout is responsive

---

## Automated Testing

### Type Checking

```bash
npm run check
```

Expected: No type errors

### Linting

```bash
npm run lint
```

Expected: No linting errors

### Build Test

```bash
npm run build
```

Expected: Build completes successfully without errors

---

## Performance Testing

### Lighthouse Audit

Run Lighthouse audit on all pages:

```bash
# Install Lighthouse CLI
npm install -g lighthouse

# Run audit on each page
lighthouse http://localhost:5173 --output html --output-path ./lighthouse-home.html
lighthouse http://localhost:5173/verify --output html --output-path ./lighthouse-verify.html
lighthouse http://localhost:5173/pitch --output html --output-path ./lighthouse-pitch.html
lighthouse http://localhost:5173/contact --output html --output-path ./lighthouse-contact.html
```

**Target Scores:**
- Performance: 90+
- Accessibility: 90+
- Best Practices: 90+
- SEO: 90+

### Load Time Testing

- [ ] Home page loads in < 2 seconds
- [ ] Verify page loads in < 2 seconds
- [ ] Pitch deck loads in < 3 seconds
- [ ] Contact page loads in < 2 seconds

### Bundle Size

```bash
npm run build
```

Check build output for bundle sizes:
- [ ] Main bundle < 200KB
- [ ] CSS bundle < 50KB
- [ ] Total initial load < 300KB

---

## Security Testing

### Trivy Vulnerability Scan

```bash
# Install Trivy
curl -sfL https://raw.githubusercontent.com/aquasecurity/trivy/main/contrib/install.sh | sh -s -- -b /usr/local/bin

# Run scan
trivy fs .
```

Expected: No HIGH or CRITICAL vulnerabilities

### Input Validation

- [ ] Email inputs reject invalid formats
- [ ] File uploads reject invalid types
- [ ] File uploads reject oversized files
- [ ] Form inputs sanitize special characters
- [ ] XSS attempts are blocked

### Data Storage

- [ ] localStorage data is properly scoped
- [ ] No sensitive data in localStorage
- [ ] Session data is cleared on logout

---

## Browser Compatibility

Test on the following browsers:

### Desktop
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

### Mobile
- [ ] iOS Safari (latest)
- [ ] Android Chrome (latest)
- [ ] Samsung Internet (latest)

### Responsive Breakpoints
- [ ] Mobile (320px - 767px)
- [ ] Tablet (768px - 1023px)
- [ ] Desktop (1024px+)
- [ ] Large Desktop (1440px+)

---

## Accessibility Testing

### Keyboard Navigation
- [ ] All interactive elements are keyboard accessible
- [ ] Tab order is logical
- [ ] Focus indicators are visible
- [ ] Skip links work

### Screen Reader Testing
- [ ] All images have alt text
- [ ] Form labels are properly associated
- [ ] ARIA labels are used where appropriate
- [ ] Headings are hierarchical

### Color Contrast
- [ ] Text meets WCAG AA standards (4.5:1)
- [ ] Large text meets WCAG AA standards (3:1)
- [ ] Interactive elements have sufficient contrast

---

## Deployment Testing

### Docker Build
```bash
docker build -t checkme:test .
```

Expected: Build completes successfully

### Docker Compose
```bash
docker-compose up -d
```

Expected: All services start successfully

### Health Check
```bash
curl http://localhost:3000/health
```

Expected: Returns 200 status with health data

---

## Checklist Summary

Before deploying to production, ensure:

- [ ] All manual tests pass
- [ ] No type errors
- [ ] No linting errors
- [ ] Build completes successfully
- [ ] Lighthouse scores are 90+
- [ ] No security vulnerabilities
- [ ] Works on all major browsers
- [ ] Responsive on all screen sizes
- [ ] Accessibility standards met
- [ ] Docker deployment works
- [ ] Health check endpoint responds

---

## Reporting Issues

If you find any issues during testing:

1. Check if the issue is already reported in GitHub Issues
2. If not, create a new issue with:
   - Clear description of the problem
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots/videos if applicable
   - Browser/device information
   - Console errors (if any)

---

## Continuous Testing

Set up automated testing in CI/CD:

1. Run tests on every pull request
2. Run Lighthouse audits on main branch
3. Run security scans daily
4. Monitor production with real user monitoring (RUM)

---

**Last Updated**: 2024-10-14

