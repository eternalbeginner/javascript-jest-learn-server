import express from 'express';

import majorsRouter from './majors';
import studentsRouter from './students';

const app = express.Router();

app.use('/majors', majorsRouter);
app.use('/students', studentsRouter);

export default app;
