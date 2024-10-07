document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            const offset = 70;  // ヘッダーの高さ分オフセット
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        });
    });

    const urlInput = document.getElementById('spreadsheet-url');
    const generateButton = document.getElementById('generate-qr');
    const qrcodeContainer = document.getElementById('qrcode-container');
    const downloadLink = document.getElementById('download-link');

    generateButton.addEventListener('click', function() {
        const url = urlInput.value.trim();
        if (url) {
            if (!url.startsWith('https://docs.google.com/spreadsheets/d/')) {
                alert('有効なGoogle SpreadsheetのURLを入力してください。');
                return;
            }

            qrcodeContainer.innerHTML = '';
            const qrcode = new QRCode(qrcodeContainer, {
                text: url,
                width: 128,
                height: 128
            });

            setTimeout(() => {
                const qrImage = qrcodeContainer.querySelector('img');
                if (qrImage) {
                    downloadLink.href = qrImage.src;
                    downloadLink.download = 'qrcode.png';
                    downloadLink.style.display = 'inline-block';
                }
            }, 100);
        } else {
            alert('URLを入力してください。');
        }
    });
});
