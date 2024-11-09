const apiKey = config.MY_KEY;
    let intervalId;

    async function fetchAndUpdateTime() {
      const timezone = document.getElementById('timezoneSearch').value.trim();
      if (!timezone) return;
      
      try {
        const response = await axios.get(`https://api.ipgeolocation.io/timezone?apiKey=${apiKey}&location=${timezone}`);
        const b =response.data.date_time;
        console.log(b);
        const dateTime = new Date(response.data.date_time);
        console.log(dateTime);
        
        if (intervalId) clearInterval(intervalId);
        
        updateClock(dateTime);
        intervalId = setInterval(() => {
          dateTime.setSeconds(dateTime.getSeconds() + 1);
          updateClock(dateTime);
        }, 1000);
      } catch (error) {
        console.error("Error fetching time:", error);
      }
    }

    function updateClock(now) {
      const seconds = now.getSeconds();
      const minutes = now.getMinutes();
      const hours = now.getHours();

      const secondDegree = seconds * 6;
      const minuteDegree = (minutes + seconds / 60) * 6;
      const hourDegree = (hours % 12 + minutes / 60) * 30;

      document.getElementById('second-hand').style.transform = `rotate(${secondDegree}deg)`;
      document.getElementById('minute-hand').style.transform = `rotate(${minuteDegree}deg)`;
      document.getElementById('hour-hand').style.transform = `rotate(${hourDegree}deg)`;
    }

    document.getElementById('timezoneSearch').value = 'Colombo'; 
    fetchAndUpdateTime();