const handleGetProfile = (req, res, db) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json('Incorrect request!');
  }

  db.select('*')
    .from('users')
    .where({
      id: id,
    })
    .then((user) => {
      if (user.length) {
        res.json(user[0]);
      } else {
        res.status(400).json('Error getting user!');
      }
    });
};

const handlePatchProfile = (req, res, db) => {
  const { name, email, age, occupation, country, phone, about } = req.body;

  if (!email) {
    return res.status(400).json('Incorrect request!');
  }

  // console.log(req.body);

  // console.log(req.file);

  db('users')
    .where({ email: email })
    .update({
      name: name,
      occupation: occupation,
      age: age,
      country: country,
      phone: phone,
      about: about,
    })
    // .update({ occupation: occupation })
    // .update({ age: age })
    // .update({ country: country })
    // .update({ phone: phone })
    // .update({ about: about })
    // .update({ photo: photo })
    .returning('*')
    .then((user) => {
      if (user.length) {
        res.json(user[0]);
        // res.sendFile(path.join(__dirname, `./public/uploads/${user[0]}`));

        // console.log(user[0]);
      } else {
        res.status(400).json('Error updating user!');
      }
    })
    .catch((err) => res.status(400).json('Unable to update data!'));
};

const handlePatchPassword = (req, res, db, bcrypt) => {
  const { email, oldPass, newPass } = req.body;

  if (!email || !oldPass || !newPass) {
    return res.status(400).json('Incorrect request!');
  }

  // console.log(req.body);

  // Compare the sent password with the one saved
  db.select('*')
    .from('login')
    .where({
      email: email,
    })
    .then((user) => {
      if (user.length) {
        if (bcrypt.compareSync(oldPass, user[0].hash)) {
          // Update the password with the one sent
          const hash = bcrypt.hashSync(newPass, 10);

          db('login')
            .where({ email: email })
            .update({
              hash: hash,
            })
            .returning('*')
            .then((user) => {
              if (user.length) {
                res.json('Password updated!');
                // res.json(user[0]);
              } else {
                res.status(400).json('Error updating password!');
              }
            })
            .catch((err) => res.status(400).json('Unable to update password!'));

          // res.json(user[0]);
          // console.log(bcrypt.compareSync(password, user[0].hash));
        } else {
          res.json('Incorrect old password!');
        }
      } else {
        res.status(400).json('Error getting user!');
      }
    });
};

module.exports = {
  handleGetProfile,
  handlePatchProfile,
  handlePatchPassword,
};
