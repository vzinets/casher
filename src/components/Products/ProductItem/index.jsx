"use client";
import React, { useCallback, useEffect, useState } from "react";
import css from "./style.module.css";
import { MdDeleteOutline } from "react-icons/md";
import { useProduct } from "@/components/Context";
import { MdEdit } from "react-icons/md";
import AddProduct from "../AddProduct";
import classNames from "classnames";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { URL } from "@/helpers/constants";
import { BsQuestionCircle } from "react-icons/bs";

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

  const onConfirm = async (t) => {
    toast.dismiss(t.id);
    const response = await handleDelete(id);
    
    if (response.status >= 200 && response.status < 300) {
      fetchProducts();
      toast.success("Deleted successfully!");
    }
  };

  const onDelete = () => {
    toast(
      (t) => (
        <div className={css.toaster}>
          <h5 className={css.toaster__text}>Are you sure you want to delete "{name}"?</h5>
          <div className={css.toaster__button__wrapper}><button className={classNames("blue__button", css.toaster__button)} onClick={() => onConfirm(t)}>
            Confirm
          </button>
          <button className={classNames("red__button", css.toaster__button)} onClick={() => toast.dismiss(t.id)}>
            Cancel
          </button></div>
        </div>
      ),
      {
        icon: <BsQuestionCircle size={20} />,
        duration: 10000,
      }
    );
  };

  return (
    <>
      <tr className={css.row}>
        <td className={css.row__item}>{name}</td>
        <td className={css.row__item}>{purchase_price}</td>
        <td className={css.row__item}>{sale_price}</td>
        <td className={css.row__item}>{profit}</td>
        <td className={css.row__item}>
          <button
            className={classNames("red__button", css.delete__button)}
            onClick={onDelete}
          >
            Delete
            <MdDeleteOutline size={30} />
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
