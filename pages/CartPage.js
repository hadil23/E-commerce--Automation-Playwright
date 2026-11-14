class CartPage {

constructor(page){
     this.cartLink = page.getByRole('button', { name: /Cart/ });
     this.itemNames = page.locator('.cart_item').getByRole('button', { name: /^View details for/ });
     this.cartItem = page.locator('.cart_item');
  }


async goToCart(){
   await  this.cartLink.click();
};
async getAllCartNames(){
   return await this.itemNames.allTextContents();

};

async removeProduct(productName){
   const item = this.getCartItem(productName);
   await item.getByRole('button',{name :'Remove'}).click();

}

getCartItem(productName){
   return this.cartItem.filter({hasText :productName })
};
async getCartItemCount(){
  return await this.cartItem.count();

}

}

module.exports = {CartPage}