// Config loader - Fetches and applies config.json to the page
let portfolioConfig = null;

async function loadConfig() {
    try {
        const response = await fetch('config.json');
        if (!response.ok) {
            throw new Error('Failed to load config.json');
        }
        portfolioConfig = await response.json();
        applyConfig();
    } catch (error) {
        console.error('Error loading config:', error);
        // Use default fallback data if config fails to load
        portfolioConfig = getDefaultConfig();
        applyConfig();
    }
}

function getDefaultConfig() {
    return {
        personal: {
            name: "Your Name",
            title: "WordPress Developer & Vibe Coder",
            bio: "Passionate WordPress developer crafting digital experiences with code and creativity.",
            avatar: "https://via.placeholder.com/300"
        },
        skills: [],
        projects: [],
        testimonials: [],
        contact: {
            email: "your.email@example.com",
            phone: "+1 (555) 123-4567",
            social: []
        }
    };
}

function applyConfig() {
    if (!portfolioConfig) return;

    // Apply personal info
    const personal = portfolioConfig.personal || {};
    if (personal.name) {
        const heroName = document.getElementById('heroName');
        if (heroName) heroName.textContent = personal.name;
    }
    if (personal.title) {
        const heroTitle = document.getElementById('heroTitle');
        if (heroTitle) heroTitle.textContent = personal.title;
    }
    if (personal.bio) {
        const heroBio = document.getElementById('heroBio');
        if (heroBio) heroBio.textContent = personal.bio;
    }
    if (personal.avatar) {
        const heroAvatar = document.getElementById('heroAvatar');
        if (heroAvatar) {
            // Handle spaces in filename by encoding the path
            const avatarPath = personal.avatar.replace(/ /g, '%20');
            heroAvatar.src = avatarPath;
            heroAvatar.onerror = function() {
                // Fallback if image fails to load
                console.error('Failed to load avatar:', avatarPath);
                this.src = personal.avatar; // Try original path
            };
        }
    }

    // Apply skills
    if (portfolioConfig.skills && Array.isArray(portfolioConfig.skills)) {
        renderSkills(portfolioConfig.skills);
    }

    // Apply services
    if (portfolioConfig.services && Array.isArray(portfolioConfig.services)) {
        renderServices(portfolioConfig.services);
    }

    // Apply projects
    if (portfolioConfig.projects && Array.isArray(portfolioConfig.projects)) {
        renderProjects(portfolioConfig.projects);
    }

    // Apply testimonials
    if (portfolioConfig.testimonials && Array.isArray(portfolioConfig.testimonials)) {
        renderTestimonials(portfolioConfig.testimonials);
    }

    // Apply contact info
    const contact = portfolioConfig.contact || {};
    if (contact.email) {
        const contactEmail = document.getElementById('contactEmail');
        if (contactEmail) contactEmail.textContent = contact.email;
    }
    if (contact.phone) {
        const contactPhone = document.getElementById('contactPhone');
        if (contactPhone) contactPhone.textContent = contact.phone;
    }
    if (contact.social && Array.isArray(contact.social)) {
        renderSocialLinks(contact.social);
    }

    // Apply footer copyright
    const currentYear = new Date().getFullYear();
    const footerCopyright = document.getElementById('footerCopyright');
    if (footerCopyright) {
        footerCopyright.textContent = `© ${currentYear}. Fidel "Fidelzky" Centeno. All Rights Reserved.`;
    }
}

function renderSkills(skills) {
    const skillsGrid = document.getElementById('skillsGrid');
    if (!skillsGrid) return;

    skillsGrid.innerHTML = skills.map(skill => `
        <div class="skill-card">
            <div class="skill-header">
                <span class="skill-name">${skill.name || 'Skill'}</span>
                <span class="skill-level">${skill.level || 0}%</span>
            </div>
            <div class="skill-bar-container">
                <div class="skill-bar" style="width: ${skill.level || 0}%"></div>
            </div>
        </div>
    `).join('');

    // Animate skill bars on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBar = entry.target.querySelector('.skill-bar');
                if (skillBar) {
                    const width = skillBar.style.width;
                    skillBar.style.width = '0%';
                    setTimeout(() => {
                        skillBar.style.width = width;
                    }, 100);
                }
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.skill-card').forEach(card => {
        observer.observe(card);
    });
}

function renderServices(services) {
    const servicesGrid = document.getElementById('servicesGrid');
    if (!servicesGrid) return;

    servicesGrid.innerHTML = services.map(service => `
        <div class="service-card">
            <span class="service-icon">${service.icon || '⚙️'}</span>
            <h3 class="service-title">${service.title || 'Service'}</h3>
            <p class="service-description">${service.description || ''}</p>
            ${service.features && service.features.length > 0 ? `
                <ul class="service-features">
                    ${service.features.map(feature => `<li class="service-feature">${feature}</li>`).join('')}
                </ul>
            ` : ''}
        </div>
    `).join('');
}

