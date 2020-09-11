var clock = {
  alarmSound: new Audio("./audio/sound.mp3"),
  arms: {
    hour: document.getElementById("hour"),
    minute: document.getElementById("minute"),
    second: document.getElementById("second"),
  },
  now: {
    hour: null,
    minute: null,
    second: null,
  },
  angles: {
    hour: null,
    minute: null,
    second: null,
  },
  alarms: [],
  getNow: function () {
    var time = new Date();
    this.now.hour = time.getHours();
    this.now.minute = time.getMinutes();
    this.now.second = time.getSeconds();
  },
  getAngles: function () {
    this.angles.second = (360 / 60) * this.now.second;
    this.angles.minute = (360 / 60) * this.now.minute + this.now.second / 60;
    this.angles.hour = (360 / 12) * this.now.hour + this.now.minute / 12;
  },
  positionClockArms: function () {
    this.arms.second.style.transform = `rotate(${this.angles.second}deg)`;
    this.arms.minute.style.transform = `rotate(${this.angles.minute}deg)`;
    this.arms.hour.style.transform = `rotate(${this.angles.hour}deg)`;
  },
  adjustAngles: function () {
    this.now.second++;
    this.getAngles();
    this.positionClockArms();
    if (this.now.second % 60 === 0) {
      this.checkAlarms();
    }
  },
  setAlarm: function () {
    let selectedTime = document.getElementById("time").value;
    let activeAlarms = document.getElementById("activeAlarms");
    let newAlarm = document.createElement("p");
    newAlarm.textContent = "Alarm at: " + selectedTime;
    console.log("Alarm set at: " + selectedTime);
    if (selectedTime) {
      activeAlarms.appendChild(newAlarm);
      this.alarms.push(selectedTime);
    }
  },
  checkAlarms: function () {
    let currentTime = new Date();
    let currentMinutes = currentTime.getMinutes();
    let currentHours = currentTime.getHours();
    this.alarms.forEach((alarm) => {
      let alarmMinutes = Number(alarm.split(":")[1]);
      let alarmHours = Number(alarm.split(":")[0]);
      if (currentMinutes === alarmMinutes && currentHours === alarmHours) {
        console.log("alarming!");
        this.alarmSound.play();
      }
    });
  },
  init: function () {
    this.getNow();
    this.getAngles();
    this.positionClockArms();
    document
      .getElementById("setAlarm")
      .addEventListener("click", this.setAlarm.bind(this));
    setInterval(this.adjustAngles.bind(this), 1000);
  },
};

clock.init();

// var sound = new Audio("./audio/sound.mp3");
// sound.play();
