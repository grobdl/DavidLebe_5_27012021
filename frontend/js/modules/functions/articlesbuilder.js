//Construit les articles de présentation du produit en fonction de son identifiant. 
//La mise en page dépend de la page sur laquelle on se trouve
var articleBuilder = function(product, position, id, idPageValue){
    //Création de la balise <article> à l'aide des propriétés de l'objet bloc
    elementBuilder(bloc, position, id);
    //Création de la balise Div contenant les informations écrites du produit (Nom, Prix, Description, Lien vers la page produit.html)
    elementBuilder(productInfoDiv, position, id);
    //Appelle la fonction intégrant le contenu des balises Nom, Prix, Description, Image, et le lien vers la page produit.html
    contentBuilder(product, position, id, idPageValue);
    //Création d'un élément Div contenant le bloc de commande du produit
    elementBuilder(buyDiv, position, id, idPageValue);
    orderBuilder(position, id, false);
}

//Dans la page de validation du panier, crée le bloc de sous-total et total du panier
var cartBuilder = function(position){
    //Crée l'article parent
    elementBuilder(cartOrderPrice, position);
    //Sur la base de la Map cartItems, crée une série de blocs correspondant aux différents sous-totaux renseignés puis du total global
    for(const [key, value] of cartItems){
        elementBuilder(cartFreeSpace, position, key);
        elementBuilder(cartItemDesignation, position, key);
        elementBuilder(cartItemPrice, position, key);
    }    
    //Crée le div du bouton de validation et le bouton de validation de la commande
    elementBuilder(cartFreeSpace, position);
    elementBuilder(cartValidation, position);
}

//Construit une balise, en fonction de la position dans l'élément parent et de l'identifiant du produit (si informé)
var elementBuilder = function(elementType, position, id){
    //Crée la balise en fonction de l'objet elementType et lui attribue les paramètres stockés dans attributeMap
    const element = document.createElement(elementType.type);
    for(const [key, value] of elementType.attributeMap){
        element.setAttribute(key, value);
    }
    //Comportement à adopter pour les cas particuliers. Récupère les valeurs à ajouter dans le contenu de la balise.
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
        //Récupère les valeurs des sous-totaux, implémente la variable orderTotalPrice de chaque sous-total
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
            //Lorsque le bloc traité affiche le prix total, la valeur retourné devient le total du prix
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
    //Vérifie que le contenu à appliquer à la balise n'est pas nul
    if(elementType.content != ''){
        element.innerHTML = elementType.content;
    }
    const elementParent = parentFinder(position, elementType.parentClassName);
    //Intègre le bloc dans son élément parent.
    elementParent.appendChild(element);
}

//Insère du contenu dans une balise
var contentBuilder = function(product, position, idPageValue){
    // Product est un objet contenant les informations d'un produit du catalogue
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
      //crée le lien vers produit.html et fais passer l'identifiant en variable par l'URL 
      const moreInfo = new cardElement('a', [['class', moreInfoClass], ['href', 'produit.html?_id=' + product._id]], 'Détails', productDivClass);
      elementBuilder(moreInfo, position, idPageValue);  
}

//Construit le bloc de commande d'un produit en fonction de la quantité déjà commandée
var orderBuilder = function(position, id, reOrder){
    //reOrder est un booléen. Si reOrder vaut true, le bloc de commande est effacé
    if(reOrder){
        const orderParents = document.getElementsByClassName(buyDivClass);
        const orderParent = orderParents[position].getElementsByTagName('*');
        let nodeList = orderParent.length - 1;
        while(nodeList >= 0){
            orderParent[nodeList].remove();
            nodeList--;
        }
    }
    //si alreadyOrdered vaut true, crée un bloc de commande composé d'un bouton "Delete" qui supprime le produit du panier, "-" qui décrémente la quantité de 1, "+"
    // qui incrémente la quantité de 1, et d'un bloc affichant la quantité déjà commandée. 
    if(alreadyOrdered(id)){
        elementBuilder(deleteButton, position, id);
        elementBuilder(substractButton, position, id);
        elementBuilder(quantityOrdered, position, id);
        elementBuilder(addButton, position, id);
    }else{
        //si alreadyOrdered vaut false, crée un bloc de commande d'un bouton "Commander"
        elementBuilder(firstOrderButton, position, id);
    }
}

//Vérifie si l'identifiant du produit correspond à un produit déjà présent dans le panier
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

//Met à jour le bloc de commande d'un produit sur l'écoute d'un évènement mettant à jour le panier
var orderRefresher = function(clickedButton, position, buyDiv, id){
    //récupère le bouton sur lequel l'évènement a été écouté, et en fonction du type de bouton cliqué, et de la quantité commandée du produit
    //reconstruit le bloc de commande adapté, relance les écoutes d'évènements
    switch(clickedButton){
        case 'firstOrderDone':
        //Le produit est commandé pour la première fois
        orderBuilder(position, id, true);
        operateEvent(addOrderClass, position, buyDiv, id);
        operateEvent(substractOrderClass, position, buyDiv, id);
        operateEvent(deleteOrderClass, position, buyDiv, id);
        break;

        case 'alreadyButtons':
        //La quantité d'un produit déjà commandé est modifiée
        orderBuilder(position, id, true);
        operateEvent(addOrderClass, position, buyDiv, id);
        operateEvent(substractOrderClass, position, buyDiv, id);
        operateEvent(deleteOrderClass, position, buyDiv, id);
        break;

        case 'deleteCart':
        //Un produit est supprimé du panier
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
            //L'écoute des évènements est relancée
            listenOperateButton();
        }else{
            orderBuilder(position, id, true);
            operateEvent(orderButtonClass, position, buyDiv, id);
        }
        break;

        default:
    }
    //Si la page visitée est shoppingcart.html, les totaux sont mis à jour en fonction des modifications des quantités de produits commandés
    if(idPageValue == 'shoppingCart'){
        const cartTotalsBloc = document.getElementsByClassName(totalPriceClass);
        cartTotalsBloc[0].remove();
        orderTotalPrice = 0;
        cartBuilder(position);
    }
}