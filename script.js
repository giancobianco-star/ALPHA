(() => {
  const form = document.getElementById('promptForm');
  const input = document.getElementById('promptInput');
  const chips = [...document.querySelectorAll('.chip')];
  const routeModel = document.getElementById('routeModel');
  const routeMode = document.getElementById('routeMode');
  const routeWhy = document.getElementById('routeWhy');
  let type = 'Image';
  const routes = {
    Image: ['Visual generation route', 'Image · Adaptive', 'Optimized for composition, fidelity and fast iteration.'],
    Video: ['Cinematic video route', 'Draft → Premium', 'A low-cost draft first, premium render only after approval.'],
    Audio: ['Audio creation route', 'Voice + Sound', 'Routes voice, music or SFX according to the prompt.'],
    Copy: ['Creative language route', 'Strategy + Copy', 'Balances brand tone, originality and conversion intent.'],
    Campaign: ['Multi-agent campaign route', 'Strategy → Craft', 'Breaks one idea into concept, copy, visual and production tasks.']
  };
  chips.forEach(chip => chip.addEventListener('click', () => {
    chips.forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
    type = chip.dataset.type;
    const r = routes[type];
    routeModel.textContent = r[0]; routeMode.textContent = r[1]; routeWhy.textContent = r[2];
  }));
  form.addEventListener('submit', e => {
    e.preventDefault();
    const text = input.value.trim();
    if (!text) { input.focus(); return; }
    const r = routes[type];
    routeModel.textContent = 'Routing “' + (text.length > 44 ? text.slice(0,44) + '…' : text) + '”';
    routeMode.textContent = r[1];
    routeWhy.textContent = 'Prototype mode — the production router will select models dynamically by quality, speed and cost.';
  });
})();