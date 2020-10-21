const handlePostSearches = (req, res, db) => {
  const { email, query } = req.body;

  if (!email || !query) {
    return res.status(400).json('Incorrect request!');
  }

  db.transaction((trx) => {
    trx
      .insert({
        email: email,
        query: query,
      })
      .into('searches')
      .returning('*')
      .then((data) => {
        return trx('searches')
          .where('email', '=', email)
          .returning('*')
          .then((data) => {
            res.json(data.map((x) => x.query));
          });
      })
      .then(trx.commit)
      .catch(trx.rollback);
  }).catch((err) => res.status(400).json('Unable to submit searches!'));
};

const handleGetSearches = (req, res, db) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json('Incorrect request!');
  }

  db.select('*')
    .from('searches')
    .where('email', '=', email)
    .then((data) => {
      res.json(data.map((x) => x.query));
    })
    .catch((err) => res.status(400).json('Unable to get searches!'));
};

const handleDeleteSearches = (req, res, db) => {
  const { email, query } = req.body;

  if (!email || !query) {
    return res.status(400).json('Incorrect request!');
  }

  db.transaction((trx) => {
    trx('searches')
      .where('query', '=', query)
      .del()
      .returning('*')
      .then((data) => {
        return trx('searches')
          .where('email', '=', email)
          .returning('*')
          .then((data) => {
            res.json(data.map((x) => x.query));
          });
      })
      .then(trx.commit)
      .catch(trx.rollback);
  }).catch((err) => res.status(400).json('Unable to submit searches!'));
};

module.exports = {
  handlePostSearches,
  handleGetSearches,
  handleDeleteSearches,
};
