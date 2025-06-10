document.getElementById("predictBtn").addEventListener("click", async () => {
  const pair = document.getElementById("pair").value;
  const targetTime = document.getElementById("targetTime").value;
  const targetPrice = parseFloat(document.getElementById("targetPrice").value);

  if (!targetTime || isNaN(targetPrice)) {
    document.getElementById("result").innerText = "Please enter both time and price.";
    return;
  }

  document.getElementById("result").innerText = "Predicting...";

  try {
    const response = await fetch('https://your-render-api-url.com/predict', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pair, target_time: targetTime, target_price: targetPrice })
    });

    const data = await response.json();

    document.getElementById("result").innerHTML =
      `<p><strong>Prediction:</strong> ${pair} will go <b>${data.direction}</b> the target price of ${targetPrice} by ${targetTime}</p>`;

    drawChart(data.timestamps, data.prices);

  } catch (error) {
    console.error("Error:", error);
    document.getElementById("result").innerText = "Error fetching prediction.";
  }
});

function drawChart(labels, prices) {
  const ctx = document.getElementById("priceChart").getContext("2d");
  if (window.priceChart) window.priceChart.destroy();

  window.priceChart = new Chart(ctx, {
    type: "line",
    data: {
      labels,
      datasets: [{
        label: "Price",
        data: prices,
        borderColor: "blue",
        borderWidth: 2,
        fill: false,
        pointRadius: 0,
      }]
    },
    options: {
      scales: {
        x: { display: true },
        y: { beginAtZero: false }
      }
    }
  });
}
