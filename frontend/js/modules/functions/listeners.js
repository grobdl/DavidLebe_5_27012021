//Lance les écoutes d'évènements standards et en fonction de la page visitée
var listenOperateButton = function(){
    // Ce bloc active les écoutes sur les boutons de commande de produits (firstOrder, add, substract et delete) si la page visitée
    // n'est pas shipping.html
    if(idPageValue != 'ordered'){
        const buyDiv = document.getElementsByClassName(buyDivClass);
        for(let position in buyDiv){
            if(HTMLCollectionCleaner(position) && buyDiv[position]){
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
            //Intègre l'objet contact et le panier dans l'objet cartLink avant de l'envoyer au serveur
            const cartValidateButton = document.getElementsByClassName(cartValidationClass);
            cartValidateButton[0].addEventListener('click', function(){
                const cartShip = new cartInfos();
                cartListArray(shoppingCart.orderMap, cartShip);
                cartShip.contact = cartObject();
                shoppingCart.contact = cartObject();
                shoppingCart.date = Date.now();
                dbPost.open('POST', 'http://localhost:3000/api/cameras/order');
                dbPost.setRequestHeader('content-type', 'application/json');
                dbPost.send(JSON.stringify(cartShip));
            })
        break;

        case 'ordered':
        case 'product':
            //Ecoute du bouton de retour vers index.html
            const returnButton = document.getElementsByClassName(backToIndexClass);
            returnButton[0].addEventListener('click', function(){
                window.location.href = 'index.html';
            })
        break;
    }
}

//Crée une écoute d'évènement pour les boutons du bloc de commande d'un produit
var operateEvent = function(operationTypeClass, position, buyDiv, id){
    const operationButton = buyDiv.getElementsByClassName(operationTypeClass);
    //Liste tous les boutons influant sur le contenu du panier dans une HTMLCollection
    for (let count in operationButton){
        if(HTMLCollectionCleaner(count) && operationButton[count]){
            operationButton[count].addEventListener('click', function(){
                //récupère la map contenant les identifiants des produits et leur quantité
                let cartMap = shoppingCart.orderMap;
                //récupère la quantité du produit dont l'identifiant vaut id
                value = cartMap.get(id);
                switch (operationTypeClass){
                    case orderButtonClass:
                    //Si le produit n'a pas encore été commandé, ajoute le produit à la map et met à jour le bloc de commande
                        cartMap.set(id, 1);
                        quantityOrdered.content= 1;
                        orderRefresher('firstOrderDone', position, buyDiv, id);
                        break;
                    case addOrderClass:
                        //Incrémente la quantité commandée du produit id
                        value++;
                        quantityOrdered.content= value;
                        cartMap.set(id, value);
                        orderRefresher('alreadyButtons', position, buyDiv, id);
                        break;
                    case substractOrderClass:
                        //Décrémente la quantité commandée du produit id. 
                        //Lorsque la quantité de id atteint 0, le produit est supprimé du panier
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
                        //Supprime directement l'id du panier
                        cartMap.delete(id);
                        orderRefresher('deleteCart', position, buyDiv, id);
                        break;
                }
                //Mise à jour du lien vers le panier
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
        //Si shoppingCart.orderMap est vide ou si la page visitée est shoppingcart.html, le lien est désactivé.
        if(shoppingCart.orderMap.size == 0 || window.location.href == 'http://127.0.0.1:5500/oc_p5_projet/frontend/shoppingcart.html'){
            event.preventDefault();
        }else{
        //Sinon, le lien est activé et transmet les données dans localStorage au clic.
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
                    //Le contenu de l'input est valide, l'encadré devient vert.
                    if(formRegex(formInputs[count].getAttribute('id'))){
                        formListenersAnswers[count] = 1;
                        formAssist(formInputs[count], true);
                    }else{
                        //le contenu est invalide, l'encadré devient rouge
                        formAssist(formInputs[count], false);
                    }
                    //Vérifie que le bouton ne peut être cliqué que si le panier n'est pas vide et tous les inputs valides
                    if(formAnswers() && shoppingCart.orderMap.size > 0){
                        document.getElementById('formValidate').removeAttribute('disabled');
                    }
                });
            }
        }
    } 
    
}


