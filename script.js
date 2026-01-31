// ==================== Gestion du thème ====================
function initTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme') || 'dark';

    // Appliquer le thème au chargement
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);

    themeToggle.addEventListener('click', () => {
        let theme = document.documentElement.getAttribute('data-theme');
        if (theme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
            updateThemeIcon('light');
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            updateThemeIcon('dark');
        }
    });
}

function updateThemeIcon(theme) {
    const icon = document.querySelector('#theme-toggle i');
    if (theme === 'dark') {
        icon.className = 'fas fa-sun';
    } else {
        icon.className = 'fas fa-moon';
    }
}

// ==================== Navigation & Scroll ====================
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section, .hero-section');

    // Hamburger menu toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Navigation smooth scroll et activation
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('data-section');
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                // Fermer le menu mobile
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');

                // Masquer toutes les sections
                sections.forEach(section => {
                    section.classList.remove('active-section');
                });

                // Afficher la section cible
                targetSection.classList.add('active-section');

                // Mettre à jour l'état actif des liens
                navLinks.forEach(navLink => {
                    navLink.classList.remove('active');
                });
                link.classList.add('active');

                // Scroll vers le haut
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Boutons hero
    const heroButtons = document.querySelectorAll('[data-nav]');
    heroButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = button.getAttribute('data-nav');
            const targetLink = document.querySelector(`.nav-link[data-section="${targetId}"]`);
            if (targetLink) {
                targetLink.click();
            }
        });
    });

    // Navbar background au scroll
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            navbar.style.background = 'var(--bg-overlay)';
            navbar.style.boxShadow = 'var(--shadow-md)';
        } else {
            navbar.style.background = 'var(--bg-overlay)';
            navbar.style.boxShadow = 'none';
        }

        lastScroll = currentScroll;
    });
}

// ==================== Effet de machine à écrire ====================
function typeWriter() {
    const text = "Portfolio RT";
    const typewriterElement = document.getElementById('typewriter');
    let i = 0;

    function type() {
        if (i < text.length) {
            typewriterElement.textContent += text.charAt(i);
            i++;
            setTimeout(type, 100);
        }
    }

    setTimeout(type, 500);
}

// ==================== Particules animées ====================
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = Math.random() * 3 + 1 + 'px';
        particle.style.height = particle.style.width;
        particle.style.background = 'var(--primary)';
        particle.style.borderRadius = '50%';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.opacity = Math.random() * 0.5 + 0.2;
        particle.style.animation = `float ${Math.random() * 10 + 5}s ease-in-out infinite`;
        particle.style.animationDelay = Math.random() * 5 + 's';
        
        particlesContainer.appendChild(particle);
    }
}

// ==================== Animations au scroll ====================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Animer les barres de progression
                if (entry.target.classList.contains('competence-card')) {
                    const levelFill = entry.target.querySelector('.level-fill');
                    if (levelFill) {
                        const width = levelFill.style.width;
                        levelFill.style.width = '0';
                        setTimeout(() => {
                            levelFill.style.width = width;
                        }, 300);
                    }
                }
            }
        });
    }, observerOptions);

    // Observer les sections
    document.querySelectorAll('.section').forEach(section => {
        observer.observe(section);
    });

    // Observer les cartes
    document.querySelectorAll('.competence-card, .sae-card, .projection-card, .about-card').forEach(card => {
        observer.observe(card);
    });
}

