// =============================================
// ZYGONETIX CONSULT - ENHANCED JAVASCRIPT
// =============================================

// Smooth Scrolling & Scroll Detection
document.addEventListener('DOMContentLoaded', function () {

    // ===== SMOOTH SCROLL WITH ACTIVE NAV INDICATOR =====
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            // Only intercept internal anchor links (start with #)
            if (targetId && targetId.startsWith('#')) {
                e.preventDefault();
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    // Close mobile menu if open
                    const mobileNav = document.querySelector('.main-nav');
                    const mobileToggle = document.getElementById('mobileMenuToggle');
                    if (mobileNav && mobileNav.classList.contains('active')) {
                        mobileNav.classList.remove('active');
                        if (mobileToggle) {
                            mobileToggle.classList.remove('active');
                        }
                    }
                }
            }
            // Otherwise, let browser handle navigation (for donation.html etc)
        });
    });

    // Update active nav link on scroll
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // ===== STICKY HEADER ON SCROLL =====
    const header = document.querySelector('.sticky-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // ===== MOBILE MENU TOGGLE =====
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mainNav = document.querySelector('.main-nav');

    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            mainNav.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
        });
    }

    // Close menu when clicking on a link
    if (mainNav) {
        const navLinks = mainNav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mainNav.classList.remove('active');
                if (mobileMenuToggle) {
                    mobileMenuToggle.classList.remove('active');
                }
            });
        });
    }

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (mainNav && mobileMenuToggle) {
            if (!mainNav.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
                mainNav.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
            }
        }
    });

    // Close menu on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mainNav && mobileMenuToggle) {
            mainNav.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
        }
    });

    // ===== DYNAMIC CONTENT LOADING WITH SCROLL ANIMATION =====
    const fadeElements = document.querySelectorAll('.fade-on-scroll');

    function handleScroll() {
        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            const windowHeight = window.innerHeight;

            // Check if element is in viewport
            if (elementTop < windowHeight * 0.75 && elementBottom > 0) {
                element.classList.add('visible');
            }
        });
    }

    // Initial check
    handleScroll();

    // Listen for scroll events
    window.addEventListener('scroll', handleScroll, { passive: true });

    // ===== FAQ ACCORDION =====
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const header = item.querySelector('.faq-header');
        
        if (header) {
            header.addEventListener('click', () => {
                // Close other items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });

                // Toggle current item
                item.classList.toggle('active');
            });
        }
    });

    // Open first FAQ item by default
    if (faqItems.length > 0) {
        faqItems[0].classList.add('active');
    }

    // ===== DYNAMIC COUNTER ANIMATION =====
    function animateCounters() {
        const counters = document.querySelectorAll('.metric-value');
        
        counters.forEach(counter => {
            const target = parseInt(counter.textContent.replace(/\D/g, ''));
            const increment = Math.ceil(target / 30);
            let current = 0;

            const updateCounter = () => {
                if (current < target) {
                    current += increment;
                    if (current > target) current = target;
                    counter.textContent = counter.textContent.replace(/\d+/, current);
                    setTimeout(updateCounter, 30);
                }
            };

            // Start animation when metrics section is in view
            const metricsSection = document.querySelector('.metrics-section');
            if (metricsSection) {
                const observer = new IntersectionObserver((entries) => {
                    if (entries[0].isIntersecting) {
                        updateCounter();
                        observer.unobserve(metricsSection);
                    }
                }, { threshold: 0.5 });

                observer.observe(metricsSection);
            }
        });
    }

    animateCounters();

    // ===== PAGE LOAD ANIMATION =====
    const pageLoadAnimation = () => {
        document.body.style.opacity = '0';
        setTimeout(() => {
            document.body.style.transition = 'opacity 0.6s ease-in';
            document.body.style.opacity = '1';
        }, 100);
    };

    pageLoadAnimation();

    // ===== KEYBOARD ACCESSIBILITY =====
    document.addEventListener('keydown', (e) => {
        // Press '?' for keyboard shortcuts
        if (e.key === '?') {
            console.log('Keyboard Shortcuts: \n Arrow Keys: Navigate Slider \n Smooth Scroll: Click Navigation Links');
        }
    });

    // ===== PERFORMANCE: LAZY LOAD IMAGES =====
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                    }
                    observer.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
    }

    // ===== SCROLL PROGRESS INDICATOR =====
    const createProgressBar = () => {
        const progressBar = document.createElement('div');
        progressBar.style.position = 'fixed';
        progressBar.style.top = '0';
        progressBar.style.left = '0';
        progressBar.style.height = '4px';
        progressBar.style.backgroundColor = 'linear-gradient(90deg, #1a5f3d, #27ae60)';
        progressBar.style.zIndex = '999';
        progressBar.style.transition = 'width 0.2s ease';
        document.body.appendChild(progressBar);

        window.addEventListener('scroll', () => {
            const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            progressBar.style.width = scrollPercentage + '%';
        });
    };

    createProgressBar();

    // ===== BACK TO TOP BUTTON =====
    const createBackToTopButton = () => {
        const backToTopBtn = document.createElement('button');
        backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
        backToTopBtn.style.position = 'fixed';
        backToTopBtn.style.bottom = '30px';
        backToTopBtn.style.right = '30px';
        backToTopBtn.style.zIndex = '999';
        backToTopBtn.style.padding = '12px 15px';
        backToTopBtn.style.backgroundColor = '#27ae60';
        backToTopBtn.style.color = 'white';
        backToTopBtn.style.border = 'none';
        backToTopBtn.style.borderRadius = '50%';
        backToTopBtn.style.cursor = 'pointer';
        backToTopBtn.style.opacity = '0';
        backToTopBtn.style.visibility = 'hidden';
        backToTopBtn.style.transition = 'all 0.3s ease';
        backToTopBtn.style.fontSize = '1.2rem';

        document.body.appendChild(backToTopBtn);

        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.style.opacity = '1';
                backToTopBtn.style.visibility = 'visible';
            } else {
                backToTopBtn.style.opacity = '0';
                backToTopBtn.style.visibility = 'hidden';
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        backToTopBtn.addEventListener('hover', () => {
            backToTopBtn.style.backgroundColor = '#1a5f3d';
        });
    };

    createBackToTopButton();

    // ===== PRELOAD IMAGES =====
    const preloadImages = () => {
        const images = [
            'https://images.unsplash.com/photo-1589923188900-7ff63e81fd52?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80',
            'https://images.unsplash.com/photo-1591399817481-41959bafe768?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80',
            'https://images.unsplash.com/photo-1612905659197-d8a48a22e6a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80'
        ];

        images.forEach(src => {
            const img = new Image();
            img.src = src;
        });
    };

    preloadImages();

    // ===== EXPERT CARD CLICK TO SHOW SOCIAL LINKS =====
    const expertCards = document.querySelectorAll('.expert-card');
    
    expertCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Close other open cards
            expertCards.forEach(otherCard => {
                if (otherCard !== card) {
                    const otherLinks = otherCard.querySelector('.social-links');
                    if (otherLinks) {
                        otherLinks.classList.add('hidden');
                    }
                }
            });
            
            // Toggle social links for this card
            const socialLinks = card.querySelector('.social-links');
            if (socialLinks) {
                socialLinks.classList.toggle('hidden');
            }
        });
    });
    
    // Close social links when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.expert-card')) {
            expertCards.forEach(card => {
                const socialLinks = card.querySelector('.social-links');
                if (socialLinks) {
                    socialLinks.classList.add('hidden');
                }
            });
        }
    });

});

// ===== UTILITY FUNCTION: THROTTLE =====
function throttle(func, limit) {
    let inThrottle;
    return function () {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ===== ANALYTICS: PAGE VIEW TRACKING =====
window.addEventListener('load', () => {
    console.log('Zygonetix Consult Site - Successfully Loaded');
    // Add your analytics code here (Google Analytics, etc.)
});
