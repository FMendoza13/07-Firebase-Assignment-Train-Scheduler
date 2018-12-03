// Initialize Firebase
var config = {
  apiKey: "AIzaSyCm2k5RZ891YjEP8z1nTWYGFs2Ui8Zdadw",
  authDomain: "train-schedule-d1da5.firebaseapp.com",
  databaseURL: "https://train-schedule-d1da5.firebaseio.com",
  projectId: "train-schedule-d1da5",
  storageBucket: "train-schedule-d1da5.appspot.com",
  messagingSenderId: "997545934192"
};
firebase.initializeApp(config);

console.log(firebase);

var database = firebase.database();

// Train button
$("#addTrain").on("click", function(event) {
  event.preventDefault();

  var trainName = $("#trainNameInput").val().trim();
  var destination = $("#destinationInput").val().trim();
  var trainTimeInput = $("#trainTimeInput").val().trim();
  var frequencyInput = $("#frequencyInput").val().trim();

  console.log(trainName);
  console.log(destination);
  console.log(trainTimeInput);
  console.log(frequencyInput);

  // temporary holds train info for firebase
  // push data to firebase
  database.ref().push({
    name: trainName,
    destination: destination,
    trainTime: trainTimeInput,
    frequency: frequencyInput,
    dateAdded: firebase.database.ServerValue.TIMESTAMP
  });

  // text boxes
  $("#trainNameInput").val("");
  $("#destinationInput").val("");
  $("#trainTimeInput").val("");
  $("#frequencyInput").val("");
});

database.ref().on("child_added", function(childSnapshot) {
    var nextTrain;

    // assign firebase snapshot variables
    var trainStart = childSnapshot.val().trainTimeInput;
    console.log(trainStart);

    // Pushing the start time back 1 yr to ensure it comes before the current time
    var trainStartConv = moment(trainTimeInput, "HH:mm").subtract(1, "years");
    console.log(trainStartConv);

    // calculate the difference between current time and train time input
    var diffTime = moment().diff(moment(trainStartConv), "minutes");
    console.log(diffTime);

    //calculate time apart
    var timeApart = diffTime % childSnapshot.val().frequencyInput;
    console.log(timeApart);

    // calculate minutes till next train
    var minutesTillTrain = childSnapshot.val().frequencyInput - timeApart;
    console.log("MINUTES TILL TRAIN: " + minutesTillTrain);

    var nextTrain = moment()
      .add(minutesTillTrain, "minutes")
      .format("hh:mm");

    var trainName = $("<td>").text(childSnapshot.val().trainName);
    var destination = $("<td>").text(childSnapshot.val().destination);
    var trainTimeInput = $("<td>").text(childSnapshot.val().trainTimeInput);
    var frequencyInput = $("<td>").text(childSnapshot.val().frequencyInput);

    var newRow = $("<tr>");

    newRow.append(
      trainName,
      destination,
      frequencyInput,
      nextTrain,
      minutesTillTrain
    );

    $("#schedule").append(newRow);
  },
  function(errorObject) {
    console.log("Errors: " + errorObject);
  }
);
