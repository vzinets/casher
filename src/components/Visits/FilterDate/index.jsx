import React, { useState } from "react";
import css from "./style.module.css";
import moment from "moment";
import DatePicker from "react-datepicker";

const FilterDate = ({ visitData, setFilteredData }) => {
  const [startDate, setStartDate] = useState(moment().format("YYYY-MM-DD"));
  const [endDate, setEndDate] = useState(moment().format("YYYY-MM-DD"));

  const handleStartDate = (e) => {
    setStartDate(e.target.value);
    filterDate();
  };

  const handleEndDate = (e) => {
    setEndDate(e.target.value);
    filterDate();
  };

  const filterDate = () => {
    const startTimestamp = moment(startDate).startOf("day").valueOf();
    const endTimestamp = moment(endDate).startOf("day").valueOf();

    console.log("visitData", visitData);
    const filteredData = visitData.filter(
      (item) =>
        item.timestamp >= startTimestamp && item.timestamp <= endTimestamp
    );

    console.log("filteredData", filteredData);
    setFilteredData(filteredData);
  };

  return (
    <>
      {/* <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} className={css.datePicker} /> */}
      <div className={css.input__wrapper}>
        <label>
          <input
            type="date"
            className={css.start__date}
            value={startDate}
            onChange={(e) => handleStartDate(e)}
          />
        </label>
        <label>
          <input
            type="date"
            className={css.end__date}
            value={endDate}
            onChange={(e) => handleEndDate(e)}
          />
        </label>
      </div>
    </>
  );
};

export default FilterDate;
