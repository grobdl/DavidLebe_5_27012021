var cartObject = function(){
    shippingCartInfos = document.forms[0];
    const shippingCartForm = new contact();
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
    console.log(shippingCartForm);
    return shippingCartForm;
}

var cartListArray = function(orderMap, object){
    object.products = new Array();
    for(const [key, value] of orderMap){
        object.products.push(key);
    }
}