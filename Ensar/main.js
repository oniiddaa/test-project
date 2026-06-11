document
.getElementById("contactForm")
.addEventListener("submit", function(event){

    event.preventDefault();

    let firstName =
    document.getElementById("firstName").value;

    let lastName =
    document.getElementById("lastName").value;

    let email =
    document.getElementById("email").value;

    let description =
    document.getElementById("description").value;

    alert(
        "Message Submitted!\n\n" +
        "First Name: " + firstName +
        "\nLast Name: " + lastName +
        "\nEmail: " + email +
        "\nDescription: " + description
    );

    document.getElementById("contactForm").reset();
});