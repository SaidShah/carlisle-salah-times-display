import {useEffect} from "react";
import "../styles/PrayerTimes.css"

const PrayerTimes = ({prayerName, prayerTime,currentTime, adhanTimes}) => {

    let timings = adhanTimes?.data?.timings;
  if (timings) {
    timings = { ...timings }; // 13:00 is 1:00 PM in 24-hour format
  }

    const toArabic = (prayerName) => {
    switch (prayerName) {
      case "Fajr":
        return "الفجر";
      case "Dhuhr":
        return "الظهر";
      case "Asr":
        return "العصر";
      case "Maghrib":
        return "المغرب";
      case "Isha":
        return "العشاء";
      case "Jummah":
        return "جمعة";
    }
  };

    const timeOfDayIndicator = (prayerName) => {
    switch (prayerName) {
      case "Fajr":
        return "AM"; // Fajr is always in the morning
      case "Dhuhr":
      case "Asr":
      case "Maghrib":
      case "Isha":
      case "Jummah":
        return "PM"; // These prayers are in the afternoon/evening
    }
  };

console.log(adhanTimes)
  return (
        <div className="outer_container">
      <div className="first_section">
        {prayerName.includes("Maghrib") ? (
          <h2 className="prayer_name">MAGHRIB</h2>
        ) : (
          <h2 className="prayer_name">{prayerName.toUpperCase()}</h2>
        )}
        <h2 className="arabic_name">{toArabic(prayerName)}</h2>
      </div>
      <div className="second_section">
        <h2 className="prayer_time">{prayerTime.replace(" AM", "").replace(" PM", "")}</h2>
        <h2 className={`time_of_day_indicator ${prayerName.toUpperCase() === "MAGHRIB" || prayerName.toUpperCase() === "ISHA" ? "time_of_day_indicator_bottom" : "time_of_day_indicator"}`}>
          {timeOfDayIndicator(prayerName)}
        </h2>
      </div>
    </div>
  )
};

export default PrayerTimes;