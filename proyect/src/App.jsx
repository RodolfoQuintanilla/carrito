import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import { db } from "./data/db";
import Guitar from "./components/Guitar";

function App() {
  const [data] = useState(db);
  const [cart, setCart] = useState([]);

  const MAX_ITEMS = 5;
  const MIN_ITEMS = 1;

  function addToCart(item) {
    const itemExists = cart.findIndex((guitar) => guitar.id === item.id);

    if (itemExists >= 0) {
      const upDateCart = [...cart];
      upDateCart[itemExists].quantity += 1;
      setCart(upDateCart);
    } else {
      item.quantity = 1;
      setCart([...cart, item]);
    }
  }

  function removeFromCart(id) {
    setCart((prevCart) => prevCart.filter((guitar) => guitar.id !== id));
  }

  function increaseQuantity(id) {
    const upDateCart = cart.map((item) => {
      if (item.id === id && item.quantity < MAX_ITEMS) {
        return {
          ...item,
          quantity: item.quantity + 1,
        };
      }
      return item;
    });
    setCart(upDateCart);
  }

  function decreaseQuantity(id) {
    const upDateCart = cart.map((item) => {
      if (item.id === id && item.quantity > MIN_ITEMS) {
        return {
          ...item,
          quantity: item.quantity - 1,
        };
      }
      return item;
    });
    setCart(upDateCart);
  }

  function clearCart() {
    setCart([]);
  }
  return (
    <>
      <div>
        <Header
          cart={cart}
          removeFromCart={removeFromCart}
          increaseQuantity={increaseQuantity}
          decreaseQuantity={decreaseQuantity}
          clearCart={clearCart}
        />
        <main className="container-xl mt-5">
          <h2 className="text-center">Nuestra Colección</h2>
          <div className="row mt-5">
            {data.map((article) => (
              <Guitar
                key={article.id}
                article={article}
                addToCart={addToCart}
              />
            ))}
          </div>
        </main>
        <footer className="bg-dark mt-5 py-5">
          <div className="container-xl">
            <p className="text-white text-center fs-4 mt-4 m-md-0">
              GuitarLA - Todos los derechos Reservados
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}

export default App;
