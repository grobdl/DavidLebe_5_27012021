//Fait passer la map contenant la liste des produits commandés et leur quantité dans localStorage
var localStorageCartUpdate = function(){
    //transforme la map en liste d'arrays, puis l'objet shoppingCart en objet JSON
    shoppingCart.orderMap = Array.from(shoppingCart.orderMap);
    const cartString = JSON.stringify(shoppingCart);
    //reconvertit la liste d'arrays en map dans l'objet shoppingCart.
    shoppingCart.orderMap = new Map(shoppingCart.orderMap);
    //transmet l'objet JSON dans localStorage
    localStorage.setItem('cart', cartString);
}

//Récupère la valeur de localStorage.getItem('cart') et le convertit en objet JS. 
//Transmet l'objet dans shoppingCart, réinitialise localStorage.
var localStorageParser = function(){
        const parse = JSON.parse(localStorage.getItem('cart'));
        for (let property in parse){
            if(property == 'orderMap'){
                parse[property] = new Map(parse.orderMap);
            }
            shoppingCart[property] = parse[property];
        }
    localStorage.clear();
}