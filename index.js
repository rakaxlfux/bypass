// Get the input box and the text elements
var inputBox = document.getElementById("input-box");
var hwidText = document.getElementById("hwid-text");

// Add an event listener to the input box for key press
inputBox.addEventListener("keypress", function(event) {
    // Get the code of the pressed key
    var code = event.keyCode || event.which;
    // If the key is enter (code 13), call the API with the input value
    if (code === 13) {
        callAPI(inputBox.value);
    }
});

// Define the function to call the API
function callAPI(hwid) {
    // Create a new XMLHttpRequest object
    var xhr = new XMLHttpRequest();

    // Construct the URL with the hwid parameter
    var url = 'https://stickx.top/api-fluxus/?hwid=' + hwid;

    // Open a GET request to the URL
    xhr.open('GET', url, true);

    // Define what to do when the request is ready
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            // Display the response from the API on the input element
            document.querySelector(".api-response").value = xhr.responseText; // Change this line
        } else {
            // Log the error message
            console.log('Failed to retrieve data from API');
        }
    };

    // Send the request
    xhr.send();
}

// Modify the function to display the API response
xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
        // Get the key from the response
        var key = xhr.responseText.split(":")[1]; // Assuming the response is in the format of "HWID:KEY"
        // Get the div element with the id of "api-response"
        var div = document.getElementById("api-response");
        // Set the innerHTML of the div element to the key
        div.innerHTML = key;
        // Get the input element with the class of "api-response"
        var input = document.querySelector("api-response");
        // Move the div element to the input element as a child
        input.appendChild(div);
    } else {
        // Log the error message
        console.log('Failed to retrieve data from API');
    }
};


// Modify the function to copy the text
function copyText() {
    // Get the input element with the class of "api-response"
    var input = document.querySelector(".api-response");
    // Get the value of the input element
    var value = input.value;
    // Copy the value to the clipboard
    navigator.clipboard.writeText(value);
    // Alert the user that the value has been copied
    alert("Key has been successfully copied to clipboard");
}
