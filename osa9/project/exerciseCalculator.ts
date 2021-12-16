interface Result {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
};

const calculateExercises = (array: Array<number>, target: number) : Result => {
    const average = array.reduce(function (avg, value, _, { length }) {
      return avg + value / length;
    }, 0);
    const periodLength = array.length
    const trainingDays = array.filter(value => value !== 0).length
    let rating = 0;
    let success = false;
    let ratingDescription = ''
  
    if (average >= target){
      success = true
      rating = 3
      ratingDescription = 'excellent, you have reached your target!'
    } else if (average > target * 0.5){
      success = false
      rating = 2
      ratingDescription = 'not too bad but could be better'
    } else {
      success = false
      rating = 1
      ratingDescription = 'not enough exercise'
    };

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));