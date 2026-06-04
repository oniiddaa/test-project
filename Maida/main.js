document.getElementById("search").addEventListener("keyup", function() {
    let value = this.value.toLowerCase();
    let cards = document.querySelectorAll(".model-card");

    cards.forEach(card => {
        let text = card.innerText.toLowerCase();

        if(text.includes(value)){
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
});