import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShieldCheck, CheckCircle2, MapPin, CreditCard, Smartphone, Banknote, Building2, Plus, ChevronRight, ArrowLeft } from 'lucide-react';

const Payments = ({ product1, mobile1, laptops1, shoes1, gym1, cartItems = [], onPlaceOrder }) => {
  const { category, id } = useParams();
  const navigate = useNavigate();

  // State Management
  const [selectedAddress, setSelectedAddress] = useState(1);
  const [showNewAddressForm, setShowNewAddressForm] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("upi"); // DEFAULT ON UPI AS REQUESTED
  const [upiOption, setUpiOption] = useState("gpay");
  const [upiId, setUpiId] = useState("");
  const [orderPlaced, setOrderPlaced] = useState(false);

  // New Address Form State
  const [newAddress, setNewAddress] = useState({
    name: "",
    phone: "",
    pincode: "",
    locality: "",
    address: "",
    city: "",
    state: "",
    type: "HOME"
  });

  // Saved Addresses List
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      name: "Syed",
      phone: "+91 98765 43210",
      address: "Flat 402, Building A, Embassy Tech Village, Outer Ring Road, Devarabeesanahalli",
      city: "Bengaluru",
      state: "Karnataka",
      pincode: "560103",
      type: "HOME"
    },
    {
      id: 2,
      name: "Syed (Work)",
      phone: "+91 98765 43210",
      address: "3rd Floor, Tech Park, Whitefield Main Road",
      city: "Bengaluru",
      state: "Karnataka",
      pincode: "560066",
      type: "WORK"
    }
  ]);

  // Find product details
  const datasets = {
    products: product1,
    mobiles: mobile1,
    laptops: laptops1,
    shoes: shoes1,
    gym: gym1
  };

  const getItemDetails = (itemKey) => {
    const list = datasets[itemKey.category] || product1;
    const found = list?.find((item) => String(item.id) === String(itemKey.id));
    return {
      category: itemKey.category,
      id: itemKey.id,
      ...(found || list?.[0] || {})
    };
  };

  // Determine if using multi-item cart or single product route
  const isCartCheckout = !id && cartItems.length > 0;
  const itemsToCheckout = isCartCheckout
    ? cartItems.map(getItemDetails)
    : [getItemDetails({ category: category || "products", id: id || "1" })];

  // Price Calculations
  let totalOriginalPrice = 0;
  let totalDiscountedPrice = 0;

  itemsToCheckout.forEach((item) => {
    const rawPrice = Number(item?.price?.toString().replace(/,/g, '')) || 500;
    const rawOldPrice = Number(item?.oldPrice?.toString().replace(/,/g, '')) || 4999;
    totalOriginalPrice += rawOldPrice;
    totalDiscountedPrice += rawPrice;
  });

  const platformFee = 9;
  const totalPayable = totalDiscountedPrice + platformFee;
  const totalSavings = totalOriginalPrice - totalDiscountedPrice;

  // Calculate dynamic delivery date (+6 days)
  const calcDeliveryDate = () => {
    const d = new Date();
    d.setDate(d.getDate() + 6);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    const readable = d.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });
    return { formatted: `${day}-${month}-${year}`, readable };
  };

  const deliveryInfo = calcDeliveryDate();

  const handleAddNewAddress = (e) => {
    e.preventDefault();
    if (!newAddress.name || !newAddress.phone || !newAddress.address || !newAddress.pincode) {
      alert("Please fill in all required address fields.");
      return;
    }
    const created = {
      ...newAddress,
      id: Date.now()
    };
    setAddresses([...addresses, created]);
    setSelectedAddress(created.id);
    setShowNewAddressForm(false);
  };

  const handlePlaceOrder = () => {
    if (paymentMethod === "upi" && upiOption === "custom" && !upiId.trim()) {
      alert("Please enter a valid UPI ID (e.g. name@upi).");
      return;
    }
    const currentAddr = addresses.find((a) => a.id === selectedAddress);
    if (onPlaceOrder) {
      onPlaceOrder(itemsToCheckout, currentAddr);
    }
    setOrderPlaced(true);
  };

  // SUCCESS / ORDER CONFIRMED SCREEN
  if (orderPlaced) {
    return (
      <div className="bg-[#F1F3F6] min-h-screen py-12 px-4 font-sans flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-8 max-w-lg w-full text-center flex flex-col items-center">
          <CheckCircle2 size={64} className="text-emerald-500 mb-4 animate-bounce" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Order Confirmed! 🎉</h1>
          <p className="text-sm text-gray-600 mb-4">
            Thank you for your order. We have received your payment via <span className="font-bold uppercase text-blue-600">{paymentMethod}</span>.
          </p>

          <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 w-full text-left mb-6 text-xs space-y-1.5">
            <p className="font-bold text-blue-900 text-sm mb-1">Delivery Summary</p>
            <p><span className="text-gray-500">Deliver to:</span> <strong className="text-gray-800">{addresses.find(a => a.id === selectedAddress)?.name}</strong></p>
            <p className="text-gray-700 leading-snug">{addresses.find(a => a.id === selectedAddress)?.address}, {addresses.find(a => a.id === selectedAddress)?.city} - {addresses.find(a => a.id === selectedAddress)?.pincode}</p>
            <p className="pt-2 text-emerald-700 font-bold">Estimated Delivery: {deliveryInfo.formatted} ({deliveryInfo.readable})</p>
          </div>

          <div className="flex gap-3 w-full">
            <button
              onClick={() => navigate('/waiting')}
              className="w-1/2 bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs sm:text-sm py-3 rounded-md shadow transition cursor-pointer uppercase tracking-wider"
            >
              Track Order (Waiting)
            </button>
            <button
              onClick={() => navigate('/products')}
              className="w-1/2 bg-[#2874F0] hover:bg-blue-600 text-white font-bold text-xs sm:text-sm py-3 rounded-md shadow transition cursor-pointer uppercase tracking-wider"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F1F3F6] min-h-screen py-6 px-4 font-sans text-gray-800">
      
      {/* Top Header */}
      <div className="max-w-6xl mx-auto mb-4 flex items-center justify-between">
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center gap-1.5 text-sm font-semibold text-gray-600 hover:text-blue-600 cursor-pointer"
        >
          <ArrowLeft size={18} /> Back
        </button>
        <div className="flex items-center gap-1 text-xs text-gray-500 font-semibold">
          <ShieldCheck size={18} className="text-emerald-600" />
          <span>100% Safe & Secure Checkout</span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-5 items-start">
        
        {/* LEFT COLUMN - Steps 1 (Address) & 2 (Payment Mode) */}
        <div className="w-full lg:w-2/3 flex flex-col gap-4">
          
          {/* STEP 1: DELIVERY ADDRESS VERIFICATION */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-[#2874F0] text-white px-5 py-3.5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="bg-white text-[#2874F0] font-bold rounded-full w-6 h-6 flex items-center justify-center text-xs">
                  1
                </span>
                <h2 className="font-bold text-base uppercase tracking-wider">Delivery Address</h2>
              </div>
              <span className="text-xs font-semibold bg-blue-700/50 px-2.5 py-1 rounded">Step 1 of 2</span>
            </div>

            <div className="p-5 flex flex-col gap-4">
              
              {/* Saved Address Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {addresses.map((addr) => (
                  <div
                    key={addr.id}
                    onClick={() => setSelectedAddress(addr.id)}
                    className={`border rounded-lg p-4 cursor-pointer transition relative text-left ${
                      selectedAddress === addr.id
                        ? "border-blue-600 bg-blue-50/40 shadow-sm"
                        : "border-gray-200 hover:border-gray-300 bg-white"
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="address"
                          checked={selectedAddress === addr.id}
                          onChange={() => setSelectedAddress(addr.id)}
                          className="accent-blue-600 cursor-pointer"
                        />
                        <span className="font-bold text-sm text-gray-900">{addr.name}</span>
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-gray-200 text-gray-700 uppercase">
                        {addr.type}
                      </span>
                    </div>

                    <p className="text-xs text-gray-600 leading-relaxed pl-5">
                      {addr.address}, {addr.city}, {addr.state} - <strong className="text-gray-800">{addr.pincode}</strong>
                    </p>
                    <p className="text-xs text-gray-600 font-semibold mt-2 pl-5">
                      Phone: {addr.phone}
                    </p>

                    {selectedAddress === addr.id && (
                      <div className="mt-3 pl-5">
                        <span className="inline-block bg-[#FB641B] text-white text-xs font-bold px-4 py-1.5 rounded shadow-sm">
                          Deliver Here ✓
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Add New Address Toggle / Form */}
              {!showNewAddressForm ? (
                <button
                  onClick={() => setShowNewAddressForm(true)}
                  className="flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-700 mt-1 cursor-pointer w-fit"
                >
                  <Plus size={16} /> Add a new delivery address
                </button>
              ) : (
                <form onSubmit={handleAddNewAddress} className="mt-2 p-4 border border-blue-200 rounded-lg bg-gray-50/50 flex flex-col gap-3 text-left">
                  <h3 className="text-sm font-bold text-gray-800">Add New Address</h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Full Name *"
                      value={newAddress.name}
                      onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })}
                      className="border border-gray-300 rounded px-3 py-2 text-xs w-full outline-none focus:border-blue-600"
                      required
                    />
                    <input
                      type="text"
                      placeholder="10-digit Mobile Number *"
                      value={newAddress.phone}
                      onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })}
                      className="border border-gray-300 rounded px-3 py-2 text-xs w-full outline-none focus:border-blue-600"
                      required
                    />
                    <input
                      type="text"
                      placeholder="Pincode *"
                      value={newAddress.pincode}
                      onChange={(e) => setNewAddress({ ...newAddress, pincode: e.target.value })}
                      className="border border-gray-300 rounded px-3 py-2 text-xs w-full outline-none focus:border-blue-600"
                      required
                    />
                    <input
                      type="text"
                      placeholder="Locality / Area *"
                      value={newAddress.locality}
                      onChange={(e) => setNewAddress({ ...newAddress, locality: e.target.value })}
                      className="border border-gray-300 rounded px-3 py-2 text-xs w-full outline-none focus:border-blue-600"
                      required
                    />
                  </div>

                  <textarea
                    placeholder="Address (House No, Building, Street) *"
                    value={newAddress.address}
                    onChange={(e) => setNewAddress({ ...newAddress, address: e.target.value })}
                    className="border border-gray-300 rounded px-3 py-2 text-xs w-full h-16 outline-none focus:border-blue-600"
                    required
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="City / District *"
                      value={newAddress.city}
                      onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                      className="border border-gray-300 rounded px-3 py-2 text-xs w-full outline-none focus:border-blue-600"
                      required
                    />
                    <input
                      type="text"
                      placeholder="State *"
                      value={newAddress.state}
                      onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
                      className="border border-gray-300 rounded px-3 py-2 text-xs w-full outline-none focus:border-blue-600"
                      required
                    />
                  </div>

                  <div className="flex gap-4 items-center mt-1">
                    <span className="text-xs font-semibold text-gray-600">Address Type:</span>
                    <label className="flex items-center gap-1 text-xs cursor-pointer">
                      <input
                        type="radio"
                        name="addrType"
                        checked={newAddress.type === "HOME"}
                        onChange={() => setNewAddress({ ...newAddress, type: "HOME" })}
                      /> Home
                    </label>
                    <label className="flex items-center gap-1 text-xs cursor-pointer">
                      <input
                        type="radio"
                        name="addrType"
                        checked={newAddress.type === "WORK"}
                        onChange={() => setNewAddress({ ...newAddress, type: "WORK" })}
                      /> Work
                    </label>
                  </div>

                  <div className="flex gap-2 mt-2">
                    <button type="submit" className="bg-blue-600 text-white font-bold text-xs px-5 py-2 rounded hover:bg-blue-700 cursor-pointer">
                      Save & Deliver Here
                    </button>
                    <button type="button" onClick={() => setShowNewAddressForm(false)} className="border border-gray-300 text-gray-600 text-xs px-4 py-2 rounded hover:bg-gray-100 cursor-pointer">
                      Cancel
                    </button>
                  </div>
                </form>
              )}

            </div>
          </div>


          {/* STEP 2: PAYMENT MODE SELECTION (UPI DEFAULT ON) */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-[#2874F0] text-white px-5 py-3.5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="bg-white text-[#2874F0] font-bold rounded-full w-6 h-6 flex items-center justify-center text-xs">
                  2
                </span>
                <h2 className="font-bold text-base uppercase tracking-wider">Payment Options</h2>
              </div>
              <span className="text-xs font-semibold bg-blue-700/50 px-2.5 py-1 rounded">Step 2 of 2</span>
            </div>

            <div className="p-5 flex flex-col gap-4 text-left">
              
              {/* Option 1: UPI (DEFAULT SELECTED AS REQUESTED) */}
              <div className={`border rounded-lg p-4 transition ${paymentMethod === "upi" ? "border-blue-600 bg-blue-50/30" : "border-gray-200"}`}>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="upi"
                    checked={paymentMethod === "upi"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="accent-blue-600 cursor-pointer"
                  />
                  <Smartphone className="text-blue-600" size={20} />
                  <div>
                    <span className="font-bold text-sm text-gray-900 block">UPI (Google Pay, PhonePe, Paytm, BHIM)</span>
                    <span className="text-xs text-gray-500">Pay directly from your bank account instantly</span>
                  </div>
                </label>

                {paymentMethod === "upi" && (
                  <div className="mt-4 pl-8 flex flex-col gap-3 border-t pt-3">
                    
                    {/* GPay */}
                    <label className="flex items-center gap-2 text-xs font-medium cursor-pointer">
                      <input
                        type="radio"
                        name="upiOption"
                        checked={upiOption === "gpay"}
                        onChange={() => setUpiOption("gpay")}
                      />
                      <span>Google Pay</span>
                    </label>

                    {/* PhonePe */}
                    <label className="flex items-center gap-2 text-xs font-medium cursor-pointer">
                      <input
                        type="radio"
                        name="upiOption"
                        checked={upiOption === "phonepe"}
                        onChange={() => setUpiOption("phonepe")}
                      />
                      <span>PhonePe / BHIM UPI</span>
                    </label>

                    {/* Custom UPI ID */}
                    <label className="flex items-center gap-2 text-xs font-medium cursor-pointer">
                      <input
                        type="radio"
                        name="upiOption"
                        checked={upiOption === "custom"}
                        onChange={() => setUpiOption("custom")}
                      />
                      <span>Your UPI ID</span>
                    </label>

                    {upiOption === "custom" && (
                      <div className="flex gap-2 mt-1 max-w-sm">
                        <input
                          type="text"
                          placeholder="e.g. mobileNumber@upi"
                          value={upiId}
                          onChange={(e) => setUpiId(e.target.value)}
                          className="border border-gray-300 rounded px-3 py-1.5 text-xs flex-1 outline-none focus:border-blue-600"
                        />
                        <button type="button" className="bg-blue-600 text-white text-xs font-bold px-3 py-1.5 rounded hover:bg-blue-700 cursor-pointer">
                          Verify
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Option 2: Credit / Debit Card */}
              <div className={`border rounded-lg p-4 transition ${paymentMethod === "card" ? "border-blue-600 bg-blue-50/30" : "border-gray-200"}`}>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={paymentMethod === "card"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="accent-blue-600 cursor-pointer"
                  />
                  <CreditCard className="text-gray-700" size={20} />
                  <div>
                    <span className="font-bold text-sm text-gray-900 block">Credit / Debit Card</span>
                    <span className="text-xs text-gray-500">Visa, Mastercard, RuPay, Maestro</span>
                  </div>
                </label>

                {paymentMethod === "card" && (
                  <div className="mt-4 pl-8 flex flex-col gap-3 border-t pt-3 max-w-md">
                    <input
                      type="text"
                      placeholder="Card Number (16 digits)"
                      maxLength={19}
                      className="border border-gray-300 rounded px-3 py-2 text-xs outline-none focus:border-blue-600"
                    />
                    <div className="flex gap-3">
                      <input
                        type="text"
                        placeholder="MM / YY"
                        maxLength={5}
                        className="border border-gray-300 rounded px-3 py-2 text-xs w-1/2 outline-none focus:border-blue-600"
                      />
                      <input
                        type="password"
                        placeholder="CVV"
                        maxLength={4}
                        className="border border-gray-300 rounded px-3 py-2 text-xs w-1/2 outline-none focus:border-blue-600"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Option 3: Cash on Delivery */}
              <div className={`border rounded-lg p-4 transition ${paymentMethod === "cod" ? "border-blue-600 bg-blue-50/30" : "border-gray-200"}`}>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={paymentMethod === "cod"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="accent-blue-600 cursor-pointer"
                  />
                  <Banknote className="text-emerald-600" size={20} />
                  <div>
                    <span className="font-bold text-sm text-gray-900 block">Cash on Delivery (COD)</span>
                    <span className="text-xs text-gray-500">Pay cash/UPI at your doorstep upon delivery</span>
                  </div>
                </label>
              </div>

            </div>
          </div>

        </div>


        {/* RIGHT COLUMN - Order Summary Sidebar & Pay Button */}
        <div className="w-full lg:w-1/3 flex flex-col gap-4">
          
          {/* Order Products Preview */}
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 flex flex-col gap-3 text-left">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider border-b pb-2">
              Items Summary ({itemsToCheckout.length})
            </h3>
            {itemsToCheckout.map((item, idx) => (
              <div key={idx} className="flex gap-3 items-center">
                <img 
                  src={item?.images?.frontView || item?.image} 
                  alt={item?.name} 
                  className="w-14 h-14 object-contain border rounded p-1 flex-shrink-0"
                />
                <div>
                  <h4 className="text-xs font-bold text-gray-900 line-clamp-1">{item?.name}</h4>
                  <p className="text-xs text-gray-500 mt-0.5 font-medium capitalize">{item?.category}</p>
                  <p className="text-sm font-bold text-gray-900 mt-0.5">₹{item?.price}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Price Details Panel */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden text-left">
            <h3 className="text-gray-500 font-bold uppercase text-xs px-4 py-3 border-b border-gray-100 tracking-wider">
              Price Details
            </h3>

            <div className="p-4 flex flex-col gap-3 text-sm">
              <div className="flex justify-between text-gray-700">
                <span>Price ({itemsToCheckout.length} item{itemsToCheckout.length > 1 ? 's' : ''})</span>
                <span>₹{totalOriginalPrice.toLocaleString('en-IN')}</span>
              </div>

              <div className="flex justify-between text-gray-700">
                <span>Discount</span>
                <span className="text-emerald-600 font-semibold">- ₹{totalSavings.toLocaleString('en-IN')}</span>
              </div>

              <div className="flex justify-between text-gray-700">
                <span>Delivery Charges</span>
                <span className="text-emerald-600 font-semibold">FREE</span>
              </div>

              <div className="flex justify-between text-gray-700">
                <span>Platform Fee</span>
                <span>₹{platformFee}</span>
              </div>

              <div className="border-t border-dashed border-gray-200 my-1"></div>

              <div className="flex justify-between text-base font-bold text-gray-900">
                <span>Total Amount</span>
                <span>₹{totalPayable.toLocaleString('en-IN')}</span>
              </div>

              <div className="bg-emerald-50 text-emerald-700 font-semibold p-2.5 rounded text-xs border border-emerald-100 mt-1">
                You will save ₹{totalSavings.toLocaleString('en-IN')} on this order!
              </div>
            </div>
          </div>

          {/* Final Place Order Button */}
          <button
            onClick={handlePlaceOrder}
            className="w-full bg-[#FB641B] hover:bg-orange-600 text-white font-bold py-3.5 px-6 rounded-md shadow-md transition cursor-pointer text-base uppercase tracking-wide flex items-center justify-center gap-2"
          >
            Pay & Confirm Order (₹{totalPayable.toLocaleString('en-IN')})
          </button>

          {/* Security Banner */}
          <div className="flex items-center gap-2 text-xs text-gray-500 font-medium justify-center pt-1">
            <ShieldCheck size={20} className="text-emerald-600" />
            <span>Safe and Secure Payments. 100% Authentic Products.</span>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Payments;
