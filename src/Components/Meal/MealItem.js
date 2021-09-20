import React, { useContext } from "react";
import styles from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";
import CartContext from "../../Context/Cart-Context";

const MealItem = (props) => {
  const carttxt = useContext(CartContext);
  const price = ` $${props.price.toFixed(2)}`;

  const Amount = (amount) => {
    carttxt.addItem({
      id: props.id,
      name: props.name,
      amount: amount,
      price: props.price,
    });
  };

  return (
    <li className={styles.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={styles.description}>{props.description}</div>
        <div className={styles.price}>{price}</div>
      </div>
      <div>
        <MealItemForm amount={Amount} />
      </div>
    </li>
  );
};

export default MealItem;
