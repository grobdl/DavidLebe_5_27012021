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
                if(idPageValue == 'product' && cameras[i]._id == URLParam()){
                    articleBuilder(cameras[i], 0, cameras[i]._id, idPageValue);
                }
            break;
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
    dbGetList.open('GET', 'http://localhost:3000/api/cameras');
    dbGetList.send();
    break

    default:
        console.log('Erreur: ' + mainId[0]);
}
