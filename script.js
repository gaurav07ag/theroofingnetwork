// ─── NAV TOGGLE ───────────────────────────────────────────────
var navToggleBtn = document.getElementById('navToggle');
if (navToggleBtn) {
  navToggleBtn.addEventListener('click', function () {
    document.querySelector('.main-nav').classList.toggle('open');
  });
}

var navDropdownToggle = document.querySelector('.nav-dropdown-toggle');
if (navDropdownToggle) {
  navDropdownToggle.addEventListener('click', function (e) {
    if (window.innerWidth <= 860) {
      e.preventDefault();
      this.closest('.nav-dropdown').classList.toggle('open');
    }
  });
}

document.querySelectorAll('.main-nav a').forEach(function (link) {
  link.addEventListener('click', function () {
    var nav = document.querySelector('.main-nav');
    if (nav) nav.classList.remove('open');
  });
});

// ─── SCROLL-IN ANIMATION ──────────────────────────────────────
var observer = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) entry.target.classList.add('in-view');
  });
}, { threshold: 0.2 });

document.querySelectorAll('.slide-left, .slide-right').forEach(function (el) {
  observer.observe(el);
});

// ─── SERVICE MODAL ────────────────────────────────────────────
var serviceData = {
  roofing: {
    title: 'Roofing Services',
    icon: '<svg viewBox="0 0 48 48"><path d="M4 40 L24 8 L44 40 Z" fill="none" stroke="#1F5C97" stroke-width="3"/><path d="M10 40 L24 16 L38 40" fill="none" stroke="#E76F36" stroke-width="3"/></svg>',
    intro: 'Whether you need a brand-new roof, a full replacement, or a quick repair after a storm, our certified crews handle every roofing system.',
    items: ['Asphalt shingle, metal, tile &amp; flat/membrane roofing', 'Full tear-off and replacement', 'Leak repair &amp; storm damage patching', 'Free roof inspections &amp; insurance claim support', 'Manufacturer-backed workmanship warranty']
  },
  siding: {
    title: 'Siding Services',
    icon: '<svg viewBox="0 0 48 48"><rect x="6" y="6" width="36" height="36" fill="none" stroke="#1F5C97" stroke-width="3"/><line x1="6" y1="18" x2="42" y2="18" stroke="#E76F36" stroke-width="3"/><line x1="6" y1="30" x2="42" y2="30" stroke="#E76F36" stroke-width="3"/></svg>',
    intro: 'New siding does more than refresh your curb appeal — it is your home\'s first line of defense against wind, rain, and temperature swings.',
    items: ['Vinyl, fiber cement &amp; engineered wood siding', 'Full re-siding &amp; partial panel repair', 'Trim, soffit &amp; fascia replacement', 'Added insulation for lower energy bills', 'Color and style consultation']
  },
  gutters: {
    title: 'Gutter Services',
    icon: '<svg viewBox="0 0 48 48"><path d="M6 14 H42 V20 H6 Z" fill="none" stroke="#1F5C97" stroke-width="3"/><line x1="24" y1="20" x2="24" y2="42" stroke="#E76F36" stroke-width="3"/></svg>',
    intro: 'Properly sized, seamless gutters keep water moving away from your roofline, siding, and foundation.',
    items: ['Custom seamless aluminum gutters', 'Downspout placement engineered for drainage', 'Leaf guard &amp; gutter cover installation', 'Gutter cleaning, repair &amp; re-pitching', 'Color-matched to your fascia and trim']
  },
  windows: {
    title: 'Windows &amp; Doors',
    icon: '<svg viewBox="0 0 48 48"><rect x="6" y="6" width="36" height="36" fill="none" stroke="#1F5C97" stroke-width="3"/><line x1="24" y1="6" x2="24" y2="42" stroke="#E76F36" stroke-width="3"/><line x1="6" y1="24" x2="42" y2="24" stroke="#E76F36" stroke-width="3"/></svg>',
    intro: 'Replacement windows and entry doors measured, installed, and sealed by our crews.',
    items: ['Energy-efficient vinyl &amp; fiberglass windows', 'Impact-rated entry &amp; patio doors', 'Professional measuring and custom fitting', 'Full flashing and sealant', 'ENERGY STAR-rated options available']
  }
};

var modalOverlay = document.getElementById('serviceModal');
var modalIcon    = document.getElementById('modalIcon');
var modalTitle   = document.getElementById('modalTitle');
var modalIntro   = document.getElementById('modalIntro');
var modalList    = document.getElementById('modalList');
var modalClose   = document.getElementById('modalClose');
var modalCta     = document.getElementById('modalCta');

function openServiceModal(key) {
  if (!modalOverlay) return;
  var data = serviceData[key];
  if (!data) return;
  modalIcon.innerHTML  = data.icon;
  modalTitle.innerHTML = data.title;
  modalIntro.textContent = data.intro;
  modalList.innerHTML = data.items.map(function (item) { return '<li>' + item + '</li>'; }).join('');
  modalOverlay.classList.add('open');
  modalOverlay.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeServiceModal() {
  if (!modalOverlay) return;
  modalOverlay.classList.remove('open');
  modalOverlay.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

document.querySelectorAll('.card-link[data-service]').forEach(function (link) {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    openServiceModal(this.getAttribute('data-service'));
  });
});

if (modalClose)   modalClose.addEventListener('click', closeServiceModal);
if (modalCta)     modalCta.addEventListener('click', closeServiceModal);
if (modalOverlay) {
  modalOverlay.addEventListener('click', function (e) {
    if (e.target === modalOverlay) closeServiceModal();
  });
}

