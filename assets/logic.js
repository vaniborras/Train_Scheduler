// Initialize Firebase
var config = {
  apiKey: "AIzaSyDE-x-qZqyoxhJnLFQ5h4wpgFXglhJBCyA",
  authDomain: "train-scheduler-e9064.firebaseapp.com",
  databaseURL: "https://train-scheduler-e9064.firebaseio.com",
  projectId: "train-scheduler-e9064",
  storageBucket: "train-scheduler-e9064.appspot.com",
  messagingSenderId: "159821535227"
};
firebase.initializeApp(config);

var trainName = "";
var destination = "";
var trainTime = "";
var frequency = "";

$("#submit").on("click", function (event) {

  //firebase.database.ref().on("value", function(snapshot) {
  event.preventDefault()
  trainName = $("#train-name-input").val().trim();
  destination = $("#destination-input").val().trim();
  trainTime = $("#first-train-time-input").val().trim();
  frequency = $("#frequency-input").val().trim();

  firebase.database().ref().push({
    trainName: trainName,
    destination: destination,
    trainTime: trainTime,
    frequency: frequency

  })
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#first-train-time-input").val("");
  $("#frequency-input").val("");
})

  firebase.database.ref().on("child_added", function(childSnapshot, prevChildKey){

    var trainName = childSnapshot.val().name;
    var destination = childSnapshot.val().destination;
    var trainTime = childSnapshot.val().time;
    var frequency = childSnapshot.val().frequency;

    var tableBody = $("#t-body");
    var tableRow = $("<tr>");
    var timeStamp = moment(snapshot.val().firstTrain, "h:mm");
    var minutes = moment().diff(timeStamp, 'minutes') ;
    var tRemainder = minutes % snapshot.val().frequency;
    var minsAway = snapshot.val().frequency - tRemainder;

    var nextTrain = moment().add(minsAway, "minutes");
    var nextTime = moment(nextTrain, "h:mm").format("h:mm").toString();


    tableRow.append("<td>" + snapshot.val().train + "</td>" +
        "<td>" + snapshot.val().dest + "</td>" +
        "<td>" + snapshot.val().frequency + "</td>" +
        "<td>" + nextTime + "</td>" +
        "<td>" + minsAway + "</td>");
    tableBody.append(tableRow);
  })