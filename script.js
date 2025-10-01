const WHATSAPP_NUMBER = '+2349026852855';

const PROJECT_URLS = {
'eduschola': 'https://dev.eduschola.com.gh',
'gluto': 'https://www.catalog.glutointernational.com/',
'trans-sib': 'https://www.transsiberanshipping.com/',
'embex': 'https://www.embexbv.com/',
'yota': 'https://yotashipping.com/',

};

const mouseFollower = document.getElementById('mouseFollower');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');
const scrollRevealElements = document.querySelectorAll('.scroll-reveal');
const timelineItems = document.querySelectorAll('.timeline-item');
const projectCards = document.querySelectorAll('.project-card');
const backToTopBtn = document.getElementById('backToTop');
const themeToggle = document.getElementById('themeToggle');
const themeToggleMobile = document.getElementById('themeToggleMobile');
const html = document.documentElement;

let mouseX = 0;
let mouseY = 0;
let followerX = 0;
let followerY = 0;

const savedTheme = localStorage.getItem('theme') || 'dark';
if (savedTheme === 'light') {
    html.classList.remove('dark');
    html.classList.add('light');
    updateThemeIcons();
}

function updateThemeIcons() {
    const isDark = html.classList.contains('dark');
    document.getElementById('sunIcon').classList.toggle('hidden', isDark);
    document.getElementById('moonIcon').classList.toggle('hidden', !isDark);
    document.getElementById('sunIconMobile').classList.toggle('hidden', isDark);
    document.getElementById('moonIconMobile').classList.toggle('hidden', !isDark);
}

// Particle System for Hero Section
function initParticleSystem() {
    const canvas = document.getElementById('particleCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    function setCanvasSize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    setCanvasSize();

    const particles = [];
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    // Particle class
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.baseX = this.x;
            this.baseY = this.y;
            this.vx = (Math.random() - 0.5) * 0.3;
            this.vy = (Math.random() - 0.5) * 0.3;
            this.radius = Math.random() * 2.5 + 1;
            this.density = (Math.random() * 30) + 1;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            
            // Use wine color from your theme
            const gradient = ctx.createRadialGradient(
                this.x, this.y, 0,
                this.x, this.y, this.radius
            );
            
            if (document.documentElement.classList.contains('dark')) {
                gradient.addColorStop(0, 'rgba(202, 43, 82, 0.6)');
                gradient.addColorStop(1, 'rgba(202, 43, 82, 0.1)');
            } else {
                gradient.addColorStop(0, 'rgba(202, 43, 82, 0.4)');
                gradient.addColorStop(1, 'rgba(202, 43, 82, 0.05)');
            }
            
            ctx.fillStyle = gradient;
            ctx.fill();
        }

        update() {
            const dx = mouseX - this.x;
            const dy = mouseY - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const maxDistance = 100;
            const forceDirectionX = dx / distance;
            const forceDirectionY = dy / distance;
            const force = (maxDistance - distance) / maxDistance;

            if (distance < maxDistance) {
                const directionX = forceDirectionX * force * this.density * 0.6;
                const directionY = forceDirectionY * force * this.density * 0.6;
                this.x -= directionX;
                this.y -= directionY;
            } else {
                if (this.x !== this.baseX) {
                    const dx = this.x - this.baseX;
                    this.x -= dx / 10;
                }
                if (this.y !== this.baseY) {
                    const dy = this.y - this.baseY;
                    this.y -= dy / 10;
                }
            }

            this.draw();
        }
    }

    // Create particles
    function createParticles() {
        particles.length = 0;
        for (let i = 0; i < 80; i++) {
            particles.push(new Particle());
        }
    }

    // Animation loop
    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw connections between particles
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 120) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    
                    if (document.documentElement.classList.contains('dark')) {
                        ctx.strokeStyle = `rgba(202, 43, 82, ${0.15 * (1 - distance / 120)})`;
                    } else {
                        ctx.strokeStyle = `rgba(202, 43, 82, ${0.1 * (1 - distance / 120)})`;
                    }
                    
                    ctx.lineWidth = 0.8;
                    ctx.stroke();
                }
            }
        }

        // Update and draw particles
        particles.forEach(particle => particle.update());
        requestAnimationFrame(animateParticles);
    }

    // Event listeners
    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    window.addEventListener('resize', () => {
        setCanvasSize();
        createParticles();
    });

    // Touch events for mobile
    window.addEventListener('touchmove', (e) => {
        e.preventDefault();
        mouseX = e.touches[0].clientX;
        mouseY = e.touches[0].clientY;
    });

    // Initialize
    createParticles();
    animateParticles();
}

// Initialize particle system when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initParticleSystem();
    
    // Your existing DOMContentLoaded code...
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                card.style.transition = 'all 0.6s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 50);
        }, index * 50);
    });
});

