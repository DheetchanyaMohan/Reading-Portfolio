let text = document.getElementById('text');
let plant = document.getElementById('plant');
let clock = document.getElementById('clock');
let desk = document.getElementById('desk');
let bookshelf = document.getElementById('bookshelf');

window.addEventListener('scroll', () => {
    let value = window.scrollY;

    if (value < window.innerHeight) {  // Stop effect after 1 screen height
        text.style.marginTop = value * 2.5 + 'px';
        plant.style.left = value *  1.5 + 'px';
        bookshelf.style.left = value * 1.5 + 'px';
        desk.style.left = value * -1.5 + 'px';
        clock.style.left = value * -1.5 + 'px';
    }
});