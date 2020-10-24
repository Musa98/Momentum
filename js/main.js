//DOM ELEMENTS
const monthDay = document.getElementById('month-day');
const time = document.getElementById('time');
const greeting = document.getElementById('greeting');
const name = document.getElementById('name');
const focus = document.getElementById('focus');

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
    let hour = today.getHours();
    if(hour > 6 && hour < 12){
        document.body.style.backgroundImage = "url('../Momentum/img/morning.jpg')";
        greeting.textContent = 'Good Morning,';
        document.body.style.color = 'white';
    } else if(hour > 12 && hour < 18) {
        document.body.style.backgroundImage = "url('../Momentum/img/day.jpg')";
        greeting.textContent = 'Good Afternoon,';
    } else if(hour > 18 && hour < 24){
        document.body.style.backgroundImage = "url('../Momentum/img/evening.jpg')";
        greeting.textContent = 'Good Evening,';
        document.body.style.color = 'white';
    } else{
        document.body.style.backgroundImage = "url('../Momentum/img/night.jpg')";
        greeting.textContent = 'Good Night,';
        document.body.style.color = 'white';
    }
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
    //e.target.focus();
}
//localStorage.setItem('focus', 'hello');
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