"use client";
import React, { useEffect, useState } from "react";
import CreateVisit from "./CreateVisit";
import axios from "axios";
import css from "./style.module.css";
import FilterDate from "./FilterDate";
import moment from "moment";
import { registerLocale } from "react-datepicker";
import { uk } from "date-fns/locale/uk";
import { VISIT_URL } from "@/helpers/constants";
import Link from "next/link";
import "react-datepicker/dist/react-datepicker.css";
import { useProduct } from "../Context";
import toast, { Toaster } from "react-hot-toast";
import { BsQuestionCircle } from "react-icons/bs";
import classNames from "classnames";

registerLocale("uk", uk);

const Visits = () => {
  const [visitData, setVisitData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [dateRange, setDateRange] = useState([null, null]);

  const { fetchProducts } = useProduct();

  const getVisits = async () => {
    try {
      const response = await axios.get(VISIT_URL);
      setVisitData(response.data);
      setFilteredData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const onConfirm = async (t, id) => {
    toast.dismiss(t.id);
    try {
      const response = await axios.delete(`${VISIT_URL}/${id}`);
      if (response) {
        getVisits();
        toast.success("Deleted successfully!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Delete failed!");
    }
  };

  const handleDelete = (id, name) => {
    toast(
      (t) => (
        <div className={css.toaster}>
          <h5 className={css.toaster__text}>
            Are you sure you want to delete "{name}"?
          </h5>
          <div className={css.toaster__button__wrapper}>
            <button
              className={classNames("blue__button", css.toaster__button)}
              onClick={() => onConfirm(t, id)}
            >
              Confirm
            </button>
            <button
              className={classNames("red__button", css.toaster__button)}
              onClick={() => toast.dismiss(t.id)}
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      {
        icon: <BsQuestionCircle size={20} />,
        duration: 10000,
      }
    );
  };

  useEffect(() => {
    getVisits();
  }, []);

  const finalPurchasePrice = filteredData?.reduce((prevValue, item) => {
    return prevValue + item.total_purachse_price;
  }, 0);

  const finalsalePrice = filteredData?.reduce((prevValue, item) => {
    return prevValue + item.total_sale_price;
  }, 0);

  const finalProfit = filteredData?.reduce((prevValue, item) => {
    return prevValue - item.total_purachse_price + item.total_sale_price;
  }, 0);

  return (
    <section className={css.visit__section}>
      <div className="container">
        <CreateVisit getVisits={getVisits} />

        <FilterDate visitData={visitData} setFilteredData={setFilteredData} />

        <ul className={css.visit__list}>
          <li className={css.column_title_wrapper}>
            <p className={css.column__title}>Date</p>
            <p className={css.column__title}>Name</p>
            <p className={css.column__title}>
              Purchase price: {finalPurchasePrice}
            </p>
            <p className={css.column__title}>Sale price: {finalsalePrice}</p>
            <p className={css.column__title}>Profit: {finalProfit}</p>
            <p className={css.column__title}>Actions</p>
          </li>

          {filteredData?.map((item) => (
            <li className={css.visit} key={item.id}>
              <span className={css.visit__item}>
                {moment(item.timestamp).format("DD-MM-YY")}
              </span>
              <ol className={css.visit__item}>
                {item.products.map((i, index) => (
                  <li className={css.visit__product__name} key={i.id}>
                    {index + 1}. {i.name[0].toUpperCase() + i.name.slice(1)}
                  </li>
                ))}
              </ol>
              <div className={css.visit__item}>{item.total_purachse_price}</div>
              <div className={css.visit__item}>{item.total_sale_price}</div>
              <div className={css.visit__item}>
                {item.total_sale_price - item.total_purachse_price}
              </div>

              <div className={css.delete__button__wrapper}>
                <button
                  onClick={() => handleDelete(item.id, item.name)}
                  className={"red__button"}
                >
                  Delete
                </button>
                <Link href={`/visit/${item.id}`} className="blue__button">
                  Details
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </section>
  );
};

export default Visits;
