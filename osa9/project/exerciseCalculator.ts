interface Result {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

const calculateExercises = (array: Array<number>, target: number) : Result => {
  const average = array.reduce(function (avg, value, _, { length }) {
    return avg + value / length;
  }, 0);
  const periodLength = array.length;
  const trainingDays = array.filter(value => value !== 0).length;
  let rating = 0;
  let success = false;
  let ratingDescription = '';
  
  if (average >= target){
    success = true;
    rating = 3;
    ratingDescription = 'excellent, you have reached your target!';
  } else if (average > target * 0.5){
    success = false;
    rating = 2;
    ratingDescription = 'not too bad but could be better';
  } else {
    success = false;
    rating = 1;
    ratingDescription = 'not enough exercise';
  }
  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  };
};

interface Exercise {
  value1: number,
  value2: number []
}

const parseArgsExercises = (args: Array<string>): Exercise => {
  if (args.length < 4) throw new Error('Not enough arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))){
    return {
      value1: Number(args[2]),
      value2: args.map(arg => Number(arg)).slice(3),
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};
try {
  const { value1, value2 } = parseArgsExercises(process.argv);
  console.log(calculateExercises(value2, value1));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}