var localStorageUpdate = function(){
    shoppingCart.orderMap = Array.from(shoppingCart.orderMap);
    const cartString = JSON.stringify(shoppingCart);
    shoppingCart.orderMap = new Map(shoppingCart.orderMap);
    localStorage.setItem('cart', cartString);
}

var quantityRecover = function(id){
    var qty = 'Qty';
    console.log('qtyRecover id:' + id);
    if(shoppingCart.orderMap){
        const cartMap = shoppingCart.orderMap;
        for (const [key, value] of  cartMap){
            if(key == id){
                qty = value;
            }else{
                console.log('id non reconnu');
            }
        }
        return qty;
    }else{
        console.log('map non reconnue');
    }
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
