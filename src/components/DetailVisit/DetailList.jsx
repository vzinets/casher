import React from "react";

import css from "./style.module.css";
import { FaMinus } from "react-icons/fa6";
import classNames from "classnames";
import { IoMdAdd } from "react-icons/io";
import { MdDeleteOutline } from "react-icons/md";

const DetailList = ({ data, decrement, increment, handleDelete }) => {



  return (
    <ul className={css.product__list}>
      <li className={css.product__item}>
        <span className={css.item__title}>Name</span>
        <span className={css.item__title}>Count</span>
        <span className={css.item__title}>Purchase price</span>
        <span className={css.item__title}>Sale price</span>
        <span className={css.item__title}>Profit</span>
        <span className={css.item__title}>Delete</span>

      </li>
      {data.products?.map((item) => (
        <li className={css.product__item} key={item.id}>
          <span className={css.item__prop}>{item.name}</span>
          <span className={css.item__prop}>
            <div className={css.count__wrapper}>
              <button
                className={classNames(css.button__decrement, "red__button")}
                disabled={item.count <= 1}
                onClick={() => decrement(item.id)}
              >
                <FaMinus size={20} />
              </button>
              <p className={css.count__text}>{item.count}</p>
              <button
                className={classNames(css.button__increment, "blue__button")}
                disabled={item.count >= 20}
                onClick={() => increment(item.id)}
              >
                <IoMdAdd size={20} />
              </button>
            </div>
          </span>
          <span className={css.item__prop}>{item.purchase_price}</span>
          <span className={css.item__prop}>{item.sale_price}</span>
          <span className={css.item__prop}>
            {item.sale_price - item.purchase_price}
          </span>
          <button onClick={ () => handleDelete(item.id)} className={classNames("red__button", css.delete__button) }> <MdDeleteOutline size={30} /></button>
        </li>
      ))}
    </ul>
  );
};

export default DetailList;
