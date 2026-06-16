console.log("KTM Home Page loaded successfully!");

// 1. Slider-i ekzistues
const slides = document.querySelectorAll('.slide');
let current = 0;

setInterval(() => {
    if(slides.length > 0) { // Conditionals check
        slides[current].classList.remove('active');
        current = (current + 1) % slides.length;
        slides[current].classList.add('active');
    }
}, 4000);


// 2. JS Array, Loop dhe DOM Manipulation (Kërkesë nga rregullat)
const extraSpecs = [
    "KTM Duke 390 - Weight: 150kg",
    "KTM RC 390 - Top Speed: 170 km/h",
    "KTM 1290 Super Duke - Torque: 140 Nm"
];

document.getElementById('btnShowSpecs').addEventListener('click', () => {
    const outputDiv = document.getElementById('specsOutput');
    outputDiv.innerHTML = ""; // Fshin përmbajtjen e vjetër
    
    // Krijimi i një elementi UL semantik përmes JS
    const ul = document.createElement('ul');
    ul.className = "list-group text-dark";

    // Loop (Cikël) për të shfletuar Array-n
    extraSpecs.forEach(spec => {
        const li = document.createElement('li');
        li.className = "list-group-item";
        li.innerText = spec;
        ul.appendChild(li);
    });

    outputDiv.appendChild(ul);
});


// 3. Form Validation, Getting & Manipulating Input Values
document.getElementById('ktmForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Ndalon rifreskimin e faqes
    
    // Marrja e vlerave nga inputet (Getting input values)
    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const feedback = document.getElementById('formFeedback');

    // Conditionals (Kushtet e validimit)
    if (username === "" || email === "") {
        feedback.innerHTML = `<div class="alert alert-danger">Ju lutem plotësoni të gjitha fushat!</div>`;
    } else if (!email.includes("@")) {
        feedback.innerHTML = `<div class="alert alert-danger">Email-i nuk është i vlefshëm!</div>`;
    } else {
        // Manipulimi i DOM bazuar në input
        feedback.innerHTML = `<div class="alert alert-success">Faleminderit ${username}! U regjistruat me sukses me emailin: ${email}.</div>`;
        this.reset(); // Pastron formën
    }
});