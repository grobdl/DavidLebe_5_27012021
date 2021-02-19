var operateEvent = function(operationTypeClass, count, orderDiv){
    const operationButton = orderDiv.getElementsByClassName(operationTypeClass);
    const articles = document.getElementsByTagName('article');
    const articleId = articles[count].getAttribute('id');
    for (let i in operationButton){
        if(HTMLCollectionCleaner(i) && operationButton[i]){
            operationButton[i].addEventListener('click', function(){
                let cartMap = shoppingCart.orderMap;
                value = cartMap.get(articleId);
                switch (operationTypeClass){
                    case 'firstOrder col-12':
                        cartMap.set(articleId, 1);
                        quantityOrdered.content= 1;
                        orderRefresher(orderButton, count, orderDiv);
                        console.log('quantityOrdered: ' + quantityOrdered.content);
                        break;
                    case 'add col-3':
                        value++;
                        quantityOrdered.content= value;
                        cartMap.set(articleId, value);
                        orderRefresher('alreadyButtons', count, orderDiv);
                        console.log('quantityOrdered: ' + quantityOrdered.content);
                        break;
                    case 'substract col-3':
                        value--;
                        quantityOrdered.content= value;
                        if(value == 0){
                            cartMap.delete(articleId);
                            orderRefresher('deleteCart', count, orderDiv);
                            console.log('quantityOrdered: ' + quantityOrdered.content);
                        }else{
                            cartMap.set(articleId, value);
                            orderRefresher('alreadyButtons', count, orderDiv);
                            console.log('quantityOrdered: ' + quantityOrdered.content);
                        }
                        break;
                    case 'delete col-3':
                        cartMap.delete(articleId);
                        orderRefresher('deleteCart', count, orderDiv);
                        console.log('quantityOrdered: ' + quantityOrdered.content);
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

var shoppingCartURL = function(){
    const cartLink = document.getElementById('cartLink');
    cartLink.addEventListener('click', function(event){
        if(shoppingCart.orderMap.size == 0 || window.location.href == 'http://127.0.0.1:5500/oc_p5_projet/frontend/shoppingcart.html'){
            event.preventDefault();
        }else{
            localStorageUpdate();
        }
    });
}
