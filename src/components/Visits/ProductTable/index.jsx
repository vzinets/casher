import React from "react";
import css from "./style.module.css";
import { useProduct } from "@/components/Context";
import { IoIosAddCircle } from "react-icons/io";

const ProductTable = ({ handleVisit }) => {
  const { products, error } = useProduct();

  return (
    <table className={css.visits__table}>
      <thead>
        <tr>
          <th className={css.table__title}>Name</th>
          <th className={css.table__title}>Sale price</th>
        </tr>
      </thead>
      <tbody>
        {products?.map((product) => (
          <tr key={product.id} className={css.row}>
            <td className={css.row__item}>{product.name}</td>
            <td className={css.row__item}>{product.sale_price}</td>
            <td className={css.button__column}>
              <button
                className={css.button__action}
                onClick={() => handleVisit(product)}
              >
                <IoIosAddCircle size={30} />
                "Add"
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductTable;
