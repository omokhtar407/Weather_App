"use strict";

const days=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const monthNames = ['Jan','Feb','March','April','May','June','July','Aug','Spet','Oct','Nov','Dec'];

// For Today Weather Section
let Today = document.getElementById("today"),
    Month = document.getElementById("month"),
    Location_F = document.getElementById("location_f"),
    Degree = document.getElementById("degree"),
    IcoWeather = document.getElementById("iconWeather"),
    Custom = document.getElementById("custom"),
    Hunmidity = document.querySelector("#hunmidity"),
    Wind_kph = document.querySelector("#wind_kph"),
    Wind_Air = document.querySelector("#wind_Air"),
    NowDate = new Date(),
    ApiResponse,ApiData;

//Next Days Variables:
let nextDay = document.getElementsByClassName("nextDay"),
nextDate = document.getElementsByClassName("nextDate"),
nextDayIcon = document.getElementsByClassName("nextDay-icon"),
maxDegree = document.getElementsByClassName("max-degree"),
minDegree = document.getElementsByClassName("min-degree"),
nextDayCustom = document.getElementsByClassName("nextDay_custom");


// Get Data From Api
async function GetWeatherData(loc = 'cairo'){
    ApiResponse =await fetch(`https://api.weatherapi.com/v1/forecast.json?key=eb02fc9a25954cb1ba0175848211409&q=${loc}&days=3`)
    if(ApiResponse.ok && ApiResponse.status != 400){
        ApiData = await ApiResponse.json();
    
        DisplayTodayWeather();
        displayNextDaysWeather()
    }
}

function DisplayTodayWeather(){

        let dateForecost = ApiData.forecast.forecastday[0].date;
        let date_components =  dateForecost.split("-");
        let current_day = date_components[2];
        
        Today.innerHTML =  `${days[NowDate.getDay()]}`;
        Month.innerHTML = `${current_day} ${monthNames[NowDate.getMonth()]}`;
        Location_F.innerHTML = ApiData.location.name;
        Degree.innerHTML = Math.round(ApiData.current.temp_c);
        IcoWeather.setAttribute("src", `http:${ApiData.current.condition.icon}`);
        Custom.innerHTML = ApiData.current.condition.text;
        Hunmidity.innerHTML = ApiData.current.humidity;
        Wind_kph.innerHTML = ApiData.current.wind_kph;
        Wind_Air.innerHTML = ApiData.current.wind_dir;
}

// get NextDays
function getNextDays(nextDateApi){
    let d = new Date(nextDateApi);
    return d && days[d.getDay()];
}

// get NexrMonths
function getNextDayMonth(nextDateApi){
    let m = new Date(nextDateApi);
    return m && monthNames[m.getMonth()];
}

//Display Next Days Data:
function displayNextDaysWeather() {
    for(let i = 0;  i < nextDay.length; i++)
    {   
        let nextDateApi = ApiData.forecast.forecastday[i+1].date;
        let nextDate_components = nextDateApi.split("-");
        let next_day = nextDate_components[2];
        
        nextDay[i].innerHTML = getNextDays(nextDateApi);
        nextDate[i].innerHTML = `${next_day} ${getNextDayMonth(nextDateApi)}`;
        nextDayIcon[i].setAttribute("src", `https:${ApiData.forecast.forecastday[i+1].day.condition.icon}`);
        maxDegree[i].innerHTML = Math.round(ApiData.forecast.forecastday[i+1].day.maxtemp_c);
        minDegree[i].innerHTML = Math.round(ApiData.forecast.forecastday[i+1].day.mintemp_c);
        nextDayCustom[i].innerHTML= ApiData.forecast.forecastday[i+1].day.condition.text;
        
    }
};

let locationInput = document.getElementById('location');
locationInput.addEventListener('keyup',function(){
    GetWeatherData(locationInput.value);
})

//Onload Calling Function:
GetWeatherData();


// validation subscribe 
let Btn = document.getElementById('BtnSubEmail');
let userSubEmailInput = document.getElementById('userEmail')
function validateUserSubEmail(){
    let regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{3,}$/;
    if(regex.test(userSubEmailInput.value) == true){
        Btn.disabled =!1;
        return true;
    }
    else{
        Btn.disabled =!0;
        return false;
    }
  }
  userSubEmailInput.addEventListener('keyup',function () {
    validateUserSubEmail();
  });
  
  let formSub = document.getElementById('subscrib_form');
  
  formSub.addEventListener('submit',function(e){
        e.preventDefault();
    
        if(validateUserSubEmail() == true){
            Btn.disabled =!1;
        }
        else{
            Btn.disabled=!0;
        }
  });
  /* End Subscribe Validation */