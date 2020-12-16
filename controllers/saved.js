const handlePostSaved = (req, res, db) => {
  const {
    email,
    source,
    title,
    description,
    url,
    image,
    date,
    content,
  } = req.body;

  if (!email || !source || !title || !url || !date) {
    return res.status(400).json("Incorrect request!");
  }

  db.transaction((trx) => {
    trx
      .insert({
        email: email,
        source: source,
        title: title,
        description: description,
        url: url,
        image: image,
        date: date,
        content: content,
      })
      .into("saved")
      .returning("*")
      .then((data) => {
        return trx("saved")
          .where("email", "=", email)
          .returning("*")
          .then((data) => {
            const dataFiltered = data.map((x) => {
              return {
                source: {
                  name: x.source,
                },
                title: x.title,
                description: x.description,
                url: x.url,
                urlToImage: x.image,
                publishedAt: x.date,
                content: x.content,
              };
            });

            res.json(dataFiltered);
          });
      })
      .then(trx.commit)
      .catch(trx.rollback);
  }).catch((err) => res.status(400).json("Unable to submit saved!"));
};

const handleGetSaved = (req, res, db) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json("Incorrect request!");
  }

  db.select("*")
    .from("saved")
    .where("email", "=", email)
    .then((data) => {
      const dataFiltered = data.map((x) => {
        return {
          source: {
            name: x.source,
          },
          title: x.title,
          description: x.description,
          url: x.url,
          urlToImage: x.image,
          publishedAt: x.date,
          content: x.content,
        };
      });

      res.json(dataFiltered);
    })
    .catch((err) => res.status(400).json("Unable to get saved!"));
};

const handleDeleteSaved = (req, res, db) => {
  const { email, title } = req.body;

  if (!email || !title) {
    return res.status(400).json("Incorrect request!");
  }

  db.transaction((trx) => {
    trx("saved")
      .where("title", "=", title)
      .del()
      .returning("*")
      .then((data) => {
        return trx("saved")
          .where("email", "=", email)
          .returning("*")
          .then((data) => {
            const dataFiltered = data.map((x) => {
              return {
                source: {
                  name: x.source,
                },
                title: x.title,
                description: x.description,
                url: x.url,
                urlToImage: x.image,
                publishedAt: x.date,
                content: x.content,
              };
            });

            res.json(dataFiltered);
          });
      })
      .then(trx.commit)
      .catch(trx.rollback);
  }).catch((err) => res.status(400).json("Unable to submit saved!"));
};

module.exports = {
  handlePostSaved,
  handleGetSaved,
  handleDeleteSaved,
};
