document.getElementById("contactForm")
.addEventListener("submit", function(event){

    event.preventDefault();

    let firstName = document.getElementById("firstName").value;
    let lastName = document.getElementById("lastName").value;
    let email = document.getElementById("email").value;
    let description = document.getElementById("description").value;

    const button = this.querySelector("button");

    button.innerText = "✓ Message Sent";
    button.style.background = "#00c853";

    alert(
        "Message Submitted!\n\n" +
        "First Name: " + firstName +
        "\nLast Name: " + lastName +
        "\nEmail: " + email +
        "\nDescription: " + description
    );

    setTimeout(() => {
        button.innerText = "Submit Message";
        button.style.background = "orange";
        this.reset();
    }, 2500);
});
const bikes = [
    "KTM Duke 390",
    "KTM RC 390",
    "KTM Adventure 890"
];

let output = "";


bikes.forEach(bike => {
    output += "<p class='bike-item'>" + bike + "</p>";
});


document.querySelector(".info-box").innerHTML += output;