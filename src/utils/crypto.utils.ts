import * as crypto from 'crypto';

/**
 * La méthode calcule un hash sur les données transmises
 * On utilise l'algo SHA256
 *
 * @param valueToHash Données utilisées pour calculer le hash
 * @return Hash calculé (au format hexa)
 */
exports.hash = function(valueToHash) : string {
    const dataBuffer = Buffer.from(valueToHash, 'utf-8');
    const hash = crypto.createHash('sha256');
    hash.update(dataBuffer);

    return hash.digest('hex');
}

/**
 * La méthode chiffre le contenu donné
 *
 * @param encryptedData Donnée chiffrée
 * @param key Clef
 * @return Donnée chiffrée puis encodée au format base64
 */
exports.encrypt = function (data: string, key: string): string {
    // L'algo AES demande que la clef respecte une taille min
    const adjustedKey = adjustKeyLength(key);

    const dataBuffer = Buffer.from(data, 'utf-8');
    const cipher = crypto.createCipheriv('aes-256-ecb', adjustedKey, null);

    // Chiffrer les données
    let encryptedBuffer = Buffer.concat([cipher.update(dataBuffer), cipher.final()]);
    return encryptedBuffer.toString('base64');
}



/**
 * La méthode déchiffre le contenu donné
 * Celui ci doit être encodé en Base64.
 * Si la clef n'est pas correct, la méthode retourne null
 *
 * @param encryptedData Donnée chiffrée au format base64
 * @param key Clef
 */
exports.decrypt = function(encryptedData: string, key: string) : string | null{
    // L'algo AES demande que la clef respecte une taille min
    let adjustedKey = adjustKeyLength(key);

    const encryptedBuffer = Buffer.from(encryptedData, 'base64');
    let decipher = crypto.createDecipheriv('aes-256-ecb', adjustedKey, null);

    try{
        let decryptedBuffer = Buffer.concat([decipher.update(encryptedBuffer), decipher.final()]);
        return decryptedBuffer.toString('utf-8');
    }catch (err){
        return null;
    }
}


/**
 * Méthode utilisée pour agrandir la taille de la clef
 * On ajoutera des 0 au buffer
 * @param key
 */
function adjustKeyLength(key: string): Buffer {
    const keyBuffer = Buffer.alloc(32); // Créer un buffer de 32 octets
    keyBuffer.write(key, 0, Math.min(key.length, 32), 'utf-8'); // Remplir ou tronquer la clé
    return keyBuffer;
}