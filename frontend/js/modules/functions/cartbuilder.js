//Crée l'objet contact à intégrer dans l'objet cartInfos
var cartObject = function(){
    shippingCartInfos = document.forms[0];
    const shippingCartForm = new contact();
    // En fonction de la valeur du paramètre name, le contenu de l'input est transféré dans la propriété concernée de l'objet
    for(let i in shippingCartInfos){
        if(shippingCartInfos[i]){
            switch(shippingCartInfos[i].name){
                case 'name':
                    shippingCartForm.firstName = shippingCartInfos[i].value;
                break;
                
                case 'surName':
                    shippingCartForm.lastName = shippingCartInfos[i].value;
                break;
                
                case 'mail':
                    shippingCartForm.email = shippingCartInfos[i].value;
                break;
                
                case 'adresse':
                    shippingCartForm.address = shippingCartInfos[i].value;
                break;
                
                case 'ville':
                    shippingCartForm.city = shippingCartInfos[i].value;
                break;
                
            }
        }
    }
    //retourne l'objet contact
    return shippingCartForm;
}

//Crée un array à intégrer dans l'objet cartLink
var cartListArray = function(orderMap, object){
    object.products = new Array();
    for(const [key, value] of orderMap){
        object.products.push(key);
    }
}