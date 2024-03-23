"use client";
import React, { useEffect, useState } from "react";
import css from "./style.module.css";
import { MdDeleteOutline } from "react-icons/md";
import { useProduct } from "@/components/Context";
import { MdEdit } from "react-icons/md";
import AddProduct from "../AddProduct";

const ProductItem = ({ product }) => {
  const { name, purchase_price, sale_price, date, id } = product;

  const { fetchProducts, handleDelete} = useProduct();

  const [isEdit, setIsEdit] = useState(false);

  const onDelete = async () => {
    const isDelete = confirm("Are you sure?");
    if (isDelete) {
      const response = await handleDelete(id);
      if (response.status >= 200 && response.status < 300) {
        fetchProducts();
      }
    }
  };

  const handleIsEdit = () => {
    setIsEdit(!isEdit);
  };

  const profit = sale_price - purchase_price;
  return (
    <>
        <tr className={css.row}>
          <td className={css.row__item}>{name}</td>
          <td className={css.row__item}>{purchase_price}</td>
          <td className={css.row__item}>{sale_price}</td>
          <td className={css.row__item}>{profit}</td>
          <td className={css.row__item}>
            <button className={css.delete__button} onClick={onDelete}>
              Delete <MdDeleteOutline size={30} />
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
