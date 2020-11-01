const jwt = require('jsonwebtoken');

const handleSignIn = (req, res, db, bcrypt) => {
  const { email, password } = req.body;

  if (!email || !password) {
    // return res.status(400).json('Incorrect form submission!');
    return Promise.reject('Incorrect form submission!');
  }

  return db
    .select('email', 'hash')
    .from('login')
    .where('email', '=', email)
    .then((data) => {
      const isValid = bcrypt.compareSync(password, data[0].hash);
      if (isValid) {
        return db
          .select('*')
          .from('users')
          .where('email', '=', email)
          .then((user) => {
            // res.json(user[0]);
            return user[0];
          })
          .catch((err) => {
            // res.status(400).json('Unable to connect!');
            return Promise.reject('Unable to connect!');
          });
      } else {
        // res.status(400).json('Wrong credentials!');
        return Promise.reject('Wrong credentials!');
      }
    })
    .catch((err) => {
      // res.status(400).json('Wrong credentials!');
      return Promise.reject('Wrong credentials!');
    });
};

const getAuthTokenId = () => {
  console.log('Auth OK!');
};

const signToken = (email) => {
  const jwtPayload = { email };

  return jwt.sign(jwtPayload, process.env.ONEWS_JWT_SECRET, {
    expiresIn: '2 days',
  });
};

const createSessions = (user) => {
  // JWT token, return user data
  const { email } = user;

  const token = signToken(email);

  return { success: 'true', email, token };
};

const handleSignInAuth = (req, res, db, bcrypt) => {
  const { authorization } = req.headers;

  // console.log(authorization);

  return authorization
    ? getAuthTokenId()
    : handleSignIn(req, res, db, bcrypt)
        .then((data) => {
          return data.id && data.email
            ? createSessions(data)
            : Promise.reject('Unable to connect!');
        })
        .then((session) => res.json(session))
        .catch((err) => res.status(400).json(err));
};

module.exports = {
  handleSignInAuth,
};
