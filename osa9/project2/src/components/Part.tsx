import React from "react";
import { CoursePart } from "../types";

const Part = ({ part } : { part: CoursePart }) => {
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  switch (part.type) {
    case "normal":
      return <div><b>{part.name} {part.exerciseCount}</b><br/><i>{part.description}</i><br/><br/></div>;
    case "groupProject":
      return <div><b>{part.name} {part.exerciseCount}</b><br/>project exercises {part.groupProjectCount}<br/><br/></div>;
    case "submission":
      return <div><b>{part.name} {part.exerciseCount}</b><br/><i>{part.description}</i><br />submit to {part.exerciseSubmissionLink}<br/><br/></div>;
    default:
      return assertNever(part);
    }
}

export default Part