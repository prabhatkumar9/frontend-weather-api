//Complete the Weather API Backend part using openweathermap api

let today = new Date();
let weekday = [];
weekday[0] = "Sunday";
weekday[1] = "Monday";
weekday[2] = "Tuesday";
weekday[3] = "Wednesday";
weekday[4] = "Thursday";
weekday[5] = "Friday";
weekday[6] = "Saturday";

let cityID = document.querySelector("#showPlace");
let weatherID = document.querySelector("#showWeather");
let iconID = document.querySelector("#icon");
let TempID = document.querySelector("#showTemperature");
let todayDate = new Date();

function show() {
  let input = document.querySelector("#txt1");
  fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=" +
      input.value +
      "&appid=a29f3e8ac743dc84ba392a7ebcb3a12c"
  )
    .then((response) => response.json())
    .then((data) => {
      let temperature = data["main"]["temp"];
      let cityName = data["name"];
      let desc = data["weather"][0]["description"];
      let iconcode = data["weather"][0]["icon"];
      let country = data["sys"]["country"];
      console.log(data);

      cityID.innerHTML = cityName + ", " + country;
      weatherID.innerHTML = desc;
      TempID.innerHTML = temperature - 273.15 + "°C"; // convert kelvin to celcius

      iconID.src = "http://openweathermap.org/img/w/" + iconcode + ".png";
      input.value = "";
      setTime();
    })

    .catch((err) => alert("Wrong city name!"));
}

function AddZero(value) {
  //add zero when value is below 10
  if (value < 10) {
    value = "0" + value;
  }
  return value;
}

function setTime() {
  let day = weekday[today.getDay()];
  let hour = today.getHours();
  let minute = AddZero(today.getMinutes()); //add zero when value is below 10
  let second = AddZero(today.getSeconds());
  document.querySelector("#showDayAndTime").innerHTML =
    day + " , " + hour + ":" + minute + ":" + second;
  window.setInterval(setTime, 1000);
}
