class CartItem {
  constructor(item) {
    this.cartItem = item;
  }

  get total() {
    return this.cartItem.quantity * this.cartItem.price;
  }

  get object() {
    return { cartItem: this.cartItem };
  }

  editQuantityInCart(quantity) {
    this.cartItem.quantity = this.cartItem.quantity + quantity;
  }
}

export default CartItem;
