var articleBuilder = function(product, position, id, idPageValue){
    elementBuilder(bloc, position, id);
    elementBuilder(productInfoDiv, position, id);
    contentBuilder(product, position, id, idPageValue);
    elementBuilder(buyDiv, position, id, idPageValue);
    orderBuilder(position, id, false);
}

var cartBuilder = function(position){
    elementBuilder(cartOrderPrice, position);
    for(const [key, value] of cartItems){
        elementBuilder(cartFreeSpace, position, key);
        elementBuilder(cartItemDesignation, position, key);
        elementBuilder(cartItemPrice, position, key);
    }    
    elementBuilder(cartFreeSpace, position);
    elementBuilder(cartValidation, position);
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

        case quantityOrdered:
        elementType.content = quantityRecover(id);
        break;

        case cartItemDesignation:
        elementType.content = id;
        break;

        case cartItemPrice:
        var contentValue= 0;
        switch (id){
            case 'Total Panier: ':
            contentValue= cartValue();
            orderTotalPrice += contentValue;
            break;

            case 'Dont TVA 20%: ':
            taxValue = cartValue()/1.2*0.2;
            roundedTax = numberRounder(taxValue, 2);
            contentValue= roundedTax;
            break

            case 'Prix Total: ':
            contentValue= orderTotalPrice;
            shoppingCart.total = contentValue;
            orderTotalPrice = 0;
            break;

            default:
            contentValue= cartItems.get(id);
            orderTotalPrice += contentValue;
        }
        elementType.content= contentValue + ' €';
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
            const productImage = new cardElement('img', [['class', productImageClass], ['src', product.imageURL]], '', articleClass);
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
      const moreInfo = new cardElement('a', [['class', moreInfoClass], ['href', 'produit.html?_id=' + product._id]], 'Détails', productDivClass);
      elementBuilder(moreInfo, position, idPageValue);  
}

var orderBuilder = function(position, id, reOrder){
    if(reOrder){
        const orderParents = document.getElementsByClassName(buyDivClass);
        const orderParent = orderParents[position].getElementsByTagName('*');
        let nodeList = orderParent.length - 1;
        while(nodeList >= 0){
            orderParent[nodeList].remove();
            nodeList--;
        }
    }
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
        for(const [key, value] of shoppingCart.orderMap){
            if(key == id){
                retour = true;
            }else{
            }
        }
    }else{
    }
    return retour;
}

var orderRefresher = function(clickedButton, position, buyDiv, id){
    switch(clickedButton){
        case 'firstOrderDone':
        orderBuilder(position, id, true);
        operateEvent(addOrderClass, position, buyDiv, id);
        operateEvent(substractOrderClass, position, buyDiv, id);
        operateEvent(deleteOrderClass, position, buyDiv, id);
        break;

        case 'alreadyButtons':
        orderBuilder(position, id, true);
        operateEvent(addOrderClass, position, buyDiv, id);
        operateEvent(substractOrderClass, position, buyDiv, id);
        operateEvent(deleteOrderClass, position, buyDiv, id);
        break;

        case 'deleteCart':
        if(idPageValue == 'shoppingCart'){
            const articleList = document.getElementsByClassName(articleClass);
            var count = articleList.length - 1;
            while(count >= 0){
                    articleList[count].remove();
                    count--;
            }
            position = 0;            
            for (let i in cameras){
                if((idPageValue == 'shoppingCart' && alreadyOrdered(cameras[i]._id))){
                articleBuilder(cameras[i], position, cameras[i]._id, idPageValue);
                position++;
                }
            }
            listenOperateButton();
        }else{
            orderBuilder(position, id, true);
            operateEvent(orderButtonClass, position, buyDiv, id);
        }
        break;

        default:
    }
    if(idPageValue == 'shoppingCart'){
        const cartTotalsBloc = document.getElementsByClassName(totalPriceClass);
        cartTotalsBloc[0].remove();
        orderTotalPrice = 0;
        cartBuilder(position);
    }
}