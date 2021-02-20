//récupère les données du serveur
dbGetList.onreadystatechange = function () {
    if(this.readyState == 4 && this.status == 200){
        var response = JSON.parse(this.responseText);
        objectBuilder(response);
        var j = 0;
        for (let i in cameras){
            if(idPageValue == 'index' || (idPageValue == 'shoppingCart' && shoppingCartChecker(cameras[i]))){
                articleBuilder(cameras[i], j, cameras[i]._id, idPageValue);
                j++;
            }
        }
        cartUpdater();
        listenOperateButton();
        shoppingCartURL();
    }else{
    }
};

dbGetId.onreadystatechange = function () {
    if(this.readyState == 4 && this.status == 200){
        var response = JSON.parse(this.responseText);
        objectBuilder(response);
        const productId = URLParam();
        for (let i in cameras){
            if(idPageValue == 'product' && cameras[i]._id == productId){
                articleBuilder(cameras[i], 0, productId, idPageValue);
            }
        }
        cartUpdater();
        listenOperateButton();
        shoppingCartURL();
    }else{
    }
};

switch(idPageValue){
    case 'index':
    //requête récupération
    dbGetList.open('GET', 'http://localhost:3000/api/cameras');
    dbGetList.send();
    break;

    case 'shoppingCart':
    dbGetList.open('GET', 'http://localhost:3000/api/cameras');
    dbGetList.send();
    break;

    case 'product':
        dbGetId.open('GET', 'http://localhost:3000/api/cameras');
        dbGetId.send();
    break

    default:
        console.log('Erreur: ' + mainId[0]);
}
