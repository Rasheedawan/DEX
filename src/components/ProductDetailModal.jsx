import React, { useState } from 'react';

export default function ProductDetailModal({ product, isOpen, onClose, onAddToCart, onBuyNow }) {
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description'); // 'description' | 'specs' | 'reviews'

  if (!isOpen || !product) return null;

  const itemTitle = product.name || product.title;

  const handleAddToCart = () => {
    onAddToCart({ ...product, quantity });
    onClose();
  };

  const handleBuyNow = () => {
    onBuyNow({ ...product, quantity });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-white w-full max-w-4xl rounded-none shadow-2xl overflow-hidden my-8 text-left relative flex flex-col md:flex-row max-h-[90vh]">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-neutral-900/80 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-black transition"
        >
          ✕
        </button>

        {/* Left Side: Product Image Display */}
        <div className="w-full md:w-1/2 bg-neutral-100 relative min-h-[300px] md:min-h-full flex items-center justify-center overflow-hidden">
          {product.image ? (
            <img
              src={product.image}
              alt={itemTitle}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="p-8 text-center text-neutral-400 font-serif">
              <span className="text-4xl block mb-2">🧵</span>
              <p className="text-xs uppercase tracking-widest">Premium Fabric Visual</p>
            </div>
          )}
          {product.badge && (
            <span className="absolute top-4 left-4 bg-neutral-900 text-white text-[10px] uppercase font-bold tracking-widest px-3 py-1">
              {product.badge}
            </span>
          )}
        </div>

        {/* Right Side: Details, Tabs, Actions */}
        <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-between overflow-y-auto">
          <div>
            {/* Category & Title */}
            <p className="text-[10px] uppercase tracking-widest text-neutral-400 font-bold mb-1">
              {product.category}
            </p>
            <h2 className="text-xl md:text-2xl font-serif text-neutral-900 font-medium">
              {itemTitle}
            </h2>

            {/* Rating Summary */}
            <div className="flex items-center gap-2 mt-2">
              <div className="flex text-amber-500 text-xs">
                ★★★★★
              </div>
              <span className="text-xs text-neutral-500 font-medium">(14 verified reviews)</span>
            </div>

            {/* Price */}
            <div className="mt-4 pb-4 border-b border-neutral-100 flex items-baseline gap-3">
              <span className="text-xl font-bold text-neutral-900">
                PKR {product.price?.toLocaleString()}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-neutral-400 line-through">
                  PKR {product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>

            {/* Tabs Header */}
            <div className="flex border-b border-neutral-200 mt-4 gap-4 text-xs font-semibold uppercase tracking-wider">
              <button
                onClick={() => setActiveTab('description')}
                className={`pb-2 transition-all ${
                  activeTab === 'description'
                    ? 'border-b-2 border-neutral-900 text-neutral-900'
                    : 'text-neutral-400 hover:text-neutral-700'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('specs')}
                className={`pb-2 transition-all ${
                  activeTab === 'specs'
                    ? 'border-b-2 border-neutral-900 text-neutral-900'
                    : 'text-neutral-400 hover:text-neutral-700'
                }`}
              >
                Specifications
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`pb-2 transition-all ${
                  activeTab === 'reviews'
                    ? 'border-b-2 border-neutral-900 text-neutral-900'
                    : 'text-neutral-400 hover:text-neutral-700'
                }`}
              >
                Reviews (14)
              </button>
            </div>

            {/* Tab Content */}
            <div className="py-4 text-xs text-neutral-600 leading-relaxed min-h-[110px]">
              {activeTab === 'description' && (
                <p>
                  Experience the pinnacle of comfort and sophistication with our luxury {itemTitle}. 
                  Specially crafted for discerning tastes, this suit features intricate weaving, 
                  vibrant color fastness, and ultra-soft breathability for all-day elegance.
                </p>
              )}

              {activeTab === 'specs' && (
                <ul className="space-y-1.5 list-disc list-inside text-neutral-700">
                  <li><span className="font-semibold">Fabric Type:</span> 100% Pure Super Fine Cotton / Lawn</li>
                  <li><span className="font-semibold">Cutting:</span> 4.5 Meters Unstitched Standard Cutting</li>
                  <li><span className="font-semibold">Care Instruction:</span> Dry clean or soft hand wash only</li>
                  <li><span className="font-semibold">SKU:</span> FAB-{product.id}-2026</li>
                </ul>
              )}

              {activeTab === 'reviews' && (
                <div className="space-y-3">
                  <div className="bg-neutral-50 p-2.5 rounded border border-neutral-100">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-semibold text-neutral-900">Ayesha K.</span>
                      <span className="text-[10px] text-neutral-400">2 days ago</span>
                    </div>
                    <p className="text-[11px] text-neutral-600">"Fabric stuff is extremely fine and smooth. Fast delivery in Karachi!"</p>
                  </div>
                  <div className="bg-neutral-50 p-2.5 rounded border border-neutral-100">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-semibold text-neutral-900">Usman R.</span>
                      <span className="text-[10px] text-neutral-400">1 week ago</span>
                    </div>
                    <p className="text-[11px] text-neutral-600">"100% original quality fabric. Recommended for summer wear."</p>
                  </div>
                </div>
              )}
            </div>

            {/* Quantity Controls */}
            <div className="flex items-center gap-4 py-3 border-t border-neutral-100">
              <span className="text-xs uppercase font-semibold text-neutral-700">Quantity:</span>
              <div className="flex items-center border border-neutral-300">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3 py-1 text-sm font-bold hover:bg-neutral-100"
                >
                  -
                </button>
                <span className="px-4 py-1 text-xs font-bold text-neutral-900">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-3 py-1 text-sm font-bold hover:bg-neutral-100"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Actions & Trust Seals */}
          <div>
            <div className="grid grid-cols-2 gap-3 mt-4">
              <button
                onClick={handleAddToCart}
                className="w-full py-3 border border-neutral-900 text-neutral-900 text-xs uppercase tracking-widest font-semibold hover:bg-neutral-900 hover:text-white transition"
              >
                Add To Cart
              </button>
              <button
                onClick={handleBuyNow}
                className="w-full py-3 bg-neutral-900 text-white text-xs uppercase tracking-widest font-semibold hover:bg-black transition shadow-md"
              >
                Buy Now
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-2 mt-6 pt-4 border-t border-neutral-100 text-center text-[10px] text-neutral-500 uppercase tracking-wider">
              <div>🚚 Fast Delivery</div>
              <div>💵 Cash on Delivery</div>
              <div>🔄 7-Day Returns</div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}