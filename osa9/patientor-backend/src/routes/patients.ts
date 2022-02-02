import express from 'express';
import patientService from '../services/patientService';
import toNewPatient from '../utils';

const patientRouter = express.Router();

patientRouter.get('/', (_req, res) => {
  const data = patientService.getNonSensitiveEntries();
  res.json(data);
});

patientRouter.get('/:id', (_req, res) => {
  const patient = patientService.findById(_req.params.id);
  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});

patientRouter.post('/', (_req, res) => {
  try {
  const newPatient = toNewPatient(_req.body);
  const addedEntry = patientService.addPatient(newPatient);
  /*
  const { name, dateOfBirth, ssn, gender, occupation } = _req.body;
  const newPatient = patientService.addPatient({
    name,
    dateOfBirth,
    ssn,
    gender,
    occupation
  });
  */
  res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default patientRouter;