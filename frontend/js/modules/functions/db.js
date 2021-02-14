
//récupère les données du serveur
dbGet.onreadystatechange = function () {
    if(this.readyState == 4 && this.status == 200){
        var response = JSON.parse(this.responseText);
        objectBuilder(response);
        for (let i in cameras){
            articleBuilder(cameras[i], i);
        }
        cartUpdater();
        listenOperateButton();
        shoppingCartURL();
    }else{
    }
};
