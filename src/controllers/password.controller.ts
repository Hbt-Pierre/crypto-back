import { Request, Response } from 'express';
import {Vault} from "../models/vault.model";
import {SensitiveData} from "../models/sensitive-data.model";

const storageUtils = require('../utils/storage.utils')
const vaultUtils = require('../utils/vault.utils')


exports.delete = async function (req: Request, res:Response) {
    const vPass = req.body["vaultPassword"];
    const vId = req.body["id"];

    const sdId = req.body["passwordId"];

    if(!vPass || !vId || !sdId){
        res.status(400).json({error : "Merci d'ajouter dans le corps de la requête les valeurs suivantes : id,vaultPassword,passwordId"});
        return
    }

    //On récupère le fichier
    try{
        let vault = vaultUtils.openVault(vId,vPass);
        vault.content = vault.content.filter(sd => sd.id != sdId)

        let lockedVault = vaultUtils.lockVault(vault,vPass);

        storageUtils.updateVault(lockedVault)
        res.status(200).json(vault);
    }catch (err){
        res.status(err.httpCode).json({error: err.msg});
    }
}
exports.edit = async function (req: Request, res:Response) {
    const vPass = req.body["vaultPassword"];
    const vId = req.body["id"];

    const sdId = req.body["passwordId"];
    const sdPassword = req.body["password"];

    if(!vPass || !vId || !sdId || !sdPassword ){
        res.status(400).json({error : "Merci d'ajouter dans le corps de la requête les valeurs suivantes : id,vaultPassword,passwordId,sdPassword"});
        return
    }

    //On récupère le fichier
    try{
        let vault = vaultUtils.openVault(vId,vPass);

        let sdToEdit =vault.content.find(sd => sd.id == sdId);
        sdToEdit.password = sdPassword;

        let lockedVault = vaultUtils.lockVault(vault,vPass);

        storageUtils.updateVault(lockedVault)
        res.status(200).json(vault);
    }catch (err){
        res.status(err.httpCode).json({error: err.msg});
    }
}


exports.add = async function (req: Request, res:Response) {

    const vPass = req.body["vaultPassword"];
    const vId = req.body["id"];

    const sdLabel = req.body["label"];
    const sdPassword = req.body["password"];

    if(!vPass || !vId || !sdLabel || !sdPassword){
        res.status(400).json({error : "Merci d'ajouter dans le corps de la requête les valeurs suivantes : id,vaultPassword,label,password"});
        return
    }

    //On récupère le fichier
    try{
        let vault = vaultUtils.openVault(vId,vPass);

        vault.content.push({
            id : new Date().getTime(),
            label: sdLabel,
            password: sdPassword
        } as SensitiveData);

        let lockedVault = vaultUtils.lockVault(vault,vPass);
        storageUtils.updateVault(lockedVault);

        res.status(200).json(vault);
    }catch (err){
        res.status(err.httpCode).json({error: err.msg});
    }
}
