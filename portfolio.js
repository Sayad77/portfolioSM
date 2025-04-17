// Portfolio Interactions Script


    // Ajoutez ce code dans votre script
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Forcer le rafraîchissement des sections
    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        setTimeout(() => {
            section.style.opacity = '1';
            section.classList.add('animate__animated', 'animate__fadeIn');
        }, 100);
    });
});

    // Animation de chargement des sections
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate__animated', 'animate__fadeIn');
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // Menu burger responsive
    menuBtn.addEventListener('click', () => {
        header.classList.toggle('active');
        menuBtn.classList.toggle('fa-times');
    });

    // Fermeture du menu lors du clic sur un lien de navigation
    document.querySelectorAll('.navbar a').forEach(link => {
        link.addEventListener('click', () => {
            header.classList.remove('active');
            menuBtn.classList.remove('fa-times');
        });
    });

    // Filtrage des projets
    const createProjectFilter = () => {
        // Création dynamique des boutons de filtre
        const filterTypes = [
            'Tous',
            'Web',
            'Mobile',
            'API',
            'Jeu'
        ];

        const filterContainer = document.createElement('div');
        filterContainer.classList.add('project-filters');
        
        filterTypes.forEach(type => {
            const button = document.createElement('button');
            button.textContent = type;
            button.classList.add('filter-btn');
            
            button.addEventListener('click', () => {
                filterProjects(type);
                // Gestion de l'état actif du bouton
                document.querySelectorAll('.filter-btn').forEach(btn => 
                    btn.classList.remove('active'));
                button.classList.add('active');
            });
            
            filterContainer.appendChild(button);
        });

        projectsContainer.parentNode.insertBefore(filterContainer, projectsContainer);
    };

    const filterProjects = (type) => {
        const projects = document.querySelectorAll('.projects .box');
        
        projects.forEach(project => {
            const projectType = project.querySelector('.tech-used').textContent.toLowerCase();
            
            if (type === 'Tous' || 
                (type === 'Web' && projectType.includes('html')) ||
                (type === 'Mobile' && projectType.includes('mobile')) ||
                (type === 'API' && projectType.includes('api')) ||
                (type === 'Jeu' && projectType.includes('godot'))
            ) {
                project.style.display = 'block';
                project.classList.add('animate__animated', 'animate__fadeIn');
            } else {
                project.style.display = 'none';
            }
        });
    };

    // Initialisation des fonctionnalités
    const initPortfolio = () => {
        createProjectFilter();
        
        // Optimisation du chargement
        document.body.classList.add('loaded');
        
        // Gestion du premier filtre par défaut
        filterProjects('Tous');
        document.querySelector('.filter-btn')?.classList.add('active');
    };

    
    

// Ajouter dans votre fichier JavaScript ou dans une balise script à la fin du document
document.getElementById('cvButton').addEventListener('click', function(e) {
    e.preventDefault();
    document.getElementById('cvModal').style.display = 'block';
});

// Correction pour le téléchargement du CV en PDF
document.addEventListener('DOMContentLoaded', function() {
    // S'assurer que le bouton de téléchargement existe
    const downloadBtn = document.querySelector('.download-cv');
    
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Afficher un message de génération
            const modalContent = document.querySelector('.modal-content');
            const loadingMsg = document.createElement('div');
            loadingMsg.className = 'pdf-loading';
            loadingMsg.innerHTML = 'Génération du PDF en cours...';
            loadingMsg.style.textAlign = 'center';
            loadingMsg.style.padding = '10px';
            modalContent.appendChild(loadingMsg);
            
            // Attendre que html2pdf soit chargé
            setTimeout(() => {
                // Cibler le contenu du CV
                const cvContent = document.querySelector('.cv-content');
                
                // Vérifier si la lib est disponible
                if (typeof html2pdf === 'undefined') {
                    loadingMsg.innerHTML = 'Erreur: html2pdf n\'est pas chargé correctement';
                    console.error('html2pdf n\'est pas disponible');
                    return;
                }
                
                // Options pour le PDF
                const options = {
                    margin: 10,
                    filename: 'CV_Madarbukus_Sayadali.pdf',
                    image: { type: 'jpeg', quality: 0.98 },
                    html2canvas: { scale: 2 },
                    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
                };
                
                // Générer le PDF
                html2pdf().from(cvContent).set(options).save().then(() => {
                    // Supprimer le message de chargement
                    modalContent.removeChild(loadingMsg);
                }).catch(err => {
                    console.error('Erreur lors de la génération du PDF:', err);
                    loadingMsg.innerHTML = 'Erreur lors de la génération du PDF';
                });
            }, 500);
        });
    }
});
document.querySelectorAll('.navbar a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();

        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);

        if (targetSection) {
            setTimeout(() => {
                const yOffset = -80; // Décalage pour ajuster visuellement
                const y = targetSection.getBoundingClientRect().top + window.pageYOffset + yOffset;

                window.scrollTo({
                    top: y,
                    behavior: 'smooth'
                });
            }, 50); // ⏳ On attend 50ms pour que tout soit chargé
        }

        // Fermer menu mobile si actif
        document.querySelector('.header').classList.remove('active');
        document.getElementById('menu-btn').classList.remove('fa-times');
    });
});


        // Ferme le menu mobile s’il est ouvert
        document.querySelector('.header').classList.remove('active');
        document.getElementById('menu-btn').classList.remove('fa-times');
    });
});

function preloader() {
    setTimeout(() => {
        const loader = document.getElementById("loader");
        loader.style.opacity = "0";
        loader.style.transition = "opacity 0.8s ease";

        setTimeout(() => {
            loader.style.display = "none";
            document.body.classList.remove('loading');

            // ✅ Lancement des animations et autres scripts
            initPortfolio();
        }, 800);
    }, 2500);
}



// Styles à ajouter dans votre CSS pour compléter les interactions
// .project-filters {
//     display: flex;
//     justify-content: center;
//     margin-bottom: 20px;
// }
// .filter-btn {
//     margin: 0 10px;
//     padding: 10px 15px;
//     background-color: #f4f4f4;
//     border: none;
//     cursor: pointer;
// }
// .filter-btn.active {
//     background-color: var(--primary-color);
//     color: white;
// }