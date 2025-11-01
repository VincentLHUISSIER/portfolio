document.addEventListener('DOMContentLoaded', function() {
    // Initialisation des onglets
    const tabs = document.querySelectorAll('.mission-tab');
    const tabContents = document.querySelectorAll('.mission-content');
    
    // Afficher le premier onglet par défaut
    if (tabs.length > 0) {
        tabs[0].classList.add('active');
        tabContents[0].classList.add('active');
    }
    
    // Gestion du clic sur les onglets
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Retirer la classe active de tous les onglets et contenus
            tabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Ajouter la classe active à l'onglet cliqué
            this.classList.add('active');
            
            // Afficher le contenu correspondant
            const targetId = this.getAttribute('data-tab');
            document.getElementById(targetId).classList.add('active');
        });
    });
    
    // Gestion du chargement dynamique du contenu des missions
    // Cette fonction serait appelée pour charger le contenu via AJAX si nécessaire
    function loadMissionContent(missionId) {
        // Implémentation pour charger le contenu de la mission
        // Par exemple, via fetch() pour charger du contenu depuis un fichier
    }
});
