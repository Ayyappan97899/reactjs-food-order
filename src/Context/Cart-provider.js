import React, { useReducer } from "react";
import CartContext from "./Cart-Context";

const defaultcontext = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    const updatetotalamount =
      state.totalAmount + action.items.price * action.items.amount;
    const existingItemindex = state.items.findIndex((ele) => {
      return ele.id === action.items.id;
    });

    const existingItem = state.items[existingItemindex];

    let updateItems;
    if (existingItem) {
      const updateItem = {
        ...existingItem,
        amount: existingItem.amount + action.items.amount,
      };
      updateItems = [...state.items];

      updateItems[existingItemindex] = updateItem;
    } else {
      updateItems = state.items.concat(action.items);
    }

    return { items: updateItems, totalAmount: updatetotalamount };
  }

  if (action.type === "REMOVE") {
    const existingItemindex = state.items.findIndex((ele) => {
      return ele.id === action.id;
    });

    const existingItem = state.items[existingItemindex];
    const updatetotalamount = state.totalAmount - existingItem.price;
    let updateItems;
    if (existingItem.amount === 1) {
      updateItems = state.items.filter((ele) => {
        return ele.id !== action.id;
      });
    } else {
      const updateItem = {
        ...existingItem,
        amount: existingItem.amount - 1,
      };
      updateItems = [...state.items];
      updateItems[existingItemindex] = updateItem;
    }
    return { items: updateItems, totalAmount: updatetotalamount };
  }

  if (action.type === "CLEAR") {
    return defaultcontext;
  }
  return defaultcontext;
};

const CartProvider = (props) => {
  const [cartitems, dispatchcart] = useReducer(cartReducer, defaultcontext);

  const additemHandler = (items) => {
    dispatchcart({ type: "ADD", items: items });
  };

  const removeitemHandler = (id) => {
    dispatchcart({ type: "REMOVE", id: id });
  };

  const clearHandler = () => {
    dispatchcart({ type: "CLEAR" });
  };

  const cartcontext = {
    items: cartitems.items,
    totalAmount: cartitems.totalAmount,
    addItem: additemHandler,
    removeItem: removeitemHandler,
    clear: clearHandler,
  };

  return (
    <CartContext.Provider value={cartcontext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
