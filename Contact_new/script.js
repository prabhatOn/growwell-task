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
            const name = contactForm.querySelector('#name').value;
            const email = contactForm.querySelector('#email').value;
            const phone = contactForm.querySelector('#phone').value;
            const message = contactForm.querySelector('#message').value;

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
            
            // Check if input has value on page load
            if (input.value) {
                input.parentElement.classList.add('focused');
            }
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
                
                if (window.scrollY > 50) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
            }, 10);
        };

        window.addEventListener('scroll', handleScroll);
        navbar.style.transition = 'box-shadow 0.3s ease, padding 0.3s ease';
    }
    
    // Handle view more numbers button
    const viewMoreBtn = document.querySelector('.view-more');
    if (viewMoreBtn) {
        viewMoreBtn.addEventListener('click', function() {
            const phoneContainer = this.previousElementSibling;
            const icon = this.querySelector('i');
            
            // Removed unused variable 'icon'
            if (!document.querySelector('.additional-numbers')) {
                const additionalNumbers = document.createElement('div');
                additionalNumbers.className = 'additional-numbers';
                additionalNumbers.style.display = 'none';
                additionalNumbers.innerHTML = `
                    <a href="tel:9876543210" class="phone-number">+91 9876543210</a>
                    <a href="tel:8765432109" class="phone-number">+91 8765432109</a>
                `;
                phoneContainer.parentNode.insertBefore(additionalNumbers, this);
            }
            
            const additionalNumbers = document.querySelector('.additional-numbers');
            
            if (additionalNumbers.style.display === 'none') {
                additionalNumbers.style.display = 'flex';
                additionalNumbers.style.flexDirection = 'column';
                additionalNumbers.style.gap = '0.5rem';
                additionalNumbers.style.marginTop = '0.5rem';
                this.innerHTML = 'Show less <i class="fas fa-chevron-up"></i>';
            } else {
                additionalNumbers.style.display = 'none';
                this.innerHTML = 'View all numbers <i class="fas fa-chevron-down"></i>';
            }
        });
    }
    
    // Make sure the page scrolls to the form when clicking the Contact Support button
    const contactSupportBtn = document.querySelector('.cta-button');
    if (contactSupportBtn) {
        contactSupportBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const formSection = document.getElementById('contact-form');
            if (formSection) {
                const offsetTop = formSection.offsetTop - 100;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    }
    
    // Ensure responsive behavior on window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 992) {
            const navLinks = document.querySelector('.nav-links');
            if (navLinks && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                const icon = document.querySelector('#menuToggle i');
                if (icon) {
                    icon.classList.add('fa-bars');
                    icon.classList.remove('fa-times');
                }
            }
        }
    });
});