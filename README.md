# Portfolio Martin Bretonnière - BUT Réseaux & Télécommunications

Portfolio web moderne et interactif présentant les compétences, projets (SAÉ) et parcours académique de Martin Bretonnière, étudiant en 2ème année de BUT R&T à l'IUT de Caen.

## 🎨 Caractéristiques

### Design
- **Mode sombre/clair** : Thème personnalisable avec persistance
- **Animations fluides** : Particules animées, effets de survol, transitions
- **Responsive** : Optimisé pour tous les écrans (mobile, tablette, desktop)
- **Glassmorphism** : Effets de transparence et de flou modernes

### Fonctionnalités
- ✨ Effet de machine à écrire sur le titre
- 🎭 Modales détaillées pour chaque SAÉ avec galeries d'images
- 🔍 Filtrage des projets par année (BUT 1, 2, 3)
- 📊 Statistiques animées
- 🎨 Cartes flottantes animées
- 🖱️ Effets parallaxe subtils
- 🎮 Easter egg (Konami Code)

### Sections
1. **Accueil** : Présentation avec statistiques et appels à l'action
2. **À propos** : Profil détaillé, parcours, contacts
3. **Compétences** : Compétences RT1, RT2, RT3 avec barres de progression
4. **Portfolio** : Tous les projets SAÉ avec images et détails
5. **Projection** : Ambitions et parcours professionnel

## 📁 Structure des fichiers

```
portfolio/
├── index.html          # Page HTML principale
├── style.css           # Styles CSS (mode sombre/clair, animations)
├── script.js           # JavaScript (interactivité, modales)
├── images/             # Dossier des images
│   ├── moi.jpg        # Photo de profil
│   ├── sae11-2.jpg    # SAÉ 1.01
│   ├── sae12-2.png    # SAÉ 1.02
│   ├── sae13-2.png    # SAÉ 1.03
│   ├── sae13.jpg      # SAÉ 1.03 (alt)
│   ├── sae14.png      # SAÉ 1.04
│   ├── sae15.png      # SAÉ 1.05
│   ├── sae21.png      # SAÉ 2.01
│   ├── sae22-2.png    # SAÉ 2.02
│   ├── sae24.png      # SAÉ 2.04
│   ├── sae31-1.jpeg   # SAÉ 3.01
│   ├── sae31-2.png    # SAÉ 3.01 (alt)
│   ├── sae33-1.png    # SAÉ 3.03
│   ├── sae33-2.jpg    # SAÉ 3.03 (alt)
│   └── sae33-3.png    # SAÉ 3.03 (schéma)
└── README.md           # Ce fichier
```

## 🚀 Installation

### Méthode 1 : Simple (double-clic)
1. Téléchargez tous les fichiers
2. Assurez-vous que la structure des dossiers est respectée
3. Double-cliquez sur `index.html`

### Méthode 2 : Serveur local
```bash
# Avec Python 3
python -m http.server 8000

# Avec Node.js (http-server)
npx http-server

# Ouvrez ensuite http://localhost:8000 dans votre navigateur
```

## 🎯 SAÉ Présentes

### BUT 1
- **SAÉ 1.01** : Hygiène informatique (SecNumacadémie - 90%)
- **SAÉ 1.02** : Réseaux informatiques (Architecture multi-sites)
- **SAÉ 1.03** : Fibres optiques (Mesures et caractérisation)
- **SAÉ 1.04** : Site web One Piece (HTML/CSS)

### BUT 2
- **SAÉ 2.01** : Construire un réseau (VLANs, DHCP, DNS)
- **SAÉ 2.02** : MATLAB OnRamp (Certification 100%)
- **SAÉ 2.04** : Instant Weather (Application météo)

### BUT 3
- **SAÉ 3.01** : Certification SRWE (Cisco - 100%)
- **SAÉ 3.03** : Infrastructure multi-sites (Stack switches, redondance)

## 🎨 Personnalisation

### Changer les couleurs
Modifiez les variables CSS dans `style.css` :

```css
:root {
    --primary: #00f2ff;      /* Couleur principale */
    --secondary: #ff006e;    /* Couleur secondaire */
    --accent: #8338ec;       /* Couleur d'accent */
    /* ... */
}
```

### Ajouter une SAÉ
1. **Ajoutez l'image** dans le dossier `images/`
2. **Ajoutez la carte** dans la section portfolio du HTML
3. **Ajoutez les détails** dans `script.js` dans l'objet `saeDetails`

Exemple :
```javascript
'sae104': {
    title: 'SAÉ X.XX - Titre',
    subtitle: 'Sous-titre',
    badges: ['RT1', 'RT2'],
    description: 'Description courte',
    content: `
        <h3>Section</h3>
        <p>Contenu...</p>
    `,
    images: ['images/saeXX.png']
}
```

### Modifier les informations personnelles
Recherchez et remplacez dans `index.html` :
- Nom : `Martin Bretonnière`
- Email : `bretonnieremartin5@gmail.com`
- Téléphone : `07 80 58 24 41`
- Adresse : `2 rue Barbey d'Aurévilly, 50130 Octeville`

## 🌈 Easter Eggs

- **Konami Code** : ↑ ↑ ↓ ↓ ← → ← → B A
- Messages console pour développeurs

## 📱 Responsive

Le portfolio est optimisé pour :
- 📱 Mobile : < 480px
- 📱 Tablette : 481px - 768px
- 💻 Desktop : 769px - 1024px
- 🖥️ Large : > 1024px

## 🛠️ Technologies utilisées

- HTML5 sémantique
- CSS3 (Grid, Flexbox, animations)
- JavaScript ES6+ (vanilla)
- Google Fonts (Outfit, Space Mono)
- Font Awesome 6
- Material Symbols

## 📄 Licence

© 2025 Martin Bretonnière - Tous droits réservés

## 📞 Contact

- **Email** : bretonnieremartin5@gmail.com
- **Téléphone** : 07 80 58 24 41
- **Adresse** : 2 rue Barbey d'Aurévilly, 50130 Octeville, Cherbourg-en-Cotentin

## 🎓 Formation

BUT Réseaux & Télécommunications
IUT de Caen (Ifs) - 2ème année
Recherche stage 2025

---

**Développé avec ❤️ pour présenter un parcours en Réseaux & Télécommunications**
