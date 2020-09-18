const axios = require('axios');

const handleGetSearch = async (req, res) => {
  const { query } = req.body;

  // console.log(process.env.ONEWS_NEWSAPI_KEY);

  if (!query) {
    return res.status(400).json('Incorrect request!');
  }

  try {
    const data = await axios.get(
      `https://newsapi.org/v2/everything?q=${query}&apiKey=${process.env.ONEWS_NEWSAPI_KEY}`
    );

    // console.log(data.data.articles);

    res.json(data.data.articles);
  } catch (error) {
    res.status(400).json('Unable to get news!');
  }
};

module.exports = {
  handleGetSearch,
};
