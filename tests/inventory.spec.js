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

 

for (const [sortName, sortValue] of Object.entries(constants.sortOptions)) {

    test(`products can be sorted by ${sortName}`, async ({ page }) => {

        await inventory.sortBy(sortValue);

        let actual;
        let expected;

        // Sort by product name
        if (sortName === 'nameAsc' || sortName === 'nameDesc') {

            actual = await inventory.getAllProductNames();

            expected = [...actual].sort((a, b) =>
                a.localeCompare(b)
            );

            if (sortName === 'nameDesc') {
                expected.reverse();
            }
        }

        // Sort by product price
        else if (
            sortName === 'priceLowToHigh' ||
            sortName === 'priceHighToLow'
        ) {

            actual = await inventory.getAllProductPrices();

            expected = [...actual].sort((a, b) => a - b);

            if (sortName === 'priceHighToLow') {
                expected.reverse();
            }
        }

        expect(actual).toEqual(expected);
    });
}
