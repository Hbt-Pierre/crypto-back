export class VaultError{

    static OPEN_VAULT_READING_FAILED = new VaultError(500,"Erreur de lecture du fichier de stockage");
    static OPEN_VAULT_NOT_FOUND = new VaultError(500,"Aucun coffre ne porte ce nom");
    static OPEN_VAULT_BAD_PASSWORD= new VaultError(500,"Mot de passe incorrect");
    static OPEN_VAULT_INTEGRITY_FAILED= new VaultError(500,"Erreur d'intégrité ! Votre coffre fort à été modifié");


    httpCode: number;
    msg: string;

    constructor(httpCode: number,msg: string) {
        this.httpCode = httpCode;
        this.msg = msg;
    }

}