import React from 'react';
import { CoursePart } from '../types';
import Part from './Part';

const Content = ({ parts } : { parts: CoursePart[] }) => {

  return (
    <>
      {parts.map(part => 
        <div key={part.name}>
          <Part key={part.name} part={part} />
        </div>)}
    </>
  )
}

export default Content