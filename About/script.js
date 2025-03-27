// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');
            }
        });
    }

    // Scroll Animation for Stats
    const statsItems = document.querySelectorAll('.stat-item');
    
    if (statsItems.length > 0) {
        const observerOptions = {
            threshold: 0.2,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    observer.unobserve(entry.target); // Stop observing once animated
                }
            });
        }, observerOptions);

        statsItems.forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            observer.observe(item);
        });
    }

    // Smooth Scroll for Navigation Links
    const smoothScroll = (e) => {
        e.preventDefault();
        const targetId = e.currentTarget.getAttribute('href');
        if (targetId && targetId !== '#') {
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    };

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', smoothScroll);
    });

    // Add shadow to navbar on scroll with debounce
    let timeoutId;
    const navbar = document.querySelector('.navbar');
    
    if (navbar) {
        const handleScroll = () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }

            timeoutId = setTimeout(() => {
                const shadowValue = window.scrollY > 50 
                    ? '0 4px 20px rgba(0,0,0,0.1)' 
                    : '0 2px 10px rgba(0,0,0,0.1)';
                
                navbar.style.boxShadow = shadowValue;
            }, 10);
        };

        window.addEventListener('scroll', handleScroll);
        
        // Add transition for smooth shadow change
        navbar.style.transition = 'box-shadow 0.3s ease';
    }
});

// Add CSS animation class
const style = document.createElement('style');
style.textContent = `
    .stat-item.animate {
        opacity: 1 !important;
        transform: translateY(0) !important;
        transition: all 0.6s ease-out !important;
    }
`;
document.head.appendChild(style);