// @ts-check
import { test, expect } from '@playwright/test';
import { Inventory } from '../pages/Inventory';
import { constants } from '../data/constants';
import { CartPage } from '../pages/CartPage';

/** @type {Inventory}  */
let inventory ; 
/** @type {CartPage}  */
let cartPage ; 

test.beforeEach(async ({page})=>{
inventory = new Inventory(page);
cartPage = new CartPage(page);
 await page.goto('/inventory.html');

})

test('added products appear correctly in cart',async({page})=>{
    await inventory.addProductToCart(constants.text.sauceLabsBackpackText);
    await inventory.addProductToCart(constants.text.sauceLabsBikeLightText);
    await cartPage.goToCart() ;
    await expect(page).toHaveURL(constants.urls.cart);
    const itemNames =  await cartPage.getAllCartNames();
    await  expect(itemNames).toEqual([constants.text.sauceLabsBackpackText,constants.text.sauceLabsBikeLightText])
    

});
test('product can be removed from my cart',async ({page})=>{
    await inventory.addProductToCart(constants.text.sauceLabsBackpackText);
    await inventory.addProductToCart(constants.text.sauceLabsBikeLightText);
    await cartPage.goToCart() ;
    await cartPage.removeProduct(constants.text.sauceLabsBackpackText);
    const cartCount = await cartPage.getCartItemCount();
    await expect(cartCount).toBe(1);

})