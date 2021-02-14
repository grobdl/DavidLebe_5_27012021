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

//Efface le bloc de commande avancé
var alreadyOrderedRemover = function(i){
    blocRemover(deleteButton, i);
    blocRemover(substractButton, i);
    blocRemover(quantityOrdered, i);
    blocRemover(addButton, i);
}

//Met à jour le bloc de commande
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