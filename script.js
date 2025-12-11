// ===== Navigation Scroll Effect =====
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ===== Mobile Menu Toggle =====
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');

    // Animate hamburger
    const spans = hamburger.querySelectorAll('span');
    if (navMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translateY(10px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translateY(-10px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// ===== Smooth Scroll & Active Link =====
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const targetId = link.getAttribute('href');

        // Only prevent default for hash links (internal page navigation)
        if (targetId.startsWith('#')) {
            e.preventDefault();

            // Close mobile menu
            navMenu.classList.remove('active');
            const spans = hamburger.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';

            // Get target section
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }

            // Update active link
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        }
    });
});

// ===== Intersection Observer for Active Links =====
const sections = document.querySelectorAll('section[id]');

const observerOptions = {
    root: null,
    rootMargin: '-100px',
    threshold: 0.3
};

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}, observerOptions);

sections.forEach(section => sectionObserver.observe(section));

// ===== Counter Animation =====
const statNumbers = document.querySelectorAll('.stat-number');
let hasAnimated = false;

const animateCounter = (element) => {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60fps
    let current = 0;

    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };

    updateCounter();
};

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !hasAnimated) {
            hasAnimated = true;
            statNumbers.forEach(stat => {
                animateCounter(stat);
            });
        }
    });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    counterObserver.observe(heroStats);
}

// ===== Service Cards Animation =====
const serviceCards = document.querySelectorAll('.service-card');

const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
        }
    });
}, { threshold: 0.1 });

serviceCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.6s ease';
    cardObserver.observe(card);
});

// ===== Testimonial Cards Animation =====
const testimonialCards = document.querySelectorAll('.testimonial-card');

testimonialCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.6s ease';

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 150);
            }
        });
    }, { threshold: 0.1 });

    observer.observe(card);
});

