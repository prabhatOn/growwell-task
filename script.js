// Mobile Menu Toggle
const menuToggle = document.getElementById("menuToggle")
const navbar = document.querySelector(".navbar")
const navLinks = document.querySelector(".nav-links")

menuToggle.addEventListener("click", () => {
  navbar.classList.toggle("active")
  navLinks.classList.toggle("active")
})

// Close mobile menu when clicking on a nav link
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navbar.classList.remove("active")
    navLinks.classList.remove("active")
  })
})

// Close mobile menu when clicking outside
document.addEventListener("click", (e) => {
  if (!navbar.contains(e.target) && navbar.classList.contains("active")) {
    navbar.classList.remove("active")
    navLinks.classList.remove("active")
  }
})

// Navbar Scroll Effect
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled")
  } else {
    navbar.classList.remove("scrolled")
  }
})

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Form Submission
const form = document.querySelector("form")
form.addEventListener("submit", (e) => {
  e.preventDefault()
  // Add your form submission logic here
  alert("Thank you for your interest! We will contact you soon.")
  form.reset()
})

// Add animation on scroll
const animateOnScroll = () => {
  const elements = document.querySelectorAll(".stat-item, .course-card, .testimonial-card")

  elements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top
    const elementBottom = element.getBoundingClientRect().bottom

    if (elementTop < window.innerHeight && elementBottom > 0) {
      element.style.opacity = "1"
      element.style.transform = "translateY(0)"
    }
  })
}

// Initial animation setup
document.querySelectorAll(".stat-item, .course-card, .testimonial-card").forEach((element) => {
  element.style.opacity = "0"
  element.style.transform = "translateY(20px)"
  element.style.transition = "all 0.5s ease-out"
})

// Listen for scroll events
window.addEventListener("scroll", animateOnScroll)
// Initial check for elements in view
window.addEventListener("load", animateOnScroll)

// Testimonial Slider
let currentSlide = 0
const testimonialSlider = document.querySelector(".testimonials-slider")
const testimonialCards = document.querySelectorAll(".testimonial-card")
const dots = document.querySelectorAll(".dot")
const totalSlides = testimonialCards.length

// Clone all slides for infinite loop
function setupInfiniteSlider() {
  // Clone all slides and append them
  testimonialCards.forEach((card) => {
    const clone = card.cloneNode(true)
    testimonialSlider.appendChild(clone)
  })

  // Set initial position
  const slideWidth = testimonialCards[0].offsetWidth + 30
  testimonialSlider.style.transform = `translateX(-${slideWidth}px)`
}

// Function to update dots
function updateDots() {
  dots.forEach((dot, index) => {
    dot.classList.toggle("active", index === currentSlide)
  })
}

// Function to handle the transition
function handleTransition(direction) {
  testimonialSlider.style.transition = "transform 0.5s ease-in-out"
  const slideWidth = testimonialCards[0].offsetWidth + 30 // 30px is the gap

  if (direction === 1 && currentSlide === totalSlides - 1) {
    // Moving forward from last slide
    currentSlide = 0
    testimonialSlider.style.transform = `translateX(-${(totalSlides + 1) * slideWidth}px)`

    setTimeout(() => {
      testimonialSlider.style.transition = "none"
      testimonialSlider.style.transform = `translateX(-${slideWidth}px)`
    }, 500)
  } else if (direction === -1 && currentSlide === 0) {
    // Moving backward from first slide
    currentSlide = totalSlides - 1
    testimonialSlider.style.transform = `translateX(0px)`

    setTimeout(() => {
      testimonialSlider.style.transition = "none"
      testimonialSlider.style.transform = `translateX(-${totalSlides * slideWidth}px)`
    }, 500)
  } else {
    // Normal slide transition
    currentSlide = (currentSlide + direction + totalSlides) % totalSlides
    testimonialSlider.style.transform = `translateX(-${(currentSlide + 1) * slideWidth}px)`
  }

  updateDots()
}

// Function to move the slider
function moveSlider(direction) {
  handleTransition(direction)
}

// Function to move to specific slide
function moveToSlide(slideIndex) {
  const direction = slideIndex - currentSlide
  if (direction !== 0) {
    handleTransition(direction > 0 ? 1 : -1)
  }
}

