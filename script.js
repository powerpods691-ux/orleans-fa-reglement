// Écran de chargement uniquement au premier chargement
let isFirstLoad = sessionStorage.getItem('firstLoadDone') === null;

window.addEventListener('load', function() {
    if (isFirstLoad) {
        const loaderContainer = document.getElementById('loaderContainer');
        setTimeout(() => {
            loaderContainer.style.display = 'none';
            sessionStorage.setItem('firstLoadDone', 'true');
            isFirstLoad = false;
        }, 3000);
    } else {
        const loaderContainer = document.getElementById('loaderContainer');
        loaderContainer.style.display = 'none';
    }
});

// Barre de défilement
window.addEventListener('scroll', function() {
    const scrollProgress = document.getElementById('scrollProgress');
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    
    scrollProgress.style.width = scrollPercent + '%';

    // Bouton Scroll to Top
    const scrollToTopBtn = document.getElementById('scrollToTop');
    if (scrollToTopBtn) {
        if (window.scrollY > 300) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    }
});

// Fonction pour scroll to top
const scrollToTopBtn = document.getElementById('scrollToTop');
if (scrollToTopBtn) {
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Menu hamburger mobile
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const sidebar = document.querySelector('.sidebar');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        sidebar.classList.toggle('active');
    });

    // Fermer le menu quand on clique sur un lien
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuToggle.classList.remove('active');
            sidebar.classList.remove('active');
        });
    });
}

// Navigation active
document.addEventListener('DOMContentLoaded', function() {
    updateActiveLink();
    addScrollAnimations();
    initLexique();
});

function updateActiveLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Retirer tous les active
    navLinks.forEach(link => {
        link.classList.remove('active');
    });
    
    // Ajouter active au lien correspondant
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href.endsWith(currentPage) || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
}

function addScrollAnimations() {
    const sections = document.querySelectorAll('.section, .quick-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });
    
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'all 0.6s ease';
        observer.observe(section);
    });
}

// Lexique Tabs
function initLexique() {
    const categoryButtons = document.querySelectorAll('.lexique-sidebar button');
    const sections = document.querySelectorAll('.lexique-section');

    if (categoryButtons.length > 0) {
        // Activer la première section par défaut
        if (sections.length > 0) {
            sections[0].classList.add('active');
            categoryButtons[0].classList.add('active');
        }

        categoryButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Désactiver tous
                categoryButtons.forEach(btn => btn.classList.remove('active'));
                sections.forEach(section => section.classList.remove('active'));

                // Activer le sélectionné
                this.classList.add('active');
                const index = Array.from(categoryButtons).indexOf(this);
                if (sections[index]) {
                    sections[index].classList.add('active');
                }
            });
        });
    }
}
