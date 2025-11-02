document.addEventListener('DOMContentLoaded', function() {
    // Initialisation des onglets
    const tabs = document.querySelectorAll('.mission-tab');
    const tabContents = document.querySelectorAll('.mission-content');
    
    // Afficher le premier onglet par défaut si aucun n'est déjà actif
    const activeTabs = document.querySelectorAll('.mission-tab.active');
    if (activeTabs.length === 0 && tabs.length > 0) {
        tabs[0].classList.add('active');
        tabContents[0].classList.add('active');
    }
    
    // Gestion du clic sur les onglets
    tabs.forEach(tab => {
        tab.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Retirer la classe active de tous les onglets et contenus
            tabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Ajouter la classe active à l'onglet cliqué
            this.classList.add('active');
            
            // Afficher le contenu correspondant
            const targetId = this.getAttribute('data-tab');
            const targetContent = document.getElementById(targetId);
            
            if (targetContent) {
                targetContent.classList.add('active');
                
                // Faire défiler jusqu'au contenu en douceur
                targetContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
});
