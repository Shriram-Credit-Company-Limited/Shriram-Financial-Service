/* =====================================================================
   Shriram Financial Services — shared behaviour
   Nav (hamburger + sticky auto-hide) and the accessible, single-open
   General Questions accordion. Page-specific JS stays on each page.
   ===================================================================== */
(function(){
  'use strict';

  /* ---------- Mobile nav (hamburger) + sticky auto-hide header ---------- */
  var nav = document.querySelector('.nav');
  if(nav){
    var toggle = document.querySelector('.nav-toggle');
    var menu = document.querySelector('.mobile-menu');
    function closeMenu(){
      if(!menu) return;
      nav.classList.remove('open'); menu.classList.remove('open');
      if(toggle) toggle.setAttribute('aria-expanded','false');
    }
    if(toggle && menu){
      toggle.addEventListener('click', function(){
        var open = nav.classList.toggle('open');
        menu.classList.toggle('open', open);
        toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
      menu.querySelectorAll('a').forEach(function(a){ a.addEventListener('click', closeMenu); });
    }

    /* Sticky header: stays at the top, hides on scroll down, reappears on scroll up. */
    var last = window.pageYOffset, threshold = 80, delta = 6;
    window.addEventListener('scroll', function(){
      var y = window.pageYOffset;
      if(Math.abs(y - last) < delta) return;     /* ignore tiny jitters */
      if(y > last && y > threshold){
        nav.classList.add('nav--hidden');         /* scrolling down */
        closeMenu();
      } else {
        nav.classList.remove('nav--hidden');      /* scrolling up / near top */
      }
      last = y <= 0 ? 0 : y;
    }, {passive:true});
  }

  /* ---------- General Questions accordion (single-open, accessible) ----------
     Each accordion opens one item at a time. Questions are real <button>s, so
     keyboard (Tab + Enter/Space) works for free; we wire up aria-expanded and
     aria-controls / role=region so screen readers announce state. */
  document.querySelectorAll('.faq-acc').forEach(function(acc, accIndex){
    var items = Array.prototype.slice.call(acc.querySelectorAll('.faq-item'));
    items.forEach(function(item, i){
      var btn = item.querySelector('.faq-q');
      var panel = item.querySelector('.qa-wrap');
      if(!btn || !panel) return;

      /* wire ARIA relationships */
      var qid = 'faq-q-' + accIndex + '-' + i;
      var pid = 'faq-a-' + accIndex + '-' + i;
      btn.id = qid; panel.id = pid;
      btn.setAttribute('aria-controls', pid);
      btn.setAttribute('aria-expanded', item.classList.contains('open') ? 'true' : 'false');
      panel.setAttribute('role', 'region');
      panel.setAttribute('aria-labelledby', qid);

      btn.addEventListener('click', function(){
        var willOpen = !item.classList.contains('open');
        items.forEach(function(other){
          other.classList.remove('open');
          var b = other.querySelector('.faq-q');
          if(b) b.setAttribute('aria-expanded', 'false');
        });
        if(willOpen){
          item.classList.add('open');
          btn.setAttribute('aria-expanded', 'true');
        }
      });
    });
  });

  /* ---------- Scroll reveal (progressive enhancement) ----------
     Each major block fades/slides in as it enters the viewport. Gated on a JS flag
     (.js-reveal on <html>) so the hidden state never applies without JS; skipped
     entirely under prefers-reduced-motion or when IntersectionObserver is missing,
     leaving every block fully visible. */
  (function(){
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if(reduce || !('IntersectionObserver' in window)) return;

    var SELECTOR = [
      '.hero-inner > *', '.calc-hero > *',
      '.section > *', '.faq-cols', '.cta-box',
      'footer .foot-top > *', 'footer .foot-bottom'
    ].join(',');

    var blocks = Array.prototype.slice.call(document.querySelectorAll(SELECTOR))
      .filter(function(el){ return !el.classList.contains('sr-only'); });
    if(!blocks.length) return;

    document.documentElement.classList.add('js-reveal');
    blocks.forEach(function(el){ el.setAttribute('data-reveal', ''); });

    /* gentle stagger between blocks that share a parent (and are in view together) */
    blocks.forEach(function(el){
      var sibs = Array.prototype.filter.call(el.parentNode.children, function(c){
        return c.hasAttribute('data-reveal');
      });
      var i = sibs.indexOf(el);
      if(i > 0) el.style.transitionDelay = Math.min(i * 70, 280) + 'ms';
    });

    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(e.isIntersecting){
          e.target.classList.add('is-visible');
          io.unobserve(e.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.06 });

    blocks.forEach(function(el){ io.observe(el); });
  })();
})();
