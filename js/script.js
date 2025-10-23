// Icônes pour chaque section du sommaire
const sectionIcons = {
    'Présentation': 'user-tie',
    'CV': 'file-alt',
    'Expériences': 'briefcase',
    'Missions': 'tasks',
    'Annexes': 'folder-open',
    'Contact': 'envelope'
};

// Descriptions pour chaque section
const sectionDescriptions = {
    'Présentation': 'Découvrez qui je suis et mes compétences',
    'CV': 'Mon parcours académique et professionnel',
    'Expériences': 'Mes expériences professionnelles et stages',
    'Missions': 'Les projets et missions que j\'ai menés',
    'Annexes': 'Documents et ressources complémentaires',
    'Contact': 'Prenez contact avec moi pour en savoir plus'
};

// Fonction pour générer le sommaire automatique
function generateTableOfContents() {
    const tocContainer = document.getElementById('table-of-contents');
    if (!tocContainer) return;
    
    const headings = Array.from(document.querySelectorAll('h2')).filter(h2 => 
        !h2.closest('footer') && !h2.closest('.experience-card') && !h2.closest('.mission-card')
    );
    
    if (headings.length === 0) return;
    
    let tocHTML = '<h2>Explorez mon Portfolio</h2><div class="toc-grid">';
    
    headings.forEach((heading, index) => {
        const id = `section-${index}`;
        heading.setAttribute('id', id);
        
        const sectionTitle = heading.textContent.trim();
        const icon = sectionIcons[sectionTitle] || 'link';
        const description = sectionDescriptions[sectionTitle] || 'En savoir plus sur cette section';
        
        // Créer une carte pour chaque section
        tocHTML += `
            <a href="#${id}" class="toc-card">
                <i class="fas fa-${icon}"></i>
                <span>${sectionTitle}</span>
                <small>${description}</small>
            </a>`;
    });
    
    tocHTML += '</div>';
    
    const container = tocContainer.querySelector('.container');
    if (container) {
        container.innerHTML = tocHTML;
        
        // Ajouter un effet de survol dynamique
        const cards = container.querySelectorAll('.toc-card');
        cards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-5px)';
                this.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.1)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.05)';
            });
        });
    }
}

// Fonction pour gérer les onglets
function setupTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    
    if (tabButtons.length === 0 || tabContents.length === 0) return;
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Retirer la classe active de tous les boutons et contenus
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Ajouter la classe active au bouton et au contenu cliqué
            button.classList.add('active');
            const tabId = button.getAttribute('data-tab');
            if (tabId) {
                const targetTab = document.getElementById(tabId);
                if (targetTab) targetTab.classList.add('active');
            }
        });
    });
}

// Gestion de la barre de navigation au défilement
function handleNavbarScroll() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

// Menu mobile et initialisation
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    // Gestion du menu mobile
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            this.classList.toggle('fa-times');
        });
        
        // Fermer le menu au clic sur un lien
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                if (hamburger.classList.contains('fa-times')) {
                    hamburger.classList.remove('fa-times');
                }
            });
        });
    }
    
    // Animation au défilement
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observer les éléments avec la classe 'animate-on-scroll'
    document.querySelectorAll('.animate-on-scroll').forEach(element => {
        observer.observe(element);
    });
    
    // Navigation fluide
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#' || targetId === '#!') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Gestion de la section active
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-links a');
    
    if (sections.length > 0 && navItems.length > 0) {
        const updateActiveNav = () => {
            let current = '';
            const scrollPosition = window.scrollY + 100;
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    current = section.getAttribute('id');
                }
            });
            
            navItems.forEach(item => {
                item.classList.remove('active');
                const href = item.getAttribute('href');
                if (href && href.includes(current)) {
                    item.classList.add('active');
                }
            });
            
            // Mise à jour de la barre de navigation au défilement
            handleNavbarScroll();
        };
        
        // Écouteurs d'événements
        window.addEventListener('scroll', updateActiveNav);
        window.addEventListener('resize', updateActiveNav);
        
        // Appel initial
        updateActiveNav();
    }
    
    // Initialiser le sommaire et les onglets
    generateTableOfContents();
    setupTabs();
});
