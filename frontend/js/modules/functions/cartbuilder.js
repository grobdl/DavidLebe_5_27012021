var cartBuilder = function(position){
    elementBuilder(cartOrderPrice, position);
    for(const [key, value] of cartItems){
        elementBuilder(cartFreeSpace, position, key);
        elementBuilder(cartItemDesignation, position, key);
        elementBuilder(cartItemPrice, position, key);
    }    
    elementBuilder(cartFreeSpace, position);
    elementBuilder(cartValidation, position);
}