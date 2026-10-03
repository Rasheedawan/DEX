import React from 'react';

export default function ProductCard({ product, onAddToCart, onBuyNow, onViewDetails }) {
  const itemTitle = product.name || product.title;

  return (
    <div className="group bg-white border border-neutral-100 flex flex-col justify-between transition-all duration-300 hover:shadow-xl">
      {/* Image Container */}
      <div 
        onClick={() => onViewDetails(product)}
        className="relative overflow-hidden aspect-[3/4] bg-neutral-100 cursor-pointer"
      >
        {product.image ? (
          <img
            src={product.image}
            alt={itemTitle}
            className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-neutral-300 font-serif text-3xl">
            🧵
          </div>
        )}
        {product.badge && (
          <span className="absolute top-3 left-3 bg-neutral-900 text-white text-[10px] uppercase font-bold tracking-widest px-2.5 py-1">
            {product.badge}
          </span>
        )}
      </div>

      {/* Info Section */}
      <div className="p-4 flex flex-col flex-grow justify-between text-left">
        <div onClick={() => onViewDetails(product)} className="cursor-pointer">
          <p className="text-[10px] uppercase tracking-widest text-neutral-400 font-semibold mb-1">
            {product.category}
          </p>
          <h3 className="text-sm font-serif font-medium text-neutral-900 line-clamp-1 group-hover:text-amber-800 transition-colors">
            {itemTitle}
          </h3>
          <p className="text-xs font-bold text-neutral-900 mt-2">
            PKR {product.price?.toLocaleString()}
          </p>
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4 pt-3 border-t border-neutral-100">
          <button
            onClick={() => onAddToCart(product)}
            className="w-full py-2 px-2 border border-neutral-900 text-neutral-900 text-[10px] uppercase tracking-wider font-semibold hover:bg-neutral-900 hover:text-white transition-all"
          >
            Add To Cart
          </button>
          <button
            onClick={() => onBuyNow(product)}
            className="w-full py-2 px-2 bg-neutral-900 text-white text-[10px] uppercase tracking-wider font-semibold hover:bg-black transition-all"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}