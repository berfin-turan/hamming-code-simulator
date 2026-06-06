const canvas = document.getElementById('simulatorCanvas');
const ctx = canvas.getContext('2d');
const generateBtn = document.getElementById('generateBtn');
const dataInput = document.getElementById('dataInput');
const modeSelect = document.getElementById('modeSelect');
const syndromeDisplay = document.getElementById('syndromeDisplay');
const correctedDataDisplay = document.getElementById('correctedDataDisplay');
const systemLog = document.getElementById('systemLog');

let currentBits = [];
const boxWidth = 40;
const boxHeight = 40;
const gap = 10;

modeSelect.addEventListener('change', () => {
    const mode = parseInt(modeSelect.value);
    dataInput.maxLength = mode;
    dataInput.value = "10101010101010101010101010101010".substring(0, mode);
});

// Fare imlecini (cursor) tıklanabilir alanlarda el işaretine çevir
canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    
    // Tuval küçüldüğünde fare koordinatlarını oranlamak için eklendi
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    const mouseX = (e.clientX - rect.left) * scaleX;
    const mouseY = (e.clientY - rect.top) * scaleY;
    
    let hovering = false;

    for (let i = 0; i < currentBits.length; i++) {
        if (mouseX >= currentBits[i].x && mouseX <= currentBits[i].x + boxWidth &&
            mouseY >= currentBits[i].y && mouseY <= currentBits[i].y + boxHeight) {
            hovering = true;
            break;
        }
    }
    canvas.style.cursor = hovering ? 'pointer' : 'default';
});

generateBtn.addEventListener('click', () => {
    let data = dataInput.value;
    const mode = parseInt(modeSelect.value);

    if (data.length < mode) data = data.padStart(mode, '0');
    dataInput.value = data;

    if (!/^[01]+$/.test(data)) {
        alert("Sadece 0 ve 1 kullanın!"); return;
    }

    calculateDynamicHamming(data);
});

// Kutulara tıklandığında hatayı simüle et
canvas.addEventListener('mousedown', (e) => {
    const rect = canvas.getBoundingClientRect();
    
    // Tuval küçüldüğünde fare koordinatlarını oranlamak için eklendi
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const mouseX = (e.clientX - rect.left) * scaleX;
    const mouseY = (e.clientY - rect.top) * scaleY;

    for (let i = 0; i < currentBits.length; i++) {
        if (mouseX >= currentBits[i].x && mouseX <= currentBits[i].x + boxWidth &&
            mouseY >= currentBits[i].y && mouseY <= currentBits[i].y + boxHeight) {
            
            currentBits[i].value = currentBits[i].value === 0 ? 1 : 0;
            checkDynamicError();
            break;
        }
    }
});

function calculateDynamicHamming(dataStr) {
    const data = dataStr.split('').map(Number);
    let p = 0;

    while (Math.pow(2, p) < data.length + p + 1) p++;

    const totalBits = data.length + p;
    currentBits = new Array(totalBits).fill(null).map(() => ({
        value: 0, isParity: false, isError: false, x: 0, y: 0
    }));

    for (let i = 0; i < p; i++) {
        currentBits[Math.pow(2, i) - 1].isParity = true;
    }

    let dIdx = 0;
    for (let i = 0; i < totalBits; i++) {
        if (!currentBits[i].isParity) {
            currentBits[i].value = data[dIdx++];
        }
    }

    for (let i = 0; i < p; i++) {
        const pos = Math.pow(2, i);
        let parityVal = 0;
        for (let j = 1; j <= totalBits; j++) {
            if ((j & pos) === pos && j !== pos) {
                parityVal ^= currentBits[j - 1].value;
            }
        }
        currentBits[pos - 1].value = parityVal;
    }

    calculateCoordinates();
    checkDynamicError();
}

