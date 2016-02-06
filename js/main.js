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




function getEvents(debaserURL) {
  $.getJSON(debaserURL, function(data) {
    var html = '';
    $.each(data, function(i, data){

      $('#events-ul').empty();
      html += '<li class="list-group-item text-center"><span class="info-span">'+data.Event+'</span><br>'
      html += '<span class="info-span">'+data.Admission+'</span><br>'
      html += '<span class="info-span">Venue: '+data.Venue+'</span><br>'
      html += '<a href="' + data.EventUrl + '" target="_blank"><img src="' + data.ImageUrl + '"></a></li>'

    });
    $('#events-ul').html(html);
  });
};

$("#input-date").change(function() {
    $('#events-ul').empty();

    var dateChoice = $("#input-date").val().split('-');
    var year=dateChoice[0];
    var month=dateChoice[1];
    var day=dateChoice[2];
    var date = year + month + day;

    debaserURL = 'http://www.debaser.se/debaser/api/?version=2&method=getevents&venue=medis&venue=strand&from='+date+'&to='+date+'&format=json&callback=?';
    getEvents(debaserURL);

});

$("li").click(function() {
    $('#events-ul').empty();
    var venue = $(this).attr('id');

    var dateChoice = $("#input-date").val().split('-');
    var year=dateChoice[0];
    var month=dateChoice[1];
    var day=dateChoice[2];
    var date = year + month + day;

    debaserURL = 'http://www.debaser.se/debaser/api/?version=2&method=getevents&venue='+venue+'&from='+date+'&to='+date+'&format=json&callback=?';
    getEvents(debaserURL);

});
