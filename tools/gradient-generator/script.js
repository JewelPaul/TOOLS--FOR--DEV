document.addEventListener('DOMContentLoaded', () => {
    const gradientPreview = document.getElementById('gradientPreview');
    const angleSlider = document.getElementById('angleSlider');
    const angleValue = document.getElementById('angleValue');
    const colorStops = document.getElementById('colorStops');
    const addStopBtn = document.getElementById('addStopBtn');
    const cssOutput = document.getElementById('cssOutput');
    const copyBtn = document.getElementById('copyBtn');
    const downloadBtn = document.getElementById('downloadBtn');
    const savePresetBtn = document.getElementById('savePresetBtn');
    const successMessage = document.getElementById('success-message');
    const successText = document.getElementById('successText');
    const typeButtons = document.querySelectorAll('[data-type]');
    const previewSizeButtons = document.querySelectorAll('.preview-size-btn');
    const presetButtons = document.querySelectorAll('.preset-btn');

    let currentType = 'linear';
    let currentAngle = 90;

    // Handle gradient type changes
    typeButtons.forEach(button => {
        button.addEventListener('click', () => {
            typeButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            currentType = button.dataset.type;
            updateGradient();
            
            // Show/hide angle control based on type
            const angleControl = document.getElementById('angleControl');
            angleControl.style.display = currentType === 'linear' ? 'flex' : 'none';
        });
    });

    // Handle preview size changes
    previewSizeButtons.forEach(button => {
        button.addEventListener('click', () => {
            previewSizeButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            if (button.dataset.size === 'large') {
                gradientPreview.style.aspectRatio = '21/9';
            } else {
                gradientPreview.style.aspectRatio = '16/9';
            }
        });
    });

    // Handle angle changes
    angleSlider.addEventListener('input', (e) => {
        currentAngle = e.target.value;
        angleValue.textContent = currentAngle;
        updateGradient();
    });

    // Add new color stop
    addStopBtn.addEventListener('click', () => {
        const stop = document.createElement('div');
        stop.className = 'color-stop';
        stop.innerHTML = `
            <input type="color" value="#4361EE">
            <input type="number" value="50" min="0" max="100">%
            <button class="remove-stop"><i class="fas fa-times"></i></button>
        `;
        colorStops.appendChild(stop);
        
        // Add event listeners to new inputs
        const inputs = stop.querySelectorAll('input');
        inputs.forEach(input => {
            input.addEventListener('input', updateGradient);
        });

        stop.querySelector('.remove-stop').addEventListener('click', () => {
            stop.remove();
            updateGradient();
        });

        updateGradient();
    });

    // Copy CSS
    copyBtn.addEventListener('click', async () => {
        try {
            await navigator.clipboard.writeText(cssOutput.textContent);
            showSuccess('CSS code copied to clipboard!');
        } catch (err) {
            showSuccess('Failed to copy CSS code', false);
        }
    });

    // Download gradient image
    downloadBtn.addEventListener('click', () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = 1920;
        canvas.height = 1080;

        // Create gradient
        let gradient;
        if (currentType === 'linear') {
            gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
        } else if (currentType === 'radial') {
            gradient = ctx.createRadialGradient(
                canvas.width/2, canvas.height/2, 0,
                canvas.width/2, canvas.height/2, canvas.width/2
            );
        } else {
            gradient = ctx.createConicGradient(
                0, canvas.width/2, canvas.height/2
            );
        }

        // Add color stops
        const stops = getColorStops();
        stops.forEach(stop => {
            gradient.addColorStop(stop.position/100, stop.color);
        });

        // Fill canvas
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Download
        const link = document.createElement('a');
        link.download = 'gradient.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
        
        showSuccess('Gradient image downloaded!');
    });

    // Save preset
    savePresetBtn.addEventListener('click', () => {
        const presets = document.getElementById('gradientPresets');
        const preset = document.createElement('button');
        preset.className = 'preset-btn';
        preset.style.background = gradientPreview.style.background;
        presets.appendChild(preset);
        
        preset.addEventListener('click', () => {
            gradientPreview.style.background = preset.style.background;
            cssOutput.textContent = `background: ${preset.style.background};`;
        });

        showSuccess('Gradient preset saved!');
    });

    // Handle preset clicks
    presetButtons.forEach(preset => {
        preset.addEventListener('click', () => {
            gradientPreview.style.background = preset.style.background;
            cssOutput.textContent = `background: ${preset.style.background};`;
        });
    });

    // Update gradient
    function updateGradient() {
        const stops = getColorStops();
        let gradientString = '';

        if (currentType === 'linear') {
            gradientString = `linear-gradient(${currentAngle}deg`;
        } else if (currentType === 'radial') {
            gradientString = 'radial-gradient(circle';
        } else {
            gradientString = 'conic-gradient(from 0deg';
        }

        stops.forEach(stop => {
            gradientString += `, ${stop.color} ${stop.position}%`;
        });
        gradientString += ')';

        gradientPreview.style.background = gradientString;
        cssOutput.textContent = `background: ${gradientString};`;
    }

    // Get color stops
    function getColorStops() {
        const stops = [];
        const stopElements = colorStops.querySelectorAll('.color-stop');
        
        stopElements.forEach(stop => {
            const color = stop.querySelector('input[type="color"]').value;
            const position = parseInt(stop.querySelector('input[type="number"]').value);
            stops.push({ color, position });
        });

        return stops.sort((a, b) => a.position - b.position);
    }

    // Show success message
    function showSuccess(message, success = true) {
        successText.textContent = message;
        successMessage.style.background = success ? '#10B981' : '#EF4444';
        successMessage.classList.add('show');
        
        setTimeout(() => {
            successMessage.classList.remove('show');
        }, 3000);
    }

    // Initialize event listeners for existing color stops
    document.querySelectorAll('.color-stop').forEach(stop => {
        const inputs = stop.querySelectorAll('input');
        inputs.forEach(input => {
            input.addEventListener('input', updateGradient);
        });

        stop.querySelector('.remove-stop').addEventListener('click', () => {
            stop.remove();
            updateGradient();
        });
    });

    // Initial gradient update
    updateGradient();
});
