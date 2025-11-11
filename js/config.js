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
            bio: "Passionate WordPress developer specializing in AI-assisted software development (vibe coding).",
            avatar: "https://via.placeholder.com/300"
        },
        skills: [],
        projects: [],
        timeline: [],
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
        if (heroName) {
            // Fidelzky will be animated with typing effect in main.js
            heroName.textContent = personal.name;
        }
    }
    if (personal.fullName) {
        const heroFullName = document.getElementById('heroFullName');
        if (heroFullName) heroFullName.textContent = personal.fullName;
    }
    if (personal.title) {
        const heroTitle = document.getElementById('heroTitle');
        if (heroTitle) {
            // Split title for mobile display
            const titleParts = personal.title.split(' & ');
            if (titleParts.length === 2) {
                heroTitle.innerHTML = `<span class="hero-title-main">${titleParts[0]}</span><span class="hero-title-sub">& ${titleParts[1]}</span>`;
            } else {
                heroTitle.textContent = personal.title;
            }
        }
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

    // Apply timeline (always render, even if empty - will show default)
    const timelineEvents = portfolioConfig.timeline && Array.isArray(portfolioConfig.timeline) 
        ? portfolioConfig.timeline 
        : [];
    renderTimeline(timelineEvents);

    // Apply testimonials
    if (portfolioConfig.testimonials && Array.isArray(portfolioConfig.testimonials)) {
        renderTestimonials(portfolioConfig.testimonials);
    }

    // Apply FAQ
    if (portfolioConfig.faq && Array.isArray(portfolioConfig.faq)) {
        renderFAQ(portfolioConfig.faq);
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
        footerCopyright.innerHTML = `© ${currentYear}. Fidel &lt;Fidelzky/&gt; Centeno.<br>All Rights Reserved.`;
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

function renderTimeline(events) {
    const timelineContainer = document.getElementById('timelineContainer');
    if (!timelineContainer) return;

    // If no events provided, show default example
    // Timeline goes from oldest (top) to newest (bottom)
    if (!events || events.length === 0) {
        events = [
            {
                year: "2021",
                title: "Information Technology Specialist",
                subtitle: "All-Out Food Products",
                dateRange: "Jan 2021 - Sep 2023 · 2 yrs 9 mos",
                bullets: [
                    "Managed and maintained All-Out Food Products' website and digital systems for optimal performance",
                    "Implemented technical SEO strategies that significantly improved search rankings and organic traffic",
                    "Planned and executed social media advertisements, enhancing brand awareness and customer engagement",
                    "Oversaw IT infrastructure to ensure data security and efficient digital workflows"
                ]
            },
            {
                year: "2023",
                title: "Web Developer",
                subtitle: "Body & Mind Natural Health",
                dateRange: "Nov 2023 - Dec 2024 · 1 yr 2 mos",
                bullets: [
                    "Designed and maintained a responsive WordPress website, focusing on speed and mobile performance",
                    "Customized themes and plugins to enhance user experience and streamline functionality",
                    "Implemented technical SEO strategies, improving website performance and organic traffic significantly"
                ]
            },
            {
                year: "2024",
                title: "Web Developer",
                subtitle: "Home at Peace",
                dateRange: "Dec 2023 - Jun 2024 · 7 mos",
                bullets: [
                    "Developed and maintained the company's WordPress website, ensuring optimal performance and user-friendly navigation",
                    "Implemented technical SEO strategies, including on-page optimization and schema markup, to enhance search visibility",
                    "Achieved a Google PageSpeed score improvement from 65 to 90+, significantly reducing bounce rate by 35%",
                    "Streamlined the caregiver recruitment process, resulting in a 60% increase in qualified job applications"
                ]
            },
            {
                year: "2024",
                title: "Web Developer",
                subtitle: "Joseph Media Group",
                dateRange: "Feb 2024 - Nov 2025",
                bullets: [
                    "Developed tailored digital solutions using WordPress, enhancing project outcomes for diverse digital projects",
                    "Designed and implemented over 50 web designs, including landing pages and e-commerce sites, boosting client engagement by 20%",
                    "Collaborated with cross-functional teams to align innovative projects with business goals, leveraging technical expertise"
                ]
            }
        ];
    }

    // Create timeline line and progress elements
    const timelineLine = document.createElement('div');
    timelineLine.className = 'timeline-line';
    
    const timelineProgress = document.createElement('div');
    timelineProgress.className = 'timeline-progress';
    timelineProgress.id = 'timelineProgress';
    
    const timelineComet = document.createElement('div');
    timelineComet.className = 'timeline-progress-comet';
    timelineComet.id = 'timelineComet';

    // Render events
    const eventsHTML = events.map((event, index) => {
        const description = event.description || '';
        const bullets = event.bullets || [];
        
        let descriptionHTML = '';
        if (description) {
            descriptionHTML = `<p class="timeline-event-description">${description}</p>`;
        }
        
        if (bullets.length > 0) {
            descriptionHTML += '<ul class="timeline-event-description">';
            bullets.forEach(bullet => {
                descriptionHTML += `<li>${bullet}</li>`;
            });
            descriptionHTML += '</ul>';
        }

        return `
            <div class="timeline-event" data-index="${index}">
                <div class="timeline-node"></div>
                <div class="timeline-event-content">
                    <div class="timeline-event-year">
                        <i class="fas fa-calendar-alt"></i>
                        ${event.year || event.date || ''}
                    </div>
                    <h3 class="timeline-event-title">${event.title || ''}</h3>
                    ${event.subtitle ? `<p class="timeline-event-subtitle">${event.subtitle}</p>` : ''}
                    ${event.dateRange ? `<p class="timeline-event-date">${event.dateRange}</p>` : ''}
                    ${descriptionHTML}
                </div>
            </div>
        `;
    }).join('');

    timelineContainer.innerHTML = eventsHTML;
    
    // Add timeline line and progress elements
    timelineContainer.insertAdjacentElement('afterbegin', timelineLine);
    timelineContainer.insertAdjacentElement('afterbegin', timelineProgress);
    timelineContainer.insertAdjacentElement('afterbegin', timelineComet);

    // Initialize scroll animations
    initTimelineScroll();
}

function initTimelineScroll() {
    const timelineContainer = document.getElementById('timelineContainer');
    if (!timelineContainer) return;

    const events = timelineContainer.querySelectorAll('.timeline-event');
    const progressLine = document.getElementById('timelineProgress');
    const comet = document.getElementById('timelineComet');
    
    if (!progressLine || !comet) return;

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    events.forEach(event => {
        observer.observe(event);
    });

    // Scroll progress tracking
    let ticking = false;
    
    function updateTimelineProgress() {
        if (!timelineContainer) return;

        const containerRect = timelineContainer.getBoundingClientRect();
        const containerTop = containerRect.top + window.scrollY;
        const containerBottom = containerTop + containerRect.height;
        const viewportTop = window.scrollY;
        const viewportBottom = viewportTop + window.innerHeight;

        // Calculate progress
        let progress = 0;
        if (viewportTop < containerTop) {
            progress = 0;
        } else if (viewportBottom > containerBottom) {
            progress = 100;
        } else {
            const scrolled = viewportTop - containerTop;
            const total = containerRect.height - window.innerHeight;
            progress = Math.min(100, Math.max(0, (scrolled / total) * 100));
        }

        // Update progress line
        progressLine.style.height = `${progress}%`;

        // Update comet position
        const cometTop = (progress / 100) * containerRect.height;
        comet.style.top = `${cometTop}px`;

        // Update active event
        events.forEach((event) => {
            const eventRect = event.getBoundingClientRect();
            const eventTop = eventRect.top + window.scrollY;
            const isInView = viewportTop < eventTop && viewportBottom > eventTop;
            
            if (isInView) {
                event.classList.add('active');
            } else {
                event.classList.remove('active');
            }
        });

        ticking = false;
    }

    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateTimelineProgress);
            ticking = true;
        }
    }

    window.addEventListener('scroll', requestTick);
    window.addEventListener('resize', requestTick);
    updateTimelineProgress(); // Initial call
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

