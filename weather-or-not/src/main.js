const API_KEY = "YOUR_OPENWEATHER_API_KEY";

async function getWeather() {
  const pos = await new Promise(r => navigator.geolocation.getCurrentPosition(r));
  const { latitude, longitude } = pos.coords;

  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`
  );
  const data = await res.json();

  document.getElementById("temp").textContent = Math.round(data.main.temp) + "°C";
  document.getElementById("city").textContent = data.name;

}

getWeather();

const themes = [
  { img: "assets/chopper.png", bg: "#ffd7ef" },
  { img: "assets/luffy.png", bg: "#fff5a5" },
  { img: "assets/kuromi.png", bg: "#f5d9ff" }
];

let i = 0;
document.getElementById("changeTheme").onclick = () => {
  i = (i + 1) % themes.length;
  document.body.style.background = themes[i].bg;
  document.getElementById("character").src = themes[i].img;
};