const weatherText = document.getElementById("weatherText");
const character = document.getElementById("character");

const themes = {
  chopper: "assets/chopper.png",
  luffyL "assets/luffy.png",
  kuromi: "assets/kuromi.png"
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

  const res = await featch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`);
  const data = await res.json();
  const tempC = data.current_weather.temperature;
  const condition = data.current_weather.weathercode;

  const text = interpretWeather(condition);

  setInterval( () => {
    let temp = useCelsius ? tempC : (tempC * 9/5 + 32);
    let unit = useCelsius ? "°C" : "°F";
    weatherText.textContent = `${text} (${Math.round(temp)}${unit})`;
  }, 200);
}

function interpretWeather(code) {
  if (code === 0) return "It's ☀️ and clear!";
  if (code <= 3) return "Partly ☁️ today!";
  if (code <= 55) return "A little 🌧️ outside.";
  return "Stay cozy 💗";
}
