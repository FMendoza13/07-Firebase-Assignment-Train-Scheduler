$(document).ready(function() {
// Firebase link
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
$("#addTrainBtn").on("click", function(){

    var trainName = $("trainNameInput").val.trim();
    var lineName = $("#lineInput").val().trim();
    var destination = $("#destinationInput").val().trim();
    var trainTimeInput = moment($("#trainTimeInput").val().trim(), "HH:mm").subtract(10, "years").format("X");;
    var frequencyInput = $("#frequencyInput").val().trim();

    console.log(trainName);
    console.log(lineName);
    console.log(destination);
    console.log(trainTimeInput);
    console.log(frequencyInput);

    // temporary holds train info for firebase
    var newTrain = {
        name: trainName,
        line: lineName,
        destination: destination,
        trainTime: trainTimeInput,
        frequency: frequencyInput,
    }
    // push data to firebase
    trainData.push(newTrain);

    $("#trainNameInput").val("");
    $("#lineInput").val("");
    $("#destinationInput").val("");
    $("#trainInput").val("");
    $("#frequencyInput").val("");

    return false;
});
    trainData.on("child_added", function(childSnapshot, prevChildKey){

        console.log(childSnapshot.val());

        var firebaseName = childSnapshot.val().name;
        var firebaseLine = childSnapshot.val().line;
        var firebaseDestination = childSnapshot.val().destination;
        var firebaseTrainTimeInput = childSnapshot.val().trainTime;
        var firebaseFrequency = childSnapshot.val().frequency;

        
		var diffTime = moment().diff(moment.unix(firebaseTrainTimeInput), "minutes");
		var timeRemainder = moment().diff(moment.unix(firebaseTrainTimeInput), "minutes") % firebaseFrequency;
        var minutes = firebaseFrequency - timeRemainder;
        
        var nextTrainArrival = moment().add(minutes, "m").format("hh:mm");

        console.log(minutes);
        console.log(nextTrainArrival);
        console.log(moment().format("hh:mm A"));
        console.log(nextTrainArrival);
        console.log(moment().format("X"));

        $("#trainTable > tbody").append("<tr><td>" + firebaseName + "</tr><td>" + firebaseLine + "</tr><td>" + firebaseDestination + "</tr><td>" + firebaseFrequency + " mins" + "</tr><td>" + nextTrainArrival + "</tr><td>" + minutes + "</tr><td>");
});

});