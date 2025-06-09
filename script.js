let chartInstance = null;

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
    if (chartInstance) chartInstance.destroy();
    return;
  }

  const years = retirementAge - currentAge;
  if (years <= 0) {
    document.getElementById("result").innerText = "Retirement age must be greater than current age.";
    if (chartInstance) chartInstance.destroy();
    return;
  }

  const futureRequired = requiredRetirement * Math.pow(1 + inflationRate, years);
  const r = rateOfReturn;
  const n = years;
  const FV = futureRequired;
  const PV = currentSavings * Math.pow(1 + r, n);

  let annualSavings;
  if (r === 0) {
    annualSavings = (FV - PV) / n;
  } else {
    annualSavings = (FV - PV) * r / (Math.pow(1 + r, n) - 1);
  }

  if (annualSavings < 0) {
    document.getElementById("result").innerText = "You have already met your retirement goal!";
    if (chartInstance) chartInstance.destroy();
    return;
  }

  document.getElementById("result").innerText =
    `You need to save $${annualSavings.toFixed(2)} per year to reach your retirement goal (inflation-adjusted: $${futureRequired.toFixed(2)}).`;

  // Prepare data for the chart
  let savings = currentSavings;
  const savingsData = [];
  const requiredData = [];
  const labels = [];
  for (let i = 0; i <= years; i++) {
    labels.push(currentAge + i);
    requiredData.push(requiredRetirement * Math.pow(1 + inflationRate, i));
    if (i === 0) {
      savingsData.push(savings);
    } else {
      savings = savings * (1 + r) + annualSavings;
      savingsData.push(savings);
    }
  }

  // Draw chart
  const ctx = document.getElementById('growthChart').getContext('2d');
  if (chartInstance) chartInstance.destroy();
  chartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'Your Projected Savings',
          data: savingsData,
          borderColor: '#ffe066',
          backgroundColor: 'rgba(255,224,102,0.12)',
          tension: 0.18,
          pointRadius: 2,
        },
        {
          label: 'Inflation-Adjusted Goal',
          data: requiredData,
          borderColor: '#fca311',
          backgroundColor: 'rgba(252,163,17,0.10)',
          borderDash: [6, 4],
          tension: 0.18,
          pointRadius: 2,
        }
      ]
    },
    options: {
      responsive: false,
      plugins: {
        legend: {
          labels: {
            color: '#ffe066',
            font: { size: 11, weight: 'bold' }
          }
        }
      },
      scales: {
        x: {
          title: { display: true, text: 'Age', color: '#ffe066', font: { size: 11 } },
          ticks: { color: '#ffe066', font: { size: 10 } },
          grid: { color: '#444a', drawOnChartArea: false }
        },
        y: {
          title: { display: true, text: 'Amount ($)', color: '#ffe066', font: { size: 11 } },
          ticks: { color: '#ffe066', font: { size: 10 } },
          grid: { color: '#444a' }
        }
      }
    }
  });
}

window.calculate = calculate;