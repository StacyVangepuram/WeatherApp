// http://api.weatherapi.com/v1/current.json?key=738dde0f13084db9822161002250409&q=Mumbai&aqi=no



const temperatureField = document.querySelector('.temp');
const locationField = document.querySelector('.time_location p');
const dateandTimeField = document.querySelector('.time_location span');
const conditionField = document.querySelector('.condition p');
const searchField = document.querySelector('.search_area');
const searchbutton = document.querySelector('.search_button');
const form = document.querySelector('form');
const container = document.querySelector('.container'); // ✅ Select container

form.addEventListener('submit',searchForLocation);

let target = 'Mumbai';

const fetchResults = async (targetLocation) =>{
        let url = `http://api.weatherapi.com/v1/current.json?key=738dde0f13084db9822161002250409&q=${targetLocation}&aqi=no`;

        const res = await fetch(url);

        const data = await res.json();

        console.log(data);


        let locationName = data.location.name;
        let time = data.location.localtime;

        let temp = data.current.temp_c;

        let condition = data.current.condition.text;

        updateDetails(temp, locationName, time, condition);
}

function updateDetails(temp, locationName, time, condition){

        let splitDate = time.split(" ")[0];

        let splitTime = time.split(" ")[1];
        
        let currentDay = getDayName(new Date(splitDate).getDay());
    
        temperatureField.innerText = temp;
        locationField.innerText = locationName;
        dateandTimeField.innerText = `${splitDate} ${currentDay} ${splitTime}`;
        conditionField.innerText = condition;
 
         changeBackgroundColor(temp);

}

function searchForLocation(e){
        e.preventDefault();

        target = searchField.value;

        fetchResults(target);
}


fetchResults(target);


function getDayName(number){
        switch(number){
                case 0:
                   return "Sunday";
                case 1: 
                   return "Monday";
                case 2: 
                  return "Tuesday";
                case 3:
                   return "Wednesday";
                case 4:
                   return "Thursday";
                case 5:
                   return "Friday";
                case 6:
                   return "Saturday";
                
        }
}

function changeBackgroundColor(temp) {
    let bgColor;
    if (temp <= 10) {
        bgColor = "#00BFFF"; // Cold: Light Blue
    } else if (temp > 10 && temp <= 20) {
        bgColor = "#87CEEB"; // Cool: Sky Blue
    } else if (temp > 20 && temp <= 30) {
        bgColor = "#FFD700"; // Warm: Yellow
    } else if (temp > 30 && temp <= 40) {
        bgColor = "#FF8C00"; // Hot: Orange
    } else {
        bgColor = "#FF4500"; // Very Hot: Red
    }
    if (container) {
        container.style.backgroundColor = bgColor; // ✅ Change container bg color instead of body
    }
}