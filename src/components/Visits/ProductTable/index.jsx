import React, { useEffect } from "react";
import css from "./style.module.css";
import { useProduct } from "@/components/Context";
import { IoIosAdd } from "react-icons/io";
import classNames from "classnames";

const ProductTable = ({ handleVisit }) => {
  const { products, fetchProducts, error } = useProduct();

  useEffect(() => {
    if (!products.length) {
        fetchProducts();
    }
  }, []);

  return (
    <table className={css.visits__table}>
      <thead>
        <tr>
          <th className={css.table__title}>Name</th>
          <th className={css.table__title}>Sale price</th>
          <th className={css.table__title}>Add</th>
        </tr>
      </thead>
      <tbody>
        {products?.map((product) => (
          <tr key={product.id} className={css.row}>
            <td className={css.row__item}>{product.name}</td>
            <td className={css.row__item}>{product.sale_price}</td>
            <td className={css.button__column}>
              <button
                className={classNames(css.button__add, "blue__button")}
                onClick={() => handleVisit(product)}
              >
                <IoIosAdd size={30} />
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
