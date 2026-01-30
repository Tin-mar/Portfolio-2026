// ================================
// NAVIGATION ENTRE LES SECTIONS
// ================================
function showSection(sectionId) {
    // Masquer toutes les sections
    const sections = document.querySelectorAll('.section, .home');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    // Afficher la section demandée
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
    }
    
    // Mettre à jour les liens de navigation
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('onclick') && link.getAttribute('onclick').includes(sectionId)) {
            link.classList.add('active');
        }
    });
    
    // Fermer le menu mobile si ouvert
    const navLinksContainer = document.getElementById('navLinks');
    if (navLinksContainer) {
        navLinksContainer.classList.remove('active');
    }
    
    // Scroll vers le haut
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ================================
// MENU MOBILE
// ================================
function toggleMobileMenu() {
    const navLinks = document.getElementById('navLinks');
    if (navLinks) {
        navLinks.classList.toggle('active');
    }
}

// ================================
// FILTRAGE PAR ANNÉE
// ================================
document.addEventListener('DOMContentLoaded', function() {
    const yearButtons = document.querySelectorAll('.year-btn');
    
    yearButtons.forEach(button => {
        button.addEventListener('click', function() {
            const year = this.getAttribute('data-year');
            
            // Mettre à jour les boutons actifs
            yearButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filtrer les cartes SAE
            const saeCards = document.querySelectorAll('.sae-card');
            saeCards.forEach(card => {
                if (card.getAttribute('data-year') === year) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
    
    // ================================
    // CLIC SUR LES CARTES SAE
    // ================================
    const saeCards = document.querySelectorAll('.sae-card');
    saeCards.forEach(card => {
        card.addEventListener('click', function() {
            const saeId = this.getAttribute('data-sae-id');
            showSaeDetail(saeId);
        });
    });
});

// ================================
// AFFICHER LES DÉTAILS D'UNE SAE
// ================================
function showSaeDetail(saeId) {
    // Passer à la section détails
    showSection('sae-details');
    
    // Masquer tous les détails
    const detailContainers = document.querySelectorAll('.sae-detail-container');
    detailContainers.forEach(container => {
        container.classList.remove('active');
    });
    
    // Afficher le détail correspondant
    const targetDetail = document.querySelector(`.sae-detail-container[data-sae-id="${saeId}"]`);
    if (targetDetail) {
        targetDetail.classList.add('active');
    }
    
    // Scroll vers le haut
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ================================
// FERMER LE MENU MOBILE EN CLIQUANT DEHORS
// ================================
document.addEventListener('click', function(event) {
    const navLinks = document.getElementById('navLinks');
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    
    if (navLinks && mobileMenuBtn) {
        if (!navLinks.contains(event.target) && !mobileMenuBtn.contains(event.target)) {
            navLinks.classList.remove('active');
        }
    }
});

// ================================
// SMOOTH SCROLL POUR LES ANCRES
// ================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href.length > 1) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        }
    });
});

// ================================
// ANIMATION AU SCROLL
// ================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.content-card, .sae-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});
