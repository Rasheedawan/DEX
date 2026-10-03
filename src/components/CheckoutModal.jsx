import React, { useState } from 'react';

export default function CheckoutModal({ isOpen, onClose, cartItems, totalAmount }) {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    city: '',
    address: '',
    paymentMethod: 'cod'
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-white w-full max-w-lg rounded-none shadow-2xl overflow-hidden border border-neutral-200 my-8">
        {/* Header */}
        <div className="bg-neutral-900 text-white p-6 flex justify-between items-center border-b border-neutral-800">
          <div>
            <h2 className="text-xl font-serif tracking-widest uppercase">Checkout</h2>
            <p className="text-xs text-neutral-400 mt-1">Complete your luxury order</p>
          </div>
          <button 
            onClick={onClose}
            className="text-neutral-400 hover:text-white text-2xl font-light transition"
          >
            &times;
          </button>
        </div>

        {isSubmitted ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto text-2xl font-bold">
              ✓
            </div>
            <h3 className="text-2xl font-serif text-neutral-900">Order Confirmed!</h3>
            <p className="text-xs text-neutral-600 leading-relaxed max-w-xs mx-auto">
              Thank you, <span className="font-semibold text-neutral-900">{formData.fullName}</span>. Your order has been placed successfully via Cash on Delivery.
            </p>
            <div className="bg-neutral-50 p-4 border border-neutral-100 text-left text-xs space-y-1 my-4">
              <p><span className="font-medium">Delivery City:</span> {formData.city}</p>
              <p><span className="font-medium">Total Payable:</span> PKR {totalAmount.toLocaleString()}</p>
            </div>
            <button
              onClick={() => { setIsSubmitted(false); onClose(); }}
              className="w-full bg-neutral-900 text-white text-xs uppercase tracking-widest py-3 hover:bg-black transition font-medium"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 text-left">
            {/* Order Summary Pill */}
            <div className="bg-neutral-50 p-3 border border-neutral-100 flex justify-between items-center text-xs">
              <span className="text-neutral-500 font-medium">Order Total:</span>
              <span className="text-sm font-bold text-neutral-900">PKR {totalAmount.toLocaleString()}</span>
            </div>

            {/* Inputs */}
            <div>
              <label className="block text-[11px] uppercase tracking-wider font-semibold text-neutral-700 mb-1">
                Full Name *
              </label>
              <input
                required
                type="text"
                placeholder="e.g. Muhammad Ali"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="w-full bg-white text-xs px-3 py-2.5 border border-neutral-300 focus:outline-none focus:border-neutral-900 transition"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] uppercase tracking-wider font-semibold text-neutral-700 mb-1">
                  Mobile Number *
                </label>
                <input
                  required
                  type="tel"
                  placeholder="0300-1234567"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-white text-xs px-3 py-2.5 border border-neutral-300 focus:outline-none focus:border-neutral-900 transition"
                />
              </div>
              <div>
                <label className="block text-[11px] uppercase tracking-wider font-semibold text-neutral-700 mb-1">
                  City *
                </label>
                <input
                  required
                  type="text"
                  placeholder="Karachi, Lahore, etc."
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full bg-white text-xs px-3 py-2.5 border border-neutral-300 focus:outline-none focus:border-neutral-900 transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider font-semibold text-neutral-700 mb-1">
                Complete Delivery Address *
              </label>
              <textarea
                required
                rows="2"
                placeholder="House #, Street, Area..."
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full bg-white text-xs px-3 py-2 border border-neutral-300 focus:outline-none focus:border-neutral-900 transition"
              ></textarea>
            </div>

            {/* Payment Options */}
            <div>
              <label className="block text-[11px] uppercase tracking-wider font-semibold text-neutral-700 mb-1">
                Payment Method
              </label>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <label className="flex items-center gap-2 p-2.5 border border-neutral-900 bg-neutral-50 cursor-pointer font-medium">
                  <input type="radio" name="payment" checked readOnly className="accent-neutral-900" />
                  Cash on Delivery
                </label>
                <label className="flex items-center gap-2 p-2.5 border border-neutral-200 text-neutral-400 cursor-not-allowed">
                  <input type="radio" name="payment" disabled />
                  Card (Disabled)
                </label>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-2 flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="w-1/3 py-3 border border-neutral-300 text-xs uppercase tracking-wider font-medium text-neutral-700 hover:bg-neutral-50 transition"
              >
                Back
              </button>
              <button
                type="submit"
                className="w-2/3 bg-neutral-900 text-white text-xs uppercase tracking-widest py-3 font-medium hover:bg-black transition shadow-md"
              >
                Confirm Order
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}