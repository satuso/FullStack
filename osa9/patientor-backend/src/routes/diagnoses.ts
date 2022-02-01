import express from 'express';
import diagnoseService from '../services/diagnoseService';

const diagnoseRouter = express.Router();

diagnoseRouter.get('/', (_req, res) => {
  const data = diagnoseService.getDiagnoses();
  res.json(data);
});

diagnoseRouter.post('/', (_req, res) => {
  res.send('Saving a diagnose!');
});

export default diagnoseRouter;