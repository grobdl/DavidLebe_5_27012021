var listenOperateButton = function(){
    const buyDiv = document.getElementsByClassName(buyDivClass);
    for(let position in buyDiv){
        if(HTMLCollectionCleaner(position) && buyDiv[position]){
            //console.log('listenOperateButton position: ' + position);
            //console.log('listenOperateButton buyDiv[position]:');
            //console.log(buyDiv[position]);
            const buyDivPArent = parentFinder(position, articleClass);
            const buyDivId = buyDivPArent.getAttribute('id');
            operateEvent(orderButtonClass, position, buyDiv[position], buyDivId);
            operateEvent(addOrderClass, position, buyDiv[position], buyDivId);
            operateEvent(substractOrderClass, position, buyDiv[position], buyDivId);
            operateEvent(deleteOrderClass, position, buyDiv[position], buyDivId);
        }
    }
    if(idPageValue == 'shoppingCart'){
        const cartValidateButton = document.getElementsByClassName(cartValidationClass);
        cartValidateButton[0].addEventListener('click', function(){
            window.location.href= 'shipping.html';
        })
    }
    console.log('Fin de boucle');
}

var operateEvent = function(operationTypeClass, position, buyDiv, id){
    const operationButton = buyDiv.getElementsByClassName(operationTypeClass);
    //console.log('operateEvent, operationTypeClass: ');
    //console.log(operationTypeClass);
    //console.log('operateEvent, operationButton:');
    //console.log(operationButton);
    //console.log('operateEvent, id: ' + id);
    for (let count in operationButton){
        //console.log('operateEvent, count: ' + count);
        //console.log('operateEvent, operationButton[count]: ');
        //console.log(operationButton[count]);
        //console.log(HTMLCollectionCleaner(count));
        if(HTMLCollectionCleaner(count) && operationButton[count]){
            console.log('HTMLCC Passe');
            operationButton[count].addEventListener('click', function(){
                console.log('clic acquis');
                let cartMap = shoppingCart.orderMap;
                value = cartMap.get(id);
                switch (operationTypeClass){
                    case orderButtonClass:
                        cartMap.set(id, 1);
                        quantityOrdered.content= 1;
                        orderRefresher('firstOrderDone', position, buyDiv, id);
                        console.log('quantityOrdered: ' + quantityOrdered.content);
                        break;
                    case addOrderClass:
                        value++;
                        quantityOrdered.content= value;
                        cartMap.set(id, value);
                        orderRefresher('alreadyButtons', position, buyDiv, id);
                        console.log('quantityOrdered: ' + quantityOrdered.content);
                        break;
                    case substractOrderClass:
                        value--;
                        quantityOrdered.content= value;
                        if(value == 0){
                            cartMap.delete(id);
                            orderRefresher('deleteCart', position, buyDiv, id);
                            console.log('quantityOrdered: ' + quantityOrdered.content);
                        }else{
                            cartMap.set(id, value);
                            orderRefresher('alreadyButtons', position, buyDiv, id);
                            console.log('quantityOrdered: ' + quantityOrdered.content);
                        }
                        break;
                    case deleteOrderClass:
                        cartMap.delete(id);
                        orderRefresher('deleteCart', position, buyDiv, id);
                        console.log('quantityOrdered: ' + quantityOrdered.content);
                        break;
                }
                cartUpdater();
            });
        }else{
            //console.log('HTMLCC + Operation[count] Faux');
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
