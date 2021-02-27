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
                localStorageCartUpdate();
                break;
            case 1: 
                cartDisplay.innerHTML = 'Mon Panier <br />1 article';
                localStorageCartUpdate();
                break;
            default:
                cartDisplay.innerHTML = 'Mon Panier <br />' + shoppingCart.orderMap.size + ' articles';
                localStorageCartUpdate();
        }
    }else{
        console.log('shoppingCart inexistant');
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


