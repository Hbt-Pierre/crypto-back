export interface Vault{

    id: number, //Identifiant

    name: string
    content : string //Contenu chiffré

    verification : string // Hash du contenu en clair

}