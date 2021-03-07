//Classe Panier, prépare l'objet contenant toutes les informations du panier en cours
class cart{
    constructor(orderId, date, total, orderMap, contact){
        this.orderId = orderId;
        this.date = date;
        this.total = total;
        this.orderMap = orderMap;
        this.contact = contact;
    }
}
