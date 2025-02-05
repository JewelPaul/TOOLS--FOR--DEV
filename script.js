// DOM Elements
const searchInput = document.getElementById('search-input');
const heroSearch = document.getElementById('hero-search');
const toolsGrid = document.querySelector('.tools-grid');
const body = document.body;

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Function to set dark mode
function setDarkMode() {
    document.documentElement.classList.add('dark-mode');
    localStorage.setItem('theme', 'dark');
}

// Set dark mode on page load
setDarkMode();

// Search functionality
function handleSearch(searchTerm) {
    searchTerm = searchTerm.toLowerCase();
    const toolCards = document.querySelectorAll('.tool-card');
    
    toolCards.forEach(card => {
        const title = card.querySelector('h4').textContent.toLowerCase();
        const description = card.querySelector('p').textContent.toLowerCase();
        const isMatch = title.includes(searchTerm) || description.includes(searchTerm);
        
        card.style.display = isMatch ? 'flex' : 'none';
    });

    // Show/hide category headers based on visible tools
    document.querySelectorAll('.tool-category').forEach(category => {
        const visibleTools = category.querySelectorAll('.tool-card[style="display: flex"]').length;
        category.style.display = visibleTools > 0 ? 'block' : 'none';
    });
}

searchInput.addEventListener('input', (e) => handleSearch(e.target.value));
heroSearch.addEventListener('input', (e) => {
    searchInput.value = e.target.value;
    handleSearch(e.target.value);
});

// Add hover effect sound (optional)
const toolCards = document.querySelectorAll('.tool-card');
toolCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        // You can add a subtle hover sound here if desired
        // const hoverSound = new Audio('hover.mp3');
        // hoverSound.play();
    });
});

// Text Repeater
function repeatText() {
    const text = document.getElementById('repeatText').value;
    const count = parseInt(document.getElementById('repeatCount').value);
    if (!text || !count || count < 1) return;
    
    const repeated = Array(count).fill(text).join('\n');
    document.getElementById('repeatedText').value = repeated;
}

// Case Converter
function convertCase(type) {
    const text = document.getElementById('caseText').value;
    if (!text) return;
    
    let result = '';
    switch(type) {
        case 'upper':
            result = text.toUpperCase();
            break;
        case 'lower':
            result = text.toLowerCase();
            break;
    }
    document.getElementById('convertedText').value = result;
}

// Letter Counter
document.getElementById('countText')?.addEventListener('input', function() {
    const text = this.value;
    const chars = text.length;
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const lines = text.split('\n').length;
    
    document.getElementById('letterCount').textContent = 
        `Characters: ${chars} | Words: ${words} | Lines: ${lines}`;
});

// Link Generator
function generateLink() {
    const url = document.getElementById('linkUrl').value.trim();
    const text = document.getElementById('linkText').value.trim() || url;
    
    if (!isValidUrl(url)) {
        alert('Please enter a valid URL');
        return;
    }
    
    const htmlLink = `<a href="${url}" target="_blank" rel="noopener noreferrer">${text}</a>`;
    
    const preview = document.querySelector('.link-preview');
    const html = document.querySelector('.link-html');
    
    preview.innerHTML = `<a href="${url}" target="_blank" rel="noopener noreferrer">${text}</a>`;
    html.textContent = htmlLink;
}

function previewLink() {
    const url = document.getElementById('linkUrl').value.trim();
    if (!isValidUrl(url)) {
        alert('Please enter a valid URL');
        return;
    }
    window.open(url, '_blank', 'noopener,noreferrer');
}

function isValidUrl(string) {
    try {
        new URL(string);
        return true;
    } catch (_) {
        return false;
    }
}

// Utility Functions
function copyToClipboard(elementId) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    let text = '';
    if (element.value !== undefined) {
        text = element.value;
        element.select();
    } else {
        const htmlCode = element.querySelector('.link-html');
        if (htmlCode) {
            text = htmlCode.textContent;
        } else {
            text = element.textContent;
        }
    }
    
    if (!text) return;
    
    navigator.clipboard.writeText(text).then(() => {
        // Visual feedback
        const button = event.currentTarget;
        const originalText = button.innerHTML;
        button.innerHTML = '<i class="fas fa-check"></i> Copied!';
        setTimeout(() => {
            button.innerHTML = originalText;
        }, 2000);
    });
}

function clearText(elementId) {
    const element = document.getElementById(elementId);
    if (!element) return;
    element.value = '';
    element.dispatchEvent(new Event('input'));
}

// Search Box Focus Effect
const searchBox = document.querySelector('.search-box-large input');
searchBox?.addEventListener('focus', () => {
    searchBox.parentElement.classList.add('focused');
});

searchBox?.addEventListener('blur', () => {
    searchBox.parentElement.classList.remove('focused');
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Category Cards Hover Animation
document.querySelectorAll('.category-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-4px)';
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Tool Cards Click Animation
document.querySelectorAll('.tool-card').forEach(card => {
    card.addEventListener('click', function(e) {
        const ripple = document.createElement('div');
        ripple.classList.add('ripple');
        
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        
        card.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// FAQ Functionality
document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all FAQ items
            faqItems.forEach(faqItem => {
                faqItem.classList.remove('active');
            });
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
});
