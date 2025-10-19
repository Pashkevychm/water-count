let trackerView = document.getElementById('tracker-view');
let chartView = document.getElementById('chart-view');
let viewHistoryBtn = document.getElementById('view-history-btn');
let backBtn = document.getElementById('back-btn');
let addBtn = document.getElementById('add-btn');
let waterInput = document.getElementById("water-input");
let consumedTodayEl = document.getElementById("consumed-today");
let chartCanvas = document.getElementById('history-chart');

const COOKIE_NAME = 'waterTrackerData';
let historyChart = null;

function setCookie(data) {
    let age = 14 * 24 * 60 * 60 // 14 днів
    let value = JSON.stringify(data)
    document.cookie = COOKIE_NAME + "=" + value + "; max-age=" + age;
}

function getCookie() {
    let found = false
    let cookies = document.cookie.split(';')

    for (let i = 0; i < cookies.length; i += 1) {
        let key_value = cookies[i].trim().split('=')
        if (key_value[0] == COOKIE_NAME) {
            found = key_value[1]
            break
        }
    }

    if (found) {
        return JSON.parse(found)
    } else {
        return {}
    }
}

function getDay(date) {
    return date.toISOString().split('T')[0];
}

function updateTodayDisplay() {
    let data = getCookie();
    let todayKey = getDay(new Date());
    let amount = data[todayKey] || 0;
    consumedTodayEl.innerHTML = `${amount} ml`;
}

function addWater() {
    let amount = +waterInput.value

    if (isNaN(amount) || amount <= 0) {
        waterInput.style.border = "2px solid red";
        setTimeout(() => waterInput.style.border = "2px solid black", 2000);
        return;
    }

    let data = getCookie();
    let todayKey = getDay(new Date());
    let currentDayAmount = data[todayKey] || 0;
    data[todayKey] = currentDayAmount + amount;

    setCookie(data);
    waterInput.value = '';
    updateTodayDisplay();
}

function renderChart() {
    let waterData = getCookie();
    let days = [];
    let daysData = [];

    // Додаємо останні 7 днів у списки
    for (let i = 6; i >= 0; i--) {
        let date = new Date();
        date.setDate(date.getDate() - i);
        let day = getDay(date)

        days.push(day);
        daysData.push(waterData[day] || 0);
    }

    // Видалити старий графік
    if (historyChart) {
        historyChart.destroy();
    }

    // Створити новий графік
    let ctx = chartCanvas.getContext('2d');
    historyChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: days,
            datasets: [{
                label: 'Випито води (ml)',
                data: daysData
            }]
        },
        options: {responsive: true, maintainAspectRatio: false}
    });
}

function showChartView() {
    trackerView.style.display = "none";
    chartView.style.display = "flex";
    renderChart();
}

function showTrackerView() {
    chartView.style.display = "none";
    trackerView.style.display = "flex";
    updateTodayDisplay();
}

addBtn.addEventListener('click', addWater);
viewHistoryBtn.addEventListener('click', showChartView);
backBtn.addEventListener('click', showTrackerView);
showTrackerView();
