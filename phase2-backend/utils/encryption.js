import crypto from 'crypto'

const secretKey = process.env.SECRET_KEY.padEnd(32, '0'); // Pad the key to 32 bytes

if (!secretKey) {
    throw new Error('SECRET_KEY environment variable is not set');
}


export function hmacSha256(secretKey, data) {
    return '0x' + crypto.createHmac('sha256', secretKey).update(data).digest('hex');
}


// AES Encryption Function
export function encrypt(text, secretKey) {
    const algorithm = 'aes-256-cbc';  // AES algorithm with CBC mode
    const iv = crypto.randomBytes(16);  // Initialization vector (16 bytes)
    const cipher = crypto.createCipheriv(algorithm, Buffer.from(secretKey), iv);  // Create cipher with secret key and IV
    let encrypted = cipher.update(text, 'utf8', 'hex');  // Encrypt the text
    encrypted += cipher.final('hex');  // Finalize encryption
    return { iv: iv.toString('hex'), encryptedData: encrypted };  // Return IV and encrypted data
}

export function decrypt(encryptedData, iv, secretKey) {
    const algorithm = 'aes-256-cbc'; // AES algorithm with CBC mode
    const decipher = crypto.createDecipheriv(algorithm, Buffer.from(secretKey), Buffer.from(iv, 'hex')); // Create decipher
    let decrypted = decipher.update(encryptedData, 'hex', 'utf8'); // Decrypt the text
    decrypted += decipher.final('utf8'); // Finalize decryption
    return decrypted; // Return the original text
}

