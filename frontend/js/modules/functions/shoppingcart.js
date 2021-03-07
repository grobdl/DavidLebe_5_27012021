//Retourne la quantité commandée du produit dont l'identifiant est informé
var quantityRecover = function(id){
    var qty = 'Qty';
    if(shoppingCart.orderMap){
        const cartMap = shoppingCart.orderMap;
        for (const [key, value] of  cartMap){
            if(key == id){
                qty = value;
            }else{
            }
        }
        return qty;
    }else{
    }
}

//En fonctions du nombres d'articles différents commandés, met à jour le contenu de la balise lien vers la page panier
var cartUpdater = function(){
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


