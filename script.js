// =============================================
// CareerLoop – Interactions & Logic
// =============================================

document.addEventListener('DOMContentLoaded', () => {
    
    // --- Sticky Navbar ---
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- Mobile Menu Toggle ---
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileOverlay = document.querySelector('.mobile-overlay');
    const mobileLinks = document.querySelectorAll('.mobile-link, .mobile-menu .nav-cta');
    
    function toggleMenu() {
        hamburger.classList.toggle('open');
        mobileMenu.classList.toggle('open');
        mobileOverlay.classList.toggle('open');
        document.body.style.overflow = document.body.style.overflow === 'hidden' ? '' : 'hidden';
    }

    if (hamburger && mobileMenu && mobileOverlay) {
        hamburger.addEventListener('click', toggleMenu);
        mobileOverlay.addEventListener('click', toggleMenu);
        
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                if(mobileMenu.classList.contains('open')) {
                    toggleMenu();
                }
            });
        });
    }

    // --- Scroll Reveal Animations ---
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Stop observing once revealed
                // revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // --- Back to Top Button ---
    const backToTopBtn = document.getElementById('back-to-top');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // --- Smooth Scrolling for Anchor Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                
                // Account for fixed header
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

});

// --- Enquiry Form Logic ---
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    const icon = toast.querySelector('i');
    
    // Reset classes
    toast.className = 'toast';
    icon.className = 'fas';
    
    // Set content and specific classes
    toastMessage.textContent = message;
    
    if (type === 'success') {
        toast.classList.add('success');
        icon.classList.add('fa-check-circle');
    } else {
        toast.classList.add('error');
        icon.classList.add('fa-exclamation-circle');
    }
    
    // Show toast
    toast.classList.add('show');
    
    // Hide after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

function submitForm(event) {
    event.preventDefault();
    
    const form = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const formSuccess = document.getElementById('formSuccess');
    
    // Prepare Data
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    
    // Simulate API Call / Validation
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
    
    // Send email using FormSubmit AJAX API
    fetch('https://formsubmit.co/ajax/support.careerloop@gmail.com', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        // UI Updates for Success View
        form.style.display = 'none';
        formSuccess.style.display = 'block';
        showToast("Form details captured successfully.");
        
        // Reset button state
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<span>Submit Request</span><i class="fas fa-paper-plane"></i>';
    })
    .catch(error => {
        console.error('Error:', error);
        showToast("An error occurred. Please try again.", "error");
        
        // Reset button state
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<span>Submit Request</span><i class="fas fa-paper-plane"></i>';
    });
}

function resetForm() {
    const form = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');
    
    form.reset();
    form.style.display = 'block';
    formSuccess.style.display = 'none';
}
