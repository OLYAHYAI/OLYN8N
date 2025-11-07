// ===================================
// MAIN JAVASCRIPT
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.setAttribute('aria-expanded', 
                navToggle.getAttribute('aria-expanded') === 'true' ? 'false' : 'true'
            );
        });
    }
    
    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            if (navToggle) {
                navToggle.setAttribute('aria-expanded', 'false');
            }
        });
    });
    
    // Smooth Scrolling for Navigation Links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const headerOffset = 80;
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Active Navigation Link on Scroll
    const sections = document.querySelectorAll('section[id]');
    
    function highlightNavigation() {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (navLink) navLink.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavigation);
    
    // Language Toggle
    const langToggle = document.querySelector('.lang-toggle');
    const langCurrent = document.querySelector('.lang-current');
    
    if (langToggle) {
        langToggle.addEventListener('click', () => {
            const currentLang = langCurrent.textContent;
            const newLang = currentLang === 'EN' ? 'FR' : 'EN';
            langCurrent.textContent = newLang;
            
            // Store language preference
            localStorage.setItem('preferredLanguage', newLang);
            
            // Implement actual language switching logic
            switchLanguage(newLang);
        });
        
        // Load saved language preference
        const savedLang = localStorage.getItem('preferredLanguage');
        if (savedLang) {
            langCurrent.textContent = savedLang;
            // Apply saved language on page load
            switchLanguage(savedLang);
        }
    }

    // Language switching function
    function switchLanguage(lang) {
        const currentPath = window.location.pathname;
        const currentUrl = new URL(window.location.href);
        
        // Check if we're on an article page
        if (currentPath.includes('/articles/') || currentPath.includes('/en/') || currentPath.includes('/fr/')) {
            // For article pages, switch between /en/ and /fr/ directories
            let newPath;
            
            if (lang === 'FR') {
                // Switch to French version
                newPath = currentPath.replace(/\/en\//g, '/fr/');
                // Also handle articles/en/ case
                newPath = newPath.replace(/\/articles\/en\//g, '/articles/fr/');
            } else {
                // Switch to English version
                newPath = currentPath.replace(/\/fr\//g, '/en/');
                // Also handle articles/fr/ case  
                newPath = newPath.replace(/\/articles\/fr\//g, '/articles/en/');
            }
            
            // Intelligent Language Fallback Router - Check if target page exists before redirecting
            if (newPath !== currentPath) {
                checkPageAndRedirect(newPath, currentPath, lang);
                return;
            }
        }
        
        // Handle blog category pages (infrastructure-fr.html, network_security-fr.html, etc.)
        if (currentPath.includes('-fr.html')) {
            if (lang === 'EN') {
                // Switch to English version
                const enPath = currentPath.replace('-fr.html', '.html');
                window.location.href = enPath;
                return;
            }
        } else if (currentPath.includes('/blog/') && currentPath.endsWith('.html') && !currentPath.includes('index')) {
            // English blog category page - switch to French
            if (lang === 'FR') {
                const frPath = currentPath.replace('.html', '-fr.html');
                // Use intelligent fallback for blog category pages
                checkPageAndRedirect(frPath, currentPath, 'FR');
                return;
            }
        }

        // Handle blog index pages
        if (currentPath.includes('/blog/index-fr.html')) {
            if (lang === 'EN') {
                window.location.href = currentPath.replace('/blog/index-fr.html', '/blog/index.html');
                return;
            }
        } else if (currentPath.includes('/blog/index.html')) {
            if (lang === 'FR') {
                window.location.href = currentPath.replace('/blog/index.html', '/blog/index-fr.html');
                return;
            }
        }

        // For index pages, add language parameter or switch index file
        if (currentPath.endsWith('index.html') || currentPath.endsWith('/')) {
            if (lang === 'FR') {
                // Try to load French index
                if (currentPath.includes('index.html')) {
                    const frIndex = currentPath.replace('index.html', 'index-fr.html');
                                // Use intelligent fallback for index pages
                                checkPageAndRedirect(frIndex, currentPath, 'FR');
                                fetch(blogFrIndex, { method: 'HEAD' })
                                    .then(response => {
                                        if (response.ok) {
                                            window.location.href = blogFrIndex;
                                        }
                                    })
                                    .catch(() => {
                                        console.log('Blog French index not found');
                                    });
                            }
                        })
                        .catch(() => {
                            console.log('French index not found');
                        });
                }
            } else {
                // Switch to English index
                if (currentPath.includes('index-fr.html')) {
                    window.location.href = currentPath.replace('index-fr.html', 'index.html');
                } else if (currentPath.includes('blog/index-fr.html')) {
                    window.location.href = currentPath.replace('blog/index-fr.html', 'index.html');
                }
            }
        }
    }
    
    // Intelligent Language Fallback Router Function
    function checkPageAndRedirect(targetPath, currentPath, targetLang) {
        // Show loading state
        showLanguageSwitchNotification('Checking availability...', 'loading');
        
        // Check if target page exists
        fetch(targetPath, { method: 'HEAD' })
            .then(response => {
                if (response.ok) {
                    // Page exists - redirect successfully
                    hideLanguageSwitchNotification();
                    window.location.href = targetPath;
                } else {
                    // Page doesn't exist - show fallback options
                    handleMissingTranslation(targetPath, currentPath, targetLang);
                }
            })
            .catch(error => {
                console.error('Error checking page availability:', error);
                handleMissingTranslation(targetPath, currentPath, targetLang);
            });
    }
    
    // Handle missing translation with user-friendly options
    function handleMissingTranslation(targetPath, currentPath, targetLang) {
        const currentLang = targetLang === 'FR' ? 'EN' : 'FR';
        const targetLangName = targetLang === 'FR' ? 'French' : 'English';
        const currentLangName = currentLang === 'FR' ? 'French' : 'English';
        
        // Create user-friendly notification
        const notification = document.createElement('div');
        notification.className = 'language-fallback-notification';
        notification.innerHTML = `
            <div class="notification-content">
                <h4>🌐 Language Translation Notice</h4>
                <p>This page is not yet available in ${targetLangName}.</p>
                <div class="notification-actions">
                    <button class="btn btn-primary" onclick="stayInCurrentLanguage()">
                        Continue in ${currentLangName}
                    </button>
                    <button class="btn btn-secondary" onclick="requestTranslation('${targetPath}', '${targetLang}')">
                        Request Translation
                    </button>
                </div>
                <small>You can help us improve by requesting translations for missing content.</small>
            </div>
        `;
        
        // Add styles if not already present
        if (!document.querySelector('#language-fallback-styles')) {
            const styles = document.createElement('style');
            styles.id = 'language-fallback-styles';
            styles.textContent = `
                .language-fallback-notification {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                    padding: 20px;
                    border-radius: 12px;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.3);
                    z-index: 10000;
                    max-width: 350px;
                    animation: slideInRight 0.3s ease-out;
                }
                .language-fallback-notification h4 {
                    margin: 0 0 10px 0;
                    font-size: 16px;
                }
                .language-fallback-notification p {
                    margin: 0 0 15px 0;
                    font-size: 14px;
                    opacity: 0.9;
                }
                .notification-actions {
                    display: flex;
                    gap: 10px;
                    margin-bottom: 10px;
                }
                .notification-actions button {
                    padding: 8px 16px;
                    border: none;
                    border-radius: 6px;
                    cursor: pointer;
                    font-size: 12px;
                    transition: all 0.2s;
                }
                .btn-primary {
                    background: rgba(255,255,255,0.2);
                    color: white;
                }
                .btn-secondary {
                    background: rgba(255,255,255,0.1);
                    color: white;
                }
                .notification-actions button:hover {
                    transform: translateY(-1px);
                    box-shadow: 0 4px 12px rgba(0,0,0,0.2);
                }
                .language-fallback-notification small {
                    opacity: 0.7;
                    font-size: 11px;
                }
                @keyframes slideInRight {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
            `;
            document.head.appendChild(styles);
        }
        
        // Add to page
        document.body.appendChild(notification);
        
        // Auto-hide after 10 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 10000);
    }
    
    // Show simple loading notification
    function showLanguageSwitchNotification(message, type = 'info') {
        hideLanguageSwitchNotification(); // Remove any existing notification
        
        const notification = document.createElement('div');
        notification.className = 'language-switch-loading';
        notification.innerHTML = `
            <div class="loading-content">
                <div class="loading-spinner"></div>
                <span>${message}</span>
            </div>
        `;
        
        const styles = document.createElement('style');
        styles.textContent = `
            .language-switch-loading {
                position: fixed;
                top: 20px;
                right: 20px;
                background: rgba(0,0,0,0.8);
                color: white;
                padding: 15px 20px;
                border-radius: 8px;
                z-index: 10000;
                display: flex;
                align-items: center;
                gap: 10px;
                animation: fadeIn 0.3s ease-out;
            }
            .loading-spinner {
                width: 16px;
                height: 16px;
                border: 2px solid rgba(255,255,255,0.3);
                border-top: 2px solid white;
                border-radius: 50%;
                animation: spin 1s linear infinite;
            }
            @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
            @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        `;
        document.head.appendChild(styles);
        document.body.appendChild(notification);
    }
    
    // Hide any language switching notifications
    function hideLanguageSwitchNotification() {
        const existing = document.querySelector('.language-switch-loading, .language-fallback-notification');
        if (existing) {
            existing.remove();
        }
    }
    
    // Global functions for notification buttons
    window.stayInCurrentLanguage = function() {
        hideLanguageSwitchNotification();
        console.log('User chose to stay in current language');
    };
    
    window.requestTranslation = function(targetPath, targetLang) {
        hideLanguageSwitchNotification();
        console.log(`Translation requested for: ${targetPath} (${targetLang})`);
        
        // Show confirmation
        const confirmation = document.createElement('div');
        confirmation.className = 'language-confirmation';
        confirmation.innerHTML = `
            <div class="confirmation-content">
                <h4>✅ Translation Requested</h4>
                <p>Thank you! We've noted your request for ${targetLang === 'FR' ? 'French' : 'English'} translation.</p>
                <p>This helps us prioritize which content to translate first.</p>
            </div>
        `;
        
        const styles = document.createElement('style');
        styles.textContent = `
            .language-confirmation {
                position: fixed;
                top: 20px;
                right: 20px;
                background: linear-gradient(135deg, #28a745, #20c997);
                color: white;
                padding: 15px 20px;
                border-radius: 8px;
                z-index: 10000;
                animation: slideInRight 0.3s ease-out;
                max-width: 300px;
            }
            .language-confirmation h4 {
                margin: 0 0 8px 0;
                font-size: 14px;
            }
            .language-confirmation p {
                margin: 4px 0;
                font-size: 12px;
                opacity: 0.9;
            }
        `;
        document.head.appendChild(styles);
        document.body.appendChild(confirmation);
        
        setTimeout(() => {
            confirmation.remove();
        }, 4000);
    };
    
    // Back to Top Button
    const backToTop = document.querySelector('.back-to-top');
    
    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });
        
        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Project Filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.getAttribute('data-filter');
            
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Filter projects
            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                    card.classList.add('fade-in');
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
    
    // Contact Form Handling
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            console.log('Form submitted:', data);
            
            // TODO: Implement actual form submission logic
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
        });
    }
    
    // Intersection Observer for Scroll Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.project-card, .skill-category, .blog-card, .stat-card');
    animateElements.forEach(el => observer.observe(el));
});