document.addEventListener('keydown', function (e) {
  if (modalOverlay && e.key === 'Escape' && modalOverlay.classList.contains('open')) closeServiceModal();
});

// ─── QUOTE FORM ───────────────────────────────────────────────
var QUOTE_FORM_ENDPOINT = "https://script.google.com/macros/s/AKfycbyJrF3vV6m1Q0X-_sqBgeJdLL-m8nKFdNAZYdKBPzVOcg3HQzvDj7HnGnLtZxHUraxX/exec";

var quoteForm = document.getElementById('quoteForm');
if (quoteForm) {
  quoteForm.addEventListener('submit', function (e) {
    e.preventDefault();
    var successMsg = quoteForm.querySelector('.form-success');
    var errorMsg   = quoteForm.querySelector('.form-error');
    var submitBtn  = quoteForm.querySelector('button[type="submit"]');
    successMsg.hidden = true;
    errorMsg.hidden   = true;

    var formData = new FormData(quoteForm);
    var data = {
      name:        formData.get('name'),
      phone:       formData.get('phone'),
      email:       formData.get('email'),
      service:     formData.get('service'),
      address:     formData.get('address'),
      submittedAt: new Date().toISOString(),
      page:        window.location.href
    };

    submitBtn.disabled = true;
    fetch(QUOTE_FORM_ENDPOINT, {
      method:  'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body:    JSON.stringify(data)
    })
    .then(function (res) { return res.json(); })
    .then(function () { successMsg.hidden = false; quoteForm.reset(); })
    .catch(function (err) { console.error('Form error:', err); errorMsg.hidden = false; })
    .finally(function () { submitBtn.disabled = false; });
  });
}

// ─── LOCATIONS MAP ────────────────────────────────────────────
// Add state names here once you know which states you serve:
var SERVED_STATES = [];

var mapContainer = document.getElementById('usMap');

if (mapContainer && typeof d3 !== 'undefined' && typeof topojson !== 'undefined') {
  var W = 975, H = 610;
  var tooltip = document.getElementById('mapTooltip');
  var mapWrap = mapContainer.closest('.locations-map-wrap');

  var svg = d3.select(mapContainer).append('svg')
    .attr('viewBox', '0 0 ' + W + ' ' + H)
    .attr('preserveAspectRatio', 'xMidYMid meet');

  var statesG = svg.append('g');
  var pinsG   = svg.append('g');

  fetch('https://cdn.jsdelivr.net/npm/us-atlas@3/states-albers-10m.json')
    .then(function (res) { return res.json(); })
    .then(function (us) {
      var states = topojson.feature(us, us.objects.states).features;
      var path   = d3.geoPath();

      statesG.selectAll('path')
        .data(states).join('path')
        .attr('class', function (d) {
          return 'state-shape' + (SERVED_STATES.indexOf(d.properties.name) !== -1 ? ' served' : '');
        })
        .attr('d', path)
        .on('mousemove', function (event, d) { showTip(event, d.properties.name); })
        .on('mouseleave', hideTip);

      pinsG.selectAll('g')
        .data(states).join('g')
        .attr('class', 'state-pin')
        .attr('transform', function (d) {
          var c = path.centroid(d);
          return 'translate(' + c[0] + ',' + c[1] + ')';
        })
        .on('mousemove', function (event, d) { showTip(event, d.properties.name); })
        .on('mouseleave', hideTip)
        .html(function (d) {
          var served = SERVED_STATES.indexOf(d.properties.name) !== -1;
          var color  = served ? '#D14343' : '#2EA043';
          var icon   = served
            ? '<path d="M-2.5 -2.5 L2.5 2.5 M2.5 -2.5 L-2.5 2.5" stroke="#fff" stroke-width="1.3" stroke-linecap="round"/>'
            : '<path d="M-2.5 0 L-0.8 1.8 L2.5 -1.8" stroke="#fff" stroke-width="1.3" stroke-linecap="round" fill="none"/>';
          return '<g class="pin-body">'
            + '<path d="M0 -13 C5 -13 8 -9.5 8 -5.5 C8 -1 0 8 0 8 C0 8 -8 -1 -8 -5.5 C-8 -9.5 -5 -13 0 -13 Z" fill="' + color + '" stroke="#fff" stroke-width="1.2"/>'
            + '<circle cx="0" cy="-5.5" r="4.2" fill="#fff"/>'
            + '<g transform="translate(0,-5.5)">' + icon + '</g>'
            + '</g>';
        });

      function showTip(event, name) {
        var served = SERVED_STATES.indexOf(name) !== -1;
        tooltip.innerHTML = name + '<span class="tt-status ' + (served ? 'served' : 'open') + '">' + (served ? 'Claimed' : 'Available') + '</span>';
        tooltip.classList.add('show');
        var r = mapWrap.getBoundingClientRect();
        tooltip.style.left = (event.clientX - r.left) + 'px';
        tooltip.style.top  = (event.clientY - r.top)  + 'px';
      }
      function hideTip() { tooltip.classList.remove('show'); }

      var locationsList = document.getElementById('locationsList');
      if (locationsList && SERVED_STATES.length > 0) {
        var grid = document.createElement('div');
        grid.className = 'locations-grid';
        SERVED_STATES.slice().sort().forEach(function (state) {
          var chip = document.createElement('div');
          chip.className = 'location-chip';
          chip.textContent = state;
          grid.appendChild(chip);
        });
        locationsList.innerHTML = '';
        locationsList.appendChild(grid);
      }
    })
    .catch(function (err) {
      console.error('Map load error:', err);
      mapContainer.innerHTML = '<p style="color:#fff;text-align:center;padding:40px;">Map failed to load. Please check your internet connection.</p>';
    });
}
