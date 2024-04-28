import React, { useCallback, useEffect } from "react";
import ProductTable from "../Visits/ProductTable";

import css from "./style.module.css";
import { VISIT_URL } from "@/helpers/constants";
import { useProduct } from "@/components/Context";
import classNames from "classnames";
import { FaXmark } from "react-icons/fa6";
import toast, { Toaster } from "react-hot-toast";
import PopUp from "../ui/PopUp";

const DetailPopup = ({ data, setData, showPopup, setShowPopup, id }) => {
  const { fetchProducts, products } = useProduct();

  const handleVisit = (product) => {
    try {
      const doubleProduct = data.products?.find((item) => item.id === product.id);

    if (doubleProduct) {
      setData((prevData) => {
        const updateProducts = prevData.products.map((item) =>
          item.id === product.id ? { ...item, count: item.count + 1 } : item
        );
        const newProducts = { ...prevData, products: [...updateProducts] };
        return newProducts;
      });
    } else {
      setData((prevData) => {
        const newData = {
          ...prevData,
          products: [...prevData.products, { ...product, count: 1 }],
        };

        return newData;
      });
    }

    setShowPopup(false);
    toast.success("Successfully edited!")
    } catch (error) {
      toast.error("Edit failed!")
    }
  };

  const handleShow = () => {
    setShowPopup(false);
  };

  return (
    <>
    <PopUp isOpen={showPopup} setIsOpen={setShowPopup}>
      <div className={css.popup__bg}>
        <div className={css.popup}>
          <button
            onClick={handleShow}
            className={classNames("red__button", css.button__close)}
          >
            <FaXmark size={30} />
          </button>
          <ProductTable handleVisit={handleVisit} />
        </div>
      </div>
    </PopUp>
    <Toaster position="top-center" reverseOrder={false} />
    </>
  );
};

export default DetailPopup;
