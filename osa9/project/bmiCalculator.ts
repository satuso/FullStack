const calculateBmi = (a: number, b: number) => {
  const c = a / 100;
  const bmi = b / (c * c);
  if (bmi < 18.4) {
    return `${bmi.toFixed(2)} Underweight (unhealthy)`
  };
  if (bmi >= 18.5 && bmi <= 24.9){
    return `${bmi.toFixed(2)} Normal (healthy weight)`
  };
  if (bmi >= 25 && bmi <= 29.9){
    return `${bmi.toFixed(2)} Overweight (at risk)`
  };
  if (bmi >= 30){
    return `${bmi.toFixed(2)} Obese (unhealthy)`
  };
};

console.log(calculateBmi(180, 74));