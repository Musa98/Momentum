//DOM ELEMENTS
const time = document.getElementById('time');
const greeting = document.getElementById('greeting');
const name = document.getElementById('name');
const focus = document.getElementById('focus');
const showAmPm = true;

//VIEW TIME
const showTime = () =>{
    let today = new Date();
    let hour = today.getHours();
    let min = today.getMinutes();
    let sec = today.getSeconds();

    //Set AM or PM
    const amPm = hour >= 12 ? 'PM' : 'AM';

    //12hr Format

    hour = hour % 12 || 12;

    //Output Time
    time.innerHTML = `${hour}<span>:</span>${addZero(min)}<span>:</span>${addZero(sec)} ${showAmPm ? amPm : ''}`
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
    if(hour < 12){
        document.body.style.backgroundImage = "url('../img/morning.jpg')";
        greeting.textContent = 'Good Morning';
    } else if(hour < 18) {
        document.body.style.backgroundImage = "url('../img/day.jpg')";
        greeting.textContent = 'Good Afternoon';
    } else if(hour < 21){
        document.body.style.backgroundImage = "url('../img/evening.jpg')";
        greeting.textContent = 'Good Evening';
        document.body.style.color = 'white';
    } else{
        document.body.style.backgroundImage = "url('../img/night.jpg')";
        greeting.textContent = 'Good Night';
        document.body.style.color = 'white';
    }
}

//GET NAME
const getName = () =>{
    if(localStorage.getItem('name') === null){
        name.textContent = '[Enter Name]';
    }else {
        name.textContent = localStorage.getItem('name');
        console.log(localStorage);
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
        localStorage.setItem('name', e.target.innerText);
    }
    console.log(localStorage);
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
        localStorage.setItem('focus', e.target.innerText);
    }
}

name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);
focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', setFocus);

//Run
showTime();

SetBgGreed();

getName();

getFocus();