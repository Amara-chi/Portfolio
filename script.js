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

projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 15;
        const rotateY = (centerX - x) / 15;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    });
});

const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you for your message! I will get back to you soon.');
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
