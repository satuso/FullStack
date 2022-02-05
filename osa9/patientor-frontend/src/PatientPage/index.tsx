import React, { useEffect } from "react";
import axios from "axios";
import { apiBaseUrl } from "../constants";
import { useParams } from "react-router-dom";
import { useStateValue, getPatient } from "../state";
import { Patient } from "../types";
import { Icon } from "semantic-ui-react";

const PatientPage = () => {
  const [{ patients }, dispatch] = useStateValue();
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

  if (!patient) return null;

  return (
    <div>
      <h2>{patient.name} {patient.gender === "male" && <Icon name="mars"></Icon> || patient.gender === "female" && <Icon name="venus"></Icon> || patient.gender === "other" && <Icon name="transgender"></Icon>}</h2>
      <p>ssn: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>
    </div>
  );
};

export default PatientPage;