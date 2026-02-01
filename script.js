// ==================== Navigation par sections (utilisé par index.html) ====================
function showSection(sectionId) {
    const target = document.getElementById(sectionId);
    if (!target) return;
    document.querySelectorAll('main section, .container section').forEach(section => {
        section.style.display = section.id === sectionId ? 'block' : 'none';
    });
    // Mise à jour de l'état actif : nav + logo (liens avec showSection)
    document.querySelectorAll('.nav-links a, header nav .logo a').forEach(a => {
        a.classList.remove('active');
        if (a.getAttribute('onclick') && a.getAttribute('onclick').includes("'" + sectionId + "'")) {
            a.classList.add('active');
        }
    });
}

function toggleMobileMenu() {
    const navLinks = document.getElementById('navLinks');
    if (navLinks) navLinks.classList.toggle('open');
}

// ==================== Gestion du thème ====================
function initTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;
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
    if (!icon) return;
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

    if (hamburger && navMenu) {
        // Hamburger menu toggle
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Navigation smooth scroll et activation
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('data-section');
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                // Fermer le menu mobile
                hamburger?.classList.remove('active');
                navMenu?.classList.remove('active');

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
    if (navbar) {
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
}

// ==================== Effet de machine à écrire ====================
function typeWriter() {
    const typewriterElement = document.getElementById('typewriter') || document.querySelector('.typewriter');
    if (!typewriterElement) return;
    const text = "Martin Bretonnière";
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
    if (!particlesContainer) return;
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
        card.addEventListener('mouseenter', function (e) {
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
        link.addEventListener('click', function (e) {
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
    if (!stats.length) return;

    stats.forEach(stat => {
        const text = stat.textContent;
        const hasPlus = text.includes('+');
        const number = parseInt(text.replace('+', ''), 10);
        if (isNaN(number)) return;
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
    const modal = document.getElementById('saeModal');
    const modalBody = document.getElementById('modalBody');
    const closeModal = document.getElementById('closeModal');
    const overlay = modal?.querySelector('.modal-overlay');

    // Gérer les clics sur les boutons "Détails"
    document.querySelectorAll('.sae-more').forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            const modalId = button.getAttribute('data-modal');
            if (modalId && saeDetails[modalId]) {
                showSAEModal(modalId);
            }
        });
    });

    // Fermer la modale
    if (closeModal) {
        closeModal.addEventListener('click', closeSAEModal);
    }

    if (overlay) {
        overlay.addEventListener('click', closeSAEModal);
    }

    // Fermer avec Échap
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal?.classList.contains('active')) {
            closeSAEModal();
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

    // Lancer l'effet typewriter (ne fait rien si l'élément n'existe pas)
    typeWriter();

    // Animer les stats après un court délai (ne fait rien si aucun .stat-number)
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

// #region agent log
function sendDebugLog(payload) {
    const body = JSON.stringify({ ...payload, timestamp: Date.now(), sessionId: 'debug-session' });
    fetch('http://127.0.0.1:7242/ingest/d11d4825-6dd0-42f0-9245-cf601afcf0a5', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body }).catch(function () {});
}
// #endregion

// ==================== Initialisation au chargement du DOM ====================
document.addEventListener('DOMContentLoaded', () => {
    // Empêcher le scroll vers # sur les liens de navigation interne
    document.body.addEventListener('click', function (e) {
        var a = e.target.closest('a[href="#"]');
        if (a && a.getAttribute('onclick') && a.getAttribute('onclick').indexOf('showSection') !== -1) {
            e.preventDefault();
        }
    });
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

// #region agent log
window.addEventListener('load', function () {
    const log = sendDebugLog;
    var link = document.querySelector('link[href="style.css"]');
    var sheetLoaded = !!(link && link.sheet);
    var sheetHref = link ? link.href : '';
    var ruleCount = 0;
    try { if (link && link.sheet && link.sheet.cssRules) ruleCount = link.sheet.cssRules.length; } catch (e) { ruleCount = -1; }
    log({ location: 'script.js:load', message: 'H1 style.css load', hypothesisId: 'H1', data: { sheetLoaded, sheetHref, ruleCount } });
    var hero = document.querySelector('.hero');
    var left = document.getElementById('left');
    var right = document.getElementById('right');
    var hasHeroSection = document.querySelector('.hero-section') !== null;
    log({ location: 'script.js:load', message: 'H2 HTML structure', hypothesisId: 'H2', data: { hasHero: !!hero, heroClassName: hero ? hero.className : '', hasLeft: !!left, hasRight: !!right, hasHeroSection } });
    var heroDisplay = '', leftDisplay = '', rightDisplay = '';
    if (hero) heroDisplay = getComputedStyle(hero).display;
    if (left) leftDisplay = getComputedStyle(left).display;
    if (right) rightDisplay = getComputedStyle(right).display;
    log({ location: 'script.js:load', message: 'H3 computed layout', hypothesisId: 'H3', data: { heroDisplay, leftDisplay, rightDisplay } });
    var rootBg = getComputedStyle(document.documentElement).getPropertyValue('--bg-main').trim();
    log({ location: 'script.js:load', message: 'H4 :root vars', hypothesisId: 'H4', data: { rootBgLength: rootBg.length } });
    var bodyBg = getComputedStyle(document.body).backgroundColor;
    var bodyFont = getComputedStyle(document.body).fontFamily;
    var navLinksDisplay = '';
    var nl = document.querySelector('.nav-links');
    if (nl) navLinksDisplay = getComputedStyle(nl).display;
    log({ location: 'script.js:load', message: 'H5 cascade', hypothesisId: 'H5', data: { bodyBg, bodyFont: bodyFont ? bodyFont.substring(0, 40) : '', navLinksDisplay } });
});
// #endregion

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

// ==================== Données des SAÉ ====================
const saeDetails = {
    'sae101': {
        title: 'SAÉ 1.01 - Hygiène informatique',
        subtitle: 'Certification SecNumacadémie (ANSSI)',
        badges: ['RT1', 'Sécurité'],
        description: 'Formation complète sur les fondamentaux de la cybersécurité avec certification officielle de l\'ANSSI.',
        content: `
            <h3>Objectifs</h3>
            <p>Acquérir une posture professionnelle face aux cybermenaces et maîtriser les recommandations de l'ANSSI pour sécuriser les infrastructures réseaux et les postes de travail.</p>
            
            <h3>Résultats</h3>
            <ul>
                <li>Obtention de la certification avec 90% de moyenne</li>
                <li>Maîtrise de l'authentification forte et de la gestion des identités</li>
                <li>Compréhension des protocoles de sécurisation (HTTPS, SSL/TLS, SSH)</li>
                <li>Analyse des vecteurs d'attaque (Ingénierie sociale, Phishing, Ransomwares)</li>
            </ul>
            
            <h3>Compétences développées</h3>
            <ul>
                <li>Sécurité de l'authentification</li>
                <li>Protection du poste de travail</li>
                <li>Sécurité sur Internet</li>
                <li>Cryptographie (RSA, AES)</li>
            </ul>
        `,
        images: ['images/sae14.png']
    },
    'sae102': {
        title: 'SAÉ 1.02 - Réseaux informatiques',
        subtitle: 'Conception d\'infrastructure réseau',
        badges: ['RT1'],
        description: 'Conception et simulation d\'une architecture réseau complète pour une entreprise multi-sites.',
        content: `
            <h3>Contexte</h3>
            <p>Conception de l'architecture réseau complète d'une entreprise avec dimensionnement des besoins, choix des équipements et simulation de la connectivité entre différents services.</p>
            
            <h3>Réalisations</h3>
            <ul>
                <li>Architecture réseau multi-sites fonctionnelle sur Packet Tracer</li>
                <li>Plan d'adressage IP optimisé avec subnetting</li>
                <li>Configuration de routeurs et switches Cisco</li>
                <li>Mise en place de VLANs et routage inter-VLAN</li>
                <li>Documentation technique complète</li>
            </ul>
            
            <h3>Technologies utilisées</h3>
            <ul>
                <li>Cisco Packet Tracer</li>
                <li>Protocoles de routage (RIP, OSPF)</li>
                <li>VLANs et trunk links</li>
                <li>Adressage IPv4 et subnetting</li>
            </ul>
        `,
        images: ['images/sae12-2.png']
    },
    'sae103': {
        title: 'SAÉ 1.03 - Fibres optiques',
        subtitle: 'Caractérisation et mesures',
        badges: ['RT2'],
        description: 'Étude et mesures d\'affaiblissement sur des câbles à fibres optiques.',
        content: `
            <h3>Objectifs</h3>
            <p>Mettre en place et caractériser des câbles à fibres optiques dans un petit réseau, réaliser des mesures d'affaiblissement et analyser les résultats.</p>
            
            <h3>Travaux réalisés</h3>
            <ul>
                <li>Installation de fibres optiques monomodes et multimodes</li>
                <li>Mesures d'affaiblissement avec réflectomètre (OTDR)</li>
                <li>Analyse des résultats et identification des défauts</li>
                <li>Documentation des procédures de mesure</li>
            </ul>
            
            <h3>Compétences acquises</h3>
            <ul>
                <li>Manipulation de fibres optiques</li>
                <li>Utilisation d'équipements de mesure professionnels</li>
                <li>Interprétation de reflectogrammes</li>
                <li>Normes de câblage structuré</li>
            </ul>
        `,
        images: ['images/sae13-2.png', 'images/sae13.jpg']
    },
    'sae104': {
        title: 'SAÉ 1.04 - Site web One Piece',
        subtitle: 'Création d\'identité numérique',
        badges: ['RT3'],
        description: 'Développement d\'un site web thématique en HTML/CSS.',
        content: `
            <h3>Projet</h3>
            <p>Création d'un site web complet sur l'univers de One Piece, démontrant la maîtrise des technologies web front-end.</p>
            
            <h3>Fonctionnalités</h3>
            <ul>
                <li>Design responsive adapté à tous les écrans</li>
                <li>Navigation fluide entre plusieurs pages</li>
                <li>Intégration de médias (images, vidéos)</li>
                <li>Mise en page avancée avec CSS Grid et Flexbox</li>
                <li>Animations et transitions CSS</li>
            </ul>
            
            <h3>Technologies</h3>
            <ul>
                <li>HTML5 sémantique</li>
                <li>CSS3 moderne</li>
                <li>JavaScript vanilla</li>
                <li>Design responsive</li>
            </ul>
        `,
        images: ['images/sae15.png']
    },
    'sae201': {
        title: 'SAÉ 2.01 - Construire un réseau',
        subtitle: 'Infrastructure d\'entreprise complète',
        badges: ['RT1'],
        description: 'Mise en place d\'une infrastructure réseau d\'entreprise avec VLANs et services réseau.',
        content: `
            <h3>Contexte</h3>
            <p>Déploiement d'une infrastructure réseau complète pour une entreprise, incluant la segmentation par VLANs et la mise en place de services essentiels.</p>
            
            <h3>Infrastructure déployée</h3>
            <ul>
                <li>Segmentation réseau avec 5 VLANs (Services, Comptabilité, Administration, Supervision, Vente)</li>
                <li>Configuration de switches Cisco (L2 2960, L3 3560)</li>
                <li>Routeur Cisco 2911 pour interconnexion</li>
                <li>Services DHCP et DNS configurés</li>
                <li>Routage inter-VLAN fonctionnel</li>
            </ul>
            
            <h3>Compétences techniques</h3>
            <ul>
                <li>Configuration avancée de switches et routeurs Cisco</li>
                <li>Protocoles de routage dynamique</li>
                <li>Services d'infrastructure (DHCP, DNS)</li>
                <li>Sécurisation des accès (ACLs)</li>
                <li>Documentation réseau professionnelle</li>
            </ul>
        `,
        images: ['images/sae21.png']
    },
    'sae202': {
        title: 'SAÉ 2.02 - MATLAB OnRamp',
        subtitle: 'Certification MATLAB',
        badges: ['RT2'],
        description: 'Formation complète sur MATLAB avec certification officielle.',
        content: `
            <h3>Programme de formation</h3>
            <p>Formation intensive sur MATLAB couvrant tous les aspects du logiciel, de la manipulation de données au traitement de signaux.</p>
            
            <h3>Modules validés</h3>
            <ul>
                <li>Commandes et syntaxe MATLAB</li>
                <li>Vecteurs et matrices</li>
                <li>Indexation et modification de tableaux</li>
                <li>Calculs sur des tableaux</li>
                <li>Fonctions et scripts</li>
                <li>Tracé de données et visualisation</li>
                <li>Import et export de données</li>
                <li>Tableaux logiques et programmation</li>
            </ul>
            
            <h3>Résultat</h3>
            <p>Certification obtenue avec 100% de réussite sur l'ensemble des modules.</p>
        `,
        images: ['images/sae22-2.png']
    },
    'sae204': {
        title: 'SAÉ 2.04 - Instant Weather',
        subtitle: 'Application météo en temps réel',
        badges: ['RT3', 'API'],
        description: 'Développement d\'une application web de météo en temps réel avec API externe.',
        content: `
            <h3>Projet</h3>
            <p>Création d'une application web moderne permettant de consulter les prévisions météorologiques en temps réel pour n'importe quelle ville.</p>
            
            <h3>Fonctionnalités</h3>
            <ul>
                <li>Recherche de ville par code postal ou nom</li>
                <li>Affichage des conditions météo actuelles</li>
                <li>Prévisions sur 5 jours</li>
                <li>Interface utilisateur intuitive et responsive</li>
                <li>Historique des recherches</li>
                <li>Géolocalisation automatique</li>
            </ul>
            
            <h3>Stack technique</h3>
            <ul>
                <li>HTML5, CSS3, JavaScript</li>
                <li>API REST externe (OpenWeather)</li>
                <li>LocalStorage pour la persistance</li>
                <li>Design responsive mobile-first</li>
            </ul>
        `,
        images: ['images/sae24.png']
    },
    'sae301': {
        title: 'SAÉ 3.01 - Certification SRWE',
        subtitle: 'Switching, Routing and Wireless Essentials',
        badges: ['RT2', 'Cisco'],
        description: 'Certification Cisco SRWE validée avec succès.',
        content: `
            <h3>Certification</h3>
            <p>Formation et certification officielle Cisco sur les concepts avancés de switching, routage et réseaux sans fil.</p>
            
            <h3>Examens validés</h3>
            <ul>
                <li>Examen Checkpoint - Concepts de routage (100/100 pts)</li>
                <li>Examen final de pratique SRWE (validé)</li>
                <li>Examen final du cours SRWE (100%)</li>
                <li>Examen final de compétences SRWE PTSA</li>
            </ul>
            
            <h3>Compétences certifiées</h3>
            <ul>
                <li>VLANs et trunking avancé</li>
                <li>Protocoles de routage (OSPF, EIGRP)</li>
                <li>Spanning Tree Protocol (STP, RSTP)</li>
                <li>EtherChannel et agrégation de liens</li>
                <li>Réseaux sans fil et sécurité WiFi</li>
                <li>Dépannage réseau avancé</li>
            </ul>
        `,
        images: ['images/sae31-2.png', 'images/sae31-1.jpeg']
    },
    'sae303': {
        title: 'SAÉ 3.03 - Infrastructure multi-sites',
        subtitle: 'Architecture réseau d\'entreprise avancée',
        badges: ['RT1', 'Infrastructure'],
        description: 'Déploiement d\'une infrastructure réseau complexe multi-sites avec redondance.',
        content: `
            <h3>Projet</h3>
            <p>Mise en place d'une infrastructure réseau d'entreprise complète avec deux sites (Salle serveur 3257 et Salle 3250 Pouzin) interconnectés.</p>
            
            <h3>Architecture déployée</h3>
            <ul>
                <li>Switches Cisco en stack (L3 3750) pour haute disponibilité</li>
                <li>Routeur Cisco 2911 pour interconnexion des sites</li>
                <li>Serveur Proxmox PVE 3 pour virtualisation</li>
                <li>Backbone GNS3 pour simulation avancée</li>
                <li>Liens agrégés (EtherChannel) pour redondance</li>
                <li>Multiples VLANs par site avec routage inter-VLAN</li>
            </ul>
            
            <h3>Services mis en place</h3>
            <ul>
                <li>SSH pour administration à distance sécurisée</li>
                <li>VPN site-à-site pour interconnexion sécurisée</li>
                <li>DHCP et DNS redondants</li>
                <li>Monitoring réseau centralisé</li>
                <li>Politiques de QoS</li>
            </ul>
            
            <h3>Compétences avancées</h3>
            <ul>
                <li>Architecture réseau multi-sites</li>
                <li>Haute disponibilité et redondance</li>
                <li>Virtualisation d'infrastructure</li>
                <li>Sécurisation avancée (VPN, ACLs)</li>
                <li>Administration système et réseau</li>
            </ul>
        `,
        images: ['images/sae33-2.jpg', 'images/sae33-1.png', 'images/sae33-3.png']
    }
};

// ==================== Gestion des modales SAÉ ====================
function showSAEModal(saeId) {
    const modal = document.getElementById('saeModal');
    const modalBody = document.getElementById('modalBody');
    const data = saeDetails[saeId];

    if (!data || !modal || !modalBody) return;

    // Construire les badges
    const badgesHTML = data.badges.map(badge => {
        let badgeClass = '';
        if (badge === 'RT1') badgeClass = 'badge-rt1';
        else if (badge === 'RT2') badgeClass = 'badge-rt2';
        else if (badge === 'RT3') badgeClass = 'badge-rt3';
        else if (badge.includes('Sécurité') || badge.includes('CYBER')) badgeClass = 'badge-cyber';
        else badgeClass = 'badge-rt1';

        return `<span class="badge ${badgeClass}">${badge}</span>`;
    }).join('');

    // Construire la galerie d'images
    const galleryHTML = data.images && data.images.length > 0
        ? `<div class="modal-gallery">
            ${data.images.map(img => `<img src="${img}" alt="${data.title}" onclick="window.open('${img}', '_blank')">`).join('')}
           </div>`
        : '';

    // Remplir la modale
    modalBody.innerHTML = `
        <h2>${data.title}</h2>
        <p style="font-size: 1.1rem; color: var(--text-secondary); margin-bottom: 1.5rem;">${data.subtitle}</p>
        <div class="modal-badges">${badgesHTML}</div>
        <p style="font-size: 1.05rem; line-height: 1.8; margin-bottom: 2rem;"><strong>${data.description}</strong></p>
        ${galleryHTML}
        ${data.content}
    `;

    // Afficher la modale
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeSAEModal() {
    const modal = document.getElementById('saeModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Force le navigateur à remonter tout en haut au chargement et au rafraîchissement
if (history.scrollRestoration) {
    history.scrollRestoration = 'manual';
} else {
    window.onbeforeunload = function () {
        window.scrollTo(0, 0);
    }
}

window.addEventListener('load', function() {
    window.scrollTo(0, 0);
});
