import React from 'react';

export default function Navbar({
  cartCount,
  onCartClick,
  onCategoryToggle,
  searchQuery,
  setSearchQuery,
  isDarkMode,
  setIsDarkMode,
}) {
  return (
    <nav className={`w-full border-b sticky top-0 z-40 transition-colors duration-300 ${isDarkMode ? 'bg-neutral-900 border-neutral-800 text-white' : 'bg-white border-neutral-200 text-neutral-900'}`}>
      <div className="w-full px-4 sm:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Left: Category Button */}
        <button
          onClick={onCategoryToggle}
          className={`flex items-center gap-2 px-3 py-2 text-xs uppercase tracking-wider font-semibold border rounded transition ${
            isDarkMode
              ? 'border-neutral-700 bg-neutral-800 hover:bg-neutral-700 text-white'
              : 'border-neutral-300 bg-neutral-100 hover:bg-neutral-200 text-neutral-800'
          }`}
        >
          <span>☰</span> Categories
        </button>

        {/* Center: Logo & Name */}
        <div className="flex items-center gap-2.5 font-serif text-lg font-bold tracking-widest cursor-pointer">
          <img 
            src="/logo.png" 
            alt="Awan Store Logo" 
            className="w-9 h-9 object-cover rounded-full border border-neutral-300 shadow-sm"
            onError={(e) => { e.target.style.display = 'none'; }} 
          />
          <span>AWAN STORE</span>
        </div>

        {/* Search Input */}
        <div className="hidden sm:block flex-1 max-w-xs">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products..."
            className={`w-full text-xs px-3 py-2 border outline-none transition ${
              isDarkMode
                ? 'bg-neutral-800 border-neutral-700 text-white placeholder-neutral-400 focus:border-white'
                : 'bg-neutral-50 border-neutral-300 text-neutral-900 placeholder-neutral-400 focus:border-neutral-900'
            }`}
          />
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`p-2 text-xs font-semibold border rounded transition ${
              isDarkMode
                ? 'border-neutral-700 bg-neutral-800 hover:bg-neutral-700 text-yellow-400'
                : 'border-neutral-300 bg-neutral-100 hover:bg-neutral-200 text-neutral-800'
            }`}
            title="Toggle Light/Dark Theme"
          >
            {isDarkMode ? '☀️' : '🌙'}
          </button>

          <button
            onClick={onCartClick}
            className={`relative p-2 px-3 text-xs uppercase font-bold tracking-wider border transition ${
              isDarkMode
                ? 'border-neutral-700 hover:bg-neutral-800 text-white'
                : 'border-neutral-900 bg-neutral-900 text-white hover:bg-black'
            }`}
          >
            🛒 Cart
            {cartCount > 0 && (
              <span className="ml-2 bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                {cartCount}
              </span>
            )}
          </button>
        </div>

      </div>
    </nav>
  );
}