const API_URL = 'http://localhost:3001/products';

let cartCount = 0;
const cartCountEl = document.querySelector('#cart-count');

// Получаем товары с сервера (json-server) и отдаём на отрисовку
async function loadProducts() {
  const catalog = document.querySelector('.catalog');
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Ошибка сервера: ' + response.status);
    }
    const products = await response.json();
    renderProducts(products);
  } catch (error) {
    // Если json-server не запущен — показываем сообщение вместо пустого экрана
    console.error(error);
    const msg = document.createElement('div');
    msg.className = 'error';
    msg.textContent = 'Не удалось загрузить товары. Запущен ли json-server на порту 3001?';
    catalog.appendChild(msg);
  }
}

// Строим карточки через DOM
function renderProducts(products) {
  const catalog = document.querySelector('.catalog');

  products.forEach((product) => {
    const card = document.createElement('article');
    card.className = 'card';
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>${product.price} тг</p>
      <button>В корзину</button>
    `;

    // Обработчик на кнопку именно этой карточки: +1 к счётчику корзины
    card.querySelector('button').addEventListener('click', () => {
      cartCount++;
      cartCountEl.textContent = cartCount;
    });

    catalog.appendChild(card);
  });
}

loadProducts();
