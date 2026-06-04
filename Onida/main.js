/* ========================================
   THUNDER MOTORCYCLES - MAIN JAVASCRIPT
   ======================================== */

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
  initNavigation();
  initScrollAnimations();
  initStatCounters();
});

/* ========================================
   NAVIGATION
   ======================================== */
function initNavigation() {
  var nav = document.querySelector('nav');
  var navLinks = document.querySelectorAll('.nav-links a');

  // Navbar background on scroll
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      nav.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
    } else {
      nav.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
  });

  // Smooth scroll for nav links
  navLinks.forEach(function(link) {
    link.addEventListener('click', function(e) {
      var href = this.getAttribute('href');
      if (href.startsWith('#')) {
        e.preventDefault();
        var target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });
}

/* ========================================
   SCROLL ANIMATIONS
   ======================================== */
function initScrollAnimations() {
  var animatedElements = document.querySelectorAll(
    '.about-card, .stat-item, .gallery-item, .team-member, .history-content'
  );

  // Set initial state
  animatedElements.forEach(function(el) {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  });

  // Check if element is in viewport
  function isInViewport(element) {
    var rect = element.getBoundingClientRect();
    return rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.85;
  }

  // Animate elements on scroll
  function checkScroll() {
    animatedElements.forEach(function(el) {
      if (isInViewport(el) && el.style.opacity === '0') {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }
    });
  }

  window.addEventListener('scroll', checkScroll);
  checkScroll(); // Run on load
}

/* ========================================
   STATISTICS COUNTER
   ======================================== */
function initStatCounters() {
  var stats = document.querySelectorAll('.stat-number');
  var animated = false;

  function animateCounters() {
    if (animated) return;

    var statsSection = document.querySelector('.stats');
    var rect = statsSection.getBoundingClientRect();

    if (rect.top < window.innerHeight && rect.bottom > 0) {
      animated = true;

      stats.forEach(function(stat) {
        var text = stat.textContent;
        var target = parseInt(text.replace(/\D/g, ''));
        var suffix = text.replace(/[\d]/g, '');
        var duration = 2000;
        var start = 0;
        var startTime = null;

        function updateCounter(timestamp) {
          if (!startTime) startTime = timestamp;
          var progress = Math.min((timestamp - startTime) / duration, 1);
          var current = Math.floor(progress * target);

          stat.textContent = current.toLocaleString() + suffix;

          if (progress < 1) {
            requestAnimationFrame(updateCounter);
          } else {
            stat.textContent = target.toLocaleString() + suffix;
          }
        }

        requestAnimationFrame(updateCounter);
      });
    }
  }

  window.addEventListener('scroll', animateCounters);
  animateCounters(); // Check on load
}

/* ========================================
   BUTTON INTERACTIONS
   ======================================== */
document.querySelectorAll('button').forEach(function(btn) {
  btn.addEventListener('click', function() {
    // Add ripple effect
    var ripple = document.createElement('span');
    ripple.style.cssText = 
      'position:absolute;border-radius:50%;background:rgba(255,255,255,0.3);' +
      'transform:scale(0);animation:ripple 0.6s linear;pointer-events:none;';
    
    this.style.position = 'relative';
    this.style.overflow = 'hidden';
    this.appendChild(ripple);

    var rect = this.getBoundingClientRect();
    var size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = size + 'px';

    setTimeout(function() {
      ripple.remove();
    }, 600);
  });
});

// Add ripple animation to document
var style = document.createElement('style');
style.textContent = '@keyframes ripple{to{transform:scale(4);opacity:0;}}';
document.head.appendChild(style);