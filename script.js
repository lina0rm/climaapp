const API_KEY = 'e42ff6021d81dfee32544434cc48b5dd';

const fetchData = position => {
    const { latitude, longitude } = position.coords;
    fetch(`http://api.openweathermap.org/data/2.5/weather?units=metric&lat=${latitude}&lon=${longitude}&appid=${API_KEY}`)
        .then(response => response.json())
        .then(data => setWeatherData(data));
}

const setWeatherData = data => {
    console.log(data);
    const weatherData = {
        location: data.name,
        description: data.weather[0].main.toLowerCase(),
        humidity: data.main.humidity,
        pressure: data.main.pressure,
        temperature: data.main.temp,
        date: getDate(),
        icon: data.weather[0].icon // Obtenemos el icono para determinar si es de día o noche
    }

    Object.keys(weatherData).forEach(key => {
        if (document.getElementById(key)) {
            document.getElementById(key).textContent = weatherData[key];
        }
    });

    // Cambiar video dinámicamente
    changeBackground(weatherData.description, weatherData.icon);

    cleanUp();
}

const changeBackground = (description, icon) => {
    const video = document.getElementById('background-video');
    const isDay = icon.includes('d'); // Verifica si es de día

    if (description.includes('clear')) {
        video.src = isDay ? 'videos/sunny_day.mp4' : 'videos/sunny_night.mp4';
    } else if (description.includes('cloud')) {
        video.src = isDay ? 'videos/cloudy_day.mp4' : 'videos/cloudy_night.mp4';
    } else if (description.includes('rain')) {
        video.src = isDay ? 'videos/rainy_day.mp4' : 'videos/rainy_night.mp4';
    } else if (description.includes('snow')) {
        video.src = isDay ? 'videos/snowy_day.mp4' : 'videos/snowy_night.mp4';
    } else {
        video.src = isDay ? 'videos/default_day.mp4' : 'videos/default_night.mp4';
    }
}

const cleanUp = () => {
    let container = document.getElementById('container');
    let loader = document.getElementById('loader');

    loader.style.display = 'none';
    container.style.display = 'flex';
}

const getDate = () => {
    let date = new Date();
    return `${date.getDate()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${date.getFullYear()}`;
}

const onLoad = () => {
    navigator.geolocation.getCurrentPosition(fetchData);
}
