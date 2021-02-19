

//Introduit un bouton de commande
var notOrdered = function(i){
    blocBuilder(orderButton, i);
    console.log('notOrdered: ' + i);
}

var alreadyOrdered = function(i){
    blocBuilder(deleteButton, i);
    blocBuilder(substractButton, i);
    blocBuilder(quantityOrdered, i);
    blocBuilder(addButton, i);
    console.log('alreadyOrdered: ' + i);
}

//Construit l'interface de commande en fonction du remplissage du panier
var orderBuilder = function(i){
    /*const articles = document.getElementsByTagName('article');
    const articleId = articles[0].getAttribute('id');*/
    if(checkIfOrdered(cameras[i])){
        alreadyOrdered(i);
    }else{
        notOrdered(i);
    }
};

var blocBuilder = function(object, i){
    const parent = document.getElementsByClassName(object.parentClassName);
    const element = document.createElement(object.type);
    for(const [key, value] of object.attributeMap){
        element.setAttribute(key, value);
    }
    switch(object){
        case quantityOrdered:
            element.innerHTML = quantityRecover(i);
        break;

        case bloc:
            element.setAttribute('id', cameras[i]._id);
        break;

        default:
            element.innerHTML = object.content;
    }   
    if(parent[i]){
        parent[i].appendChild(element);
    }else{
        parent[0].appendChild(element);
    }
};

//Implémente les détails de chaque produit dans l'article ainsi qu'un lien vers la page produit
var contentBuilder = function(product, i){
    for (let property in product){
        switch (property){
            case 'name':
                const productName = new cardElement('h3', [['class', productNameClass]], product[property], productDivClass);
                blocBuilder(productName, i);
                break;
            case 'price':
                const productPrice = new cardElement('p', [['class', productPriceClass]], product[property] + ' €', productDivClass);
                blocBuilder(productPrice, i);
                break;
            case 'description':
                const productDescription = new cardElement('p', [['class', productDescriptionClass]], product[property], productDivClass);
                blocBuilder(productDescription, i);
                break;
            case 'imageURL':
                const productImage = new cardElement('img', [['class', productImageClass], ['src', product[property]]], '', productDivClass);
                blocBuilder(productImage, i);
                break;
            default:
        }
    }    
    const urlData = 'produit.html?_id=' + cameras[i]._id;
    const moreInfo = new cardElement('a', [['class', moreInfoClass], ['href', urlData]], 'Plus de détails', productDivClass);
    blocBuilder(moreInfo, i);
};

// crée un élément HTML, ainsi que ses attributs et son contenu
var blocRemover = function(object, i){
    const parent = document.getElementsByClassName(object.parentClassName);
    parent[i].removeChild(parent[i].firstChild);
}

//Efface le bloc de commande avancé
var alreadyOrderedRemover = function(i){
    console.log('alreadyOrderedRemover se lance');
    blocRemover(deleteButton, i);
    blocRemover(substractButton, i);
    blocRemover(quantityOrdered, i);
    blocRemover(addButton, i);
}

//Met à jour le bloc de commande
var orderRefresher = function(removedButtons, i, orderDiv){
    console.log('orderRefresher: ' + i);
    console.log('removedButtons: ' + removedButtons);
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

//construit le bloc article
var articleBuilder = function(product, i, page){
    blocBuilder(bloc, i);
    blocBuilder(productDiv, i);
    contentBuilder(cameras[i], i);
    blocBuilder(buyDiv, i);
    orderBuilder(i);
};