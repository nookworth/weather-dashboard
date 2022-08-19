setInterval(getTime, 1000);

function getTime() {
  var time = moment().format("hh:mm:ss");
  $("#clock").text(time);
}

function getDate() {
  var date = moment().format("dddd, MMMM Do");
  $("#displayDate").text(date);
}

getDate();
