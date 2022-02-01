import express from 'express';
import patientService from '../services/patientService';

const patientRouter = express.Router();

patientRouter.get('/', (_req, res) => {
  const data = patientService.getNonSensitiveEntries();
  res.json(data);
});

patientRouter.post('/', (_req, res) => {
  res.send('Saving a diagnose!');
});

export default patientRouter;