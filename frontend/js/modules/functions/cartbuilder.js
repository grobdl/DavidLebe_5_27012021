var cartBuilder = function(position){
    elementBuilder(cartOrderPrice, position);
    for(const [key, value] of cartItems){
        console.log('pouet');
        elementBuilder(cartFreeSpace, position, key);
        elementBuilder(cartItemDesignation, position, key);
        elementBuilder(cartItemPrice, position, key);
    }
}