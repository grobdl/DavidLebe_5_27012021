var localStorageCartUpdate = function(){
    shoppingCart.orderMap = Array.from(shoppingCart.orderMap);
    const cartString = JSON.stringify(shoppingCart);
    shoppingCart.orderMap = new Map(shoppingCart.orderMap);
    localStorage.setItem('cart', cartString);
}

var localStorageOrder = function(){
    for(const property in shoppingCart){
        var value = shoppingCart[property];
        if(typeof value == 'object'){
            if(value.size){
                value = Array.from(value);
            }
            shoppingCart[property] = value;
        }
    }   
    const cartString = JSON.stringify(shoppingCart);
    localStorage.setItem('cart', cartString);
}

var localStorageParser = function(){
    const parse = JSON.parse(localStorage.getItem('cart'));
    for (let property in parse){
        if(property == 'orderMap'){
            parse[property] = new Map(parse.orderMap);
        }
        shoppingCart[property] = parse[property];
    }
    console.log(shoppingCart);
}