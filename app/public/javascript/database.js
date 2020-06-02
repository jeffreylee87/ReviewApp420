var firebaseConfig = {
    apiKey: "AIzaSyDeUNYKehxR7R7wKqYqBPlvH30Y9uIxL4k",
    authDomain: "tryingsomething-32e47.firebaseapp.com",
    databaseURL: "https://tryingsomething-32e47.firebaseio.com",
    projectId: "tryingsomething-32e47",
    storageBucket: "tryingsomething-32e47.appspot.com",
    messagingSenderId: "477684355300",
    appId: "1:477684355300:web:c83eede853f582826a1cf1"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);


var database = firebase.database();

// 2. Button for adding Employees
$("#add-strain-btn").on("click", function (event) {
    event.preventDefault();
console.log("I clicked");
    // Grabs user input
    var strainName = $("#strain-name-input").val().trim();
    var brandName = $("#brand-input").val().trim();
    var dispensaryName = $("#brand-input").val().trim();
    var purchaseDate = moment($("#start-input").val().trim(), "MM/DD/YYYY").format("X");
    var costPerEighth = $("#rate-input").val().trim();
    var description = $("#description-input").val().trim();

    // Creates local "temporary" object for holding employee data
    var newReview = {
        strain: strainName,
        brand: brandName,
        dispensary: dispensaryName,
        pDate: purchaseDate,
        costPer8th: costPerEighth,
        desc: description
    };

    // Uploads review data to the database
    database.ref().push(newReview);

    // Logs everything to console
    console.log(newReview.strain);
    console.log(newReview.brand);
    console.log(newReview.dispensary);
    console.log(newReview.pDate);
    console.log(newReview.costPer8th);
    console.log(newReview.desc)

    alert("Employee successfully added");

    // Clears all of the text-boxes
    $("#strain-name-input").val("");
    $("#brand-input").val("");
    $("#dispensary-input").val("");
    $("#start-input").val("");
    $("#rate-input").val("");
    $("#description-input").val("");
});

// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function (childSnapshot) {
    console.log("Jeff needs to be here");
    console.log(childSnapshot.val());

    // Store everything into a variable.
    var storedStrain = childSnapshot.val().strain;
    var storedBrand = childSnapshot.val().brand;
    var storedDispensary = childSnapshot.val().dispensary;
    var storedPurchaseDate = childSnapshot.val().pDate;
    var storedCost = childSnapshot.val().costPer8th;
    var storedDescription = childSnapshot.val().desc;

    // Log Review Info
    console.log(storedStrain);
    console.log(storedBrand);
    console.log(storedDispensary);
    console.log(storedCost);
    console.log(storedPurchaseDate);
    console.log(storedDescription);

    // Prettify the purchase dat3e
    var datePretty = moment.unix(storedPurchaseDate).format("MM/DD/YYYY");

    // Create the new row
    var newRow = $("<tr>").append(
        $("<td>").text(storedStrain),
        $("<td>").text(storedBrand),
        $("<td>").text(storedDispensary),
        $("<td>").text(storedCost),
        $("<td>").text(datePretty),
        $("<td>").text(storedDescription)
    );

    // Append the new row to the table
    $("#review-table > tbody").append(newRow);
});