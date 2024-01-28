import {OpenVault} from "../models/open-vault.model";
import {SensitiveData} from "../models/sensitive-data.model";
import {VaultError} from "../models/vault-error.model";
import {Vault} from "../models/vault.model";

const storageUtils = require('./storage.utils')
const cryptoUtils = require('./crypto.utils')


/**
 * La méthode décriffre le coffre donné à l'aide du mot de passe
 *
 * @param vaultId
 * @param vaultPassword
 */
exports.openVault = function (vaultId: string, vaultPassword: string): OpenVault {
    let vaults = storageUtils.getVaults();
    if(vaults == null) throw VaultError.OPEN_VAULT_READING_FAILED;

    let myVault = vaults.find(v => v.id == vaultId);
    if (myVault == null) throw VaultError.OPEN_VAULT_NOT_FOUND;

    const decryptedContent = cryptoUtils.decrypt(myVault.content,vaultPassword);
    if(decryptedContent == null) throw VaultError.OPEN_VAULT_BAD_PASSWORD;

    if(cryptoUtils.hash(decryptedContent) != myVault.verification) throw VaultError.OPEN_VAULT_INTEGRITY_FAILED;

    let decryptedVault = {...myVault};
    decryptedVault.content = JSON.parse(decryptedContent) as SensitiveData[];

    return decryptedVault as OpenVault;
}


/**
 * La méthode chiffre un coffre et recalcule le hash d'intégrité
 * @param openVault
 * @param vaultPassword
 */
exports.lockVault = function (openVault: OpenVault,vaultPassword: string): Vault {
    let jsonContent = JSON.stringify(openVault.content);

    let lockVault = {
        id : openVault.id,
        name : openVault.name,
        content : cryptoUtils.encrypt(jsonContent,vaultPassword),
        verification: cryptoUtils.hash(jsonContent)
    } as Vault;

    return lockVault;
}

