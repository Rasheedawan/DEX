import React from 'react';

export default function Sidebar({
  categories = [],
  selectedCategory,
  setSelectedCategory,
  isCategoryOpen,
  onCategoryClose,
  isCartOpen,
  onCartClose,
  cartItems = [],
  onUpdateQuantity,
  onRemoveItem,
  onProceedCheckout,
  isDarkMode,
}) {
  return (
    <>
      {/* 1) LEFT CATEGORY SIDEBAR (Popup Drawer on Click) */}
      {isCategoryOpen && (
        <div className="fixed inset-0 z-50 flex justify-start bg-black/60 backdrop-blur-sm transition-opacity">
          <div className={`w-72 h-full shadow-2xl p-6 flex flex-col justify-between text-left transition-colors ${
            isDarkMode ? 'bg-neutral-900 text-white' : 'bg-white text-neutral-900'
          }`}>
            <div>
              <div className="flex items-center justify-between border-b pb-4 mb-6 border-neutral-700">
                <h3 className="text-xs font-bold uppercase tracking-widest">
                  Categories
                </h3>
                <button
                  onClick={onCategoryClose}
                  className="text-neutral-400 hover:text-red-500 font-bold text-lg"
                >
                  ✕
                </button>
              </div>

              <ul className="space-y-2">
                {(categories || []).map((cat) => (
                  <li key={cat}>
                    <button
                      onClick={() => {
                        setSelectedCategory(cat);
                        onCategoryClose();
                      }}
                      className={`w-full text-left text-xs uppercase tracking-wider py-2.5 px-3 transition-all rounded ${
                        selectedCategory === cat
                          ? isDarkMode
                            ? 'bg-white text-neutral-900 font-bold'
                            : 'bg-neutral-900 text-white font-bold'
                          : isDarkMode
                          ? 'text-neutral-300 hover:bg-neutral-800'
                          : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900'
                      }`}
                    >
                      {cat}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="text-[11px] opacity-50 border-t pt-4 border-neutral-700">
              Select category to filter products.
            </div>
          </div>
        </div>
      )}

      {/* 2) RIGHT CART SIDEBAR (Sliding Drawer on Cart Click) */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm transition-opacity">
          <div className={`w-full max-w-md h-full shadow-2xl flex flex-col justify-between p-6 transition-colors ${
            isDarkMode ? 'bg-neutral-900 text-white' : 'bg-white text-neutral-900'
          }`}>
            <div>
              <div className="flex items-center justify-between border-b pb-4 mb-4 border-neutral-700">
                <h2 className="text-lg font-serif font-bold">
                  Shopping Cart ({cartItems.reduce((acc, i) => acc + i.quantity, 0)})
                </h2>
                <button
                  onClick={onCartClose}
                  className="text-neutral-400 hover:text-red-500 font-bold text-xl px-2"
                >
                  ✕
                </button>
              </div>

              {cartItems.length === 0 ? (
                <div className="text-center py-12 text-neutral-400">
                  <p className="text-3xl mb-2">🛍️</p>
                  <p className="text-xs uppercase tracking-wider">Your cart is empty</p>
                </div>
              ) : (
                <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className={`p-3 border rounded flex items-center justify-between ${
                        isDarkMode ? 'border-neutral-800 bg-neutral-800/50' : 'border-neutral-200 bg-neutral-50'
                      }`}
                    >
                      <div className="text-left flex-1 pr-3">
                        <h4 className="text-xs font-semibold line-clamp-1">{item.name || item.title}</h4>
                        <p className="text-[11px] text-amber-600 font-bold mt-1">
                          PKR {item.price?.toLocaleString()}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="flex items-center border border-neutral-400 rounded overflow-hidden">
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                            className="px-2 py-0.5 text-xs font-bold hover:bg-neutral-300 hover:text-black transition"
                          >
                            -
                          </button>
                          <span className="px-2 py-0.5 text-xs font-bold">{item.quantity}</span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            className="px-2 py-0.5 text-xs font-bold hover:bg-neutral-300 hover:text-black transition"
                          >
                            +
                          </button>
                        </div>

                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="text-neutral-400 hover:text-red-500 text-xs px-1"
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="border-t pt-4 border-neutral-700">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xs uppercase tracking-wider font-semibold">Total:</span>
                  <span className="text-lg font-bold text-amber-500">
                    PKR {cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toLocaleString()}
                  </span>
                </div>
                <button
                  onClick={onProceedCheckout}
                  className="w-full bg-amber-600 hover:bg-amber-700 text-white py-3 text-xs uppercase tracking-widest font-semibold transition"
                >
                  Proceed to Checkout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}