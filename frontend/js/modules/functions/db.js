//récupère les données du serveur, et les traite en fonction de la page visitée par l'utilisateur
dbGetList.onreadystatechange = function () {
    if(this.readyState == 4 && this.status == 200){
        var response = JSON.parse(this.responseText);
        objectBuilder(response);
        var position = 0;
        switch(idPageValue){
            case 'index':
            //Si la page visitée est index.html, un objet est créé pour chaque produit du catalogue
            for (let i in cameras){
                articleBuilder(cameras[i], position, cameras[i]._id, idPageValue);
                position++;
            }
            break;
            
            case 'shoppingCart':
            //Si la page visitée est shoppingcart.html, un objet est créé pour chaque produit présent dans le panier
            //A la suite, cartBuilder construit un bloc affichant les sous-totaux et le montant total est affiché
            for (let i in cameras){
                if((idPageValue == 'shoppingCart' && alreadyOrdered(cameras[i]._id))){
                articleBuilder(cameras[i], position, cameras[i]._id, idPageValue);
                position++;
                }
            }
            cartBuilder(position);
            break;

            case 'product':
            //Si la page visitée est product.html, un objet est créé pour le produit dont l'identifiant est passé en paramètre dans l'url
            //Dans le cas où l'identifiant n'est pas dans la liste du catalogue, un message d'erreur s'affiche.
            var idCheck = false;
            for (let i in cameras){
                if(idPageValue == 'product' && cameras[i]._id == URLParam()){
                    articleBuilder(cameras[i], 0, cameras[i]._id, idPageValue);
                    idCheck = true;
                }
            }
            if(!idCheck){
                elementBuilder(bloc, 0, '');
                elementBuilder(noIdMessage, 0, '');
                elementBuilder(backToIndexDiv, 0, '');
                elementBuilder(backToIndex, 0, '');
                
            }
            break;
        }
        // Les fonctionnalités de mise à jour du lien vers le panier, d'écoute d'évènement sont lancés.
        cartUpdater();
        listenOperateButton();
        formListeners();
        shoppingCartURL();
    }else{

    }
};


//requête envoyant l'objet pour validation de la commande
dbPost.onreadystatechange = function () {
    if(this.readyState == 4 && this.status == 201){
        var response = JSON.parse(this.responseText);
        shoppingCart.orderId = response.orderId;
        localStorageCartUpdate();
        window.location.href= 'shipping.html';
    }
}

//Exécute le code adaptée à la page visitée
switch(idPageValue){
    case 'index':
    case 'shoppingCart':
    case  'product':
    //lance uniquement la requête de récupération des données du serveur
    dbGetList.open('GET', 'http://localhost:3000/api/cameras');
    dbGetList.send();
    break;

    case 'ordered':
    //Construit le bloc de validation de la commande.
        if(shoppingCart.orderMap.size > 0){
            elementBuilder(bloc, 0, '');
            elementBuilder(orderThanksMessage, 0, '');
            elementBuilder(orderNumberDesignation, 0, '');
            elementBuilder(orderNumber, 0, '');
            elementBuilder(orderTotalDesignation, 0, '');
            elementBuilder(orderTotal, 0, '');
        }else{
            elementBuilder(bloc, 0, '');
            elementBuilder(noOrderMessage, 0, '');
        }
        elementBuilder(backToIndexDiv, 0, '');
        elementBuilder(backToIndex, 0, '');
        listenOperateButton();
        //cartUpdater();
        shoppingCartURL();

    break;

    default:
}
