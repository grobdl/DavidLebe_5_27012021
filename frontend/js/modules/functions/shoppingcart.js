//Retourne la quantité commandée du produit dont l'identifiant est informé
var quantityRecover = function(id){
    var qty = 'Erreur!';
    if(shoppingCart.orderMap){
        const cartMap = shoppingCart.orderMap;
        for (const [key, value] of  cartMap){
            if(key == id){
                qty = value;
            }
        }
        return qty;
    }
}

//En fonctions du nombres d'articles différents commandés, met à jour le contenu de la balise lien vers la page panier
var cartUpdater = function(){
    //Récupère l'élément dirigeant vers shoppingCart.html
    /*En fonction du nombre d'articles différents présents dans shoppingCart.orderMap:
    - Pas d'article: Le lien affiche "Panier vide" et est désactivé.
    - 1 ou plusieurs articles: Le lien affiche le nombre d'articles différents commandés, et est activé*/
    const cartDisplay = document.getElementById('cartLink');
    if(shoppingCart){
        switch(shoppingCart.orderMap.size){
            case 0:
                cartDisplay.innerHTML = '<i class="fas fa-cart-arrow-down fa-2x"></i><br />Panier Vide';
                localStorageCartUpdate();
                break;
            case 1: 
                cartDisplay.innerHTML = '<i class="fas fa-cart-arrow-down fa-2x"></i><br />1 article';
                localStorageCartUpdate();
                break;
            default:
                cartDisplay.innerHTML = '<i class="fas fa-cart-arrow-down fa-2x"></i><br />' + shoppingCart.orderMap.size + ' articles';
                localStorageCartUpdate();
        }
    }else{
        cartDisplay.innerHTML = 'Panier Vide';
    }
}

//Calcul la valeur totale des produits commandés
var cartValue = function(position){
    var totalPrice = 0;
    for (const [key, value] of shoppingCart.orderMap){
        for(let i in cameras){
            if(cameras[i]._id == key){
                totalPrice += value*cameras[i].price;
            }
        }
    }
    return totalPrice;
}


