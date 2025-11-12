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
    const heroName = document.getElementById('heroName');
    const heroTitle = document.getElementById('heroTitle');
    
    if (typingText && heroName && heroTitle) {
        const nameText = heroName.textContent || 'Fidelzky';
        const titleText = heroTitle.textContent || 'WordPress Developer & Vibe Coder';
        
        // First, type "Fidelzky"
        typeWriter(typingText, nameText, 80);
        
        // After Fidelzky finishes, type the title
        const nameDuration = nameText.length * 80;
        setTimeout(() => {
            // Clear and type the title
            typingText.textContent = '';
            typeWriter(typingText, titleText, 60);
        }, nameDuration + 1000);
        
        // Display Fidelzky with code symbols in hero-name with typing animation
        setTimeout(() => {
            if (heroName) {
                const codeText = `<${nameText}/>`;
                // Type out the code-style name with animation
                typeWriter(heroName, codeText, 100);
            }
        }, nameDuration + 500);
    }
}

// Wait for config to load
setTimeout(initTypingAnimation, 1000);

// ============================================
// Code Background Animation
// ============================================

function generateCodeBackground(elementId, snippetCount = 15) {
    const codeBackground = document.getElementById(elementId);
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
        '  vibeCoding: true, // AI-assisted development',
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
        '}',
        '',
        'const skills = [',
        '  "WordPress", "PHP", "JS"',
        '];',
        '',
        'function build() {',
        '  return "success";',
        '}'
    ];

    let codeText = '';
    for (let i = 0; i < snippetCount; i++) {
        codeText += codeSnippets[Math.floor(Math.random() * codeSnippets.length)] + '\n';
    }

    codeBackground.textContent = codeText;
}

// Generate code backgrounds for all sections
generateCodeBackground('codeBackground', 20); // Hero section
generateCodeBackground('codeBackgroundSkills', 12);
generateCodeBackground('codeBackgroundServices', 12);
generateCodeBackground('codeBackgroundProjects', 12);
generateCodeBackground('codeBackgroundTimeline', 12);
generateCodeBackground('codeBackgroundTestimonials', 12);
generateCodeBackground('codeBackgroundFAQ', 12);
generateCodeBackground('codeBackgroundContact', 12);

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

// Observe project, testimonial, and service cards
setTimeout(() => {
    document.querySelectorAll('.project-card, .testimonial-card, .skill-card, .service-card').forEach(card => {
        observer.observe(card);
    });
}, 1000);

// ============================================
// Contact Form
// ============================================

// Initialize EmailJS (you'll need to get your public key from EmailJS dashboard)
// Replace 'YOUR_PUBLIC_KEY' with your actual EmailJS public key
// Get it from: https://dashboard.emailjs.com/admin/integration

const contactForm = document.getElementById('contactForm');
const formFeedback = document.getElementById('formFeedback');

// Initialize EmailJS when DOM is ready
if (typeof emailjs !== 'undefined') {
    // Initialize with your public key
    emailjs.init('VYRjmwUXq3TRxFDCC');
}

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            message: document.getElementById('message').value
        };

        // Show loading state
        formFeedback.className = 'form-feedback';
        formFeedback.textContent = '$ Sending...';
        formFeedback.style.display = 'block';
        formFeedback.style.color = 'var(--neon-cyan)';

        // Send email using EmailJS
        if (typeof emailjs !== 'undefined') {
            emailjs.send('service_p4vbrzb', 'template_81eruu4', {
                from_name: formData.name,
                from_email: formData.email,
                message: formData.message,
                to_email: 'hello.soarmediadigital@gmail.com'
            })
            .then(() => {
                formFeedback.className = 'form-feedback success';
                formFeedback.textContent = '$ Message sent successfully!';
                formFeedback.style.display = 'block';
                
                // Reset form
                contactForm.reset();
                
                // Hide feedback after 5 seconds
                setTimeout(() => {
                    formFeedback.style.display = 'none';
                }, 5000);
            })
            .catch((error) => {
                formFeedback.className = 'form-feedback error';
                formFeedback.textContent = '$ Error: Failed to send message. Please try again or email directly.';
                formFeedback.style.display = 'block';
                console.error('EmailJS Error:', error);
            });
        } else {
            // Fallback if EmailJS is not loaded
            formFeedback.className = 'form-feedback error';
            formFeedback.textContent = '$ Email service not configured. Please email directly at hello.soarmediadigital@gmail.com';
            formFeedback.style.display = 'block';
        }
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
    @keyframes floatParticle {
        0% {
            transform: translate(0, 0) scale(1);
            opacity: 0.3;
        }
        25% {
            transform: translate(30px, -30px) scale(1.2);
            opacity: 0.6;
        }
        50% {
            transform: translate(-20px, -50px) scale(0.8);
            opacity: 0.8;
        }
        75% {
            transform: translate(-40px, -20px) scale(1.1);
            opacity: 0.5;
        }
        100% {
            transform: translate(0, 0) scale(1);
            opacity: 0.3;
        }
    }
    @keyframes floatParticle2 {
        0% {
            transform: translate(0, 0) scale(1);
            opacity: 0.4;
        }
        33% {
            transform: translate(-40px, 30px) scale(1.3);
            opacity: 0.7;
        }
        66% {
            transform: translate(50px, -40px) scale(0.9);
            opacity: 0.6;
        }
        100% {
            transform: translate(0, 0) scale(1);
            opacity: 0.4;
        }
    }
    @keyframes floatParticle3 {
        0% {
            transform: translate(0, 0) scale(1);
            opacity: 0.2;
        }
        50% {
            transform: translate(60px, 40px) scale(1.4);
            opacity: 0.7;
        }
        100% {
            transform: translate(0, 0) scale(1);
            opacity: 0.2;
        }
    }
