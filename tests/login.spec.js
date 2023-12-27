const {test, expect} = require('@playwright/test')

test('Login Test', async({browser, page})=> {
    await page.goto('https://rahulshettyacademy.com/client/');
    await page.locator('#userEmail').fill('jtest@mailinator.com');
    await page.locator('#userPassword').fill('T3st12345');
    await page.locator('[value="Login"]').click();
    // This is discouraged - use waits
    // await page.waitForLoadState('networkidle');

    // console.log(await page.locator('.card-body b').first().textContent());
    // alt method to dynamically wait for element - only works on single element use .first method
    await page.locator('.card-body b').first().waitFor();
    console.log(await page.locator('.card-body b').allTextContents());
});

