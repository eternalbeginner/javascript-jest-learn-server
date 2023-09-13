import express from 'express';
import { db } from '../utilities';

const app = express.Router();

app.get('/', async (_, res) => {
  const students = await db.prisma.student.findMany({
    include: { major: true },
  });

  return res.send({
    message: 'Success',
    data: students,
    meta: { studentsCount: students.length },
  });
});

app.post('/', async (req, res) => {
  try {
    const newStudent = await db.prisma.student.create({
      data: {
        uniqueId: req.body.uniqueId,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        placeOfBirth: req.body.placeOfBirth,
        dateOfBirth: req.body.dateOfBirth,
        majorId: req.body.majorId,
      },
    });

    return res.send({
      message: 'Success',
      data: newStudent,
      meta: { insertedCount: 1 },
    });
  } catch (err) {
    return res.status(500).send({
      message: 'Something went wrong',
      error: [{ message: err.message }],
    });
  }
});

app.put('/:uniqueId', async (req, res) => {
  try {
    const updatedStudent = await db.prisma.student.update({
      where: { uniqueId: req.params.uniqueId },
      data: req.body,
    });

    return res.send({
      message: 'Success',
      data: updatedStudent,
      meta: { updatedCount: 1 },
    });
  } catch (err) {
    return res.status(500).send({
      message: 'Something went wrong',
      error: [{ message: err.message }],
    });
  }
});

app.delete('/:uniqueId', async (req, res) => {
  try {
    const deletedStudent = await db.prisma.student.delete({
      where: { uniqueId: req.params.uniqueId },
    });

    return res.send({
      message: 'Success',
      data: deletedStudent,
      meta: { deletedCount: 1 },
    });
  } catch (err) {
    return res.status(500).send({
      message: 'Something went wrong',
      error: [{ message: err.message }],
    });
  }
});

export default app;
