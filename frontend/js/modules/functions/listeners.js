//Lance les écoutes d'évènements standards et en fonction de la page visitée
var listenOperateButton = function(){
    if(idPageValue != 'ordered'){
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
    }
    switch(idPageValue){ 
        case 'shoppingCart':
            const cartValidateButton = document.getElementsByClassName(cartValidationClass);
            cartValidateButton[0].addEventListener('click', function(){
                const cartShip = new cartInfos();
                cartListArray(shoppingCart.orderMap, cartShip);
                cartShip.contact = cartObject();
                shoppingCart.contact = cartObject();
                shoppingCart.date = Date.now();
                console.log(cartShip);
                dbPost.open('POST', 'http://localhost:3000/api/cameras/order');
                dbPost.setRequestHeader('content-type', 'application/json');
                dbPost.send(JSON.stringify(cartShip));
            })
        break;

        case 'ordered':
        case 'product':
            const returnButton = document.getElementsByClassName(backToIndexClass);
            returnButton[0].addEventListener('click', function(){
                window.location.href = 'index.html';
            })
        break;
    }
    
    
    if(idPageValue == 'shoppingCart'){
        
    }
}

//Crée une écoute d'évènement pour les boutons du bloc de commande d'un produit
var operateEvent = function(operationTypeClass, position, buyDiv, id){
    const operationButton = buyDiv.getElementsByClassName(operationTypeClass);
    for (let count in operationButton){
        if(HTMLCollectionCleaner(count) && operationButton[count]){
            operationButton[count].addEventListener('click', function(){
                let cartMap = shoppingCart.orderMap;
                value = cartMap.get(id);
                switch (operationTypeClass){
                    case orderButtonClass:
                        cartMap.set(id, 1);
                        quantityOrdered.content= 1;
                        orderRefresher('firstOrderDone', position, buyDiv, id);
                        break;
                    case addOrderClass:
                        value++;
                        quantityOrdered.content= value;
                        cartMap.set(id, value);
                        orderRefresher('alreadyButtons', position, buyDiv, id);
                        break;
                    case substractOrderClass:
                        value--;
                        quantityOrdered.content= value;
                        if(value == 0){
                            cartMap.delete(id);
                            orderRefresher('deleteCart', position, buyDiv, id);
                        }else{
                            cartMap.set(id, value);
                            orderRefresher('alreadyButtons', position, buyDiv, id);
                        }
                        break;
                    case deleteOrderClass:
                        cartMap.delete(id);
                        orderRefresher('deleteCart', position, buyDiv, id);
                        break;
                }
                cartUpdater();
            });
        }
    }
}

//Agit sur la disponibilité du lien vers la page du panier en fonction de son remplissage
var shoppingCartURL = function(){
    const cartLink = document.getElementById('cartLink');
    console.log(cartLink);
    cartLink.addEventListener('click', function(event){
        if(shoppingCart.orderMap.size == 0 || window.location.href == 'http://127.0.0.1:5500/oc_p5_projet/frontend/shoppingcart.html'){
            event.preventDefault();
        }else{
            localStorageCartUpdate();
        }
    });
}

//Vérifie le contenu du formulaire de contact pour la commande et réactive le bouton de validation de la commande
//si et uniquement si les champs du formulaire sont valides.
var formListeners = function(){
    if(idPageValue == 'shoppingCart'){
        const formInputs = document.getElementsByTagName('input');
        for (let count in formInputs){
            if(HTMLCollectionCleaner(count) && formInputs[count].getAttribute('type') != 'submit'){
                formInputs[count].addEventListener('change', function(){
                    if(formRegex(formInputs[count].getAttribute('id'))){
                        formListenersAnswers[count] = 1;
                        formAssist(formInputs[count], true);
                    }else{
                        formAssist(formInputs[count], false);
                    }
                    if(formAnswers() && shoppingCart.orderMap.size > 0){
                        document.getElementById('formValidate').removeAttribute('disabled');
                    }
                });
            }
        }
    } 
    
}


