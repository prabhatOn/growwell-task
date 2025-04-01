// Counter animation function
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000; // 2 seconds
    const step = 30; // Update every 30ms
    const increment = (target * step) / duration;
    let current = 0;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, step);
}

// Intersection Observer for triggering counter animation
const observerOptions = {
    threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counters = entry.target.querySelectorAll('.counter');
            counters.forEach(counter => animateCounter(counter));
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Start observing the stats grid
document.addEventListener('DOMContentLoaded', () => {
    const statsGrid = document.querySelector('.stats-grid');
    if (statsGrid) {
        observer.observe(statsGrid);
    }

    // Expandable sections
    const expandableItems = document.querySelectorAll('.expandable');
    
    expandableItems.forEach(item => {
        const header = item.querySelector('.link-header');
        
        header.addEventListener('click', () => {
            // Close other open items
            expandableItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });

    // Mobile menu functionality with improved animations
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    // Create overlay element
    const overlay = document.createElement('div');
    overlay.className = 'menu-overlay';
    document.body.appendChild(overlay);

    function openMobileMenu() {
        mobileMenu.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeMobileMenu() {
        mobileMenu.classList.add('closing');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
        
        setTimeout(() => {
            mobileMenu.classList.remove('active', 'closing');
        }, 300);
    }

    menuToggle.addEventListener('click', () => {
        if (!mobileMenu.classList.contains('active')) {
            openMobileMenu();
        } else {
            closeMobileMenu();
        }
    });

    // Close mobile menu when clicking overlay
    overlay.addEventListener('click', closeMobileMenu);

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!mobileMenu.contains(e.target) && 
            !menuToggle.contains(e.target) && 
            mobileMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });

    // Handle mobile menu link clicks
    const mobileLinks = document.querySelectorAll('.mobile-nav-links a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            closeMobileMenu();
        });
    });
});

// Add hover effect for stat items
document.querySelectorAll('.stat-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'translateY(-10px)';
        item.style.boxShadow = '0 10px 30px rgba(34, 211, 238, 0.1)';
    });

    item.addEventListener('mouseleave', () => {
        item.style.transform = 'translateY(0)';
        item.style.boxShadow = 'none';
    });
}); 