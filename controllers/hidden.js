const handlePostHidden = (req, res, db) => {
  const { email, source } = req.body;

  // console.log(req.body);

  if (!email || !source) {
    return res.status(400).json('Incorrect request!');
  }

  db.transaction((trx) => {
    trx
      .insert({
        email: email,
        source: source,
      })
      .into('hidden')
      .returning('*')
      .then((data) => {
        return trx('hidden')
          .where('email', '=', email)
          .returning('*')
          .then((data) => {
            res.json(data.map((x) => x.source));
          });
      })
      .then(trx.commit)
      .catch(trx.rollback);
  }).catch((err) => res.status(400).json('Unable to submit hidden!'));
};

const handleGetHidden = (req, res, db) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json('Incorrect request!');
  }

  db.select('*')
    .from('hidden')
    .where('email', '=', email)
    .then((data) => {
      res.json(data.map((x) => x.source));
    })
    .catch((err) => res.status(400).json('Unable to get hidden!'));
};

const handleDeleteHidden = (req, res, db) => {
  const { email, source } = req.body;

  // console.log(id);

  if (!email || !source) {
    return res.status(400).json('Incorrect request!');
  }

  db.transaction((trx) => {
    trx('hidden')
      .where('source', '=', source)
      .del()
      .returning('*')
      .then((data) => {
        return trx('hidden')
          .where('email', '=', email)
          .returning('*')
          .then((data) => {
            res.json(data.map((x) => x.source));
          });
      })
      .then(trx.commit)
      .catch(trx.rollback);
  }).catch((err) => res.status(400).json('Unable to submit hidden!'));
};

module.exports = {
  handlePostHidden,
  handleGetHidden,
  handleDeleteHidden,
};
