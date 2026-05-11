/**
 * scripts.js
 * Vanilla JavaScript interactions for the Damietta Furniture Gallery
 * Designed for maintainability, minimal footprint, and performance.
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initStickyCart();
  initLightbox();
  initVariantSelector();
  initFilterDrawer();
  initQuiz();
});

/**
 * Mobile Navigation (Bottom Tab Bar)
 * Handles toggling active states or triggering modals from the bottom nav.
 */
function initMobileNav() {
  // Simple implementation: could trigger search, wishlist overlays in the future.
  const navButtons = document.querySelectorAll('.mobile-nav__btn');
  navButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      // Prevent default if it's just toggling UI
      if(btn.getAttribute('href') === '#') {
          e.preventDefault();
      }
    });
  });
}

/**
 * Sticky Cart Bar
 * Appears when the main Add to Cart button scrolls out of view on PDP.
 */
function initStickyCart() {
  const mainCartBtn = document.querySelector('.btn--add-to-cart');
  const stickyBar = document.querySelector('.sticky-cart-bar');

  if (!mainCartBtn || !stickyBar) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        stickyBar.classList.add('is-visible');
        stickyBar.setAttribute('aria-hidden', 'false');
      } else {
        stickyBar.classList.remove('is-visible');
        stickyBar.setAttribute('aria-hidden', 'true');
      }
    });
  }, { threshold: 0 });

  observer.observe(mainCartBtn);
}

/**
 * Product Gallery Lightbox
 * Allows zooming into product images and swiping.
 */
function initLightbox() {
  const galleryImages = document.querySelectorAll('.product-gallery__primary picture img, .product-gallery__strip picture img');
  if (galleryImages.length === 0) return;

  // Create lightbox markup
  const lightbox = document.createElement('div');
  lightbox.className = 'lightbox';
  lightbox.setAttribute('role', 'dialog');
  lightbox.setAttribute('aria-modal', 'true');
  lightbox.setAttribute('aria-label', 'Image Lightbox');
  lightbox.hidden = true;

  lightbox.innerHTML = `
    <button class="lightbox__close" aria-label="Close Lightbox">✕</button>
    <div class="lightbox__content">
      <img src="" alt="" class="lightbox__img">
    </div>
  `;
  document.body.appendChild(lightbox);

  const lightboxImg = lightbox.querySelector('.lightbox__img');
  const closeBtn = lightbox.querySelector('.lightbox__close');

  const openLightbox = (src, alt) => {
    lightboxImg.src = src;
    lightboxImg.alt = alt;
    lightbox.hidden = false;
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
    closeBtn.focus();
  };

  const closeLightbox = () => {
    lightbox.hidden = true;
    document.body.style.overflow = '';
  };

  galleryImages.forEach(img => {
    // Add hover zoom effect via CSS, click to open lightbox
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', () => {
      openLightbox(img.src, img.alt);
    });
  });

  closeBtn.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox || e.target.classList.contains('lightbox__content')) {
      closeLightbox();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !lightbox.hidden) {
      closeLightbox();
    }
  });
}

/**
 * Variant Selector (Material/Size)
 * Handles visual updates and accessible states for custom radio buttons/swatches.
 */
function initVariantSelector() {
  const swatchGroups = document.querySelectorAll('.swatch-grid');

  swatchGroups.forEach(group => {
    const swatches = group.querySelectorAll('.swatch');
    swatches.forEach(swatch => {
      swatch.addEventListener('click', () => {
        // Remove active state from all siblings
        swatches.forEach(s => {
          s.classList.remove('is-active');
          s.setAttribute('aria-checked', 'false');
        });

        // Add active state to clicked swatch
        swatch.classList.add('is-active');
        swatch.setAttribute('aria-checked', 'true');
      });

      // Keyboard support
      swatch.addEventListener('keydown', (e) => {
        if(e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          swatch.click();
        }
      });
    });
  });
}

/**
 * Filter Drawer (Mobile)
 * Toggles the mobile filter slide-up menu on the gallery page.
 */
function initFilterDrawer() {
  const filterBtn = document.querySelector('[data-action="open-filters"]');
  const filterDrawer = document.getElementById('filter-drawer');
  const closeBtn = document.getElementById('close-drawer');

  if (!filterBtn || !filterDrawer) return;

  const openDrawer = () => {
    filterDrawer.classList.add('is-open');
    filterDrawer.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    if(closeBtn) closeBtn.focus();
  };

  const closeDrawer = () => {
    filterDrawer.classList.remove('is-open');
    filterDrawer.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    filterBtn.focus();
  };

  filterBtn.addEventListener('click', openDrawer);

  if (closeBtn) {
    closeBtn.addEventListener('click', closeDrawer);
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && filterDrawer.classList.contains('is-open')) {
      closeDrawer();
    }
  });
}


/**
 * Room Builder Quiz
 * Handles multi-step navigation and selection states.
 */
function initQuiz() {
  const nextBtns = document.querySelectorAll('[data-next-step]');
  const prevBtns = document.querySelectorAll('[data-prev-step]');
  const resultsBtn = document.querySelector('[data-show-results]');

  if (!nextBtns.length && !prevBtns.length && !resultsBtn) return;

  const showStep = (id) => {
    document.querySelectorAll('.quiz-step').forEach(el => el.classList.add('hidden'));
    const step = document.getElementById(id);
    if (step) step.classList.remove('hidden');
  };

  nextBtns.forEach(btn => {
    btn.addEventListener('click', () => showStep('step-' + btn.getAttribute('data-next-step')));
  });

  prevBtns.forEach(btn => {
    btn.addEventListener('click', () => showStep('step-' + btn.getAttribute('data-prev-step')));
  });

  if (resultsBtn) {
    resultsBtn.addEventListener('click', () => showStep('quiz-results'));
  }

  // Quiz options interaction
  document.querySelectorAll('.quiz-option input').forEach(input => {
    input.addEventListener('change', (e) => {
      const type = e.target.type;
      const name = e.target.name;

      if (type === 'radio') {
        document.querySelectorAll(`input[name="${name}"]`).forEach(radio => {
          radio.parentElement.classList.remove('is-active');
        });
      }

      if (e.target.checked) {
        e.target.parentElement.classList.add('is-active');
      } else {
        e.target.parentElement.classList.remove('is-active');
      }
    });
  });
}

/**
 * Sticky Glassy Header
 * Toggles a class when the page scrolls down to handle transparency.
 */
function initStickyHeader() {
  const header = document.querySelector('.header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 10) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  };

  // Run on init
  handleScroll();
  // Listen on scroll
  window.addEventListener('scroll', handleScroll, { passive: true });
}

// Ensure initStickyHeader runs on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  initStickyHeader();
});
