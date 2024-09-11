import React, { useState } from "react";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import "dayjs/locale/en";
import locale from "antd/es/date-picker/locale/en_US";
import { styled } from "@mui/material/styles"; // MUI styled components
// import "antd/dist/antd.css"; // Import Ant Design styles
import { Modal, Button } from "@mui/material"; // MUI Modal and Button

// MUI Styled Component for the DatePicker
const StyledDatePicker = styled(DatePicker)(({ theme }) => ({
  width: "100%", // Ensure the DatePicker takes up 100% width
  "& .ant-picker-input > input": {
    borderRadius: "4px",
    padding: "4px 11px",
    transition: "border-color 0.3s, box-shadow 0.3s",
  },
  "& .ant-picker-dropdown": {
    zIndex: "1500", // Ensure dropdown appears above other elements
  },
}));

const CustomDatePicker = ({ date, setDate }) => {
  const disabledDate = (current) => {
    // Disable past dates
    return current && current < dayjs().endOf("day");
  };

  const handleDateChange = (date) => {
    // console.log(date.toDate());
    setDate(date);
  };

  return (
    <>
      <StyledDatePicker
        locale={locale}
        format="DD MMMM YYYY" // Format in words like "23 December 2024"
        disabledDate={disabledDate} // Only allow future dates
        onChange={handleDateChange}
        value={date}
        getPopupContainer={(trigger) => trigger.parentNode} // Ensures the calendar renders inside the modal
        popupClassName="custom-date-picker-dropdown" // Add custom styles if needed
      />
    </>
  );
};

export default CustomDatePicker;
