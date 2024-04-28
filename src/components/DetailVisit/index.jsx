"use client";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { VISIT_URL } from "@/helpers/constants";
import css from "./style.module.css";
import classNames from "classnames";
import DetailPopup from "@/components/DetailPopup";
import DetailList from "./DetailList";
import toast, { Toaster } from "react-hot-toast";
import DetailComment from "../DetailComment";
import moment from "moment";
import PopUp from "../ui/PopUp";

const DetailVisit = () => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [comment, setComment] = useState("");

  console.log(data);

  const fetchVisit = async () => {
    try {
      const response = await axios.get(`${VISIT_URL}/${id}`);
      if (response) {
        setData(response.data);
        setComment(response.data.comment);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleChange = async (id, formData) => {
    const newData = { ...formData, comment: comment };
    console.log(newData);
    try {
      const response = await axios.put(`${VISIT_URL}/${id}`, newData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      fetchVisit();
      toast.success("Successfully saved!");
      return response;
    } catch (error) {
      toast.error("Save error!");
    }
  };

  useEffect(() => {
    fetchVisit();
  }, []);

  const handleShowPopup = () => {
    setShowPopup(!showPopup);
  };

  const increment = (id) => {
    setData((prevData) => {
      const updateData = prevData.products.map((item) => {
        if (id === item.id && item.count < 20) {
          return { ...item, count: item.count + 1 };
        }
        return item;
      });
      return { ...prevData, products: updateData };
    });
  };

  const handleDelete = (id) => {
    setData((prevData) => {
      const updateData = prevData.products.filter((item) => item.id != id);
      return { ...prevData, products: updateData };
    });
  };

  const decrement = (id) => {
    setData((prevData) => {
      const updateData = prevData.products.map((item) => {
        if (id === item.id && item.count > 1) {
          return { ...item, count: item.count - 1 };
        }
        return item;
      });
      return { ...prevData, products: updateData };
    });
  };

  return (
    <div className="container">
      <button
        className={classNames("blue__button", css.add__button)}
        onClick={handleShowPopup}
      >
        Add product
      </button>

      <DetailPopup
        data={data}
        setData={setData}
        showPopup={showPopup}
        setShowPopup={setShowPopup}
        id={id}
      />

      <div className={css.top__wrapper}>
        <span>Date: {moment(data.timestamp).format("DD-MM-YY")}</span>
        <button
          onClick={() => handleChange(id, data)}
          className={classNames("blue__button", css.save__button)}
        >
          Save changes
        </button>
      </div>
      <DetailList
        data={data}
        increment={increment}
        decrement={decrement}
        handleDelete={handleDelete}
      />

      <DetailComment comment={comment} setComment={setComment} />
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default DetailVisit;
