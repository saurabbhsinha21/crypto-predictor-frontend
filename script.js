const BACKEND_URL = "https://crypto-predictor-backend.onrender.com";

async function predict() {
  const pair = document.getElementById("pair").value;
  const targetTime = document.getElementById("targetTime").value;
  const targetPrice = document.getElementById("targetPrice").value;
  const result = document.getElementById("predictionResult");

  if (!pair || !targetTime || !targetPrice) {
    result.textContent = "Please fill all fields.";
    return;
  }

  result.textContent = "Fetching prediction...";
  console.log("Requesting prediction:", { pair, targetTime, targetPrice });

  try {
    const resp = await fetch(`${BACKEND_URL}/predict`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        pair,
        target_time: targetTime,
        target_price: parseFloat(targetPrice)
      })
    });

    console.log("Response status:", resp.status);
    if (!resp.ok) {
      const errText = await resp.text();
      console.error("API returned error:", errText);
      result.textContent = "Server error: " + errText;
      return;
    }

    const data = await resp.json();
    console.log("Prediction data:", data);

    if (data.prediction) {
      result.textContent = data.prediction;
    } else if (data.error) {
      result.textContent = "Error: " + data.error;
    } else {
      result.textContent = "Unexpected response format.";
      console.warn("Full response object:", data);
    }

  } catch (err) {
    console.error("Fetch error:", err);
    result.textContent = "Network error: " + err.message;
  }
}

// Ensure chart loading and prediction button handler still works
document.addEventListener("DOMContentLoaded", () => {
  document.querySelector("button").addEventListener("click", predict);
});
