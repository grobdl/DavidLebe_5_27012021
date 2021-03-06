
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
var sectionClass = idPageValue + ' row d-flex';
var articleClass = 'article ';
var productDivClass = 'productDiv '
var productNameClass= '';
var  productPriceClass= '';
var productImageClass= '';
var productDescriptionClass= '';
var moreInfoClass= 'moreInfo ';
var buyDivClass= 'buyDiv ';
var deleteOrderClass= 'delete ';
var addOrderClass= 'add ';
var substractOrderClass= 'substract ';
var quantityOrderClass= 'quantity ';
var orderButtonClass= 'firstOrder ';
switch(idPageValue){
    case 'index':
        sectionClass += ' justify-content-around';
        articleClass += 'col-11 col-md-4 col-lg-3 h-100 m-2 shadow card pt-2 pb-3 bg-light';
        productDivClass += 'd-flex flex-wrap justify-content-between position-relative';
        moreInfoClass += 'btn btn-link text-right stretched-link';
        buyDivClass += 'd-flex flex-wrap justify-content-center';
        deleteOrderClass += 'btn btn-secondary text-light text-center font-weight-bold shadow col-2 col-lg-3 far fa-trash-alt mr-1 px-0';
        addOrderClass += 'btn btn-secondary col-2 col-lg-3 text-light text-center font-weight-bold shadow ml-1 px-0';
        substractOrderClass += 'btn btn-secondary col-2 col-lg-3 text-light text-center font-weight-bold shadow px-0';
        quantityOrderClass += 'col-4 col-lg-2 text-center py-0 px-0 mb-0';
        orderButtonClass += 'col-12 btn btn-secondary text-light font-weight-bold shadow text-truncate';
        productNameClass += 'col-12 text-truncate';
        productPriceClass += 'col-6 text-left';
        productImageClass += 'col-12 mx-0 px-0 py-2 h-50';
        productDescriptionClass += 'd-none';
    break;

    case 'shoppingCart':
        sectionClass += ' justify-content-end'
        articleClass += 'col-12 col-lg-8 d-flex flex-wrap flex-row card shadow py-2';
        productDivClass += 'col-8 col-md-6 col-lg-4 d-flex flex-wrap flex-column';
        moreInfoClass += 'd-none';
        buyDivClass += 'd-flex flex-wrap  flex-row flex-lg-column justify-content-end align-items-center col-12 col-lg-4';
        deleteOrderClass += 'btn btn-secondary text-light font-weight-bold col-1 col-lg-12 far fa-trash-alt m-1 py-2 px-0';
        addOrderClass += 'btn btn-secondary text-light font-weight-bold col-1 col-lg-12 m-1 px-0';
        substractOrderClass += 'btn btn-secondary text-light font-weight-bold substract col-1 col-lg-12 m-1 px-0';
        quantityOrderClass += 'quantity col-2 col-lg-12 text-center font-weight-bold m-0';
        orderButtonClass += '';
        productNameClass += '';
        productPriceClass += '';
        productImageClass += 'col-4 col-lg-4';
        productDescriptionClass += 'd-none';
        var cartFreeSpaceClass = 'col-6'
        var cartDesignationClass = 'col-3';
        var cartPriceClass = 'price col-3 text-right';
        var cartValidationClass = 'cartValidate col-6';
        var totalPriceClass = 'total col-12 d-flex flex-wrap justify-content-end'
    break;

    case 'product':
        sectionClass += ' justify-content-around';
        articleClass += 'd-flex flex-wrap flex-column flex-md-row card shadow p-2';
        productDivClass += 'd-flex flex-column col-12 col-md-6 col-lg-6 align-content-stretch flex-wrap';
        productNameClass += '';
        productPriceClass += '';
        productDescriptionClass += '';
        productImageClass += 'img-thumbnail col-12 col-md-6 col-lg-4';
        moreInfoClass += 'd-none';
        buyDivClass += 'd-flex flex-lg-column flex-wrap justify-content-center align-items-stretched col-12 col-md-12 col-lg-2 my-2';
        deleteOrderClass += 'btn btn-secondary text-light text-center font-weight-bold shadow col-2 col-lg far fa-trash-alt mb-1 mx-2';
        addOrderClass += 'btn btn-secondary text-light font-weight-bold shadow col-2 col-lg mb-1 mx-2';
        substractOrderClass += 'btn btn-secondary text-light font-weight-bold shadow col-2 col-lg mb-1 mx-2';
        quantityOrderClass += 'text-center col-2 col-lg align-content-stretch mb-1 mx-2';
        orderButtonClass += 'btn btn-secondary text-light font-weight-bold shadow p-0 col-12 col-md-6 col-lg';
    break;

    case 'ordered':
        sectionClass += ' justify-content-around';
        articleClass += idPageValue + ' col-12 d-flex flex-wrap';
        var orderThanksMessageClass = 'h2 col-12 text-center';
        var orderDesignationClass = 'p col-6 text-right';
        var orderItemClass = 'p col-6 text-left';0
        var backToIndexDivClass = 'div col-12 text-center';
        var backToIndexClass = 'p col-3';
    break;

    default:
}
