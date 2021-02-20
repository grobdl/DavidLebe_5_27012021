var listenOperateButton = function(){
    const buyDiv = document.getElementsByClassName(buyDivClass);
    for(let position in buyDiv){
        if(HTMLCollectionCleaner(position) && buyDiv[position]){
            console.log(position);
            const buyDivPArent = parentFinder(position, articleClass);
            const buyDivId = buyDivPArent.getAttribute('id');
            operateEvent(orderButtonClass, position, buyDiv[position], buyDivId);
            operateEvent(addOrderClass, position, buyDiv[position], buyDivId);
            operateEvent(substractOrderClass, position, buyDiv[position], buyDivId);
            operateEvent(deleteOrderClass, position, buyDiv[position], buyDivId);
        }
    }
}

var operateEvent = function(operationTypeClass, position, buyDiv, id){
    const operationButton = buyDiv.getElementsByClassName(operationTypeClass);
    for (let item in operationButton){
        if(HTMLCollectionCleaner(item) && operationButton[item]){
            operationButton[item].addEventListener('click', function(){
                let cartMap = shoppingCart.orderMap;
                value = cartMap.get(id);
                switch (operationTypeClass){
                    case 'firstOrder col-12':
                        cartMap.set(id, 1);
                        quantityOrdered.content= 1;
                        orderRefresher(firstOrderButton, position, buyDiv, id);
                        console.log('quantityOrdered: ' + quantityOrdered.content);
                        break;
                    case 'add col-3':
                        value++;
                        quantityOrdered.content= value;
                        cartMap.set(id, value);
                        orderRefresher('alreadyButtons', position, buyDiv, id);
                        console.log('quantityOrdered: ' + quantityOrdered.content);
                        break;
                    case 'substract col-3':
                        value--;
                        quantityOrdered.content= value;
                        if(value == 0){
                            cartMap.delete(id);
                            orderRefresher('alreadyButtons', position, buyDiv, id);
                            console.log('quantityOrdered: ' + quantityOrdered.content);
                        }else{
                            cartMap.set(id, value);
                            orderRefresher('alreadyButtons', position, buyDiv, id);
                            console.log('quantityOrdered: ' + quantityOrdered.content);
                        }
                        break;
                    case 'delete col-3':
                        cartMap.delete(id);
                        orderRefresher('alreadyButtons', position, buyDiv, id);
                        console.log('quantityOrdered: ' + quantityOrdered.content);
                        break;
                }
            });
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
