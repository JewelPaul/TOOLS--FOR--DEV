// DOM Elements
const inputText = document.getElementById('input-text');
const outputText = document.getElementById('output-text');
const copyBtn = document.getElementById('copy-btn');
const clearBtn = document.getElementById('clear-btn');
const successMessage = document.getElementById('success-message');
const caseButtons = document.querySelectorAll('[data-case]');

// Case conversion functions
const caseConverters = {
    upper: (text) => text.toUpperCase(),
    lower: (text) => text.toLowerCase(),
    title: (text) => {
        return text.replace(/\w\S*/g, (word) => {
            return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase();
        });
    },
    camel: (text) => {
        return text
            .replace(/[\s-_]+(.)/g, (_, c) => c.toUpperCase())
            .replace(/^(.)/, (_, c) => c.toLowerCase())
            .replace(/[^\w\s]/g, '');
    },
    snake: (text) => {
        return text
            .replace(/\s+/g, '_')
            .replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`)
            .replace(/^_/, '')
            .replace(/_{2,}/g, '_')
            .toLowerCase();
    }
};

// Event Listeners
caseButtons.forEach(button => {
    button.addEventListener('click', () => {
        const caseType = button.dataset.case;
        const converter = caseConverters[caseType];
        if (converter) {
            outputText.value = converter(inputText.value);
        }
    });
});

copyBtn.addEventListener('click', async () => {
    try {
        await navigator.clipboard.writeText(outputText.value);
        showSuccess();
    } catch (err) {
        console.error('Failed to copy text:', err);
    }
});

clearBtn.addEventListener('click', () => {
    inputText.value = '';
    outputText.value = '';
    successMessage.classList.remove('show');
});

// Auto-convert on input
inputText.addEventListener('input', () => {
    const activeCase = document.querySelector('[data-case].active');
    if (activeCase) {
        const caseType = activeCase.dataset.case;
        const converter = caseConverters[caseType];
        if (converter) {
            outputText.value = converter(inputText.value);
        }
    }
});

// Success message
function showSuccess() {
    successMessage.classList.add('show');
    setTimeout(() => {
        successMessage.classList.remove('show');
    }, 2000);
}

// Add active state to buttons
caseButtons.forEach(button => {
    button.addEventListener('click', () => {
        caseButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
    });
});
