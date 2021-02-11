//Déclarations globales 
var dbGet = new XMLHttpRequest();
var cartSend = new XMLHttpRequest();
var cameras= [];
const orderMap= new Map;
const pageCheck = 'main';
const sectionClass = 'products row';
const articleClass = 'col-12 col-md-6 col-lg-4';
const productDivClass = 'productDiv d-flex flex-wrap';
const moreInfoClass = 'col-12 text-right';
const buyDivClass = 'buyDiv d-flex flex-wrap justify-content-center';
const deleteOrderClass = 'delete col-3';
const addOrderClass = 'add col-3';
const substractOrderClass = 'substract col-3';
const quantityOrderClass = 'quantity col-3';
const orderButtonClass = 'firstOrder col-12'

//Classe Panier
class cart{
    constructor(orderId, userId, date, orderMap){
        this.orderId = orderId;
        this.userId = userId;
        this.date = date;
        this.orderMap = orderMap;
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
const shoppingCart = new cart('0', 'invited', Date.now(), orderMap);
const bloc = new cardElement('article', [['class', articleClass]], '', sectionClass);
const productDiv = new cardElement('div', [['class', productDivClass]], '', articleClass);
const buyDiv = new cardElement('div', [['class', buyDivClass]], '', articleClass);
const deleteButton = new cardElement('button', [['class', deleteOrderClass]], 'Delete', buyDivClass);
const substractButton = new cardElement('button', [['class', substractOrderClass]], '-', buyDivClass);
const quantityOrdered = new cardElement('p', [['class', quantityOrderClass]], 'Qty', buyDivClass);
const addButton = new cardElement('button', [['class', addOrderClass]], '+', buyDivClass);
const orderButton = new cardElement('button', [['class', orderButtonClass]], 'Commander', buyDivClass);

//Ecarte les items spécifiques d'une HTMLCollection
var HTMLCollectionCleaner = function(value, parentFunction){
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

var alreadyOrderedRemover = function(i){
    blocRemover(deleteButton, i);
    blocRemover(substractButton, i);
    blocRemover(quantityOrdered, i);
    blocRemover(addButton, i);
}

var orderRefresher = function(removedButtons, i, orderDiv){
    switch(removedButtons){
        case orderButton:
            blocRemover(removedButtons, i);
            orderBuilder(i);
            operateEvent(addOrderClass, i, orderDiv);
            operateEvent(substractOrderClass, i, orderDiv);
            operateEvent(deleteOrderClass, i, orderDiv);
            break;

        case 'alreadyButtons':
            alreadyOrderedRemover(i);
            orderBuilder(i);
            operateEvent(addOrderClass, i, orderDiv);
            operateEvent(substractOrderClass, i, orderDiv);
            operateEvent(deleteOrderClass, i, orderDiv);
            break;
        
        case 'deleteCart':
            alreadyOrderedRemover(i);
            orderBuilder(i);
            operateEvent(orderButtonClass, i, orderDiv);
            break;
    }
    cartUpdater();
}

var operateEvent = function(operationTypeClass, count, orderDiv){
    const operationButton = orderDiv.getElementsByClassName(operationTypeClass);
    for (let i in operationButton){
        if(HTMLCollectionCleaner(i) && operationButton[i]){
            operationButton[i].addEventListener('click', function(){
                let cartMap = shoppingCart.orderMap;
                value = cartMap.get(cameras[count]._id);
                switch (operationTypeClass){
                    case 'firstOrder col-12':
                        cartMap.set(cameras[count]._id, 1);
                        quantityOrdered.content= 1;
                        orderRefresher(orderButton, count, orderDiv);
                        break;
                    case 'add col-3':
                        value++;
                        quantityOrdered.content= value;
                        cartMap.set(cameras[count]._id, value);
                        orderRefresher('alreadyButtons', count, orderDiv);
                        break;
                    case 'substract col-3':
                        value--;
                        quantityOrdered.content= value;
                        if(value == 0){
                            cartMap.delete(cameras[count]._id);
                            orderRefresher('deleteCart', count, orderDiv);
                        }else{
                            cartMap.set(cameras[count]._id, value);
                            orderRefresher('alreadyButtons', count, orderDiv);
                        }
                        break;
                    case 'delete col-3':
                        cartMap.delete(cameras[count]._id);
                        orderRefresher('deleteCart', count, orderDiv);
                        break;
                }
            });
        }
    }
}


var listenOperateButton = function(){
    const buyDiv = document.getElementsByClassName(buyDivClass);
    for(let i in buyDiv){
        if(HTMLCollectionCleaner(i) && buyDiv[i]){
            operateEvent(orderButtonClass, i, buyDiv[i]);
            operateEvent(addOrderClass, i, buyDiv[i]);
            operateEvent(substractOrderClass, i, buyDiv[i]);
            operateEvent(deleteOrderClass, i, buyDiv[i]);
        }
    }
}

var cartUpdater = function(){
    const cartDisplay = document.getElementById('cartLink');
    switch(shoppingCart.orderMap.size){
        case 0:
            cartDisplay.innerHTML = 'Panier Vide';
            break;
        case 1: 
            cartDisplay.innerHTML = 'Mon Panier <br />1 article';
            break;
        default:
            cartDisplay.innerHTML = 'Mon Panier <br />' + shoppingCart.orderMap.size + 'Articles';
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
        alreadyOrdered(i);
    }else{
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

var shoppingCartURL = function(){
    const cartLink = document.getElementById('cartLink');
    cartLink.addEventListener('click', function(event){
        if(shoppingCart.orderMap.size == 0){
            event.preventDefault();
        }else{
            shoppingCart.orderMap = Array.from(shoppingCart.orderMap);
            const cartString = JSON.stringify(shoppingCart);
            localStorage.setItem('cart', cartString);
        }
    });
}

//récupère les données du serveur
dbGet.onreadystatechange = function () {
    if(this.readyState == 4 && this.status == 200){
        var response = JSON.parse(this.responseText);
        objectBuilder(response);
        for (let i in cameras){
            articleBuilder(cameras[i], i);
        }
        cartUpdater();
        listenOperateButton();
        shoppingCartURL();
    }else{
    }
};

 

var mainId = document.getElementsByTagName(pageCheck);
const idValue = mainId[0].getAttribute('id');
switch(idValue){
    case 'index':
    //requête récupération
    dbGet.open('GET', 'http://localhost:3000/api/cameras');
    dbGet.send();
    break;

    case 'shoppingCart':
        console.log(localStorage.getItem('cart'));
        cartParse = JSON.parse(localStorage.getItem('cart'));
        console.log(cartParse.orderMap);
    break;

    case 'product':
    break;

    default:
        console.log('Erreur: ' + mainId[0]);
}

