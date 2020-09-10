var HOURHAND = document.getElementById("hour");
var MINUTEHAND = document.getElementById("minute");
var SECONDHAND = document.getElementById("second");
let alarms = [];

function startClock() {
  document.getElementById("setAlarm").addEventListener("click", setAlarm);
  var audio = new Audio("./audio/Tink.aiff");
  console.log(audio);
  audio.play();
  let currentTime = new Date();

  function updateClock(currentTime) {
    if (currentTime.getSeconds() === 0) {
      checkAlarms(currentTime);
    }

    let secondDegrees = (360 / 60) * currentTime.getSeconds();
    let minuteDegrees = (360 / 60) * currentTime.getMinutes();
    let hourDegrees = currentTime.getHours() * (360 / 12);
    minuteDegrees = minuteDegrees + secondDegrees / 60;
    hourDegrees = hourDegrees + minuteDegrees / 12;

    SECONDHAND.style.transform = `rotate(${secondDegrees}deg)`;
    MINUTEHAND.style.transform = `rotate(${minuteDegrees}deg)`;
    HOURHAND.style.transform = `rotate(${hourDegrees}deg)`;

    currentTime.setSeconds(currentTime.getSeconds() + 1);
  }

  setInterval(() => updateClock(currentTime), 1000);
}

function checkAlarms(currentTime) {
  console.log(currentTime);
  let currentMinutes = currentTime.getMinutes();
  let currentHours = currentTime.getHours();
  alarms.forEach((alarm) => {
    let alarmMinutes = Number(alarm.split(":")[1]);
    let alarmHours = Number(alarm.split(":")[0]);
    if (currentMinutes === alarmMinutes && currentHours === alarmHours) {
      console.log("alarming!");
    }
  });
}

function setAlarm() {
  let selectedTime = document.getElementById("time").value;

  let activeAlarms = document.getElementById("activeAlarms");
  let newAlarm = document.createElement("p");
  newAlarm.textContent = "Alarm at: " + selectedTime;
  if (selectedTime) {
    activeAlarms.appendChild(newAlarm);
    alarms.push(selectedTime);
  }
}

startClock();
