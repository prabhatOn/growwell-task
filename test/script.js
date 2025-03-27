document.addEventListener("DOMContentLoaded", () => {
    // Filter functionality
    const filterTabs = document.querySelectorAll(".filter-tab")
    const courseCards = document.querySelectorAll(".course-card")
  
    // Add click event to filter tabs
    filterTabs.forEach((tab) => {
      tab.addEventListener("click", function () {
        // Remove active class from all tabs
        filterTabs.forEach((t) => t.classList.remove("active"))
  
        // Add active class to clicked tab
        this.classList.add("active")
  
        // Get category to filter
        const category = this.getAttribute("data-category")
  
        // Filter courses
        courseCards.forEach((card) => {
          if (category === "all" || card.getAttribute("data-category") === category) {
            card.style.display = "block"
          } else {
            card.style.display = "none"
          }
        })
      })
    })
  
    // View toggle functionality
    const viewButtons = document.querySelectorAll(".view-btn")
    const coursesGrid = document.getElementById("coursesGrid")
  
    viewButtons.forEach((btn) => {
      btn.addEventListener("click", function () {
        // Remove active class from all view buttons
        viewButtons.forEach((b) => b.classList.remove("active"))
  
        // Add active class to clicked button
        this.classList.add("active")
  
        // Get view type
        const viewType = this.getAttribute("data-view")
  
        // Apply view type
        if (viewType === "list") {
          coursesGrid.classList.add("list-view")
        } else {
          coursesGrid.classList.remove("list-view")
        }
      })
    })
  
    // Sort functionality
    const sortOptions = document.querySelectorAll(".dropdown-content a")
  
    sortOptions.forEach((option) => {
      option.addEventListener("click", function (e) {
        e.preventDefault()
  
        // Get sort type
        const sortType = this.getAttribute("data-sort")
  
        // Get all courses
        const courses = Array.from(courseCards)
  
        // Sort courses based on sort type
        switch (sortType) {
          case "popular":
            // Sort by popularity (this is just a placeholder - you would need real data)
            // For demo purposes, we'll just randomize
            shuffleArray(courses)
            break
          case "newest":
            // Sort by newest (this is just a placeholder)
            // For demo purposes, we'll just randomize
            shuffleArray(courses)
            break
          case "price-low":
            // Sort by price low to high
            courses.sort((a, b) => {
              const priceA = getPriceFromCard(a)
              const priceB = getPriceFromCard(b)
              return priceA - priceB
            })
            break
          case "price-high":
            // Sort by price high to low
            courses.sort((a, b) => {
              const priceA = getPriceFromCard(a)
              const priceB = getPriceFromCard(b)
              return priceB - priceA
            })
            break
        }
  
        // Reorder courses in the DOM
        courses.forEach((course) => {
          coursesGrid.appendChild(course)
        })
      })
    })
  
    // Helper function to get price from course card
    function getPriceFromCard(card) {
      const priceText = card.querySelector(".price").textContent
      // Extract number from price text (e.g., "₹12,999" -> 12999)
      return Number.parseInt(priceText.replace(/[^\d]/g, ""))
    }
  
    // Helper function to shuffle array
    function shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[array[i], array[j]] = [array[j], array[i]]
      }
      return array
    }
  
    // Pagination functionality
    const paginationButtons = document.querySelectorAll(".pagination-btn")
  
    paginationButtons.forEach((btn) => {
      btn.addEventListener("click", function () {
        // Skip if button is already active or is ellipsis
        if (this.classList.contains("active") || this.textContent === "...") {
          return
        }
  
        // Remove active class from all pagination buttons
        paginationButtons.forEach((b) => b.classList.remove("active"))
  
        // Add active class to clicked button
        this.classList.add("active")
  
        // In a real application, you would load the appropriate page of courses here
        // For this demo, we'll just scroll to the top of the courses section
        document.querySelector(".all-courses-section").scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      })
    })
  
    // Sticky filter bar functionality
    const filterSection = document.querySelector(".courses-filter-section")
    const filterSectionTop = filterSection.offsetTop
  
    window.addEventListener("scroll", () => {
      if (window.scrollY > filterSectionTop) {
        filterSection.classList.add("sticky")
      } else {
        filterSection.classList.remove("sticky")
      }
    })
  
    // Add animation on scroll for course cards
    const animateOnScroll = () => {
      const elements = document.querySelectorAll(".course-card, .featured-course-card, .category-card")
  
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
    document.querySelectorAll(".course-card, .featured-course-card, .category-card").forEach((element) => {
      element.style.opacity = "0"
      element.style.transform = "translateY(20px)"
      element.style.transition = "all 0.5s ease-out"
    })
  
    // Listen for scroll events
    window.addEventListener("scroll", animateOnScroll)
  
    // Initial check for elements in view
    window.addEventListener("load", animateOnScroll)
  })
  
  