// ==================== Filtrage des SAÉ par année ====================
function initPortfolioFilter() {
    const yearButtons = document.querySelectorAll('.year-btn');
    const saeCards = document.querySelectorAll('.sae-card');

    yearButtons.forEach(button => {
        button.addEventListener('click', () => {
            const year = button.getAttribute('data-year');

            // Mettre à jour les boutons actifs
            yearButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Filtrer les cartes
            saeCards.forEach(card => {
                const cardYear = card.getAttribute('data-year');
                if (year === 'all' || cardYear === year) {
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// ==================== Effets hover sur les cartes ====================
function initCardEffects() {
    const cards = document.querySelectorAll('.floating-card, .sae-card, .competence-card, .projection-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function(e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--mouse-x', x + 'px');
            card.style.setProperty('--mouse-y', y + 'px');
        });
    });
}

// ==================== Scroll fluide vers les sections ====================
function smoothScrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// ==================== Gestion des liens externes ====================
function initExternalLinks() {
    const quickLinks = document.querySelectorAll('.quick-link');
    const socialLinks = document.querySelectorAll('.footer-social a');
    
    // Ajouter effet de clic
    [...quickLinks, ...socialLinks].forEach(link => {
        link.addEventListener('click', function(e) {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
}

// ==================== Animation des statistiques ====================
function animateStats() {
    const stats = document.querySelectorAll('.stat-number');
    
    stats.forEach(stat => {
        const text = stat.textContent;
        const hasPlus = text.includes('+');
        const number = parseInt(text.replace('+', ''));
        let current = 0;
        const increment = number / 50;
        const duration = 1500;
        const stepTime = duration / 50;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= number) {
                stat.textContent = number + (hasPlus ? '+' : '');
                clearInterval(timer);
            } else {
                stat.textContent = Math.floor(current) + (hasPlus ? '+' : '');
            }
        }, stepTime);
    });
}

// ==================== Gestion des modales SAÉ ====================
function initSAEModals() {
    const saeCards = document.querySelectorAll('.sae-card');
    
    saeCards.forEach(card => {
        const moreButton = card.querySelector('.sae-more');
        if (moreButton) {
            moreButton.addEventListener('click', (e) => {
                e.stopPropagation();
                const saeId = card.getAttribute('data-sae');
                showSAEDetail(saeId);
            });
        }
    });
}

function showSAEDetail(saeId) {
    // Cette fonction pourrait ouvrir une modale avec les détails de la SAÉ
    console.log('Affichage des détails de la SAÉ:', saeId);
    // Pour l'instant, on affiche juste une alerte
    alert(`Détails de la SAÉ ${saeId} - Cette fonctionnalité peut être étendue avec une modale complète.`);
}

// ==================== Effets de parallaxe subtils ====================
function initParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.floating-card');
        
        parallaxElements.forEach((el, index) => {
            const speed = 0.05 * (index + 1);
            el.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// ==================== Curseur personnalisé (optionnel) ====================
function initCustomCursor() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        border: 2px solid var(--primary);
        border-radius: 50%;
        pointer-events: none;
        z-index: 10000;
        transition: transform 0.2s ease;
        display: none;
    `;
    document.body.appendChild(cursor);

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.style.display = 'block';
    });

    function animate() {
        const dx = mouseX - cursorX;
        const dy = mouseY - cursorY;
        
        cursorX += dx * 0.1;
        cursorY += dy * 0.1;
        
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        
        requestAnimationFrame(animate);
    }
    animate();

    // Effet au survol des liens et boutons
    const interactiveElements = document.querySelectorAll('a, button, .sae-card, .competence-card');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(1.5)';
            cursor.style.background = 'rgba(0, 242, 255, 0.2)';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursor.style.background = 'transparent';
        });
    });
}

// ==================== Gestion du chargement de la page ====================
function handlePageLoad() {
    // Masquer le loader si présent
    const loader = document.getElementById('loader');
    if (loader) {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 300);
        }, 500);
    }

    // Lancer l'effet typewriter
    typeWriter();

    // Animer les stats après un court délai
    setTimeout(animateStats, 1000);
}

// ==================== Easter Egg: Konami Code ====================
function initKonamiCode() {
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;

    document.addEventListener('keydown', (e) => {
        if (e.key === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                activateEasterEgg();
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });
}

function activateEasterEgg() {
    document.body.style.animation = 'rainbow 2s linear infinite';
    
    // Ajouter l'animation rainbow si elle n'existe pas
    if (!document.getElementById('rainbow-animation')) {
        const style = document.createElement('style');
        style.id = 'rainbow-animation';
        style.textContent = `
            @keyframes rainbow {
                0% { filter: hue-rotate(0deg); }
                100% { filter: hue-rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
    }
    
    setTimeout(() => {
        document.body.style.animation = '';
    }, 5000);
    
    console.log('🎉 Easter Egg activé! 🎉');
}

// ==================== Initialisation au chargement du DOM ====================
document.addEventListener('DOMContentLoaded', () => {
    // Initialiser toutes les fonctionnalités
    initTheme();
    initNavigation();
    createParticles();
    initScrollAnimations();
    initPortfolioFilter();
    initCardEffects();
    initExternalLinks();
    initSAEModals();
    initParallax();
    // initCustomCursor(); // Décommenter pour activer le curseur personnalisé
    initKonamiCode();
    
    // Gérer le chargement de la page
    handlePageLoad();
});

// ==================== Gestion du redimensionnement ====================
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Recalculer les positions si nécessaire
        console.log('Window resized');
    }, 250);
});

// ==================== Performance: Lazy loading des images ====================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ==================== Accessibilité: Gestion du focus clavier ====================
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-navigation');
});

// ==================== Console Easter Egg ====================
console.log('%c👋 Salut développeur! ', 'font-size: 20px; font-weight: bold; color: #00f2ff;');
console.log('%cSi tu lis ceci, tu es curieux. J\'aime ça! 🚀', 'font-size: 14px; color: #ff006e;');
console.log('%cEssaye le Konami Code: ↑ ↑ ↓ ↓ ← → ← → B A', 'font-size: 12px; color: #8338ec;');
