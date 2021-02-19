//récupère les données du serveur
dbGetList.onreadystatechange = function () {
    if(this.readyState == 4 && this.status == 200){
        var response = JSON.parse(this.responseText);
        objectBuilder(response);
        for (let i in cameras){
            if(idValue == 'index' || (idValue == 'shoppingCart' && shoppingCartChecker(cameras[i]))){
                articleBuilder(cameras[i], i, idValue);
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
            if(idValue == 'product' && cameras[i]._id == productId){
                i = 0;
                articleBuilder(cameras[i], i, idValue);
            }
        }
        cartUpdater();
        listenOperateButton();
        shoppingCartURL();
    }else{
    }
};

switch(idValue){
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
