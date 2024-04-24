const { test, expect } = require("@playwright/test");

test("Login Test", async ({ browser, page }) => {
  const productName = "ZARA COAT 3";
  const products = page.locator(".card-body");
  const email = "jtest@mailinator.com";
  await page.goto("https://rahulshettyacademy.com/client/");
  await page.locator("#userEmail").fill(email);
  await page.locator("#userPassword").fill("T3st12345");
  await page.locator('[value="Login"]').click();
  // This is discouraged - use waits
  // await page.waitForLoadState('networkidle');

  // console.log(await page.locator('.card-body b').first().textContent());
  // alt method to dynamically wait for element - only works on single element use .first method
  await page.locator(".card-body b").first().waitFor();
  console.log(await page.locator(".card-body b").allTextContents());

  //select product - zara coat

  const count = await products.count(); // Make sure to await the count!
  // let productAdded = false; // Flag to indicate if the product was successfully added

  for (let i = 0; i < count; i++) {
    if ((await products.nth(i).locator("b").textContent()) === productName) {
      await products.nth(i).locator("text=Add To Cart").click();
      // Here, verify the successful addition. This is an EXAMPLE condition.
      // You need to replace it with a condition that suits your application.
      // const confirmationExists = await page.locator("text=Product Added To Cart").isVisible();

      // if (!confirmationExists) {
      //   throw new Error("Failed to add the product to the cart.");
      // }
      // productAdded = true;
      break; // Stop the loop as the product has been added
    }
  }

  // if (!productAdded) {
  //   throw new Error(`Product named "${productName}" not found.`);
  // }
  expect(page.locator('.user__name [type="text"]').first()).toHaveText(email);
  await page.locator('[routerlink*="cart"]').click();
  await page.locator("div li").first().waitFor();
  const bool = await page.locator('h3:has-text("ZARA COAT 3")').isVisible();
  expect(bool).toBeTruthy();

  await page.locator('button[type="button"]').nth(1).click();
  await page.locator('[placeholder*="Country"]').pressSequentially("ind");
  const dropdown = page.locator(".ta-results");
  await dropdown.waitFor();
  const optionsCount = await dropdown.locator("button").count();
  for (let i = 0; i < optionsCount; ++i) {
    const text = await dropdown.locator("button").nth(i).textContent();
    if (text.trim() === "India") {
      await dropdown.locator("button").nth(i).click();
      break;
    }
  }

  await page.locator('input[type="text"]').nth(1).fill("123");
  await page.locator('input[type="text"]').nth(2).fill("Bob Smith");
  await page.locator(".action__submit").click();
  // await page.locator('text=Place Order ').click();
  expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");

  const orderID = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
  console.log(orderID);
  // await page.pause();

  await page.locator(".btn-custom").nth(1).click();

  // for(let i = 0; i < orderItemCount; i++){
  //   if(await page.locator(orderTableElem).nth(i).textContent === orderID){
  //     await orderTableElem.nth(i).locator('.btn-primary').click();
  //     break;
  //   }
  // }
  // my solution:
  // const orderTableElem = page.locator("ng-star-inserted");
  // const orderItemCount = await orderTableElem.count();

  // for (let i = 0; i < orderItemCount; i++) {
  //   // Correctly await and call textContent() as a function
  //   const textContent = await orderTableElem.nth(i).textContent();
  //   if (textContent === orderID) {
  //     await orderTableElem.nth(i).locator(".btn-primary").click();
  //     break;
  //   }
  // }

 // Udemy solution:
 await page.locator('tbody').waitFor()
 const rows = await page.locator('tbody tr');

 for (let i = 0; i < rows.count; i++){
  const rowOrderID = await rows.nth(i).locator('th').textContent();
  if (orderID.includes(rowOrderID)){
    await rowOrderID.nth(i).locator('button').first().click();
    break;
  }
  const orderIdDetailspage = await page.locator('div .email-title').textContent();
  expect(orderIdDetailspage).toContain(' order summary ');
 }
 await page.pause();
});