function toggleTheme() {
    if (html.classList.contains('dark')) {
        html.classList.remove('dark');
        html.classList.add('light');
        localStorage.setItem('theme', 'light');
    } else {
        html.classList.remove('light');
        html.classList.add('dark');
        localStorage.setItem('theme', 'dark');
    }
    updateThemeIcons();
}

themeToggle.addEventListener('click', toggleTheme);
themeToggleMobile.addEventListener('click', toggleTheme);

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateFollower() {
    const distX = mouseX - followerX;
    const distY = mouseY - followerY;
    
    followerX += distX * 0.1;
    followerY += distY * 0.1;
    
    mouseFollower.style.left = followerX + 'px';
    mouseFollower.style.top = followerY + 'px';
    
    requestAnimationFrame(animateFollower);
}

animateFollower();

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            mobileMenu.classList.add('hidden');
        }
    });
});

function updateActiveNav() {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 200) {
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

function revealOnScroll() {
    scrollRevealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('show');
        }
    });
    
    timelineItems.forEach((item, index) => {
        const itemTop = item.getBoundingClientRect().top;
        const itemVisible = 100;
        
        if (itemTop < window.innerHeight - itemVisible) {
            setTimeout(() => {
                item.classList.add('show');
            }, index * 150);
        }
    });
}

function toggleBackToTop() {
    if (window.pageYOffset > 300) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
}

window.addEventListener('scroll', () => {
    updateActiveNav();
    revealOnScroll();
    toggleBackToTop();
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

revealOnScroll();
updateActiveNav();


// Integrated Card Flip and Tilt Functionality - FIXED VERSION
function initProjectCards() {
    const projectCards = document.querySelectorAll('.project-card-flip');
    
    projectCards.forEach(card => {
        const front = card.querySelector('.project-card-front');
        const backBtn = card.querySelector('.flip-back-btn');
        const viewProjectBtn = card.querySelector('.project-card-back a[href="#"]');
        let isFlipped = false;
        let tiltEnabled = true;

        // Flip functionality
        function flipCard() {
            isFlipped = !isFlipped;
            card.classList.toggle('flipped', isFlipped);
            
            // Disable tilt when flipped, enable when unflipped
            tiltEnabled = !isFlipped;
            
            // Reset tilt transform immediately
            front.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
        }

        // Click to flip
        front.addEventListener('click', (e) => {
            e.stopPropagation();
            flipCard();
        });

        // Flip back button
        backBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            flipCard();
        });

        // View project button
        if (viewProjectBtn) {
            viewProjectBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const projectKey = card.getAttribute('data-project-url');
                const url = PROJECT_URLS[projectKey];
                
                if (url && url !== '#' && !url.includes('your-')) {
                    window.open(url, '_blank');
                } else {
                    alert('Project URL not configured yet. Please update the PROJECT_URLS in script.js');
                }
            });
        }

        // Tilt functionality - COMPLETELY disabled when flipped
        front.addEventListener('mousemove', (e) => {
            if (!tiltEnabled) return; // Completely skip tilt logic if disabled
            
            const rect = front.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 25;
            const rotateY = (centerX - x) / 25;
            
            front.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        front.addEventListener('mouseleave', () => {
            if (tiltEnabled) {
                front.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
            }
        });

        // Close card when clicking outside
        document.addEventListener('click', (e) => {
            if (!card.contains(e.target) && isFlipped) {
                flipCard();
            }
        });

        // Keyboard support
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                flipCard();
            }
            
            if (e.key === 'Escape' && isFlipped) {
                flipCard();
            }
        });

        // Set tabindex for accessibility
        card.setAttribute('tabindex', '0');
        
        // Add data attribute for easier debugging
        card.setAttribute('data-tilt-enabled', 'true');
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initProjectCards();
});

document.querySelectorAll('[data-project-url]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const projectKey = e.currentTarget.getAttribute('data-project-url');
        const url = PROJECT_URLS[projectKey];
        if (url && url !== '#' && !url.includes('your-')) {
            window.open(url, '_blank');
        } else {
            alert('Project URL not configured yet. Please update the PROJECT_URLS in script.js');
        }
    });
});

const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('contactName').value;
    const email = document.getElementById('contactEmail').value;
    const message = document.getElementById('contactMessage').value;
    
    const whatsappMessage = `Hello! My name is ${name}%0A%0AEmail: ${email}%0A%0AMessage: ${message}`;
    
    const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`;
    
    window.open(whatsappURL, '_blank');
    
    contactForm.reset();
});

document.addEventListener('DOMContentLoaded', () => {
    const skillCards = document.querySelectorAll('.skill-card');
    
    skillCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                card.style.transition = 'all 0.6s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 50);
        }, index * 50);
    });
});

let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.hero-text');
            
            parallaxElements.forEach(element => {
                const speed = 0.3;
                element.style.transform = `translateY(${scrolled * speed}px)`;
            });
            
            ticking = false;
        });
        
        ticking = true;
    }
});

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
}, observerOptions);

scrollRevealElements.forEach(element => {
    observer.observe(element);
});
