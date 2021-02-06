
//Déclarations globales 
var dbGet = new XMLHttpRequest();
var cameras= [];
const orderMap= new Map;
const sectionClass = 'products row';
const articleClass = 'col-12 col-md-6 col-lg-4';
const productDivClass = 'productDiv d-flex flex-wrap';
const moreInfoClass = 'col-12 text-right';
const buyDivClass = 'buyDiv d-flex flex-wrap justify-content-center';
const buyDivColonClass = 'col-3';
const orderButtonClass = 'firstOrder col-12';

//Classe Panier
class cart{
    constructor(orderId, userId, date, orderMap){
        this.orderId = orderId;
        this.userId = userId;
        this.date = date;
        this.orderMap = orderMap;
        this.orderSize = this.orderMap.size;
    }
}


//Classe produit
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

//Classe carte
class cardElement{
    constructor(type, attributeMap, content, parentClassName) {
        this.type = type;
        this.attributeMap = attributeMap;
        this.content = content;
        this.parentClassName = parentClassName;
    }
}

//objets utilisés pour la construction des cartes
const shoppingCart = new cart('0', 'invited', '', orderMap);
const bloc = new cardElement('article', [['class', articleClass]], '', sectionClass);
const productDiv = new cardElement('div', [['class', productDivClass]], '', articleClass);
const buyDiv = new cardElement('div', [['class', buyDivClass]], '', articleClass);
const deleteButton = new cardElement('button', [['class', buyDivColonClass]], 'Delete', buyDivClass);
const substractButton = new cardElement('button', [['class', buyDivColonClass]], '-', buyDivClass);
const quantityOrdered = new cardElement('p', [['class', buyDivColonClass]], 'Qty', buyDivClass);
const addButton = new cardElement('button', [['class', buyDivColonClass]], '+', buyDivClass);
const orderButton = new cardElement('button', [['class', orderButtonClass]], 'Commander', buyDivClass);

//Ecarte les items spécifiques d'une HTMLCollection
var HTMLCollectionCleaner = function(value){
    if(value != 'length' && value != 'item' && value != 'namedItem'){
        return true;
    }else{
        return false;
    }
}

//Vérifie si des produits sont présents dans le panier
var panierFilled = function(){
    if(shoppingCart.orderMap.size > 0){
        return true;
    }else{
        return false
    }
}

//Vérifie si un produit est déjà présent dans le panier
var checkIfOrdered= function(product){
    if (panierFilled()){
        retour = false;
        for (const [key, value] of shoppingCart.orderMap){
            if(key == product._id){
                retour = true;
            }
        }
        return retour;
    }else{
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


var listen = function(){
    const orderButtonsList = document.getElementsByClassName(orderButtonClass);
    for(let j in orderButtonsList){
        if(HTMLCollectionCleaner(j)){
            orderButtonsList[j].addEventListener('click', function(event){
                let cartMap = shoppingCart.orderMap;
                if(checkIfOrdered(cameras[j])){
                    value = cartMap.get(cameras[j]._id);
                    value++;
                    cartMap.set(cameras[j]._id, value);
                }else{
                    cartMap.set(cameras[j]._id, 1);
                    blocRemover(orderButton, j);
                    orderBuilder(j);
                }
            });
        }
    }
}

//Génère une série d'objet à partir d'un contenu fourni
var objectBuilder = function(jsonObject){
    for (let i= 0; i < jsonObject.length; i++ ){
        cameras[i] = new product(jsonObject[i]._id, jsonObject[i].name, jsonObject[i].price, jsonObject[i].description, jsonObject[i].imageUrl);
    }
};

// crée un élément HTML, ainsi que ses attributs et son contenu
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

var blocRemover = function(object, i){
    const parent = document.getElementsByClassName(object.parentClassName);
    parent[i].removeChild(parent[i].firstChild);
}

//Implémente les détails de chaque produit dans l'article ainsi qu'un lien vers la page produit
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

//Construit l'interface de commande en fonction du remplissage du panier
var orderBuilder = function(i){
    if(checkIfOrdered(cameras[i])){
        console.log('true');
        alreadyOrdered(i);
    }else{
        console.log('False');
        notOrdered(i);
    }
};

//construit le bloc article
var articleBuilder = function(product, i){
    blocBuilder(bloc, i);
    blocBuilder(productDiv, i);
    contentBuilder(cameras[i], i);
    blocBuilder(buyDiv, i);
    orderBuilder(i);
};

//récupère les données du serveur
dbGet.onreadystatechange = function () {
    if(this.readyState == 4 && this.status == 200){
        var response = JSON.parse(this.responseText);
        objectBuilder(response);
        for (let i in cameras){
            articleBuilder(cameras[i], i);
        }
        listen();    
    }else{
    }
};

//requête
dbGet.open('GET', 'http://localhost:3000/api/cameras');
dbGet.send();