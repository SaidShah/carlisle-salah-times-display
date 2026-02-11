import React, { useEffect, useState } from "react";
import "../styles/Heading.css"


const Heading = ({currentTime, adhanTimes}) => {

  let timings = adhanTimes?.data?.timings;
  if (timings) {
    timings = { ...timings }; // 13:00 is 1:00 PM in 24-hour format
  }

    const convertTo12HourFormat = (time24) => {
      const [hours, minutes] = time24.split(":").map(Number);
      const period = hours >= 12 ? "PM" : "AM";
      const hours12 = hours % 12 || 12;
      return `${hours12}:${String(minutes).padStart(2, "0")} ${period}`;
  };

    const sunrise12Hour = timings ? convertTo12HourFormat(timings.Sunrise) : "";
    const sunset12Hour = timings ? convertTo12HourFormat(timings.Sunset) : ""

  const currentTimeHere = currentTime?.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  const formattedDate = currentTime.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });


  return (
    <div>
        <div>
          <div>
            <p className="current_date">{formattedDate?.toUpperCase()}</p>
          </div>

          <div className="header">
            <div className="sunrise_container">
              <div className="image_text_container">
                <p className="sunrise_text">Sunrise</p>
                <img src="./sunrise.png" alt="Sunrise" className="sunrise_icon" />
                <p className="sunrise_time">{sunrise12Hour.toUpperCase()}</p>
              </div>
            </div>
            <h1 className="current_time">{currentTimeHere}</h1>
            <div className="sunrise_container">
              <div className="image_text_container">
                <p className="sunrise_text">Sunset</p>
                <img src="./sunset.png" alt="Sunset" className="sunrise_icon" />
                <p className="sunrise_time">{sunset12Hour.toUpperCase()}</p>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Heading;