// Fonction pour forcer le téléchargement avec fetch et blob
window.downloadFile = async function(url, fileName) {
    console.log('Tentative de téléchargement:', { url, fileName });
    
    try {
        // Récupérer le fichier
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error('Erreur lors du chargement du fichier');
        }
        
        // Convertir en blob
        const blob = await response.blob();
        
        // Créer une URL d'objet pour le blob
        const blobUrl = window.URL.createObjectURL(blob);
        
        // Créer un lien temporaire
        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = fileName || 'download.pdf';
        link.style.display = 'none';
        
        // Ajouter au DOM et cliquer
        document.body.appendChild(link);
        link.click();
        
        // Nettoyer après un court délai
        setTimeout(() => {
            document.body.removeChild(link);
            window.URL.revokeObjectURL(blobUrl);
        }, 100);
        
        return true;
    } catch (error) {
        console.error('Erreur lors du téléchargement:', error);
        // Si le téléchargement échoue, ouvrir dans un nouvel onglet
        window.open(url, '_blank');
        return false;
    }
}

// Gestion du clic sur les boutons de téléchargement
document.addEventListener('click', function(e) {
    // Gestion du clic sur les boutons Voir
    if (e.target.closest('.btn-view')) {
        const button = e.target.closest('.btn-view');
        const url = button.getAttribute('data-url');
        if (url) {
            window.open(url, '_blank');
        }
    }
    // Gestion du clic sur les boutons de téléchargement des fiches missions
    else if (e.target.closest('.btn-download[download]')) {
        e.preventDefault();
        e.stopPropagation();
        
        const link = e.target.closest('a');
        const url = link.getAttribute('href');
        const fileName = link.getAttribute('download');
        
        console.log('Tentative de téléchargement:', { url, fileName });
        
        // Utiliser la fonction downloadFile pour gérer le téléchargement
        downloadFile(url, fileName).catch(error => {
            console.error('Erreur lors du téléchargement:', error);
            // Ouvrir le fichier dans un nouvel onglet en cas d'échec du téléchargement
            window.open(url, '_blank');
        });
    }
    // Gestion du clic sur les autres boutons de téléchargement
    else if (e.target.closest('.download-bachelor, .download-stage')) {
        e.preventDefault();
        const button = e.target.closest('button');
        const url = button.getAttribute('data-url');
        let fileName = 'document.pdf';
        
        // Déterminer le nom du fichier en fonction de la classe du bouton
        if (button.classList.contains('download-bachelor')) {
            fileName = 'Plaquette_formation.pdf';
        } else if (button.classList.contains('download-stage')) {
            fileName = 'Fiche_appreciation_stage.pdf';
        }
        
        downloadFile(url, fileName).catch(error => {
            console.error('Erreur lors du téléchargement:', error);
            // Ouvrir le fichier dans un nouvel onglet en cas d'échec du téléchargement
            window.open(url, '_blank');
        });
    }
});
