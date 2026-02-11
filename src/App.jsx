import { useState, useEffect } from 'react'
import './App.css'
import Heading from './components/Heading'
import PrayerTimes from './components/PrayerTimes'

function App() {
    const [adhanTimes, setAdhanTimes] = useState({});
    const [currentTime, setCurrentTime] = useState(new Date());

      useEffect(() => {
    const preventSleep = () => {
      window.addEventListener('beforeunload', (event) => {
        event.preventDefault ? event.preventDefault() : (event.returnValue = '');
      });
    };

    const keepScreenAwake = () => {
      setInterval(() => {
        document.documentElement.style.backgroundColor = '#075a8b;';
      }, 20 * 60 * 1000);
    };

    preventSleep();
    keepScreenAwake();

    return () => {
      window.removeEventListener('beforeunload', preventSleep);
      clearInterval(keepScreenAwake);
    };
  }, []);

  useEffect(() => {
    const fetchAdhanTimes = () => {
      const now = new Date();
      const formattedDate = `${String(now.getDate()).padStart(2, "0")}-${String(
        now.getMonth() + 1
      ).padStart(2, "0")}-${now.getFullYear()}`;

      const requestOptions = {
        method: "GET",
        redirect: "follow",
      };

      fetch(
        `https://api.aladhan.com/v1/timingsByAddress/${formattedDate}?address=Carlisle%2C+Pennsylvania%2C+US&method=2&shafaq=general&tune=0%2C0%2C0%2C0%2C0%2C0%2C0%2C0%2C0&school=0&midnightMode=0&timezonestring=America%2FNew_York&latitudeAdjustmentMethod=3&calendarMethod=UAQ`,
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => setAdhanTimes(JSON.parse(result)))
        .catch((error) => console.error(error));
    };

    const timeInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60 * 1000);

    const fetchInterval = setInterval(() => {
        fetchAdhanTimes();
    }, 2 * 10 * 60 * 1000);

    fetchAdhanTimes();
    return () => {
      clearInterval(timeInterval); // Cleanup time interval
      clearInterval(fetchInterval); // Cleanup fetch interval
    };
  }, []);

    let timings = adhanTimes?.data?.timings;
  if (timings) {
    timings = { ...timings };
  }

    if (timings) {
    timings = { ...timings}; // Add Jummah
    const {
      Sunset,
      Sunrise,
      Imsak,
      Midnight,
      Firstthird,
      Lastthird,
      ...filteredTimings
    } = timings;
    timings = filteredTimings;
  }

    const convertTo12HourFormat = (time24) => {
    const [hours, minutes] = time24.split(":").map(Number);
    const period = hours >= 12 ? "PM" : "AM";
    const hours12 = hours % 12 || 12;
    return `${hours12}:${String(minutes).padStart(2, "0")} ${period}`;
  };

  return (
    <>
      <Heading currentTime={currentTime} adhanTimes={adhanTimes}/>
                <div className="prayer_time_dash">
            {timings && Object.entries(timings).map(([prayerName, time]) => (
              <div key={prayerName} className="prayer_time_container">
                <PrayerTimes
                  prayerName={prayerName}
                  prayerTime={convertTo12HourFormat(time)}
                  currentTime={currentTime}
                  adhanTimes={adhanTimes}
                />
              </div>
            ))}
          </div>
    </>
  )
}

export default App
