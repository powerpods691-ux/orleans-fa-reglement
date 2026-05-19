// Écran de chargement uniquement au premier chargement de la page (pas au changement de page)
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

// Barre de défilement qui suit le rythme de scroll
window.addEventListener('scroll', function() {
    const scrollProgress = document.getElementById('scrollProgress');
    
    // Calculer le pourcentage de défilement
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    
    // Mettre à jour la largeur de la barre en temps réel
    scrollProgress.style.width = scrollPercent + '%';
});

// Navigation active
document.addEventListener('DOMContentLoaded', function() {
    updateActiveLink();
    addScrollAnimations();
});

function updateActiveLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href.endsWith(currentPage) || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
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