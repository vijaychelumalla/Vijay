import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DiningImg from '../Image/Dining.avif';
import DeliveryImg from "../Image/Delivery.avif";
import vegImg from '../Image/veggg.jpg';
import Idli from '../Image/Idli.jpg';
import Cafe from '../Image/Cafe.jpg';
import Chicken from '../Image/Chicken.jpg';
import Burger from '../Image/zomato3.avif';
import Momos from '../Image/zomata.avif';
import Pizza from '../Image/zomato2.avif';
import Discount from '../Image/Discount.avif';

const mockRestaurants = [
  { id: 1, name: "The Grand Thali", location: "Vesu, Surat", rating: "4.8", dining: true, delivery: false, outdoor: false, openNow: true, img: vegImg, tags: ["Gujarati", "North Indian"] },
  { id: 2, name: "Cafe Mocha", location: "Piplod, Surat", rating: "4.5", dining: true, delivery: true, outdoor: true, openNow: true, img: Cafe, tags: ["Cafe", "Desserts", "Beverages"] },
  { id: 3, name: "Burger King", location: "Adajan, Surat", rating: "4.1", dining: true, delivery: true, outdoor: false, openNow: false, img: Burger, tags: ["Fast Food", "Burgers"] },
  { id: 4, name: "Tandoori Nights", location: "Varachha, Surat", rating: "4.6", dining: true, delivery: true, outdoor: true, openNow: true, img: Chicken, tags: ["North Indian", "Mughlai"] },
  { id: 5, name: "Pizza Hut", location: "City Light, Surat", rating: "4.2", dining: false, delivery: true, outdoor: false, openNow: true, img: Pizza, tags: ["Pizza", "Fast Food"] },
  { id: 6, name: "Dim Sum Momos", location: "Dumas Road, Surat", rating: "4.4", dining: true, delivery: true, outdoor: true, openNow: false, img: Momos, tags: ["Chinese", "Asian"] },
];

