//Classe produit
class product{
    constructor(id, name, price, description, imageURL) {
        this._id = id;
        this.name= name;
        this.price= price;
        this.description = description;
        this.imageURL = imageURL;
        this.custom = 'standard';
    }
}