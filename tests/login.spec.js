// @ts-check
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage'; 
import { users } from '../data/users';
import { constants } from '../data/constants';

/** @type {LoginPage}  */
let loginPage ; 



// test case-1 Valid scenario
test('Login with valid credientials @smoke' ,async ({page})=>{
 loginPage = new LoginPage(page);
await loginPage.open();
  
  loginPage.login(users.standarUser.username ,users.standarUser.password);
  await expect(page).toHaveURL(constants.urls.inventory);
  await expect(page.locator('.title')).toHaveText(constants.text.productTitle);


} ) ;

