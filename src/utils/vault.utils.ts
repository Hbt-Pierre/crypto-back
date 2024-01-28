import {OpenVault} from "../models/open-vault.model";
import {SensitiveData} from "../models/sensitive-data.model";
import {VaultError} from "../models/vault-error.model";

const storageUtils = require('./storage.utils')
const cryptoUtils = require('./crypto.utils')


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


