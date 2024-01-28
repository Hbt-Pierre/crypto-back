export class VaultError{

    static OPEN_VAULT_READING_FAILED = new VaultError(500,"Erreur de lecture du fichier de stockage");
    static OPEN_VAULT_NOT_FOUND = new VaultError(404,"Aucun coffre trouvé");
    static OPEN_VAULT_BAD_PASSWORD= new VaultError(401,"Mot de passe incorrect");
    static OPEN_VAULT_INTEGRITY_FAILED= new VaultError(500,"Erreur d'intégrité ! Votre coffre fort à été modifié");

    static LOCK_VAULT_READING_FAILED = new VaultError(500,"Erreur de lecture du fichier de stockage");
    static LOCK_VAULT_NOT_FOUND = new VaultError(404,"Le coffre n'est pas enregistré !");

    static FS_VAULT_READING_FAILED = new VaultError(500,"Erreur de lecture du fichier de stockage");


    httpCode: number;
    msg: string;

    constructor(httpCode: number,msg: string) {
        this.httpCode = httpCode;
        this.msg = msg;
    }

}