function renderFAQ(faqItems) {
    const faqContainer = document.getElementById('faqContainer');
    if (!faqContainer) return;

    faqContainer.innerHTML = faqItems.map((item, index) => {
        const faqId = `faq-${index}`;
        return `
        <div class="faq-item">
            <div class="faq-question" data-faq-id="${faqId}">
                <span>${item.question || ''}</span>
                <i class="fas fa-chevron-down faq-icon"></i>
            </div>
            <div class="faq-answer" id="${faqId}">
                ${item.answer || ''}
            </div>
        </div>
    `;
    }).join('');

    // Add event listeners to all FAQ questions
    const faqQuestions = faqContainer.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqId = this.getAttribute('data-faq-id');
            const answer = document.getElementById(faqId);
            if (!answer) return;

            const isActive = this.classList.contains('active');
            
            // Close all other FAQ items
            faqQuestions.forEach(q => {
                if (q !== this) {
                    q.classList.remove('active');
                    const otherAnswer = document.getElementById(q.getAttribute('data-faq-id'));
                    if (otherAnswer) {
                        otherAnswer.classList.remove('active');
                    }
                }
            });

            // Toggle current FAQ item
            if (isActive) {
                this.classList.remove('active');
                answer.classList.remove('active');
            } else {
                this.classList.add('active');
                answer.classList.add('active');
            }
        });
    });
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

// Hide preloader and show content when everything is loaded
function hidePreloader() {
    const preloader = document.getElementById('preloader');
    const body = document.body;
    
    if (preloader) {
        preloader.classList.add('hidden');
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }
    
    if (body) {
        body.classList.add('loaded');
    }
}

// Load config when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        loadConfig();
        // Wait for fonts and content to load
        if (document.fonts && document.fonts.ready) {
            document.fonts.ready.then(() => {
                setTimeout(hidePreloader, 300);
            });
        } else {
            window.addEventListener('load', () => {
                setTimeout(hidePreloader, 300);
            });
        }
    });
} else {
    loadConfig();
    if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(() => {
            setTimeout(hidePreloader, 300);
        });
    } else {
        window.addEventListener('load', () => {
            setTimeout(hidePreloader, 300);
        });
    }
}

