function resetLights() {
    let lights = ["red", "yellow", "green"];

    lights.forEach(function(id) {
        let light = document.getElementById(id);

        light.style.background = "gray";
        light.style.boxShadow = "0 0 10px #555";
    });
}


// ===============================
// 🚨 Emergency History
// ===============================

let emergencyHistory = [];

function addHistory(vehicle) {

    const now = new Date();
    const time = now.toLocaleTimeString();

    emergencyHistory.unshift(
        vehicle + " — " + time
    );

    if (emergencyHistory.length > 5) {
        emergencyHistory.pop();
    }

    document.getElementById("history").innerHTML =
        emergencyHistory.join("<br>");
}


// ===============================
// 🚦 Live Traffic Simulation
// ===============================

let trafficTimer;
let emergencyActive = false;

function startTrafficSimulation() {

    clearInterval(trafficTimer);

    trafficTimer = setInterval(function() {

        if (emergencyActive) {
            return;
        }

        let trafficLevel =
            document.getElementById("trafficLevel");

        let responseTime =
            document.getElementById("responseTime");

        let levels = [
            {
                name: "🟢 Low Traffic",
                time: "5 minutes"
            },
            {
                name: "🟡 Medium Traffic",
                time: "4 minutes"
            },
            {
                name: "🔴 High Traffic",
                time: "3 minutes"
            }
        ];

        let randomLevel =
            levels[Math.floor(Math.random() * levels.length)];

        trafficLevel.innerHTML = randomLevel.name;
        responseTime.innerHTML = randomLevel.time;

    }, 5000);
}

startTrafficSimulation();


// ===============================
// ⏱️ Emergency Countdown
// ===============================

let countdownTimer;
let remainingSeconds = 300;

function startEmergencyCountdown() {

    clearInterval(countdownTimer);

    remainingSeconds = 300;

    updateCountdown();

    countdownTimer = setInterval(function() {

        if (!emergencyActive) {
            clearInterval(countdownTimer);
            return;
        }

        remainingSeconds--;

        updateCountdown();

        if (remainingSeconds <= 0) {

            clearInterval(countdownTimer);

            document.getElementById("status").innerHTML =
                "✅ Emergency time completed. System resetting...";

            setTimeout(function() {
                resetEmergency();
            }, 1000);
        }

    }, 1000);
}


function updateCountdown() {

    let minutes =
        Math.floor(remainingSeconds / 60);

    let seconds =
        remainingSeconds % 60;

    let displayMinutes =
        minutes < 10 ? "0" + minutes : minutes;

    let displaySeconds =
        seconds < 10 ? "0" + seconds : seconds;

    document.getElementById("responseTime").innerHTML =
        "⏱️ Emergency Countdown: " +
        displayMinutes + ":" +
        displaySeconds;
}


// ===============================
// 🚑 Ambulance
// ===============================

function ambulance() {

    emergencyActive = true;

    resetLights();

    let green = document.getElementById("green");

    green.style.background = "lime";
    green.style.boxShadow = "0 0 30px lime";

    document.getElementById("status").innerHTML =
        "🚑 Ambulance detected. Signal changed to GREEN. Other vehicles must wait.";

    document.getElementById("routeStatus").innerHTML =
        "🔴 Emergency Route Active";

    document.getElementById("routeInfo").innerHTML =
        "🚑 Ambulance route cleared. Please give way!";

    document.getElementById("alertMessage").innerHTML =
        "🚑 Ambulance emergency active!";

    document.getElementById("activityLog").innerHTML =
        "🚑 Ambulance selected — Emergency route activated.";

    document.getElementById("trafficLevel").innerHTML =
        "🔴 High Traffic";

    addHistory("🚑 Ambulance");

    updateMap(
        "🚑",
        "Ambulance route activated!"
    );

    startEmergencyCountdown();
}


// ===============================
// 🚓 Police
// ===============================

function police() {

    emergencyActive = true;

    resetLights();

    let yellow = document.getElementById("yellow");

    yellow.style.background = "yellow";
    yellow.style.boxShadow = "0 0 30px yellow";

    document.getElementById("status").innerHTML =
        "🚓 Police vehicle detected. Traffic slowed for safe movement.";

    document.getElementById("routeStatus").innerHTML =
        "🔴 Emergency Route Active";

    document.getElementById("routeInfo").innerHTML =
        "🚓 Police route cleared. Please give way!";

    document.getElementById("alertMessage").innerHTML =
        "🚓 Police emergency active!";

    document.getElementById("activityLog").innerHTML =
        "🚓 Police selected — Emergency route activated.";

    document.getElementById("trafficLevel").innerHTML =
        "🔴 High Traffic";

    addHistory("🚓 Police");

    updateMap(
        "🚓",
        "Police emergency route activated!"
    );

    startEmergencyCountdown();
}


// ===============================
// 🚒 Fire Engine
// ===============================

