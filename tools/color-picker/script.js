document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const colorPreview = document.querySelector('.selected-color');
    const hexValue = document.querySelector('.hex-value');
    const rgbValue = document.querySelector('.rgb-value');
    const hslValue = document.querySelector('.hsl-value');
    const colorPicker = document.getElementById('colorPicker');
    const colorValue = document.getElementById('colorValue');
    const redSlider = document.getElementById('redSlider');
    const greenSlider = document.getElementById('greenSlider');
    const blueSlider = document.getElementById('blueSlider');
    const alphaSlider = document.getElementById('alphaSlider');
    const redValue = document.getElementById('redValue');
    const greenValue = document.getElementById('greenValue');
    const blueValue = document.getElementById('blueValue');
    const alphaValue = document.getElementById('alphaValue');
    const formatButtons = document.querySelectorAll('[data-format]');
    const copyBtn = document.getElementById('copyBtn');
    const whiteContrast = document.getElementById('whiteContrast');
    const blackContrast = document.getElementById('blackContrast');
    const colorName = document.getElementById('colorName');
    const colorVariations = document.getElementById('colorVariations');
    const themeToggle = document.getElementById('theme-toggle');

    let currentFormat = 'hex';
    let currentColor = {
        r: 67,
        g: 97,
        b: 238,
        a: 100
    };

    // Theme Toggle
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        themeToggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });

    // Load saved theme
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }

    // Color conversion functions
    function rgbToHex(r, g, b) {
        return '#' + [r, g, b].map(x => {
            const hex = x.toString(16);
            return hex.length === 1 ? '0' + hex : hex;
        }).join('').toUpperCase();
    }

    function hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }

    function rgbToHsl(r, g, b) {
        r /= 255;
        g /= 255;
        b /= 255;

        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        let h, s, l = (max + min) / 2;

        if (max === min) {
            h = s = 0;
        } else {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

            switch (max) {
                case r:
                    h = (g - b) / d + (g < b ? 6 : 0);
                    break;
                case g:
                    h = (b - r) / d + 2;
                    break;
                case b:
                    h = (r - g) / d + 4;
                    break;
            }

            h /= 6;
        }

        return {
            h: Math.round(h * 360),
            s: Math.round(s * 100),
            l: Math.round(l * 100)
        };
    }

    function calculateContrast(r, g, b) {
        const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
        const whiteContrast = ((1 + 0.05) / (luminance + 0.05)).toFixed(2);
        const blackContrast = ((luminance + 0.05) / (0.05)).toFixed(2);
        return { whiteContrast, blackContrast };
    }

    function getColorName(r, g, b) {
        const hsl = rgbToHsl(r, g, b);
        const h = hsl.h;
        const s = hsl.s;
        const l = hsl.l;

        if (s < 10) {
            if (l < 20) return 'Black';
            if (l > 80) return 'White';
            return 'Gray';
        }

        const hueNames = [
            { name: 'Red', hue: 0 },
            { name: 'Orange', hue: 30 },
            { name: 'Yellow', hue: 60 },
            { name: 'Green', hue: 120 },
            { name: 'Cyan', hue: 180 },
            { name: 'Blue', hue: 240 },
            { name: 'Purple', hue: 300 },
            { name: 'Red', hue: 360 }
        ];

        for (let i = 0; i < hueNames.length - 1; i++) {
            if (h >= hueNames[i].hue && h < hueNames[i + 1].hue) {
                let name = hueNames[i].name;
                if (l < 40) name = 'Dark ' + name;
                if (l > 70) name = 'Light ' + name;
                return name;
            }
        }

        return 'Unknown';
    }

    function generateColorVariations() {
        colorVariations.innerHTML = '';
        const hsl = rgbToHsl(currentColor.r, currentColor.g, currentColor.b);
        
        // Generate 9 variations
        for (let i = 0; i < 9; i++) {
            const lightness = Math.round((i / 8) * 100);
            const variation = document.createElement('div');
            variation.className = 'variation';
            variation.style.backgroundColor = `hsl(${hsl.h}, ${hsl.s}%, ${lightness}%)`;
            variation.title = `${getColorName(currentColor.r, currentColor.g, currentColor.b)} ${Math.round((i + 1) * 11.11)}%`;
            
            variation.addEventListener('click', () => {
                const rgb = hexToRgb(rgbToHex(currentColor.r, currentColor.g, currentColor.b));
                if (rgb) {
                    currentColor = { ...rgb, a: currentColor.a };
                    updateColorPreview();
                    updateSliders();
                }
            });
            
            colorVariations.appendChild(variation);
        }
    }

    function updateColorPreview() {
        const hex = rgbToHex(currentColor.r, currentColor.g, currentColor.b);
        const hsl = rgbToHsl(currentColor.r, currentColor.g, currentColor.b);
        const contrast = calculateContrast(currentColor.r, currentColor.g, currentColor.b);

        // Update color preview
        colorPreview.style.backgroundColor = `rgba(${currentColor.r}, ${currentColor.g}, ${currentColor.b}, ${currentColor.a / 100})`;
        
        // Update color values
        hexValue.textContent = hex;
        rgbValue.textContent = `RGB(${currentColor.r}, ${currentColor.g}, ${currentColor.b})`;
        hslValue.textContent = `HSL(${hsl.h}°, ${hsl.s}%, ${hsl.l}%)`;
        
        // Update color picker and input
        colorPicker.value = hex;
        colorValue.value = hex;
        
        // Update contrast ratios
        whiteContrast.textContent = contrast.whiteContrast + ':1';
        blackContrast.textContent = contrast.blackContrast + ':1';
        
        // Update color name
        colorName.textContent = getColorName(currentColor.r, currentColor.g, currentColor.b);
        
        // Generate variations
        generateColorVariations();
    }

    function updateSliders() {
        redSlider.value = currentColor.r;
        greenSlider.value = currentColor.g;
        blueSlider.value = currentColor.b;
        alphaSlider.value = currentColor.a;
        
        redValue.value = currentColor.r;
        greenValue.value = currentColor.g;
        blueValue.value = currentColor.b;
        alphaValue.value = currentColor.a;
    }

    // Event Listeners
    colorPicker.addEventListener('input', (e) => {
        const rgb = hexToRgb(e.target.value);
        if (rgb) {
            currentColor = { ...rgb, a: currentColor.a };
            updateColorPreview();
            updateSliders();
        }
    });

    colorValue.addEventListener('input', (e) => {
        const hex = e.target.value.trim();
        if (/^#[0-9A-Fa-f]{6}$/.test(hex)) {
            const rgb = hexToRgb(hex);
            if (rgb) {
                currentColor = { ...rgb, a: currentColor.a };
                updateColorPreview();
                updateSliders();
            }
        }
    });

    // RGB Sliders
    [redSlider, greenSlider, blueSlider].forEach(slider => {
        slider.addEventListener('input', (e) => {
            const value = parseInt(e.target.value);
            const color = e.target.id.replace('Slider', '').toLowerCase();
            currentColor[color.charAt(0)] = value;
            document.getElementById(color + 'Value').value = value;
            updateColorPreview();
        });
    });

    // RGB Number Inputs
    [redValue, greenValue, blueValue].forEach(input => {
        input.addEventListener('input', (e) => {
            let value = parseInt(e.target.value);
            if (isNaN(value)) value = 0;
            if (value < 0) value = 0;
            if (value > 255) value = 255;
            
            const color = e.target.id.replace('Value', '').toLowerCase();
            currentColor[color.charAt(0)] = value;
            document.getElementById(color + 'Slider').value = value;
            updateColorPreview();
        });
    });

    // Alpha controls
    alphaSlider.addEventListener('input', (e) => {
        currentColor.a = parseInt(e.target.value);
        alphaValue.value = currentColor.a;
        updateColorPreview();
    });

    alphaValue.addEventListener('input', (e) => {
        let value = parseInt(e.target.value);
        if (isNaN(value)) value = 100;
        if (value < 0) value = 0;
        if (value > 100) value = 100;
        
        currentColor.a = value;
        alphaSlider.value = value;
        updateColorPreview();
    });

    // Format buttons
    formatButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            formatButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFormat = btn.dataset.format;
        });
    });

    // Copy button
    copyBtn.addEventListener('click', async () => {
        let textToCopy;
        switch (currentFormat) {
            case 'hex':
                textToCopy = rgbToHex(currentColor.r, currentColor.g, currentColor.b);
                break;
            case 'rgb':
                textToCopy = `rgb(${currentColor.r}, ${currentColor.g}, ${currentColor.b})`;
                break;
            case 'hsl':
                const hsl = rgbToHsl(currentColor.r, currentColor.g, currentColor.b);
                textToCopy = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
                break;
        }

        try {
            await navigator.clipboard.writeText(textToCopy);
            copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
            setTimeout(() => {
                copyBtn.innerHTML = '<i class="fas fa-copy"></i> Copy Color';
            }, 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    });

    // Initialize
    updateColorPreview();
    updateSliders();
});
