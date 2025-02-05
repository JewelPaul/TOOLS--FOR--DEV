document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const qrPreview = document.getElementById('qrPreview');
    const qrcode = document.getElementById('qrcode');
    const previewOverlay = document.getElementById('previewOverlay');
    const typeButtons = document.querySelectorAll('.type-buttons .btn');
    const contentInputs = document.querySelectorAll('.content-input');
    const uploadBtn = document.getElementById('uploadBtn');
    const logoInput = document.getElementById('logoInput');
    const downloadBtn = document.getElementById('downloadBtn');
    const downloadOptions = document.querySelectorAll('.download-options .btn');
    
    // QR Code instance
    let qr = null;
    
    // Initialize QR Code
    function initQRCode() {
        if (qr) qr.clear();
        
        // Clear existing content
        const qrcode = document.getElementById('qrcode');
        qrcode.innerHTML = '';
        
        // Set initial size
        const size = 300;
        
        // Create new QR code
        qr = new QRCode(qrcode, {
            text: 'Hello World',
            width: size,
            height: size,
            colorDark: '#000000',
            colorLight: '#ffffff',
            correctLevel: QRCode.CorrectLevel.H,
            quietZone: 15,
            quietZoneColor: '#ffffff'
        });
        
        // Add initial styling
        const qrCanvas = qr._oDrawing._elCanvas;
        qrCanvas.style.width = '100%';
        qrCanvas.style.height = 'auto';
        qrCanvas.style.maxWidth = '500px';
        qrCanvas.style.display = 'block';
        qrCanvas.style.margin = '0 auto';
        
        // Force first update
        setTimeout(updateQRCode, 100);
    }
    
    // Update QR Code
    function updateQRCode() {
        const activeType = document.querySelector('.type-buttons .btn.active').dataset.type;
        const input = document.querySelector(`.content-input[data-type="${activeType}"]`);
        let content = '';
        
        switch (activeType) {
            case 'text':
                content = input.querySelector('textarea').value.trim();
                break;
            case 'url':
                content = input.querySelector('input').value.trim();
                break;
            case 'sms':
                const phone = input.querySelector('input[type="tel"]').value.trim();
                const message = input.querySelector('textarea').value.trim();
                content = `smsto:${phone}:${message}`;
                break;
            case 'phone':
                content = `tel:${input.querySelector('input').value.trim()}`;
                break;
            case 'email':
                const email = input.querySelector('input[type="email"]').value.trim();
                const subject = input.querySelector('input[type="text"]').value.trim();
                const emailMessage = input.querySelector('textarea').value.trim();
                content = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailMessage)}`;
                break;
            case 'wifi':
                const ssid = input.querySelector('input[type="text"]').value.trim();
                const password = input.querySelector('input[type="password"]').value;
                const encryption = input.querySelector('select').value;
                const hidden = input.querySelector('input[type="checkbox"]').checked;
                content = `WIFI:T:${encryption};S:${ssid};P:${password};H:${hidden ? 'true' : 'false'};;`;
                break;
            case 'vcard':
                const firstName = input.querySelector('input[placeholder="First Name"]').value.trim();
                const lastName = input.querySelector('input[placeholder="Last Name"]').value.trim();
                const org = input.querySelector('input[placeholder="Organization"]').value.trim();
                const vPhone = input.querySelector('input[placeholder="Phone"]').value.trim();
                const vEmail = input.querySelector('input[placeholder="Email"]').value.trim();
                const website = input.querySelector('input[placeholder="Website"]').value.trim();
                const street = input.querySelector('input[placeholder="Street Address"]').value.trim();
                const city = input.querySelector('input[placeholder="City"]').value.trim();
                const state = input.querySelector('input[placeholder="State"]').value.trim();
                const zip = input.querySelector('input[placeholder="ZIP Code"]').value.trim();
                const country = input.querySelector('input[placeholder="Country"]').value.trim();
                
                content = 'BEGIN:VCARD\n' +
                         'VERSION:3.0\n' +
                         `N:${lastName};${firstName};;;\n` +
                         `FN:${firstName} ${lastName}\n` +
                         (org ? `ORG:${org}\n` : '') +
                         (vPhone ? `TEL:${vPhone}\n` : '') +
                         (vEmail ? `EMAIL:${vEmail}\n` : '') +
                         (website ? `URL:${website}\n` : '') +
                         (street || city || state || zip || country ?
                          `ADR:;;${street};${city};${state};${zip};${country}\n` : '') +
                         'END:VCARD';
                break;
            case 'geo':
                const lat = input.querySelector('input[placeholder="Latitude"]').value.trim();
                const lon = input.querySelector('input[placeholder="Longitude"]').value.trim();
                content = `geo:${lat},${lon}`;
                break;
        }
        
        if (!content) content = 'https://example.com';
        
        // Apply QR code style
        const pattern = document.querySelector('.pattern-btn.active').dataset.pattern;
        const corner = document.querySelector('.corner-btn.active').dataset.corner;
        const scheme = document.querySelector('.scheme-btn.active').dataset.scheme;
        
        // Create canvas for custom styling
        const canvas = document.createElement('canvas');
        const size = parseInt(document.getElementById('qrSize').value);
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');
        
        // Generate QR code data
        qr.clear();
        qr._htOption.width = size;
        qr._htOption.height = size;
        
        // Apply color scheme
        switch (scheme) {
            case 'custom':
                qr._htOption.colorDark = document.getElementById('fgColor').value;
                qr._htOption.colorLight = document.getElementById('bgColor').value;
                break;
            case 'gradient':
                const gradient = ctx.createLinearGradient(0, 0, size, size);
                gradient.addColorStop(0, '#ff416c');
                gradient.addColorStop(1, '#ff4b2b');
                qr._htOption.colorDark = gradient;
                qr._htOption.colorLight = '#ffffff';
                break;
            case 'rainbow':
                const rainbow = ctx.createLinearGradient(0, 0, size, size);
                rainbow.addColorStop(0, '#ff0000');
                rainbow.addColorStop(0.2, '#ff8000');
                rainbow.addColorStop(0.4, '#ffff00');
                rainbow.addColorStop(0.6, '#00ff00');
                rainbow.addColorStop(0.8, '#0000ff');
                rainbow.addColorStop(1, '#8000ff');
                qr._htOption.colorDark = rainbow;
                qr._htOption.colorLight = '#ffffff';
                break;
        }
        
        // Generate QR code
        qr.makeCode(content);
        
        // Apply pattern and corner styles
        const qrCanvas = qr._oDrawing._elCanvas;
        const qrCtx = qrCanvas.getContext('2d');
        const imageData = qrCtx.getImageData(0, 0, size, size);
        const data = imageData.data;
        
        // Clear canvas
        ctx.fillStyle = qr._htOption.colorLight;
        ctx.fillRect(0, 0, size, size);
        
        // Draw styled QR code
        const cellSize = size / qr._oQRCode.moduleCount;
        const offset = cellSize / 2;
        
        for (let row = 0; row < qr._oQRCode.moduleCount; row++) {
            for (let col = 0; col < qr._oQRCode.moduleCount; col++) {
                if (qr._oQRCode.isDark(row, col)) {
                    const x = col * cellSize;
                    const y = row * cellSize;
                    
                    ctx.fillStyle = qr._htOption.colorDark;
                    
                    switch (pattern) {
                        case 'squares':
                            ctx.fillRect(x, y, cellSize, cellSize);
                            break;
                        case 'dots':
                            ctx.beginPath();
                            ctx.arc(x + offset, y + offset, cellSize / 2, 0, Math.PI * 2);
                            ctx.fill();
                            break;
                        case 'rounded':
                            ctx.beginPath();
                            ctx.roundRect(x, y, cellSize, cellSize, cellSize / 3);
                            ctx.fill();
                            break;
                        case 'classy':
                            ctx.save();
                            ctx.translate(x + offset, y + offset);
                            ctx.rotate(Math.PI / 4);
                            ctx.fillRect(-cellSize / 3, -cellSize / 3, cellSize * 2/3, cellSize * 2/3);
                            ctx.restore();
                            break;
                    }
                }
            }
        }
        
        // Apply corner style
        const cornerSize = cellSize * 7;
        const corners = [
            { x: 0, y: 0 },
            { x: size - cornerSize, y: 0 },
            { x: 0, y: size - cornerSize }
        ];
        
        corners.forEach(pos => {
            ctx.fillStyle = qr._htOption.colorDark;
            
            switch (corner) {
                case 'square':
                    ctx.fillRect(pos.x, pos.y, cornerSize, cornerSize);
                    ctx.fillStyle = qr._htOption.colorLight;
                    ctx.fillRect(pos.x + cellSize, pos.y + cellSize, cornerSize - 2 * cellSize, cornerSize - 2 * cellSize);
                    ctx.fillStyle = qr._htOption.colorDark;
                    ctx.fillRect(pos.x + 2 * cellSize, pos.y + 2 * cellSize, cornerSize - 4 * cellSize, cornerSize - 4 * cellSize);
                    break;
                case 'rounded':
                    ctx.beginPath();
                    ctx.roundRect(pos.x, pos.y, cornerSize, cornerSize, cellSize);
                    ctx.fill();
                    ctx.fillStyle = qr._htOption.colorLight;
                    ctx.beginPath();
                    ctx.roundRect(pos.x + cellSize, pos.y + cellSize, cornerSize - 2 * cellSize, cornerSize - 2 * cellSize, cellSize);
                    ctx.fill();
                    ctx.fillStyle = qr._htOption.colorDark;
                    ctx.beginPath();
                    ctx.roundRect(pos.x + 2 * cellSize, pos.y + 2 * cellSize, cornerSize - 4 * cellSize, cornerSize - 4 * cellSize, cellSize);
                    ctx.fill();
                    break;
                case 'extra-rounded':
                    ctx.beginPath();
                    ctx.roundRect(pos.x, pos.y, cornerSize, cornerSize, cornerSize / 2);
                    ctx.fill();
                    ctx.fillStyle = qr._htOption.colorLight;
                    ctx.beginPath();
                    ctx.roundRect(pos.x + cellSize, pos.y + cellSize, cornerSize - 2 * cellSize, cornerSize - 2 * cellSize, (cornerSize - 2 * cellSize) / 2);
                    ctx.fill();
                    ctx.fillStyle = qr._htOption.colorDark;
                    ctx.beginPath();
                    ctx.roundRect(pos.x + 2 * cellSize, pos.y + 2 * cellSize, cornerSize - 4 * cellSize, cornerSize - 4 * cellSize, (cornerSize - 4 * cellSize) / 2);
                    ctx.fill();
                    break;
                case 'pointed':
                    corners.forEach(pos => {
                        ctx.beginPath();
                        ctx.moveTo(pos.x + cornerSize / 2, pos.y);
                        ctx.lineTo(pos.x + cornerSize, pos.y + cornerSize / 2);
                        ctx.lineTo(pos.x + cornerSize / 2, pos.y + cornerSize);
                        ctx.lineTo(pos.x, pos.y + cornerSize / 2);
                        ctx.closePath();
                        ctx.fill();
                        
                        ctx.fillStyle = qr._htOption.colorLight;
                        const inset = cellSize;
                        ctx.beginPath();
                        ctx.moveTo(pos.x + cornerSize / 2, pos.y + inset);
                        ctx.lineTo(pos.x + cornerSize - inset, pos.y + cornerSize / 2);
                        ctx.lineTo(pos.x + cornerSize / 2, pos.y + cornerSize - inset);
                        ctx.lineTo(pos.x + inset, pos.y + cornerSize / 2);
                        ctx.closePath();
                        ctx.fill();
                        
                        ctx.fillStyle = qr._htOption.colorDark;
                        const inset2 = 2 * cellSize;
                        ctx.beginPath();
                        ctx.moveTo(pos.x + cornerSize / 2, pos.y + inset2);
                        ctx.lineTo(pos.x + cornerSize - inset2, pos.y + cornerSize / 2);
                        ctx.lineTo(pos.x + cornerSize / 2, pos.y + cornerSize - inset2);
                        ctx.lineTo(pos.x + inset2, pos.y + cornerSize / 2);
                        ctx.closePath();
                        ctx.fill();
                    });
                    break;
            }
        });
        
        // Update QR code display
        qrCtx.clearRect(0, 0, size, size);
        qrCtx.drawImage(canvas, 0, 0);
    }
    
    // Handle type buttons
    typeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            typeButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            contentInputs.forEach(input => {
                input.classList.remove('active');
                if (input.dataset.type === btn.dataset.type) {
                    input.classList.add('active');
                }
            });
            
            updateQRCode();
        });
    });
    
    // Handle content inputs
    contentInputs.forEach(input => {
        const inputs = input.querySelectorAll('input, textarea, select');
        inputs.forEach(i => {
            i.addEventListener('input', updateQRCode);
        });
    });
    
    // Handle customization
    document.getElementById('fgColor').addEventListener('input', (e) => {
        qr._htOption.colorDark = e.target.value;
        updateQRCode();
    });
    
    document.getElementById('bgColor').addEventListener('input', (e) => {
        qr._htOption.colorLight = e.target.value;
        updateQRCode();
    });
    
    document.getElementById('qrSize').addEventListener('change', (e) => {
        qr._htOption.width = parseInt(e.target.value);
        qr._htOption.height = parseInt(e.target.value);
        updateQRCode();
    });
    
    // Handle logo upload
    uploadBtn.addEventListener('click', () => {
        logoInput.click();
    });
    
    logoInput.addEventListener('change', handleLogoUpload);
    
    function handleLogoUpload(e) {
        const file = e.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.src = e.target.result;
            img.onload = () => {
                const size = parseInt(document.getElementById('logoSize').value) / 100;
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                
                // Calculate logo size
                const logoSize = Math.min(qr._htOption.width, qr._htOption.height) * size;
                const scale = logoSize / Math.max(img.width, img.height);
                const logoWidth = img.width * scale;
                const logoHeight = img.height * scale;
                
                // Position logo in center
                const x = (qr._htOption.width - logoWidth) / 2;
                const y = (qr._htOption.height - logoHeight) / 2;
                
                // Draw QR code
                canvas.width = qr._htOption.width;
                canvas.height = qr._htOption.height;
                ctx.drawImage(qr._oDrawing._elCanvas, 0, 0);
                
                // Draw logo
                ctx.drawImage(img, x, y, logoWidth, logoHeight);
                
                // Update QR code
                qr._oDrawing._elCanvas.getContext('2d').drawImage(canvas, 0, 0);
            };
        };
        reader.readAsDataURL(file);
    }
    
    // Handle drag and drop
    qrPreview.addEventListener('dragenter', (e) => {
        e.preventDefault();
        previewOverlay.classList.add('dragover');
    });
    
    qrPreview.addEventListener('dragover', (e) => {
        e.preventDefault();
    });
    
    qrPreview.addEventListener('dragleave', () => {
        previewOverlay.classList.remove('dragover');
    });
    
    qrPreview.addEventListener('drop', (e) => {
        e.preventDefault();
        previewOverlay.classList.remove('dragover');
        
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            logoInput.files = e.dataTransfer.files;
            handleLogoUpload({ target: logoInput });
        }
    });
    
    // Handle download
    downloadOptions.forEach(btn => {
        btn.addEventListener('click', () => {
            const format = btn.dataset.format;
            const canvas = qr._oDrawing._elCanvas;
            
            switch (format) {
                case 'png':
                    const link = document.createElement('a');
                    link.download = 'qr-code.png';
                    link.href = canvas.toDataURL('image/png');
                    link.click();
                    break;
                case 'svg':
                    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
                    svg.setAttribute('width', canvas.width);
                    svg.setAttribute('height', canvas.height);
                    
                    const image = document.createElementNS('http://www.w3.org/2000/svg', 'image');
                    image.setAttribute('width', canvas.width);
                    image.setAttribute('height', canvas.height);
                    image.setAttribute('href', canvas.toDataURL('image/png'));
                    svg.appendChild(image);
                    
                    const svgData = new XMLSerializer().serializeToString(svg);
                    const svgBlob = new Blob([svgData], { type: 'image/svg+xml' });
                    const svgUrl = URL.createObjectURL(svgBlob);
                    
                    const svgLink = document.createElement('a');
                    svgLink.download = 'qr-code.svg';
                    svgLink.href = svgUrl;
                    svgLink.click();
                    
                    URL.revokeObjectURL(svgUrl);
                    break;
                case 'pdf':
                    const pdf = new jspdf.jsPDF({
                        orientation: 'portrait',
                        unit: 'mm',
                        format: 'a4'
                    });

                    // Calculate dimensions to center the QR code
                    const pdfWidth = pdf.internal.pageSize.getWidth();
                    const pdfHeight = pdf.internal.pageSize.getHeight();
                    const qrSize = parseInt(canvas.width);
                    const scale = Math.min((pdfWidth - 40) / qrSize, (pdfHeight - 60) / qrSize);
                    const scaledWidth = qrSize * scale;
                    const scaledHeight = qrSize * scale;
                    const x = (pdfWidth - scaledWidth) / 2;
                    const y = 30;

                    // Add title
                    pdf.setFontSize(16);
                    pdf.text('QR Code', pdfWidth / 2, 20, { align: 'center' });

                    // Add QR code
                    pdf.addImage(canvas.toDataURL('image/png'), 'PNG', x, y, scaledWidth, scaledHeight);

                    // Add QR content below
                    pdf.setFontSize(12);
                    const content = document.querySelector('.content-input.active').querySelector('input, textarea').value;
                    pdf.text('Content: ' + content, 20, y + scaledHeight + 10);

                    // Add generation date
                    const date = new Date().toLocaleString();
                    pdf.setFontSize(10);
                    pdf.text('Generated on: ' + date, 20, pdfHeight - 20);

                    pdf.save('qr-code.pdf');
                    break;
            }
        });
    });
    
    // Handle geolocation
    document.querySelector('.get-location-btn').addEventListener('click', () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const input = document.querySelector('.content-input[data-type="geo"]');
                    input.querySelector('input[placeholder="Latitude"]').value = position.coords.latitude;
                    input.querySelector('input[placeholder="Longitude"]').value = position.coords.longitude;
                    updateQRCode();
                },
                (error) => {
                    alert('Error getting location: ' + error.message);
                }
            );
        } else {
            alert('Geolocation is not supported by this browser.');
        }
    });
    
    // Handle style buttons
    document.querySelectorAll('.pattern-btn, .corner-btn, .scheme-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const type = btn.classList.contains('pattern-btn') ? 'pattern-btn' :
                        btn.classList.contains('corner-btn') ? 'corner-btn' : 'scheme-btn';
            document.querySelectorAll('.' + type).forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            updateQRCode();
        });
    });
    
    // Initialize
    initQRCode();
});
