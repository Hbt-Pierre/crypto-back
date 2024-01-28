import {SensitiveData} from "./sensitive-data.model";

export interface OpenVault{

    id: number, //Identifiant

    name: string
    content : SensitiveData[] //Contenu déchiffré

    verification : string // Hash du contenu en clair

}