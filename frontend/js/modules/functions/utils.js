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
    const parentsList = document.getElementsByClassName(parentClassName);
    var parent;
    if(parentsList.length > 1){
        parent = parentsList[position];        
    }else{
        parent = parentsList[0]; 
    }
    return parent;
}

var numberRounder = function(value, precision){
    operateur = Math.pow(10, precision);
    result = value*operateur;
    roundedResult = Math.round(result, 2)/100;
    return roundedResult;
}

var formRegex = function(id){
    const lettersRegex = /[A-Za-zéèêàùçîï\-\\\s]{1,}/;
    const adresseRegex = /[0-9A-Za-zéèêàùçîï\-\\\s\,\.]{2,}/;
    const mailRegex = /^[a-z0-9][0-9a-z\-\_\.]{2,}[a-z0-9]@[a-z0-9]{1}[0-9a-z\-]{1,}[a-z0-9].[a-z]{2,6}$/;
    var retour = false;
    const input = document.getElementById(id);
    const attribute = input.getAttribute('name');
    const content = input.value;
    switch (attribute){
        case 'name':
        case 'surName':
        case 'ville':
        if(content.match(lettersRegex)){
            retour = true;
        }
        break;

        case 'mail':
        if(content.match(mailRegex)){
            retour = true;
        }
        break;

        case 'adresse':
        if(content.match(adresseRegex)){
            retour = true;
        }
        break;
    }
    return retour;
}

var formAnswers = function(){
    var total = 0;
    for(let count in formListenersAnswers){
        total += formListenersAnswers[count];
    }
    if(total == formListenersAnswers.length){
        return true;
    }else{
        return false;
    }
}