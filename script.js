// DOM Elements
const navbar = document.querySelector('.navbar');
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');
const quoteForm = document.getElementById('quoteForm');
const formSuccess = document.getElementById('formSuccess');

// Update navbar based on login status
function updateNavbarForLogin() {
    const signInLink = document.querySelector('.nav-signin');
    if (signInLink) {
        if (sessionStorage.getItem('isLoggedIn') === 'true') {
            signInLink.textContent = 'Dashboard';
            signInLink.href = 'dashboard.html';
        } else {
            signInLink.textContent = 'Sign In';
            signInLink.href = 'login.html';
        }
    }
}

// Create floating particles
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (15 + Math.random() * 10) + 's';
        particlesContainer.appendChild(particle);
    }
}

// Navbar scroll effect
if (navbar) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Mobile menu toggle
if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
    });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
        // Close mobile menu if open
        navLinks.classList.remove('active');
    });
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Add fade-in class to elements and observe them
document.querySelectorAll('.service-card, .benefits-list li, .contact-card, .section-header, .map-visual, .area-list').forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});

// Form submission
if (quoteForm) {
    quoteForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Collect form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData.entries());
        
        // Log the data (in production, this would send to a server)
        console.log('Form submitted:', data);
        
        // Show success message
        if (formSuccess) {
            formSuccess.classList.add('active');
        }
        
        // Reset form
        this.reset();
    });
}

// Close success modal
function closeSuccess() {
    if (formSuccess) {
        formSuccess.classList.remove('active');
    }
}

// Close modal when clicking outside
if (formSuccess) {
    formSuccess.addEventListener('click', function(e) {
        if (e.target === formSuccess) {
            closeSuccess();
        }
    });
}

// Close modal with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && formSuccess && formSuccess.classList.contains('active')) {
        closeSuccess();
    }
});

// Add tilt effect to service cards
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    updateNavbarForLogin();
});

// Stagger animation for service cards
document.querySelectorAll('.service-card').forEach((card, index) => {
    card.style.transitionDelay = (index * 0.1) + 's';
});

// Stagger animation for benefits list
document.querySelectorAll('.benefits-list li').forEach((item, index) => {
    item.style.transitionDelay = (index * 0.15) + 's';
});
