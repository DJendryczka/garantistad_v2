// Garanti Städ i Lund AB - Main JavaScript File

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        // Close mobile navigation if open
        const navbarCollapse = document.querySelector('.navbar-collapse');
        const navbarToggler = document.querySelector('.navbar-toggler');
        
        if (navbarCollapse && navbarCollapse.classList.contains('show')) {
            const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
                toggle: false
            });
            bsCollapse.hide();
        }
        
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navbarHeight = 70; // Account for navbar height + extra margin
            const targetPosition = target.offsetTop - navbarHeight;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Update navbar active state on scroll
window.addEventListener('scroll', function() {
    let current = '';
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        if (scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

// Cookie Consent Management
document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    const currentYearElement = document.getElementById('currentYear');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }
    
    // Cookie consent functionality
    const cookieConsent = document.getElementById('cookieConsent');
    const acceptBtn = document.getElementById('acceptCookies');
    const declineBtn = document.getElementById('declineCookies');
    
    // Check if user has already made a choice
    if (!localStorage.getItem('cookieConsent')) {
        setTimeout(() => {
            cookieConsent.style.display = 'block';
            cookieConsent.style.animation = 'slideUp 0.5s ease-out';
        }, 2000);
    }
    
    // Accept cookies
    acceptBtn.addEventListener('click', function() {
        localStorage.setItem('cookieConsent', 'accepted');
        hideCookieConsent();
        // Initialize analytics or other cookies here
        console.log('Cookies accepted');
    });
    
    // Decline cookies
    declineBtn.addEventListener('click', function() {
        localStorage.setItem('cookieConsent', 'declined');
        hideCookieConsent();
        console.log('Cookies declined');
    });
    
    function hideCookieConsent() {
        cookieConsent.style.animation = 'slideDown 0.5s ease-out';
        setTimeout(() => {
            cookieConsent.style.display = 'none';
        }, 500);
    }
});

// Hero Slideshow Functionality
document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.hero-slide');
    let currentSlide = 0;
    
    function nextSlide() {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }
    
    // Auto-advance slides every 4 seconds
    if (slides.length > 0) {
        setInterval(nextSlide, 4000);
    }
});