const projectButtons = document.querySelectorAll('.flavor-button');
const toppingButtons = document.querySelectorAll('.topping-button');
const sauceButtons = document.querySelectorAll('.sauce-button');

function updateSelection(buttons, displayId, targetNameId, targetDescId) {
  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      buttons.forEach((item) => item.classList.remove('active'));
      button.classList.add('active');

      const name = button.dataset.name;
      const description = button.dataset.description;
      const color = button.dataset.color || '#ffc48b';
      const accent = button.dataset.accent || '#ef8a72';

      const nameEl = document.getElementById(targetNameId);
      const descEl = document.getElementById(targetDescId);
      const displayEl = document.getElementById(displayId);

      if (nameEl) nameEl.textContent = name;
      if (descEl) descEl.textContent = description;
      const scoopEl = displayEl?.querySelector('.scoop-large') || (displayEl?.classList.contains('scoop-large') ? displayEl : null);
      if (scoopEl) {
        scoopEl.style.background = `linear-gradient(135deg, ${color}, ${accent})`;
      }

      if (displayEl && displayEl.classList.contains('selected-sprinkle')) {
        displayEl.style.background = `linear-gradient(135deg, ${color}, ${accent})`;
      }

      if (displayEl && displayEl.classList.contains('drizzle-glass')) {
        const stripes = displayEl.querySelectorAll('.drizzle-stripe');
        stripes.forEach((stripe) => {
          stripe.style.background = `linear-gradient(90deg, ${accent}, ${color}, ${accent})`;
        });
      }
    });
  });
}

updateSelection(projectButtons, 'scoop-display', 'selected-project-name', 'selected-project-description');
updateSelection(toppingButtons, 'scoop-display', 'selected-project-name', 'selected-project-description');
updateSelection(sauceButtons, 'scoop-display', 'selected-project-name', 'selected-project-description');

const flavorCounter = document.getElementById('flavor-counter');
const scoopCursor = document.getElementById('scoop-cursor');
const servedScoop = document.getElementById('served-scoop');
const servedLabel = document.getElementById('served-label');

if (flavorCounter && scoopCursor) {
  flavorCounter.addEventListener('pointermove', (event) => {
    const box = flavorCounter.getBoundingClientRect();
    scoopCursor.style.left = `${event.clientX - box.left}px`;
    scoopCursor.style.top = `${event.clientY - box.top}px`;
  });

  flavorCounter.querySelectorAll('.flavor-tub').forEach((tub) => {
    tub.addEventListener('click', () => {
      scoopCursor.classList.remove('dig');
      servedScoop.classList.remove('scooped');
      void scoopCursor.offsetWidth;
      scoopCursor.classList.add('dig');
      servedScoop.style.background = `linear-gradient(145deg, ${tub.dataset.color}, ${tub.dataset.accent})`;
      servedLabel.textContent = tub.dataset.name;
      servedScoop.classList.add('scooped');
    });
  });
}

toppingButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const preview = document.querySelector('.selected-sprinkle');
    if (!preview) return;
    preview.classList.remove('sprinkling');
    void preview.offsetWidth;
    preview.classList.add('sprinkling');
  });
});
