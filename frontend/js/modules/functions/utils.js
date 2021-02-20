//Ecarte les items spécifiques d'une HTMLCollection
var HTMLCollectionCleaner = function(value, parentFunction){
    if(value != 'length' && value != 'item' && value != 'namedItem'){
        return true;
    }else{
        return false;
    }
}

//Génère une série d'objet à partir d'un contenu fourni
var objectBuilder = function(jsonObject){
    for (let i= 0; i < jsonObject.length; i++ ){
        cameras[i] = new product(jsonObject[i]._id, jsonObject[i].name, jsonObject[i].price, jsonObject[i].description, jsonObject[i].imageUrl);
    }
};

var URLParam = function(){
    const URLParam = new URLSearchParams(window.location.search);
    const paramValue = URLParam.get('_id');
    return paramValue;
}

var parentFinder = function(position, parentClassName){
    console.log(position);
    console.log(parentClassName);
    const parentsList = document.getElementsByClassName(parentClassName);
    var parent;
    if(parentsList.length > 1){
        parent = parentsList[position];        
    }else{
        parent = parentsList[0]; 
    }
    return parent;
}