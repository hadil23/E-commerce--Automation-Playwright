
class Inventory {

    constructor(page) {
        this.inventoryItems = page.locator('[data-test="inventory-item"]'); 
        this.cartBadge = page.locator('.shopping_cart_badge');
        this.sortDropDown = page.locator('.product_sort_container');
        this.itemPrices = page.locator('[data-test = "inventory-item-price"]') ;
        this.itemNames = page.locator('[data-test ="inventory-item-name"]') ;
    }

    getProductCart(productName) {
       return this.inventoryItems.filter({ hasText: productName });
    }

    async addProductToCart(productName) {
        const product = this.getProductCart(productName);

        await product.getByRole('button', {
            name: 'Add to cart'
        }).click();
    } ;
    async getCartCount(){
        const hasBadge = this.cartBadge.count();
        if(hasBadge===0) return 0
         return parseInt(await this.cartBadge.textContent() ,10)
    } ; 
    async sortBy(optionValue) {
        await this.sortDropDown.selectOption(optionValue)
    };
    async getAllProductPrices(){
        const priceTexts = await this.itemPrices.allTextContents();
        return priceTexts.map((p)=>parseFloat(p.replace('$', ''))) ;
    };
    async getAllProductNames(){
      return await this.itemNames.allTextContents();
    }
}

module.exports = { Inventory };
