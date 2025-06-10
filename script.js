const backendUrl = "https://crypto-predictor-backend.onrender.com";

async function getPrediction() {
  const pair = document.getElementById("pair").value;
  const targetTime = document.getElementById("targetTime").value;
  const targetPrice = document.getElementById("targetPrice").value;
  const result = document.getElementById("result");

  if (!pair || !targetTime || !targetPrice) {
    result.textContent = "Please fill all fields.";
    return;
  }

  try {
    const response = await fetch(`${backendUrl}/predict`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        pair: pair,
        target_time: targetTime,
        target_price: parseFloat(targetPrice)
      })
    });

    const data = await response.json();

    if (data && data.prediction) {
      result.textContent = `Prediction: ${data.prediction}`;
    } else {
      result.textContent = "Unexpected response from server.";
    }
  } catch (error) {
    console.error("Error:", error);
    result.textContent = "Error fetching prediction.";
  }
}
