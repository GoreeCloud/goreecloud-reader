const items = [
  { id: 'b1', kind: 'book', title: 'The Quiet Orbit', creator: 'Avery North', series: 'Orbit Archives', progress: 0.42, color: 'linear-gradient(145deg,#476b91,#182d49)' },
  { id: 'm1', kind: 'manga', title: 'Lantern District', creator: 'Mika Arai', series: 'Lantern District', progress: 0.67, color: 'linear-gradient(145deg,#dd7657,#6b263c)' },
  { id: 'c1', kind: 'comic', title: 'Signal House', creator: 'Rowan Vale', series: 'Signal House', progress: 0.18, color: 'linear-gradient(145deg,#6d72e7,#392c76)' },
  { id: 'a1', kind: 'audiobook', title: 'Northbound', creator: 'Elena Brooks', series: 'Road Notes', progress: 0.54, color: 'linear-gradient(145deg,#3f9d8f,#1d4d52)' },
  { id: 'b2', kind: 'book', title: 'Paper Moons', creator: 'Jordan Lee', series: null, progress: 0, color: 'linear-gradient(145deg,#aa7d56,#49362c)' },
  { id: 'm2', kind: 'manga', title: 'After the Rain Gate', creator: 'Ren Sato', series: 'Rain Gate', progress: 0, color: 'linear-gradient(145deg,#66889a,#303f58)' },
  { id: 'c2', kind: 'comic', title: 'Electric Garden', creator: 'Sam Rivera', series: 'Electric Garden', progress: 1, color: 'linear-gradient(145deg,#8caa62,#3d563b)' },
  { id: 'a2', kind: 'audiobook', title: 'Small Hours', creator: 'Nora Finch', series: null, progress: 0, color: 'linear-gradient(145deg,#9a6aa6,#4b315c)' }
];

let activeKind = 'all';
let query = '';

const grid = document.querySelector('#libraryGrid');
const rail = document.querySelector('#continueRail');
const count = document.querySelector('#resultCount');
const empty = document.querySelector('#emptyState');
const search = document.querySelector('#searchInput');
const detail = document.querySelector('#detailDialog');
const detailContent = document.querySelector('#detailContent');
const toast = document.querySelector('#toast');

const kindLabel = (kind) => ({ book: 'Book', manga: 'Manga', comic: 'Comic', audiobook: 'Audiobook' }[kind]);
const monogram = (title) => title.split(/\s+/).slice(0, 2).map(part => part[0]).join('').toUpperCase();
const pct = (value) => `${Math.round(value * 100)}%`;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove('show'), 2800);
}

function filteredItems() {
  const needle = query.trim().toLowerCase();
  return items.filter(item => {
    const kindMatches = activeKind === 'all' || item.kind === activeKind;
    const text = [item.title, item.creator, item.series].filter(Boolean).join(' ').toLowerCase();
    return kindMatches && (!needle || text.includes(needle));
  });
}

function mediaCard(item) {
  const button = document.createElement('button');
  button.className = 'media-card';
  button.type = 'button';
  button.setAttribute('aria-label', `Open synthetic details for ${item.title}`);
  button.innerHTML = `
    <div class="cover" style="background:${item.color}">
      <span class="cover-badge">${kindLabel(item.kind)}</span>
      <span class="cover-monogram">${monogram(item.title)}</span>
    </div>
    <div class="card-copy">
      <strong>${item.title}</strong>
      <span>${item.creator}</span>
    </div>`;
  button.addEventListener('click', () => openDetail(item));
  return button;
}

function renderLibrary() {
  const filtered = filteredItems();
  grid.replaceChildren(...filtered.map(mediaCard));
  count.textContent = `${filtered.length} synthetic ${filtered.length === 1 ? 'title' : 'titles'}`;
  empty.hidden = filtered.length !== 0;
}

function renderContinue() {
  const inProgress = items.filter(item => item.progress > 0 && item.progress < 1).slice(0, 2);
  rail.replaceChildren(...inProgress.map(item => {
    const card = document.createElement('article');
    card.className = 'continue-card';
    card.innerHTML = `
      <div class="mini-cover" style="background:${item.color}">${monogram(item.title)}</div>
      <div>
        <span class="meta">${item.kind === 'audiobook' ? 'Continue Listening' : 'Continue Reading'}</span>
        <strong>${item.title}</strong>
        <span class="meta">${pct(item.progress)} complete · synthetic</span>
        <div class="progress-track" aria-label="${pct(item.progress)} complete"><div class="progress-fill" style="width:${pct(item.progress)}"></div></div>
      </div>`;
    return card;
  }));
}

function openDetail(item) {
  const action = item.kind === 'audiobook' ? 'Listen' : 'Read';
  detailContent.innerHTML = `
    <div class="detail-hero" style="background:${item.color}">
      <div><span class="cover-badge">Synthetic ${kindLabel(item.kind)}</span><div class="cover-monogram">${monogram(item.title)}</div></div>
    </div>
    <div class="detail-body">
      <p class="eyebrow">${kindLabel(item.kind)} · Preview data</p>
      <h2>${item.title}</h2>
      <p class="meta">${item.creator}${item.series ? ` · ${item.series}` : ''}</p>
      <p style="margin-top:16px">This record exists only to exercise the Reader foundation interface. No real media resource is attached.</p>
      <div class="progress-track" aria-label="${pct(item.progress)} complete"><div class="progress-fill" style="width:${pct(item.progress)}"></div></div>
      <div class="detail-actions">
        <button class="primary" data-unavailable>${action}</button>
        <button class="secondary" data-unavailable>Download</button>
      </div>
    </div>`;
  detailContent.querySelectorAll('[data-unavailable]').forEach(button => button.addEventListener('click', () => showToast('Not implemented: real reading, playback, and downloads remain blocked in the foundation.')));
  detail.showModal();
}

document.querySelectorAll('.nav-item').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
    button.classList.add('active');
    activeKind = button.dataset.view;
    document.querySelector('#libraryHeading').textContent = activeKind === 'all' ? 'All media' : `${kindLabel(activeKind)}s`;
    renderLibrary();
  });
});

search.addEventListener('input', () => { query = search.value; renderLibrary(); });
document.querySelector('#clearSearch').addEventListener('click', () => { query = ''; search.value = ''; renderLibrary(); search.focus(); });
document.querySelector('#importButton').addEventListener('click', () => showToast('Import is intentionally unavailable until real-content privacy and authority boundaries are accepted.'));
document.querySelector('#closeDialog').addEventListener('click', () => detail.close());
detail.addEventListener('click', event => { if (event.target === detail) detail.close(); });

renderContinue();
renderLibrary();
