  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDE-x-qZqyoxhJnLFQ5h4wpgFXglhJBCyA",
    authDomain: "train-scheduler-e9064.firebaseapp.com",
    databaseURL: "https://train-scheduler-e9064.firebaseio.com",
    projectId: "train-scheduler-e9064",
    storageBucket: "",
    messagingSenderId: "159821535227"
  };
  firebase.initializeApp(config);
   
  var trainName= "";
  var destination= "";
  var trainTime= "";
  var frequency= "";

  $("#submit").on("click", function(){
      trainName = $("#train-name-input").value().trim();
      destination = $("#destination-input").value().trim();
      trainTime = $("#first-train-time-input").value().trim();
      frequency = $("#frequency-input").value().trim();

      firebase.database().ref().set({
          trainName= trainName,
          destination= destination,
          trainTime= trainTime,
          frequency= frequency
      })
  })