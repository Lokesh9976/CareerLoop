// =============================================
// CareerLoop – Interactions & Logic
// =============================================

document.addEventListener('DOMContentLoaded', () => {

    // --- Sticky Navbar ---
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (navbar && window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else if (navbar) {
            navbar.classList.remove('scrolled');
        }
    });

    // --- Mobile Menu Toggle ---
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileOverlay = document.querySelector('.mobile-overlay');
    const mobileLinks = document.querySelectorAll('.mobile-link, .mobile-menu .nav-cta');

    function toggleMenu() {
        if (!hamburger) return;
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
                if (mobileMenu.classList.contains('open')) {
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
        if (backToTopBtn) {
            if (window.scrollY > 500) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
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
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();

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

    // --- Demo Button Special Handling ---
    document.querySelectorAll('.trial-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const messageArea = document.getElementById('message');
            if (messageArea) {
                messageArea.value = "I am interested in a Free Demo / Trial Class. Please contact me with more information.";
            }
            const trialCheckbox = document.querySelector('input[name="trial_class"]');
            if (trialCheckbox) {
                trialCheckbox.checked = true;
            }
        });
    });

});

// --- Course Data & Modal Logic ---
const courseData = {
    'java': {
        title: 'Full Stack Java Development',
        tag: 'Most Popular',
        duration: '4 - 6 Months',
        mode: 'Online / Offline (Kallakurichi/Chennai)',
        syllabus: [
            { title: 'Backend Foundation', desc: 'Core Java, OOPs, Collections, Exception Handling.' },
            { title: 'Database Mastery', desc: 'MySQL, JDBC, Hibernate/JPA.' },
            { title: 'Spring Framework', desc: 'Spring Boot, Spring Security, REST APIs.' },
            { title: 'Frontend Integration', desc: 'Connecting with React.js / Angular.' }
        ]
    },
    'python': {
        title: 'Full Stack Python Development',
        tag: 'Modern Web',
        duration: '3 - 5 Months',
        mode: 'Online / Offline',
        syllabus: [
            { title: 'Python Fundamentals', desc: 'Syntax, Data Types, Control Flows, Functions.' },
            { title: 'Web Development', desc: 'Django Framework, Templates, ORM.' },
            { title: 'REST Framework', desc: 'Django REST API creation and documentation.' },
            { title: 'Full Stack Project', desc: 'Deploying a complete app to cloud.' }
        ]
    },
    'sales': {
        title: 'Sales & Marketing Specialization',
        tag: 'Business Growth',
        duration: '2 - 3 Months',
        mode: 'Offline Focus',
        syllabus: [
            { title: 'Sales Psychology', desc: 'Understanding customer behavior and closing skills.' },
            { title: 'Digital Marketing', desc: 'Social Media Management, SEO basics, Ad Campaigns.' },
            { title: 'Communication Mastery', desc: 'Business communication and presentation skills.' },
            { title: 'CRM Tools', desc: 'Managing leads with modern CRM software.' }
        ]
    },
    'bpo': {
        title: 'BPO Professional Training',
        tag: 'Immediate Hiring',
        duration: '1 - 2 Months',
        mode: 'Classroom / Practical',
        syllabus: [
            { title: 'Communication Skills', desc: 'Neutral accent training and flueny building.' },
            { title: 'BPO Operations', desc: 'Voice, Semi-voice, and Chat process workflows.' },
            { title: 'Customer Empathy', desc: 'Handling difficult clients and resolution skills.' },
            { title: 'Mock Support', desc: 'Roleplay sessions on real-world support scenarios.' }
        ]
    },
    'sql': {
        title: 'SQL & Database Management',
        tag: 'Data Core',
        duration: '2 Months',
        mode: 'Hybrid Mode',
        syllabus: [
            { title: 'SQL Basics', desc: 'Select statements, Joins, and basic filtering.' },
            { title: 'Advanced Queries', desc: 'Common Table Expressions (CTE), Window functions.' },
            { title: 'DB Architecture', desc: 'Normalization, Indexing, and Performance tuning.' },
            { title: 'Real-time Projects', desc: 'Designing a database for an e-commerce platform.' }
        ]
    },
    'nonit': {
        title: 'Non-IT Professional Opportunities',
        tag: 'Pan India Jobs',
        duration: 'Variable (Role Based)',
        mode: 'Industry Training',
        syllabus: [
            { title: 'Office Operations', desc: 'Administrative tasks, documentation, and reporting.' },
            { title: 'Retail & Management', desc: 'Store operations and inventory management.' },
            { title: 'Finance Basics', desc: 'Basic accounting and banking processes.' },
            { title: 'Interview Express', desc: 'Quick preparation for non-tech job roles.' }
        ]
    }
};

function openCourseModal(courseId) {
    const data = courseData[courseId];
    if (!data) return;

    const modal = document.getElementById('courseModal');
    const title = document.getElementById('modalTitle');
    const tag = document.getElementById('modalTag');
    const duration = document.getElementById('modalDuration');
    const mode = document.getElementById('modalMode');
    const syllabusList = document.getElementById('modalSyllabus');

    title.textContent = data.title;
    tag.textContent = data.tag;
    duration.textContent = data.duration;
    mode.textContent = data.mode;

    // Clear and Fill Syllabus
    syllabusList.innerHTML = '';
    data.syllabus.forEach((item, index) => {
        const syllabusItem = document.createElement('div');
        syllabusItem.className = 'syllabus-item';
        syllabusItem.innerHTML = `
            <div class="syllabus-num">0${index + 1}</div>
            <div class="syllabus-details">
                <h4>${item.title}</h4>
                <p>${item.desc}</p>
            </div>
        `;
        syllabusList.appendChild(syllabusItem);
    });

    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeCourseModal() {
    const modal = document.getElementById('courseModal');
    modal.classList.remove('open');
    document.body.style.overflow = '';
}

// Close modal on escape key
window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeCourseModal();
});

// Close modal on outside click
window.addEventListener('click', (e) => {
    const modal = document.getElementById('courseModal');
    if (e.target === modal) closeCourseModal();
});

// --- Enquiry Form Logic ---
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    const icon = toast.querySelector('i');

    if (!toast) return;

    toast.className = 'toast';
    icon.className = 'fas';
    toastMessage.textContent = message;

    if (type === 'success') {
        toast.classList.add('success');
        icon.classList.add('fa-check-circle');
    } else {
        toast.classList.add('error');
        icon.classList.add('fa-exclamation-circle');
    }

    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

function submitForm(event) {
    event.preventDefault();

    const form = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const formSuccess = document.getElementById('formSuccess');

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    // Add trial interest status explicitly
    data.requested_trial = form.trial_class.checked ? "YES" : "NO";

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
            form.style.display = 'none';
            formSuccess.style.display = 'block';
            showToast("Form details captured successfully.");

            submitBtn.disabled = false;
            submitBtn.innerHTML = '<span>Apply Now</span><i class="fas fa-paper-plane"></i>';
        })
        .catch(error => {
            console.error('Error:', error);
            showToast("An error occurred. Please try again.", "error");

            submitBtn.disabled = false;
            submitBtn.innerHTML = '<span>Apply Now</span><i class="fas fa-paper-plane"></i>';
        });
}

function resetForm() {
    const form = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');

    form.reset();
    form.style.display = 'block';
    formSuccess.style.display = 'none';
}

