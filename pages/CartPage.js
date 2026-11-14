class CartPage {

constructor(page){
     this.cartLink = page.getByRole('button', { name: /Cart/ });
     this.itemNames = page.locator('.cart_item').getByRole('button', { name: /^View details for/ });
     this.cartItem = page.locator('.cart_item');
     this.checkoutButton = page.locator('[data-test="checkout"]');
     this.firstNameInput = page.locator('[data-test="firstName"]');
     this.lastNameInput = page.locator('[data-test="lastName"]');
     this.postalCodeInput = page.locator('[data-test="postalCode"]');
     this.continueToOverViewButton = page.getByRole('button',{name:'continue'});
     this.subTotal = page.locator('[data-test ="subtotal-label"]');
     this.tax = page.locator('[data-test="tax-label"]');
     this.total = page.locator('[data-test="total-label"]');
     this.finishButton = page.getByRole('button',{name:'finish'})
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

};
async clickOnCheckout(){
   await this.checkoutButton.click();
};

async fillInformation(firstName ,lastName,postalCode){
await this.firstNameInput.fill(firstName);
await this.lastNameInput.fill(lastName);
await this.postalCodeInput.fill(postalCode) ;
};
async continueToOverView(){
   await this.continueToOverViewButton.click();

};
async getSubtotal(){
   const text = await this.subTotal.textContent();
   return parseFloat(text.replace('Item total: $',''))
};
 async getTax(){
   const text = await this.tax.textContent();
   return parseFloat(text.replace('Tax: $',''));
 };
  async getTotal(){
   const text = await this.total.textContent();
   return parseFloat(text.replace('Total: $',''));

 }
 async clickFinishButton(){
   await this.finishButton.click();
 }


}

module.exports = {CartPage}