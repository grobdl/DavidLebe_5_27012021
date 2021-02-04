var dbGet = new XMLHttpRequest();

class product{
    constructor(id, name, price, description, imageURL) {
        this._id = id;
        this.name= name;
        this.price= price;
        this.description = description;
        this.imageURL = imageURL;
        this.custom = 'standard';
    }
}
var camera= [];
var objectBuilder = function(jsonObject){
    for (let i= 0; i < jsonObject.length; i++ ){
        camera[i] = new product(jsonObject[i]._id, jsonObject[i].name, jsonObject[i].price, jsonObject[i].description, jsonObject[i].imageUrl);
        //console.log(camera[i]);
    }
};

var rowBuilder = function(products){
    let colCounter= 0;
    for (const product in products){
    }
};

var blocBuilder = function(product){
    
    const article = document.createElement('article');
    article.setAttribute('class', 'col-12 col-md-6 col-lg-3');
    const products = document.getElementsByClassName('products row');
    console.log(products);
    products[0].appendChild(article);
    for(const property in product){
        //console.log(property +': ' +  product[property]);
        switch (property){
            case 'name':
                var element = document.createElement('h3');
                element.innerHTML = product[property];
                element.setAttribute('class', 'col-6');
                article.appendChild(element);
                break;
            case 'description':
                var element = document.createElement('p');
                element.innerHTML = product[property];
                element.setAttribute('class', 'col-12');
                article.appendChild(element);
                break;
            case 'price':
                var element = document.createElement('p');
                element.innerHTML = product[property] + ' €';
                element.setAttribute('class', 'col-6');
                article.appendChild(element);
                break;
            case 'imageURL':
                const imgParent = document.createElement('div');
                imgParent.setAttribute('class', 'text-left');
                var element = document.createElement('img');
                element.setAttribute('src', product[property]);
                element.setAttribute('class', 'img-thumbnail');
                article.appendChild(imgParent);
                imgParent.appendChild(element);
                break;
            default:
                console.log('Propriété ' + element + ': non concernée');
        }
    }
    const productPageLink = document.createElement('a');
    productPageLink.setAttribute('href', 'product.html');
    productPageLink.setAttribute('class', 'stretched-link')
    productPageLink.innerHTML = '<button>Commander</button>';
    article.appendChild(productPageLink);
};

dbGet.onreadystatechange = function () {
    if(this.readyState == 4 && this.status == 200){
        var response = JSON.parse(this.responseText);
        //console.log('Retour statuts: ' + this.readyState + ' ' + this.status);
        //console.log(response);
        objectBuilder(response);
        for (let i in camera){
            blocBuilder(camera[i]);
        }
    }else{
        //console.log('Retour statuts: ' + this.readyState + ' ' + this.status);
    }
};

dbGet.open('GET', 'http://localhost:3000/api/cameras');
dbGet.send();