// @ts-check
import { test, expect } from '@playwright/test';
import { Inventory } from '../pages/Inventory';
import { constants } from '../data/constants';


/** @type {Inventory}  */
let inventory ; 

test.beforeEach(async ({page})=>{
page.goto(constants.urls.inventory);
inventory = new Inventory(page) ; 

});


test('card badge updates when adding products' , async ({page})=>{
    await inventory.addProductToCart(constants.text.sauceLabsBackpackText);
     await inventory.addProductToCart(constants.text.sauceLabsBikeLightText);
    const cartCount =  await inventory.getCartCount() ;
    expect(cartCount).toBe(2);

});

 
for (const [sortName, sortValue] of Object.entries(constants.sortOptions)) {

    test(`products can be sorted by ${sortName}`, async () => {

        await inventory.sortBy(sortValue);

        let actual;
        let expected;

        if (sortName === 'nameAsc') {

            actual = await inventory.getAllProductNames();
            expected = [...actual].sort((a, b) => a.localeCompare(b));

        } else if (sortName === 'nameDesc') {

            actual = await inventory.getAllProductNames();
            expected = [...actual].sort((a, b) => b.localeCompare(a));

        } else if (sortName === 'priceLowToHigh') {

            actual = await inventory.getAllProductPrices();
            expected = [...actual].sort((a, b) => a - b);

        } else if (sortName === 'priceHighToLow') {

            actual = await inventory.getAllProductPrices();
            expected = [...actual].sort((a, b) => b - a);

        }

        expect(actual).toEqual(expected);
    });
}