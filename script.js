document.getElementById("predictBtn").addEventListener("click", async () => {
  const pair = document.getElementById("pair").value;
  const targetTime = document.getElementById("targetTime").value;
  const targetPrice = parseFloat(document.getElementById("targetPrice").value);

  if (!pair || !targetTime || isNaN(targetPrice)) {
    alert("Please fill in all fields correctly.");
    return;
  }

  const payload = {
    pair,
    target_time: targetTime,
    target_price: targetPrice
  };

  try {
    const response = await fetch("https://crypto-predictor-backend.onrender.com/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();

    if (data && data.prediction) {
      document.getElementById("result").innerText = `${pair} will go ${data.prediction.toUpperCase()} the target price of ${targetPrice} by ${targetTime}`;
    } else {
      document.getElementById("result").innerText = "Prediction failed. Please try again.";
    }
  } catch (error) {
    console.error("Error fetching prediction:", error);
    document.getElementById("result").innerText = "Server error or prediction failed.";
  }
});
