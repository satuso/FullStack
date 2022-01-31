interface Bmi {
  value1: number;
  value2: number;
}

export const calculateBmi = (a: number, b: number) => {
  const c = a / 100;
  const bmi = b / (c * c);
  if (bmi < 18.4) {
    return `${bmi.toFixed(2)} Underweight (unhealthy)`;
  }
  if (bmi >= 18.5 && bmi <= 24.9){
    return `${bmi.toFixed(2)} Normal (healthy weight)`;
  }
  if (bmi >= 25 && bmi <= 29.9){
    return `${bmi.toFixed(2)} Overweight (at risk)`;
  }
  if (bmi >= 30){
    return `${bmi.toFixed(2)} Obese (unhealthy)`;
  }
};

const parseArgsBmi = (args: Array<string>): Bmi => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      value1: Number(args[2]),
      value2: Number(args[3])
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

try {
  const { value1, value2 } = parseArgsBmi(process.argv);
  console.log(calculateBmi(value1, value2));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}