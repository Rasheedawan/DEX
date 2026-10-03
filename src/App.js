import React, { useState } from 'react';
import Navbar from './components/Navbar';
import ProductCard from './components/ProductCard';
import CheckoutModal from './components/CheckoutModal';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import ProductDetailModal from './components/ProductDetailModal';
import { productsData } from './data/products';

export default function App() {
  const [cart, setCart] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [directCheckoutItem, setDirectCheckoutItem] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const categories = ['All', 'Unstitched', 'Men', 'Fancy', 'Ready to Wear'];

  const handleAddToCart = (product) => {
    if (!product) return;
    const qtyToAdd = product.quantity || 1;
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + qtyToAdd } : item
        );
      }
      return [...prev, { ...product, quantity: qtyToAdd }];
    });
  };

  const handleUpdateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      handleRemoveItem(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === productId ? { ...item, quantity: newQuantity } : item))
    );
  };

  const handleRemoveItem = (productId) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  const handleBuyNow = (product) => {
    if (!product) return;
    const qty = product.quantity || 1;
    setDirectCheckoutItem([{ ...product, quantity: qty }]);
    setIsCheckoutOpen(true);
  };

  const rawProducts = Array.isArray(productsData) ? productsData : [];
  const filteredProducts = rawProducts.filter((product) => {
    if (!product) return false;
    const matchesCategory =
      selectedCategory === 'All' || product.category === selectedCategory;
    const itemTitle = product.name || product.title || '';
    const matchesSearch = itemTitle.toLowerCase().includes((searchQuery || '').toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const activeCheckoutItems = directCheckoutItem || cart;
  const totalAmount = activeCheckoutItems.reduce(
    (sum, item) => sum + (item.price || 0) * (item.quantity || 1),
    0
  );

  return (
    <div className={`min-h-screen font-sans flex flex-col justify-between transition-colors duration-300 ${
      isDarkMode ? 'bg-neutral-950 text-neutral-100' : 'bg-neutral-50 text-neutral-800'
    }`}>
      <div>
        <Navbar
          cartCount={cart.reduce((acc, item) => acc + item.quantity, 0)}
          onCartClick={() => setIsCartOpen(true)}
          onCategoryToggle={() => setIsCategoryOpen(true)}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
        />

        {/* Full-width container without max-width side empty spaces */}
        <div className="w-full px-4 sm:px-8 py-8">
          <Sidebar
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            isCategoryOpen={isCategoryOpen}
            onCategoryClose={() => setIsCategoryOpen(false)}
            isCartOpen={isCartOpen}
            onCartClose={() => setIsCartOpen(false)}
            cartItems={cart}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            onProceedCheckout={() => {
              setDirectCheckoutItem(null);
              setIsCartOpen(false);
              setIsCheckoutOpen(true);
            }}
            isDarkMode={isDarkMode}
          />

          {/* Full Width Banner */}
          <div className={`w-full p-8 md:p-12 mb-8 text-left shadow-lg transition-colors ${
            isDarkMode ? 'bg-neutral-900 border border-neutral-800 text-white' : 'bg-neutral-900 text-white'
          }`}>
            <span className="text-[10px] uppercase tracking-[0.3em] text-neutral-400 font-semibold">
              New Collection 2026
            </span>
            <h1 className="text-2xl md:text-4xl font-serif tracking-wide mt-2">
              Luxury Premium Fabrics
            </h1>
            <p className="text-xs text-neutral-400 mt-2">
              Showing: {selectedCategory} ({filteredProducts.length} items)
            </p>
          </div>

          {/* Grid Layout taking full width */}
          <main className="w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                  onBuyNow={handleBuyNow}
                  onViewDetails={(prod) => setSelectedProduct(prod)}
                />
              ))}
            </div>
          </main>
        </div>

        <ProductDetailModal
          product={selectedProduct}
          isOpen={!!selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={handleAddToCart}
          onBuyNow={handleBuyNow}
        />

        <CheckoutModal
          isOpen={isCheckoutOpen}
          onClose={() => {
            setIsCheckoutOpen(false);
            setDirectCheckoutItem(null);
          }}
          cartItems={activeCheckoutItems}
          totalAmount={totalAmount}
        />
      </div>

      <Footer />
    </div>
  );
}