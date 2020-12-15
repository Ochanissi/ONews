const jwt = require("jsonwebtoken");
const redisClient = require("./sign-in").redisClient;

const handleSignUp = (req, res, db, bcrypt) => {
  const { email, name, password } = req.body;

  if (!email || !name || !password) {
    return Promise.reject("Incorrect form submission!");
  }

  const hash = bcrypt.hashSync(password, 10);
  return db
    .transaction((trx) => {
      trx
        .insert({
          hash: hash,
          email: email,
        })
        .into("login")
        .returning("email")
        .catch((err) => {
          // console.log(err);
          // return Promise.reject(err);
          return Promise.reject(
            "Email address already in use! Please sign in."
          );
        })
        .then((loginEmail) => {
          return trx("users")
            .returning("*")
            .insert({
              email: loginEmail[0],
              name: name,
              joined: new Date(),
            })
            .then((user) => {
              // res.json(user[0]);
              return user[0];
            });
        })
        .then(trx.commit)
        .catch(trx.rollback);
    })
    .catch((err) => {
      if (err === "Email address already in use! Please sign in.") {
        // console.log(err);
        return Promise.reject(err);
      } else {
        return Promise.reject("Unable to register!");
      }
    });
};

const getAuthTokenId = (req, res) => {
  const { authorization } = req.headers;

  return redisClient.get(authorization, (err, reply) => {
    if (err || !reply) {
      return res.status(400).json("Unauthorized!");
    }
    return res.json({ email: reply });
  });
};

const signToken = (email) => {
  const jwtPayload = { email };

  return jwt.sign(jwtPayload, process.env.ONEWS_JWT_SECRET, {
    expiresIn: "7 days",
  });
};

const setToken = (token, email) => {
  return Promise.resolve(redisClient.set(`Bearer ${token}`, email));
};

const createSessions = (user) => {
  // JWT token, return user data
  const { email } = user;

  const token = signToken(email);

  return setToken(token, email)
    .then(() => {
      return { success: "true", email, token };
    })
    .catch(console.log);
};

const handleSignUpAuth = (req, res, db, bcrypt) => {
  const { authorization } = req.headers;

  return authorization
    ? getAuthTokenId(req, res)
    : handleSignUp(req, res, db, bcrypt)
        .then((data) => {
          return data.id && data.email
            ? createSessions(data)
            : Promise.reject("Unable to connect!");
        })
        .then((session) => res.json(session))
        .catch((err) => res.status(400).json(err));
};

module.exports = {
  handleSignUpAuth,
};
