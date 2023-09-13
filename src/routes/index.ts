import express from 'express';
import studentsRouter from './students';

const app = express.Router();

app.use('/students', studentsRouter);

export default app;
