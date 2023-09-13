import express from 'express';

const app = express.Router();

app.get('/', (req, res) => {
  return res.send({ foo: 'bar' });
});

export default app;