`;
document.head.appendChild(style);

// Create particles after a delay
setTimeout(createParticles, 1000);

// ============================================
// Moving Particles for All Sections (Except Hero)
// ============================================

function createMovingParticles(section) {
    if (!section) return;
    
    // Neon colors palette
    const particleColors = [
        'rgba(0, 255, 255, 0.4)',   // cyan
        'rgba(255, 0, 255, 0.4)',   // pink
        'rgba(0, 255, 65, 0.4)',     // green
        'rgba(176, 38, 255, 0.4)',  // purple
        'rgba(255, 255, 0, 0.4)',    // yellow
        'rgba(255, 107, 107, 0.4)'   // light pink
    ];
    
    const particleCount = 30; // Fewer particles per section for performance
    const animations = ['floatParticle', 'floatParticle2', 'floatParticle3'];
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'moving-particle';
        
        // Random properties
        const size = 2 + Math.random() * 3; // 2-5px
        const color = particleColors[Math.floor(Math.random() * particleColors.length)];
        const animation = animations[Math.floor(Math.random() * animations.length)];
        const duration = 8 + Math.random() * 12; // 8-20 seconds
        const delay = Math.random() * 5; // 0-5 seconds delay
        
        particle.style.position = 'absolute';
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.background = color;
        particle.style.borderRadius = '50%';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.boxShadow = `0 0 ${size * 2}px ${color}, 0 0 ${size * 4}px ${color}`;
        particle.style.animation = `${animation} ${duration}s infinite ease-in-out`;
        particle.style.animationDelay = delay + 's';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '0';
        
        section.appendChild(particle);
    }
}

// Create moving particles for all sections except hero
function initMovingParticles() {
    const sections = document.querySelectorAll('section[id]');
    sections.forEach(section => {
        // Skip hero section
        if (section.id !== 'about') {
            createMovingParticles(section);
        }
    });
}

// Initialize moving particles after page load
setTimeout(initMovingParticles, 1500);

// ============================================
// Social Proof Notifications
// ============================================

// Random countries for location-based notifications
const countries = [
    'Canada', 'Australia', 'United States', 'United Kingdom', 'Germany', 
    'France', 'Spain', 'Italy', 'Netherlands', 'Sweden', 'Norway', 'Denmark',
    'Japan', 'South Korea', 'Singapore', 'India', 'Brazil', 'Mexico',
    'Argentina', 'South Africa', 'New Zealand', 'Ireland', 'Switzerland'
];

function getRandomCountry() {
    return countries[Math.floor(Math.random() * countries.length)];
}

const socialProofMessages = [
    // Contact/Message Activity
    { icon: '💬', text: () => `Someone from ${getRandomCountry()} just sent a message through the contact form.` },
    { icon: '✉️', text: () => `A visitor from ${getRandomCountry()} just reached out about a new project!` },
    { icon: '💼', text: () => `New inquiry from ${getRandomCountry()} — someone's interested in web development services.` },
    { icon: '👋', text: () => `Visitor from ${getRandomCountry()} just sent a message.` },
    { icon: '📬', text: () => `A potential client from ${getRandomCountry()} just dropped a message!` },
    { icon: '🌎', text: () => `Visitor from ${getRandomCountry()} just viewed this portfolio.` },
    { icon: '👁️', text: () => `Someone from ${getRandomCountry()} is checking the "About Me" page right now.` },
    { icon: '💻', text: () => `Visitor from ${getRandomCountry()} exploring the "Recent Projects" showcase.` },
    { icon: '👀', text: () => `Someone from ${getRandomCountry()} is viewing the "WordPress Projects" section.` },
    { icon: '🧠', text: () => `A visitor from ${getRandomCountry()} is checking the skills and expertise section.` },
    // Engagement/Interaction
    { icon: '⭐', text: () => `Someone from ${getRandomCountry()} just bookmarked this portfolio link.` },
    { icon: '🖱️', text: () => `A visitor from ${getRandomCountry()} just clicked "Get In Touch".` },
    { icon: '🔗', text: () => `Someone from ${getRandomCountry()} just checked the GitHub profile.` },
    { icon: '🕹️', text: () => `Visitor from ${getRandomCountry()} explored the interactive timeline.` },
    { icon: '📱', text: () => `Someone from ${getRandomCountry()} is viewing this portfolio on mobile.` },
    // Testimonials/Reviews
    { icon: '🗣️', text: () => `A past client from ${getRandomCountry()} just left a testimonial.` },
    { icon: '💬', text: () => `Someone from ${getRandomCountry()} rated the last project 5 stars!` },
    { icon: '👍', text: () => `Visitor from ${getRandomCountry()} is reading the client testimonials.` },
    { icon: '🎯', text: () => `Someone from ${getRandomCountry()} is interested in the services section.` },
    { icon: '🚀', text: () => `New visitor from ${getRandomCountry()} exploring the career timeline.` }
];

