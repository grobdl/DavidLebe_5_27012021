
//Déclarations globales 
var dbGet = new XMLHttpRequest();
var cameras= [];
var panier= '';
const sectionClass = 'products row';
const articleClass = 'col-12 col-md-6 col-lg-4';
const productDivClass = 'productDiv d-flex flex-wrap';
const moreInfoClass = 'col-12 text-right';
const buyDivClass = 'buyDiv d-flex flex-wrap justify-content-center';
const buyDivColonClass = 'col-3';
const orderButtonClass = 'col-12';


//Objet produit
class product{
    constructor(id, name, price, description, imageURL) {
        this._id = id;
        this.name= name;
        this.price= price;
        this.imageURL = imageURL;
        this.description = description;
        this.custom = 'standard';
    }
}

//Objet carte
class cardElement{
    constructor(type, attributeMap, content, parentClassName) {
        this.type = type;
        this.attributeMap = attributeMap;
        this.content = content;
        this.parentClassName = parentClassName;
    }
}

//Vérifie si un produit est déjà présent dans le panier
var checkIfOrdered= function(product){
    if ((panier) && panier != null){
        for (let i in panier){
            if(panier[i]._id == product[i].id){
                console.log('check true');
                return true;
            }else{
                console.log('check false');
                return false;
            }
        }
    }else{
        console.log('check false');
        return false;
    }
}

//Introduit un bouton de commande
var notOrdered = function(i){
    blocBuilder(orderButton, i);
}

//Introduit une interface avancée de commande
var alreadyOrdered = function(i){
    blocBuilder(deleteButton, i);
    blocBuilder(substractButton, i);
    blocBuilder(quantityOrdered, i);
    blocBuilder(addButton, i); 
}

//Génère une série d'objet à partir d'un contenu fourni
var objectBuilder = function(jsonObject){
    for (let i= 0; i < jsonObject.length; i++ ){
        cameras[i] = new product(jsonObject[i]._id, jsonObject[i].name, jsonObject[i].price, jsonObject[i].description, jsonObject[i].imageUrl);
    }
};

/*Construit le bloc article, 
    Sélectionne la section parent 'products row' dans lequel l'article sera créé
    Crée un bloc productDiv contenant un résumé du produit (nom, prix, photo, description) et un lien menant vers la page du produit
    Crée un bloc de commande qui fera appel à une fonction permettant de commander directement depuis la liste des produits
*/
var orderIt = function(){


};


const bloc = new cardElement('article', [['class', articleClass]], '', sectionClass);
const productDiv = new cardElement('div', [['class', productDivClass]], '', articleClass);
const buyDiv = new cardElement('div', [['class', buyDivClass]], '', articleClass);
const deleteButton = new cardElement('button', [['class', buyDivColonClass]], 'Delete', buyDivClass);
const substractButton = new cardElement('button', [['class', buyDivColonClass]], '-', buyDivClass);
const quantityOrdered = new cardElement('p', [['class', buyDivColonClass]], 'Qty', buyDivClass);
const addButton = new cardElement('button', [['class', buyDivColonClass]], '+', buyDivClass);
const orderButton = new cardElement('button', ['class', orderButtonClass], 'Commander', buyDivClass);

var blocBuilder = function(object, i){
    const parent = document.getElementsByClassName(object.parentClassName);
    const element = document.createElement(object.type);
    for(const [key, value] of object.attributeMap){
        element.setAttribute(key, value);
    }
    element.innerHTML = object.content;
    if(parent[i]){
        parent[i].appendChild(element);
    }else{
        parent[0].appendChild(element);
    }
};

var contentBuilder = function(product, i){
    for (let property in product){
        switch (property){
            case 'name':
                const productName = new cardElement('h3', [['class', 'col-8']], product[property], productDivClass);
                blocBuilder(productName, i);
                break;
            case 'price':
                const productPrice = new cardElement('p', [['class', 'col-4 text-right']], product[property] + ' €', productDivClass);
                blocBuilder(productPrice, i);
                break;
            case 'description':
                const productDescription = new cardElement('p', [], product[property], productDivClass);
                blocBuilder(productDescription, i);
                break;
            case 'imageURL':
                const productImage = new cardElement('img', [['class', 'img-thumbnail'], ['src', product[property]]], '', productDivClass);
                blocBuilder(productImage, i);
                break;
            default:
        }
    }
    const moreInfo = new cardElement('a', [['class', moreInfoClass], ['href', 'produit.html']], 'Plus de détails', productDivClass);
    blocBuilder(moreInfo, i);
};

var orderBuilder = function(i){
    if(checkIfOrdered()){
        alreadyOrdered(i);
    }else{
        notOrdered(i);
    }
};

var articleBuilder = function(product, i){
    blocBuilder(bloc, i);
    blocBuilder(productDiv, i);
    contentBuilder(cameras[i], i);
    blocBuilder(buyDiv, i);
    orderBuilder(i);
};

dbGet.onreadystatechange = function () {
    if(this.readyState == 4 && this.status == 200){
        var response = JSON.parse(this.responseText);
        objectBuilder(response);
        for (let i in cameras){
            articleBuilder(cameras[i], i);
        }
    }else{
    }
};

dbGet.open('GET', 'http://localhost:3000/api/cameras');
dbGet.send();