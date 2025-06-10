let chart;

async function predict() {
    const pair = document.getElementById("pair").value;
    const targetTime = document.getElementById("targetTime").value;
    const targetPrice = document.getElementById("targetPrice").value;

    const response = await fetch("https://crypto-predictor-backend.onrender.com/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            pair: pair,
            target_time: targetTime,
            target_price: targetPrice
        })
    });

    const data = await response.json();
    document.getElementById("predictionResult").innerText = data.prediction || data.error;
}

// Initialize Chart.js with mock data
function initChart() {
    const ctx = document.getElementById('priceChart').getContext('2d');
    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Live Price',
                data: [],
                borderColor: 'green',
                borderWidth: 2,
                fill: false
            }]
        },
        options: {
            responsive: true,
            animation: false,
            scales: {
                x: {
                    type: 'time',
                    time: {
                        tooltipFormat: 'HH:mm:ss',
                        displayFormats: { minute: 'HH:mm' }
                    }
                }
            }
        }
    });
}

// Auto-refresh chart data every 1 minute
async function updateChartData() {
    const pair = document.getElementById("pair").value.replace("/", "").toUpperCase();
    const response = await fetch(`https://api.binance.com/api/v3/klines?symbol=${pair}&interval=1m&limit=30`);
    const kline = await response.json();

    const labels = kline.map(k => new Date(k[0]));
    const prices = kline.map(k => parseFloat(k[4]));

    chart.data.labels = labels;
    chart.data.datasets[0].data = prices;
    chart.update();
}

function loadTradingViewWidget() {
    const pair = document.getElementById("pair").value.replace("/", "");
    const container = document.getElementById("tradingview-widget");
    container.innerHTML = "";

    new TradingView.widget({
        "width": "100%",
        "height": 400,
        "symbol": "BINANCE:" + pair,
        "interval": "1",
        "timezone": "Etc/UTC",
        "theme": "light",
        "style": "1",
        "locale": "en",
        "toolbar_bg": "#f1f3f6",
        "enable_publishing": false,
        "allow_symbol_change": true,
        "container_id": "tradingview-widget"
    });
}

document.addEventListener("DOMContentLoaded", () => {
    initChart();
    updateChartData();
    loadTradingViewWidget();

    setInterval(() => {
        updateChartData();
    }, 60000);

    document.getElementById("pair").addEventListener("change", () => {
        loadTradingViewWidget();
        updateChartData();
    });
});
