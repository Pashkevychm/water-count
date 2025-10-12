let trackerView = document.getElementById('tracker-view');
let chartview = document.getElementById('chart-view');
let viewHistoryBtn = document. getElementById('view-history-btn');
let backBtn = document.getElementById('back-btn');
let waterInput = document.getElementById("water-input")

function addWater() {
    let amount = waterInput.value
    if (isNaN(amount) || amount <= 0) {
        waterInput.style.border = "3px solid red"
        setTimeout(() => waterInput.style.border = "3px solid black", 2000);
        return;
    }
    let data = getCookie()
    let currenrDayAmount = data[todayKey] || 0;
    data[todayKey] = currenrDayAmount + amount;
    setCookie(data);
    waterInput.value = '';

}

function renderchart () {

}


function showchartView() {
    trackerView.style.display = "none";
    chartview.style.display = "flex";
    renderchart();
}


function showTrackerView() {
    chartview.style.display = "none";
    trackerView.style.display = "flex";
}

viewHistoryBtn.addEventListener('click', showchartView);
backBtn.addEventListener('click', showTrackerView);