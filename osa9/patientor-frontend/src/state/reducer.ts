import { State } from "./state";
import { Patient, Diagnosis } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "GET_PATIENT";
      payload: Patient;
  }
  | {
    type: 'SET_DIAGNOSES';
    payload: Diagnosis[];
  };

export const setPatientList = (data: Patient[]): Action => {
  return {
    type: 'SET_PATIENT_LIST',
    payload: data
  };
};

export const addPatient = (data: Patient): Action => {
  return {
    type: 'ADD_PATIENT',
    payload: data
  };
};

export const getPatient = (data: Patient): Action => {
  return {
    type: 'GET_PATIENT',
    payload: data
  };
};

export const setDiagnoses = (data: Diagnosis[]): Action => {
  return {
      type: 'SET_DIAGNOSES',
      payload: data,
  };
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "GET_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload,
        }
    };
    case 'SET_DIAGNOSES':
      return {
        ...state,
        diagnoses: {
          ...action.payload.reduce(
            (memo, diagnosis) => ({ ...memo, [diagnosis.code]: diagnosis }),
            {}
          ),
          ...state.diagnoses
        }
      };
    default:
      return state;
  }
};