import React, { useContext, useState, useEffect } from "react";
import styles from "./HeaderButton.module.css";
import CartIcon from "../Cart/CartIcon";
import CartContext from "../../Context/Cart-Context";

const HeaderButton = (props) => {
  const [btnanim, setbtnanim] = useState(false);
  const cart = useContext(CartContext);
  const { items } = cart;

  const Totamount = items.reduce((currentval, item) => {
    return currentval + item.amount;
  }, 0);

  const addCartHandler = () => {
    props.setmodal(true);
  };

  const btnclass = `${styles.button} ${btnanim ? styles.bump : ""}`;

  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setbtnanim(true);
    const timer = setTimeout(() => {
      setbtnanim(false);
    }, 300);
    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  return (
    <button className={btnclass} onClick={addCartHandler}>
      <span className={styles.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={styles.badge}>{Totamount}</span>
    </button>
  );
};

export default HeaderButton;
