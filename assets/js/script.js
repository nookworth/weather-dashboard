setInterval(getTime, 1000);

var userCity = $("#citySearch").val().trim().replace(/\s+/g, "");
var latitude;
var longitude;

function getTime() {
  var dateAndTime = moment().format("dddd, MMMM Do hh:mm:ss");
  $("#clock").text(dateAndTime);
}

function getDate() {
  var date = moment().format("dddd, MMMM Do");
  $("#displayDate").text(date);
}

getDate();

// function apiCall(targetCity) {
//   //retrieve text from search field

//   //create variables to pass into the openweather api later
//   var latitude = "";
//   var longitude = "";
//   var weatherData;

//   //get the latitude and longitude of the city name entered by the user
//   fetch(
//     "https://maps.googleapis.com/maps/api/geocode/json?address=" +
//       targetCity +
//       "&key=AIzaSyD7XENTmCJN82w00dfJBe5QeaoVy0iklsE"
//   )
//     .then(function (response) {
//       return response.json();
//     })
//     .then(function (data) {
//       latitude = data.results[0].geometry.location.lat;
//       longitude = data.results[0].geometry.location.lng;
//       return latitude, longitude;
//     });

//   //create weather API search query
//   fetch(
//     "https://api.openweathermap.org/data/2.5/onecall?lat=" +
//       latitude +
//       "&lon=" +
//       longitude +
//       "&appid=548993a530ff8dda2b57c4809c1f7e17"
//   )
//     .then(function (response) {
//       return response.json();
//     })
//     .then(function (data) {
//       weatherData = data;
//       console.log(weatherData);
//       return weatherData;
//     });
// }

//create event listener for the city search field
$("#citySearch").on("keyup", function (e) {
  //check if the Enter key was pressed
  if (e.keyCode == 13 && $("#citySearch").val().trim() !== "") {
    //get the city name that the user typed in
    var cityName = $("#citySearch").val().trim();
    //add a new button to the history list and name it
    $(".history").append(
      '<button type="button" class="list-group-item list-group-item-action">' +
        cityName +
        "</button>"
    );

    $("#city-name-current").text(cityName);
    $("#date-current").text(moment().format("dddd, MMMM Do, YYYY"));

    //retrieve the latitude and longitude of the user's chosen city
    fetch(
      "https://maps.googleapis.com/maps/api/geocode/json?address=" +
        cityName +
        "&key=AIzaSyD7XENTmCJN82w00dfJBe5QeaoVy0iklsE"
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        latitude = data.results[0].geometry.location.lat;
        longitude = data.results[0].geometry.location.lng;
        console.log(latitude, longitude);
        return latitude, longitude;
      });

    //create weather API search query
    fetch(
      "https://api.openweathermap.org/data/2.5/onecall?lat=" +
        latitude +
        "&lon=" +
        longitude +
        "&appid=548993a530ff8dda2b57c4809c1f7e17"
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        document.getElementById("temperature-current").textContent =
          data.current.temp;
        document.getElementById("humidity-current").textContent =
          data.current.humidity;
        document.getElementById("wind-speed-current").textContent =
          data.current.wind_speed;
      });
  }

  // apiCall(userCity);
});

//function to write weather data from the API into the "current weather" collapse
function writeCurrentWeather() {
  //parse JSON string for the data we want: current.temp, current.humidity, current.wind_speed, current.uvi, current.weather.main
  //set first bullet point to the name of the city they searched for
  //set second bullet point to today's date
  //use an icon to represent current.weather.main for the third bullet point
  //set the 4th-6th bullet points to current.temp, current.humidity, current.wind_speed
  //set the last bullet point to current.uvi
}
