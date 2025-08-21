// Smooth scrolling for in-page nav (ignore "#" and .show-options)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    // Let the card's "Show options" handler deal with it
    if (this.classList.contains('show-options')) return;

    const href = this.getAttribute('href') || '';
    // Ignore bare "#" (no target) and "#!" etc.
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


/* === Resources v2 behaviour === */
(function () {
  const qs = (sel, root = document) => root.querySelector(sel);
  const qsa = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  // Robust-ish CSV parser (quotes + escaped quotes)
  function parseCSV(text) {
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
        if (ch === ',') { row.push(field); field = ''; i++; continue; }
        if (ch === '\n') { row.push(field); rows.push(row); row = []; field = ''; i++; continue; }
        if (ch === '\r') { i++; continue; } // ignore CR
        field += ch; i++; continue;
      }
    }
    // push last field/row
    if (field.length || row.length) { row.push(field); rows.push(row); }
    return rows;
  }

  function renderTable(rows) {
    const table = document.createElement('table');
    const [header, ...rest] = rows;
    const theadRow = document.createElement('tr');
    header.forEach(h => {
      const th = document.createElement('th');
      th.textContent = h;
      theadRow.appendChild(th);
    });
    table.appendChild(theadRow);
    rest.forEach(r => {
      const tr = document.createElement('tr');
      r.forEach(c => {
        const td = document.createElement('td');
        td.textContent = c;
        tr.appendChild(td);
      });
      table.appendChild(tr);
    });
    return table;
  }

  function toggle(el) { el.open = !el.open; }

  qsa('.resource-card').forEach(card => {
    const sampleBtn = qs('[data-action="toggle-sample"]', card);
    const docsBtn   = qs('[data-action="toggle-docs"]', card);
    const sampleBox = qs('.block-sample', card);
    const docsBox   = qs('.block-docs', card);

    // SAMPLE: fetch on first open
    if (sampleBtn && sampleBox) {
      sampleBtn.addEventListener('click', () => {
        toggle(sampleBox);
        if (sampleBox.open && !sampleBox.dataset.loaded) {
          const url = card.getAttribute('data-sample-url');
          const container = qs('.sample-table', sampleBox);
          if (!url) { container.textContent = 'Sample not available.'; return; }
          fetch(url)
            .then(r => r.ok ? r.text() : Promise.reject())
            .then(text => {
              const rows = parseCSV(text).slice(0, 21); // header + 20 rows
              if (!rows.length) { container.textContent = 'No data in sample.'; return; }
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
      docsBtn.addEventListener('click', () => toggle(docsBox));
    }
  });
})();


/* ---- Hover/focus overlay helpers ---- */
(function () {
  const qsa = (s, r=document) => Array.from(r.querySelectorAll(s));

  // Tap/click "Show options" toggles the overlay class for mobile/touch
  qsa('.resource-card .show-options').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const card = link.closest('.resource-card');
      card.classList.toggle('is-hovered');
    });
  });

  // Click outside any card closes overlays opened via tap
  document.addEventListener('click', (e) => {
    const insideCard = e.target.closest('.resource-card');
    if (!insideCard) {
      qsa('.resource-card.is-hovered').forEach(c => c.classList.remove('is-hovered'));
    }
  });
})();

/* ---- mailto ---- */
document.addEventListener('DOMContentLoaded', () => {
  const emailLink = document.getElementById('email-link');
  if (emailLink) {
    const user = 'info';
    const domain = 'koexai.com';
    emailLink.href = `mailto:${user}@${domain}`;
  }
});


