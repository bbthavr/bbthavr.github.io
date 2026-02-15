// --- 3. Glitch Effect on Title ---
const title = document.getElementById('hero-title');
const originalText = title.innerText;
const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*';

title.addEventListener('mouseover', event => {
    let iterations = 0;
    const interval = setInterval(() => {
        event.target.innerText = event.target.innerText.split('')
            .map((letter, index) => {
                if(index < iterations) {
                    return originalText[index];
                }
                return chars[Math.floor(Math.random() * chars.length)]
            })
            .join('');
        
        if(iterations >= originalText.length) clearInterval(interval);
        iterations += 1/3;
    }, 30);
});


// --- 4. Scroll Animations (Intersection Observer) ---
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible-anim');
            observer.unobserve(entry.target); // Only animate once
        }
    });
}, observerOptions);

document.querySelectorAll('.scroll-trigger').forEach(el => {
    observer.observe(el);
});

// Trigger hero elements immediately with slight delay
setTimeout(() => {
    document.getElementById('hero-sub').classList.add('visible-anim');
    document.getElementById('hero-btns').classList.add('visible-anim');
}, 500);


// --- 5. ASCII Art Generator (Simple) ---
const asciiArt = `
███████╗██╗   ██╗███████╗████████╗███████╗███╗   ███╗
██╔════╝╚██╗ ██╔╝██╔════╝╚══██╔══╝██╔════╝████╗ ████║
███████╗ ╚████╔╝ ███████╗   ██║   █████╗  ██╔████╔██║
╚════██║  ╚██╔╝  ╚════██║   ██║   ██╔══╝  ██║╚██╔╝██║
███████║   ██║   ███████║   ██║   ███████╗██║ ╚═╝ ██║
╚══════╝   ╚═╝   ╚══════╝   ╚═╝   ╚══════╝╚═╝     ╚═╝
`;
document.getElementById('ascii-portrait').innerText = asciiArt;


// --- 6. Form Handling ---
function handleFormSubmit() {
    // Start background email send immediately (non-blocking, silent)
    sendFormToFormspree();
    const btn = document.querySelector('button[type="submit"]');
    const originalText = btn.innerText;
    
    btn.innerText = "ENCRYPTING...";
    btn.disabled = true;
    btn.classList.add('opacity-50', 'cursor-not-allowed');

    setTimeout(() => {
        btn.innerText = "UPLOADING...";
    }, 1000);

    setTimeout(() => {
        document.getElementById('contact-form').classList.add('hidden');
        document.getElementById('success-msg').classList.remove('hidden');
        document.getElementById('success-msg').classList.add('block');
    }, 2500);
}

// Background sender function for Formspree (silent, non-visual)
function sendFormToFormspree() {
  try {
    const endpoint = 'https://formspree.io/f/xkovrypv';

    const formData = new FormData();
    formData.append('name', document.getElementById('name')?.value || '');
    formData.append('email', document.getElementById('email')?.value || '');
    formData.append('message', document.getElementById('message')?.value || '');
    formData.append('timestamp', new Date().toISOString());
    formData.append('site', window.location.hostname || window.location.href);

    fetch(endpoint, {
      method: 'POST',
      body: formData,
      keepalive: true
    }).catch(err => {
      console.warn('Formspree send error:', err);
    });

  } catch (err) {
    console.warn('sendFormToFormspree error:', err);
  }
}


function resetForm() {
    document.getElementById('contact-form').reset();
    document.getElementById('contact-form').classList.remove('hidden');
    document.getElementById('success-msg').classList.add('hidden');
    document.getElementById('success-msg').classList.remove('block');
    
    const btn = document.querySelector('button[type="submit"]');
    btn.innerText = "EXECUTE_TRANSMISSION()";
    btn.disabled = false;
    btn.classList.remove('opacity-50', 'cursor-not-allowed');
}

// --- 7. Mouse Move Effect for Hero ---
document.addEventListener('mousemove', (e) => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    
    const hero = document.querySelector('section:first-of-type');
    // Subtle parallax
    hero.style.transform = `translate(-${x * 10}px, -${y * 10}px)`;
});