//DOM ELEMENTS
const monthDay = document.getElementById('month-day');
const time = document.getElementById('time');
const greeting = document.getElementById('greeting');
const name = document.getElementById('name');
const focus = document.getElementById('focus');

//GLOBAL
const imagesElements = ['../Momentum/img/morning/','../Momentum/img/day/','../Momentum/img/evening/','../Momentum/img/night/']
const images = ['01.jpg', '02.jpg', '03.jpg','04.jpg', '05.jpg', '06.jpg', '07.jpg', '08.jpg', '09.jpg', '10.jpg',
                '11.jpg', '12.jpg', '13.jpg', '14.jpg', '15.jpg', '16.jpg', '17.jpg', '18.jpg', '19.jpg', '20.jpg'];
const btn = document.querySelector('.btn');
let iAll = 1;
let i = 0;
let baseSrc = '';

//const showAmPm = true;

//VIEW TIME
const showTime = () =>{
    const week = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    const nameMonth = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    let today = new Date();
    let month = today.getMonth();
    let day = today.getDate();
    let dayWeek = today.getDay();
    let hour = today.getHours();
    let min = today.getMinutes();
    let sec = today.getSeconds();

    //Set AM or PM
    // const amPm = hour >= 12 ? 'PM' : 'AM';


    //Output Time
    monthDay.innerHTML = `${week[dayWeek]}, ${day} ${nameMonth[month]}`;
    time.innerHTML = `${addZero(hour)}<span>:</span>${addZero(min)}<span>:</span>${addZero(sec)}`
    // ${showAmPm ? amPm : ''}
    setTimeout(showTime,1000);
}

//Add Zeros

const addZero = (n) =>{
    return (+n < 10 ? '0' : '') + n;
}

//Set Background and Greeting
const SetBgGreed = () =>{
    let today = new Date();
    //let today = new Date(2020, 9, 24, 0, 0, 0, 0);
    let hour = today.getHours();
    if(hour >= 6 && hour < 12){
        greeting.textContent = 'Good Morning,';
        document.body.style.color = 'white';
        baseSrc = imagesElements[0];
        allImageSrc = baseSrc;
        getImage(baseSrc);
    } else if(hour >= 12 && hour < 18) {
        greeting.textContent = 'Good Afternoon,';
        baseSrc = imagesElements[1];
        allImageSrc = baseSrc;
        getImage(baseSrc);
    } else if(hour >= 18 && hour < 24){
        greeting.textContent = 'Good Evening,';
        document.body.style.color = 'white';
        baseSrc = imagesElements[2];
        allImageSrc = baseSrc;
        getImage(baseSrc);
    } else if(hour >= 0 && hour < 6){
        greeting.textContent = 'Good Night,';
        document.body.style.color = 'white';
        baseSrc = imagesElements[3];
        allImageSrc = baseSrc;
        getImage(baseSrc);
    }
    setTimeout(SetBgGreed,3600000);
}

//GET NAME
const getName = () =>{
    if(localStorage.getItem('name') === null){
        name.textContent = '[Enter Name]';
    }else {
        name.textContent = localStorage.getItem('name');
    }
}

//Set Name
const setName = (e) =>{
    if(e.type === 'keypress'){
        //Make sure enter is pressed
        if(e.which == 13 || e.code == 13){
            localStorage.setItem('name', e.target.innerText);
            name.blur();
        }
    } else{
        name.textContent = localStorage.getItem('name');
    }
}

//GET FOCUS
const getFocus = () =>{
    if(localStorage.getItem('focus') === null){
        focus.textContent = '[Enter Focus]';
    }else {
        focus.textContent = localStorage.getItem('focus');
    }
}

//SET FOCUS
const setFocus = (e) =>{
    if(e.type === 'keypress'){
        //Make sure enter is pressed
        if(e.which == 13 || e.code == 13){
            localStorage.setItem('focus', e.target.innerText);
            focus.blur();
        }
    } else{
        focus.textContent = localStorage.getItem('focus');
    }
}

