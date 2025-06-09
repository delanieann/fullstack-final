import React from "react";
import { useNavigate } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const Cal = ({ eventDates }) => {
  const navigate = useNavigate();

  const handleDateClick = (date) => {
    const dateStr = date.toISOString().split("T")[0];
    navigate(`/home?date=${dateStr}`);
  };
  return (
    <div className="calendar-page">
      <Calendar onClickDay={handleDateClick} />
    </div>
  );
};

export default Cal;
