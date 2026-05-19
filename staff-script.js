// Animations pour les cartes staff
document.addEventListener('DOMContentLoaded', function() {
    const staffCards = document.querySelectorAll('.staff-card');
    
    staffCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const hoverBar = this.querySelector('.staff-card-hover-bar');
            hoverBar.style.animation = 'none';
            // Trigger reflow
            void hoverBar.offsetWidth;
            hoverBar.style.animation = 'expandBar 0.8s ease-in-out infinite';
        });
        
        card.addEventListener('mouseleave', function() {
            const hoverBar = this.querySelector('.staff-card-hover-bar');
            hoverBar.style.animation = 'none';
        });
    });
});