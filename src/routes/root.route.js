const route = require('express').Router();

route.get('/', (req, res) => {
    res.send('Hello World! It works!')
  })

module.exports = route;