function renderProjects(projects) {
    const projectsGrid = document.getElementById('projectsGrid');
    if (!projectsGrid) return;

    projectsGrid.innerHTML = projects.map(project => `
        <div class="project-card">
            ${project.image ? `<img src="${project.image}" alt="${project.title}" class="project-image">` : ''}
            <div class="project-content">
                <h3 class="project-title">${project.title || 'Project'}</h3>
                <p class="project-description">${project.description || ''}</p>
                ${project.tech && project.tech.length > 0 ? `
                    <div class="project-tech">
                        ${project.tech.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                    </div>
                ` : ''}
                <div class="project-links">
                    ${project.demo ? `<a href="${project.demo}" target="_blank" rel="noopener noreferrer" class="project-link">Live Demo</a>` : ''}
                    ${project.github ? `<a href="${project.github}" target="_blank" rel="noopener noreferrer" class="project-link">GitHub</a>` : ''}
                </div>
            </div>
        </div>
    `).join('');
}

function renderTestimonials(testimonials) {
    const testimonialsGrid = document.getElementById('testimonialsGrid');
    if (!testimonialsGrid) return;

    const maxLength = 250; // Character limit before truncation

    testimonialsGrid.innerHTML = testimonials.map((testimonial, index) => {
        const fullText = testimonial.text || '';
        const isLong = fullText.length > maxLength;
        const truncatedText = isLong ? fullText.substring(0, maxLength) + '...' : fullText;
        const cardId = `testimonial-${index}`;

        return `
        <div class="testimonial-card" id="${cardId}">
            <p class="testimonial-text">
                <span class="testimonial-text-short">${truncatedText}</span>
                ${isLong ? `<span class="testimonial-text-full" style="display: none;">${fullText}</span>` : ''}
            </p>
            ${isLong ? `<button class="testimonial-read-more" data-index="${index}">Read more</button>` : ''}
            <div class="testimonial-author">
                <div class="testimonial-info">
                    <div class="testimonial-name">${testimonial.name || ''}</div>
                    <div class="testimonial-company">${testimonial.company || ''}</div>
                </div>
            </div>
        </div>
    `;
    }).join('');

    // Add event listeners to all read more buttons
    const readMoreButtons = testimonialsGrid.querySelectorAll('.testimonial-read-more');
    readMoreButtons.forEach(button => {
        button.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            toggleTestimonial(index);
        });
    });
}

// Function to toggle testimonial text
function toggleTestimonial(index) {
    const card = document.getElementById(`testimonial-${index}`);
    if (!card) return;

    const shortText = card.querySelector('.testimonial-text-short');
    const fullText = card.querySelector('.testimonial-text-full');
    const button = card.querySelector('.testimonial-read-more');

    if (!fullText || !button) return;

    const isExpanded = fullText.style.display !== 'none';

    if (isExpanded) {
        // Collapse
        shortText.style.display = 'inline';
        fullText.style.display = 'none';
        button.textContent = 'Read more';
        button.classList.remove('expanded');
    } else {
        // Expand
        shortText.style.display = 'none';
        fullText.style.display = 'inline';
        button.textContent = 'Read less';
        button.classList.add('expanded');
    }
}

function renderSocialLinks(socialLinks) {
    const socialLinksContainer = document.getElementById('socialLinks');
    if (!socialLinksContainer) return;

    const iconMap = {
        'github': '<i class="fab fa-github"></i>',
        'linkedin': '<i class="fab fa-linkedin"></i>',
        'twitter': '<i class="fab fa-twitter"></i>',
        'instagram': '<i class="fab fa-instagram"></i>',
        'facebook': '<i class="fab fa-facebook"></i>',
        'email': '<i class="fas fa-envelope"></i>',
        'phone': '<i class="fas fa-phone"></i>'
    };

    socialLinksContainer.innerHTML = socialLinks.map(link => {
        const isMailOrPhone = link.url.startsWith('mailto:') || link.url.startsWith('tel:');
        const targetAttr = isMailOrPhone ? '' : 'target="_blank" rel="noopener noreferrer"';
        const icon = iconMap[link.name.toLowerCase()] || '<i class="fas fa-link"></i>';
        return `
        <a href="${link.url}" ${targetAttr} class="social-link" title="${link.name}">
            ${icon}
        </a>
    `;
    }).join('');
}

// Load config when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadConfig);
} else {
    loadConfig();
}

