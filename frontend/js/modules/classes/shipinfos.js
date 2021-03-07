//Classe cartInfos, englobe l'objet shoppingCart et contact
class cartInfos{
    constructor(contact, products){
        this.contact = contact;
        this.products = products;
    }
}

//Classe contact, construit un objet à partir des données du formulaire de validation du panier.
class contact{
    constructor(nom, prenom, email, adresse, ville){
        this.firstName = nom;
        this.lastName = prenom;
        this.address = adresse;
        this.city = ville;
        this.email = email;
    }
}