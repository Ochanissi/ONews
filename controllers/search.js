const axios = require('axios');

const handleGetSearch = async (req, res) => {
  const {
    query,
    queryTitle = false,
    date,
    lang = 'en',
    sortBy = 'publishedAt',
  } = req.body;

  if (!query) {
    return res.status(400).json('Incorrect request!');
  }

  try {
    const data = await axios.get(
      `https://newsapi.org/v2/everything?${
        queryTitle ? 'qInTitle' : 'q'
      }=${query}&language=${lang}&sortBy=${sortBy}${
        date ? `&from=${date}` : ''
      }&apiKey=${process.env.ONEWS_NEWSAPI_KEY}`
    );

    res.json(data.data.articles);
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = {
  handleGetSearch,
};
