/*
<!-- A3-->
<!-- Neelendra Mishra-->
<!-- Student ID 40224310-->
<!-- SOEN 287 WEB PROGRAMMING -->
*/


                                                                /*START OF THE CODE*/


// DATE & TIME CODE
var dateTime = document.getElementsByClassName("headerDateTime");

// Printing the current date and time at each each occurrence of dateTime
    function setDateTime() {
        var today = new Date();
        var date = today.toDateString();
        var time = today.toLocaleTimeString();
        for(var i = 0; i < dateTime.length; i++) dateTime[i].innerHTML = time + "<br>" + date;
}

// Continuously refresh the displayed date and time every 25 milliseconds.
    setInterval(setDateTime, 25);


// MAking Changes in findig a cat/dog page using JavaScript
    var findBreedInput = document.getElementById("findBreedInput");
    var findBreedText = document.getElementById("findBreedText");
    var findBreedNone = document.getElementById("findBreedNone");


// Notify the user when no choices are available
    function findEmpty() {
        if(findBreedInput.checked) {
            findBreedText.required = true;
            // return;
        }
        if(findBreedNone.checked){
            findBreedText.required = false;
            // return;
        }
    }


// MAking Changes in giving a cat/dog page using JavaScript
    var giveBreedInput = document.getElementById("giveBreedInput"); //giveGenderMale
    var giveBreedMix = document.getElementById("giveBreedMix");


// Notify the user when no choices are available
        function giveEmpty() {
            if(giveBreedInput.checked) {
                giveBreedText.required = true;
                return;
            }
            if(giveBreedMix.checked){
                giveBreedText.required = false;
                return;
            }
        }

document.getElementById("giveAwayForm").addEventListener("submit", function(event) {

    // Delaying the form submission temporarily by creating a function
             event.preventDefault();


    // Accessing the elements within the form.
            var name = document.getElementById("userName").value.trim();
            var email = document.getElementById("userEmail").value.trim();
            var errorMessage = document.getElementById("errorMessage");


    // Creating a pattern for validating email addresses with a regular expression.
             var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    // Checking the form fields for correctness
            if (name === "" || email === "") {
                errorMessage.textContent = "All fields are required.";
            } else if (!emailPattern.test(email)) {
                errorMessage.textContent = "Please enter a valid email address.";
            } else {
                // If validation passes, submit the form
                errorMessage.textContent = "";
                this.submit();
            }
        });


                                                                   /*END OF THE CODE*/