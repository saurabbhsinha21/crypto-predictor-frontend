function predict() {
  const pair = document.getElementById("pair").value;
  const time = document.getElementById("targetTime").value;
  const price = document.getElementById("targetPrice").value;
  
  const direction = Math.random() > 0.5 ? "ABOVE" : "BELOW";
  const resultText = `Mock prediction: ${pair} will go ${direction} ${price ? `the target price of ${price}` : ""} by ${time}`;
  document.getElementById("result").innerText = resultText;

  drawChart();
}

function drawChart() {
  const ctx = document.getElementById('priceChart').getContext('2d');
  const data = {
    labels: Array.from({length: 10}, (_, i) => `T-${10-i}m`),
    datasets: [{
      label: 'Price',
      data: Array.from({length: 10}, () => 68000 + Math.random() * 1000),
      borderColor: 'blue',
      fill: false
    }]
  };

  new Chart(ctx, {
    type: 'line',
    data: data,
    options: {
      responsive: true,
      scales: {
        y: { beginAtZero: false }
      }
    }
  });
}
