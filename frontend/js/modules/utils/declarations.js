const shoppingCart = new cart();
//objets utilisés pour la construction des cartes
if(localStorage.getItem('cart')){
    localStorageParser();
}else{
    shoppingCart.orderMap = orderMap;
}

//constantes index
const bloc = new cardElement('article', [['class', articleClass]], '', sectionClass);
const productInfoDiv = new cardElement('div', [['class', productDivClass]], '', articleClass);
const buyDiv = new cardElement('div', [['class', buyDivClass]], '', articleClass);
const deleteButton = new cardElement('button', [['class', deleteOrderClass]], 'Supprimer', buyDivClass);
const substractButton = new cardElement('button', [['class', substractOrderClass]], '-', buyDivClass);
const quantityOrdered = new cardElement('p', [['class', quantityOrderClass]], 'Qty', buyDivClass);
const addButton = new cardElement('button', [['class', addOrderClass]], '+', buyDivClass);
const firstOrderButton = new cardElement('button', [['class', orderButtonClass]], 'Commander', buyDivClass);
const cartOrderPrice = new cardElement('article', [['class', totalPriceClass]], '', sectionClass);
const cartFreeSpace = new cardElement('div', [['class', cartFreeSpaceClass]], '', totalPriceClass);
const cartItemDesignation = new cardElement('p', [['class', cartDesignationClass]], '', totalPriceClass);
const cartItemPrice = new cardElement('p', [['class', cartPriceClass]], '', totalPriceClass);
const cartValidation = new cardElement('input', [['type', 'submit'],['id', 'formValidate'], ['disabled', 'true'], ['value', 'Valider mon panier'], ['class', cartValidationClass]], '', totalPriceClass);
const orderThanksMessage = new cardElement('h2', [['class', orderThanksMessageClass]], 'Commande Validée! <br /> Merci pour votre confiance!', articleClass);
const orderNumberDesignation = new cardElement('p', [['class', orderDesignationClass]], 'N° de commande: ', articleClass);
const orderNumber = new cardElement('p', [['class', orderItemClass]], shoppingCart.orderId, articleClass);
const orderTotalDesignation = new cardElement('p', [['class', orderDesignationClass]], 'Prix total TTC', articleClass);
const orderTotal = new cardElement('p', [['class', orderItemClass]], shoppingCart.total + ' €', articleClass);
const backToIndexDiv = new cardElement('div', [['class', backToIndexDivClass]], '', articleClass);
const backToIndex = new cardElement('button', [['class', backToIndexClass]], 'Retour à la boutique', backToIndexDivClass);