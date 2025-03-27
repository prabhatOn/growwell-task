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

    // Contact Form Handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalText = submitBtn.innerHTML;
            
            // Show loading state
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;

            // Collect form data
            const formData = {
                name: contactForm.querySelector('#name').value,
                email: contactForm.querySelector('#email').value,
                phone: contactForm.querySelector('#phone').value,
                message: contactForm.querySelector('#message').value
            };

            try {
                // Here you would typically send the data to your server
                // For now, we'll simulate a delay
                await new Promise(resolve => setTimeout(resolve, 1500));
                
                // Show success message
                alert('Thank you for your message! We will get back to you soon.');
                contactForm.reset();
            } catch (error) {
                alert('Sorry, there was an error sending your message. Please try again.');
            } finally {
                // Reset button state
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
        });

        // Input animations
        const formInputs = contactForm.querySelectorAll('input, textarea');
        formInputs.forEach(input => {
            input.addEventListener('focus', () => {
                input.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', () => {
                if (!input.value) {
                    input.parentElement.classList.remove('focused');
                }
            });
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
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        statsItems.forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            observer.observe(item);
        });
    }

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

    .form-group.focused label {
        color: var(--accent-color);
    }
`;
document.head.appendChild(style); 