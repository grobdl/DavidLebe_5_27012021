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


