import { Request, Response } from 'express';
import {Vault} from "../models/vault.model";
import {SensitiveData} from "../models/sensitive-data.model";

const storageUtils = require('../utils/storage.utils')
const cryptoUtils = require('../utils/crypto.utils')
const vaultUtils = require('../utils/vault.utils')

/**
 * Fonction de création d'un nouveau coffre
 *
 * @param req - L'objet de requête Express.
 * @param res - L'objet de réponse Express.
 */
exports.create = async function (req: Request, res: Response) {

    //Contrôle des arguments
    const masterKey = req.body["password"]
    const name = req.body["name"]

    if(masterKey == undefined){
        res.status(400).json({error : "Merci d'ajouter le mot de passe maitre"});
        return
    }

    if(name == undefined){
        res.status(400).json({error : "Merci d'ajouter le nom du coffre"});
        return
    }

    //Création du coffre
    let vaults = storageUtils.getVaults();
    if(vaults == null){
        res.status(500).json({error : "Une erreur est survenue lors de la lecture du fichier de stockage :("})
        return;
    }

    if(vaults.find(v => v.name == name) != null){
        res.status(409).json({error : "Un coffre porte déjà ce nom là :("})
        return;
    }

    let sensitiveContent = [] as SensitiveData[];
    let jsonContent = JSON.stringify(sensitiveContent);

    let newVault = {
        id : new Date().getTime(),
        name : name,
        content : cryptoUtils.encrypt(jsonContent,masterKey),
        verification: cryptoUtils.hash(jsonContent)
    } as Vault;

    vaults.push(newVault);

    //Mise à jour
    storageUtils.ereaseAndWriteStorage(vaults);
    res.status(201).json(newVault);
};

/**
 * Fonction de lecture d'un coffre
 *
 * @param req - L'objet de requête Express.
 * @param res - L'objet de réponse Express.
 */
exports.open = async function (req: Request, res:Response) {

    //Contrôle des arguments
    const masterKey = req.query["password"];
    const vId = req.query["id"];

    if(!masterKey && !vId){
        //Si aucun paramètre, on liste les coffres

        res.json(storageUtils.getVaults());
        return;
    }


    if(masterKey == undefined){
        res.status(400).json({error : "Merci d'ajouter le mot de passe maitre"});
        return
    }

    if(vId == undefined){
        res.status(400).json({error : "Merci d'ajouter l'identifiant du coffre"});
        return
    }

    //On récupère le fichier
    try{
        let vault = vaultUtils.openVault(vId,masterKey);
        res.json(vault);
    }catch (err){
        res.status(err.httpCode).json({error: err.msg});
    }
};