/**
 * Freebie Gate — shared unlock logic for all gated landing pages.
 *
 * Usage: add this to any freebie page:
 *   <script src="/freebies/gate.js" data-gate-id="zero-to-automation"></script>
 *
 * Expects the page to have:
 *   #gate   — the section with the Kit form
 *   #guide  — the hidden content (uses .visible class to show)
 *   .formkit-form — the Kit form element
 *
 * On form success the guide is revealed and the unlock is stored
 * in localStorage so returning visitors skip the gate automatically.
 */
(function () {
  var script = document.currentScript;
  var gateId = script && script.getAttribute('data-gate-id');
  if (!gateId) return;

  var storageKey = 'freebie-unlocked-' + gateId;

  function revealGuide() {
    var gate = document.getElementById('gate');
    var guide = document.getElementById('guide');
    if (gate) gate.style.display = 'none';
    if (guide) guide.classList.add('visible');
  }

  function init() {
    // Returning visitor — skip the gate
    if (localStorage.getItem(storageKey)) {
      revealGuide();
      return;
    }

    // First visit — watch the Kit form for success
    var form = document.querySelector('.formkit-form');
    if (!form) return;

    var observer = new MutationObserver(function () {
      if (document.querySelector('.formkit-alert-success')) {
        observer.disconnect();
        localStorage.setItem(storageKey, Date.now());
        setTimeout(function () {
          revealGuide();
          window.scrollTo(0, 0);
        }, 1500);
      }
    });

    observer.observe(form, { childList: true, subtree: true, attributes: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
