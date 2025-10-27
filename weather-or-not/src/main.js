const weatherText = document.getElementById("weatherText");
const character = document.getElementById("character");

const themes = {
  chopper: "assets/sprites/chopper.png",
  luffy: "assets/sprites/luffy.png",
  kuromi: "assets/sprites/kuromi.png"
};

document.querySelectorAll(".theme-select button").forEach(btn => {
  btn.addEventListener("click", () => {
    document.body.className = btn.dataset.theme;
    character.src = themes[btn.dataset.theme];
  });
});

let useCelsius = true;
document.getElementById("cBtn").onclick = () => {
  useCelsius = true;
  document.getElementById("cBtn").classList.add("active");
  document.getElementById("fBtn").classList.remove("active"); 
};

document.getElementById("fBtn").onclick = () => {
  useCelsius = false;
  document.getElementById("fBtn").classList.add("active");
  document.getElementById("cBtn").classList.remove("active");
};

navigator.geolocation.getCurrentPosition(success, fail);

function fail() {
  weatherText.textContent = "Unable to get location";
}

async function success(pos) {
  const { latitude, longitude } = pos.coords;

  const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`);
  const data = await res.json();
  const tempC = data.current_weather.temperature;
  const condition = data.current_weather.weathercode;

  const text = interpretWeather(condition);

  setInterval( () => {
    let temp = useCelsius ? tempC : (tempC * 9/5 + 32);
    let unit = useCelsius ? "°C" : "°F";
    weatherText.innerHTML = `${text} (${Math.round(temp)}${unit})`;
  }, 200);
}

function interpretWeather(code) {

  if (code === 0) {
    return `<img src="assets/weather-emotes/rainbow.png" class="weather-icon"> It's a clear sky today!`;
  }
  else if (code === 1) {
    return `<img src="assets/weather-emotes/sunny.png" class="weather-icon"> It's sunny today!`;
  }
  else if (code >= 2 && code <= 3) {
    return `<img src="assets/weather-emotes/cloudy.png" class="weather-icon"> It's partly cloudy today!`;
  }
  else if (code >= 51 && code <= 67) {
    return `<img src="assets/weather-emotes/rain.png" class="weather-icon"> It's a rainy day~`;
  }
  else if (code >= 71 && code <= 77) {
    return `<img src="assets/weather-emotes/star-moon.png" class="weather-icon"> Snow is falling!`;
  }
  else if (code >=80 && code <= 82) {
    return `<img src="assets/weather-emotes/waterdrop.png" class="weather-icon"> Incoming Rain Showers!`;
  }
  else if (code >= 95 && code <= 99) {
    return `<img src="assets/weather-emotes/thunder.png" class="weather-icon"> Incoming Thunderstorm Alert!`;
  }
  else {
    return "Stay cozy 💗";
  }
}

