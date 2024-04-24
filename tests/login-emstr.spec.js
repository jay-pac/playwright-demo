const { test, expect } = require("@playwright/test");

test("Login Test with Session Cookie", async ({ browser }) => {
  const context = await browser.newContext();
  const cookie = {
    name: "JSESSIONID",
    value: "EABC23CBA327E334BA5AD1843CB6E941",
    domain: "stage.iamonline.hhs.state.tx.us", // Corrected domain
    path: "/",
    httpOnly: true,
    secure: true,
  };

  await context.addCookies([cookie]);
  const page = await context.newPage();
  await page.goto("https://stage.iamonline.hhs.state.tx.us/app/UserHome?iss=https%3A%2F%2Fstage.iamonline.hhs.state.tx.us&session_hint=AUTHENTICATED");

  // Replace getByLabel and getByRole with standard Playwright methods if necessary
  // Example: await page.locator('input[name="username"]').fill("your_username");
  await page
    .getByLabel("Username", { exact: true })
    .fill("STGAgencySpsr.JasonPacitti@hhs.texas.gov");
  await page.waitForTimeout(3000);
  await page.getByRole("button", { name: "Next" }).click();
  await page.waitForTimeout(3000);

  const loginCookie = await context.cookies();
  console.log(loginCookie);


  // Save the state to a file
  await context.storageState({ path: 'state.json' });


});
