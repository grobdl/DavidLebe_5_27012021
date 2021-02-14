//Ecarte les items spécifiques d'une HTMLCollection
var HTMLCollectionCleaner = function(value, parentFunction){
    if(value != 'length' && value != 'item' && value != 'namedItem'){
        return true;
    }else{
        return false;
    }
}

//Vérifie si des produits sont présents dans le panier
var panierFilled = function(){
    if(shoppingCart.orderMap.size > 0){
        return true;
    }else{
        return false
    }
}

//Vérifie si un produit est déjà présent dans le panier
var checkIfOrdered= function(product){
    if (panierFilled()){
        retour = false;
        for (const [key, value] of shoppingCart.orderMap){
            if(key == product._id){
                retour = true;
            }
        }
        return retour;
    }else{
        return false;
    }
}