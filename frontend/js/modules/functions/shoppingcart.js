var localStorageUpdate = function(){
    shoppingCart.orderMap = Array.from(shoppingCart.orderMap);
    const cartString = JSON.stringify(shoppingCart);
    shoppingCart.orderMap = new Map(shoppingCart.orderMap);
    localStorage.setItem('cart', cartString);
}

var quantityRecover = function(){
    var qty = 'Qty';
    if(shoppingCart.orderMap){
        const map = shoppingCart.orderMap;
        const articles = document.getElementsByTagName('article');
        for (const [key, value] of map){
            for(let count in articles){
                if(HTMLCollectionCleaner(count)){
                    const id = articles[count].getAttribute('id');
                    if (key == id){
                        qty = value;
                    }
                }
            }
        }
        return qty;
    }
}

//Vérifie si des produits sont présents dans le panier
var panierFilled = function(){
    if(shoppingCart){
        if(shoppingCart.orderMap.size > 0){
            return true;
        }else{
            return false;
        }
    }
}

//
var shoppingCartChecker = function(product){
    var check = false;
    for(const [key, value] of shoppingCart.orderMap){
        if(product._id == key && value > 0){
            check= true;
        }
    }
    return check;
}



var cartUpdater = function(){
    const cartDisplay = document.getElementById('cartLink');
    if(shoppingCart){
        switch(shoppingCart.orderMap.size){
            case 0:
                console.log('Map vide');
                cartDisplay.innerHTML = 'Panier Vide';
                localStorageUpdate();
                break;
            case 1: 
                cartDisplay.innerHTML = 'Mon Panier <br />1 article';
                localStorageUpdate();
                break;
            default:
                cartDisplay.innerHTML = 'Mon Panier <br />' + shoppingCart.orderMap.size + ' articles';
                localStorageUpdate();
        }
    }else{
        console.log('shoppingCart inexistant');
        cartDisplay.innerHTML = 'Panier Vide';
    }
}
