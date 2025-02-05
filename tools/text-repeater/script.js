document.addEventListener('DOMContentLoaded', function() {
    const inputText = document.getElementById('inputText');
    const repeatCount = document.getElementById('repeatCount');
    const separator = document.getElementById('separator');
    const outputText = document.getElementById('outputText');
    const repeatBtn = document.getElementById('repeatBtn');
    const copyBtn = document.getElementById('copyBtn');
    const clearBtn = document.getElementById('clearBtn');
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // Theme toggle functionality
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        const moonIcon = themeToggle.querySelector('i');
        moonIcon.classList.toggle('fa-moon');
        moonIcon.classList.toggle('fa-sun');
        
        // Save theme preference
        const isDarkMode = body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', isDarkMode);
    });

    // Load saved theme preference
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    if (savedDarkMode) {
        body.classList.add('dark-mode');
        const moonIcon = themeToggle.querySelector('i');
        moonIcon.classList.remove('fa-moon');
        moonIcon.classList.add('fa-sun');
    }

    // Repeat text functionality
    repeatBtn.addEventListener('click', () => {
        if (!inputText.value) {
            alert('Please enter some text to repeat');
            return;
        }

        const count = parseInt(repeatCount.value) || 1;
        if (count < 1) {
            alert('Please enter a valid number greater than 0');
            return;
        }

        const sep = separator.value || '';
        const repeatedText = Array(count).fill(inputText.value).join(sep);
        outputText.value = repeatedText;
    });

    // Copy functionality
    copyBtn.addEventListener('click', () => {
        if (!outputText.value) {
            alert('No text to copy');
            return;
        }

        outputText.select();
        document.execCommand('copy');
        
        // Visual feedback
        const originalText = copyBtn.innerHTML;
        copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
        setTimeout(() => {
            copyBtn.innerHTML = originalText;
        }, 2000);
    });

    // Clear functionality
    clearBtn.addEventListener('click', () => {
        inputText.value = '';
        repeatCount.value = '1';
        separator.value = '';
        outputText.value = '';
        inputText.focus();
    });

    // Input validation for repeat count
    repeatCount.addEventListener('input', () => {
        const value = parseInt(repeatCount.value);
        if (value < 1) {
            repeatCount.value = '1';
        } else if (value > 10000) {
            repeatCount.value = '10000';
        }
    });
});
