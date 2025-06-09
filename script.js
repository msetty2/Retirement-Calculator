function calculate() {
  const currentAge = parseInt(document.getElementById("currentAge").value);
  const currentSavings = parseFloat(document.getElementById("currentSavings").value);
  const requiredRetirement = parseFloat(document.getElementById("requiredRetirement").value);
  const inflationRate = parseFloat(document.getElementById("inflationRate").value) / 100;
  const retirementAge = parseInt(document.getElementById("retirementAge").value);
  const rateOfReturn = parseFloat(document.getElementById("rateOfReturn").value) / 100;

  if (
    isNaN(currentAge) ||
    isNaN(currentSavings) ||
    isNaN(requiredRetirement) ||
    isNaN(inflationRate) ||
    isNaN(retirementAge) ||
    isNaN(rateOfReturn)
  ) {
    document.getElementById("result").innerText = "Please fill in all fields.";
    return;
  }

  const years = retirementAge - currentAge;
  if (years <= 0) {
    document.getElementById("result").innerText = "Retirement age must be greater than current age.";
    return;
  }

  // Step 1: Adjust required retirement savings for inflation
  const futureRequired = requiredRetirement * Math.pow(1 + inflationRate, years);

  // Step 2: Calculate required annual savings using FV of ordinary annuity
  // FV = P * [((1 + r)^n - 1) / r], solve for P
  const r = rateOfReturn;
  const n = years;
  const FV = futureRequired;
  const PV = currentSavings * Math.pow(1 + r, n); // current savings future value

  let annualSavings;
  if (r === 0) {
    annualSavings = (FV - PV) / n;
  } else {
    annualSavings = (FV - PV) * r / (Math.pow(1 + r, n) - 1);
  }

  if (annualSavings < 0) {
    document.getElementById("result").innerText = "You have already met your retirement goal!";
    return;
  }

  document.getElementById("result").innerText =
    `You need to save $${annualSavings.toFixed(2)} per year to reach your retirement goal (inflation-adjusted: $${futureRequired.toFixed(2)}).`;
}

window.calculate = calculate;