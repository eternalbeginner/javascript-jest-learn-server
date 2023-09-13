import express from 'express';
import { db } from '../utilities';

const app = express.Router();

app.get('/', async (_, res) => {
  const majors = await db.prisma.major.findMany();

  return res.send({
    message: 'Success',
    data: majors,
    meta: { majorsCount: majors.length },
  });
});

export default app;
