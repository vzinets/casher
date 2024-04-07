import React, { useState } from "react";
import css from "./style.module.css";
import moment from "moment";
import DatePicker from "react-datepicker";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import { uk } from "date-fns/locale/uk";

import "react-datepicker/dist/react-datepicker.css";

registerLocale("uk", uk);

const FilterDate = ({ visitData, setFilteredData }) => {
  const [dateRange, setDateRange] = useState([null, null]);

  const filtered = () => {
    const filteredData = visitData.filter((item) => {
      if (dateRange[0] && dateRange[1]) {
        return moment(item.timestamp).isBetween(
          dateRange[0],
          dateRange[1],
          null,
          "[]"
        );
      }
      return true;
    });

    setFilteredData(filteredData);

    console.log(filteredData);
  };

  const clearDateInput = () => {
    setDateRange([null, null]);
    filtered();
  };

  return (
    <div className={css.input__wrapper}>
      <DatePicker
        className={css.date}
        selected={dateRange[0]}
        onChange={(date) => setDateRange([date, dateRange[1]])}
        selectsStart
        startDate={dateRange[0]}
        endDate={dateRange[1]}
        dateFormat={"dd-MM-yy"}
        placeholderText="Start date"
        locale={"uk"}
      />

      <DatePicker
        className={css.date}
        selected={dateRange[1]}
        onChange={(date) => setDateRange([dateRange[0], date])}
        selectsEnd
        startDate={dateRange[0]}
        endDate={dateRange[1]}
        dateFormat={"dd-MM-yy"}
        placeholderText="End date"
        locale={"uk"}
      />
       <button className={css.reset__button} onClick={() => filtered()}>
        Apply
      </button>
      <button className={css.reset__button} onClick={() => clearDateInput()}>
        Reset date
      </button>
    </div>
  );
};

export default FilterDate;