function calculateCoordinates() {
    const maxPerRow = 16;
    const totalRows = Math.ceil(currentBits.length / maxPerRow);

    canvas.height = 30 + (totalRows * (boxHeight + 45)) + 30;

    for (let r = 0; r < totalRows; r++) {
        const bitsInThisRow = Math.min(maxPerRow, currentBits.length - r * maxPerRow);
        const rowWidth = (bitsInThisRow * boxWidth) + ((bitsInThisRow - 1) * gap);

        const currentStartX = (canvas.width - rowWidth) / 2;
        const currentY = 30 + r * (boxHeight + 45);

        for (let c = 0; c < bitsInThisRow; c++) {
            const i = r * maxPerRow + c;
            currentBits[i].x = currentStartX + c * (boxWidth + gap);
            currentBits[i].y = currentY;
        }
    }
}

function checkDynamicError() {
    let p = 0;
    while (Math.pow(2, p) <= currentBits.length) p++;

    let syndrome = 0;
    let logStr = "--- SİSTEM KONTROLÜ BAŞLADI ---\n";

    for (let i = 0; i < p; i++) {
        const pos = Math.pow(2, i);
        let parityVal = 0;
        for (let j = 1; j <= currentBits.length; j++) {
            if ((j & pos) === pos) {
                parityVal ^= currentBits[j - 1].value;
            }
        }

        const bitAdi = `P${pos} (${pos}. sıradaki Kontrol Biti)`;

        if (parityVal !== 0) {
            syndrome += pos;
            logStr += `[!] HATA: ${bitAdi} kendi bölgesinde uyuşmazlık buldu! (+${pos})\n`;
        } else {
            logStr += `[✓] TEMİZ: ${bitAdi} bölgesi hatasız.\n`;
        }
    }

    currentBits.forEach(b => b.isError = false);

    // Durum yazıları da kutu renkleriyle eşleşti
    if (syndrome === 0) {
        syndromeDisplay.innerHTML = "Sendrom: 0 (Hata Yok)";
        syndromeDisplay.style.color = "#a3b18a";
        correctedDataDisplay.innerHTML = "Durum: Veri tamamen sağlam.";
        logStr += "=> SONUÇ: Hata Yok.";
    } else if (syndrome > currentBits.length) {
        syndromeDisplay.innerHTML = `Sendrom: ${syndrome} (ÇOKLU HATA!)`;
        syndromeDisplay.style.color = "#e07a5f";
        correctedDataDisplay.innerHTML = "Sistem çöktü! Algoritma 1'den fazla hatayı çözemez.";
        logStr += `=> SONUÇ: ${syndrome}. bit diye bir şey yok. Çoklu hata var!`;
    } else {
        syndromeDisplay.innerHTML = `Sendrom: ${syndrome} (HATA: ${syndrome}. Bit!)`;
        syndromeDisplay.style.color = "#e07a5f";
        currentBits[syndrome - 1].isError = true;
        correctedDataDisplay.innerHTML = `Çözüm: ${syndrome}. kutuya tıklayıp ters çevir.`;
        logStr += `=> SONUÇ: Tüm hatalar ${syndrome}. biti işaret ediyor.`;
    }

    systemLog.value = logStr;
    systemLog.scrollTop = systemLog.scrollHeight;
    drawBits();
}

function drawBits() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < currentBits.length; i++) {
        const bit = currentBits[i];

        // Kutucuk Renkleri (CSS ile tam uyumlu)
        if (bit.isError) ctx.fillStyle = "#e07a5f";
        else if (bit.isParity) ctx.fillStyle = "#588157";
        else ctx.fillStyle = "#a3b18a";

        ctx.fillRect(bit.x, bit.y, boxWidth, boxHeight);

        // Kutuların etrafındaki ince kenarlık
        ctx.strokeStyle = "#30363d";
        ctx.lineWidth = 2;
        ctx.strokeRect(bit.x, bit.y, boxWidth, boxHeight);

        // İçindeki değer (0 veya 1)
        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 20px sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(bit.value, bit.x + boxWidth / 2, bit.y + boxHeight / 2);

        // Altındaki İndeks Numarası
        ctx.font = "12px sans-serif";
        ctx.fillStyle = "#8b949e";
        ctx.fillText(i + 1, bit.x + boxWidth / 2, bit.y + boxHeight + 15);
    }
}

calculateDynamicHamming(dataInput.value);