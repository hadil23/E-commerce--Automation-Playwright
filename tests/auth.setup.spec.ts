import { test as setup, expect } from '@playwright/test';
import path from 'path';
import fs from 'fs';

import { LoginPage } from '../pages/LoginPage';
import { constants } from '../data/constants';
import users from '../data/users';

const authFile = path.resolve('playwright/.auth/user.json');

// Create .auth directory if it doesn't exist
fs.mkdirSync(path.dirname(authFile), { recursive: true });

setup('authentification', async ({ page }) => {

    const loginPage = new LoginPage(page);

    await loginPage.open();

    await loginPage.login(
        users.users.standarUser.username,
        users.users.standarUser.password
    );

    await expect(page).toHaveURL(constants.urls.inventory);

    await expect(page.locator('.title'))
        .toHaveText(constants.text.productTitle);

    // Save authentication state
    await page.context().storageState({ path: authFile });

});