let notificationQueue = [];
let isShowingNotification = false;
let notificationInterval = null;

function createNotification(messageObj) {
    const container = document.getElementById('socialProofContainer');
    if (!container) return;

    const notification = document.createElement('div');
    notification.className = 'social-proof-notification';
    
    const content = document.createElement('div');
    content.className = 'social-proof-notification-content';
    
    const icon = document.createElement('div');
    icon.className = 'social-proof-icon';
    icon.textContent = messageObj.icon;
    
    const text = document.createElement('div');
    text.className = 'social-proof-text';
    // Handle both string and function text (for dynamic content like random countries)
    const messageText = typeof messageObj.text === 'function' ? messageObj.text() : messageObj.text;
    text.textContent = messageText;
    
    const closeBtn = document.createElement('button');
    closeBtn.className = 'social-proof-close';
    closeBtn.innerHTML = '<i class="fas fa-times"></i>';
    closeBtn.setAttribute('aria-label', 'Close notification');
    
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'fadeOutNotification 0.5s ease-in forwards';
        setTimeout(() => {
            notification.remove();
            isShowingNotification = false;
            showNextNotification();
        }, 500);
    });
    
    content.appendChild(icon);
    content.appendChild(text);
    notification.appendChild(content);
    notification.appendChild(closeBtn);
    
    container.appendChild(notification);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'fadeOutNotification 0.5s ease-in forwards';
            setTimeout(() => {
                notification.remove();
                isShowingNotification = false;
                showNextNotification();
            }, 500);
        }
    }, 5000);
}

function showNextNotification() {
    if (isShowingNotification || notificationQueue.length === 0) return;
    
    isShowingNotification = true;
    const message = notificationQueue.shift();
    createNotification(message);
}

function addNotificationToQueue() {
    const randomMessage = socialProofMessages[Math.floor(Math.random() * socialProofMessages.length)];
    notificationQueue.push(randomMessage);
    
    if (!isShowingNotification) {
        showNextNotification();
    }
}

function initSocialProofNotifications() {
    // Wait a bit after page load before showing first notification
    setTimeout(() => {
        addNotificationToQueue();
    }, 3000);
    
    // Show notifications at random intervals (15-45 seconds)
    function scheduleNextNotification() {
        const delay = 15000 + Math.random() * 30000; // 15-45 seconds
        setTimeout(() => {
            addNotificationToQueue();
            scheduleNextNotification();
        }, delay);
    }
    
    scheduleNextNotification();
    
    // Also show notification when user interacts with contact form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', () => {
            setTimeout(() => {
                const contactMessages = [
                    { icon: '💬', text: () => `Someone from ${getRandomCountry()} just sent a message through the contact form.` },
                    { icon: '✉️', text: () => `A visitor from ${getRandomCountry()} just reached out about a new project!` },
                    { icon: '📬', text: () => `A potential client from ${getRandomCountry()} just dropped a message!` }
                ];
                notificationQueue.push(contactMessages[Math.floor(Math.random() * contactMessages.length)]);
                if (!isShowingNotification) {
                    showNextNotification();
                }
            }, 2000);
        });
    }
    
    // Show notification when user scrolls to certain sections
    const sections = document.querySelectorAll('section[id]');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && Math.random() > 0.7) {
                const sectionId = entry.target.id;
                let message = null;
                
                if (sectionId === 'projects') {
                    message = { icon: '👀', text: () => `Someone from ${getRandomCountry()} is viewing the "WordPress Projects" section.` };
                } else if (sectionId === 'about') {
                    message = { icon: '🧠', text: () => `Someone from ${getRandomCountry()} is checking the "About Me" page right now.` };
                } else if (sectionId === 'testimonials') {
                    message = { icon: '👍', text: () => `Visitor from ${getRandomCountry()} is reading the client testimonials.` };
                } else if (sectionId === 'timeline') {
                    message = { icon: '🚀', text: () => `New visitor from ${getRandomCountry()} exploring the career timeline.` };
                }
                
                if (message) {
                    notificationQueue.push(message);
                    if (!isShowingNotification) {
                        showNextNotification();
                    }
                }
            }
        });
    }, { threshold: 0.5 });
    
    sections.forEach(section => {
        observer.observe(section);
    });
}

