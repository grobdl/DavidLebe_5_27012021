//récupère les données du serveur
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
            for (let i in cameras){
                if(idPageValue == 'product' && cameras[i]._id == URLParam()){
                    articleBuilder(cameras[i], 0, cameras[i]._id, idPageValue);
                }
            }
            break;
        }
        cartUpdater();
        listenOperateButton();
        shoppingCartURL();
        console.log('type orderMap:' + typeof shoppingCart.orderMap);
        console.log('type orderMap:' + typeof shoppingCart);
    }else{

    }
};

dbPost.onreadystatechange = function () {
    if(this.readyState == 4 && this.status == 201){
        console.log('post chargé');
        var response = JSON.parse(this.responseText);
        shoppingCart.orderId = response.orderId;
        console.log('shoppingCart');
        console.log(shoppingCart);
        localStorageOrder();
        window.location.href= 'shipping.html';
    }
}


switch(idPageValue){
    case 'index':
    case 'shoppingCart':
    case  'product':
    //requête récupération
    dbGetList.open('GET', 'http://localhost:3000/api/cameras');
    dbGetList.send();
    break;

    case 'ordered':
        elementBuilder(bloc, 0, '');
        elementBuilder(orderMessage, 0, '');
        elementBuilder(backToIndex, 0, '');

    break;

    default:
        console.log('Erreur switch: ' + mainId[0]);
}
