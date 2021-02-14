//Déclarations globales 
var dbGet = new XMLHttpRequest();
var cartSend = new XMLHttpRequest();
var cameras= [];
const orderMap= new Map;
const pageCheck = 'main';
const sectionClass = 'products row';
const articleClass = 'col-12 col-md-6 col-lg-4';
const productDivClass = 'productDiv d-flex flex-wrap';
const moreInfoClass = 'col-12 text-right';
const buyDivClass = 'buyDiv d-flex flex-wrap justify-content-center';
const deleteOrderClass = 'delete col-3';
const addOrderClass = 'add col-3';
const substractOrderClass = 'substract col-3';
const quantityOrderClass = 'quantity col-3';
const orderButtonClass = 'firstOrder col-12';