import React, { useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import css from "./style.module.css";
import { IoAddCircleOutline } from "react-icons/io5";
import { IoMdCheckmark } from "react-icons/io";
import { FaXmark } from "react-icons/fa6";
import { useProduct } from "@/components/Context";
import { MdEdit } from "react-icons/md";


const AddProduct = ({ edit, product }) => {
  const { handleSubmit, fetchProducts , handleEdit} = useProduct();

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
        purchase_price: 0,
        sale_price: 0,
      };


  const [formData, setFormData] = useState(defaultData);
  console.log(formData);



  const [show, setShow] = useState(false);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
      const newValue = type === 'number'? +value : value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (edit) {
      const success = await handleEdit(defaultData.id, formData);
      if (success) {
        console.log("Successfull post on MockAPI");
        setFormData((prevData) => ({
          id: prevData.id,
          name: prevData.name,
          purchase_price: prevData.purchase_price,
          sale_price: prevData.sale_price,
        }));
      }
    } else {
      const success = await handleSubmit(formData);
      if (success) {
        console.log("Successfull post on MockAPI");
        setFormData(() => ({
          id: uuidv4(),
          name: "",
          purchase_price: 0,
          sale_price: 0,
        }));
      }
    }

    fetchProducts();
    handleShow()
  };

  const handleShow = () => {
    setShow(!show);
    // setFormData(() => ({
    //   id: uuidv4(),
    //   name: "",
    //   purchase_price: 0,
    //   sale_price: 0,
    // }));
  };

  const isDisabled =
    !formData.name || formData.purchase_price - formData.sale_price >= 0;

  return (
    <>
      <button className={css.add__button} onClick={() => handleShow()}>
        {edit ? <MdEdit size={30} /> : <IoAddCircleOutline size={30} />}
      </button>
      {!show ? (
        ""
      ) : (
        <div className={css.form__bg} onClick={handleShow}>
          <div
            className={css.form__wrapper}
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={handleShow} className={css.close__button}>
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

              <button className={css.confirm__button} disabled={isDisabled}>
                <IoMdCheckmark size={30} />
                Add
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AddProduct;
