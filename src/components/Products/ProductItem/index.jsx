"use client";
import React, { useCallback, useEffect, useState } from "react";
import css from "./style.module.css";
import { MdDeleteOutline } from "react-icons/md";
import { useProduct } from "@/components/Context";
import { MdEdit } from "react-icons/md";
import AddProduct from "../AddProduct";
import classNames from "classnames";

const ProductItem = ({ product }) => {
  const { name, purchase_price, sale_price, date, id } = product;
  const profit = sale_price - purchase_price;

  const { fetchProducts } = useProduct();

  

  const handleDelete = useCallback((id) => {
    try {
      const response = axios.delete(`${URL}/${id}`);
      return response;
    } catch (error) {
      console.error(error);
    }
  }, []);

  const onDelete = async () => {
    const isDelete = confirm("Are you sure?");
    if (isDelete) {
      const response = await handleDelete(id);
      if (response.status >= 200 && response.status < 300) {
        fetchProducts();
      }
    }
  };
  return (
    <>
      <tr className={css.row}>
        <td className={css.row__item}>{name}</td>
        <td className={css.row__item}>{purchase_price}</td>
        <td className={css.row__item}>{sale_price}</td>
        <td className={css.row__item}>{profit}</td>
        <td className={css.row__item}>
          <button className={classNames('red__button', css.delete__button)} onClick={onDelete}>
            Delete<MdDeleteOutline size={30} />
          </button>
        </td>
        <td className={css.row__item}>
          <AddProduct edit product={product} />
        </td>
      </tr>
    </>
  );
};

export default ProductItem;
