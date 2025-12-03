# Index Page - Quick Reference Guide

## 🚀 Quick Start

### View the Site
1. Open `index.html` in browser
2. Or use VS Code Live Server extension
3. Or run local server: `python -m http.server 8000`

### Test Responsive
- Mobile: 375px width
- Tablet: 768px width  
- Desktop: 1920px width

---

## 📍 Main Sections & Classes

### Header
```html
<header class="sticky-top shadow-lg" id="header">
  <!-- Dynamic shadow on scroll -->
  <!-- Logo with rounded-circle border -->
</header>
```

### Hero Section
```html
<section id="hero" class="hero-section py-5 py-md-7">
  <div class="hero-bg-animation"></div> <!-- Floating background -->
  <div class="hero-image-container">    <!-- Slide-in image -->
  <badge> <!-- Trust indicator -->
  <Quick Stats> <!-- 3 metric cards -->
</section>
```

### Features Section
```html
<section id="fitur" class="py-5 py-md-7 bg-light">
  <div class="feature-card hover-lift">
    <div class="feature-icon"> <!-- Scale & rotate on hover -->
</section>
```

### Calculator Section
```html
<section id="kalkulator-zakat">
  <div class="calculator-card card">
    <input-group> <!-- With Rp prefix -->
    <help section> <!-- FAQ format -->
    <dual buttons> <!-- Calculate + Reset -->
</section>
```

### Programs Section
```html
<section id="program-singkat">
  <div class="program-card hover-lift">
    <div class="program-header"> <!-- Colored backgrounds -->
</section>
```

---

## 🎨 CSS Classes Reference

### Styling
```css
.hover-lift              /* Lift on hover with shadow */
.feature-card          /* Feature card styling */
.feature-icon          /* Icon container with animation */
.calculator-card       /* Calculator form styling */
.program-card          /* Program card styling */
.hero-section          /* Hero section container */
.hero-bg-animation     /* Animated background */
.hero-image-container  /* Image wrapper */
```

### Utilities
```css
.py-md-7               /* Padding Y 5rem on medium+ */
.mb-md-7               /* Margin bottom 5rem on medium+ */
.z-2                   /* Z-index: 2 */
.min-height-200        /* Min-height: 200px */
```

### Bootstrap Classes Used
```
d-grid, d-flex, gap-3, flex-grow-1
col-lg-6, col-md-3, row-cols-1, row-cols-md-3
bg-light, bg-primary, bg-opacity-10
rounded-4, shadow-lg, border-0
display-5, fw-bold, fs-5, text-muted
```

---

## 🎬 JavaScript Functions

### resetCalculator()
```javascript
// Reset calculator state
function resetCalculator() {
    document.getElementById('penghasilan').value = '';
    document.getElementById('hasil-zakat').innerHTML = '...';
}
```
**Usage:** Onclick reset button or manual call

### Smooth Scroll Navigation
```javascript
// Auto-enable on all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        // Smooth scroll to target
    });
});
```
**Usage:** Click any navigation link with #anchor

### Dynamic Header Shadow
```javascript
// Scroll event listener
window.addEventListener('scroll', () => {
    if (scrollTop > 100) {
        header.classList.add('shadow-lg');
    }
});
```
**Usage:** Automatic on scroll

### Input Formatting
```javascript
// Real-time Rupiah formatting
penghasilanInput.addEventListener('input', e => {
    const raw = e.target.value.replace(/\D/g, '');
    e.target.value = raw ? parseInt(raw).toLocaleString('id-ID') : "";
});
```
**Usage:** Automatic on input

---

## 🎨 Color Scheme

```css
Primary:     #0d47a1 (Deep Blue)
Secondary:   #1976d2 (Light Blue)
Success:     #2e7d32 (Green)
Danger:      #d32f2f (Red)
Warning:     #ffb300 (Yellow)
Info:        #0288d1 (Cyan)
Light:       #f5f7fa (Very Light Blue)
Dark:        #1a1a1a (Very Dark)
```

---

## 📊 Responsive Breakpoints

```css
Mobile:   < 576px     /* Full responsive */
Tablet:   ≥ 768px     /* 2-column, py-md-7 */
Desktop:  ≥ 992px     /* 4-column, full features */
Large:    ≥ 1200px    /* Optimal viewing */
```

