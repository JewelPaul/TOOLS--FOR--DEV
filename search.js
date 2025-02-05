// Tool data - you can expand this with more tools
const tools = [
    {
        name: 'QR Code Generator',
        description: 'Create QR codes for URLs, text, and more',
        icon: 'fa-solid fa-qrcode',
        url: '/tools/qr-generator'
    },
    {
        name: 'Image Compressor',
        description: 'Compress images without losing quality',
        icon: 'fa-solid fa-image',
        url: '/tools/image-compressor'
    },
    {
        name: 'Code Formatter',
        description: 'Format and beautify your code',
        icon: 'fa-solid fa-code',
        url: '/tools/code-formatter'
    }
];

document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('hero-search');
    const searchResults = document.getElementById('search-results');
    let searchTimeout;

    function showSearchResults(results) {
        searchResults.innerHTML = '';
        
        if (results.length === 0) {
            searchResults.style.display = 'none';
            return;
        }

        results.forEach(tool => {
            const resultItem = document.createElement('a');
            resultItem.href = tool.url;
            resultItem.className = 'search-result-item';
            resultItem.innerHTML = `
                <div class="result-icon">
                    <i class="${tool.icon}"></i>
                </div>
                <div class="result-content">
                    <div class="result-title">${tool.name}</div>
                    <div class="result-description">${tool.description}</div>
                </div>
            `;
            searchResults.appendChild(resultItem);
        });

        searchResults.style.display = 'block';
    }

    function searchTools(query) {
        query = query.toLowerCase();
        return tools.filter(tool => 
            tool.name.toLowerCase().includes(query) ||
            tool.description.toLowerCase().includes(query)
        );
    }

    // Search input handler with debounce
    searchInput.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        const query = e.target.value.trim();
        
        searchTimeout = setTimeout(() => {
            if (query.length > 0) {
                const results = searchTools(query);
                showSearchResults(results);
            } else {
                searchResults.style.display = 'none';
            }
        }, 150); // Small delay for better performance
    });

    // Close search results when clicking outside
    document.addEventListener('click', (e) => {
        if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
            searchResults.style.display = 'none';
        }
    });

    // Focus input when pressing '/'
    document.addEventListener('keydown', (e) => {
        if (e.key === '/' && document.activeElement !== searchInput) {
            e.preventDefault();
            searchInput.focus();
        }
    });

    // Close results on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            searchResults.style.display = 'none';
            searchInput.blur();
        }
    });
});
