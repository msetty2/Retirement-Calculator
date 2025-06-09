function calculate() {
  const currentAge = parseInt(document.getElementById("currentAge").value);
  const retirementAge = parseInt(document.getElementById("retirementAge").value);
  const currentSavings = parseFloat(document.getElementById("currentSavings").value);
  const monthlyContribution = parseFloat(document.getElementById("monthlyContribution").value);
  const interestRate = parseFloat(document.getElementById("interestRate").value) / 100;

  const years = retirementAge - currentAge;
  const months = years * 12;
  const monthlyRate = interestRate / 12;

  let futureValue = currentSavings;

  for (let i = 0; i < months; i++) {
    futureValue += monthlyContribution;
    futureValue *= (1 + monthlyRate);
  }

  document.getElementById("result").innerText = `Estimated Savings at Retirement: $${futureValue.toFixed(2)}`;
}

// Make the function accessible to inline onclick
window.calculate = calculate;