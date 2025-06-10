function formatDateTimeLocal(input) {
  const date = new Date(input);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${day}.${month}.${year} ${hours}:${minutes}`;
}

function predict() {
  const pair = document.getElementById("pair").value;
  const timeRaw = document.getElementById("targetTime").value;
  const price = parseFloat(document.getElementById("targetPrice").value);

  if (!timeRaw || !price) {
    alert("Please enter both target time and price.");
    return;
  }

  const formattedTime = formatDateTimeLocal(timeRaw);
 fetch("https://crypto-predictor-api.onrender.com/predict", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    pair,
    target_price: parseFloat(targetPrice),
    target_time: targetTime,
  }),
})
  .then((response) => response.json())
  .then((data) => {
    const output = `Prediction: ${pair.replace("/", "")} will go ${data.prediction.toUpperCase()} the target price of ${targetPrice} by ${targetTime}<br>🔍 Confidence: ${(data.confidence * 100).toFixed(2)}%<br>📈 Current Price: ${data.current_price}`;
    document.getElementById("result").innerHTML = output;
  })
  .catch((error) => {
    document.getElementById("result").innerHTML = "❌ Error: " + error;
  });

  document.getElementById("result").innerText = resultText;

  drawChart();
}

function drawChart() {
  const ctx = document.getElementById("priceChart").getContext("2d");
  const data = {
    labels: Array.from({ length: 20 }, (_, i) => `${i}m`),
    datasets: [{
      label: "Price",
      data: Array.from({ length: 20 }, () => 68000 + Math.random() * 1000),
      borderColor: "blue",
      borderWidth: 2,
      fill: false,
      tension: 0.3
    }]
  };

  if (window.priceChart) {
    window.priceChart.destroy();
  }

  window.priceChart = new Chart(ctx, {
    type: "line",
    data: data,
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: false
        }
      }
    }
  });
}
