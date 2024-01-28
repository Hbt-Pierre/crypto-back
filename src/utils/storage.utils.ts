import {Vault} from "../models/vault.model";
import {VaultError} from "../models/vault-error.model";

const fs = require("fs");
const config = require("../config");

/**
 * La méthode vérifie la présence du fichier coffre fort
 * Si celui-ci n'est pas présent, il sera créer
 */
exports.checkFileStorage = function(){

    if (!fs.existsSync(config.FILE_PATH)) {
        let emptyVault = [] as Vault[];
        this.ereaseAndWriteStorage(emptyVault)
    }
}

/**
 * La méthode ecrit le fichier de stockage
 * Si celui-ci existe déjà, il sera écrasé
 */
exports.ereaseAndWriteStorage = function(vaults : Vault[]){
    if (fs.existsSync(config.FILE_PATH)) {
        fs.rmSync(config.FILE_PATH);
    }
    fs.writeFileSync(config.FILE_PATH, JSON.stringify(vaults, null, 2));
}

/**
 * La méthode récupère l'ensemble des coffres depuis le fichier de stockage
 * @return En cas d'erreur, la valeur null est retournée
 */
exports.getVaults = function() : Vault[] | null {

    if (!fs.existsSync(config.FILE_PATH)) {
        return null;
    }

    let vaultsContent = fs.readFileSync(config.FILE_PATH);
    let vaults = JSON.parse(vaultsContent) as Vault[];

    return vaults;
}


/**
 * La méthode met à jour un coffre dans le fichier de stockage
 * @param vault Coffre à mettre à jour
 */
exports.updateVault = function(vault: Vault){
    let vaults = this.getVaults();
    if(vaults == null) throw VaultError.FS_VAULT_READING_FAILED;

    vaults = vaults.filter(v => v.id != vault.id);
    vaults.push(vault);

    this.ereaseAndWriteStorage(vaults);
    return true;
}