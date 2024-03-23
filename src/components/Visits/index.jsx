"use client";
import React, { useEffect, useState } from "react";
import CreateVisit from "./CreateVisit";
import { visitURL } from "@/helpers/constants";
import axios from "axios";
import { formatDateString } from "@/helpers";
import css from "./style.module.css";
import FilterDate from "./FilterDate";
import moment from "moment";

const Visits = () => {
  const [visitData, setVisitData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const getVisits = async () => {
    try {
      const response = await axios.get(visitURL);
      setVisitData(response.data);
      setFilteredData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getVisits();
  }, []);

  const finalPurchasePrice = filteredData.reduce((prevValue, item) => {
    return prevValue + item.total_purachse_price;
  }, 0);

  const finalSalePrice = filteredData.reduce((prevValue, item) => {
    return prevValue + item.total_sale_price;
  }, 0);
  const finalProfit = filteredData.reduce((prevValue, item) => {
    return prevValue + item.total_sale_price - item.total_purachse_price;
  }, 0);

  return (
    <div className="container">
      <CreateVisit getVisits={getVisits} />

      <FilterDate visitData={visitData} setFilteredData={setFilteredData} />

      <div className={css.colums__name__wraper}>
        <p className={css.visit__date}>Date</p>
        <p className={css.visit__products}>Name</p>
        <p className={css.visit__purchase}>
          Total purchase price :{finalPurchasePrice}{" "}
        </p>
        <p className={css.visit__sale}>Total sale price: {finalSalePrice}</p>
        <p className={css.visit__profit}>Profit : {finalProfit}</p>
      </div>
      <ul className={css.visit__list}>
        {visitData?.map((item) => (
          <li className={css.visit} key={item.id}>
            <span className={css.visit__date}>
              {moment(item.timestamp).format("YYYY-MM-DD")}
            </span>
            <ol className={css.visit__products}>
              {item.products.map((i) => (
                <li className={css.visit__product__name} key={i.id}>
                  {i.name},{" "}
                </li>
              ))}
            </ol>
            <div className={css.visit__purchase}>
              {item.total_purachse_price}
            </div>
            <div className={css.visit__sale}>{item.total_sale_price}</div>
            <div className={css.visit__profit}>
              {item.total_sale_price - item.total_purachse_price}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Visits;
