// Function to convert text to binary
function textToBinary(text) {
    let binary = '';
    for (let i = 0; i < text.length; i++) {
        const binChar = text[i].charCodeAt(0).toString(2);
        binary += '0'.repeat(8 - binChar.length) + binChar; // Ensure each character is 8 bits long
    }
    return binary;
}

// Function to hide password in image using steganography
function hidePasswordInImage(password, imageSrc) {
    // Convert password to binary
    const binaryPassword = textToBinary(password);

    // Load image
    const img = new Image();
    img.onload = function() {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);

        // Embed binary password data into image
        for (let i = 0; i < binaryPassword.length; i++) {
            const bit = parseInt(binaryPassword[i]);
            const pixel = ctx.getImageData(i % img.width, Math.floor(i / img.width), 1, 1);
            const data = pixel.data;
            data[0] = (data[0] & 0xFE) | bit; // Modify least significant bit of red channel
            ctx.putImageData(pixel, i % img.width, Math.floor(i / img.width));
        }

        // Get the image data URL with hidden password
        const hiddenPasswordImageSrc = canvas.toDataURL();
        console.log('Image with hidden password:', hiddenPasswordImageSrc);
    };
    img.src = imageSrc;
}

// Example usage
const password = 'MySecretPassword';
const imageSrc = 'path/to/your/image.jpg';
hidePasswordInImage(password, imageSrc);
