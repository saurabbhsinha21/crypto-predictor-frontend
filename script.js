async function predict() {
  const pair = document.getElementById("pair").value;
  const targetTime = document.getElementById("targetTime").value;
  const targetPrice = document.getElementById("targetPrice").value;
  const result = document.getElementById("result");

  result.textContent = "Fetching prediction...";

  try {
    const response = await fetch("https://crypto-predictor-backend.onrender.com/predict", {
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

    if (data.prediction) {
      result.textContent = data.prediction;
    } else {
      result.textContent = "Prediction failed. Try again.";
    }
  } catch (error) {
    console.error(error);
    result.textContent = "Error fetching prediction.";
  }
}
