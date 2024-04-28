import React, { useCallback, useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import css from "./style.module.css";
import { FaXmark } from "react-icons/fa6";
import { useProduct } from "@/components/Context";
import { MdEdit } from "react-icons/md";
import classNames from "classnames";
import axios from "axios";
import { URL } from "@/helpers/constants";
import PopUp from "@/components/ui/PopUp";
import toast, { Toaster } from "react-hot-toast";

const AddProduct = ({ edit, product }) => {
  const { fetchProducts } = useProduct();

  const defaultData = edit
    ? {
        id: product.id,
        name: product.name,
        purchase_price: product.purchase_price,
        sale_price: product.sale_price,
      }
    : {
        id: uuidv4(),
        name: "",
        purchase_price: "",
        sale_price: "",
      };

  const handleEdit = useCallback(
    (id, formData) => {
      try {
        const response = axios.put(`${URL}/${id}`, formData, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        fetchProducts();

        return response;
      } catch (error) {
        console.error(error);
      }
    },
    [fetchProducts]
  );

  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState(defaultData);

  const isDisabled =
    !formData.name || formData.purchase_price - formData.sale_price >= 0;

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    const newValue = type === "number" && value.length > 0 ? +value : value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };
  const handleShow = () => {
    setShow(!show);
  };

  const handleSubmit = useCallback(async (formData) => {
    try {
      const response = await axios.post(URL, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response;
    } catch (error) {
      console.error(error);
    }
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();

    if (edit) {
      try {
        const success = await handleEdit(defaultData.id, formData);
        if (success) {
          setFormData((prevData) => ({
            id: prevData.id,
            name: prevData.name,
            purchase_price: prevData.purchase_price,
            sale_price: prevData.sale_price,
          }));
          handleShow();
          toast.success("successfully edited!");
        }
      } catch (error) {
        handleShow();
        toast.error("edit failed!");
      }
    } else {
      try {
        const success = await handleSubmit(formData);
        if (success) {
          setFormData(() => ({
            id: uuidv4(),
            name: "",
            purchase_price: 0,
            sale_price: 0,
          }));
          fetchProducts();
          handleShow();
          toast.success("successfully added");
        }
      } catch (error) {
        handleShow();
        toast.error("add failed!");
      }
    }
  };

  return (
    <>
      <button
        className={`blue__button ${!edit ? css.add__button : css.edit__button}`}
        onClick={() => handleShow()}
      >
        {edit ? <MdEdit size={30} /> : "Create product"}
      </button>

      <PopUp isOpen={show} setIsOpen={setShow}>
        <div className={css.form__bg} onClick={handleShow}>
          <div
            className={css.form__wrapper}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleShow}
              className={classNames(css.close__button, "red__button")}
            >
              <FaXmark size={30} />
              Close
            </button>
            <form className={css.form} onSubmit={onSubmit}>
              <label>
                <p>name</p>
                <input
                  className={css.form__input}
                  type="text"
                  placeholder="name"
                  name="name"
                  onChange={handleChange}
                  value={formData.name}
                />
              </label>
              <label>
                <p> purchase price</p>

                <input
                  min={0}
                  className={css.form__input}
                  type="number"
                  placeholder="purchase price"
                  name="purchase_price"
                  onChange={handleChange}
                  value={formData.purchase_price}
                />
              </label>
              <label>
                <p> sale price</p>

                <input
                  min={0}
                  className={css.form__input}
                  type="number"
                  placeholder="sale price"
                  name="sale_price"
                  onChange={handleChange}
                  value={formData.sale_price}
                />
              </label>

              <button
                className={classNames(css.confirm__button, "blue__button")}
                disabled={isDisabled}
              >
                {edit ? "Edit" : "Add"}
              </button>
            </form>
          </div>
        </div>
      </PopUp>
    </>
  );
};

export default AddProduct;
