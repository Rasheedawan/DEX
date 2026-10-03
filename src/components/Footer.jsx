import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-neutral-900 text-white border-t border-neutral-800 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
        <div>
          <h3 className="font-serif text-lg tracking-wide mb-3">AWAN STORE</h3>
          <p className="text-xs text-neutral-400 leading-relaxed">
            Premium unstitched and stitched apparel crafted for elegance, comfort, and timeless style.
          </p>
        </div>
        <div>
          <h4 className="text-xs uppercase tracking-widest text-neutral-400 mb-3 font-semibold">Quick Links</h4>
          <ul className="text-xs space-y-2 text-neutral-300">
            <li className="hover:text-white cursor-pointer">Unstitched Lawn</li>
            <li className="hover:text-white cursor-pointer">Men's Collection</li>
            <li className="hover:text-white cursor-pointer">Fancy Festive Wear</li>
            <li className="hover:text-white cursor-pointer">Ready to Wear</li>
          </ul>
        </div>
        <div>
          <h4 className="text-xs uppercase tracking-widest text-neutral-400 mb-3 font-semibold">Customer Care</h4>
          <p className="text-xs text-neutral-300">Email: support@awanstore.com</p>
          <p className="text-xs text-neutral-300 mt-1">Phone: +92 300 1234567</p>
        </div>
      </div>
      <div className="border-t border-neutral-800 py-4 text-center text-[11px] text-neutral-500">
        © 2026 Awan Store. All Rights Reserved.
      </div>
    </footer>
  );
}