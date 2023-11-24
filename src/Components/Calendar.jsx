import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const CalendarComponent = () => {
  const [date, setDate] = useState(new Date());

  const onChange = (newDate) => {
    setDate(newDate);
    // You can add your custom logic here when the date changes
  };

  return (
    <div
      className="Calendar"
      style={{ border: "solid 2px", margin: "10em", padding: "10px" }}
    >
      <div>
        <h1>Calendar</h1>
        <Calendar onChange={onChange} value={date} />
        <p>Selected date: {date.toDateString()}</p>
        {/* Add your additional components or logic here */}
      </div>
    </div>
  );
};

export default CalendarComponent;
