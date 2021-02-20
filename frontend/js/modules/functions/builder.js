var articleBuilder = function(product, position, id, idPageValue){
    elementBuilder(bloc, position, id);
    elementBuilder(productInfoDiv, position, id);
    contentBuilder(product, position, id, idPageValue);
    elementBuilder(buyDiv, position, id, idPageValue);
    orderBuilder(position, id);
}

var elementBuilder = function(elementType, position, id){
    const element = document.createElement(elementType.type);
    for(const [key, value] of elementType.attributeMap){
        element.setAttribute(key, value);
    }
    switch(elementType){
        case bloc: 
        element.setAttribute('id', id);
        break;
    }
    if(elementType.content != ''){
        element.innerHTML = elementType.content;
    }
    const elementParent = parentFinder(position, elementType.parentClassName);
    elementParent.appendChild(element);
}

var contentBuilder = function(product, position, idPageValue){
    for (const property in product){
        switch (property){
            case 'name':
            const productName = new cardElement('h3', [['class', productNameClass]], product.name, productDivClass);
            elementBuilder(productName, position, idPageValue);
            break;

            case 'price':
            const productPrice = new cardElement('p', [['class', productPriceClass]], product.price + '€', productDivClass);
            elementBuilder(productPrice, position, idPageValue);
            break;

            case 'imageURL':
            const productImage = new cardElement('img', [['class', productImageClass], ['src', product.imageURL]], '', productDivClass);
            elementBuilder(productImage, position, idPageValue);
            break;

            case 'description':
            const productDescription = new cardElement('p', [['class', productDescriptionClass]], product.description, productDivClass);
            elementBuilder(productDescription, position, idPageValue);
            break;

            case 'custom':
            break;

            default:
          }
      }
      const moreInfo = new cardElement('a', [['class', moreInfoClass], ['href', 'produit.html?_id=' + product._id]], 'Plus de détails', productDivClass);
      elementBuilder(moreInfo, position, idPageValue);  
}

var orderBuilder = function(position, id){
    if(alreadyOrdered(id)){
        elementBuilder(deleteButton, position, id);
        elementBuilder(substractButton, position, id);
        elementBuilder(quantityOrdered, position, id);
        elementBuilder(addButton, position, id);
    }else{
        elementBuilder(firstOrderButton, position, id);
    }
}

var alreadyOrdered = function(id){
    var retour = false;
    if(shoppingCart.orderMap.size > 0){
        console.log('AlreadyOrdered, orderMap informée');
        for(const [key, value] of shoppingCart.orderMap){
            if(key == id){
                retour = true;
            }
        }
    }else{
        console.log('AlreadyOrdered, orderMap vide');
    }
    return retour;
}

var orderRefresher = function(clickedButton, position, buyDiv, id){
    switch(clickedButton){
        case firstOrderButton:
        blocRemover(orderButtonClass, buyDiv);
        break;

        case 'alreadyButtons':
        blocRemover(deleteOrderClass, buyDiv);
        blocRemover(substractOrderClass, buyDiv);
        blocRemover(quantityOrderClass, buyDiv);
        blocRemover(addOrderClass, buyDiv);
        break;

        case 'deleteCart':
        blocRemover(deleteOrderClass, buyDiv);
        blocRemover(substractOrderClass, buyDiv);
        blocRemover(quantityOrderClass,buyDiv);
        blocRemover(addOrderClass, buyDiv);
        break;

        default:
    }
    orderBuilder(position, id);
    listenOperateButton();
}

var blocRemover = function(operationTypeButton, buyDiv){
    const element = buyDiv.getElementsByClassName(operationTypeButton);
    buyDiv.removeChild(element[0]);
}