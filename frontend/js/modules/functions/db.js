/*récupère les données du serveur, et les traite en fonction de la page visitée par l'utilisateur
*/
dbGetList.onreadystatechange = function () {
    if(this.readyState == 4 && this.status == 200){
        var response = JSON.parse(this.responseText);
        objectBuilder(response);
        var position = 0;
        switch(idPageValue){
            case 'index':
            for (let i in cameras){
                articleBuilder(cameras[i], position, cameras[i]._id, idPageValue);
                position++;
            }
            break;
            
            case 'shoppingCart':
            for (let i in cameras){
                if((idPageValue == 'shoppingCart' && alreadyOrdered(cameras[i]._id))){
                articleBuilder(cameras[i], position, cameras[i]._id, idPageValue);
                position++;
                }
            }
            cartBuilder(position);
            break;

            case 'product':
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
        localStorageOrder();
        window.location.href= 'shipping.html';
    }
}

//Exécute le code adaptée à la page visitée
switch(idPageValue){
    case 'index':
    case 'shoppingCart':
    case  'product':
    //requête récupération
    dbGetList.open('GET', 'http://localhost:3000/api/cameras');
    dbGetList.send();
    break;

    case 'ordered':
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
        cartUpdater();
        shoppingCartURL();

    break;

    default:
}