// Initialize slider
document.addEventListener("DOMContentLoaded", () => {
  setupInfiniteSlider()

  // Add click events to dots
  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => moveToSlide(index))
  })

  // Add click events to arrows
  document.querySelector(".prev-btn").addEventListener("click", () => moveSlider(-1))
  document.querySelector(".next-btn").addEventListener("click", () => moveSlider(1))

  // Auto-slide functionality
  let autoSlideInterval = setInterval(() => moveSlider(1), 5000)

  // Pause auto-slide on hover
  testimonialSlider.addEventListener("mouseenter", () => clearInterval(autoSlideInterval))
  testimonialSlider.addEventListener("mouseleave", () => {
    autoSlideInterval = setInterval(() => moveSlider(1), 5000)
  })

  // Handle window resize
  window.addEventListener("resize", () => {
    const slideWidth = testimonialCards[0].offsetWidth + 30
    testimonialSlider.style.transition = "none"
    testimonialSlider.style.transform = `translateX(-${(currentSlide + 1) * slideWidth}px)`
  })

  // Handle transition end
  testimonialSlider.addEventListener("transitionend", () => {
    if (currentSlide === 0 || currentSlide === totalSlides - 1) {
      testimonialSlider.style.transition = "none"
      const slideWidth = testimonialCards[0].offsetWidth + 30
      testimonialSlider.style.transform = `translateX(-${(currentSlide + 1) * slideWidth}px)`
      setTimeout(() => {
        testimonialSlider.style.transition = "transform 0.5s ease-in-out"
      }, 10)
    }
  })
})

document.addEventListener("DOMContentLoaded", () => {
  // Animate elements on page load
  const glassContainer = document.querySelector(".bento-section-glass-container")
  const textContent = document.querySelector(".bento-section-text-content")
  const bentoItems = document.querySelectorAll(".bento-section-item")

  // Simple fade-in animation
  glassContainer.style.opacity = "0"
  textContent.style.opacity = "0"
  bentoItems.forEach((item) => {
    item.style.opacity = "0"
    item.style.transform = "translateY(20px)"
  })

  // Animate glass container
  setTimeout(() => {
    glassContainer.style.transition = "opacity 0.8s ease-out"
    glassContainer.style.opacity = "1"
  }, 100)

  // Animate text content
  setTimeout(() => {
    textContent.style.transition = "opacity 0.8s ease-out"
    textContent.style.opacity = "1"
  }, 300)

  // Animate bento items one by one with a staggered effect
  bentoItems.forEach((item, index) => {
    setTimeout(
      () => {
        item.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out"
        item.style.opacity = "1"
        item.style.transform = "translateY(0)"
      },
      500 + index * 150,
    )
  })

  // Add hover effect to CTA button
  const ctaButton = document.querySelector(".bento-section-cta-button")
  ctaButton.addEventListener("mouseover", function () {
    this.style.transform = "translateY(-2px)"
  })

  ctaButton.addEventListener("mouseout", function () {
    this.style.transform = "translateY(0)"
  })

  // Add click animation to CTA button
  ctaButton.addEventListener("click", function () {
    this.style.transform = "scale(0.95)"
    setTimeout(() => {
      this.style.transform = "scale(1)"
      alert("Redirecting to courses page...")
    }, 150)
  })

  // Add subtle parallax effect to background circles
  const bgCircle1 = document.querySelector(".bento-section-bg-circle-1")
  const bgCircle2 = document.querySelector(".bento-section-bg-circle-2")

  document.addEventListener("mousemove", (e) => {
    const x = e.clientX / window.innerWidth
    const y = e.clientY / window.innerHeight

    bgCircle1.style.transform = `translate(${x * 20}px, ${y * 20}px)`
    bgCircle2.style.transform = `translate(${-x * 20}px, ${-y * 20}px)`
  })

  // Add subtle zoom effect on image hover
  const imageItems = document.querySelectorAll(".bento-section-image-item")
  imageItems.forEach((item) => {
    item.addEventListener("mouseenter", function () {
      const img = this.querySelector("img")
      img.style.transform = "scale(1.05)"
    })

    item.addEventListener("mouseleave", function () {
      const img = this.querySelector("img")
      img.style.transform = "scale(1)"
    })
  })
})

