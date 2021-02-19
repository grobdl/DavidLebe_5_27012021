
//variables globales 
var dbGetList = new XMLHttpRequest();
var dbGetId = new XMLHttpRequest();
var cartSend = new XMLHttpRequest();
var cameras= [];
const pageCheck = 'main';
var mainId = document.getElementsByTagName(pageCheck);
const idValue = mainId[0].getAttribute('id');
const orderMap= new Map;
const sectionClass = idValue + ' row';
var articleClass = '';
var productDivClass = '';
var moreInfoClass = '';
var productNameClass = '';
var productPriceClass = '';
var productImageClass = '';
var productDescriptionClass = '';
var buyDivClass = '';
var deleteOrderClass = '';
var addOrderClass = '';
var substractOrderClass = '';
var quantityOrderClass = '';
var orderButtonClass = '';
switch(idValue){
    case 'index':
        articleClass = 'col-12 col-md-6 col-lg-4';
        productDivClass = 'productDiv d-flex flex-wrap';
        moreInfoClass = 'moreInfo col-12 text-right';
        buyDivClass = 'buyDiv d-flex flex-wrap justify-content-center';
        deleteOrderClass = 'delete col-3';
        addOrderClass = 'add col-3';
        substractOrderClass = 'substract col-3';
        quantityOrderClass = 'quantity col-3';
        orderButtonClass = 'firstOrder col-12';
        productNameClass = 'col-8';
        productPriceClass = 'col-4';
        productImageClass = 'img-thumbnail';
        productDescriptionClass = '';
    break;

    case 'shoppingCart':
        articleClass = 'col-12 d-flex flex-wrap';
        productDivClass = 'productDiv d-flex flex-wrap flex-column';
        moreInfoClass = 'd-none';
        buyDivClass = 'buyDiv d-flex flex-wrap justify-content-center';
        deleteOrderClass = 'delete col-2';
        addOrderClass = 'add col-2';
        substractOrderClass = 'substract col-2';
        quantityOrderClass = 'quantity col-2';
        orderButtonClass = 'firstOrder col-12';
        productNameClass = 'col-4';
        productPriceClass = 'col-4';
        productImageClass = 'col-2';
        productDescriptionClass = 'd-none';
    break;

    case 'product':
        articleClass = 'col-12 col-md-6 col-lg-4';
        productDivClass = 'productDiv d-flex flex-wrap';
        moreInfoClass = 'd-none';
        buyDivClass = 'buyDiv d-flex flex-wrap justify-content-center';
        deleteOrderClass = 'delete col-3';
        addOrderClass = 'add col-3';
        substractOrderClass = 'substract col-3';
        quantityOrderClass = 'quantity col-3';
        orderButtonClass = 'firstOrder col-12';
        productNameClass = 'col-8';
        productPriceClass = 'col-4';
        productImageClass = 'img-thumbnail';
        productDescriptionClass = '';
    break;

    default:
        console.log('pouet');
}
