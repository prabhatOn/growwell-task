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
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (navLinks.classList.contains('active') && 
                !navLinks.contains(e.target) && 
                !menuToggle.contains(e.target)) {
                navLinks.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                navLinks.classList.remove('active');
                if (icon) {
                    icon.classList.add('fa-bars');
                    icon.classList.remove('fa-times');
                }
            }
        });
        
        // Close menu when clicking on a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                if (icon) {
                    icon.classList.add('fa-bars');
                    icon.classList.remove('fa-times');
                }
            });
        });
    }

    // Add this new code for quick links functionality
    const expandableItems = document.querySelectorAll('.expandable');
    
    expandableItems.forEach(item => {
        const header = item.querySelector('.link-header');
        const content = item.querySelector('.link-content');
        const icon = header.querySelector('i');
        
        header.addEventListener('click', () => {
            // Toggle the content display
            content.style.display = content.style.display === 'block' ? 'none' : 'block';
            
            // Toggle the icon rotation
            icon.style.transform = content.style.display === 'block' ? 'rotate(180deg)' : 'rotate(0)';
            
            // Toggle active class
            item.classList.toggle('active');
        });
    });

    // Stats grid observer code
    const statsGrid = document.querySelector('.stats-grid');
    if (statsGrid) {
        observer.observe(statsGrid);
    }
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