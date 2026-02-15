// --- 2. Typewriter Effect ---
const words = ["Full Stack Developer", "Cybersecurity Enthusiast", "Open Source Contributor", "System Architect"];
let i = 0;
let timer;

function typeWriter() {
    const heading = document.getElementById("typewriter");
    const word = words[i];
    let currentText = heading.innerText;
    
    if (!this.isDeleting && currentText !== word) {
        heading.innerText = word.substring(0, currentText.length + 1);
        timer = setTimeout(typeWriter, 100);
    } else if (!this.isDeleting && currentText === word) {
        this.isDeleting = true;
        timer = setTimeout(typeWriter, 2000); // Pause at end
    } else if (this.isDeleting && currentText !== "") {
        heading.innerText = word.substring(0, currentText.length - 1);
        timer = setTimeout(typeWriter, 50);
    } else {
        this.isDeleting = false;
        i = (i + 1) % words.length;
        timer = setTimeout(typeWriter, 500);
    }
}
// Start typewriter
setTimeout(typeWriter, 1000);