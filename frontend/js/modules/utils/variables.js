
//variables globales 
var dbGetList = new XMLHttpRequest();
var dbPost = new XMLHttpRequest();
var cameras= [];
var formListenersAnswers = [0, 0, 0, 0, 0];
var cartItems = new Map([['Total Panier: ', 0], ['Frais de Transport: ', 30], ['Dont TVA 20%: ', 0], ['Prix Total: ', 0]]);
const pageCheck = 'main';
var orderTotalPrice = 0;
var mainId = document.getElementsByTagName(pageCheck);
const idPageValue = mainId[0].getAttribute('id');
const orderMap= new Map;
const sectionClass = idPageValue + ' row d-flex justify-content-around';
var articleClass, totalPriceClass, productDivClass, moreInfoClass;
var productNameClass, productPriceClass,productImageClass;
var productDescriptionClass, buyDivClass, deleteOrderClass;
var addOrderClass, substractOrderClass, quantityOrderClass, orderButtonClass;
var cartFreeSpaceClass, cartDesignationClass, cartPriceClass, cartValidationClass;
var orderThanksMessageClass, orderDesignationClass, orderItemClass, backToIndexClass, backToIndexDivClass;
switch(idPageValue){
    case 'index':
        articleClass = 'article col-12 col-md-5 col-lg-4 h-100 m-2 card';
        productDivClass = 'productDiv d-flex flex-wrap h-80 justify-content-end position-relative';
        moreInfoClass = 'moreInfo text-right stretched-link';
        buyDivClass = 'buyDiv d-flex flex-wrap justify-content-center h-20';
        deleteOrderClass = 'delete col-3';
        addOrderClass = 'add col-3';
        substractOrderClass = 'substract col-3';
        quantityOrderClass = 'quantity col-3';
        orderButtonClass = 'firstOrder col-12';
        productNameClass = 'col-12';
        productPriceClass = 'col-12 text-right';
        productImageClass = 'col-12 mx-0 px-0';
        productDescriptionClass = '';
    break;

    case 'shoppingCart':
        articleClass = 'article col-12 d-flex flex-wrap';
        productDivClass = 'productDiv col-8 d-flex flex-wrap flex-column h-100';
        moreInfoClass = 'd-none';
        buyDivClass = 'buyDiv col-4 h-100 d-flex flex-wrap align-items-center';
        deleteOrderClass = 'delete col-12 h-25';
        addOrderClass = 'add col-4 h-25';
        substractOrderClass = 'substract col-4 h-25';
        quantityOrderClass = 'quantity col-4 h-25 text-center m-0';
        orderButtonClass = 'firstOrder col-12';
        productNameClass = 'col-4 h-50';
        productPriceClass = 'col-4 h-50';
        productImageClass = 'col-4 h-100';
        productDescriptionClass = 'd-none';
        cartFreeSpaceClass = 'col-6'
        cartDesignationClass = 'col-3';
        cartPriceClass = 'price col-3 text-right';
        cartValidationClass= 'cartValidate col-6';
        totalPriceClass = 'total col-12 d-flex flex-wrap justify-content-end'
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
        articleClass= 'article col-12 d-flex flex-wrap';
        orderThanksMessageClass = 'h2 col-12 text-center';
        orderDesignationClass = 'p col-6 text-right';
        orderItemClass = 'p col-6 text-left';
        backToIndexDivClass = 'div col-12 text-center';
        backToIndexClass = 'p col-3';
    break;

    default:
}
