const ctx = document.getElementById('priceChart').getContext('2d');
let chart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: [],
    datasets: [{
      label: 'Price',
      data: [],
      borderColor: 'blue',
      fill: false
    }]
  },
  options: {
    responsive: true,
    scales: {
      x: { display: true },
      y: { display: true }
    }
  }
});

async function fetchPrice(pair) {
  const res = await fetch(`https://api.binance.com/api/v3/ticker/price?symbol=${pair}`);
  const data = await res.json();
  return parseFloat(data.price);
}

async function updateChart(pair) {
  const price = await fetchPrice(pair);
  const now = new Date().toLocaleTimeString();
  chart.data.labels.push(now);
  chart.data.datasets[0].data.push(price);
  if (chart.data.labels.length > 20) {
    chart.data.labels.shift();
    chart.data.datasets[0].data.shift();
  }
  chart.update();
}

setInterval(() => {
  const pair = document.getElementById('pair').value;
  updateChart(pair);
}, 60000);

function predict() {
  const pair = document.getElementById('pair').value;
  const target = document.getElementById('targetTime').value;
  document.getElementById('result').innerText = `Mock prediction: ${pair} will go ABOVE by ${target}`;
}