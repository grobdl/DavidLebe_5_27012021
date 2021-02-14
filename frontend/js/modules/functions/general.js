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

