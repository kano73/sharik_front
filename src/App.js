import React from "react";
import { Auth } from './components/Auth';
import { Cart } from './components/Cart';
import { Product } from './components/Product';
import { Profile } from './components/Profile';


function App() {
  return (
      <div className="App">
        <h1>Online Store</h1>
        <Auth/>
        <Profile/>
        <Product/>
        <Cart/>
      </div>
  );
}

export default App;
