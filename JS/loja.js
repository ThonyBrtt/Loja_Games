document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('searchInput');
  const minPriceInput = document.getElementById('minPrice');
  const maxPriceInput = document.getElementById('maxPrice');
  const sortSelect = document.getElementById('sortSelect');
  const promoCardsContainer = document.querySelector('.promo-cards');
  const promoCards = Array.from(document.querySelectorAll('.promo-card'));

  function getNewPrice(card) {
    return parseFloat(
      card.querySelector('.new-price')?.textContent.replace(/[R$\s]/g, '').replace(',', '.') || '0'
    );
  }

  function getDiscount(card) {
    const badge = card.querySelector('.discount-badge');
    return badge ? parseInt(badge.textContent.replace(/[^0-9]/g, '')) : 0;
  }

  function getName(card) {
    return card.getAttribute('data-name')?.toLowerCase() || '';
  }

  function filterAndSort() {
    const search = searchInput.value.toLowerCase().trim();
    const minPrice = parseFloat(minPriceInput.value) || 0;
    const maxPrice = parseFloat(maxPriceInput.value) || Infinity;
    const sortBy = sortSelect.value;

    let filtered = promoCards.filter(card => {
      const name = getName(card);
      const price = getNewPrice(card);
      return name.includes(search) && price >= minPrice && price <= maxPrice;
    });

    switch (sortBy) {
      case 'best-discount':
        filtered.sort((a, b) => getDiscount(b) - getDiscount(a));
        break;
      case 'name-asc':
        filtered.sort((a, b) => getName(a).localeCompare(getName(b)));
        break;
      case 'name-desc':
        filtered.sort((a, b) => getName(b).localeCompare(getName(a)));
        break;
    }

    promoCardsContainer.innerHTML = '';
    filtered.forEach(card => promoCardsContainer.appendChild(card));
  }

  searchInput.addEventListener('input', filterAndSort);
  minPriceInput.addEventListener('input', filterAndSort);
  maxPriceInput.addEventListener('input', filterAndSort);
  sortSelect.addEventListener('change', filterAndSort);

  filterAndSort();
});
