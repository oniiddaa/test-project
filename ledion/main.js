
console.log("KTM Home Page loaded successfully!");


const logo = document.querySelector('.logo');
logo.addEventListener('click', () => {
    alert("Welcome to KTM - Ready to Race!");
});

const slides = document.querySelectorAll('.slide');
let current = 0;

setInterval(() => {
    slides[current].classList.remove('active');
    current = (current + 1) % slides.length;
    slides[current].classList.add('active');
}, 4000);