---

## 🔧 Common Customizations

### Change Hero Background Color
```css
.hero-section {
    background: linear-gradient(135deg, #YOUR_COLOR1 0%, #YOUR_COLOR2 100%);
}
```

### Change Button Colors
```css
.btn-primary {
    background: linear-gradient(135deg, #YOUR_COLOR1, #YOUR_COLOR2) !important;
}
```

### Change Feature Icons
```html
<!-- In feature-icon div -->
<i class="fas fa-YOUR_ICON fa-3x text-YOUR_COLOR"></i>
```

### Change Section Padding
```css
/* Add to style.css */
.py-custom { 
    padding-top: 3rem;
    padding-bottom: 3rem;
}
```

### Add New Feature Card
```html
<div class="col">
    <div class="feature-card p-5 rounded-4 h-100 border-0 shadow-sm hover-lift">
        <div class="feature-icon mb-4">
            <i class="fas fa-icon-name fa-3x text-color"></i>
        </div>
        <h5 class="fw-bold text-dark mb-2">Title</h5>
        <p class="text-muted">Description</p>
    </div>
</div>
```

---

## 🐛 Common Issues & Fixes

### Animations not smooth
**Fix:** Check browser hardware acceleration enabled

### Hero image not centered
**Fix:** Check `d-flex justify-content-center` class present

### Button text overflowing
**Fix:** Add `text-nowrap` or reduce font-size

### Mobile layout broken
**Fix:** Check viewport meta tag present in head

### Shadow not visible
**Fix:** Ensure `shadow-lg` class applied, not just `shadow`

---

## ✅ Testing Quick Checklist

### Desktop (1920px)
- [ ] All sections visible
- [ ] Hero image beside text
- [ ] 4-column program cards
- [ ] Hover effects working
- [ ] Animations smooth

### Mobile (375px)
- [ ] Single column layout
- [ ] Text readable
- [ ] Buttons full-width
- [ ] Hero image above text
- [ ] 1-column programs

### Features
- [ ] Smooth scroll works
- [ ] Calculator reset works
- [ ] Input formatting works
- [ ] Header shadow on scroll
- [ ] All links work

---

## 📁 File Structure

```
index.html                      (Main homepage)
assets/
  ├── css/
  │   └── style.css           (Styling + animations)
  ├── js/
  │   └── calculator.js       (Calculation logic)
  └── images/
      └── Gemini_Generated...  (Hero image)

Documentation:
  ├── INDEX_ENHANCEMENT.md           (Detailed guide)
  ├── INDEX_BUILDOUT_SUMMARY.md      (Summary)
  └── INDEX_VERIFICATION_CHECKLIST   (QA checklist)
```

---

## 🔗 Related Pages

- `calculator.html` - Standalone calculator
- `donasi-form.html` - Donation form
- `history.html` - Transaction history
- `programs.html` - Program details
- `about.html` - About us

---

## 📝 Best Practices

### Adding Content
1. Use semantic HTML tags
2. Follow existing spacing patterns
3. Use utility classes from Bootstrap
4. Test responsive design

### Modifying Styles
1. Add to existing CSS classes first
2. Use consistent naming conventions
3. Test across browsers
4. Update documentation

### JavaScript Changes
1. Keep functions simple & focused
2. Use event delegation
3. Test in console first
4. Comment complex logic

---

## 🎓 Learning Resources

### HTML/CSS
- Bootstrap 5 Docs: getbootstrap.com
- CSS Animations: developer.mozilla.org
- Flexbox: css-tricks.com/snippets/css/a-guide-to-flexbox

### JavaScript
- ES6: javascript.info
- DOM: developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model
- Events: developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events

### Tools
- VS Code: code.visualstudio.com
- Browser DevTools: Built-in (F12)
- FontAwesome: fontawesome.com

---

## 💡 Pro Tips

1. Use Chrome DevTools to test responsive design
2. Use CSS inspector to debug styling issues
3. Use Console to test JavaScript
4. Use Network tab to check load times
5. Test on actual mobile devices

---

## 📞 Support

For issues or questions:
1. Check documentation files
2. Review code comments
3. Test in DevTools
4. Compare with working version

---

**Quick Reference Version:** 1.0
**Last Updated:** December 3, 2025
**Status:** ✅ Ready to Use
