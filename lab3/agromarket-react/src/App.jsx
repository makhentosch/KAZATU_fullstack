import { useState, useEffect } from 'react';
import ProductCard from './components/ProductCard';

function App() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [cartCount, setCartCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Загрузка товаров один раз при первом появлении компонента ([] — пустой массив зависимостей)
  useEffect(() => {
    async function loadProducts() {
      try {
        const response = await fetch('http://localhost:3001/products');
        if (!response.ok) {
          throw new Error('Ошибка сервера: ' + response.status);
        }
        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError('Не удалось загрузить товары');
        setLoading(false);
      }
    }
    loadProducts();
  }, []);

  // Состояние корзины живёт в App (lifting state up), карточки только сообщают о клике
  function handleAddToCart() {
    setCartCount(cartCount + 1);
  }

  // Фильтрация по названию без учёта регистра
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <header>
        <h1>🌾 АгроМаркет</h1>
        <div className="cart">🛒 Корзина: {cartCount}</div>
      </header>

      <main>
        <div className="catalog">
          <h2>Каталог</h2>

          <input
            type="text"
            placeholder="Поиск товара..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          {loading && <p className="status">Загрузка...</p>}
          {error && <div className="error">{error}</div>}

          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} onAdd={handleAddToCart} />
          ))}
        </div>
      </main>
    </>
  );
}

export default App;
