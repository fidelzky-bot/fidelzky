// Main JavaScript for portfolio interactions and animations

// ============================================
// Navigation
// ============================================

const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Mobile menu toggle
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

// Close mobile menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Smooth scroll for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            const navHeight = document.querySelector('.nav').offsetHeight;
            const targetPosition = targetSection.offsetTop - navHeight;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const nav = document.getElementById('nav');
    if (window.scrollY > 50) {
        nav.style.background = 'rgba(10, 10, 15, 0.95)';
    } else {
        nav.style.background = 'rgba(26, 26, 36, 0.6)';
    }
});

// ============================================
// Typing Animation
// ============================================

function typeWriter(element, text, speed = 100) {
    if (!element || !text) return;
    
    element.textContent = '';
    let i = 0;
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else {
            // Keep cursor blinking
            const cursor = document.getElementById('cursor');
            if (cursor) {
                cursor.style.display = 'inline';
            }
        }
    }
    
    type();
}

// Initialize typing animation when config is loaded
function initTypingAnimation() {
    const typingText = document.getElementById('typingText');
    const heroTitle = document.getElementById('heroTitle');
    
    if (typingText && heroTitle) {
        const text = heroTitle.textContent || 'WordPress Developer & Vibe Coder';
        typeWriter(typingText, text, 80);
    }
}

// Wait for config to load
setTimeout(initTypingAnimation, 500);

// ============================================
// Code Background Animation
// ============================================

function generateCodeBackground() {
    const codeBackground = document.getElementById('codeBackground');
    if (!codeBackground) return;

    const codeSnippets = [
        'function createPortfolio() {',
        '  const code = "awesome";',
        '  return code;',
        '}',
        '',
        'const developer = {',
        '  name: "WordPress Dev",',
        '  skills: ["PHP", "JS", "CSS"],',
        '  vibe: true',
        '};',
        '',
        '<?php',
        '  $theme = "custom";',
        '  echo $theme;',
        '?>',
        '',
        '.portfolio {',
        '  display: grid;',
        '  grid-template-columns: 1fr;',
        '}'
    ];

    let codeText = '';
    for (let i = 0; i < 20; i++) {
        codeText += codeSnippets[Math.floor(Math.random() * codeSnippets.length)] + '\n';
    }

    codeBackground.textContent = codeText;
}

generateCodeBackground();

// ============================================
// Scroll Animations
// ============================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Observe project and testimonial cards
setTimeout(() => {
    document.querySelectorAll('.project-card, .testimonial-card, .skill-card').forEach(card => {
        observer.observe(card);
    });
}, 1000);

// ============================================
// Contact Form
// ============================================

const contactForm = document.getElementById('contactForm');
const formFeedback = document.getElementById('formFeedback');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            message: document.getElementById('message').value
        };

        // Simulate form submission (replace with actual form handling)
        formFeedback.className = 'form-feedback success';
        formFeedback.textContent = '$ Message sent successfully!';
        formFeedback.style.display = 'block';

        // Reset form
        contactForm.reset();

        // Hide feedback after 5 seconds
        setTimeout(() => {
            formFeedback.style.display = 'none';
        }, 5000);

        // In a real implementation, you would send this to a server:
        // fetch('/api/contact', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(formData)
        // })
        // .then(response => response.json())
        // .then(data => {
        //     formFeedback.className = 'form-feedback success';
        //     formFeedback.textContent = '$ ' + data.message;
        //     formFeedback.style.display = 'block';
        // })
        // .catch(error => {
        //     formFeedback.className = 'form-feedback error';
        //     formFeedback.textContent = '$ Error: ' + error.message;
        //     formFeedback.style.display = 'block';
        // });
    });
}

// ============================================
// Particle Effect (Simple)
// ============================================

function createParticles() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    const particleCount = 50;
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = '2px';
        particle.style.height = '2px';
        particle.style.background = 'rgba(0, 255, 255, 0.5)';
        particle.style.borderRadius = '50%';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animation = `float ${3 + Math.random() * 4}s infinite ease-in-out`;
        particle.style.animationDelay = Math.random() * 2 + 's';
        particle.style.pointerEvents = 'none';
        hero.appendChild(particle);
    }
}

// Add floating animation
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0%, 100% {
            transform: translateY(0) translateX(0);
            opacity: 0.5;
        }
        50% {
            transform: translateY(-20px) translateX(10px);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);

// Create particles after a delay
setTimeout(createParticles, 1000);

// ============================================
// Active Navigation Link
// ============================================

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);
updateActiveNavLink();

