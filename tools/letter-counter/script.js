document.addEventListener('DOMContentLoaded', () => {
    const textInput = document.getElementById('textInput');
    const charCount = document.getElementById('charCount');
    const wordCount = document.getElementById('wordCount');
    const sentenceCount = document.getElementById('sentenceCount');
    const readingTime = document.getElementById('readingTime');
    const clearBtn = document.getElementById('clearBtn');
    const copyBtn = document.getElementById('copyBtn');

    // Clear text
    clearBtn.addEventListener('click', () => {
        textInput.value = '';
        updateStats();
    });

    // Copy text
    copyBtn.addEventListener('click', () => {
        textInput.select();
        document.execCommand('copy');
    });

    // Update stats on input
    textInput.addEventListener('input', updateStats);

    function updateStats() {
        const text = textInput.value;
        
        // Character count
        charCount.textContent = text.length;
        
        // Word count
        const words = text.trim().split(/\s+/).filter(word => word.length > 0).length;
        wordCount.textContent = words;
        
        // Sentence count
        const sentences = text.split(/[.!?]+/).filter(sentence => sentence.trim().length > 0).length;
        sentenceCount.textContent = sentences;
        
        // Reading time (assuming average reading speed of 200 words per minute)
        const minutes = Math.ceil(words / 200);
        readingTime.textContent = `${minutes} min${minutes !== 1 ? 's' : ''}`;
    }

    // Initialize stats
    updateStats();
});
