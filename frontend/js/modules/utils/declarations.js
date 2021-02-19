const shoppingCart = new cart();
//objets utilisés pour la construction des cartes
if(localStorage.getItem('cart')){
    const parse = JSON.parse(localStorage.getItem('cart'));
    shoppingCart.orderMap = new Map(parse.orderMap);
    console.log(shoppingCart.orderMap);
}else{
    shoppingCart.orderMap = orderMap;
    shoppingCart.date = Date.now();
    console.log(shoppingCart.orderMap);
}

//constantes index
const bloc = new cardElement('article', [['class', articleClass]], '', sectionClass);
const productDiv = new cardElement('div', [['class', productDivClass]], '', articleClass);
const buyDiv = new cardElement('div', [['class', buyDivClass]], '', articleClass);
const deleteButton = new cardElement('button', [['class', deleteOrderClass]], 'Delete', buyDivClass);
const substractButton = new cardElement('button', [['class', substractOrderClass]], '-', buyDivClass);
const quantityOrdered = new cardElement('p', [['class', quantityOrderClass]], 'Qty', buyDivClass);
const addButton = new cardElement('button', [['class', addOrderClass]], '+', buyDivClass);
const orderButton = new cardElement('button', [['class', orderButtonClass]], 'Commander', buyDivClass);

