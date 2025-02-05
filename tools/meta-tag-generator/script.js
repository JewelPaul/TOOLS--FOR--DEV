document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('metaForm');
    const titleInput = document.getElementById('pageTitle');
    const descriptionInput = document.getElementById('pageDescription');
    const titleCount = document.getElementById('titleCount');
    const descriptionCount = document.getElementById('descriptionCount');
    const resultSection = document.querySelector('.result-section');
    const metaResult = document.getElementById('metaResult');
    const copyBtn = document.getElementById('copyBtn');

    // Character count updates
    function updateCharCount(input, counter, max) {
        const count = input.value.length;
        counter.textContent = `${count}/${max}`;
        if (count > max) {
            counter.style.color = '#ef4444';
        } else {
            counter.style.color = '';
        }
    }

    titleInput.addEventListener('input', () => updateCharCount(titleInput, titleCount, 60));
    descriptionInput.addEventListener('input', () => updateCharCount(descriptionInput, descriptionCount, 160));

    // Generate meta tags
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const title = titleInput.value.trim();
        const description = descriptionInput.value.trim();
        const keywords = document.getElementById('keywords').value.trim();
        const author = document.getElementById('author').value.trim();
        const robots = document.getElementById('robots').value;
        const viewport = document.getElementById('viewport').value;
        const includeOG = document.getElementById('ogTags').checked;
        const includeTwitter = document.getElementById('twitterTags').checked;

        let metaTags = `<!-- Essential Meta Tags -->
<meta charset="UTF-8">
<meta name="viewport" content="${viewport}">
<title>${escapeHtml(title)}</title>
<meta name="description" content="${escapeHtml(description)}">
`;

        if (keywords) {
            metaTags += `<meta name="keywords" content="${escapeHtml(keywords)}">\n`;
        }

        if (author) {
            metaTags += `<meta name="author" content="${escapeHtml(author)}">\n`;
        }

        metaTags += `<meta name="robots" content="${robots}">\n`;

        if (includeOG) {
            metaTags += `
<!-- Open Graph Meta Tags (Facebook) -->
<meta property="og:title" content="${escapeHtml(title)}">
<meta property="og:description" content="${escapeHtml(description)}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${escapeHtml(title.split(' - ')[0])}">
`;
        }

        if (includeTwitter) {
            metaTags += `
<!-- Twitter Card Meta Tags -->
<meta name="twitter:card" content="summary">
<meta name="twitter:title" content="${escapeHtml(title)}">
<meta name="twitter:description" content="${escapeHtml(description)}">
`;
        }

        metaResult.textContent = metaTags;
        resultSection.style.display = 'block';
        
        // Scroll to results
        resultSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    // Copy to clipboard functionality
    copyBtn.addEventListener('click', async () => {
        try {
            await navigator.clipboard.writeText(metaResult.textContent);
            const originalText = copyBtn.innerHTML;
            copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
            setTimeout(() => {
                copyBtn.innerHTML = originalText;
            }, 2000);
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    });

    // Helper function to escape HTML special characters
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
});
