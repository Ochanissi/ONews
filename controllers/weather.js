const axios = require('axios');

const handleGetWeather = async (req, res) => {
  const { city } = req.body;

  console.log(process.env.ONEWS_OPENWEATHER_KEY);

  if (!city) {
    return res.status(400).json('Incorrect request!');
  }

  try {
    const data = await axios.get(
      `http://api.openweathermap.org/data/2.5/weather?id=${process.env.ONEWS_OPENWEATHER_KEY}`
    );

    // console.log(data.data.articles);

    res.json(data);
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = {
  handleGetWeather,
};