// ===== Contact Form Handling =====
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const company = document.getElementById('company').value;
    const message = document.getElementById('message').value;

    // Create success message
    const successMessage = document.createElement('div');
    successMessage.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(135deg, #10b981, #059669);
        color: white;
        padding: 1.5rem 2rem;
        border-radius: 12px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        animation: slideIn 0.5s ease;
        font-weight: 600;
    `;
    successMessage.innerHTML = `
        <div style="display: flex; align-items: center; gap: 12px;">
            <span style="font-size: 24px;">✓</span>
            <div>
                <div style="font-size: 1.1rem; margin-bottom: 4px;">Message Sent!</div>
                <div style="font-size: 0.9rem; opacity: 0.9;">We'll get back to you soon.</div>
            </div>
        </div>
    `;

    // Add animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    document.body.appendChild(successMessage);

    // Reset form
    contactForm.reset();

    // Remove message after 4 seconds
    setTimeout(() => {
        successMessage.style.animation = 'slideOut 0.5s ease';
        setTimeout(() => {
            successMessage.remove();
        }, 500);
    }, 4000);

    // Log form data (in production, this would be sent to a server)
    console.log('Form submitted:', { name, email, company, message });
});

// ===== Parallax Effect for Hero Background =====
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroBackground = document.querySelector('.hero-background');

    if (heroBackground && scrolled < window.innerHeight) {
        heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// ===== Button Click Effects =====
const buttons = document.querySelectorAll('.btn, .cta-button');

buttons.forEach(button => {
    button.addEventListener('click', function (e) {
        // Create ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.5);
            left: ${x}px;
            top: ${y}px;
            pointer-events: none;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
        `;

        // Add ripple animation
        if (!document.querySelector('#ripple-style')) {
            const rippleStyle = document.createElement('style');
            rippleStyle.id = 'ripple-style';
            rippleStyle.textContent = `
                @keyframes ripple {
                    to {
                        transform: scale(2);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(rippleStyle);
        }

        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
});

// ===== Lazy Loading for Images (when you add real images) =====
const lazyImages = document.querySelectorAll('img[data-src]');

const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
        }
    });
});

lazyImages.forEach(img => imageObserver.observe(img));

// ===== Smooth Reveal on Scroll =====
const revealElements = document.querySelectorAll('.about-text, .contact-info');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.2 });

revealElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'all 0.8s ease';
    revealObserver.observe(element);
});

// ===== Console Welcome Message =====
console.log('%c👋 Welcome to Alessandro Marangi Career Coach!', 'font-size: 20px; font-weight: bold; color: #6366f1;');
console.log('%cInterested in our services? Contact us at alessandro.marangi1@gmail.com', 'font-size: 14px; color: #6b7280;');

// ===== Booking Calendar Functionality =====
let currentDate = new Date();
let selectedDate = null;
let selectedTime = null;

const calendarDays = document.getElementById('calendarDays');
const calendarTitle = document.getElementById('calendarTitle');
const prevMonthBtn = document.getElementById('prevMonth');
const nextMonthBtn = document.getElementById('nextMonth');
const selectedDateDisplay = document.getElementById('selectedDateDisplay');
const timeSlots = document.querySelectorAll('.time-slot');
const confirmBookingBtn = document.getElementById('confirmBooking');

// Month names
const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];

// Generate calendar
function generateCalendar(year, month) {
    calendarDays.innerHTML = '';
    calendarTitle.textContent = `${monthNames[month]} ${year}`;

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();
    const today = new Date();

    // Previous month days
    for (let i = firstDay - 1; i >= 0; i--) {
        const day = daysInPrevMonth - i;
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day other-month';
        dayElement.textContent = day;
        calendarDays.appendChild(dayElement);
    }

    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day';
        dayElement.textContent = day;

        const currentDateObj = new Date(year, month, day);

        // Mark today
        if (currentDateObj.toDateString() === today.toDateString()) {
            dayElement.classList.add('today');
        }

        // Disable past dates
        if (currentDateObj < today.setHours(0, 0, 0, 0)) {
            dayElement.classList.add('disabled');
        } else {
            // Add click handler for future dates
            dayElement.addEventListener('click', () => selectDate(year, month, day, dayElement));
        }

        calendarDays.appendChild(dayElement);
    }

    // Next month days to fill grid
    const totalCells = calendarDays.children.length;
    const remainingCells = 42 - totalCells; // 6 rows * 7 days
    for (let day = 1; day <= remainingCells; day++) {
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day other-month';
        dayElement.textContent = day;
        calendarDays.appendChild(dayElement);
    }
}

// Select date
function selectDate(year, month, day, element) {
    // Remove previous selection
    document.querySelectorAll('.calendar-day.selected').forEach(el => {
        el.classList.remove('selected');
    });

    // Add selection to clicked day
    element.classList.add('selected');

    selectedDate = new Date(year, month, day);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    selectedDateDisplay.textContent = selectedDate.toLocaleDateString('en-US', options);

    // Enable time slots
    timeSlots.forEach(slot => {
        slot.classList.remove('disabled');
    });
}

// Previous month
prevMonthBtn.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    generateCalendar(currentDate.getFullYear(), currentDate.getMonth());
});

// Next month
nextMonthBtn.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    generateCalendar(currentDate.getFullYear(), currentDate.getMonth());
});

// Time slot selection
timeSlots.forEach(slot => {
    slot.addEventListener('click', () => {
        if (!slot.classList.contains('disabled')) {
            // Remove previous selection
            timeSlots.forEach(s => s.classList.remove('selected'));

            // Add selection
            slot.classList.add('selected');
            selectedTime = slot.getAttribute('data-time');
        }
    });
});

// Initialize EmailJS
(function () {
    // PUBLIC KEY - User needs to replace this
    emailjs.init("kq_4a5BZqXzN0lmnD");
})();

// Captcha Logic
let captchaCorrectAnswer = 0;

function generateCaptcha() {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    captchaCorrectAnswer = num1 + num2;
    const captchaQuestionElement = document.getElementById('captchaQuestion');
    if (captchaQuestionElement) {
        captchaQuestionElement.textContent = `${num1} + ${num2} = ?`;
    }
}

// Generate captcha on load
generateCaptcha();

// Confirm booking
confirmBookingBtn.addEventListener('click', () => {
    const serviceType = document.getElementById('serviceType').value;
    const name = document.getElementById('bookingName').value;
    const email = document.getElementById('bookingEmail').value;
    const phone = document.getElementById('bookingPhone').value;
    const notes = document.getElementById('bookingNotes').value;
    const captchaAnswer = document.getElementById('captchaAnswer').value;

    // Validation
    if (!selectedDate) {
        showNotification('Please select a date', 'error');
        return;
    }

    if (!selectedTime) {
        showNotification('Please select a time slot', 'error');
        return;
    }

    if (!serviceType) {
        showNotification('Please select a service type', 'error');
        return;
    }

    if (!name || !email) {
        showNotification('Please fill in your name and email', 'error');
        return;
    }

    // Captcha Validation
    if (parseInt(captchaAnswer) !== captchaCorrectAnswer) {
        showNotification('Incorrect math answer. Please try again.', 'error');
        generateCaptcha(); // Regenerate for security
        document.getElementById('captchaAnswer').value = '';
        return;
    }

    // Create booking object (for EmailJS)
    const templateParams = {
        to_name: "Alessandro Marangi",
        from_name: name,
        from_email: email,
        phone_number: phone,
        service_type: serviceType,
        booking_date: selectedDate.toLocaleDateString('en-US'),
        booking_time: selectedTime,
        message: notes
    };

    // Log booking (debug)
    console.log('Booking confirmed:', templateParams);

    // Send Email via EmailJS
    // Replace YOUR_SERVICE_ID and YOUR_TEMPLATE_ID with actual values
    confirmBookingBtn.textContent = 'Sending...';
    confirmBookingBtn.disabled = true;

    emailjs.send('service_wmfkp8h', 'template_b3rxhbs', templateParams)
        .then(function (response) {
            console.log('SUCCESS!', response.status, response.text);
            showNotification(`Booking confirmed for ${templateParams.booking_date} at ${templateParams.booking_time}! Email sent.`, 'success');
            // Reset form
            document.getElementById('serviceType').value = '';
            document.getElementById('bookingName').value = '';
            document.getElementById('bookingEmail').value = '';
            document.getElementById('bookingPhone').value = '';
            document.getElementById('bookingNotes').value = '';
            document.getElementById('captchaAnswer').value = '';
            generateCaptcha();

            // Reset selections
            document.querySelectorAll('.calendar-day.selected').forEach(el => {
                el.classList.remove('selected');
            });
            timeSlots.forEach(s => s.classList.remove('selected'));
            selectedDate = null;
            selectedTime = null;
            selectedDateDisplay.textContent = 'No date selected';
        }, function (error) {
            console.log('FAILED...', error);
            showNotification('Booking failed to send email. Please try again or contact us directly.', 'error');
        })
        .finally(() => {
            confirmBookingBtn.textContent = 'Confirm Booking';
            confirmBookingBtn.disabled = false;
        });
});

// Show notification
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    const bgColor = type === 'success'
        ? 'linear-gradient(135deg, #10b981, #059669)'
        : 'linear-gradient(135deg, #ef4444, #dc2626)';

    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${bgColor};
        color: white;
        padding: 1.5rem 2rem;
        border-radius: 12px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        animation: slideIn 0.5s ease;
        font-weight: 600;
        max-width: 400px;
    `;

    const icon = type === 'success' ? '✓' : '⚠';
    notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: 12px;">
            <span style="font-size: 24px;">${icon}</span>
            <div>
                <div style="font-size: 1.1rem;">${message}</div>
            </div>
        </div>
    `;

    document.body.appendChild(notification);

    // Remove notification after 4 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.5s ease';
        setTimeout(() => {
            notification.remove();
        }, 500);
    }, 4000);
}

// Initialize calendar
generateCalendar(currentDate.getFullYear(), currentDate.getMonth());