const refreshText = (e) =>{
    e.target.textContent = ' ';
}

//RefreshCity
const refreshTextCity = (e) =>{
    e.target.textContent = '';
}

// Make Background

function viewBgImage(data) {
    const body = document.querySelector('body');
    const src = data;
    const img = document.createElement('img');
    img.src = src;
    img.onload = () => {      
      body.style.backgroundImage = `url(${src})`;
    }; 
  }
function getImage(baseSrc) {
    const index = i % images.length;
    const imageSrc = baseSrc + images[index];
    viewBgImage(imageSrc);
    i++;
}

const viewAllImage = () =>{
    if(iAll < 20){
        btn.disabled = true;
        const index = iAll % images.length;
        const imageSrc = allImageSrc + images[index];
        viewBgImage(imageSrc);
        iAll++;
        console.log(iAll);
        setTimeout(viewAllImage,3000);
    } else if(allImageSrc !== imagesElements[3]){
        let indexImagesElements = imagesElements.indexOf(allImageSrc);
        allImageSrc = imagesElements[indexImagesElements + 1];
        iAll = 0;
        viewAllImage();
        console.log(allImageSrc);
    }
    else{
        allImageSrc = baseSrc;
        const index = i % images.length;
        const imageSrc = baseSrc + images[index - 1];
        iAll = 1;
        btn.disabled = false;
        viewBgImage(imageSrc);
    }
    //setTimeout(function() { btn.disabled = false }, 60000);
}

//Get quote
const blockquote = document.querySelector('blockquote');
const figcaption = document.querySelector('figcaption');
const btnQuote = document.querySelector('.btnQuote');

// если в ссылке заменить lang=en на lang=ru, цитаты будут на русском языке
// префикс https://cors-anywhere.herokuapp.com используем для доступа к данным с других сайтов если браузер возвращает ошибку Cross-Origin Request Blocked 
async function getQuote() {  
  const url = `https://quotes-cors.herokuapp.com/`;
  const res = await fetch(url);
  const data = await res.json(); 
  blockquote.textContent = data.quoteText;
  figcaption.textContent = data.quoteAuthor;
}

//Get Weather
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const humidity = document.querySelector('.humidity');
const wind = document.querySelector('.wind');
const city = document.querySelector('.city');

async function getWeather() {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.textContent}&lang=ru&appid=2116f6fb6fce6f2e8dd7b514b6ccf27c&units=metric`;
    const res = await fetch(url);
    const data = await res.json();

    weatherIcon.className = 'weather-icon owf';
    if(!data.weather){
        city.textContent = 'Error';
        temperature.textContent = ``;
        humidity.textContent = ``;
        wind.textContent = ``;
    } else{
        weatherIcon.classList.add(`owf-${data.weather[0].id}`);
        temperature.textContent = `${data.main.temp}°C`;
        humidity.textContent = `${data.main.humidity}%`;
        wind.textContent = `${data.wind.speed}м/c`;
    }
  }

//Get City
const getCity = () =>{
    if(localStorage.getItem('city') === null){
        city.textContent = '[Enter City]';
    }else {
        city.textContent = localStorage.getItem('city');
    }
}

//Set City

function setCity(e) {
  if(e.type === 'keypress'){
    if (e.code === 'Enter') {
        getWeather();
        localStorage.setItem('city', e.target.innerText);
        city.blur();
      }
  }
 else {
    city.textContent = localStorage.getItem('city');
  }
}

//Call weather
city.addEventListener('click', refreshTextCity);
document.addEventListener('DOMContentLoaded', getWeather);
city.addEventListener('keypress', setCity);
city.addEventListener('blur', setCity)

//Call quote
document.addEventListener('DOMContentLoaded', getQuote);
btnQuote.addEventListener('click', getQuote);

btn.addEventListener('click', viewAllImage)
name.addEventListener('click', refreshText);
name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);
focus.addEventListener('click', refreshText);
focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', setFocus);

//Run
showTime();

SetBgGreed();

getName();

getFocus();

getCity();