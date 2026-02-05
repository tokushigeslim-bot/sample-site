document.addEventListener('DOMContentLoaded', () => {
    initSlideshow();
    initScrollObserver();
    initGalleryModal();
    initNavHighlight();
    initMobileNav();
});

// =========================================
// Mobile Navigation
// =========================================
function initMobileNav() {
    const toggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('nav');
    const header = document.querySelector('.site-header');
    const links = document.querySelectorAll('nav ul li a');

    if (!toggle || !nav || !header) return;

    toggle.addEventListener('click', () => {
        toggle.classList.toggle('active');
        nav.classList.toggle('active');
        header.classList.toggle('menu-open');
    });

    // Close menu when a link is clicked
    links.forEach(link => {
        link.addEventListener('click', () => {
            toggle.classList.remove('active');
            nav.classList.remove('active');
            header.classList.remove('menu-open');
        });
    });
}

// =========================================
// Hero Slideshow
// =========================================
function initSlideshow() {
    const slides = document.querySelectorAll('.slide');
    if (slides.length === 0) return;

    let currentIndex = 0;
    const intervalTime = 6000; // 6 seconds

    // Initial state
    slides[0].classList.add('active');

    setInterval(() => {
        const currentSlide = slides[currentIndex];

        // Prepare next index
        currentIndex = (currentIndex + 1) % slides.length;
        const nextSlide = slides[currentIndex];

        // Animate
        currentSlide.classList.remove('active');
        nextSlide.classList.add('active');

    }, intervalTime);
}

// =========================================
// Intersection Observer for Scroll Animations
// =========================================
function initScrollObserver() {
    const options = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Run once
            }
        });
    }, options);

    const fadeElements = document.querySelectorAll('.fade-up');
    fadeElements.forEach(el => observer.observe(el));
}

// =========================================
// Gallery Modal
// =========================================
function initGalleryModal() {
    const galleryItems = document.querySelectorAll('.gallery-item img');
    if (galleryItems.length === 0) return;

    // Create modal DOM if not exists (though we will likely put it in HTML)
    // For simplicity, let's assume valid HTML structure or create it here.
    let modal = document.querySelector('.image-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.className = 'image-modal';
        modal.innerHTML = `
            <div class="modal-close">&times;</div>
            <div class="modal-content">
                <img src="" alt="Full screen view">
            </div>
        `;
        document.body.appendChild(modal);
    }

    const modalImg = modal.querySelector('img');
    const closeBtn = modal.querySelector('.modal-close');

    function openModal(src) {
        modalImg.src = src;
        modal.classList.add('active');
    }

    function closeModal() {
        modal.classList.remove('active');
        setTimeout(() => {
            modalImg.src = '';
        }, 300);
    }

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            openModal(item.src);
        });
    });

    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
}

// =========================================
// Navigation Highlight
// =========================================
function initNavHighlight() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('nav ul li a');

    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (currentPath.includes(linkPath) && linkPath !== 'index.html') {
            link.classList.add('active');
        } else if (currentPath.endsWith('/') && linkPath === 'index.html') {
            // Home case
            link.classList.add('active');
        }
    });
}
