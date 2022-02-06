import patients from '../../data/patients';
import { NewPatient, NonSensitivePatientEntry, Patient, Entry, NewEntry } from '../types';
import { v1 as uuid } from 'uuid';

const getPatients = (): Array<Patient> => {
  return patients;
};

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
    entries
  }));
};

const findById = (id: string): Patient | undefined => {
  let patient = patients.find(p => p.id === id);
  if (!patient) return undefined;
  if (!patient.entries){
    patient = {...patient, entries: []};
    return undefined;
  }
  return patient;
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient = {
    id: uuid(),
    ...patient
  };
  patients.push(newPatient);
  return newPatient;
};

const addEntry = (newEntry: NewEntry, id: string): Entry => {
  const entry = {
    id: uuid(),
    ...newEntry
  };
  patients.find( p => p.id === id)?.entries.push(entry);
  return entry;
};

export default {
  getPatients,
  addPatient,
  getNonSensitiveEntries,
  findById,
  addEntry
};