function fireengine() {

    emergencyActive = true;

    resetLights();

    let red = document.getElementById("red");

    red.style.background = "red";
    red.style.boxShadow = "0 0 30px red";

    document.getElementById("status").innerHTML =
        "🚒 Fire engine detected. Emergency route activated!";

    document.getElementById("routeStatus").innerHTML =
        "🔴 Emergency Route Active";

    document.getElementById("routeInfo").innerHTML =
        "🚒 Fire engine route cleared. Please give way!";

    document.getElementById("alertMessage").innerHTML =
        "🚒 Fire engine emergency active!";

    document.getElementById("activityLog").innerHTML =
        "🚒 Fire engine selected — Emergency route activated.";

    document.getElementById("trafficLevel").innerHTML =
        "🔴 High Traffic";

    addHistory("🚒 Fire Engine");

    updateMap(
        "🚒",
        "Fire engine emergency route activated!"
    );

    startEmergencyCountdown();
}


// ===============================
// 🗺️ Emergency Map + Progress
// ===============================

let mapTimers = [];

function updateMap(vehicleIcon, message) {

    let vehicle =
        document.getElementById("mapVehicle");

    let mapStatus =
        document.getElementById("mapStatus");

    let progressText =
        document.getElementById("progressText");

    let progressFill =
        document.getElementById("progressFill");


    // Clear old map animation
    mapTimers.forEach(function(timer) {
        clearTimeout(timer);
    });

    mapTimers = [];


    if (vehicle) {

        vehicle.innerHTML = vehicleIcon;

        // 🚨 Emergency detected
        vehicle.style.left = "12%";

        if (progressText) {
            progressText.innerHTML =
                "🚨 Emergency detected...";
        }

        if (progressFill) {
            progressFill.style.width = "10%";
        }


        // 🛣️ Route cleared
        mapTimers.push(setTimeout(function() {

            if (!emergencyActive) return;

            vehicle.style.left = "30%";

            if (progressText) {
                progressText.innerHTML =
                    "🛣️ Emergency route cleared...";
            }

            if (progressFill) {
                progressFill.style.width = "35%";
            }

        }, 1500));


        // 🚑 Vehicle moving
        mapTimers.push(setTimeout(function() {

            if (!emergencyActive) return;

            vehicle.style.left = "55%";

            if (progressText) {
                progressText.innerHTML =
                    "🚑 Emergency vehicle moving...";
            }

            if (progressFill) {
                progressFill.style.width = "65%";
            }

        }, 3000));


        // 🏥 Hospital reached
        mapTimers.push(setTimeout(function() {

            if (!emergencyActive) return;

            vehicle.style.left = "82%";

            if (progressText) {
                progressText.innerHTML =
                    "🏥 Hospital reached successfully!";
            }

            if (progressFill) {
                progressFill.style.width = "100%";
            }

        }, 5000));
    }


    if (mapStatus) {

        mapStatus.innerHTML =
            "🟢 " + message;
    }
}


// ===============================
// 🔄 Reset Emergency
// ===============================

function resetEmergency() {

    emergencyActive = false;

    clearInterval(countdownTimer);

    mapTimers.forEach(function(timer) {
        clearTimeout(timer);
    });

    mapTimers = [];

    remainingSeconds = 300;

    resetLights();


    document.getElementById("routeStatus").innerHTML =
        "🟢 Normal Traffic";

    document.getElementById("routeInfo").innerHTML =
        "No emergency vehicle detected.";

    document.getElementById("alertMessage").innerHTML =
        "No active emergency.";

    document.getElementById("activityLog").innerHTML =
        "No emergency activity yet.";

    document.getElementById("trafficLevel").innerHTML =
        "🟢 Low Traffic";

    document.getElementById("responseTime").innerHTML =
        "5 minutes";

    document.getElementById("status").innerHTML =
        "✅ Emergency system reset. Normal traffic resumed.";


    let vehicle =
        document.getElementById("mapVehicle");

    let mapStatus =
        document.getElementById("mapStatus");

    let progressText =
        document.getElementById("progressText");

    let progressFill =
        document.getElementById("progressFill");


    if (vehicle) {

        vehicle.innerHTML = "🚑";
        vehicle.style.left = "12%";
    }


    if (mapStatus) {

        mapStatus.innerHTML =
            "Waiting for emergency vehicle...";
    }


    if (progressText) {

        progressText.innerHTML =
            "Waiting for emergency vehicle...";
    }


    if (progressFill) {

        progressFill.style.width = "0%";
    }


    emergencyHistory = [];

    document.getElementById("history").innerHTML =
        "No emergency history yet.";
}


// ===============================
// 🕐 Clock
// ===============================

function updateClock() {

    const now = new Date();

    document.getElementById("clock").innerHTML =
        now.toLocaleTimeString();
}

setInterval(updateClock, 1000);

updateClock();


// ===============================
// 📅 Date
// ===============================

function updateDate() {

    const today = new Date();

    document.getElementById("date").innerHTML =
        today.toDateString();
}

updateDate();