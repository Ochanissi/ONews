const axios = require('axios');

const handleGetWeather = async (req, res) => {
  const { lat, lon, units } = req.body;

  // console.log(process.env.ONEWS_OPENWEATHER_KEY);

  if (!lat || !lon || !units) {
    return res.status(400).json('Incorrect request!');
  }

  try {
    const data = await axios.get(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts,current&units=${units}&appid=${process.env.ONEWS_OPENWEATHER_KEY}`
    );

    // console.log(data.data);

    res.json(data.data.daily.slice(0, 5));
  } catch (error) {
    res.status(400).json('Unable to get weather!');
  }
};

module.exports = {
  handleGetWeather,
};
