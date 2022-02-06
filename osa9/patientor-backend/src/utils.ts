/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Gender, NewPatient, Entry, NewEntry } from './types';

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing name');
  }
  return name;
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
      throw new Error('Incorrect or missing date of birth: ' + date);
  }
  return date;
};

const parseSSN = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error('Incorrect or missing SSN');
  }
  return ssn;
};

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
      throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};

const parseOccupation = (occupation : unknown): string => {
  if (!occupation || !isString(occupation )) {
    throw new Error('Incorrect or missing occupation');
  }
  return occupation;
};

const parseEntries = (entries: any): Entry[] => {
  if (!entries) {
    throw new Error(`Incorrect or missing entries: ${entries}`);
  }
  return entries;
};

const parseRating = (healthCheckRating: any): number => {
  if (!healthCheckRating) {
    throw new Error('Incorrect or missing health check rating');
  }
  return healthCheckRating;
};

const parseDescription = (description: unknown): string => {
  if (!description || !isString(description)) {
    throw new Error('Incorrect or missing description');
  }
  return description;
};

const parseSpecialist = (specialist: unknown): string => {
  if (!specialist || !isString(specialist)) {
    throw new Error('Incorrect or missing specialist');
  }
  return specialist;
};

const parseEmployerName = (employerName: unknown): string => {
  if (!employerName || !isString(employerName)) {
    throw new Error('Incorrect or missing employer name');
  }
  return employerName;
};

const parseCriteria = (criteria: unknown): string => {
  if (!criteria || !isString(criteria)) {
    throw new Error('Incorrect or missing discharge criteria');
  }
  return criteria;
};

type Fields = { name: unknown, dateOfBirth: unknown, ssn: unknown, gender: unknown, occupation: unknown, entries: unknown };

export const toNewPatient = ({ name, dateOfBirth, ssn, gender, occupation, entries } : Fields): NewPatient => {
  const newPatient: NewPatient = {
    name: parseName(name),
    dateOfBirth: parseDate(dateOfBirth),
    ssn: parseSSN(ssn),
    gender: parseGender(gender),
    occupation: parseOccupation(occupation),
    entries: parseEntries(entries)
  };
  return newPatient;
};

export const toNewEntry = (obj: any): NewEntry => {
  switch (obj.type) {
    case "Hospital": {
      const newEntry: NewEntry = {
        type: "Hospital",
        description: parseDescription(obj.description),
        date: parseDate(obj.date),
        specialist: parseSpecialist(obj.specialist),
        diagnosisCodes: obj.diagnosisCodes,
        discharge: { 
          date : parseDate(obj.discharge.date),
          criteria: parseCriteria(obj.discharge.criteria)
        }};
      return newEntry;
    }
    case "HealthCheck":{
      const newEntry: NewEntry = {
        type: "HealthCheck",
        description: parseDescription(obj.description),
        date: parseDate(obj.date),
        specialist: parseSpecialist(obj.specialist),
        diagnosisCodes: obj.diagnosisCodes,
        healthCheckRating: parseRating(obj.healthCheckRating)
      };
      return newEntry;
    }
    case "OccupationalHealthcare" :{
      const newEntry: NewEntry = {
        type: "OccupationalHealthcare",
        description: parseDescription(obj.description),
        date: parseDate(obj.date),
        specialist: parseSpecialist(obj.specialist),
        diagnosisCodes: obj.diagnosisCodes,
        employerName: parseEmployerName(obj.employerName),
        sickLeave: {
          startDate: parseDate(obj.sickLeave.startDate),
          endDate: parseDate(obj.sickLeave.endDate),
        }
      };
      return newEntry;
    }
    default:
      throw new Error('Incorrect or missing type');
  }
};