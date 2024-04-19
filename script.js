
let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function showSlides(n) {
    let i;
    const slides = document.getElementsByClassName("slide");
    if (n > slides.length) {slideIndex = 1}    
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }
    slides[slideIndex-1].style.display = "block";  
    
}

setInterval(function() {
    plusSlides(1);
}, 3000);
///////////////////////////เลื่อน Slide/////////////////////////////////
function showSlide(slideIndex) {
    var slides = document.querySelectorAll('.slide');
    var buttons = document.querySelectorAll('.btn');

    // ซ่อนภาพทั้งหมด
    slides.forEach(function(slide) {
        slide.style.display = 'none';
    });

    // แสดงเฉพาะภาพที่มี slideIndex ที่กำหนด
    slides[slideIndex - 1].style.display = 'block';

    // เน้นปุ่มที่ถูกกด
    buttons.forEach(function(button) {
        button.classList.remove('active');
    });
    buttons[slideIndex - 1].classList.add('active');
}
///////////////////////////ทำ ปุ่ม Slide///////////////////////