// Initialize social proof notifications after page load
setTimeout(initSocialProofNotifications, 2000);

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

// ============================================
// Cursor Trail Effect
// ============================================

// Only enable on desktop (not mobile)
if (window.innerWidth > 768) {
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    
    // Create custom cursor dot
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);
    
    // Neon colors for trail
    const trailColors = [
        '#00ffff', // cyan
        '#ff00ff', // pink
        '#00ff41', // green
        '#b026ff', // purple
        '#ffff00', // yellow
        '#ff6b6b'  // light pink
    ];
    
    // Trail particles array
    const trailParticles = [];
    const maxTrailParticles = 15;
    let lastTrailTime = 0;
    const trailInterval = 30; // ms between particles
    
    // Update cursor position
    function updateCursor() {
        const dx = mouseX - cursorX;
        const dy = mouseY - cursorY;
        
        cursorX += dx * 0.15;
        cursorY += dy * 0.15;
        
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        
        requestAnimationFrame(updateCursor);
    }
    
    // Create trail particle
    function createTrailParticle(x, y) {
        const particle = document.createElement('div');
        particle.className = 'cursor-trail';
        
        // Random color from neon palette
        const color = trailColors[Math.floor(Math.random() * trailColors.length)];
        const size = 15 + Math.random() * 15; // 15-30px
        
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.background = `radial-gradient(circle, ${color}, transparent)`;
        particle.style.boxShadow = `0 0 ${size}px ${color}, 0 0 ${size * 2}px ${color}`;
        particle.style.opacity = '0.6';
        
        document.body.appendChild(particle);
        
        // Remove particle after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 800);
        
        trailParticles.push(particle);
        
        // Limit number of particles
        if (trailParticles.length > maxTrailParticles) {
            const oldParticle = trailParticles.shift();
            if (oldParticle && oldParticle.parentNode) {
                oldParticle.parentNode.removeChild(oldParticle);
            }
        }
    }
    
    // Mouse move handler
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Throttle trail creation
        const now = Date.now();
        if (now - lastTrailTime > trailInterval) {
            createTrailParticle(e.clientX, e.clientY);
            lastTrailTime = now;
        }
    });
    
    // Hide cursor on mouse leave
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
    });
    
    // Show cursor on mouse enter
    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '1';
    });
    
    // Start cursor animation
    updateCursor();
    
    // Enhanced cursor effects on hover over interactive elements
    const interactiveElements = document.querySelectorAll('a, button, input, textarea, select, .btn');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('cursor-hover');
            cursor.style.transform = 'translate(-50%, -50%) scale(2)';
            cursor.style.borderColor = 'var(--neon-pink)';
            cursor.style.boxShadow = 
                '0 0 15px var(--neon-pink), ' +
                '0 0 30px var(--neon-pink), ' +
                '0 0 45px var(--neon-pink), ' +
                'inset 0 0 15px var(--neon-pink)';
            cursor.style.background = 'radial-gradient(circle, var(--neon-pink), transparent)';
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('cursor-hover');
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursor.style.borderColor = 'var(--neon-cyan)';
            cursor.style.boxShadow = 
                '0 0 10px var(--neon-cyan), ' +
                '0 0 20px var(--neon-cyan), ' +
                '0 0 30px var(--neon-cyan), ' +
                'inset 0 0 10px var(--neon-cyan)';
            cursor.style.background = 'radial-gradient(circle, var(--neon-cyan), transparent)';
        });
    });
}

// ============================================
// Back to Top Button
// ============================================

function initBackToTop() {
    const backToTopButton = document.getElementById('backToTop');
    
    if (!backToTopButton) return;
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });
    
    // Smooth scroll to top on click
    backToTopButton.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Initialize back to top button when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initBackToTop);
} else {
    initBackToTop();
}

// ============================================
// Resume/CV Modal Popup
// ============================================

function openResumeModal() {
    const modal = document.getElementById('resumeModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
        // Ensure custom cursor is visible
        const cursor = document.querySelector('.custom-cursor');
        if (cursor) {
            cursor.style.opacity = '1';
            cursor.style.zIndex = '10002';
        }
    }
}

function closeResumeModal() {
    const modal = document.getElementById('resumeModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    }
}

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeResumeModal();
    }
});

