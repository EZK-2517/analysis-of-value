// Wait for the entire DOM to be loaded before running any code
document.addEventListener('DOMContentLoaded', function() {
    // Initialize main navigation functionality
    initializeNavigation();
    
    // Initialize any interactive features
    initializeInteractiveFeatures();
});

/**
 * Handles the main navigation functionality of the application.
 * Sets up event listeners for navigation items and manages content visibility.
 */
function initializeNavigation() {
    // Get all navigation items from the sidebar menu
    const navigationItems = document.querySelectorAll('.nav-menu li');
    
    // Get all content sections that will be shown/hidden
    const contentSections = document.querySelectorAll('.section-content');
    
    // Add click event listeners to each navigation item
    navigationItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all navigation items
            navigationItems.forEach(nav => nav.classList.remove('active'));
            
            // Add active class to the clicked navigation item
            this.classList.add('active');
            
            // Get the section ID from the data-section attribute
            const sectionId = this.getAttribute('data-section');
            
            // Hide all content sections
            contentSections.forEach(section => {
                section.classList.remove('active');
                
                // Add fade-out animation class if needed
                section.classList.remove('fade-in');
            });
            
            // Show the selected content section
            const targetSection = document.getElementById(sectionId);
            if (targetSection) {
                targetSection.classList.add('active');
                
                // Add fade-in animation class if needed
                targetSection.classList.add('fade-in');
                
                // Smooth scroll to top of content on mobile
                if (window.innerWidth < 1024) {
                    targetSection.scrollIntoView({ behavior: 'smooth' });
                }
            }
            
            // Update URL hash for direct linking (optional)
            window.location.hash = sectionId;
        });
    });
    
    // Handle direct links through URL hash
    handleURLHash();
    
    // Listen for hash changes in URL
    window.addEventListener('hashchange', handleURLHash);
}

/**
 * Handles direct linking to sections through URL hash
 * Allows bookmarking and sharing specific sections
 */
function handleURLHash() {
    const hash = window.location.hash.replace('#', '');
    if (hash) {
        const targetNav = document.querySelector(`.nav-menu li[data-section="${hash}"]`);
        if (targetNav) {
            targetNav.click();
        }
    }
}

/**
 * Initializes interactive features throughout the application
 * Includes hover effects, metrics animations, and responsive behaviors
 */
function initializeInteractiveFeatures() {
    // Initialize metric value animations
    initializeMetricAnimations();
    
    // Initialize responsive navigation for mobile
    initializeResponsiveNavigation();
    
    // Add hover effects to interactive elements
    initializeHoverEffects();
}

/**
 * Handles the animation of metric values when they come into view
 * Creates a counting up effect for numerical values
 */
function initializeMetricAnimations() {
    const metricValues = document.querySelectorAll('.metric-value');
    
    // Create an intersection observer for animation triggers
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateMetricValue(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });
    
    // Observe each metric value element
    metricValues.forEach(metric => observer.observe(metric));
}

/**
 * Animates a single metric value with a counting up effect
 * @param {HTMLElement} element - The element containing the metric value
 */
function animateMetricValue(element) {
    const value = parseFloat(element.textContent);
    const duration = 1000; // Animation duration in milliseconds
    const steps = 20; // Number of steps in the animation
    const increment = value / steps;
    let current = 0;
    let step = 0;
    
    const animation = setInterval(() => {
        step++;
        current += increment;
        
        if (step === steps) {
            current = value;
            clearInterval(animation);
        }
        
        // Update the display value
        element.textContent = current.toFixed(1) + '%';
    }, duration / steps);
}

/**
 * Initializes mobile-responsive navigation behaviors
 * Handles menu toggling and touch interactions
 */
function initializeResponsiveNavigation() {
    // Add mobile menu toggle functionality if needed
    const sidebar = document.querySelector('.sidebar');
    
    // Handle touch events for mobile navigation
    if (window.innerWidth < 1024) {
        let touchStartX = 0;
        let touchEndX = 0;
        
        document.addEventListener('touchstart', e => {
            touchStartX = e.changedTouches[0].screenX;
        }, false);
        
        document.addEventListener('touchend', e => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipeGesture();
        }, false);
        
        function handleSwipeGesture() {
            const swipeThreshold = 50;
            const swipeDistance = touchEndX - touchStartX;
            
            if (Math.abs(swipeDistance) > swipeThreshold) {
                if (swipeDistance > 0) {
                    // Swipe right - show menu
                    sidebar.classList.add('show-menu');
                } else {
                    // Swipe left - hide menu
                    sidebar.classList.remove('show-menu');
                }
            }
        }
    }
}

/**
 * Initializes hover effects for interactive elements
 * Adds visual feedback for user interactions
 */
function initializeHoverEffects() {
    // Add hover effects to cards
    const cards = document.querySelectorAll('.metric-card, .comparison-column, .timeline-phase');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '';
        });
    });
}

/**
 * Utility function to smoothly scroll to an element
 * @param {HTMLElement} element - The target element to scroll to
 */
function smoothScrollTo(element) {
    const offset = element.offsetTop;
    window.scrollTo({
        top: offset,
        behavior: 'smooth'
    });
}

// Export functions for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializeNavigation,
        initializeInteractiveFeatures,
        smoothScrollTo
    };
}
