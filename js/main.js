/* Created by Olga Tarassova 2016 */

/* Example URL to Debaser API
/* http://www.debaser.se/debaser/api/?version=2&method=getevents&venue=...&from=...&to=...&format=json */
  var debaserURL;

/* Set the default today's date for date input */
/* followed an example found on stackoverflow */
$(document).ready(function() {
    var date = new Date();

    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();

    if (month < 10) {
      month = "0" + month;
    }
    if (day < 10) {
      day = "0" + day;
    }

    var today = year + "-" + month + "-" + day;
    $("#input-date").attr("value", today);

    /* Define url variable */
    var dateChoice = $("#input-date").val().split('-');
    var year=dateChoice[0];
    var month=dateChoice[1];
    var day=dateChoice[2];
    var date = year + month + day;

    debaserURL = 'http://www.debaser.se/debaser/api/?version=2&method=getevents&venue=medis&venue=strand&from='+date+'&to='+date+'&format=json&callback=?';
    getEvents(debaserURL);
});

// Function to get all music events as callback from Debaser API
function getEvents(debaserURL) {
  $.getJSON(debaserURL, function(data) {
    var html = '';
    $.each(data, function(i, data){

      html += '<li class="list-group-item text-center"><span class="info-span"><h3>'+data.Event+'</h3></span>'
      html += '<em><span class="info-span">'+data.Admission+'</em></span><br>'
      html += '<em><span class="info-span">Venue: '+data.Venue+'</em></span><br>'
      html += '<a href="' + data.EventUrl + '" target="_blank"><img src="' + data.ImageUrl + '"></a></li>'

    });
    $('#events-ul').html(html);
  });
};

// A modified getEvents function to fix the Debasers bug with callback for only
// Debaser Strand events as it is still gets all events even if the URL calls only
// for Strand events
function getStrandEvents(debaserURL) {
  $.getJSON(debaserURL, function(data) {
    var html = '';
    $.each(data, function(i, data){

      if (data.Venue == "Strand") {
        html += '<li class="list-group-item text-center"><span class="info-span"><h3>'+data.Event+'</h3></span>'
        html += '<em><span class="info-span">'+data.Admission+'</em></span><br>'
        html += '<em><span class="info-span">Venue: '+data.Venue+'</em></span><br>'
        html += '<a href="' + data.EventUrl + '" target="_blank"><img src="' + data.ImageUrl + '"></a></li>'
      }
    });
    $('#events-ul').html(html);
  });
};

// Get Debasers API music events every time the date in Date Input field change
$("#input-date").change(function() {
    $('#events-ul').empty();

    var dateChoice = $("#input-date").val().split('-');
    var year=dateChoice[0];
    var month=dateChoice[1];
    var day=dateChoice[2];
    var date = year + month + day;

    $("#input-date").blur();
    debaserURL = 'http://www.debaser.se/debaser/api/?version=2&method=getevents&venue=medis&venue=strand&from='+date+'&to='+date+'&format=json&callback=?';
    getEvents(debaserURL);
});

// Trigger to filter the music events depending on the user's Venue choice
$("li").click(function() {
    $('#events-ul').empty();
    var venue = $(this).attr('id');

    var dateChoice = $("#input-date").val().split('-');
    var year=dateChoice[0];
    var month=dateChoice[1];
    var day=dateChoice[2];
    var date = year + month + day;

    if (venue == "medis") {
      debaserURL = 'http://www.debaser.se/debaser/api/?version=2&method=getevents&venue='+venue+'&from='+date+'&to='+date+'&format=json&callback=?';
      getEvents(debaserURL);
    }
    else {
      debaserURL = 'http://www.debaser.se/debaser/api/?version=2&method=getevents&venue='+venue+'&from='+date+'&to='+date+'&format=json&callback=?';
      getStrandEvents(debaserURL);
    }
});
