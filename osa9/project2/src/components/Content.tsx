import React from 'react';
import { CoursePart } from '../types';

const Content = ({ parts } : { parts: CoursePart[] }) => {
  return (
    <>
      {parts.map(part => 
        <div key={part.name}>
          <p>{part.name} {part.exerciseCount}</p>
        </div>)}
    </>
  )
}

export default Content