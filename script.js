// script.js

document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 50, // Adjust offset if needed
                behavior: 'smooth'
            });
        }
    });
});

// Calculate years of experience
function calculateExperience() {
    const startDate = new Date('2021-01-01'); // Career start date
    const today = new Date();
    
    let years = today.getFullYear() - startDate.getFullYear();
    const monthDiff = today.getMonth() - startDate.getMonth();
    
    // Adjust years if we haven't reached the anniversary month
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < startDate.getDate())) {
        years--;
    }
    
    // Update the experience display
    const experienceElement = document.querySelector('.stat-value');
    if (experienceElement) {
        experienceElement.textContent = `${years}+`;
    }
}

// Update the footer year dynamically
function updateFooterYear() {
    const currentYear = new Date().getFullYear();
    const footerYearElement = document.querySelector('.footer-year'); // Assuming you have a span with this class in your footer
    if (footerYearElement) {
        footerYearElement.textContent = currentYear;
    }
}

// Call the function when the page loads
document.addEventListener('DOMContentLoaded', function() {
    calculateExperience();
    updateFooterYear(); // Call the function to update the year
    
    // Initialize skill levels with dots
    document.querySelectorAll('.skill-level[data-level]').forEach(skill => {
        const level = parseInt(skill.dataset.level);
        const total = parseInt(skill.dataset.total);
        const dotsContainer = skill.querySelector('.level-dots');
        
        // Clear existing dots
        dotsContainer.innerHTML = '';
        
        // Create all dots
        for (let i = 0; i < total; i++) {
            const dot = document.createElement('span');
            dot.className = `level-dot ${i < level ? 'filled' : 'empty'}`;
            dotsContainer.appendChild(dot);
        }
    });
});
