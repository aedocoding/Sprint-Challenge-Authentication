const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const authenticate = require('../auth/authenticate-middleware.js');
const authRouter = require('../auth/auth-router.js');
const jokesRouter = require('../jokes/jokes-router.js');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/auth', authRouter);
server.use('/api/jokes', authenticate, checkRole("user"), jokesRouter);

module.exports = server;
function checkRole(role) {
    return (req, res, next) => {
      if (
        req.decodedToken &&
        req.decodedToken.role &&
        req.decodedToken.role.toLowerCase() === role
      ) {
        next();
      } else {
        res.status(403).json({ you: "Shall not pass!" });
      }
    };
  }