const Home = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState('dining'); // 'dining' or 'delivery'
  const [activeFilters, setActiveFilters] = useState([]);

  const toggleFilter = (filterName) => {
    setActiveFilters(prev => 
      prev.includes(filterName) 
        ? prev.filter(f => f !== filterName) 
        : [...prev, filterName]
    );
  };

  // Filter Logic
  const filteredRestaurants = mockRestaurants.filter(rest => {
    // 1. Filter by Mode
    if (mode === 'dining' && !rest.dining) return false;
    if (mode === 'delivery' && !rest.delivery) return false;

    // 2. Filter by Active Filters
    if (activeFilters.includes('Outdoor seating') && !rest.outdoor) return false;
    if (activeFilters.includes('Open Now') && !rest.openNow) return false;
    if (activeFilters.includes('Rating: 4.5+') && parseFloat(rest.rating) < 4.5) return false;

    return true;
  });

  return (
    <div className="bg-[#fafafa] min-h-screen">
      
      {/* Search / Filter Section */}
      <div className="bg-white border-b border-gray-100 sticky top-[80px] z-40 shadow-sm">
        <div className="max-w-[1200px] mx-auto py-4 px-6 flex items-center justify-between">
          <div className="flex space-x-8">
            <button 
              onClick={() => setMode('dining')}
              className={`flex items-center space-x-3 group relative pb-4 -mb-4 transition ${mode === 'dining' ? '' : 'grayscale opacity-60 hover:grayscale-0 hover:opacity-100'}`}
            >
              <div className={`p-2 rounded-full transition ${mode === 'dining' ? 'bg-primary-50' : 'bg-gray-50'}`}>
                <img className="w-8 h-8 object-contain" src={DiningImg} alt="Dining Out" />
              </div>
              <span className={`text-xl font-bold transition ${mode === 'dining' ? 'text-primary-600' : 'text-gray-500'}`}>Dining Out</span>
              <div className={`absolute bottom-0 left-0 w-full h-[3px] bg-primary-600 transition-transform origin-left rounded-t-full ${mode === 'dining' ? 'scale-x-100' : 'scale-x-0'}`}></div>
            </button>

            <button 
              onClick={() => setMode('delivery')}
              className={`flex items-center space-x-3 group relative pb-4 -mb-4 transition ${mode === 'delivery' ? '' : 'grayscale opacity-60 hover:grayscale-0 hover:opacity-100'}`}
            >
              <div className={`p-2 rounded-full transition ${mode === 'delivery' ? 'bg-primary-50' : 'bg-gray-50'}`}>
                <img className="w-8 h-8 object-contain" src={DeliveryImg} alt="Delivery" />
              </div>
              <span className={`text-xl font-bold transition ${mode === 'delivery' ? 'text-primary-600' : 'text-gray-500'}`}>Delivery</span>
              <div className={`absolute bottom-0 left-0 w-full h-[3px] bg-primary-600 transition-transform origin-left rounded-t-full ${mode === 'delivery' ? 'scale-x-100' : 'scale-x-0'}`}></div>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-[1200px] mx-auto px-6 py-12 animate-fade-in-up">
        
        {/* Conditional Rendering logic based on Mode */}
        {mode === 'delivery' && (
          <>
            <div className="mb-10 flex items-center justify-between">
              <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Craving something specific?</h1>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-16">
               {[ { title: "Burger", img: Burger, cat: "burger" }, { title: "Momos", img: Momos, cat: "momes" }, { title: "Pizza", img: Pizza, cat: "pizza" }, { title: "Gujarati Thali", img: vegImg, cat: "thali" }, {title: "Coffee", img: Cafe, cat: "coffee"}, {title: "Chicken", img: Chicken, cat: "chicken"} ].map((item, i) => (
                <div key={i} onClick={() => navigate(`/our_menu?category=${item.cat}`)} className="flex flex-col items-center cursor-pointer group">
                  <div className="w-32 h-32 rounded-full overflow-hidden shadow-sm border border-gray-100 mb-3 relative">
                    <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" src={item.img} alt={item.title} />
                  </div>
                  <h1 className="text-lg font-bold text-gray-800">{item.title}</h1>
                </div>
              ))}
            </div>
          </>
        )}

        {mode === 'dining' && (
          <>
            {/* Collections Header */}
            <div className="mb-10">
              <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Collections</h1>
              <p className="text-gray-500 mt-2 text-lg max-w-2xl">
                Explore curated lists of top restaurants, cafes, pubs, and bars in Surat, based on trends.
              </p>
            </div>
            
            {/* Collections Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {[
                { title: "Gujarati Thali", img: vegImg, cat: "thali" },
                { title: "Tiffin", img: Idli, cat: "thali" },
                { title: "Coffee", img: Cafe, cat: "coffee" },
                { title: "Chicken", img: Chicken, cat: "chicken" }
              ].map((item, i) => (
                <div key={i} onClick={() => navigate(`/our_menu?category=${item.cat}`)} className="relative h-[320px] rounded-2xl overflow-hidden shadow-md group cursor-pointer">
                  <img className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src={item.img} alt={item.title} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  <h1 className="absolute bottom-0 w-full p-5 text-xl font-bold text-white translate-y-2 group-hover:translate-y-0 transition-transform">
                    {item.title}  <br/><span className="text-sm font-normal text-gray-300">Explore &#8594;</span>
                  </h1>
                </div>
              ))}
            </div>
          </>
        )}

        <hr className='border-gray-200 mb-8'/>

        {/* Restaurants Feed Section */}
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
             {mode === 'dining' ? "Best Dining Restaurants in Surat" : "Delivery Restaurants in Surat"}
          </h1>
        </div>

        {/* Filters */}
        <div className='flex flex-wrap gap-4 mb-10'>
          {['Rating: 4.5+', 'Outdoor seating', 'Open Now'].map((filter, i) => {
            const isActive = activeFilters.includes(filter);
            return (
              <button 
                key={i} 
                onClick={() => toggleFilter(filter)}
                className={`border transition-all px-5 py-2.5 rounded-full font-medium shadow-sm ${isActive ? 'bg-primary-50 border-primary-500 text-primary-700' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'}`}
              >
                {filter}
              </button>
            )
          })}
        </div>

        {/* Restaurants Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {filteredRestaurants.length > 0 ? filteredRestaurants.map((rest) => (
            <div key={rest.id} className="bg-white rounded-2xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1 group border border-gray-100 cursor-pointer" onClick={() => navigate('/our_menu')}>
              <div className="h-56 overflow-hidden relative">
                <img src={rest.img} alt={rest.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                {!rest.openNow && <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px] flex items-center justify-center"><span className="bg-gray-800 text-white px-4 py-1.5 rounded-lg font-bold">Closed</span></div>}
                {rest.outdoor && <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm px-2 py-1 flex items-center rounded-md text-xs font-bold text-white gap-1"><span className="w-2 h-2 rounded-full border-2 border-white"></span> Outdoor</div>}
              </div>
              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-gray-800">{rest.name}</h3>
                  <div className="bg-green-700 text-white flex items-center px-2 py-1 rounded-md text-sm font-bold shadow-sm">
                    {rest.rating} <span className="ml-1 text-[10px]">★</span>
                  </div>
                </div>
                <div className="flex justify-between text-gray-500 text-sm mb-4">
                  <p className="line-clamp-1">{rest.tags.join(', ')}</p>
                  <p className="font-medium">₹300 for one</p>
                </div>
                <hr className="border-gray-100 mb-4" />
                <p className="text-gray-400 text-sm flex items-center tracking-wide">
                  <svg className="w-4 h-4 mr-1 text-gray-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="currentColor" d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"/></svg>
                  {rest.location}
                </p>
              </div>
            </div>
          )) : (
            <div className="col-span-full py-16 flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-3xl">
               <h2 className="text-2xl font-bold text-gray-400">No restaurants match your filters</h2>
            </div>
          )}
        </div>

        <div className="mb-20 rounded-3xl overflow-hidden shadow-xl border border-gray-100 group cursor-pointer relative">
          <img className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-[1.02]" src={Discount} alt="Discount" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-600/20 to-transparent pointer-events-none"></div>
        </div>

      </div>

      {/* Footer */}
      <div className='bg-gray-950 text-white pt-16 pb-8 px-6'>
        <div className='max-w-[1200px] mx-auto'>
          <h1 className='text-4xl font-black tracking-tighter text-white mb-10'>Zomato</h1>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-8 mb-12 text-gray-400'>
            <div className="flex flex-col space-y-3 hover:[&>a]:text-white [&>a]:transition-colors">
              <h3 className="text-lg font-bold text-white mb-2">ABOUT ZOMATO</h3>
              <a href="#">Who We Are</a>
              <a href="#">Blog</a>
              <a href="#">Work With Us</a>
            </div>
            <div className="flex flex-col space-y-3 hover:[&>a]:text-white [&>a]:transition-colors">
              <h3 className="text-lg font-bold text-white mb-2">ZOMAVERSE</h3>
              <a href="#">Zomato</a>
              <a href="#">Blinkit</a>
              <a href="#">Feeding India</a>
            </div>
            <div className="flex flex-col space-y-3 hover:[&>a]:text-white [&>a]:transition-colors">
              <h3 className="text-lg font-bold text-white mb-2">FOR RESTAURANTS</h3>
              <a href="#">Partner With Us</a>
              <a href="#">Apps For You</a>
            </div>
            <div className="flex flex-col space-y-3 hover:[&>a]:text-white [&>a]:transition-colors">
              <h3 className="text-lg font-bold text-white mb-2">LEARN MORE</h3>
              <a href="#">Privacy</a>
              <a href="#">Security</a>
              <a href="#">Terms</a>
            </div>
          </div>
          <div className='pt-8 border-t border-gray-800 text-sm text-gray-500'>
            <p className="mb-2">By continuing past this page, you agree to our Terms of Service, Cookie Policy, Privacy Policy and Content Policies.</p>
            <p className="flex justify-between items-center sm:flex-row flex-col gap-2">
              <span>2008-2025 © Zomato™ Ltd. All rights reserved.</span>
              <span className="text-gray-400 font-medium">Website created by Mr. Vijay</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home;