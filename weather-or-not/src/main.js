const API_KEY = "YOUR_OPENWEATHER_API_KEY";

const tempEl = document.getElementById("temp");
const cityEl = document.getElementById("city");
const characterEl = document.getElementById("character");
const themeBtn = document.getElementById("changeTheme");

const themes = [
  { 
    name: "chopper",
    bg: "#FEE7F2",
    accent: "#B4E4DD", 
    character: "assets/chopper.png" 
  },
  { 
    name: "luffy", 
    bg: "#FFF6B7",
    accent: "#8ED1FF",
    character: "assets/luffy.png"
  },
  {
    name: "kuromi", 
    bg: "#E9D9FF",
    accent: "#2B2B30",
    character: "assets/kuromi.png"
  }
];

let themeIndex = 0;

function applyTheme(index) {
  const theme = themes[index];
  document.body,style,background = theme.bg;
  characterEl.src = theme.character;
  document.documentElement.style.setProperty("--accent", theme.accent);
}


async function getWeather() {
  if (!navigator.geolocation) {
    cityEl.textContent = "Location unavailable";
    return;
  }

  navigator.geolocation.getCurrentPosition(async (pos) => {
    const { latitude, longitude } = pos.coords;
    const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`
  );

  const data = await res.json();

  tempEl.textContent = Math.round(data.main.temp) + "°C";
  cityEl.textContent = data.name;

  });
}

themeBtn.addEventListener("click", () => {
  themeIndex = (themeIndex + 1) % themes.length;
  applyTheme(themeIndex);
});

applyTheme(0);
getWeather();