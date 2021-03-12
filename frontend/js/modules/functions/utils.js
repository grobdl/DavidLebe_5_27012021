//Retourne false si l'item de l'HTMLCollection est length, item, ou nameditem, true dans le cas contraire.
var HTMLCollectionCleaner = function(value, parentFunction){
    if(value != 'length' && value != 'item' && value != 'namedItem'){
        return true;
    }else{
        return false;
    }
}

//Génère un objet à partir du contenu de la requête.
var objectBuilder = function(jsonObject){
    for (let i= 0; i < jsonObject.length; i++ ){
        cameras[i] = new product(jsonObject[i]._id, jsonObject[i].name, jsonObject[i].price/100, jsonObject[i].description, jsonObject[i].imageUrl);
    }
};

//extraie et retourne  l'identifiant transmise par URL
var URLParam = function(){
    const URLParam = new URLSearchParams(window.location.search);
    const paramValue = URLParam.get('_id');
    return paramValue;
}

//Récupère l'élément parent en fonction du paramètre parentClassName
//Si un array de plusieurs éléments est retourné, récupère l'élément dont la position dans l'array vaut position.
//Si l'array ne comporte qu'un seul élément, récupère l'élément 0 de l'array.
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

//Arrondit value à un nombre de chiffre après la virgule valant precision
var numberRounder = function(value, precision){
    operateur = Math.pow(10, precision);
    result = value*operateur;
    roundedResult = Math.round(result, 2)/100;
    return roundedResult;
}

//Vérifie le contenu des champs du formulaire à l'aide de regex
var formRegex = function(id){
    const lettersRegex = /[A-Za-zéèêàùçîï\s\-]{1,}/; //Autorise les lettres, accent compris, espaces, tirets
    const adresseRegex = /[0-9A-Za-zéèêàùçîï\-\s\,\.]{2,}/; //Autorise les lettres, accent compris, chiffres, espaces, tirets
    const mailRegex = /^[a-z0-9][0-9a-z\-\_\.]{2,}[a-z0-9]@[a-z0-9]{1}[0-9a-z\-]{1,}[a-z0-9].[a-z]{2,6}$/;
    //Autorise les chaînes de caractère correspondant à un email
    var retour = false;
    const input = document.getElementById(id);
    const attribute = input.getAttribute('name');
    const content = input.value;
    //définit le regex à utiliser en fonction de la chaîne contrôlée.
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

//Vérifie si toutes les valeurs des champs du formulaire sont valides
//Récupère les valeurs de l'array formListenersAnswers et les additionne
//Si le total est égal à la longueur du tableau, retourne true
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

//Met en avant la validité ou l'invalidité d'un champ du formulaire
var formAssist = function(input, regexReturn){
    var value, label, labelClass;
    //récupère l'élément label associété à l'élément input
    const labelArray = document.getElementsByTagName('label');
    for(let count in labelArray){
        if(HTMLCollectionCleaner(count) && labelArray[count].getAttribute('for') == input.getAttribute('name')){
            label = labelArray[count];
        }else{
            console.log('Aucun label retourné');
        }
    }
    //récupère les valeurs standards de la classe des labels et input du formulaire avant une éventuelle modificiation de celles-ci
    labelClass = labelClassValues.get(label.getAttribute('for'));
    value = inputClassValues.get(input.getAttribute('name'));
    //si regexReturn vaut true, le code couleur appliqué correspond à success (bootstrap), sinon à danger
    if(regexReturn){
        value += ' border border-success text-success';
        labelClass += ' text-success';
    }else{
        value += ' border border-danger text-danger';
        labelClass += ' text-danger';
    }
    //attribue les nouvelles classes aux éléments label et input
    input.setAttribute('class', value);
    label.setAttribute('class', labelClass);
}