/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";
import axios from "axios";
import { apiBaseUrl } from "../constants";
import { useParams } from "react-router-dom";
import { useStateValue, getPatient, setDiagnoses } from "../state";
import { Patient, Diagnosis } from "../types";
import { Icon } from "semantic-ui-react";

const PatientPage = () => {
  const [{ patients, diagnoses }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();
  const patient = patients[id];

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const { data: patientFromApi } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        dispatch(getPatient(patientFromApi));
      } catch (e) {
        console.error(e);
      }
    };
    void fetchPatient();
  }, [dispatch]);

  useEffect(() => {
    const fetchDiagnoses = async () => {
      try {
        const { data: diagnosesFromApi } = await axios.get<Diagnosis[]>(
          `${apiBaseUrl}/diagnoses`
        );
        dispatch(setDiagnoses(diagnosesFromApi));
      } catch (e) {
        console.error(e);
      }
    };
    void fetchDiagnoses();
  }, [dispatch]);

  if (!patient) return null;
  if (!diagnoses) return null;

  return (
    <div>
      <h2>{patient.name} {patient.gender === "male" && <Icon name="mars"></Icon> || patient.gender === "female" && <Icon name="venus"></Icon> || patient.gender === "other" && <Icon name="transgender"></Icon>}</h2>
      <p>ssn: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>
      <h3>entries</h3>
      {patient.entries.map(entry => 
        <div key={entry.description}>
          <p>{entry.date} <i>{entry.description}</i></p>
          <ul>{entry.diagnosisCodes?.map((code: any)=> <li key={code}>{code} {diagnoses[code]?.name}</li>)}</ul>
        </div>)}
    </div>
  );
};

export default PatientPage;