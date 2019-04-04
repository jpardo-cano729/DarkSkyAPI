/*  Exercise 01_11_01

    Whole Spectrum Energy Solutions
    Author: Jonathan Pardo-Cano
    Date: 08.28.18  

    Filename: script.js
*/

"use strict";

// global variables
var selectedCity = "Tucson, AZ"; // default location
var weatherReport = null; // holds our response data
// var to hold the XHR object
var httpRequest = false; // have an XHR object

//function to get a request object
function getRequestObject() {
    // instantiate an XHR object
    try {
        httpRequest = new XMLHttpRequest();
    } catch (errorMessage) {
        document.querySelector("p.error").innerHTML = "Forecast is not supported by your browser";
        document.querySelector("p.error").style.display = "block";
        return false
    }
    return httpRequest;
}

// function is an event handler for onreadystatechange
//get the weather data if successful
function fillWeather() {
    // check the readyState for 4 - done
    if (httpRequest.readyState === 4 && httpRequest.status === 200) {
        weatherReport = JSON.parse(httpRequest.responseText)
        var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        var dateValue = new Date(weatherReport.daily.data[0].time);
        var dayOfWeek = dateValue.getDay();
        var rows = document.querySelectorAll("section.week table tbody tr");
        document.querySelector("section.week table caption").innerHTML = selectedCity;
        // retreive the row cells
        for (var i = 0; i < rows.length; i++) {
            var firstCell = rows[i].getElementsByTagName("td")[0];
            var secondCell = rows[i].getElementsByTagName("td")[1];
            var thirdCell = rows[i].getElementsByTagName("td")[2];
            // set the weekday for the row
            firstCell.innerHTML = days[dayOfWeek];
            if (dayOfWeek + 1 === 7) {
                dayOfWeek = 0
            } else {
                dayOfWeek++;
            }
            // get the percentage of sunlight
            var sun = Math.round((1 - weatherReport.daily.data[i].cloudCover) * 100, 0);
            // change color of sun symbol based on %
            if (sun > 90){
                secondCell.style.color = "rgb(255,171,0)"
            } 
            else if (sun > 80){
                secondCell.style.color = "rgb(255,179,25)"
            }
            else if (sun > 70){
                secondCell.style.color = "rgb(255,188,51)"
            }
            else if (sun > 60){
                secondCell.style.color = "rgb(255,196,77)"
            }
            else if (sun > 50){
                secondCell.style.color = "rgb(255,205,102)"
            }
            else if (sun > 40){
                secondCell.style.color = "rgb(255,213,128)"
            }
            else if (sun > 30){
                secondCell.style.color = "rgb(255,221,153)"
            }
            else if (sun > 20){
                secondCell.style.color = "rgb(255,230,179)"
            }
            else if (sun > 10){
                secondCell.style.color = "rgb(255,238,204)"
            }
            else{
                secondCell.style.color = "rgb(255,247,230)"
            }
            secondCell.style.fontSize = "2.5em";
            thirdCell.innerHTML = sun + "%"
        }

        // turn on table display 
        document.querySelector("section.week table caption").style.display = "block";
        document.querySelector("section.week table").style.display = "inline-block";
        document.querySelector("section.week p.credit").style.display = "block";

    }
}

// get weather on click events on city locations
// and for default city on page loads
function getWeather(evt) {
    var latitude;
    var longitude;
    if (evt.type !== "load") {
        if (evt.target) {
            selectedCity = evt.target.innerHTML;
        } else if (evt.srcElement) {
            selectedCity = evt.srcElement.innerHTML;
        }
    }
    if (selectedCity === "Tucson, AZ") {
        latitude = 37.7577;
        longitude = -122.4376;
    } else if (selectedCity === "Chicago, IL") {
        latitude = 41.8337329;
        longitude = -87.7321555;
    } else if (selectedCity === "Montreal, QC") {
        latitude = 45.5601062;
        longitude = -73.7120832;
    }
    // test for XHR object
    if (!httpRequest) {
        httpRequest = getRequestObject();
    }
    //protect against open request
    httpRequest.abort();
    //target request
    httpRequest.open("get", "solar.php?" + "lat=" + latitude + "&lng=" + longitude, true);
    httpRequest.send();
    // event listner for onreadystatechange
    httpRequest.onreadystatechange = fillWeather;
}

// Retrieve li elements holding city location choices
var locations = document.querySelectorAll("section ul li");
// add click event Listeners to all city location elements
//Event handler will be getWeather function
for (var i = 0; i < locations.length; i++) {
    if (locations[i].addEventListener) {
        locations[i].addEventListener("click", getWeather, false);
    } else if (locations[i].attachEvent) {
        locations[i].attachEvent("onclick", getWeather);
    }
}
// add load event listeners to get weather for default location
//default location
if (window.addEventListener) {
    window.addEventListener("load", getWeather, false);
} else if (window.attachEvent) {
    window.attachEvent("onload", getWeather);
}
