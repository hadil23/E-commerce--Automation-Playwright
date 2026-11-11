// @ts-check
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage'; 
import { Inventory } from '../pages/Inventory';
import { constants } from '../data/constants';
import users from '../data/users';


/** @type {LoginPage}  */
let loginPage ; 

/** @type {Inventory}  */
let inventory ; 

test.beforeEach(async ({page})=>{
loginPage = new LoginPage(page);
inventory = new Inventory(page) ; 
await loginPage.open();
await loginPage.login(
    users.users.standarUser.username,
    users.users.standarUser.password
);

});


test('card badge updates when adding products' , async ({page})=>{
    await inventory.addProductToCart(constants.text.sauceLabsBackpackText);
     await inventory.addProductToCart(constants.text.sauceLabsBikeLightText);
    const cartCount =  await inventory.getCartCount() ;
    expect(cartCount).toBe(2);

});
test('products can be sorted by price low to high' , async({page})=>{
    await inventory.sortBy(constants.sortOptions.priceLowToHigh);
    const prices = await inventory.getAllProductPrices();
    const sortedPrices = [...prices].sort((a,b)=>a-b);
    expect(prices).toEqual(sortedPrices);
})