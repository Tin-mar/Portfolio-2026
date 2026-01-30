// ===================================
// NAVIGATION
// ===================================
document.addEventListener('DOMContentLoaded', function() {
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.section');
    
    // Navigation entre les sections
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const targetSection = this.getAttribute('data-section');
            
            // Mettre à jour les sections
            sections.forEach(section => {
                section.classList.remove('active');
            });
            document.getElementById(targetSection).classList.add('active');
            
            // Mettre à jour la navigation
            navItems.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
            
            // Scroll vers le haut
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });
    
    // Navigation via les boutons CTA
    const ctaButtons = document.querySelectorAll('.btn[href^="#"]');
    ctaButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            
            // Activer la section
            sections.forEach(section => {
                section.classList.remove('active');
            });
            document.getElementById(targetId).classList.add('active');
            
            // Mettre à jour la nav
            navItems.forEach(nav => {
                nav.classList.remove('active');
                if (nav.getAttribute('data-section') === targetId) {
                    nav.classList.add('active');
                }
            });
            
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });
});

// ===================================
// FILTRAGE DES PROJETS
// ===================================
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const year = this.getAttribute('data-year');
            
            // Mettre à jour les boutons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filtrer les cartes
            projectCards.forEach(card => {
                if (year === 'all' || card.getAttribute('data-year') === year) {
                    card.style.display = 'flex';
                    card.style.animation = 'fadeIn 0.5s ease';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
});

// ===================================
// MODAL POUR LES DÉTAILS DES PROJETS
// ===================================
const projectDetails = {
    sae11: {
        title: 'SAE 11 : Hygiène Informatique & Cybersécurité',
        year: 'Année 1',
        type: 'Groupe',
        content: `
            <h3>📋 Présentation du projet</h3>
            <p>
                Cette SAÉ constitue une <strong>première approche de la cybersécurité</strong> dans le cadre 
                de ma formation en BUT RT. Le projet s'articule autour du MOOC SecNumAcadémie de l'ANSSI, 
                avec pour objectif l'acquisition des réflexes fondamentaux de sécurité informatique.
            </p>
            
            <h3>🎯 Compétences visées</h3>
            <div class="competence-block">
                <h4>RT1 - Administrer les réseaux et l'Internet</h4>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: 85%"></div>
                </div>
                <p><strong>Niveau atteint : 85%</strong> - Compréhension des enjeux de sécurité</p>
                <ul>
                    <li><strong>AC11.02</strong> – Comprendre l'architecture et les principes de l'information</li>
                    <li><strong>AC11.04</strong> – Maîtriser les rôles des systèmes d'exploitation</li>
                    <li><strong>AC11.05</strong> – Identifier les dysfonctionnements du réseau</li>
                </ul>
            </div>
            
            <h3>✅ Ma contribution</h3>
            <ul>
                <li>Pilotage de ma propre progression sur les modules de l'ANSSI en parallèle du travail de groupe</li>
                <li>Répartition des tâches pour la présentation orale</li>
                <li>Veille à comprendre les parties de mes camarades pour garder une vision globale</li>
            </ul>
            
            <h3>💭 Réflexion et auto-évaluation</h3>
            <div class="reflection-block">
                <h4>⭐ Points forts</h4>
                <p><strong>Autonomie :</strong> Capacité à suivre les modules en autodidacte.</p>
                <p><strong>Travail d'équipe :</strong> Bonne coordination pour la présentation orale.</p>
                
                <h4>📈 Axes d'amélioration</h4>
                <p><strong>Application pratique :</strong> Transformer les connaissances théoriques en réflexes pratiques quotidiens.</p>
                
                <h4>🔧 Ajustements pour progression</h4>
                <p><strong>Pratique continue :</strong> Appliquer systématiquement les bonnes pratiques de sécurité dans tous mes projets.</p>
            </div>
        `
    },
    sae12: {
        title: 'SAE 12 : Architecture Réseau',
        year: 'Année 1',
        type: 'Groupe',
        content: `
            <h3>📋 Présentation du projet</h3>
            <p>
                Ce projet avait pour objectif la <strong>conception et la mise en place d'un réseau local 
                d'entreprise sécurisé</strong>. Il s'agissait de configurer des équipements réseau réels 
                et de produire une documentation technique complète.
            </p>
            
            <h3>🎯 Compétences visées</h3>
            <div class="competence-block">
                <h4>RT1 - Administrer les réseaux et l'Internet</h4>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: 75%"></div>
                </div>
                <p><strong>Niveau atteint : 75%</strong> - Bases de configuration acquises</p>
                <ul>
                    <li><strong>AC11.03</strong> – Configurer les fonctions de base du réseau local</li>
                    <li><strong>AC11.06</strong> – Installer un poste client et sécuriser l'accès</li>
                </ul>
            </div>
            
            <h3>✅ Ma contribution</h3>
            <ul>
                <li>Participation active à la configuration des équipements</li>
                <li>Rédaction des livrables techniques</li>
                <li>Visée d'un rendu très complet pour compenser nos lacunes initiales</li>
            </ul>
            
            <h3>💭 Réflexion et auto-évaluation</h3>
            <div class="reflection-block">
                <h4>⭐ Points forts</h4>
                <p><strong>Documentation :</strong> Production de livrables techniques de qualité.</p>
                
                <h4>📈 Axes d'amélioration</h4>
                <p><strong>Gestion de l'imprévu :</strong> Apprendre à mieux anticiper et gérer les imprévus (vol de matériel).</p>
                <p><strong>Gestion du stress :</strong> Développer des stratégies pour gérer le stress lors des présentations orales.</p>
            </div>
        `
    },
    sae13: {
        title: 'SAE 13 : Réflectométrie (DTF)',
        year: 'Année 1',
        type: 'Groupe',
        content: `
            <h3>📋 Présentation du projet</h3>
            <p>
                Diagnostic de câblage cuivre et fibre optique par réflectométrie pour identifier 
                les défauts de transmission.
            </p>
            
            <h3>🎯 Compétences visées</h3>
            <div class="competence-block">
                <h4>RT2 - Connecter les entreprises et les usagers</h4>
                <p><strong>AC12.01</strong> – Mesurer et analyser les signaux</p>
                <p><strong>AC12.03</strong> – Déployer des supports de transmission</p>
            </div>
            
            <h3>✅ Ma contribution</h3>
            <ul>
                <li>Concentration sur l'analyse des courbes de réflectométrie</li>
                <li>Identification des défauts de câblage</li>
                <li>Compréhension de la corrélation entre signal physique et réalité du câble</li>
            </ul>
            
            <h3>💭 Réflexion</h3>
            <p>
                <strong>Leçon cruciale :</strong> La qualité des résultats finaux dépend de la précision 
                des données initiales. Manque de temps ayant entraîné des approximations sur les mesures de base.
            </p>
        `
    },
    sae14: {
        title: 'SAE 14 : Développement Web',
        year: 'Année 1',
        type: 'Individuel',
        content: `
            <h3>📋 Présentation du projet</h3>
            <p>
                Création de mon identité numérique via un site web personnel et déploiement via GitHub.
                Code "from scratch" sans templates pour maîtriser le code source.
            </p>
            
            <h3>🎯 Compétences visées</h3>
            <div class="competence-block">
                <h4>RT3 - Créer des outils et des applications informatiques</h4>
                <ul>
                    <li><strong>AC13.04</strong> – Connaître l'architecture et les technologies Web</li>
                    <li><strong>AC13.01</strong> – Utiliser un système informatique et ses outils</li>
                </ul>
            </div>
            
            <h3>✅ Tâches réalisées</h3>
            <ul>
                <li>Codage "from scratch" sans templates</li>
                <li>Respect des normes W3C</li>
                <li>Isolation pour concentration sur la structure</li>
                <li>Découverte du versionning avec GitHub</li>
            </ul>
            
            <h3>💭 Apprentissages</h3>
            <p>
                Première expérience complète en développement web. Importance de la structure 
                des fichiers pour la maintenabilité. Découverte de la puissance du versionning avec GitHub.
            </p>
        `
    },
    sae15: {
        title: 'SAE 15 : Données Dynamiques',
        year: 'Année 1',
        type: 'Groupe',
        content: `
            <h3>📋 Présentation du projet</h3>
            <p>
                Traitement statistique de données via une API (PokeAPI) avec JavaScript. 
                Méthodologie en couches : structure HTML, style CSS, puis logique JS.
            </p>
            
            <h3>🎯 Compétences visées</h3>
            <div class="competence-block">
                <h4>RT3 - Créer des outils informatiques</h4>
                <ul>
                    <li><strong>AC13.02</strong> – Lire, exécuter, corriger et modifier un programme</li>
                    <li><strong>AC13.05</strong> – Choisir les mécanismes de gestion de données adaptés</li>
                </ul>
            </div>
            
            <h3>✅ Ma contribution</h3>
            <ul>
                <li>Méthodologie en couches : HTML, CSS, JS</li>
                <li>Travail en binôme pour apprentissage par les pairs</li>
                <li>Manipulation du DOM et gestion des événements asynchrones</li>
            </ul>
            
            <h3>💭 Difficultés surmontées</h3>
            <p>
                La manipulation du DOM et la gestion des événements asynchrones ont été complexes. 
                Apprentissage à lire la documentation technique de manière autonome.
            </p>
        `
    },
    sae21: {
        title: 'SAE 21 : Administration Réseau Avancée',
        year: 'Année 2',
        type: 'Groupe',
        content: `
            <h3>📋 Présentation du projet</h3>
            <p>
                Déploiement complet d'une infrastructure réseau pour petite structure avec VLANs, 
                routage et services avancés.
            </p>
            
            <h3>🎯 Compétences visées</h3>
            <div class="competence-block">
                <h4>RT1 - Administrer les réseaux</h4>
                <ul>
                    <li><strong>AC11.02/03</strong> – Configurer les fonctions de base du réseau</li>
                    <li><strong>AC11.04</strong> – Maîtriser l'administration des réseaux</li>
                    <li><strong>AC11.05</strong> – Identifier les dysfonctionnements</li>
                </ul>
            </div>
            
            <h3>✅ Ma contribution</h3>
            <ul>
                <li>Conception d'une architecture cohérente avec séparation des sous-réseaux</li>
                <li>Production d'une documentation complète des configurations</li>
                <li>Diagnostic de pannes (boucles réseau, conflits IP)</li>
            </ul>
            
            <h3>💭 Leçon apprise</h3>
            <p>
                <strong>Importance de la préparation et de la rigueur</strong> lors de la configuration 
                pour éviter les imprévus techniques. Difficultés rencontrées sur le diagnostic de pannes complexes.
            </p>
        `
    },
    sae22: {
        title: 'SAE 22 : Analyse Spectrale',
        year: 'Année 2',
        type: 'Groupe',
        content: `
            <h3>📋 Présentation du projet</h3>
            <p>
                Caractérisation de signaux radio et modélisation avec RTL-SDR. Utilisation d'une 
                antenne pour capter et visualiser des signaux réels.
            </p>
            
            <h3>🎯 Compétences visées</h3>
            <div class="competence-block">
                <h4>RT2 - Connecter les entreprises et les usagers</h4>
                <ul>
                    <li><strong>AC12.01</strong> – Mesurer et analyser les signaux</li>
                    <li><strong>AC12.02</strong> – Caractériser des systèmes de transmission</li>
                </ul>
            </div>
            
            <h3>✅ Ma contribution</h3>
            <ul>
                <li>Utilisation d'une antenne RTL-SDR pour capter des signaux réels</li>
                <li>Réalisation d'un compte-rendu structuré avec schémas et courbes</li>
                <li>Analyse de phénomènes parasites</li>
            </ul>
            
            <h3>💭 Difficultés</h3>
            <p>
                Phénomènes parasites (bruit de phase, lobes secondaires, diaphonie) difficiles à interpréter. 
                <strong>Nécessité de renforcer les bases en mathématiques</strong> pour l'analyse spectrale.
            </p>
        `
    }
};

document.addEventListener('DOMContentLoaded', function() {
    const detailButtons = document.querySelectorAll('.btn-details');
    const modal = document.getElementById('projectModal');
    const modalBody = document.getElementById('modalBody');
    const modalClose = document.querySelector('.modal-close');
    const modalOverlay = document.querySelector('.modal-overlay');
    
    detailButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const projectId = this.getAttribute('data-id');
            const project = projectDetails[projectId];
            
            if (project) {
                modalBody.innerHTML = `
                    <div class="modal-header-info">
                        <span class="project-tag">${project.year}</span>
                        <span class="project-type ${project.type === 'Groupe' ? 'group' : 'individual'}">${project.type}</span>
                    </div>
                    <h2 style="margin: 1.5rem 0 2rem 0; font-size: 2rem;">${project.title}</h2>
                    ${project.content}
                `;
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });
    
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
    
    modalClose.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', closeModal);
    
    // Fermer avec la touche Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
});

// ===================================
// ANIMATIONS AU SCROLL
// ===================================
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.parcours-card, .project-card, .competence-card, .bilan-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// ===================================
// SMOOTH SCROLL
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href.length > 1) {
            const target = document.querySelector(href);
            if (target && !this.hasAttribute('data-section')) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        }
    });
});
