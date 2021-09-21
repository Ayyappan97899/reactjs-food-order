import React, { useRef, useState } from "react";
import styles from "./Checkout.module.css";

const isEmpty = (value) => {
  return value.trim() === "";
};

const fivechar = (value) => {
  return value.trim().length === 5;
};

const Checkout = (props) => {
  const [inputValid, setinputValid] = useState({
    name: true,
    street: true,
    pincode: true,
    city: true,
  });

  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const pincodeInputRef = useRef();
  const cityInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();

    const nameValue = nameInputRef.current.value;
    const streetValue = streetInputRef.current.value;
    const pincodeValue = pincodeInputRef.current.value;
    const cityValue = cityInputRef.current.value;

    const nameisValid = !isEmpty(nameValue);
    const streetisValid = !isEmpty(streetValue);
    const pincodeisValid = fivechar(pincodeValue);
    const cityisValid = !isEmpty(cityValue);

    setinputValid({
      name: nameisValid,
      street: streetisValid,
      pincode: pincodeisValid,
      city: cityisValid,
    });

    const formisValid =
      nameisValid && streetisValid && pincodeisValid && cityisValid;

    if (!formisValid) {
      return;
    }

    props.ordered({
      name: nameValue,
      street: streetValue,
      pincode: pincodeValue,
      city: cityValue,
    });
  };

  const nameClass = !inputValid.name
    ? `${styles.control} ${styles.invalid}`
    : `${styles.control}`;
  const streetClass = !inputValid.street
    ? `${styles.control} ${styles.invalid}`
    : `${styles.control}`;
  const pincodeClass = !inputValid.pincode
    ? `${styles.control} ${styles.invalid}`
    : `${styles.control}`;
  const cityClass = !inputValid.city
    ? `${styles.control} ${styles.invalid}`
    : `${styles.control}`;

  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <div className={nameClass}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInputRef} />
        {!inputValid.name && <p>Please enter a valid name</p>}
      </div>
      <div className={streetClass}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetInputRef} />
        {!inputValid.street && <p>Please enter a valid street</p>}
      </div>
      <div className={pincodeClass}>
        <label htmlFor="pincode">Pincode</label>
        <input type="text" id="pincode" ref={pincodeInputRef} />
        {!inputValid.pincode && <p>Please enter a valid (5 pincode)</p>}
      </div>
      <div className={cityClass}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef} />
        {!inputValid.city && <p>Please enter a valid city</p>}
      </div>

      <div className={styles.actions}>
        <button type="button" onClick={props.onclose}>
          Cancel
        </button>
        <button type="submit" className={styles.submit}>
          Confirm
        </button>
      </div>
    </form>
  );
};

export default Checkout;
