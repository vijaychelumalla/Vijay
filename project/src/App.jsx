import './App.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { CartProvider } from './context/CartContext';
import Home from './Pages/Home';
import Navbar from './Pages/Navbar';
import Our_Menu from './Pages/Our_Menu';
import Login from './Pages/Login';
import SignUp from './Pages/Sign_Up';
import Search from './Pages/Search';
import Admin from './Pages/Admin';

import Checkout from './Pages/Checkout';
import OrderHistory from './Pages/OrderHistory';

const router = createBrowserRouter([
  { path: "/",
    element :
    <div>
      <Navbar />
       <Home />
    </div>
   },
   { path: "/search",
    element :
    <div>
      <Navbar />
       <Search />
    </div>
   },

   { path: "/navbar",
    element : 
     <div>
      <Navbar />
       <Home />
    </div>

   },

   { path: "/our_menu",
    element :
    <div>
      <Navbar />
       <Our_Menu />
    </div>
   },

   { path: "/login",
    element :
    <div>
      <Navbar />
       <Login />
    </div>
   },
    { path: "/Sign_Up",
    element :
    <div>
      <Navbar />
       <SignUp />
    </div>
   },
   { path: "/admin",
    element :
    <div>
      <Navbar />
       <Admin />
    </div>
   },
   { path: "/checkout",
    element :
    <div>
      <Navbar />
       <Checkout />
    </div>
   },
   { path: "/history",
    element :
    <div>
      <Navbar />
       <OrderHistory />
    </div>
   },
]);

function App() {
  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col">
        <RouterProvider router={router} />
      </div>
    </CartProvider>
  )
}

export default App
