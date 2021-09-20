import { useState } from "react";
import Header from "./Components/Layers/Header";
import Meals from "./Components/Meal/Meals";
import Cart from "./Components/Cart/Cart";
import CartProvider from "./Context/Cart-provider";

const App = () => {
  const [modalshow, setmodalshow] = useState(false);
  return (
    <CartProvider>
      {modalshow && <Cart setmodal={setmodalshow} />}
      <Header setmod={setmodalshow} />
      <Meals />
    </CartProvider>
  );
};

export default App;
