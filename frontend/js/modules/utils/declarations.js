//objets utilisés pour la construction des cartes
//Rajouter Condition IF localStorage existe
const shoppingCart = new cart('0', 'invited', Date.now(), orderMap);
const bloc = new cardElement('article', [['class', articleClass]], '', sectionClass);
const productDiv = new cardElement('div', [['class', productDivClass]], '', articleClass);
const buyDiv = new cardElement('div', [['class', buyDivClass]], '', articleClass);
const deleteButton = new cardElement('button', [['class', deleteOrderClass]], 'Delete', buyDivClass);
const substractButton = new cardElement('button', [['class', substractOrderClass]], '-', buyDivClass);
const quantityOrdered = new cardElement('p', [['class', quantityOrderClass]], 'Qty', buyDivClass);
const addButton = new cardElement('button', [['class', addOrderClass]], '+', buyDivClass);
const orderButton = new cardElement('button', [['class', orderButtonClass]], 'Commander', buyDivClass);