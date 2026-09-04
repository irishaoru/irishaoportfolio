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
