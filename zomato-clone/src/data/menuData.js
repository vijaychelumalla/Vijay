import vegImg from '../Image/veggg.jpg';
import Idli from '../Image/Idli.jpg';
import Cafe from '../Image/Cafe.jpg';
import Chicken from '../Image/Chicken.jpg';
import Burger from '../Image/zomato3.avif';
import Momos from '../Image/zomata.avif';
import Pizza from '../Image/zomato2.avif';
import Pujabi from '../Image/Punjabi thali.jpeg';
import Tandoori from '../Image/Tandoori-Chicken.jpeg';
import curry from '../Image/Chicken-Curry.jpeg';
import Cheese from '../Image/Cheese.jpeg';
import mexican from '../Image/Mexican.jpeg';
import coffee from '../Image/Coffe.jpeg';

import brownie from '../Image/brownie.png';
import wrap from '../Image/wrap.png';
import salad from '../Image/salad.png';

export const categories = [
  { id: "thali", label: "Thalis & Meals" },
  { id: "chicken", label: "Chicken Dishes" },
  { id: "pizza", label: "Pizzas" },
  { id: "burger", label: "Burgers" },
  { id: "coffee", label: "Beverages" },
  { id: "momes", label: "Momos" },
  { id: "wraps", label: "Wraps & Rolls" },
  { id: "salads", label: "Healthy Salads" },
  { id: "desserts", label: "Desserts" },
];

export const menuItems = {
  thali: [
    { name: "Gujarati Thali", img: vegImg, price: 150, desc: "Authentic sweet & savory spread", tag: "Must Try" },
    { name: "Punjabi Thali", img: Pujabi, price: 170, desc: "Rich curries with butter naan, dal makhani and rice" },
  ],
  chicken: [
    { name: "Chicken Tandoori", img: Tandoori, price: 200, desc: "Smoky and charred perfection", spicy: true },
    { name: "Chicken Curry", img: curry, price: 180, desc: "Spicy home-style gravy", spicy: true },
    { name: "Grilled Chicken", img: Chicken, price: 220, desc: "Healthy herb-roasted breast" },
  ],
  pizza: [
    { name: "Margherita Pizza", img: Pizza, price: 250, desc: "Classic mozzarella and basil", tag: "Bestseller" },
    { name: "Cheese Burst", img: Cheese, price: 220, desc: "Stuffed crust goodness" },
  ],
  burger: [
    { name: "Veggie Burger", img: Burger, price: 120, desc: "Crispy patty with fresh greens" },
    { name: "Mexican Burger", img: mexican, price: 150, desc: "Spicy salsa and jalapenos", spicy: true },
  ],
  wraps: [
    { name: "Paneer Tikka Wrap", img: wrap, price: 140, desc: "Grilled paneer in a soft tortilla with mint chutney", spicy: true, tag: "New" },
  ],
  salads: [
    { name: "Greek Feta Salad", img: salad, price: 180, desc: "Fresh cucumbers, olives, cherry tomatoes & feta", tag: "Healthy" },
  ],
  desserts: [
    { name: "Fudge Brownie", img: brownie, price: 160, desc: "Decadent chocolate brownie with a scoop of vanilla ice cream", tag: "Must Try" },
  ],
  coffee: [
    { name: "Cold Coffee", img: Cafe, price: 90, desc: "Thick, creamy, and chilled" },
    { name: "Hot Cappuccino", img: coffee, price: 90, desc: "Rich espresso with steamed milk" },
  ],
  momes: [
    { name: "Steamed Momos", img: Momos, price: 110, desc: "Served with fiery red chutney", spicy: true },
  ]
};

// Flatten to a single array for easier searching
export const allMenuItems = Object.values(menuItems).flat();
