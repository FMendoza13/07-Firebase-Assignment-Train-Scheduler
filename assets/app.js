$(document).ready(function() {
// Firebase link
<script>

  var config = {
    apiKey: "AIzaSyCm2k5RZ891YjEP8z1nTWYGFs2Ui8Zdadw",
    authDomain: "train-schedule-d1da5.firebaseapp.com",
    databaseURL: "https://train-schedule-d1da5.firebaseio.com",
    pro jectId: "train-schedule-d1da5",
    storageBucket: "train-schedule-d1da5.appspot.com",
    messagingSenderId: "997545934192"
  };
  firebase.initializeApp(config);
</script>

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
})

});