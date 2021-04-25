const input = document.querySelector('input');
const btn = document.querySelector('button');

const cityName = document.querySelector(' .city-name');
const warning = document.querySelector(' .warning');
const photo = document.querySelector(' .photo');

const weather = document.querySelector(' .weather');
const temperature = document.querySelector(' .temp');
const humidity = document.querySelector(' .humidity');

const apiLink = 'https://api.openweathermap.org/data/2.5/weather?q=';
const apiKey = '&appid=2e8feb106cd79be0996756954ea8dcc9';
const apiLang = '&http://api.openweathermap.org/data/2.5/weather?id=524901&lang=pl&appid={2e8feb106cd79be0996756954ea8dcc9}';
const units = '&units=metric';


let city;
let url;


const getWeather = () => {
city  = (!input.value) ? 'Krakow' : input.value;
url = apiLink + city + apiKey + apiLang + units ; 

axios.get(url)
    .then(res => {
        const temp = res.data.main.temp;
        const hum = res.data.main.humidity;
        const status = Object.assign({}, ...res.data.weather)

        cityName.textContent = res.data.name
        weather.textContent = status.description
        temperature.textContent =  Math.floor(temp) + '°C';
        humidity.textContent = hum + '%';
        warning.textContent = '';
        input.value = '';

if(status.id >= 200 && status.id < 300){
    photo.setAttribute('src', "zdjecia/thunderstorm.png")
} else if (status.id >= 300 && status.id < 400) {
    photo.setAttribute('src', "zdjecia/drizzle.png");
} else if (status.id >= 500 && status.id < 600) {
    photo.setAttribute('src', "zdjecia/rain.png");
} else if (status.id >= 600 && status.id < 700) {
    photo.setAttribute('src', "zdjecia/ice.png");
} else if (status.id >= 700 && status.id < 800) {
    photo.setAttribute('src', "zdjecia/fog.png");
} else if (status.id === 800 ) {
    photo.setAttribute('src', "zdjecia/sun.png");
} else if (status.id >= 800 && status.id < 900) {
    photo.setAttribute('src', "zdjecia/cloud.png");
}
else {
    photo.setAttribute('src', 'zdjecia/unknown.png');
}
    })
.catch(() => warning.textContent = 'Wpisz poprawną nazwę miasta.')
};


const enterCheck = () => {
    if(event.keyCode === 13) {
        getWeather();
    }
}


getWeather();
btn.addEventListener('click', getWeather)
input.addEventListener('keyup', enterCheck)