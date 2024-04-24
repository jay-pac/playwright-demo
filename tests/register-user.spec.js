const { test, expect } = require("@playwright/test");

test.skip("", async ({ browser, page }) => {
  // page fixture gives you a default browser instance
  await page.goto("https://rahulshettyacademy.com/client/");
  // get title
  console.log(await page.title());
  await page.locator(".text-reset").click();
  await page.locator("#firstName").fill("James");
  await page.locator("#lastName").fill("Kirk");
  await page.locator("#userEmail").fill("jtest@mailinator.com");
  await page.locator("#userMobile").fill("5105555555");
  await page.locator("#userPassword").fill("T3st12345");
  await page.locator("#confirmPassword").fill("T3st12345");
  await page.locator('[type="checkbox"]').click();
  await page.locator("#login").click();
  await page.waitForTimeout(5000);
});
