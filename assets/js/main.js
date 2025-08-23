/* ===========================
   ASTRAI — Main JS (site-wide)
   =========================== */

/* Smooth scrolling for in-page anchors.
   - Only handles links that start with "#"
   - Ignores "#" / "#!" and elements marked .show-options or [data-no-smooth]
   - Works with fixed header thanks to CSS scroll-margin-top on targets
*/
(function smoothInPageAnchors() {
  const anchors = document.querySelectorAll('a[href^="#"]');
  anchors.forEach(a => {
    a.addEventListener('click', function (e) {
      if (this.classList.contains('show-options') || this.hasAttribute('data-no-smooth')) return;

      const href = this.getAttribute('href') || '';
      if (href === '#' || href === '#!' || href.trim().length <= 1) {
        e.preventDefault();
        return;
      }

      const id = href.slice(1);
      const target = document.getElementById(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
})();

/* ===========================
   Homepage resource cards
   (safe no-op on pages without .resource-card)
   =========================== */
(function resourceCards() {
  const cards = document.querySelectorAll('.resource-card');
  if (!cards.length) return; // Not on a page with resource cards (e.g., Resource Hub) — exit early

  // Utilities
  const qs  = (sel, root = document) => root.querySelector(sel);
  const qsa = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  // CSV parsing (supports quotes, escaped quotes, auto-detects comma vs semicolon)
  function parseCSV(text) {
    const firstLine = text.split(/\r?\n/)[0] || '';
    const delim = (firstLine.split(';').length > firstLine.split(',').length) ? ';' : ',';

    const rows = [];
    let row = [], field = '', i = 0, inQuotes = false;

    while (i < text.length) {
      const ch = text[i];
      if (inQuotes) {
        if (ch === '"') {
          if (text[i + 1] === '"') { field += '"'; i += 2; continue; } // escaped quote
          inQuotes = false; i++; continue;
        }
        field += ch; i++; continue;
      } else {
        if (ch === '"') { inQuotes = true; i++; continue; }
        if (ch === delim) { row.push(field); field = ''; i++; continue; }
        if (ch === '\n')  { row.push(field); rows.push(row); row = []; field = ''; i++; continue; }
        if (ch === '\r')  { i++; continue; } // ignore CR
        field += ch; i++; continue;
      }
    }
    if (field.length || row.length) { row.push(field); rows.push(row); }
    return rows;
  }

  function clampRows(rows, maxDataRows) {
    if (!rows.length) return rows;
    return [rows[0], ...rows.slice(1, 1 + maxDataRows)]; // keep header + N rows
  }

  function clampCols(rows, maxCols) {
    if (!rows.length || !maxCols || maxCols <= 0) return rows;
    return rows.map(r => r.slice(0, maxCols));
  }

  function renderTable(rows) {
    const table = document.createElement('table');

    if (!rows.length) return table;

    const [header, ...rest] = rows;

    const thead = document.createElement('thead');
    const trh = document.createElement('tr');
    header.forEach(h => { const th = document.createElement('th'); th.textContent = h; trh.appendChild(th); });
    thead.appendChild(trh);
    table.appendChild(thead);

    const tbody = document.createElement('tbody');
    rest.forEach(r => {
      const tr = document.createElement('tr');
      r.forEach(c => { const td = document.createElement('td'); td.textContent = c; tr.appendChild(td); });
      tbody.appendChild(tr);
    });
    table.appendChild(tbody);

    return table;
  }

  // Constants for homepage samples (kept small for layout stability)
  const MAX_ROWS = 5;    // show header + 5 rows
  const MAX_COLS = 12;   // first 12 columns (home cards are previews)

  cards.forEach(card => {
    const sampleBtn = card.querySelector('[data-action="toggle-sample"]');
    const docsBtn   = card.querySelector('[data-action="toggle-docs"]');
    const sampleBox = card.querySelector('.block-sample');
    const docsBox   = card.querySelector('.block-docs');

    // Toggle helpers
    function toggle(el, btn) {
      if (!el) return;
      el.open = !el.open;
      if (btn) btn.setAttribute('aria-expanded', String(el.open));
    }

    // SAMPLE: fetch on first open
    if (sampleBtn && sampleBox) {
      sampleBtn.addEventListener('click', () => {
        toggle(sampleBox, sampleBtn);

        if (sampleBox.open && !sampleBox.dataset.loaded) {
          const url = card.getAttribute('data-sample-url');
          const container = sampleBox.querySelector('.sample-table');
          if (!url) { container.textContent = 'Sample not available.'; return; }

          fetch(url)
            .then(r => r.ok ? r.text() : Promise.reject())
            .then(text => {
              let rows = parseCSV(text);
              if (!rows.length) { container.textContent = 'No data in sample.'; return; }

              // Clamp for homepage card previews
              rows = clampRows(rows, MAX_ROWS);
              rows = clampCols(rows, MAX_COLS);

              container.innerHTML = '';
              container.appendChild(renderTable(rows));
              sampleBox.dataset.loaded = '1';
            })
            .catch(() => { container.textContent = 'Could not load sample.'; });
        }
      });
    }

    // DOCS toggle
    if (docsBtn && docsBox) {
      docsBtn.addEventListener('click', () => toggle(docsBox, docsBtn));
    }
  });

  /* Hover/focus overlay helpers (cards)
     - Mobile/touch: "Show options" toggles overlay visibility
     - Clicking outside closes any open overlay
  */
  (function overlayHelpers() {
    const toggles = document.querySelectorAll('.resource-card .show-options');

    toggles.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const card = link.closest('.resource-card');
        const opened = card.classList.toggle('is-hovered');
        link.setAttribute('aria-expanded', String(opened));
      });
    });

    document.addEventListener('click', (e) => {
      const insideCard = e.target.closest('.resource-card');
      if (!insideCard) {
        document.querySelectorAll('.resource-card.is-hovered').forEach(c => c.classList.remove('is-hovered'));
        toggles.forEach(l => l.setAttribute('aria-expanded', 'false'));
      }
    });
  })();
})();

/* ===========================
   Mailto (simple obfuscation)
   =========================== */
document.addEventListener('DOMContentLoaded', () => {
  const emailLink = document.getElementById('email-link');
  if (emailLink) {
    const user = 'info';
    const domain = 'koexai.com';
    emailLink.href = `mailto:${user}@${domain}`;
  }
});
