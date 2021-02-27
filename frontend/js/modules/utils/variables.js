
//variables globales 
var dbGetList = new XMLHttpRequest();
var dbPost = new XMLHttpRequest();
var cameras= [];
var cartItems = new Map([['Total Panier: ', 0], ['Frais de Transport: ', 30], ['Dont TVA 20%: ', 0], ['Prix Total: ', 0]]);
const pageCheck = 'main';
var orderTotalPrice = 0;
var mainId = document.getElementsByTagName(pageCheck);
const idPageValue = mainId[0].getAttribute('id');
const orderMap= new Map;
const sectionClass = idPageValue + ' row';
var articleClass, totalPriceClass, productDivClass, moreInfoClass;
var productNameClass, productPriceClass,productImageClass;
var productDescriptionClass, buyDivClass, deleteOrderClass;
var addOrderClass, substractOrderClass, quantityOrderClass, orderButtonClass;
var cartFreeSpaceClass, cartDesignationClass, cartPriceClass, cartValidationClass;
var orderMessageClass, backToIndexClass, backToIndexDivClass;
switch(idPageValue){
    case 'index':
        articleClass = 'article col-12 col-md-6 col-lg-4';
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
        articleClass = 'article col-12 d-flex flex-wrap';
        totalPriceClass = 'total col-12 d-flex flex-wrap justify-content-end'
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
        cartFreeSpaceClass = 'col-6'
        cartDesignationClass = 'col-3';
        cartPriceClass = 'price col-3 text-right';
        cartValidationClass= 'cartValidate col-6';
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

    case 'ordered':
        articleClass='col-12';
        orderMessageClass = 'col-12';
        backToIndexDivClass = 'col-12';
        backToIndexClass = 'col-12';
    break;

    default:
        console.log('pouet');
}
