import React, { useState, useEffect } from "react";
import styles from "./AvailableMeal.module.css";
import MealItem from "./MealItem";
import Card from "../UI/Card";
import axios from "axios";

const AvailableMeal = () => {
  const [data, setData] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [error, setError] = useState();

  const sendRequest = async () => {
    setisLoading(true);
    const response = await axios.get(
      "https://meals-55c67-default-rtdb.firebaseio.com/Meals.json"
    );

    if (response.ok) {
      throw new Error("SomeThing went wrong!");
    }

    const resdata = await response.data;
    for (let d in resdata) {
      const meal = {
        id: d,
        name: resdata[d].name,
        description: resdata[d].description,
        price: resdata[d].price,
      };

      setData((prev) => {
        return [...prev, meal];
      });
    }
    setisLoading(false);
  };

  useEffect(() => {
    sendRequest().catch((error) => {
      setisLoading(false);
      setError(error.message);
    });
  }, []);

  if (isLoading) {
    return (
      <div>
        <p className={styles.loading}>Loading....</p>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <p className={styles.error}>Failed to Fetch</p>
      </div>
    );
  }

  const Data = data.map((element) => {
    return (
      <MealItem
        key={element.id}
        id={element.id}
        name={element.name}
        description={element.description}
        price={element.price}
      />
    );
  });
  return (
    <div className={styles.meals}>
      {!isLoading && (
        <Card>
          <ul>{Data}</ul>
        </Card>
      )}
    </div>
  );
};

export default AvailableMeal;
