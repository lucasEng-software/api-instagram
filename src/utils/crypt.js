const crypto = require ('crypto');

const algorithm = 'aes-256-ctr';
const secretKey = process.env.SECRET_CRYPTO;
const iv = crypto.randomBytes(16);

// Encriptação, criação da cifra
const encrypt = (text) =>{
    const cipher = crypto.createCipheriv(
        algorithm,
        secretKey,
        iv
    );
    const encrypted = Buffer.concat([cipher.update(text.toString()), cipher.final()]);

    return {
        iv:iv.toString('hex'),
        content: encrypted.toString('hex'),
    };
}; 

// Desencriptação 
const decrypt = (hash) =>{
    const [newIv, text]  = hash.split(':');
    console.log(hash);
    const decipher = crypto.createDecipheriv(
        algorithm,
        secretKey,
        Buffer.from(newIv, 'hex'),
    );

    const decrypted = Buffer.concat(
        [decipher.update(Buffer.from(text,'hex')), decipher.final()],
    );
    
    return decrypted.toString();
};

module.exports = {
    encrypt, 
    decrypt,
};