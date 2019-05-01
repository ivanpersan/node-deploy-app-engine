const express = require('express');
const app = express();

app.post('/', (req, res) => {
  res.send("My response");
});

const server = app.listen(process.env.PORT || 8080, err => {
  if (err) return console.error(err);
  const port = server.address().port;
  console.info(`App listening on port ${port}`);
});