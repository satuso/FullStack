/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Entry, HospitalEntry, OccupationalHealthcareEntry, HealthCheckEntry } from '../types';
import { useStateValue } from '../state';
import { Icon } from 'semantic-ui-react';

const style = {
  border: "1px solid lightgray",
  borderRadius: "5px",
  padding: "10px",
  marginBottom: "5px"
};

const HospitalEntryDetails: React.FC<{ entry: HospitalEntry }> = ({ entry }) => {
  const [{  diagnoses }] = useStateValue();
  return (
    <div style={style}>
      <h3>{entry.date} <Icon name="hospital"></Icon></h3>
      <p><i>{entry.description}</i></p>
      <ul>{entry.diagnosisCodes?.map((code: any)=> <li key={code}>{code} {diagnoses[code]?.name}</li>)}</ul>
    </div>
  );
};

const OccupationalHealthcareEntryDetails: React.FC<{ entry: OccupationalHealthcareEntry }> = ({ entry }) => {
  const [{ diagnoses }] = useStateValue();
  return (
    <div style={style}>
      <h3>{entry.date} <Icon name="stethoscope"></Icon> {entry.employerName}</h3>
      <p><i>{entry.description}</i></p>
      <ul>{entry.diagnosisCodes?.map((code: any)=> <li key={code}>{code} {diagnoses[code]?.name}</li>)}</ul>
    </div>
  );
};

const HealthCheckEntryDetails: React.FC<{ entry: HealthCheckEntry }> = ({ entry }) => {
  const [{  diagnoses }] = useStateValue();
  return (
    <div style={style}>
      <h3>{entry.date} <Icon name="doctor"></Icon></h3>
      <p><i>{entry.description}</i></p>
      <p>{entry.healthCheckRating === 2 || 3 && <Icon color="red" name="heart"></Icon> || entry.healthCheckRating === 1 && <Icon color="yellow" name="heart"></Icon> || entry.healthCheckRating === 0 && <Icon color="green" name="heart"></Icon>}</p>
      <ul>{entry.diagnosisCodes?.map((code: any)=> <li key={code}>{code} {diagnoses[code]?.name}</li>)}</ul>
    </div>
  );
};

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  switch (entry.type) {
    case "HealthCheck":
      return <HealthCheckEntryDetails entry={entry}/>;
    case "Hospital":
      return <HospitalEntryDetails entry={entry}/>;
    case "OccupationalHealthcare":
      return <OccupationalHealthcareEntryDetails entry={entry}/>;
    default:
      return entry;
  }
};

export default EntryDetails;