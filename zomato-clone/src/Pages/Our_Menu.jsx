import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { menuItems as items, categories } from '../data/menuData';

const Menu = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get("category") || "thali";
  const [selected, setSelected] = useState(initialCategory);
  const { cartItems, addToCart, updateQuantity, removeFromCart, totalPrice } = useCart();

  useEffect(() => {
    const categoryQuery = searchParams.get("category");
    if (categoryQuery && categories.some(cat => cat.id === categoryQuery)) {
      setSelected(categoryQuery);
    }
  }, [searchParams]);

  const handleCategoryChange = (id) => {
    setSelected(id);
    setSearchParams({ category: id });
    window.scrollTo({ top: 250, behavior: 'smooth' });
  };

  const navigate = useNavigate();

  const handleCheckout = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login to place your order!");
      navigate("/login", { state: { from: "/our_menu" } });
    } else {
      navigate("/checkout");
    }
  };

  return (
    <div className="bg-[#fafafa] min-h-screen relative animate-fade-in-up pb-24">
      
      {/* Hero Header */}
      <div className="bg-gray-900 h-[300px] relative flex items-center justify-center overflow-hidden">
        <img className="absolute inset-0 w-full h-full object-cover opacity-30 blur-[2px] scale-105" src={items.pizza[0].img} alt="Header Background" />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent"></div>
        <div className="relative z-10 text-center px-6">
          <h1 className="text-5xl md:text-6xl font-black text-white tracking-tight mb-4 drop-shadow-lg">Order Online</h1>
          <p className="text-lg md:text-xl text-gray-200 font-medium max-w-2xl mx-auto drop-shadow-md">
             Fresh, delicious, and delivered hot right to your doorstep.
          </p>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto pt-10 px-6 transition-all duration-300 flex flex-col lg:flex-row gap-8 items-start">
        
        {/* Left Sidebar Categories */}
        <div className="lg:w-[260px] shrink-0 sticky top-[100px] bg-white rounded-2xl shadow-sm border border-gray-100 hidden lg:block overflow-hidden">
           <h3 className="px-6 py-4 border-b border-gray-100 font-bold text-gray-800 text-lg">Menu</h3>
           <div className="flex flex-col py-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={`py-3 px-6 text-left font-medium transition-all duration-300 border-l-4 ${
                  selected === cat.id 
                    ? 'border-primary-600 bg-primary-50/50 text-primary-700 font-bold' 
                    : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                {cat.label}
                <span className="float-right text-gray-400 text-sm font-normal">({items[cat.id]?.length || 0})</span>
              </button>
            ))}
           </div>
        </div>

        {/* Mobile Horizontal scroll Categories */}
        <div className="lg:hidden w-full sticky top-[70px] z-30 bg-[#fafafa]/95 backdrop-blur-md pb-4 pt-4 -mx-6 px-6 overflow-x-auto whitespace-nowrap scrollbar-hide border-b border-gray-200">
          <div className="flex space-x-3">
             {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={`px-5 py-2.5 rounded-full font-medium transition-all shadow-sm border ${
                  selected === cat.id 
                    ? 'bg-primary-600 text-white border-primary-600' 
                    : 'bg-white text-gray-600 border-gray-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Right Content Area */}
        <div className="flex-1 w-full min-h-[500px]">
          <div className="mb-6">
            <h2 className="text-3xl font-extrabold text-gray-900 capitalize tracking-tight mb-2">
               {categories.find(c => c.id === selected)?.label || selected}
            </h2>
            <div className="w-16 h-1.5 bg-primary-500 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {items[selected]?.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1 group flex flex-col border border-gray-100"
              >
                <div className="h-[240px] overflow-hidden relative">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3.5 py-1.5 rounded-full text-sm font-black shadow-sm flex items-center text-gray-900 border border-gray-100">
                    ₹{item.price}
                  </div>
                  
                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {item.tag && (
                      <span className="bg-primary-600 text-white text-[11px] font-bold px-2 py-1 rounded-md tracking-wider uppercase shadow-sm w-max">
                        {item.tag}
                      </span>
                    )}
                    {item.spicy && (
                       <span className="bg-red-600 text-white text-[11px] font-bold px-2 py-1 rounded-md tracking-wider uppercase shadow-sm flex items-center gap-1 w-max">
                         🔥 Spicy
                       </span>
                    )}
                  </div>
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-gray-800 tracking-tight">{item.name}</h3>
                  <p className="text-gray-500 text-sm mt-2 mb-5 line-clamp-2 leading-relaxed">{item.desc}</p>
                  
                  <div className="mt-auto pt-2 border-t border-gray-50">
                    <button
                      onClick={() => addToCart(item)}
                      className="w-full bg-primary-50 text-primary-600 border border-primary-100 hover:bg-primary-600 hover:text-white hover:border-primary-600 font-bold py-3 rounded-xl transition-all duration-300 shadow-sm flex items-center justify-center gap-2 group-hover:shadow-md"
                    >
                      <svg className="w-5 h-5 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Inline Sticky Cart */}
        {cartItems.length > 0 && (
          <div className="w-full lg:w-[350px] shrink-0 sticky top-[100px] bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-100 p-6 flex flex-col max-h-[calc(100vh-140px)] z-40 animate-fade-in-up">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <span className="bg-primary-100 text-primary-600 w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm">{cartItems.length}</span>
            Your Order
          </h2>
          
          <div className="flex-1 overflow-y-auto pr-2 space-y-4 custom-scrollbar">
            {cartItems.map((item, i) => (
              <div key={i} className="flex gap-4 items-center bg-gray-50 p-3 rounded-xl border border-gray-100">
                <img src={item.img} alt={item.name} className="w-16 h-16 rounded-lg object-cover shadow-sm" />
                <div className="flex-1">
                  <h4 className="font-semibold text-sm text-gray-800 line-clamp-1">{item.name}</h4>
                  <p className="text-primary-600 font-bold text-sm">₹{item.price}</p>
                </div>
                <div className="flex flex-col items-center bg-white rounded-lg shadow-sm border border-gray-200">
                  <button onClick={() => updateQuantity(item.name, 1)} className="px-2 text-gray-500 hover:text-black hover:bg-gray-100 rounded-t-lg transition">+</button>
                  <span className="text-xs font-bold py-1">{item.quantity}</span>
                  <button 
                    onClick={() => {
                       if(item.quantity === 1) removeFromCart(item.name);
                       else updateQuantity(item.name, -1);
                    }} 
                    className="px-2 text-gray-500 hover:text-black hover:bg-gray-100 rounded-b-lg transition">-</button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex justify-between text-gray-500 mb-2">
              <span>Subtotal</span>
              <span>₹{totalPrice}</span>
            </div>
            <div className="flex justify-between text-gray-500 mb-4">
              <span>Taxes & Fees</span>
              <span>₹{Math.floor(totalPrice * 0.05)}</span>
            </div>
            <div className="flex justify-between text-xl font-bold text-gray-900 mb-6">
              <span>Total</span>
              <span>₹{totalPrice + Math.floor(totalPrice * 0.05)}</span>
            </div>
            <button onClick={handleCheckout} className="w-full bg-black text-white hover:bg-gray-800 font-bold py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all">
              Proceed to Checkout
            </button>
          </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Menu;