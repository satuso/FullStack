/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-explicit-any */

import express = require('express');
const app = express();
app.use(express.json());
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';


app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const weight = req.query.weight;
  const height = req.query.height;
  try {
    res.send({ weight, height, bmi: calculateBmi(Number(height), Number(weight)) });
  } catch {
    res.send({ error: 'malformatted parameters' });
  }
});

app.post('/exercises', (req, res) => {
  const target = Number(req.body.target);
  const exercises = req.body.daily_exercises;
  if (!target || !exercises) {
    res.json({ error: 'parameters missing' });
  }
  if (exercises.length < 1 || isNaN(target)) {
    res.json({ error: 'malformatted parameters' });
  }
  res.json(calculateExercises(exercises, target));
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});