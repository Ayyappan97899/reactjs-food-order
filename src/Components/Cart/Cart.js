import React, { useState, useContext } from "react";
import styles from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import CartContext from "../../Context/Cart-Context";
import Checkout from "./Checkout";
import axios from "axios";

const Cart = (props) => {
  const [ordershow, setordershow] = useState(false);
  const [submitting, setsubmitting] = useState(false);
  const [didsubmit, setdidsubmit] = useState(false);
  const context = useContext(CartContext);
  const TotalAmount = `$${context.totalAmount.toFixed(2)}`;
  const itemvalid = context.items.length > 0;
  const closeHandler = () => {
    props.setmodal(false);
  };

  const orderHandler = () => {
    setordershow(true);
  };

  const RemoveHandler = (id) => {
    context.removeItem(id);
  };

  const AddHandler = (item) => {
    context.addItem({ ...item, amount: 1 });
  };

  const ConfirmOrder = async (userdata) => {
    setsubmitting(true);
    await axios.post(
      "https://meals-55c67-default-rtdb.firebaseio.com/orders.json",
      {
        user: userdata,
        order: context.items,
      }
    );
    setsubmitting(false);
    setdidsubmit(true);
    context.clear();
  };

  const cartitems = (
    <ul className={styles["cart-items"]}>
      {context.items.map((item) => {
        return (
          <CartItem
            key={item.id}
            name={item.name}
            price={item.price}
            amount={item.amount}
            onRemove={RemoveHandler.bind(null, item.id)}
            onAdd={AddHandler.bind(null, item)}
          />
        );
      })}
    </ul>
  );

  const orderBtn = (
    <div className={styles.actions}>
      <button className={styles["button--alt"]} onClick={closeHandler}>
        Close
      </button>
      {itemvalid && (
        <button className={styles.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  const cart = (
    <React.Fragment>
      {cartitems}
      <div className={styles.total}>
        <span>Total Amount</span>
        <span>{TotalAmount}</span>
      </div>
      {!ordershow && orderBtn}
      {ordershow && <Checkout onclose={closeHandler} ordered={ConfirmOrder} />}
    </React.Fragment>
  );

  const submittingmsg = <p>Sending order data...</p>;
  const didsubmitmsg = (
    <React.Fragment>
      <p>Sucessfully sent the order!</p>
      <div className={styles.actions}>
        <button className={styles.button} onClick={closeHandler}>
          Close
        </button>
      </div>
    </React.Fragment>
  );
  return (
    <Modal setmod={props.setmodal}>
      {!submitting && !didsubmit && cart}
      {submitting && submittingmsg}
      {!submitting && didsubmit && didsubmitmsg}
    </Modal>
  );
};

export default Cart;
